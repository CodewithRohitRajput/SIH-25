"use client";
import { useEffect, useState } from "react";

const BACKEND_URL = "https://bbs11pr8-5002.inc1.devtunnels.ms";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      const res = await fetch(`${BACKEND_URL}/auth/token`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      setToken(data.loggedIn);
    };
    const checkAdmin = async () => {
      const res = await fetch(`${BACKEND_URL}/auth/isAdmin`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      setAdmin(data.isAdmin);
    };
    fetchToken();
    checkAdmin();

    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await fetch(`${BACKEND_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    setToken(false);
    window.location.href = "/login";
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/allreports", label: "Reports" },
    { href: "/chatbotAI", label: "Tactical AI" },
    { href: "/risk", label: "Risk Intel" },
    { href: "/profile", label: "Profile" },
    ...(admin ? [{ href: "/admin", label: "Admin" }] : []),
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap');

        :root {
          --cyan: #00e5ff;
          --cyan-dim: #00b8cc;
          --cyan-glow: rgba(0,229,255,0.12);
          --cyan-border: rgba(0,229,255,0.25);
          --bg-nav: rgba(2, 12, 16, 0.92);
          --bg-nav-scrolled: rgba(2, 12, 16, 0.98);
          --red-alert: #ff1744;
          --text-primary: #e0f7fa;
          --text-muted: #546e7a;
        }

        .vj-nav {
          position: sticky;
          top: 0;
          z-index: 100;
          background: var(--bg-nav);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--cyan-border);
          transition: background 0.3s, box-shadow 0.3s;
          font-family: 'Share Tech Mono', monospace;
        }

        .vj-nav.scrolled {
          background: var(--bg-nav-scrolled);
          box-shadow: 0 4px 40px rgba(0,229,255,0.06);
        }

        /* Animated top line */
        .vj-nav::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, var(--cyan) 40%, var(--cyan-dim) 60%, transparent 100%);
          opacity: 0.7;
        }

        .vj-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        /* ---- LOGO ---- */
        .vj-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          flex-shrink: 0;
        }

        .vj-logo-icon {
          width: 34px;
          height: 34px;
          border: 1px solid var(--cyan-border);
          background: var(--cyan-glow);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--cyan);
          position: relative;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          transition: box-shadow 0.25s;
        }

        .vj-logo:hover .vj-logo-icon {
          box-shadow: 0 0 20px rgba(0,229,255,0.3);
        }

        .vj-logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1;
        }

        .vj-logo-name {
          font-family: 'Rajdhani', sans-serif;
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 0.25em;
          color: var(--cyan);
          text-shadow: 0 0 16px rgba(0,229,255,0.4);
        }

        .vj-logo-sub {
          font-size: 8px;
          letter-spacing: 0.3em;
          color: var(--text-muted);
          text-transform: uppercase;
          margin-top: 2px;
        }

        /* ---- DESKTOP LINKS ---- */
        .vj-links {
          display: flex;
          align-items: center;
          gap: 2px;
          list-style: none;
        }

        .vj-link {
          text-decoration: none;
          color: var(--text-muted);
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 6px 14px;
          border: 1px solid transparent;
          transition: all 0.2s;
          white-space: nowrap;
          position: relative;
        }

        .vj-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 14px; right: 14px;
          height: 1px;
          background: var(--cyan);
          transform: scaleX(0);
          transition: transform 0.25s;
        }

        .vj-link:hover {
          color: var(--cyan);
          border-color: var(--cyan-border);
          background: var(--cyan-glow);
        }

        .vj-link:hover::after {
          transform: scaleX(1);
        }

        /* Admin link - special */
        .vj-link.admin {
          color: var(--red-alert);
          border-color: rgba(255,23,68,0.2);
          background: rgba(255,23,68,0.04);
        }

        .vj-link.admin:hover {
          background: rgba(255,23,68,0.1);
          border-color: rgba(255,23,68,0.4);
          box-shadow: 0 0 12px rgba(255,23,68,0.15);
        }

        .vj-link.admin::after { background: var(--red-alert); }

        /* ---- AUTH BUTTONS ---- */
        .vj-auth {
          display: flex;
          align-items: center;
          margin-left: 12px;
        }

        .vj-btn-logout {
          background: transparent;
          border: 1px solid var(--cyan-border);
          color: var(--cyan);
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 7px 18px;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .vj-btn-logout:hover {
          background: var(--cyan-glow);
          box-shadow: 0 0 16px rgba(0,229,255,0.15);
        }

        .vj-btn-login {
          display: block;
          text-decoration: none;
          background: transparent;
          border: 1px solid var(--cyan-border);
          color: var(--cyan);
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 7px 18px;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .vj-btn-login:hover {
          background: var(--cyan-glow);
          box-shadow: 0 0 16px rgba(0,229,255,0.15);
        }

        /* ---- MOBILE TOGGLE ---- */
        .vj-mobile-btn {
          display: none;
          background: transparent;
          border: 1px solid var(--cyan-border);
          color: var(--cyan);
          width: 36px;
          height: 36px;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .vj-mobile-btn:hover {
          background: var(--cyan-glow);
        }

        /* Hamburger lines */
        .ham {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .ham span {
          display: block;
          width: 18px;
          height: 1px;
          background: var(--cyan);
          transition: all 0.25s;
          transform-origin: center;
        }

        .ham.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
        .ham.open span:nth-child(2) { opacity: 0; }
        .ham.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

        /* ---- MOBILE DRAWER ---- */
        .vj-drawer {
          display: none;
          background: rgba(4, 15, 20, 0.98);
          border-top: 1px solid var(--cyan-border);
          border-bottom: 1px solid var(--cyan-border);
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.35s ease;
        }

        .vj-drawer.open {
          max-height: 600px;
        }

        .vj-drawer-inner {
          padding: 16px 24px 24px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .vj-drawer-link {
          text-decoration: none;
          color: var(--text-muted);
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 10px 12px;
          border: 1px solid transparent;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .vj-drawer-link::before {
          content: '◈';
          font-size: 8px;
          color: var(--cyan);
          opacity: 0.5;
        }

        .vj-drawer-link:hover {
          color: var(--cyan);
          border-color: var(--cyan-border);
          background: var(--cyan-glow);
        }

        .vj-drawer-link.admin {
          color: var(--red-alert);
        }

        .vj-drawer-link.admin::before { color: var(--red-alert); }

        .vj-drawer-divider {
          height: 1px;
          background: var(--cyan-border);
          margin: 8px 0;
          opacity: 0.4;
        }

        .vj-drawer-btn {
          margin-top: 4px;
          padding: 11px 12px;
          border: 1px solid var(--cyan-border);
          color: var(--cyan);
          background: transparent;
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          text-align: center;
          text-decoration: none;
          display: block;
          transition: all 0.2s;
        }

        .vj-drawer-btn:hover {
          background: var(--cyan-glow);
        }

        /* ---- RESPONSIVE ---- */
        @media (max-width: 900px) {
          .vj-links, .vj-auth { display: none; }
          .vj-mobile-btn { display: flex; }
          .vj-drawer { display: block; }
        }
      `}</style>

      <nav className={`vj-nav${scrolled ? " scrolled" : ""}`}>
        <div className="vj-inner">
          {/* Logo */}
          <a href="/" className="vj-logo">
            <div className="vj-logo-icon">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 4v5c0 5.25-3.5 10-8 12-4.5-2-8-6.75-8-12V7l8-4z" />
              </svg>
            </div>
            <div className="vj-logo-text">
              <span className="vj-logo-name">VAJRA</span>
              <span className="vj-logo-sub">Secure Operations</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <ul className="vj-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`vj-link${link.label === "Admin" ? " admin" : ""}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Auth */}
          <div className="vj-auth">
            {token ? (
              <button className="vj-btn-logout" onClick={handleLogout}>
                [ Logout ]
              </button>
            ) : (
              <a href="/login" className="vj-btn-login">
                [ Login ]
              </a>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="vj-mobile-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className={`ham${isOpen ? " open" : ""}`}>
              <span /><span /><span />
            </div>
          </button>
        </div>

        {/* Mobile Drawer */}
        <div className={`vj-drawer${isOpen ? " open" : ""}`}>
          <div className="vj-drawer-inner">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`vj-drawer-link${link.label === "Admin" ? " admin" : ""}`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="vj-drawer-divider" />
            {token ? (
              <button
                className="vj-drawer-btn"
                onClick={() => { setIsOpen(false); handleLogout(); }}
              >
                [ Logout ]
              </button>
            ) : (
              <a href="/login" className="vj-drawer-btn">
                [ Login ]
              </a>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}