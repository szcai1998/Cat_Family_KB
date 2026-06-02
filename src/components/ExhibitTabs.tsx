"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Link from "next/link";

interface ExhibitTabsProps {
  sections: Record<string, string>;
  museumHook: string | null;
  coreIdentity: Record<string, string>;
}

const TABS = [
  "Description",
  "Diet and Hunting",
  "Ecology",
  "Build and Scale",
  "Signature Traits",
  "Range and Habitat",
  "Conservation"
];

export default function ExhibitTabs({ sections, museumHook, coreIdentity }: ExhibitTabsProps) {
  const [activeTab, setActiveTab] = useState("Description");

  const currentContent = sections[activeTab] || "*Exhibit data currently being compiled...*";

  return (
    <div style={{ marginTop: "3rem" }}>
      <nav style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "0.75rem 1.5rem",
                background: isActive ? "var(--accent)" : "rgba(30, 41, 59, 0.4)",
                color: isActive ? "#000" : "#cbd5e1",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "0.95rem",
                fontWeight: isActive ? "bold" : "normal",
                transition: "all 0.2s ease"
              }}
            >
              {tab}
            </button>
          );
        })}
      </nav>

      <article className="glass-card animate-fade-in" key={activeTab} style={{ minHeight: "50vh", padding: "3rem" }}>
        <div style={{ color: "#cbd5e1" }}>
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({node, ...props}) => <h2 style={{ color: 'var(--accent)', marginTop: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-outfit)' }} {...props} />,
              h3: ({node, ...props}) => <h3 style={{ color: '#fff', marginTop: '1.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-outfit)' }} {...props} />,
              p: ({node, ...props}) => <p style={{ marginBottom: '1.2rem', lineHeight: '1.8' }} {...props} />,
              ul: ({node, ...props}) => <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }} {...props} />,
              li: ({node, ...props}) => <li style={{ marginBottom: '0.5rem' }} {...props} />,
              a: ({node, href, ...props}) => {
                if (href?.startsWith('../04_Visual_Production')) {
                  const cleanHref = href.replace(/.*04_Visual_Production\//, '/visuals/');
                  return <img src={cleanHref} alt={props.children?.toString() || 'Image'} style={{ maxWidth: '100%', borderRadius: '8px', margin: '2rem 0', display: "block" }} />;
                }
                return <a href={href} style={{ color: 'var(--accent)', textDecoration: 'underline' }} {...props} />;
              },
              img: ({node, src, ...props}) => {
                let finalSrc = src;
                if (src?.includes('04_Visual_Production')) {
                  finalSrc = src.replace(/.*04_Visual_Production\//, '/visuals/');
                }
                return <img src={finalSrc} style={{ maxWidth: '100%', borderRadius: '8px', margin: '2rem 0', display: "block", boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }} {...props} />;
              }
            }}
          >
            {currentContent}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
