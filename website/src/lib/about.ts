import fs from 'fs';
import path from 'path';

export interface AboutArticle {
  slug: string;
  title: string;
  category: string;
  content: string;
  hook?: string;
}

function parseMarkdownContent(fileContent: string) {
  let title = "Unknown Title";
  let hook = "";

  const lines = fileContent.split('\n');
  const contentLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('# ')) {
      title = line.replace('# ', '').trim();
      continue;
    }
    if (line.trim() !== '' && !hook && contentLines.length === 0) {
      hook = line.trim();
    }
    contentLines.push(line);
  }

  return { title, content: contentLines.join('\n'), hook };
}

function getArticlesFromDir(dirName: string, category: string): AboutArticle[] {
  const fullPath = path.join(process.cwd(), '..', dirName);
  if (!fs.existsSync(fullPath)) return [];
  
  const files = fs.readdirSync(fullPath).filter(f => f.endsWith('.md'));
  
  return files.map(fileName => {
    const slug = fileName.replace(/\.md$/, '');
    const contentStr = fs.readFileSync(path.join(fullPath, fileName), 'utf-8');
    const parsed = parseMarkdownContent(contentStr);
    
    return {
      slug,
      title: parsed.title,
      category,
      content: parsed.content,
      hook: parsed.hook
    };
  });
}

export function getAllAboutArticles(): AboutArticle[] {
  const ecology = getArticlesFromDir('05_Ecology_Comparisons', 'Ecology');
  const conservation = getArticlesFromDir('06_Conservation', 'Conservation');
  return [...ecology, ...conservation];
}

export function getAboutArticleBySlug(slug: string): AboutArticle | null {
  const all = getAllAboutArticles();
  return all.find(a => a.slug === slug) || null;
}
