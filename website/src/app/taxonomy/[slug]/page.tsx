import { getTaxonomyBySlug, getAllTaxonomyArticles } from "@/lib/taxonomy";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";

export async function generateStaticParams() {
  const articles = getAllTaxonomyArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function TaxonomyArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getTaxonomyBySlug(slug);
  const allArticles = getAllTaxonomyArticles();

  if (!article) {
    return <div>Article not found</div>;
  }

  const contentWithoutTitle = article.content.replace(/^#\s+(.+)$/m, '');

  return (
    <main style={{ display: "flex", gap: "2rem", maxWidth: "1400px", margin: "0 auto", padding: "2rem" }}>
      {/* Sidebar Navigation */}
      <aside style={{ width: "250px", flexShrink: 0, position: "sticky", top: "100px", height: "fit-content" }}>
        <h3 style={{ marginBottom: "1rem", color: "var(--accent)", textTransform: "uppercase", fontSize: "0.9rem", letterSpacing: "1px" }}>Taxonomy</h3>
        <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {allArticles.map(a => (
            <li key={a.slug}>
              <Link href={`/taxonomy/${a.slug}`} style={{ 
                display: "block", 
                padding: "0.5rem 1rem", 
                borderRadius: "8px", 
                background: a.slug === slug ? "rgba(255, 138, 76, 0.1)" : "transparent",
                color: a.slug === slug ? "var(--accent)" : "#cbd5e1",
                textDecoration: "none",
                fontSize: "0.95rem",
                transition: "all 0.2s ease"
              }}>
                {a.title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <article className="glass-card animate-fade-in" style={{ flex: 1, padding: "3rem", color: "#cbd5e1" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "2rem", fontFamily: "var(--font-outfit)" }}>{article.title}</h1>
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({node, ...props}) => <h2 style={{ color: 'var(--accent)', marginTop: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-outfit)' }} {...props} />,
            h3: ({node, ...props}) => <h3 style={{ color: '#fff', marginTop: '1.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-outfit)' }} {...props} />,
            p: ({node, ...props}) => <p style={{ marginBottom: '1.2rem', lineHeight: '1.8' }} {...props} />,
            ul: ({node, ...props}) => <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }} {...props} />,
            li: ({node, ...props}) => <li style={{ marginBottom: '0.5rem' }} {...props} />,
            a: ({node, href, ...props}) => {
              return <a href={href} style={{ color: 'var(--accent)', textDecoration: 'underline' }} {...props} />;
            },
            img: ({node, src, ...props}) => {
              let finalSrc = src;
              if (typeof src === 'string' && src.includes('04_Visual_Production')) {
                finalSrc = src.replace(/.*04_Visual_Production\//, '/visuals/');
              }
              return <img src={finalSrc} style={{ maxWidth: '100%', borderRadius: '12px', margin: '2.5rem auto', display: "block", boxShadow: '0 15px 40px rgba(0,0,0,0.6)' }} {...props} />;
            }
          }}
        >
          {contentWithoutTitle}
        </ReactMarkdown>
      </article>
    </main>
  );
}
