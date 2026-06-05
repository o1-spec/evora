"use client";

import { useState, useMemo } from "react";
import { Search, Clock, ChevronRight, ChevronLeft, BookMarked, HelpCircle } from "lucide-react";
import Link from "next/link";
import PublicLayout from "@/components/portal/PublicLayout";
import PublicPageHero from "@/components/portal/PublicPageHero";
import { blogPosts } from "@/lib/blogPosts";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const POSTS_PER_PAGE = 9;

  const categories = ["Tous", "Cheat Sheet", "Expression Écrite", "Expression Orale", "Compréhension", "Grammaire"];

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "Tous" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  return (
    <PublicLayout>
      <PublicPageHero
        title="Fiches & Astuces TCF Canada"
        subtitle="Découvrez nos fiches récapitulatives, modèles rédigés et conseils d'examinateurs officiels conçus par nos experts linguistiques pour propulser votre CLB."
        badge="Le Blog Évora"
        badgeColor="hsl(var(--primary))"
        accentIcon={<BookMarked size={12} />}
      />

      {/* Main Container */}
      <div style={{ backgroundColor: "hsl(var(--bg-base))", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
          
          {/* Controls Bar: Categories & Search */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "3rem" }}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1.5rem" }}>
              {/* Category Pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {categories.map((category) => {
                  const isActive = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      style={{
                        padding: "0.5rem 1rem",
                        borderRadius: "0.75rem",
                        border: "1px solid hsl(var(--border))",
                        backgroundColor: isActive ? "hsl(var(--primary))" : "white",
                        color: isActive ? "white" : "hsl(var(--text-secondary))",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        cursor: "pointer",
                        boxShadow: isActive ? "0 4px 10px rgba(139, 92, 246, 0.15)" : "none",
                        transition: "all 0.2s"
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.backgroundColor = "hsl(var(--primary-light))";
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) e.currentTarget.style.backgroundColor = "white";
                      }}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>

              {/* Search Bar */}
              <div style={{ position: "relative", width: "100%", maxWidth: "340px" }} className="flex">
                <input
                  type="text"
                  placeholder="Rechercher une fiche ou astuce..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.6rem 1rem 0.6rem 2.5rem",
                    borderRadius: "0.75rem",
                    border: "1px solid hsl(var(--border))",
                    backgroundColor: "white",
                    fontSize: "0.875rem",
                    color: "hsl(var(--text-primary))",
                    outline: "none",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
                    transition: "all 0.2s"
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = "hsl(var(--primary))"}
                  onBlur={(e) => e.currentTarget.style.borderColor = "hsl(var(--border))"}
                />
                <Search size={16} color="hsl(var(--text-muted))" style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)" }} />
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          {filteredPosts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "5rem 1.5rem", backgroundColor: "white", borderRadius: "1.25rem", border: "1px solid hsl(var(--border))" }}>
              <HelpCircle size={48} color="hsl(var(--text-muted))" style={{ margin: "0 auto 1.5rem" }} />
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "hsl(var(--text-primary))", marginBottom: "0.5rem" }}>Aucun article trouvé</h3>
              <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.9rem" }}>Essayez de modifier votre recherche ou de changer de catégorie.</p>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.id}`}
                    style={{ textDecoration: "none" }}
                    className="card hover:-translate-y-1 transition-all"
                  >
                    <div
                      style={{
                        backgroundColor: "white",
                        padding: "1.75rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        minHeight: "280px",
                        borderRadius: "1rem",
                        height: "100%"
                      }}
                    >
                      <div>
                        {/* Top row */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                          <span
                            style={{
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              backgroundColor: post.bgColor,
                              color: post.badgeColor,
                              padding: "0.25rem 0.6rem",
                              borderRadius: "0.375rem",
                            }}
                          >
                            {post.category}
                          </span>
                          <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "hsl(var(--text-muted))" }}>
                            {post.difficulty}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 style={{ fontSize: "1.1rem", fontWeight: 800, lineHeight: 1.4, color: "hsl(var(--text-primary))", marginBottom: "0.75rem" }}>
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p style={{ fontSize: "0.875rem", color: "hsl(var(--text-secondary))", lineHeight: 1.5, marginBottom: "1.5rem" }}>
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Metadata Row */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid hsl(var(--border))", paddingTop: "1rem", marginTop: "auto" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.75rem", color: "hsl(var(--text-muted))" }}>
                          <Clock size={12} />
                          {post.readTime}
                        </div>
                        <span
                          style={{
                            fontSize: "0.8rem",
                            fontWeight: 700,
                            color: "hsl(var(--primary))",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.25rem",
                          }}
                        >
                          Lire la fiche
                          <ChevronRight size={14} />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", marginTop: "4rem" }}>
                  {/* Previous Button */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "2.5rem",
                      height: "2.5rem",
                      borderRadius: "0.75rem",
                      border: "1px solid hsl(var(--border))",
                      backgroundColor: "white",
                      color: currentPage === 1 ? "hsl(var(--text-muted))" : "hsl(var(--text-secondary))",
                      cursor: currentPage === 1 ? "not-allowed" : "pointer",
                      transition: "all 0.2s"
                    }}
                    onMouseEnter={(e) => {
                      if (currentPage !== 1) e.currentTarget.style.backgroundColor = "hsl(var(--bg-base))";
                    }}
                    onMouseLeave={(e) => {
                      if (currentPage !== 1) e.currentTarget.style.backgroundColor = "white";
                    }}
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {/* Page Numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    const isCurrent = page === currentPage;
                    const shouldRender = page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1;
                    const isEllipsis = page !== 1 && page !== totalPages && Math.abs(page - currentPage) === 2;

                    if (isEllipsis) {
                      return (
                        <span key={`ellipsis-${page}`} style={{ color: "hsl(var(--text-muted))", padding: "0 0.25rem", fontSize: "0.875rem" }}>
                          ...
                        </span>
                      );
                    }

                    if (!shouldRender) return null;

                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "2.5rem",
                          height: "2.5rem",
                          borderRadius: "0.75rem",
                          border: isCurrent ? "1px solid hsl(var(--primary))" : "1px solid hsl(var(--border))",
                          backgroundColor: isCurrent ? "hsl(var(--primary))" : "white",
                          color: isCurrent ? "white" : "hsl(var(--text-secondary))",
                          fontWeight: 600,
                          fontSize: "0.875rem",
                          cursor: "pointer",
                          boxShadow: isCurrent ? "0 4px 10px rgba(139, 92, 246, 0.2)" : "none",
                          transition: "all 0.2s"
                        }}
                        onMouseEnter={(e) => {
                          if (!isCurrent) e.currentTarget.style.backgroundColor = "hsl(var(--bg-base))";
                        }}
                        onMouseLeave={(e) => {
                          if (!isCurrent) e.currentTarget.style.backgroundColor = "white";
                        }}
                      >
                        {page}
                      </button>
                    );
                  })}

                  {/* Next Button */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "2.5rem",
                      height: "2.5rem",
                      borderRadius: "0.75rem",
                      border: "1px solid hsl(var(--border))",
                      backgroundColor: "white",
                      color: currentPage === totalPages ? "hsl(var(--text-muted))" : "hsl(var(--text-secondary))",
                      cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                      transition: "all 0.2s"
                    }}
                    onMouseEnter={(e) => {
                      if (currentPage !== totalPages) e.currentTarget.style.backgroundColor = "hsl(var(--bg-base))";
                    }}
                    onMouseLeave={(e) => {
                      if (currentPage !== totalPages) e.currentTarget.style.backgroundColor = "white";
                    }}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
