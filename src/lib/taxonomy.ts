import fs from 'fs';
import path from 'path';

const taxonomyDirectory = path.join(process.cwd(), '01_Taxonomy_and_Evolution');

export interface TaxonomyArticle {
  slug: string;
  title: string;
  snippet: string;
  content: string;
}

export function getAllTaxonomyArticles(): TaxonomyArticle[] {
  const fileNames = fs.readdirSync(taxonomyDirectory);
  
  const allArticles = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(taxonomyDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Extract title from the first H1
      const titleMatch = fileContents.match(/^#\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1].trim() : slug.replace(/_/g, ' ');

      // Extract a text snippet for the card preview (first paragraph after the title/image)
      // Remove images, headers, and get the first chunk of text
      const cleanText = fileContents
        .replace(/^#.*$/gm, '') // Remove headers
        .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
        .trim();
        
      const snippet = cleanText.substring(0, 150) + '...';

      return {
        slug,
        title,
        snippet,
        content: fileContents
      };
    });

  return allArticles;
}

export function getTaxonomyBySlug(slug: string): TaxonomyArticle {
  const fullPath = path.join(taxonomyDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  const titleMatch = fileContents.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : slug.replace(/_/g, ' ');

  return {
    slug,
    title,
    snippet: '',
    content: fileContents
  };
}
