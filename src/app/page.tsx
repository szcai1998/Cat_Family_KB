import Link from "next/link";

export default function Home() {
  return (
    <div style={{ 
      position: "relative", 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "center", 
      alignItems: "center", 
      textAlign: "center",
      overflow: "hidden"
    }}>
      {/* Background Image */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: "url('/visuals/atlas_entrance_group.png')",
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
        zIndex: 0
      }} />
      
      {/* Dark gradient overlay */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(to bottom, rgba(10, 10, 12, 0.3), rgba(10, 10, 12, 0.95))",
        zIndex: 1
      }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: "800px", padding: "0 2rem", marginTop: "4rem" }}>
        <h1 style={{ fontSize: "5rem", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "1.5rem", textShadow: "0 4px 20px rgba(0,0,0,0.8)", fontFamily: "var(--font-outfit)" }}>
          Welcome to the<br/><span style={{ color: "var(--accent)" }}>Cat Family Atlas</span>
        </h1>
        <p style={{ fontSize: "1.25rem", lineHeight: "1.8", marginBottom: "3rem", color: "#e2e8f0", textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
          A comprehensive, museum-style interactive knowledge base covering all wild and domestic species of the Felidae family. Step into the gallery and explore the evolution, ecology, and breathtaking diversity of the world's most perfect predators.
        </p>
        <Link href="/species" className="explore-btn" style={{
          display: "inline-block",
          padding: "1rem 2.5rem",
          backgroundColor: "var(--accent)",
          color: "#000",
          borderRadius: "50px",
          fontWeight: "bold",
          fontSize: "1.1rem",
          textTransform: "uppercase",
          letterSpacing: "1px",
          transition: "all 0.3s ease",
          boxShadow: "0 10px 20px rgba(255, 138, 76, 0.3)"
        }}>
          Enter the Atlas
        </Link>
      </div>
    </div>
  );
}
