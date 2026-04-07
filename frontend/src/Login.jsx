import React, { useState } from "react";
import { login } from "./api/auth.js";

export default function Login({ onLogin }) {
  const [user, setUser]   = useState("");
  const [pass, setPass]   = useState("");
  const [err,  setErr]    = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!user || !pass) return setErr("Introduce usuario y contraseña");
    setLoading(true);
    setErr("");
    try {
      const data = await login(user, pass);
      localStorage.setItem("token", data.token);
      onLogin(data.user);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      height: "100%", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", padding: 24,
      background: "linear-gradient(160deg, #7a0000, #b91c1c)"
    }}>
      <div style={{ fontSize: 48, marginBottom: 8 }}>🛡️</div>
      <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 4 }}>e-Satellite®</div>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,.7)", marginBottom: 32 }}>GETP360 · Acceso al sistema</div>

      <div style={{ background: "#fff", borderRadius: 20, padding: 24, width: "100%", maxWidth: 360 }}>
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 11, fontWeight: 700, color: "var(--t2)", textTransform: "uppercase", letterSpacing: ".4px", display: "block", marginBottom: 5 }}>
            Usuario
          </label>
          <input
            style={{ width: "100%", border: "1.5px solid var(--b)", borderRadius: 10, padding: "12px 14px", fontSize: 14, fontFamily: "var(--font)", outline: "none", boxSizing: "border-box" }}
            value={user}
            onChange={e => setUser(e.target.value)}
            placeholder="ERPSEG490"
            autoCapitalize="none"
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 11, fontWeight: 700, color: "var(--t2)", textTransform: "uppercase", letterSpacing: ".4px", display: "block", marginBottom: 5 }}>
            Contraseña
          </label>
          <input
            type="password"
            style={{ width: "100%", border: "1.5px solid var(--b)", borderRadius: 10, padding: "12px 14px", fontSize: 14, fontFamily: "var(--font)", outline: "none", boxSizing: "border-box" }}
            value={pass}
            onChange={e => setPass(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            placeholder="••••••••"
          />
        </div>

        {err && (
          <div style={{ background: "#fee2e2", color: "#991b1b", borderRadius: 10, padding: "10px 14px", fontSize: 12, fontWeight: 600, marginBottom: 14 }}>
            ⚠️ {err}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%", border: "none", borderRadius: 12, padding: 14,
            background: "linear-gradient(135deg, #7a0000, #b91c1c)",
            color: "#fff", fontSize: 14, fontWeight: 800, cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? "Accediendo..." : "Entrar"}
        </button>
      </div>
    </div>
  );
}