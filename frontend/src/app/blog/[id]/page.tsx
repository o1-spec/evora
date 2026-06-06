"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User, ChevronRight, BookOpen, BookMarked } from "lucide-react";
import PublicLayout from "@/components/portal/PublicLayout";
import { blogPosts } from "@/lib/blogPosts";

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

export default function BlogPostDetailPage({ params }: BlogPostPageProps) {
  // Unwrap params using React.use()
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <PublicLayout>
        <div style={{ backgroundColor: "hsl(var(--bg-base))", minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
          <div style={{ textAlign: "center", backgroundColor: "white", padding: "3rem", borderRadius: "1.5rem", border: "1px solid hsl(var(--border))", maxWidth: "480px" }}>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "hsl(var(--text-primary))", marginBottom: "1rem" }}>
              Fiche Introuvable
            </h2>
            <p style={{ color: "hsl(var(--text-secondary))", marginBottom: "2rem", fontSize: "0.95rem" }}>
              Désolé, la fiche d'astuces ou l'article demandé n'existe pas ou a été déplacé.
            </p>
            <Link href="/blog" className="btn-primary" style={{ padding: "0.75rem 1.5rem" }}>
              <ArrowLeft size={16} />
              Retour au blog
            </Link>
          </div>
        </div>
      </PublicLayout>
    );
  }

  // Get related articles (up to 3)
  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <PublicLayout>
      {/* Article Header Banner */}
      <div 
        style={{
          background: `linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(262 70% 30%) 100%)`,
          padding: "5rem 1.5rem 4rem 1.5rem",
          color: "white",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Soft background light blooms */}
        <div style={{ position: "absolute", top: "-10%", left: "20%", width: "300px", height: "300px", background: "rgba(255, 255, 255, 0.08)", borderRadius: "50%", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "-20%", right: "15%", width: "250px", height: "250px", background: "rgba(255, 255, 255, 0.06)", borderRadius: "50%", filter: "blur(60px)" }} />

        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          {/* Breadcrumbs / Back button */}
          <Link 
            href="/blog" 
            style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              gap: "0.4rem", 
              color: "rgba(255, 255, 255, 0.8)", 
              textDecoration: "none",
              fontSize: "0.85rem",
              fontWeight: 600,
              marginBottom: "2rem",
              backgroundColor: "rgba(255,255,255,0.08)",
              padding: "0.4rem 0.85rem",
              borderRadius: "0.5rem",
              border: "1px solid rgba(255,255,255,0.1)",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "white"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)"; }}
          >
            <ArrowLeft size={14} />
            Toutes les fiches d'astuces
          </Link>

          {/* Category Tag */}
          <div style={{ marginBottom: "1.25rem" }}>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                backgroundColor: post.bgColor,
                color: post.badgeColor,
                padding: "0.3rem 0.75rem",
                borderRadius: "0.5rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em"
              }}
            >
              {post.category}
            </span>
            <span style={{ fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.8)", fontWeight: 600, marginLeft: "1rem" }}>
              {post.difficulty}
            </span>
          </div>

          {/* Title */}
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 900, lineHeight: 1.2, color: "white", marginBottom: "1.5rem" }}>
            {post.title}
          </h1>

          {/* Metadata */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", fontSize: "0.85rem", color: "rgba(255,255,255,0.8)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <User size={14} />
              Par {post.author}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <Calendar size={14} />
              {post.date}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <Clock size={14} />
              {post.readTime}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div style={{ backgroundColor: "hsl(var(--bg-base))", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", width: "100%" }}>
          {/* Main Card holding text */}
          <div 
            className="card p-6 md:p-12" 
            style={{ 
              backgroundColor: "white", 
              borderRadius: "1.5rem", 
              boxShadow: "0 4px 20px -2px rgba(0,0,0,0.03)",
              marginBottom: "4rem"
            }}
          >
            <div className="prose max-w-none text-slate-700">
              {post.content}
            </div>
          </div>

          {/* Related Articles Section */}
          {relatedPosts.length > 0 && (
            <div>
              <h3 style={{ fontSize: "1.5rem", fontFamily: "Outfit, sans-serif", fontWeight: 800, color: "hsl(var(--text-primary))", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <BookMarked size={20} color="hsl(var(--primary))" />
                Fiches d'astuces recommandées
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.id}
                    href={`/blog/${related.id}`}
                    style={{ textDecoration: "none" }}
                    className="card hover:shadow-lg hover:-translate-y-1 transition-all"
                  >
                    <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between", backgroundColor: "white", borderRadius: "1rem" }}>
                      <div>
                        <span style={{ fontSize: "0.7rem", fontWeight: 700, backgroundColor: related.bgColor, color: related.badgeColor, padding: "0.2rem 0.5rem", borderRadius: "0.25rem", display: "inline-block", marginBottom: "0.75rem" }}>
                          {related.category}
                        </span>
                        <h4 style={{ fontSize: "0.9rem", fontWeight: 800, color: "hsl(var(--text-primary))", lineHeight: 1.3, marginBottom: "0.5rem" }}>
                          {related.title}
                        </h4>
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))", borderTop: "1px solid hsl(var(--border))", paddingTop: "0.75rem", marginTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span>{related.readTime}</span>
                        <ChevronRight size={14} color="hsl(var(--primary))" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
