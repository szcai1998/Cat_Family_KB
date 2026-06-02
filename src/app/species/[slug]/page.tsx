import { getSpeciesBySlug, getSpeciesSlugs } from "@/lib/markdown";
import ExhibitTabs from "@/components/ExhibitTabs";

import Link from "next/link";

export async function generateStaticParams() {
  const slugs = getSpeciesSlugs();
  return slugs.map((s) => ({
    slug: s.slug,
  }));
}

export default async function SpeciesProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const species = getSpeciesBySlug(slug);
  const speciesList = getSpeciesSlugs();

  return (
    <div style={{ display: "flex", gap: "2rem", maxWidth: "1600px", margin: "0 auto", padding: "2rem" }}>
      {/* Sidebar Navigation */}
      <aside style={{ width: "250px", flexShrink: 0, position: "sticky", top: "100px", height: "fit-content" }}>
        <h3 style={{ color: "var(--accent)", marginBottom: "1rem", borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>
          Explore Species
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.25rem", maxHeight: "calc(100vh - 140px)", overflowY: "auto", paddingRight: "0.5rem" }}>
          {speciesList.map((s) => (
            <li key={s.slug}>
              <Link href={`/species/${s.slug}`} style={{
                display: "block",
                padding: "0.4rem 0.5rem",
                borderRadius: "4px",
                background: s.slug === slug ? "rgba(255, 138, 76, 0.1)" : "transparent",
                color: s.slug === slug ? "var(--accent)" : "#cbd5e1",
                textDecoration: "none",
                fontSize: "0.85rem",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}>
                {s.title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, minWidth: 0 }}>
        <section className="hero-split">
          <div className="hero-poster-container">
            {species.heroImage && (
              <img src={species.heroImage} alt={species.title} />
            )}
          </div>
          
          <div className="hero-content">
            <h1 className="hero-title">{species.title}</h1>
            
            {species.museumHook && (
              <div className="museum-placard">
                {species.museumHook}
              </div>
            )}

            {Object.keys(species.coreIdentity).length > 0 && (
              <div className="glass-card" style={{ padding: "1.5rem" }}>
                <h3 style={{ marginBottom: "1rem", borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Core Identity</h3>
                <ul style={{ listStyle: 'none', padding: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                  {Object.entries(species.coreIdentity).map(([key, value]) => (
                    <li key={key} style={{ fontSize: '0.95rem' }}>
                      <strong style={{ color: '#cbd5e1' }}>{key}:</strong> {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* We pass the sections, core identity, and hook to the interactive Client Component */}
        <ExhibitTabs 
          sections={species.sections} 
          museumHook={species.museumHook} 
          coreIdentity={species.coreIdentity} 
        />
      </main>
    </div>
  );
}
