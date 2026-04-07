import React, { useState, useEffect, useCallback } from "react";
import { Pill, SearchBar, SectionHeader, FieldRow, BackBtn, Empty, Btn } from "./components.jsx";
import { getClientes, getCliente } from "./api/clientes.js";

const COLORS = ["#b91c1c","#1a56db","#15803d","#d97706","#7c3aed"];

// ── FICHA CLIENTE ─────────────────────────────────────────────────────────
function FichaCliente({ cliId, onBack }) {
  const [cli, setCli]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCliente(cliId)
      .then(setCli)
      .finally(() => setLoading(false));
  }, [cliId]);

  if (loading) return <div style={{ padding: 32, textAlign: "center", color: "var(--t2)" }}>Cargando...</div>;
  if (!cli)    return <div style={{ padding: 32, textAlign: "center", color: "var(--t2)" }}>No encontrado</div>;

  return (
    <div>
      <BackBtn onBack={onBack} title="Ficha Cliente" />
      <div style={{ padding: "12px 16px 0" }}>
        <div className="card" style={{ textAlign: "center", paddingTop: 20 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16, background: COLORS[cli.id % 5],
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, fontWeight: 900, color: "#fff", margin: "0 auto 10px"
          }}>
            {cli.nombreCli.charAt(0)}
          </div>
          <div style={{ fontSize: 16, fontWeight: 900 }}>{cli.nombreCli}</div>
          <div style={{ fontSize: 12, color: "var(--t2)", marginTop: 4 }}>
            Fecha alta: {cli.fechaAlta}
          </div>
        </div>

        <div className="card">
          <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 12 }}>
            Datos Cliente{" "}
            <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--t3)" }}>CM_CLIENTES</span>
          </div>
          <FieldRow field="COD_CLI"       value={cli.codCli} />
          <FieldRow field="NOMBRE_CLI"    value={cli.nombreCli} />
          <FieldRow field="COD_PAIS"      value={cli.codPais} />
          <FieldRow field="COD_PROVINCIA" value={cli.codProvincia} />
          <FieldRow field="COD_POSTAL"    value={cli.codPostal} />
          <FieldRow field="E_MAIL"        value={cli.email} />
          <FieldRow field="TIPO_TEL1"     value={cli.tipoTel1} />
          <FieldRow field="FECHA_ALTA"    value={cli.fechaAlta} />
          <FieldRow field="COD_TARIFA"    value={cli.codTarifa} />
          <FieldRow field="COD_GRUPO_CLI" value={cli.codGrupoCli} />
          <FieldRow field="NIVEL_FACT"    value={cli.nivelFact} last />
        </div>

        <Btn variant="red"   onClick={() => alert(`✏️ Editando cliente ${cli.nombreCli}`)}>✏️ Editar Cliente</Btn>
        <Btn variant="ghost" onClick={() => alert(`📋 Contratos de ${cli.nombreCli}`)}>📋 Ver Contratos</Btn>
        <Btn variant="ghost" onClick={() => alert(`💰 Facturas de ${cli.nombreCli}`)}>💰 Ver Facturas</Btn>
      </div>
      <div style={{ height: 16 }} />
    </div>
  );
}

// ── LISTADO ───────────────────────────────────────────────────────────────
export default function Clientes() {
  const [clientes,   setClientes]   = useState([]);
  const [search,     setSearch]     = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState("");

  const fetchClientes = useCallback(async (q) => {
    setLoading(true);
    setError("");
    try {
      const data = await getClientes(q);
      setClientes(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchClientes(""); }, [fetchClientes]);

  useEffect(() => {
    const t = setTimeout(() => fetchClientes(search), 300);
    return () => clearTimeout(t);
  }, [search, fetchClientes]);

  if (selectedId) {
    return <FichaCliente cliId={selectedId} onBack={() => setSelectedId(null)} />;
  }

  return (
    <div>
      <div className="section">
        <SectionHeader title="Clientes" prefix="CM_CLIENTES" />
      </div>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Buscar por nombre, código, provincia..."
      />

      <div style={{ padding: "0 16px" }}>
        {error && (
          <div style={{ background: "#fee2e2", color: "#991b1b", borderRadius: 10, padding: "10px 14px", fontSize: 12, marginBottom: 10 }}>
            ⚠️ {error}
          </div>
        )}
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          {loading
            ? <div style={{ padding: 32, textAlign: "center", color: "var(--t2)", fontSize: 13 }}>Cargando...</div>
            : clientes.length === 0
              ? <Empty />
              : clientes.map((c, i) => (
                <div
                  key={c.id}
                  className="list-item"
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedId(c.id)}
                >
                  <div className="list-avatar" style={{ background: COLORS[i % 5] }}>
                    {c.nombreCli.charAt(0)}
                  </div>
                  <div className="list-content">
                    <div className="list-title">{c.nombreCli}</div>
                    <div className="list-sub" style={{ fontFamily: "var(--mono)", fontSize: 10.5 }}>
                      COD_CLI: {c.codCli} · Prov: {c.codProvincia}
                    </div>
                    <div style={{ fontSize: 10.5, color: "var(--t3)", marginTop: 1 }}>{c.email}</div>
                  </div>
                  <span style={{ fontSize: 14, color: "var(--t3)" }}>→</span>
                </div>
              ))}
        </div>
        <div style={{ textAlign: "center", fontSize: 11, color: "var(--t3)", marginTop: 8 }}>
          {clientes.length} clientes · CM_CLIENTES
        </div>
      </div>
      <div style={{ height: 16 }} />
    </div>
  );
}