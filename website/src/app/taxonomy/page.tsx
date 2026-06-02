import { getAllTaxonomyArticles } from "@/lib/taxonomy";
import Link from "next/link";

export default function TaxonomyIndex() {
  const articles = getAllTaxonomyArticles();

  return (
    <main>
      <section className="hero" style={{ height: "auto", padding: "4rem 0" }}>
        <h1 className="hero-title" style={{ fontSize: "3.5rem" }}>Taxonomy & Evolution</h1>
        <p className="museum-placard" style={{ margin: "1rem 0 0 0", borderLeft: "none", paddingLeft: 0 }}>
          Trace the evolutionary history of the Felidae family tree.
        </p>
      </section>

      <section className="museum-grid">
        {articles.map((article) => (
          <Link href={`/taxonomy/${article.slug}`} key={article.slug}>
            <div className="glass-card" style={{ cursor: "pointer", height: "100%", display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>{article.title}</h2>
              <p style={{ color: "#94a3b8", fontSize: "0.95rem", flex: 1 }}>
                {article.snippet}
              </p>
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
