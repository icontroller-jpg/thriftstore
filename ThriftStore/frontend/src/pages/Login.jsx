import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleLogin = async () => {
    if (!email || !password) return;
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/login/`,
        { email, password }
      );
      localStorage.setItem("token", res.data.token);
      alert("Login successful");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&family=Didact+Gothic&display=swap');

        .li-root {
          min-height: 100vh;
          background: var(--ivory, #f2ede4);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          font-family: 'Didact Gothic', sans-serif;
        }

        .li-logo {
          font-family: 'IM Fell English', serif;
          font-size: 13px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #0e0d0b;
          margin-bottom: 48px;
          opacity: 0;
          animation: riseUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards 0.1s;
        }

        .li-card {
          width: 100%;
          max-width: 360px;
          opacity: 0;
          animation: riseUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards 0.2s;
        }

        .li-heading {
          font-family: 'IM Fell English', serif;
          font-size: 36px;
          font-weight: 400;
          line-height: 1;
          color: #0e0d0b;
          margin-bottom: 4px;
        }

        .li-heading-italic {
          font-style: italic;
          color: rgba(14,13,11,0.4);
        }

        .li-sub {
          font-size: 9px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(14,13,11,0.4);
          margin-bottom: 36px;
          margin-top: 10px;
        }

        .li-divider {
          width: 100%;
          height: 1px;
          background: rgba(14,13,11,0.1);
          margin-bottom: 28px;
        }

        .li-field {
          margin-bottom: 20px;
          position: relative;
        }

        .li-label {
          display: block;
          font-size: 8.5px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(14,13,11,0.35);
          margin-bottom: 8px;
          transition: color 0.2s;
        }

        .li-field.active .li-label {
          color: #0e0d0b;
        }

        .li-input {
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

        .li-input:focus {
          border-bottom-color: #0e0d0b;
        }

        .li-input::placeholder {
          color: transparent;
        }

        .li-btn {
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

        .li-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: #0e0d0b;
          transform: translateY(100%);
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
          z-index: 0;
        }

        .li-btn:hover::after { transform: translateY(0); }
        .li-btn:hover { color: #f2ede4; }

        .li-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .li-btn:disabled::after { display: none; }

        .li-btn span {
          position: relative;
          z-index: 1;
        }

        .li-footer-text {
          margin-top: 20px;
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(14,13,11,0.35);
          text-align: center;
        }

        .li-footer-text a {
          color: #0e0d0b;
          text-decoration: none;
          border-bottom: 1px solid rgba(14,13,11,0.2);
          padding-bottom: 1px;
          transition: border-color 0.2s;
        }
        .li-footer-text a:hover { border-color: #0e0d0b; }

        @keyframes riseUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 400px) {
          .li-heading { font-size: 30px; }
        }
      `}</style>

      <div className="li-root">
        <span className="li-logo">Pridepzw</span>

        <div className="li-card">
          <h1 className="li-heading">
            Welcome<br />
            <span className="li-heading-italic">back</span>
          </h1>
          <p className="li-sub">Sign in to your account</p>
          <div className="li-divider" />

          <div className={`li-field ${focused === 'email' ? 'active' : ''}`}>
            <label className="li-label">Email Address</label>
            <input
              type="email"
              className="li-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused(null)}
            />
          </div>

          <div className={`li-field ${focused === 'password' ? 'active' : ''}`}>
            <label className="li-label">Password</label>
            <input
              type="password"
              className="li-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocused('password')}
              onBlur={() => setFocused(null)}
            />
          </div>

          <button
            className="li-btn"
            onClick={handleLogin}
            disabled={loading || !email || !password}
          >
            <span>{loading ? "Signing in..." : "Sign In"}</span>
          </button>

          <p className="li-footer-text">
            No account yet? <a href="/signup">Create one</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;