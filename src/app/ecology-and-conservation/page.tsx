import { getAllAboutArticles } from "@/lib/about";
import Link from "next/link";

export default function EcologyAndConservationPage() {
  const articles = getAllAboutArticles();
  
  return (
    <main>
      <section className="hero" style={{ height: "auto", padding: "4rem 0" }}>
        <h1>About Us</h1>
        <p>Understand the ecological roles, habitats, and modern threats facing the world's wild cats.</p>
      </section>

      <section className="museum-grid">
        {articles.map((article) => (
          <Link href={`/ecology-and-conservation/${article.slug}`} key={article.slug}>
            <div className="glass-card" style={{ cursor: "pointer", height: "100%", padding: "1.5rem", display: 'flex', flexDirection: 'column' }}>
              <div style={{ textTransform: "uppercase", fontSize: "0.8rem", color: "var(--accent)", letterSpacing: "1px", marginBottom: "0.5rem" }}>
                {article.category}
              </div>
              <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>{article.title}</h2>
              {article.hook && (
                <p style={{ color: "#94a3b8", fontSize: "0.95rem", flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {article.hook}
                </p>
              )}
              <div style={{ marginTop: "1.5rem", color: "var(--accent)", fontWeight: "bold", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>
                Read Article &rarr;
              </div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
