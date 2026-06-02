import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), '..', '02_Species_Profiles');

// Helper to reliably find visual assets regardless of casing or _suffix conventions
function findImageFile(directory: string, slug: string): string | null {
  const dirPath = path.join(process.cwd(), '..', '04_Visual_Production', directory);
  if (!fs.existsSync(dirPath)) return null;
  
  const files = fs.readdirSync(dirPath);
  const slugLower = slug.toLowerCase();
  
  // Exact match
  if (files.includes(`${slugLower}.png`)) return `${slugLower}.png`;
  
  // Prefix match (e.g. 30_margay_hunting.png)
  const prefixMatch = files.find(f => f.toLowerCase().startsWith(slugLower));
  if (prefixMatch) return prefixMatch;
  
  // ID prefix match (e.g. "30_")
  const idPrefix = slug.split('_')[0] + '_';
  const idMatch = files.find(f => f.startsWith(idPrefix));
  if (idMatch) return idMatch;
  
  return null;
}

export type SpeciesProfile = {
  slug: string;
  title: string;
  heroImage: string | null;
  huntingImage: string | null;
  museumHook: string | null;
  coreIdentity: Record<string, string>;
  sections: Record<string, string>;
};

export function getSpeciesSlugs() {
  const files = fs.readdirSync(contentDirectory);
  return files.filter(file => file.endsWith('.md')).map(file => {
    const slug = file.replace(/\.md$/, '');
    const title = slug.replace(/^\d+_/, '').replace(/_/g, ' ');
    return { slug, title };
  });
}

export function getSpeciesBySlug(slug: string): SpeciesProfile {
  const fullPath = path.join(contentDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { content } = matter(fileContents);

  // Fallbacks
  let title = slug.replace(/^\d+_/, '').replace(/_/g, ' ');
  let museumHook = null;
  const coreIdentity: Record<string, string> = {};

  // Extract Title: # Title
  const titleMatch = content.match(/^#\s+(.+)$/m);
  if (titleMatch) title = titleMatch[1].trim();

  // Dynamically resolve Hero Image
  let heroImage = null;
  const heroImgFile = findImageFile('Hero_Posters', slug);
  if (heroImgFile) {
    heroImage = `/visuals/Hero_Posters/${heroImgFile}`;
  }

  // Extract Museum Hook: > hook
  const hookMatch = content.match(/^>\s+(.+)$/m);
  if (hookMatch) museumHook = hookMatch[1].replace(/\*\*/g, '').trim();

  // Extract Core Identity
  const coreSectionMatch = content.match(/## 1\.\s*Core Identity\s*([\s\S]*?)(?=## 2\.|$)/);
  if (coreSectionMatch) {
    const lines = coreSectionMatch[1].split('\n');
    lines.forEach(line => {
      const bulletMatch = line.match(/-\s*\*\*(.*?):\*\*\s*(.*)/);
      if (bulletMatch) {
        coreIdentity[bulletMatch[1].trim()] = bulletMatch[2].trim();
      }
    });
  }

  // Parse the rest of the markdown into distinct sections for the tabs
  const sections: Record<string, string> = {};
  
  // Combine Range and Habitat into a single section if they exist
  let rangeContent = "";
  let habitatContent = "";

  // Split the raw content by ## headers
  // The regex matches "## 1. Header Name" or "## Header Name"
  const sectionSplit = content.split(/^##\s*(?:\d+\.\s*)?(.*?)\s*$/gm);
  
  // sectionSplit[0] is everything before the first header.
  // Then it alternates: [1] is header title, [2] is content, [3] is header title, [4] is content, etc.
  
  let currentMuseumSummary = "";

  for (let i = 1; i < sectionSplit.length; i += 2) {
    const headerTitle = sectionSplit[i].trim();
    let sectionContent = sectionSplit[i + 1].trim();

    // Pre-process Obsidian links in the section content
    sectionContent = sectionContent.replace(/\[\[(.*?)\|(.*?)\]\]/g, (match, pathStr, label) => {
      let route = '#';
      const cleanPath = pathStr.replace('.md', '').split('/').pop();
      if (pathStr.includes('01_Taxonomy')) route = `/taxonomy/${cleanPath}`;
      else if (pathStr.includes('02_Species')) route = `/species/${cleanPath}`;
      else if (pathStr.includes('03_Exhibit')) route = `/exhibits/${cleanPath}`;
      else if (pathStr.includes('05_Ecology')) route = `/ecology-and-conservation/${cleanPath}`;
      else if (pathStr.includes('06_Conservation')) route = `/ecology-and-conservation/${cleanPath}`;
      return `[${label}](${route})`;
    });

    if (headerTitle === "Museum Summary") currentMuseumSummary = sectionContent;
    else if (headerTitle === "Range") rangeContent = sectionContent;
    else if (headerTitle === "Habitat") habitatContent = sectionContent;
    else if (headerTitle === "Diet") sections["Diet and Hunting"] = sectionContent;
    else if (headerTitle === "Behaviour / Ecology") sections["Ecology"] = sectionContent;
    else if (headerTitle === "Build & Scale") sections["Build and Scale"] = sectionContent;
    else if (headerTitle === "Signature Traits") sections["Signature Traits"] = sectionContent;
    else if (headerTitle === "Conservation") sections["Conservation"] = sectionContent;
  }

  sections["Description"] = currentMuseumSummary;
  if (rangeContent || habitatContent) {
    sections["Range and Habitat"] = `### Range\n\n${rangeContent}\n\n### Habitat\n\n${habitatContent}`;
  }

  // DYNAMIC IMAGE INJECTION
  // Automatically append related visual production assets to specific exhibit tabs
  if (sections["Diet and Hunting"]) {
    const imgName = findImageFile('Hunting_Video_Posters', slug);
    if (imgName) sections["Diet and Hunting"] += `\n\n![Hunting Strategy](../04_Visual_Production/Hunting_Video_Posters/${imgName})\n`;
  }
  if (sections["Build and Scale"]) {
    const imgName = findImageFile('Anatomy_Trait_Posters', slug);
    if (imgName) sections["Build and Scale"] += `\n\n![Anatomy Traits](../04_Visual_Production/Anatomy_Trait_Posters/${imgName})\n`;
  }
  if (sections["Range and Habitat"]) {
    const imgName = findImageFile('Range_Maps', slug);
    if (imgName) sections["Range and Habitat"] += `\n\n![Range Map](../04_Visual_Production/Range_Maps/${imgName})\n`;
  }

  return {
    slug,
    title,
    heroImage,
    huntingImage: findImageFile('Hunting_Video_Posters', slug) ? `/visuals/Hunting_Video_Posters/${findImageFile('Hunting_Video_Posters', slug)}` : null,
    museumHook,
    coreIdentity,
    sections,
  };
}

export function getAllSpecies(): SpeciesProfile[] {
  const slugs = getSpeciesSlugs();
  return slugs.map(({ slug }) => getSpeciesBySlug(slug));
}
