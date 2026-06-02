import { getAboutArticleBySlug, getAllAboutArticles } from "@/lib/about";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const articles = getAllAboutArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function AboutArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getAboutArticleBySlug(slug);
  const allArticles = getAllAboutArticles();

  if (!article) return notFound();

  return (
    <main style={{ display: "flex", gap: "2rem", maxWidth: "1400px", margin: "0 auto", padding: "2rem" }}>
      {/* Sidebar Navigation */}
      <aside style={{ width: "250px", flexShrink: 0, position: "sticky", top: "100px", height: "fit-content" }}>
        <h3 style={{ marginBottom: "1rem", color: "var(--accent)", textTransform: "uppercase", fontSize: "0.9rem", letterSpacing: "1px" }}>About Us</h3>
        <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {allArticles.map(a => (
            <li key={a.slug}>
              <Link href={`/ecology-and-conservation/${a.slug}`} style={{ 
                display: "block", 
                padding: "0.5rem 1rem", 
                borderRadius: "8px", 
                background: a.slug === slug ? "rgba(255, 138, 76, 0.1)" : "transparent",
                color: a.slug === slug ? "var(--accent)" : "var(--text-muted)",
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
      <article className="markdown-body" style={{ flex: 1, background: "rgba(30, 41, 59, 0.4)", padding: "3rem", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ textTransform: "uppercase", color: "var(--accent)", letterSpacing: "2px", marginBottom: "1rem", fontSize: "0.85rem" }}>{article.category}</div>
        <h1 style={{ fontSize: "3rem", marginBottom: "2rem", fontFamily: "var(--font-outfit)" }}>{article.title}</h1>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
      </article>
    </main>
  );
}
