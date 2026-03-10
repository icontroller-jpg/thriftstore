import { useState } from "react";
import axios from "axios";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleSignup = async () => {
    if (!email || !password) return;
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/signup/`,
        { email, password }
      );
      alert("Account created");
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&family=Didact+Gothic&display=swap');

        .su-root {
          min-height: 100vh;
          background: var(--ivory, #f2ede4);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          font-family: 'Didact Gothic', sans-serif;
        }

        .su-logo {
          font-family: 'IM Fell English', serif;
          font-size: 13px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #0e0d0b;
          margin-bottom: 48px;
          opacity: 0;
          animation: riseUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards 0.1s;
        }

        .su-card {
          width: 100%;
          max-width: 360px;
          opacity: 0;
          animation: riseUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards 0.2s;
        }

        .su-heading {
          font-family: 'IM Fell English', serif;
          font-size: 36px;
          font-weight: 400;
          line-height: 1;
          color: #0e0d0b;
          margin-bottom: 4px;
        }

        .su-heading-italic {
          font-style: italic;
          color: rgba(14,13,11,0.4);
        }

        .su-sub {
          font-size: 9px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(14,13,11,0.4);
          margin-bottom: 36px;
          margin-top: 10px;
        }

        .su-divider {
          width: 100%;
          height: 1px;
          background: rgba(14,13,11,0.1);
          margin-bottom: 28px;
        }

        .su-field {
          margin-bottom: 20px;
          position: relative;
        }

        .su-label {
          display: block;
          font-size: 8.5px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(14,13,11,0.35);
          margin-bottom: 8px;
          transition: color 0.2s;
        }

        .su-field.active .su-label {
          color: #0e0d0b;
        }

        .su-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(14,13,11,0.15);
          color: #0e0d0b;
          font-family: 'Didact Gothic', sans-serif;
          font-size: 13px;
          padding: 8px 0;
          outline: none;
          transition: border-color 0.2s;
          -webkit-appearance: none;
          border-radius: 0;
        }

        .su-input:focus {
          border-bottom-color: #0e0d0b;
        }

        .su-input::placeholder {
          color: transparent;
        }

        .su-btn {
          width: 100%;
          margin-top: 32px;
          padding: 14px;
          background: transparent;
          border: 1px solid #0e0d0b;
          color: #0e0d0b;
          font-family: 'Didact Gothic', sans-serif;
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          cursor: pointer;
          transition: color 0.3s;
          position: relative;
          overflow: hidden;
        }

        .su-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: #0e0d0b;
          transform: translateY(100%);
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
          z-index: 0;
        }

        .su-btn:hover::after { transform: translateY(0); }
        .su-btn:hover { color: #f2ede4; }

        .su-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .su-btn:disabled::after { display: none; }

        .su-btn span {
          position: relative;
          z-index: 1;
        }

        .su-footer-text {
          margin-top: 20px;
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(14,13,11,0.35);
          text-align: center;
        }

        .su-footer-text a {
          color: #0e0d0b;
          text-decoration: none;
          border-bottom: 1px solid rgba(14,13,11,0.2);
          padding-bottom: 1px;
          transition: border-color 0.2s;
        }
        .su-footer-text a:hover { border-color: #0e0d0b; }

        @keyframes riseUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 400px) {
          .su-heading { font-size: 30px; }
        }
      `}</style>

      <div className="su-root">
        <span className="su-logo">Pridepzw</span>

        <div className="su-card">
          <h1 className="su-heading">
            Create<br />
            <span className="su-heading-italic">an account</span>
          </h1>
          <p className="su-sub">Join the community</p>
          <div className="su-divider" />

          <div className={`su-field ${focused === 'email' ? 'active' : ''}`}>
            <label className="su-label">Email Address</label>
            <input
              type="email"
              className="su-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused(null)}
            />
          </div>

          <div className={`su-field ${focused === 'password' ? 'active' : ''}`}>
            <label className="su-label">Password</label>
            <input
              type="password"
              className="su-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocused('password')}
              onBlur={() => setFocused(null)}
            />
          </div>

          <button
            className="su-btn"
            onClick={handleSignup}
            disabled={loading || !email || !password}
          >
            <span>{loading ? "Creating..." : "Create Account"}</span>
          </button>

          <p className="su-footer-text">
            Already have an account? <a href="/login">Sign in</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;