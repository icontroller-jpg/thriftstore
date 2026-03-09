import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const filters = ["All", "Women", "Men"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&family=Didact+Gothic&display=swap');

        :root {
          --ivory:  #f2ede4;
          --ink:    #0e0d0b;
          --ink-50: rgba(14,13,11,0.5);
          --ink-20: rgba(14,13,11,0.2);
          --ink-10: rgba(14,13,11,0.1);
          --warm:   #b5a48a;
        }

        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          scroll-behavior: smooth;
          -webkit-text-size-adjust: 100%;
          text-size-adjust: 100%;
        }

        body {
          background: var(--ivory);
          color: var(--ink);
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }

        /* ── NAV ── */
        .nav {
          position: sticky;
          top: 0;
          z-index: 100;
          background: var(--ivory);
          border-bottom: 1px solid var(--ink-10);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          height: 52px;
          gap: 16px;
          opacity: 0;
          animation: fadeIn 0.6s ease forwards;
        }

        .nav-left {
          display: flex;
          gap: 24px;
          flex: 1;
          align-items: center;
        }

        .nav-logo {
          font-family: 'IM Fell English', serif;
          font-size: 14px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--ink);
          white-space: nowrap;
          flex-shrink: 0;
        }

        .nav-right {
          display: flex;
          justify-content: flex-end;
          gap: 24px;
          flex: 1;
          align-items: center;
        }

        .nav-link {
          font-family: 'Didact Gothic', sans-serif;
          font-size: 9.5px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--ink-50);
          text-decoration: none;
          transition: color 0.2s;
          white-space: nowrap;
          -webkit-tap-highlight-color: transparent;
        }
        .nav-link:hover { color: var(--ink); }

        /* Hamburger */
        .nav-hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          cursor: pointer;
          width: 44px;
          height: 44px;
          align-items: center;
          background: none;
          border: none;
          flex-shrink: 0;
          -webkit-tap-highlight-color: transparent;
        }
        .nav-hamburger span {
          display: block;
          width: 22px;
          height: 1px;
          background: var(--ink);
          transition: transform 0.25s, opacity 0.25s;
        }
        .nav-hamburger.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
        .nav-hamburger.open span:nth-child(2) { opacity: 0; }
        .nav-hamburger.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

        /* Mobile drawer */
        .mobile-menu {
          display: none;
          position: fixed;
          top: 52px;
          left: 0;
          right: 0;
          background: var(--ivory);
          border-bottom: 1px solid var(--ink-10);
          z-index: 99;
          flex-direction: column;
          padding: 20px 24px;
          gap: 0;
          opacity: 0;
          transform: translateY(-8px);
          transition: opacity 0.25s, transform 0.25s;
          pointer-events: none;
        }
        .mobile-menu.open {
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
        }
        .mobile-menu-link {
          font-family: 'Didact Gothic', sans-serif;
          font-size: 11px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--ink-50);
          text-decoration: none;
          padding: 14px 0;
          display: block;
          -webkit-tap-highlight-color: transparent;
          border-bottom: 1px solid var(--ink-10);
        }
        .mobile-menu-link:last-of-type { border-bottom: none; }
        .mobile-menu-link:active { color: var(--ink); }

        /* ── MARQUEE ── */
        .marquee-strip {
          border-bottom: 1px solid var(--ink-10);
          overflow: hidden;
          height: 30px;
          display: flex;
          align-items: center;
          opacity: 0;
          animation: fadeIn 0.6s ease forwards 0.1s;
        }
        .marquee-inner {
          display: flex;
          white-space: nowrap;
          animation: marquee 28s linear infinite;
        }
        .marquee-item {
          font-family: 'Didact Gothic', sans-serif;
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--ink-50);
          padding: 0 28px;
        }
        .marquee-dot { color: var(--warm); padding: 0 2px; }

        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        /* ── HERO ── */
        .hero {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          align-items: end;
          padding: 72px 40px 64px;
          border-bottom: 1px solid var(--ink-10);
          gap: 0 40px;
          opacity: 0;
          animation: riseUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards 0.2s;
        }

        .hero-meta { padding-bottom: 8px; }
        .hero-meta-line {
          font-family: 'Didact Gothic', sans-serif;
          font-size: 9.5px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--ink-50);
          line-height: 2.2;
        }

        .hero-center { text-align: center; }

        /* FIX: explicit color so it never goes invisible */
        .hero-title {
          font-family: 'IM Fell English', serif;
          font-weight: 400;
          font-size: clamp(52px, 7.5vw, 112px);
          line-height: 0.9;
          letter-spacing: -0.01em;
          color: #0e0d0b;
        }
        .hero-title-italic {
          font-style: italic;
          color: rgba(14,13,11,0.45);
          display: block;
        }

        .hero-right { text-align: right; padding-bottom: 8px; }
        .hero-desc {
          font-family: 'Didact Gothic', sans-serif;
          font-size: 9.5px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ink-50);
          line-height: 2.2;
          max-width: 160px;
          margin-left: auto;
        }

        /* ── TOOLBAR ── */
        .toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          height: 48px;
          border-bottom: 1px solid var(--ink-10);
          gap: 12px;
          opacity: 0;
          animation: fadeIn 0.7s ease forwards 0.5s;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .toolbar::-webkit-scrollbar { display: none; }

        .toolbar-left {
          display: flex;
          gap: 24px;
          align-items: center;
          flex-shrink: 0;
        }
        .toolbar-tag {
          font-family: 'Didact Gothic', sans-serif;
          font-size: 9.5px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--ink-50);
          cursor: pointer;
          padding: 0;
          height: 48px;
          border: none;
          border-bottom: 1px solid transparent;
          background: none;
          transition: color 0.2s, border-color 0.2s;
          white-space: nowrap;
          -webkit-tap-highlight-color: transparent;
        }
        .toolbar-tag:hover,
        .toolbar-tag.active {
          color: var(--ink);
          border-bottom-color: var(--ink);
        }
        .toolbar-right {
          font-family: 'IM Fell English', serif;
          font-size: 13px;
          font-style: italic;
          color: var(--ink-50);
          white-space: nowrap;
          flex-shrink: 0;
          margin-left: auto;
          padding-left: 24px;
        }

        /* ── GRID ── */
        .grid-wrap {
          padding: 0 40px 100px;
          opacity: 0;
          animation: riseUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards 0.65s;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-left: 1px solid var(--ink-10);
          border-top: 1px solid var(--ink-10);
        }
        .product-grid > * {
          border-right: 1px solid var(--ink-10);
          border-bottom: 1px solid var(--ink-10);
        }

        /* ── EMPTY ── */
        .empty {
          grid-column: 1 / -1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 100px 0;
          border-right: 1px solid var(--ink-10);
          border-bottom: 1px solid var(--ink-10);
        }
        .empty-serif {
          font-family: 'IM Fell English', serif;
          font-size: 36px;
          font-style: italic;
          color: var(--ink-20);
        }
        .empty-caps {
          font-family: 'Didact Gothic', sans-serif;
          font-size: 9px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--ink-20);
        }

        /* ── FOOTER ── */
        .footer {
          border-top: 1px solid var(--ink-10);
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: 28px 40px;
          gap: 12px;
          opacity: 0;
          animation: fadeIn 0.7s ease forwards 1s;
        }
        .footer-left {
          font-family: 'Didact Gothic', sans-serif;
          font-size: 9px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--ink-50);
        }
        .footer-center {
          font-family: 'IM Fell English', serif;
          font-size: 13px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--ink);
          text-align: center;
        }
        .footer-right {
          font-family: 'Didact Gothic', sans-serif;
          font-size: 9px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--ink-50);
          text-align: right;
        }

        /* ── ANIMATIONS ── */
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes riseUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ══════════════════
           TABLET ≤960px
        ══════════════════ */
        @media (max-width: 960px) {
          .nav { padding: 0 28px; }

          .hero {
            grid-template-columns: 1fr;
            text-align: center;
            padding: 56px 28px 48px;
            gap: 0;
          }
          .hero-meta  { display: none; }
          .hero-right { display: none; }

          .toolbar   { padding: 0 28px; }
          .grid-wrap { padding: 0 28px 72px; }
          .product-grid { grid-template-columns: repeat(2, 1fr); }
          .footer    { padding: 24px 28px; }
        }

        /* ══════════════════
           MOBILE ≤600px
           All iPhones
        ══════════════════ */
        @media (max-width: 600px) {
          /* Nav */
          .nav { padding: 0 20px; height: 52px; }
          .nav-left    { display: none; }
          .nav-right   { display: none; }
          .nav-hamburger { display: flex; }
          .nav-logo { font-size: 13px; letter-spacing: 0.2em; }

          .mobile-menu { display: flex; }

          /* Marquee */
          .marquee-item { padding: 0 16px; font-size: 8.5px; }

          /* Hero — explicit sizing, never empty */
          .hero {
            grid-template-columns: 1fr;
            text-align: center;
            padding: 36px 24px 32px;
          }
          .hero-title {
            font-size: 48px;
            line-height: 1;
            color: #0e0d0b !important;
          }
          .hero-title-italic {
            color: rgba(14,13,11,0.4) !important;
          }

          /* Toolbar */
          .toolbar { padding: 0 20px; height: 48px; }
          .toolbar-left { gap: 20px; }
          .toolbar-tag { font-size: 9px; }

          /* Grid — 2 columns, no side padding, full bleed */
          .grid-wrap {
            padding: 0 0 80px;
          }
          .product-grid {
            grid-template-columns: repeat(2, 1fr);
            border-left: none;
            border-right: none;
          }
          .product-grid > * {
            border-left: none;
          }
          .product-grid > *:nth-child(2n) {
            border-right: none;
          }

          /* Footer */
          .footer {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 6px;
            padding: 20px;
          }
          .footer-left  { text-align: center; }
          .footer-right { display: none; }
        }

        /* ══════════════════
           iPhone SE 375px
        ══════════════════ */
        @media (max-width: 375px) {
          .nav-logo   { font-size: 11px; letter-spacing: 0.16em; }
          .hero-title { font-size: 40px !important; }
          .toolbar-tag { font-size: 8.5px; }
          .marquee-item { padding: 0 12px; font-size: 8px; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav className="nav">
        <div className="nav-left">
          <a className="nav-link" href="#">New Arrivals</a>
          <a className="nav-link" href="#">Women</a>
          <a className="nav-link" href="#">Men</a>
        </div>
        <span className="nav-logo">Pridepzw</span>
        <div className="nav-right">
          <a className="nav-link" href="#">Search</a>
        </div>
        <button
          className={`nav-hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <a className="mobile-menu-link" href="#" onClick={() => setMenuOpen(false)}>New Arrivals</a>
        <a className="mobile-menu-link" href="#" onClick={() => setMenuOpen(false)}>Women</a>
        <a className="mobile-menu-link" href="#" onClick={() => setMenuOpen(false)}>Men</a>
        <a className="mobile-menu-link" href="#" onClick={() => setMenuOpen(false)}>Accessories</a>
        <a className="mobile-menu-link" href="#" onClick={() => setMenuOpen(false)}>Search</a>
      </div>

      {/* ── MARQUEE ── */}
      <div className="marquee-strip">
        <div className="marquee-inner">
          {[...Array(2)].map((_, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center" }}>
              <span className="marquee-item">Curated Secondhand</span>
              <span className="marquee-dot">·</span>
              <span className="marquee-item">One of a Kind</span>
              <span className="marquee-dot">·</span>
              <span className="marquee-item">Slow Fashion</span>
              <span className="marquee-dot">·</span>
              <span className="marquee-item">Conscious Living</span>
              <span className="marquee-dot">·</span>
              <span className="marquee-item">New Pieces Weekly</span>
              <span className="marquee-dot">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-meta">
          <p className="hero-meta-line">Est. 2026</p>
          <p className="hero-meta-line">Harare, ZW</p>
          <p className="hero-meta-line">Thrift Collection</p>
        </div>
        <div className="hero-center">
          <h1 className="hero-title">
            The
            <span className="hero-title-italic">Thrift</span>
            Plug
          </h1>
        </div>
        <div className="hero-right">
          <p className="hero-desc">
            Pre-loved pieces selected for quality, character &amp; style.
          </p>
        </div>
      </section>

      {/* ── TOOLBAR ── */}
      <div className="toolbar">
        <div className="toolbar-left">
          {filters.map((f) => (
            <button
              key={f}
              className={`toolbar-tag ${activeFilter === f ? "active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="toolbar-right">{products.length} pieces</div>
      </div>

      {/* ── GRID ── */}
      <div className="grid-wrap">
        <div className="product-grid">
          {products.length === 0 ? (
            <div className="empty">
              <p className="empty-serif">—</p>
              <p className="empty-caps">No pieces found</p>
            </div>
          ) : (
            products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))
          )}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <span className="footer-left">© 2026 Pridepzw</span>
        <span className="footer-center">Pridepzw</span>
        <span className="footer-right">Slow fashion, conscious living</span>
      </footer>
    </>
  );
}