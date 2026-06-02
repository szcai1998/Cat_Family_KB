import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <h1>Welcome to the<br/><span style={{ color: "var(--accent)" }}>Cat Family Atlas</span></h1>
        <p>A comprehensive, museum-style interactive knowledge base covering all wild and domestic species of the Felidae family.</p>
        <Link href="/species" className="explore-btn" style={{
          display: "inline-block",
          marginTop: "1rem",
          padding: "0.75rem 1.5rem",
          backgroundColor: "var(--accent)",
          color: "white",
          borderRadius: "8px",
          fontWeight: "bold",
          transition: "background-color 0.2s"
        }}>
          Explore the Gallery
        </Link>
      </section>

      <section className="masonry-grid">
        <div className="glass-card">
          <h2>The Taxonomy</h2>
          <p>Explore the evolutionary tree of the Felidae family, from the roaring Panthera to the small but mighty Felinae.</p>
        </div>
        
        <div className="glass-card">
          <h2>Species Profiles</h2>
          <p>Dive deep into detailed profiles of over 40 cat species, covering their habitat, diet, and unique adaptations.</p>
        </div>
        
        <div className="glass-card">
          <h2>Ecology & Conservation</h2>
          <p>Understand the delicate balance of ecosystems and the ongoing efforts to protect endangered felines worldwide.</p>
        </div>
      </section>
    </main>
  );
}
