import { getAllSpecies } from "@/lib/markdown";
import Link from "next/link";

export default function SpeciesIndex() {
  const speciesList = getAllSpecies();

  return (
    <main>
      <section className="hero" style={{ height: "auto", padding: "4rem 0" }}>
        <h1>The Galleries</h1>
        <p>Explore our comprehensive collection of feline profiles.</p>
      </section>

      <section className="museum-grid">
        {speciesList.map((species) => (
          <Link href={`/species/${species.slug}`} key={species.slug}>
            <div className="glass-card" style={{ cursor: "pointer", height: "100%", padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              {species.huntingImage && (
                <div style={{ height: "250px", width: "100%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.2)" }}>
                  <img 
                    src={species.huntingImage} 
                    alt={species.title} 
                    style={{ width: "100%", height: "100%", objectFit: "contain", transition: "transform 0.5s ease" }}
                  />
                </div>
              )}
              <div style={{ padding: "1.5rem", flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{species.title}</h2>
                {species.museumHook && (
                  <p style={{ color: "#94a3b8", fontSize: "0.95rem", flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {species.museumHook}
                  </p>
                )}
                <div style={{ marginTop: "1.5rem", color: "var(--accent)", fontWeight: "bold", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>
                  View Exhibit &rarr;
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
