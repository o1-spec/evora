"use client";

import Link from "next/link";

export default function TopBar() {
  return (
    <div
      style={{
        backgroundColor: "hsl(var(--bg-base))",
        borderBottom: "1px solid hsl(var(--border))",
        fontSize: "0.8125rem",
        color: "hsl(var(--text-secondary))",
      }}
      className="hidden md:block py-2 px-4"
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div>
          <span>Bienvenue sur la plateforme de préparation au TCF Canada</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <Link
            href="#academy"
            style={{ color: "inherit", textDecoration: "none" }}
            onMouseOver={(e) => (e.currentTarget.style.color = "hsl(var(--primary))")}
            onMouseOut={(e) => (e.currentTarget.style.color = "inherit")}
          >
            Formations
          </Link>
          <Link
            href="#pricing"
            style={{ color: "inherit", textDecoration: "none" }}
            onMouseOver={(e) => (e.currentTarget.style.color = "hsl(var(--primary))")}
            onMouseOut={(e) => (e.currentTarget.style.color = "inherit")}
          >
            Tarifs
          </Link>
          <Link
            href="#blog"
            style={{ color: "inherit", textDecoration: "none" }}
            onMouseOver={(e) => (e.currentTarget.style.color = "hsl(var(--primary))")}
            onMouseOut={(e) => (e.currentTarget.style.color = "inherit")}
          >
            Blog
          </Link>
          <Link
            href="#contact"
            style={{ color: "inherit", textDecoration: "none" }}
            onMouseOver={(e) => (e.currentTarget.style.color = "hsl(var(--primary))")}
            onMouseOut={(e) => (e.currentTarget.style.color = "inherit")}
          >
            Contactez-nous
          </Link>
          <a
            href="https://wa.me/message/TCF_CANADA"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.25rem",
              color: "#25d366",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="currentColor"
              style={{ display: "inline-block", verticalAlign: "middle" }}
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.59-4.846c1.6.95 3.197 1.45 4.817 1.451 5.433 0 9.851-4.407 9.854-9.842.002-2.634-1.02-5.11-2.88-6.974-1.86-1.865-4.332-2.891-6.97-2.892-5.44 0-9.858 4.41-9.862 9.845-.002 1.83.476 3.618 1.385 5.183l-.99 3.616 3.7-.971zm10.743-6.993c-.272-.136-1.61-.795-1.86-.886-.25-.092-.432-.136-.613.136-.182.273-.705.886-.863 1.068-.159.182-.318.205-.59.069-.272-.136-1.15-.424-2.19-1.353-.809-.722-1.355-1.614-1.514-1.886-.159-.273-.017-.42.119-.556.122-.122.272-.318.408-.477.136-.159.182-.273.272-.455.09-.182.046-.341-.023-.477-.069-.136-.613-1.477-.84-2.023-.222-.534-.447-.463-.613-.471-.159-.008-.341-.01-.523-.01s-.477.068-.727.341c-.25.273-.954.932-.954 2.273 0 1.341.977 2.636 1.114 2.818.137.182 1.92 2.932 4.653 4.114.65.281 1.157.449 1.552.574.653.207 1.248.178 1.717.108.523-.078 1.61-.659 1.838-1.295.227-.637.227-1.182.159-1.295-.068-.113-.25-.182-.523-.318z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
