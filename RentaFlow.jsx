import { useState } from "react";

const COLORS = {
  blue: { bg: "#E6F1FB", text: "#0C447C", mid: "#185FA5" },
  green: { bg: "#EAF3DE", text: "#27500A", mid: "#3B6D11" },
  amber: { bg: "#FAEEDA", text: "#633806", mid: "#854F0B" },
  red: { bg: "#FCEBEB", text: "#791F1F", mid: "#A32D2D" },
  gray: { bg: "#F1EFE8", text: "#444441", mid: "#5F5E5A" },
  teal: { bg: "#E1F5EE", text: "#085041", mid: "#0F6E56" },
  purple: { bg: "#EEEDFE", text: "#3C3489", mid: "#534AB7" },
};

const Pill = ({ color = "gray", children }) => (
  <span style={{
    fontSize: 11, padding: "2px 8px", borderRadius: 20, fontWeight: 500,
    background: COLORS[color].bg, color: COLORS[color].text, whiteSpace: "nowrap"
  }}>{children}</span>
);

const Avatar = ({ initials, color = "blue" }) => (
  <div style={{
    width: 28, height: 28, borderRadius: "50%", display: "flex",
    alignItems: "center", justifyContent: "center", fontSize: 10,
    fontWeight: 500, flexShrink: 0,
    background: COLORS[color].bg, color: COLORS[color].text
  }}>{initials}</div>
);

const MetricCard = ({ label, value, sub, subColor }) => (
  <div style={{ background: "#F8F8F6", borderRadius: 8, padding: "12px 14px" }}>
    <div style={{ fontSize: 11, color: "#888", marginBottom: 4 }}>{label}</div>
    <div style={{ fontSize: 20, fontWeight: 500 }}>{value}</div>
    {sub && <div style={{ fontSize: 11, color: subColor || "#888", marginTop: 2 }}>{sub}</div>}
  </div>
);

const Card = ({ title, action, onAction, children }) => (
  <div style={{ background: "#fff", border: "0.5px solid #E5E5E0", borderRadius: 12, padding: 14 }}>
    {title && (
      <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {title}
        {action && <span style={{ fontSize: 11, color: "#888", cursor: "pointer", fontWeight: 400 }} onClick={onAction}>{action}</span>}
      </div>
    )}
    {children}
  </div>
);

const AlertRow = ({ icon, iconBg, iconColor, title, sub }) => (
  <div style={{ display: "flex", alignItems: "flex-start", gap: 9, padding: "8px 0", borderBottom: "0.5px solid #EBEBEB" }}>
    <div style={{ width: 26, height: 26, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", background: iconBg, flexShrink: 0, fontSize: 14, color: iconColor }}>{icon}</div>
    <div><div style={{ fontWeight: 500, fontSize: 12.5 }}>{title}</div><div style={{ fontSize: 11, color: "#888", marginTop: 1 }}>{sub}</div></div>
  </div>
);

const ListRow = ({ left, right }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 0", borderBottom: "0.5px solid #EBEBEB", fontSize: 12.5 }}>
    {left}{right}
  </div>
);

const Btn = ({ primary, children, onClick, style = {} }) => (
  <button onClick={onClick} style={{
    padding: "6px 12px", border: primary ? "none" : "0.5px solid #D0D0C8",
    borderRadius: 8, fontSize: 12.5, cursor: "pointer", display: "inline-flex",
    alignItems: "center", gap: 5, fontWeight: primary ? 500 : 400,
    background: primary ? "#185FA5" : "#fff", color: primary ? "#fff" : "#333", ...style
  }}>{children}</button>
);

const Table = ({ cols, rows }) => (
  <div style={{ overflowX: "auto" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
      <thead>
        <tr>{cols.map((c, i) => <th key={i} style={{ textAlign: "left", fontWeight: 500, color: "#888", padding: "7px 8px", borderBottom: "0.5px solid #EBEBEB", fontSize: 11, whiteSpace: "nowrap" }}>{c}</th>)}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  </div>
);

const Tr = ({ cells }) => (
  <tr style={{}} onMouseEnter={e => e.currentTarget.style.background = "#F8F8F6"} onMouseLeave={e => e.currentTarget.style.background = ""}>
    {cells.map((c, i) => <td key={i} style={{ padding: "8px 8px", borderBottom: "0.5px solid #EBEBEB", verticalAlign: "middle" }}>{c}</td>)}
  </tr>
);

// ─── PAGES ───────────────────────────────────────────────────────────────────


const DATA_2025 = [
  { mes: "Ene", ingresos: 31200000, gastos: 7100000 },
  { mes: "Feb", ingresos: 33400000, gastos: 6800000 },
  { mes: "Mar", ingresos: 32800000, gastos: 8200000 },
  { mes: "Abr", ingresos: 35100000, gastos: 7400000 },
  { mes: "May", ingresos: 36800000, gastos: 6900000 },
  { mes: "Jun", ingresos: 38400000, gastos: 8400000 },
];
const DATA_2024 = [
  { mes: "Ene", ingresos: 27000000, gastos: 6200000 },
  { mes: "Feb", ingresos: 28500000, gastos: 5900000 },
  { mes: "Mar", ingresos: 29100000, gastos: 7100000 },
  { mes: "Abr", ingresos: 30200000, gastos: 6400000 },
  { mes: "May", ingresos: 31000000, gastos: 6800000 },
  { mes: "Jun", ingresos: 30800000, gastos: 7200000 },
  { mes: "Jul", ingresos: 29500000, gastos: 6500000 },
  { mes: "Ago", ingresos: 30100000, gastos: 6900000 },
  { mes: "Sep", ingresos: 30900000, gastos: 7400000 },
  { mes: "Oct", ingresos: 31500000, gastos: 7000000 },
  { mes: "Nov", ingresos: 32100000, gastos: 6700000 },
  { mes: "Dic", ingresos: 32800000, gastos: 8100000 },
];

function fmt(n) { return "$" + (n/1000000).toFixed(1) + "M"; }

function BarChart() {
  const [anio, setAnio] = useState("2025");
  const [mesFiltro, setMesFiltro] = useState("Todos");
  const data = anio === "2025" ? DATA_2025 : DATA_2024;
  const filtered = mesFiltro === "Todos" ? data : data.filter(d => d.mes === mesFiltro);
  const totalI = filtered.reduce((s,d)=>s+d.ingresos,0);
  const totalG = filtered.reduce((s,d)=>s+d.gastos,0);
  const balance = totalI - totalG;
  const maxVal = Math.max(...filtered.map(d=>d.ingresos));
  const barH = 110;
  const bw = Math.min(28, Math.max(16, Math.floor(340 / filtered.length) - 8));
  const gap = Math.floor(340 / filtered.length);

  return (
    <div style={{ background:"#fff", border:"0.5px solid #E5E5E0", borderRadius:12, padding:14, marginBottom:12 }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
        <span style={{ fontSize:13, fontWeight:500 }}>Ingresos vs Gastos</span>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <select value={anio} onChange={e=>{ setAnio(e.target.value); setMesFiltro("Todos"); }} style={{ padding:"3px 8px", border:"0.5px solid #D0D0C8", borderRadius:6, fontSize:11.5 }}>
            <option>2025</option><option>2024</option>
          </select>
          <select value={mesFiltro} onChange={e=>setMesFiltro(e.target.value)} style={{ padding:"3px 8px", border:"0.5px solid #D0D0C8", borderRadius:6, fontSize:11.5 }}>
            <option value="Todos">Todos los meses</option>
            {data.map(d=><option key={d.mes}>{d.mes}</option>)}
          </select>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginLeft:6 }}>
            <span style={{ display:"flex", alignItems:"center", gap:4, fontSize:11, color:"#888" }}><span style={{ width:10, height:10, borderRadius:2, background:"#185FA5", display:"inline-block" }}></span>Ingresos</span>
            <span style={{ display:"flex", alignItems:"center", gap:4, fontSize:11, color:"#888" }}><span style={{ width:10, height:10, borderRadius:2, background:"#F09595", display:"inline-block" }}></span>Gastos</span>
          </div>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:12 }}>
        <div style={{ background:"#E6F1FB", borderRadius:8, padding:"8px 12px" }}>
          <div style={{ fontSize:10, color:"#185FA5", textTransform:"uppercase", letterSpacing:".05em" }}>Ingresos</div>
          <div style={{ fontSize:18, fontWeight:500, color:"#0C447C" }}>{fmt(totalI)}</div>
        </div>
        <div style={{ background:"#FCEBEB", borderRadius:8, padding:"8px 12px" }}>
          <div style={{ fontSize:10, color:"#A32D2D", textTransform:"uppercase", letterSpacing:".05em" }}>Gastos</div>
          <div style={{ fontSize:18, fontWeight:500, color:"#791F1F" }}>{fmt(totalG)}</div>
        </div>
        <div style={{ background:"#EAF3DE", borderRadius:8, padding:"8px 12px" }}>
          <div style={{ fontSize:10, color:"#3B6D11", textTransform:"uppercase", letterSpacing:".05em" }}>Balance libre</div>
          <div style={{ fontSize:18, fontWeight:500, color:"#27500A" }}>{fmt(balance)}</div>
        </div>
      </div>

      <svg width="100%" height={barH+36} viewBox={`0 0 ${Math.max(360, filtered.length*gap+20)} ${barH+36}`} preserveAspectRatio="xMidYMid meet">
        {filtered.map((d,i) => {
          const hi = Math.round((d.ingresos / maxVal) * barH);
          const hg = Math.round((d.gastos / maxVal) * barH);
          const x = 10 + i * gap;
          const cx = x + bw + 3;
          return (
            <g key={i}>
              <rect x={x} y={barH-hi} width={bw} height={hi} rx="3" fill="#185FA5" opacity=".85"/>
              <rect x={cx} y={barH-hg} width={bw} height={hg} rx="3" fill="#E24B4A" opacity=".75"/>
              <text x={x+bw} y={barH+14} fontSize="9" fill="#aaa" textAnchor="middle">{d.mes}</text>
              {filtered.length <= 6 && <>
                <text x={x+bw/2} y={barH-hi-4} fontSize="8.5" fill="#185FA5" textAnchor="middle">{fmt(d.ingresos)}</text>
                <text x={cx+bw/2} y={barH-hg-4} fontSize="8.5" fill="#A32D2D" textAnchor="middle">{fmt(d.gastos)}</text>
              </>}
            </g>
          );
        })}
        <line x1="0" y1={barH} x2="100%" y2={barH} stroke="#F0F0EC" strokeWidth="0.5"/>
      </svg>
    </div>
  );
}

function Dashboard({ setPage }) {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 14 }}>
        <MetricCard label="Inmuebles" value="32" sub="28 ocupados · 4 libres" />
        <MetricCard label="Recaudo junio" value="$38.4M" sub="↑ +4.2% vs mayo" subColor="#27500A" />
        <MetricCard label="Cartera vencida" value="$4.1M" sub="5 en mora" subColor="#A32D2D" />
        <MetricCard label="Ocupación" value="87.5%" sub="Meta: 90%" subColor="#27500A" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        <Card title="Alertas prioritarias">
          <AlertRow icon="⏰" iconBg="#FCEBEB" iconColor="#A32D2D" title="Mora +30 días · 3 inquilinos" sub="Local 204 · Apto 18 · Bodega B3" />
          <AlertRow icon="📄" iconBg="#FAEEDA" iconColor="#854F0B" title="Contratos por vencer" sub="4 contratos vencen jun 20–30" />
          <AlertRow icon="🔧" iconBg="#E6F1FB" iconColor="#185FA5" title="Mantenimientos pendientes" sub="2 solicitudes sin atender" />
          <div style={{ paddingTop: 8, display: "flex", alignItems: "flex-start", gap: 9, fontSize: 12.5 }}>
            <div style={{ width: 26, height: 26, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", background: "#EAF3DE", flexShrink: 0, fontSize: 14 }}>📈</div>
            <div><div style={{ fontWeight: 500 }}>Incremento IPC pendiente</div><div style={{ fontSize: 11, color: "#888", marginTop: 1 }}>3 contratos por ajustar 4.2%</div></div>
          </div>
        </Card>
        <Card title="Últimos pagos" action="Ver todos →" onAction={() => setPage("pagos")}>
          {[
            { ini: "LM", col: "teal", name: "Laura Monsalve", sub: "Apto 12 · hoy", val: "$1.850.000", pill: "green", tag: "Pagado" },
            { ini: "RG", col: "purple", name: "Ricardo Gómez", sub: "Local 08 · ayer", val: "$3.200.000", pill: "green", tag: "Pagado" },
            { ini: "MP", col: "amber", name: "Martha Peña", sub: "Apto 05 · hace 2 días", val: "$1.450.000", pill: "amber", tag: "Parcial" },
            { ini: "JC", col: "red", name: "Jorge Castro", sub: "Bodega B3 · vencido", val: "$2.100.000", pill: "red", tag: "Mora" },
          ].map((p, i) => (
            <ListRow key={i}
              left={<div style={{ display: "flex", alignItems: "center", gap: 7 }}><Avatar initials={p.ini} color={p.col} /><div><div>{p.name}</div><div style={{ fontSize: 11, color: "#888" }}>{p.sub}</div></div></div>}
              right={<div style={{ textAlign: "right" }}><div style={{ fontWeight: 500, marginBottom: 2 }}>{p.val}</div><Pill color={p.pill}>{p.tag}</Pill></div>}
            />
          ))}
        </Card>
      </div>

      <BarChart />

      <Card title="Disponibilidad" action="Ver todos →" onAction={() => setPage("inmuebles")}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
          {[
            { tipo: "Comercial", nombre: "Local 11-A", loc: "Centro · 48m²", color: "green", tag: "Libre" },
            { tipo: "Vivienda", nombre: "Apto 23", loc: "Cabecera · 65m²", color: "green", tag: "Libre" },
            { tipo: "Bodega", nombre: "Bod. C1", loc: "Industrial · 120m²", color: "amber", tag: "Reparación" },
            { tipo: "Vivienda", nombre: "Apto 31", loc: "Sotomayor · 70m²", color: "green", tag: "Libre" },
          ].map((d, i) => (
            <div key={i} style={{ padding: 9, border: "0.5px solid #EBEBEB", borderRadius: 8 }}>
              <div style={{ fontSize: 10, color: "#aaa", textTransform: "uppercase", letterSpacing: ".05em" }}>{d.tipo}</div>
              <div style={{ fontWeight: 500, fontSize: 12.5, margin: "3px 0" }}>{d.nombre}</div>
              <div style={{ fontSize: 11, color: "#888" }}>{d.loc}</div>
              <div style={{ marginTop: 5 }}><Pill color={d.color}>{d.tag}</Pill></div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function Inmuebles() {
  const [active, setActive] = useState("Todos");
  const [ocupFiltro, setOcupFiltro] = useState("Todos");
  const [sort, setSort] = useState({ col: null, dir: 1 });
  const tabs = ["Todos", "Vivienda", "Comercial", "Bodega"];
  const ocupTabs = ["Todos", "Ocupado", "Disponible", "Mora", "Reparación"];

  const all = [
    { tipo: "Vivienda", ref: "APT-03", nombre: "Apartamento 03", direccion: "Urb. La Victoria", piso: "Piso 1", area: 65, inquilino: "Sandra Pulido", canon: 1850000, deposito: 3700000, ocupacion: "Ocupado", contrato: "Vigente", vence: "Dic 2025", servicios: "Inquilino" },
    { tipo: "Comercial", ref: "LOC-08", nombre: "Local 08", direccion: "C.C. Cabecera", piso: "Piso 1", area: 38, inquilino: "Ricardo Gómez", canon: 3200000, deposito: 6400000, ocupacion: "Ocupado", contrato: "Vigente", vence: "Mar 2026", servicios: "Propietario" },
    { tipo: "Vivienda", ref: "APT-12", nombre: "Apartamento 12", direccion: "Conj. Mirador Norte", piso: "Piso 3", area: 58, inquilino: "Laura Monsalve", canon: 1450000, deposito: 2900000, ocupacion: "Ocupado", contrato: "Por vencer", vence: "Dic 2025", servicios: "Inquilino" },
    { tipo: "Bodega", ref: "BOD-B3", nombre: "Bodega B3", direccion: "Zona Industrial Río Frío", piso: "—", area: 180, inquilino: "Jorge Castro", canon: 2100000, deposito: 4200000, ocupacion: "Mora", contrato: "Vencido", vence: "Ago 2025", servicios: "Propietario" },
    { tipo: "Vivienda", ref: "APT-23", nombre: "Apartamento 23", direccion: "Cabecera del Llano", piso: "Piso 5", area: 70, inquilino: "—", canon: 1900000, deposito: 0, ocupacion: "Disponible", contrato: "Sin contrato", vence: "—", servicios: "—" },
    { tipo: "Comercial", ref: "OFI-204", nombre: "Oficina 204", direccion: "Edificio Cámara", piso: "Piso 2", area: 52, inquilino: "Andrés Parra", canon: 2500000, deposito: 5000000, ocupacion: "Ocupado", contrato: "Por vencer", vence: "Jun 2025", servicios: "Inquilino" },
    { tipo: "Vivienda", ref: "APT-07", nombre: "Apartamento 07", direccion: "El Prado", piso: "Piso 2", area: 55, inquilino: "Camilo Roa", canon: 1350000, deposito: 2700000, ocupacion: "Ocupado", contrato: "Vigente", vence: "Nov 2025", servicios: "Inquilino" },
    { tipo: "Comercial", ref: "LOC-15B", nombre: "Local 15-B", direccion: "Centro Histórico", piso: "Piso 1", area: 42, inquilino: "Mariana Torres", canon: 2800000, deposito: 5600000, ocupacion: "Ocupado", contrato: "Vigente", vence: "Jun 2026", servicios: "Propietario" },
    { tipo: "Bodega", ref: "BOD-C1", nombre: "Bodega C1", direccion: "Zona Industrial Norte", piso: "—", area: 120, inquilino: "—", canon: 1600000, deposito: 0, ocupacion: "Reparación", contrato: "Sin contrato", vence: "—", servicios: "—" },
    { tipo: "Vivienda", ref: "APT-18", nombre: "Apartamento 18", direccion: "Lagos del Cacique", piso: "Piso 4", area: 62, inquilino: "Martha Peña", canon: 1600000, deposito: 3200000, ocupacion: "Ocupado", contrato: "Vigente", vence: "Sep 2025", servicios: "Inquilino" },
    { tipo: "Comercial", ref: "LOC-11A", nombre: "Local 11-A", direccion: "Centro", piso: "Piso 1", area: 48, inquilino: "—", canon: 2200000, deposito: 0, ocupacion: "Disponible", contrato: "Sin contrato", vence: "—", servicios: "—" },
    { tipo: "Vivienda", ref: "APT-31", nombre: "Apartamento 31", direccion: "Sotomayor", piso: "Piso 2", area: 70, inquilino: "—", canon: 1750000, deposito: 0, ocupacion: "Disponible", contrato: "Sin contrato", vence: "—", servicios: "—" },
  ];

  const ocupColor = { Ocupado: "green", Disponible: "blue", Mora: "red", Reparación: "amber" };
  const contratoColor = { Vigente: "green", "Por vencer": "amber", Vencido: "red", "Sin contrato": "gray" };
  const tipoColor = { Vivienda: "teal", Comercial: "blue", Bodega: "amber" };

  const cols = [
    { key: "ref", label: "Ref.", w: 65 },
    { key: "nombre", label: "Inmueble", w: 150 },
    { key: "tipo", label: "Tipo", w: 82 },
    { key: "direccion", label: "Dirección", w: 170 },
    { key: "area", label: "m²", w: 46 },
    { key: "inquilino", label: "Inquilino", w: 130 },
    { key: "canon", label: "Canon/mes", w: 105 },
    { key: "deposito", label: "Depósito", w: 95 },
    { key: "vence", label: "Vence", w: 80 },
    { key: "servicios", label: "Servicios", w: 80 },
    { key: "ocupacion", label: "Ocupación", w: 95 },
    { key: "contrato", label: "Contrato", w: 100 },
    { key: "_acc", label: "", w: 34 },
  ];

  const filtered = all.filter(p =>
    (active === "Todos" || p.tipo === active) &&
    (ocupFiltro === "Todos" || p.ocupacion === ocupFiltro)
  );
  const sorted = sort.col
    ? [...filtered].sort((a, b) => {
        const va = a[sort.col], vb = b[sort.col];
        return typeof va === "number" ? (va - vb) * sort.dir : String(va).localeCompare(String(vb)) * sort.dir;
      })
    : filtered;

  const toggleSort = (key) => setSort(s => s.col === key ? { col: key, dir: s.dir * -1 } : { col: key, dir: 1 });
  const fmt = n => n ? "$" + n.toLocaleString("es-CO") : "—";

  const FTab = ({ label, color }) => {
    const isOn = ocupFiltro === label;
    return (
      <button onClick={() => setOcupFiltro(label)} style={{
        padding: "3px 9px", borderRadius: 20, fontSize: 11, cursor: "pointer",
        border: `0.5px solid ${isOn && color ? COLORS[color].mid : "#D0D0C8"}`,
        background: isOn ? (color ? COLORS[color].bg : "#1a1a1a") : "#fff",
        color: isOn ? (color ? COLORS[color].text : "#fff") : "#666",
        fontWeight: isOn ? 500 : 400,
      }}>{label}</button>
    );
  };

  return (
    <div>
      {/* Barra de filtros compacta */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
        <input placeholder="Buscar..." style={{ width: 180, padding: "6px 10px", border: "0.5px solid #D0D0C8", borderRadius: 8, fontSize: 12.5, flexShrink: 0 }} />
        <div style={{ width: "0.5px", height: 20, background: "#E0E0D8", flexShrink: 0 }} />
        <span style={{ fontSize: 11, color: "#aaa", flexShrink: 0 }}>Tipo:</span>
        <div style={{ display: "flex", gap: 3 }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setActive(t)} style={{ padding: "3px 9px", borderRadius: 20, fontSize: 11, cursor: "pointer", border: "0.5px solid #D0D0C8", background: active === t ? "#1a1a1a" : "#fff", color: active === t ? "#fff" : "#666" }}>{t}</button>
          ))}
        </div>
        <div style={{ width: "0.5px", height: 20, background: "#E0E0D8", flexShrink: 0 }} />
        <span style={{ fontSize: 11, color: "#aaa", flexShrink: 0 }}>Ocupación:</span>
        <div style={{ display: "flex", gap: 3 }}>
          <FTab label="Todos" />
          <FTab label="Ocupado" color="green" />
          <FTab label="Disponible" color="blue" />
          <FTab label="Mora" color="red" />
          <FTab label="Reparación" color="amber" />
        </div>
        <div style={{ marginLeft: "auto" }}><Btn primary>+ Nuevo</Btn></div>
      </div>

      <div style={{ background: "#fff", border: "0.5px solid #E5E5E0", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
            <thead>
              <tr style={{ background: "#F8F8F6", borderBottom: "0.5px solid #E5E5E0" }}>
                {cols.map(c => (
                  <th key={c.key} onClick={() => c.key !== "_acc" && toggleSort(c.key)}
                    style={{ textAlign: "left", padding: "7px 10px", fontSize: 11, fontWeight: 500, color: "#888", whiteSpace: "nowrap", width: c.w, cursor: c.key !== "_acc" ? "pointer" : "default", userSelect: "none", borderRight: "0.5px solid #ECECEA" }}>
                    {c.label}{sort.col === c.key && <span style={{ marginLeft: 3 }}>{sort.dir === 1 ? "↑" : "↓"}</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((p, i) => (
                <tr key={i}
                  style={{ borderBottom: "0.5px solid #F2F2F0", background: i % 2 === 0 ? "#fff" : "#FAFAF8" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#F3F3EF"}
                  onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "#fff" : "#FAFAF8"}>
                  <td style={{ padding: "7px 10px", color: "#bbb", fontSize: 10.5, fontFamily: "monospace", borderRight: "0.5px solid #F0F0EC" }}>{p.ref}</td>
                  <td style={{ padding: "7px 10px", fontWeight: 500, whiteSpace: "nowrap", borderRight: "0.5px solid #F0F0EC" }}>{p.nombre}</td>
                  <td style={{ padding: "7px 10px", borderRight: "0.5px solid #F0F0EC" }}><Pill color={tipoColor[p.tipo]}>{p.tipo}</Pill></td>
                  <td style={{ padding: "7px 10px", color: "#666", whiteSpace: "nowrap", borderRight: "0.5px solid #F0F0EC" }}>{p.direccion} · {p.piso}</td>
                  <td style={{ padding: "7px 10px", textAlign: "right", color: "#555", borderRight: "0.5px solid #F0F0EC" }}>{p.area}</td>
                  <td style={{ padding: "7px 10px", color: p.inquilino === "—" ? "#ccc" : "#333", whiteSpace: "nowrap", borderRight: "0.5px solid #F0F0EC" }}>{p.inquilino}</td>
                  <td style={{ padding: "7px 10px", fontWeight: 500, textAlign: "right", whiteSpace: "nowrap", borderRight: "0.5px solid #F0F0EC" }}>{fmt(p.canon)}</td>
                  <td style={{ padding: "7px 10px", textAlign: "right", color: p.deposito ? "#555" : "#ccc", whiteSpace: "nowrap", borderRight: "0.5px solid #F0F0EC" }}>{fmt(p.deposito)}</td>
                  <td style={{ padding: "7px 10px", color: p.vence === "—" ? "#ccc" : "#666", whiteSpace: "nowrap", borderRight: "0.5px solid #F0F0EC" }}>{p.vence}</td>
                  <td style={{ padding: "7px 10px", color: p.servicios === "—" ? "#ccc" : "#666", borderRight: "0.5px solid #F0F0EC" }}>{p.servicios}</td>
                  <td style={{ padding: "7px 10px", borderRight: "0.5px solid #F0F0EC" }}><Pill color={ocupColor[p.ocupacion]}>{p.ocupacion}</Pill></td>
                  <td style={{ padding: "7px 10px", borderRight: "0.5px solid #F0F0EC" }}><Pill color={contratoColor[p.contrato]}>{p.contrato}</Pill></td>
                  <td style={{ padding: "7px 10px", textAlign: "center" }}><button style={{ background: "none", border: "none", cursor: "pointer", color: "#bbb", fontSize: 15 }}>···</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: "7px 14px", borderTop: "0.5px solid #F0F0EC", fontSize: 11, color: "#bbb", display: "flex", justifyContent: "space-between" }}>
          <span>{sorted.length} inmuebles · Clic en encabezados para ordenar</span>
          <div style={{ display: "flex", gap: 12 }}>
            <span style={{ color: "#27500A" }}>{sorted.filter(p => p.ocupacion === "Ocupado").length} ocupados</span>
            <span style={{ color: "#185FA5" }}>{sorted.filter(p => p.ocupacion === "Disponible").length} disponibles</span>
            <span style={{ color: "#A32D2D" }}>{sorted.filter(p => p.ocupacion === "Mora").length} en mora</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Inquilinos() {
  const [pagoFiltro, setPagoFiltro] = useState("Todos");
  const [cicloFiltro, setCicloFiltro] = useState("Todos");

  const all = [
    { ini: "LM", col: "teal",   name: "Laura Monsalve",  cc: "37.884.112", inmueble: "Apto 12",    canon: "$1.450.000", hasta: "Dic 2025", pago: "Al día",      pagoCol: "green",  ciclo: "Activo",    cicloCol: "green",  docs: 4, tel: "316 820 4411", ingreso: "Ene 2023" },
    { ini: "RG", col: "purple", name: "Ricardo Gómez",   cc: "13.451.223", inmueble: "Local 08",   canon: "$3.200.000", hasta: "Mar 2026", pago: "Al día",      pagoCol: "green",  ciclo: "Activo",    cicloCol: "green",  docs: 6, tel: "311 540 2233", ingreso: "Mar 2024" },
    { ini: "MP", col: "amber",  name: "Martha Peña",     cc: "63.902.441", inmueble: "Apto 05",    canon: "$1.450.000", hasta: "Sep 2025", pago: "Parcial",     pagoCol: "amber",  ciclo: "Activo",    cicloCol: "green",  docs: 3, tel: "320 114 9900", ingreso: "Oct 2022" },
    { ini: "JC", col: "red",    name: "Jorge Castro",    cc: "91.204.887", inmueble: "Bodega B3",  canon: "$2.100.000", hasta: "Ago 2025", pago: "Mora 38 días",pagoCol: "red",    ciclo: "En mora",   cicloCol: "red",    docs: 5, tel: "300 874 1122", ingreso: "Ago 2023" },
    { ini: "SP", col: "blue",   name: "Sandra Pulido",   cc: "46.770.330", inmueble: "Apto 18",    canon: "$1.600.000", hasta: "Nov 2025", pago: "Al día",      pagoCol: "green",  ciclo: "Activo",    cicloCol: "green",  docs: 4, tel: "317 990 5544", ingreso: "Nov 2022" },
    { ini: "AP", col: "teal",   name: "Andrés Parra",    cc: "88.120.445", inmueble: "Local 15-B", canon: "$2.800.000", hasta: "Jun 2026", pago: "Al día",      pagoCol: "green",  ciclo: "Activo",    cicloCol: "green",  docs: 7, tel: "312 334 7788", ingreso: "Jun 2024" },
    { ini: "CR", col: "purple", name: "Camilo Roa",      cc: "80.341.220", inmueble: "Apto 07",    canon: "$1.350.000", hasta: "Nov 2025", pago: "Al día",      pagoCol: "green",  ciclo: "Activo",    cicloCol: "green",  docs: 3, tel: "315 441 0022", ingreso: "Dic 2023" },
    { ini: "MT", col: "teal",   name: "Mariana Torres",  cc: "52.880.114", inmueble: "Local 15-B", canon: "$2.800.000", hasta: "Jun 2023", pago: "—",           pagoCol: "gray",   ciclo: "Retirado",  cicloCol: "gray",   docs: 5, tel: "310 220 8844", ingreso: "Jun 2021" },
    { ini: "HV", col: "gray",   name: "Hernán Vargas",   cc: "77.114.009", inmueble: "Apto 23",    canon: "$1.700.000", hasta: "Mar 2024", pago: "—",           pagoCol: "gray",   ciclo: "Retirado",  cicloCol: "gray",   docs: 4, tel: "301 778 5500", ingreso: "Mar 2022" },
    { ini: "PL", col: "red",    name: "Patricia Leal",   cc: "41.220.887", inmueble: "Local 11-A", canon: "$2.200.000", hasta: "Ago 2024", pago: "Deuda pend.", pagoCol: "red",    ciclo: "Proceso jur.",cicloCol:"red",   docs: 8, tel: "313 990 4411", ingreso: "Ago 2022" },
    { ini: "FS", col: "amber",  name: "Felipe Suárez",   cc: "98.004.331", inmueble: "Bodega C1",  canon: "$1.600.000", hasta: "—",        pago: "—",           pagoCol: "gray",   ciclo: "Prospecto", cicloCol: "blue",   docs: 1, tel: "314 550 2200", ingreso: "—" },
  ];

  const cicloColors = { Activo: "green", "En mora": "red", Retirado: "gray", "Proceso jur.": "red", Prospecto: "blue" };
  const cicloTabs = ["Todos", "Activo", "En mora", "Retirado", "Proceso jur.", "Prospecto"];
  const pagoTabs = ["Todos", "Al día", "Parcial", "Mora", "Deuda pend."];

  const filtered = all.filter(r =>
    (cicloFiltro === "Todos" || r.ciclo === cicloFiltro) &&
    (pagoFiltro === "Todos" || r.pago.startsWith(pagoFiltro === "Mora" ? "Mora" : pagoFiltro))
  );

  const FBtn = ({ label, color, active, onClick }) => (
    <button onClick={onClick} style={{
      padding: "3px 9px", borderRadius: 20, fontSize: 11, cursor: "pointer",
      border: `0.5px solid ${active && color ? COLORS[color].mid : "#D0D0C8"}`,
      background: active ? (color ? COLORS[color].bg : "#1a1a1a") : "#fff",
      color: active ? (color ? COLORS[color].text : "#fff") : "#666",
      fontWeight: active ? 500 : 400,
    }}>{label}</button>
  );

  return (
    <div>
      {/* Barra filtros */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
        <input placeholder="Buscar por nombre, cédula, inmueble..." style={{ width: 240, padding: "6px 10px", border: "0.5px solid #D0D0C8", borderRadius: 8, fontSize: 12.5 }} />
        <div style={{ width: "0.5px", height: 20, background: "#E0E0D8" }} />
        <span style={{ fontSize: 11, color: "#aaa" }}>Estado:</span>
        <div style={{ display: "flex", gap: 3 }}>
          {cicloTabs.map(t => <FBtn key={t} label={t} color={cicloColors[t]} active={cicloFiltro === t} onClick={() => setCicloFiltro(t)} />)}
        </div>
        <div style={{ width: "0.5px", height: 20, background: "#E0E0D8" }} />
        <span style={{ fontSize: 11, color: "#aaa" }}>Pago:</span>
        <div style={{ display: "flex", gap: 3 }}>
          {pagoTabs.map(t => <FBtn key={t} label={t} color={t==="Al día"?"green":t==="Parcial"?"amber":t==="Todos"?null:"red"} active={pagoFiltro === t} onClick={() => setPagoFiltro(t)} />)}
        </div>
        <div style={{ marginLeft: "auto" }}><Btn primary>+ Nuevo inquilino</Btn></div>
      </div>

      {/* Nota historial */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10, padding: "6px 12px", background: "#E6F1FB", borderRadius: 8, fontSize: 11.5, color: "#0C447C" }}>
        <span>ℹ</span>
        <span>El historial de inquilinos es permanente. Los registros nunca se eliminan — solo cambian de estado.</span>
      </div>

      <div style={{ background: "#fff", border: "0.5px solid #E5E5E0", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
            <thead>
              <tr style={{ background: "#F8F8F6", borderBottom: "0.5px solid #E5E5E0" }}>
                {["Inquilino", "Inmueble", "Canon/mes", "Ingreso", "Contrato hasta", "Estado pago", "Estado ciclo", "Docs", "Teléfono", ""].map((c, i) => (
                  <th key={i} style={{ textAlign: "left", padding: "7px 10px", fontSize: 11, fontWeight: 500, color: "#888", whiteSpace: "nowrap", borderRight: "0.5px solid #ECECEA" }}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => {
                const retirado = r.ciclo === "Retirado" || r.ciclo === "Proceso jur.";
                return (
                  <tr key={i}
                    style={{ borderBottom: "0.5px solid #F2F2F0", background: retirado ? "#FAFAF8" : i % 2 === 0 ? "#fff" : "#FDFDF9", opacity: retirado ? 0.72 : 1 }}
                    onMouseEnter={e => e.currentTarget.style.background = "#F3F3EF"}
                    onMouseLeave={e => e.currentTarget.style.background = retirado ? "#FAFAF8" : i % 2 === 0 ? "#fff" : "#FDFDF9"}>
                    <td style={{ padding: "8px 10px", borderRight: "0.5px solid #F0F0EC" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <Avatar initials={r.ini} color={r.col} />
                        <div>
                          <div style={{ fontWeight: 500 }}>{r.name}</div>
                          <div style={{ fontSize: 10.5, color: "#aaa" }}>CC {r.cc}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "8px 10px", borderRight: "0.5px solid #F0F0EC", color: "#555" }}>{r.inmueble}</td>
                    <td style={{ padding: "8px 10px", borderRight: "0.5px solid #F0F0EC", fontWeight: 500 }}>{r.canon}</td>
                    <td style={{ padding: "8px 10px", borderRight: "0.5px solid #F0F0EC", color: "#888", fontSize: 11.5 }}>{r.ingreso}</td>
                    <td style={{ padding: "8px 10px", borderRight: "0.5px solid #F0F0EC", color: "#666" }}>{r.hasta}</td>
                    <td style={{ padding: "8px 10px", borderRight: "0.5px solid #F0F0EC" }}>{r.pago !== "—" ? <Pill color={r.pagoCol}>{r.pago}</Pill> : <span style={{ color: "#ccc" }}>—</span>}</td>
                    <td style={{ padding: "8px 10px", borderRight: "0.5px solid #F0F0EC" }}><Pill color={cicloColors[r.ciclo]}>{r.ciclo}</Pill></td>
                    <td style={{ padding: "8px 10px", borderRight: "0.5px solid #F0F0EC", textAlign: "center" }}>
                      <span style={{ fontSize: 11, padding: "2px 7px", borderRadius: 12, background: "#F1EFE8", color: "#5F5E5A" }}>{r.docs}</span>
                    </td>
                    <td style={{ padding: "8px 10px", borderRight: "0.5px solid #F0F0EC", fontSize: 11.5, color: "#888" }}>{r.tel}</td>
                    <td style={{ padding: "8px 10px" }}><Btn>Ver →</Btn></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ padding: "7px 14px", borderTop: "0.5px solid #F0F0EC", fontSize: 11, color: "#aaa", display: "flex", justifyContent: "space-between" }}>
          <span>{filtered.length} de {all.length} inquilinos</span>
          <div style={{ display: "flex", gap: 12 }}>
            <span style={{ color: "#27500A" }}>{all.filter(r => r.ciclo === "Activo").length} activos</span>
            <span style={{ color: "#A32D2D" }}>{all.filter(r => r.ciclo === "En mora").length} en mora</span>
            <span style={{ color: "#185FA5" }}>{all.filter(r => r.ciclo === "Prospecto").length} prospectos</span>
            <span style={{ color: "#888" }}>{all.filter(r => r.ciclo === "Retirado").length} retirados</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Pagos() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 14 }}>
        <MetricCard label="Recaudado junio" value="$38.4M" sub="24 de 28 inmuebles" subColor="#27500A" />
        <MetricCard label="Pendiente" value="$6.3M" sub="4 inmuebles" subColor="#A32D2D" />
        <MetricCard label="Cartera vencida" value="$4.1M" sub="5 en mora" subColor="#A32D2D" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Card title="Registrar pago">
          {[
            { label: "Inmueble / Inquilino", el: <select style={{ width: "100%", padding: "7px 10px", border: "0.5px solid #D0D0C8", borderRadius: 8, fontSize: 12.5 }}><option>Apto 12 – Laura Monsalve</option><option>Local 08 – Ricardo Gómez</option><option>Bodega B3 – Jorge Castro</option></select> },
          ].map((f, i) => <div key={i} style={{ marginBottom: 10 }}><label style={{ fontSize: 11.5, color: "#888", display: "block", marginBottom: 3 }}>{f.label}</label>{f.el}</div>)}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
            <div><label style={{ fontSize: 11.5, color: "#888", display: "block", marginBottom: 3 }}>Valor recibido</label><input defaultValue="1.450.000" style={{ width: "100%", padding: "7px 10px", border: "0.5px solid #D0D0C8", borderRadius: 8, fontSize: 12.5 }} /></div>
            <div><label style={{ fontSize: 11.5, color: "#888", display: "block", marginBottom: 3 }}>Fecha</label><input defaultValue="15/06/2025" style={{ width: "100%", padding: "7px 10px", border: "0.5px solid #D0D0C8", borderRadius: 8, fontSize: 12.5 }} /></div>
          </div>
          <div style={{ marginBottom: 10 }}><label style={{ fontSize: 11.5, color: "#888", display: "block", marginBottom: 3 }}>Concepto</label><input defaultValue="Arriendo junio 2025" style={{ width: "100%", padding: "7px 10px", border: "0.5px solid #D0D0C8", borderRadius: 8, fontSize: 12.5 }} /></div>
          <div style={{ display: "flex", gap: 8 }}>
            <Btn primary style={{ flex: 1, justifyContent: "center" }}>🖨 Guardar y generar tirilla</Btn>
            <Btn>💾 Solo guardar</Btn>
          </div>
        </Card>
        <Card title="Nominal de pagos — junio 2025">
          <Table cols={["Inquilino", "Inmueble", "Valor", "Estado"]}
            rows={[
              ["L. Monsalve", "Apto 12", "$1.450.000", <Pill color="green">Pagado</Pill>],
              ["R. Gómez", "Local 08", "$3.200.000", <Pill color="green">Pagado</Pill>],
              ["M. Peña", "Apto 05", "$800.000", <Pill color="amber">Parcial</Pill>],
              ["J. Castro", "Bodega B3", "$0", <Pill color="red">Mora</Pill>],
              ["S. Pulido", "Apto 18", "$1.600.000", <Pill color="green">Pagado</Pill>],
              ["A. Parra", "Local 15-B", "$2.800.000", <Pill color="green">Pagado</Pill>],
            ].map((r, i) => <Tr key={i} cells={r} />)}
          />
        </Card>
      </div>
    </div>
  );
}


function Gastos() {
  const [catFiltro, setCatFiltro] = useState("Todos");
  const [estadoFiltro, setEstadoFiltro] = useState("Todos");
  const [buscar, setBuscar] = useState("");

  const all = [
    { fecha:"03/06", concepto:"Plomero — tubería", inmueble:"Apto 07", cat:"Mantenimiento", valor:380000, estado:"Pagado" },
    { fecha:"05/06", concepto:"Pintura fachada", inmueble:"Ed. Centro", cat:"Mantenimiento", valor:1200000, estado:"Pagado" },
    { fecha:"08/06", concepto:"Electricidad aptos vacíos", inmueble:"Varios", cat:"Servicios", valor:450000, estado:"Pagado" },
    { fecha:"10/06", concepto:"Honorarios abogado cobro juridico", inmueble:"—", cat:"Administrativo", valor:800000, estado:"Pendiente" },
    { fecha:"12/06", concepto:"Acueducto bodegas", inmueble:"Zona Ind.", cat:"Servicios", valor:620000, estado:"Pagado" },
    { fecha:"14/06", concepto:"Celaduría edificio centro", inmueble:"Ed. Centro", cat:"Administrativo", valor:950000, estado:"Pagado" },
    { fecha:"15/06", concepto:"Seguro todo riesgo", inmueble:"Apto 03", cat:"Seguros", valor:320000, estado:"Pagado" },
    { fecha:"15/06", concepto:"Seguro incendio y terremoto", inmueble:"Ed. Centro", cat:"Seguros", valor:580000, estado:"Pagado" },
    { fecha:"16/06", concepto:"Tarifa plataforma Airbnb (junio)", inmueble:"Apto 31", cat:"Plataformas", valor:215000, estado:"Pagado" },
    { fecha:"16/06", concepto:"Comisión Booking.com", inmueble:"Apto 23", cat:"Plataformas", valor:180000, estado:"Pendiente" },
    { fecha:"17/06", concepto:"Impermeabilización terraza", inmueble:"Ed. Centro", cat:"Mantenimiento", valor:2400000, estado:"Pendiente" },
    { fecha:"18/06", concepto:"Jardinería zonas comunes", inmueble:"Conj. Mirador", cat:"Otros", valor:280000, estado:"Pagado" },
    { fecha:"18/06", concepto:"Material de aseo edificio", inmueble:"Ed. Centro", cat:"Otros", valor:145000, estado:"Pagado" },
    { fecha:"19/06", concepto:"Seguro responsabilidad civil", inmueble:"Local 08", cat:"Seguros", valor:410000, estado:"Pagado" },
    { fecha:"20/06", concepto:"Fotografías nuevos inmuebles", inmueble:"Apto 23", cat:"Otros", valor:200000, estado:"Pagado" },
  ];

  const catColors = { Mantenimiento:"amber", Servicios:"blue", Administrativo:"gray", Seguros:"purple", Plataformas:"teal", Otros:"gray" };
  const cats = ["Todos","Mantenimiento","Servicios","Administrativo","Seguros","Plataformas","Otros"];

  const filtered = all.filter(r =>
    (catFiltro === "Todos" || r.cat === catFiltro) &&
    (estadoFiltro === "Todos" || r.estado === estadoFiltro) &&
    (buscar === "" || r.concepto.toLowerCase().includes(buscar.toLowerCase()) || r.inmueble.toLowerCase().includes(buscar.toLowerCase()))
  );

  const totCat = {};
  cats.slice(1).forEach(c => { totCat[c] = all.filter(r=>r.cat===c).reduce((s,r)=>s+r.valor,0); });
  const totalMes = all.reduce((s,r)=>s+r.valor,0);
  const fmtCOP = n => "$" + n.toLocaleString("es-CO");

  const FBtn = ({ label, color }) => {
    const on = catFiltro === label;
    return <button onClick={() => setCatFiltro(label)} style={{ padding:"3px 9px", borderRadius:20, fontSize:11, cursor:"pointer", border:`0.5px solid ${on && color ? COLORS[color].mid : "#D0D0C8"}`, background: on ? (color ? COLORS[color].bg : "#1a1a1a") : "#fff", color: on ? (color ? COLORS[color].text : "#fff") : "#666", fontWeight: on ? 500 : 400 }}>{label}</button>;
  };

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
        <span style={{ fontSize:13, fontWeight:500 }}>Gastos — Junio 2025</span>
        <div style={{ display:"flex", gap:8 }}><Btn>📅 Mes</Btn><Btn primary>+ Registrar</Btn></div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:14 }}>
        <MetricCard label="Total gastos mes" value={fmtCOP(totalMes)} sub={`${all.length} movimientos`} />
        <MetricCard label="Mantenimiento" value={fmtCOP(totCat["Mantenimiento"])} sub="incluye reparaciones" />
        <MetricCard label="Seguros + Plataformas" value={fmtCOP(totCat["Seguros"]+totCat["Plataformas"])} sub="pólizas y comisiones" />
        <MetricCard label="Pendiente de pago" value={fmtCOP(all.filter(r=>r.estado==="Pendiente").reduce((s,r)=>s+r.valor,0))} sub={`${all.filter(r=>r.estado==="Pendiente").length} sin pagar`} subColor="#A32D2D" />
      </div>

      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10, flexWrap:"wrap" }}>
        <input placeholder="Buscar concepto, inmueble..." value={buscar} onChange={e=>setBuscar(e.target.value)} style={{ width:200, padding:"6px 10px", border:"0.5px solid #D0D0C8", borderRadius:8, fontSize:12.5 }} />
        <div style={{ width:"0.5px", height:20, background:"#E0E0D8" }} />
        <span style={{ fontSize:11, color:"#aaa" }}>Categoría:</span>
        <div style={{ display:"flex", gap:3, flexWrap:"wrap" }}>
          {cats.map(c => <FBtn key={c} label={c} color={catColors[c]} />)}
        </div>
        <div style={{ width:"0.5px", height:20, background:"#E0E0D8" }} />
        <span style={{ fontSize:11, color:"#aaa" }}>Estado:</span>
        {["Todos","Pagado","Pendiente"].map(e => (
          <button key={e} onClick={() => setEstadoFiltro(e)} style={{ padding:"3px 9px", borderRadius:20, fontSize:11, cursor:"pointer", border:"0.5px solid #D0D0C8", background: estadoFiltro===e ? "#1a1a1a" : "#fff", color: estadoFiltro===e ? "#fff" : "#666" }}>{e}</button>
        ))}
      </div>

      <div style={{ background:"#fff", border:"0.5px solid #E5E5E0", borderRadius:12, overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12.5 }}>
          <thead>
            <tr style={{ background:"#F8F8F6", borderBottom:"0.5px solid #E5E5E0" }}>
              {["Fecha","Concepto","Inmueble","Categoría","Valor","Estado",""].map((c,i) => (
                <th key={i} style={{ textAlign:"left", padding:"7px 10px", fontSize:11, fontWeight:500, color:"#888", whiteSpace:"nowrap", borderRight:"0.5px solid #ECECEA" }}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r,i) => (
              <tr key={i} style={{ borderBottom:"0.5px solid #F2F2F0", background: i%2===0?"#fff":"#FAFAF8" }}
                onMouseEnter={e=>e.currentTarget.style.background="#F3F3EF"}
                onMouseLeave={e=>e.currentTarget.style.background=i%2===0?"#fff":"#FAFAF8"}>
                <td style={{ padding:"7px 10px", color:"#aaa", fontSize:11.5, borderRight:"0.5px solid #F0F0EC" }}>{r.fecha}</td>
                <td style={{ padding:"7px 10px", borderRight:"0.5px solid #F0F0EC" }}>{r.concepto}</td>
                <td style={{ padding:"7px 10px", color:"#666", borderRight:"0.5px solid #F0F0EC" }}>{r.inmueble}</td>
                <td style={{ padding:"7px 10px", borderRight:"0.5px solid #F0F0EC" }}><Pill color={catColors[r.cat]}>{r.cat}</Pill></td>
                <td style={{ padding:"7px 10px", fontWeight:500, textAlign:"right", whiteSpace:"nowrap", borderRight:"0.5px solid #F0F0EC" }}>{fmtCOP(r.valor)}</td>
                <td style={{ padding:"7px 10px", borderRight:"0.5px solid #F0F0EC" }}><Pill color={r.estado==="Pagado"?"green":"amber"}>{r.estado}</Pill></td>
                <td style={{ padding:"7px 10px", textAlign:"center" }}><button style={{ background:"none", border:"none", cursor:"pointer", color:"#bbb", fontSize:15 }}>···</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding:"7px 14px", borderTop:"0.5px solid #F0F0EC", fontSize:11, color:"#aaa", display:"flex", justifyContent:"space-between" }}>
          <span>{filtered.length} de {all.length} registros</span>
          <span style={{ fontWeight:500, color:"#333" }}>Total filtrado: {fmtCOP(filtered.reduce((s,r)=>s+r.valor,0))}</span>
        </div>
      </div>
    </div>
  );
}

function Servicios() {
  const grupos = [
    { icon: "💧", titulo: "Acueducto", items: [["Apto 03", "$89.400", "green", "Pagado"], ["Apto 12", "$72.100", "amber", "Vence hoy"], ["Local 08", "$145.000", "green", "Pagado"], ["Apto 18", "$68.200", "green", "Pagado"]] },
    { icon: "⚡", titulo: "Energía", items: [["Apto 03", "$124.500", "green", "Pagado"], ["Bodega B3", "$380.200", "red", "Vencido"], ["Oficina 204", "$98.700", "green", "Pagado"], ["Local 08", "$210.000", "green", "Pagado"]] },
    { icon: "🔥", titulo: "Gas", items: [["Apto 05", "$54.200", "green", "Pagado"], ["Apto 12", "$48.900", "green", "Pagado"], ["Apto 07", "$51.400", "amber", "Pendiente"], ["Apto 23", "—", "gray", "Vacío"]] },
  ];
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ fontSize: 13, fontWeight: 500 }}>Servicios públicos — junio 2025</span>
        <Btn primary>↑ Cargar factura</Btn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
        {grupos.map((g, i) => (
          <Card key={i} title={`${g.icon} ${g.titulo}`}>
            {g.items.map(([nombre, val, color, tag], j) => (
              <div key={j} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 0", borderBottom: j < g.items.length - 1 ? "0.5px solid #EBEBEB" : "none", fontSize: 12.5 }}>
                <span>{nombre}</span>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>{val} <Pill color={color}>{tag}</Pill></span>
              </div>
            ))}
          </Card>
        ))}
      </div>
    </div>
  );
}

function Mantenimiento() {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ fontSize: 13, fontWeight: 500 }}>Arreglos y mantenimiento</span>
        <Btn primary>+ Nueva solicitud</Btn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 14 }}>
        <MetricCard label="Abiertas" value="4" sub="2 sin atender" subColor="#A32D2D" />
        <MetricCard label="En proceso" value="2" sub="Técnicos asignados" />
        <MetricCard label="Costo mes" value="$3.1M" sub="5 trabajos" />
      </div>
      <Card>
        <Table cols={["Solicitud", "Inmueble", "Reportado", "Asignado a", "Prioridad", "Estado", "Costo"]}
          rows={[
            ["Tubería baño rota", "Apto 07", "01/06", "Plomero Ruiz", <Pill color="red">Alta</Pill>, <Pill color="green">Resuelto</Pill>, "$380.000"],
            ["Puerta parqueadero", "Ed. Centro", "08/06", "Metálicas J.", <Pill color="amber">Media</Pill>, <Pill color="amber">En proceso</Pill>, "$150.000"],
            ["Humedad techo cocina", "Apto 18", "10/06", "Sin asignar", <Pill color="amber">Media</Pill>, <Pill color="blue">Diagnóstico</Pill>, "—"],
            ["Cambio chapa cerradura", "Local 11-A", "14/06", "Sin asignar", <Pill color="gray">Baja</Pill>, <Pill color="gray">Pendiente</Pill>, "—"],
          ].map((r, i) => <Tr key={i} cells={r} />)}
        />
      </Card>
    </div>
  );
}

function Documentos() {
  const [tab, setTab] = useState("Todos");
  const tabs = ["Todos", "Contratos", "Servicios", "Paz y salvos", "Identidad"];
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ fontSize: 13, fontWeight: 500 }}>Documentos</span>
        <Btn primary>↑ Subir documento</Btn>
      </div>
      <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
        {tabs.map(t => <button key={t} onClick={() => setTab(t)} style={{ padding: "4px 10px", borderRadius: 20, fontSize: 11.5, cursor: "pointer", border: "0.5px solid #D0D0C8", background: tab === t ? "#1a1a1a" : "#fff", color: tab === t ? "#fff" : "#666" }}>{t}</button>)}
      </div>
      <Card>
        <Table cols={["Documento", "Tipo", "Inmueble / Inquilino", "Fecha", "Vence", ""]}
          rows={[
            ["📄 Contrato arriendo", <Pill color="blue">Contrato</Pill>, "Local 08 / R. Gómez", "Mar 2024", <span style={{ color: "#27500A" }}>Mar 2026</span>, <Btn>↓</Btn>],
            ["📄 Contrato arriendo", <Pill color="blue">Contrato</Pill>, "Apto 12 / L. Monsalve", "Dic 2023", <span style={{ color: "#854F0B" }}>Dic 2025 ⚠</span>, <Btn>↓</Btn>],
            ["🧾 Factura acueducto", <Pill color="gray">Servicios</Pill>, "Apto 03", "Jun 2025", "—", <Btn>↓</Btn>],
            ["🪪 Cédula ciudadanía", <Pill color="gray">Identidad</Pill>, "Martha Peña", "Ene 2025", "—", <Btn>↓</Btn>],
            ["✅ Paz y salvo servicios", <Pill color="green">Paz y salvo</Pill>, "Apto 05 / M. Peña", "May 2025", "—", <Btn>↓</Btn>],
          ].map((r, i) => <Tr key={i} cells={r} />)}
        />
      </Card>
    </div>
  );
}

function Recordatorios({ setPage }) {
  const ALERTAS = [
    {
      nivel: "urgente", color:"#A32D2D", bg:"#FCEBEB", titulo:"🔴 Urgentes — hoy",
      items: [
        { icon:"💰", title:"Cobro mora — Jorge Castro",       sub:"Bodega B3 · $2.100.000",      page:"inquilinos",    link:"Ver inquilino →" },
        { icon:"💧", title:"Factura acueducto vence hoy",     sub:"Apto 12 · $72.100",            page:"servicios",     link:"Ver servicios →" },
      ]
    },
    {
      nivel: "semana", color:"#854F0B", bg:"#FAEEDA", titulo:"🟠 Esta semana",
      items: [
        { icon:"📄", title:"Vence contrato Apto 18",          sub:"Sandra Pulido · Jun 22",        page:"documentos",    link:"Ver contrato →" },
        { icon:"🔧", title:"Revisión humedad Apto 18",        sub:"Técnico confirmado · Jun 20",   page:"mantenimiento", link:"Ver solicitud →" },
        { icon:"💰", title:"Cobro parcial Martha Peña",       sub:"Apto 05 · $650.000 pendiente", page:"pagos",         link:"Registrar pago →" },
      ]
    },
    {
      nivel: "mes", color:"#185FA5", bg:"#E6F1FB", titulo:"🔵 Este mes",
      items: [
        { icon:"📄", title:"Renovar 4 contratos",             sub:"Vencen jun 20–30",              page:"documentos",    link:"Ver documentos →" },
        { icon:"⭐", title:"Renovación seguro Ed. Centro",    sub:"Vence Jun 30",                  page:"gastos",        link:"Ver gastos →" },
        { icon:"📊", title:"Cerrar reporte mensual",          sub:"Junio 2025 pendiente",          page:"reportes",      link:"Ver reportes →" },
      ]
    },
  ];

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
        <span style={{ fontSize:13, fontWeight:500 }}>Recordatorios y alertas</span>
        <Btn primary>+ Crear recordatorio</Btn>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
        {ALERTAS.map((col, ci) => (
          <Card key={ci} title={<span style={{ color:col.color }}>{col.titulo}</span>}>
            {col.items.map((a, ai) => (
              <div key={ai} style={{ display:"flex", alignItems:"flex-start", gap:9, padding:"9px 0", borderBottom: ai < col.items.length-1 ? "0.5px solid #F5F5F3":"none" }}>
                <div style={{ width:26, height:26, borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", background:col.bg, flexShrink:0, fontSize:13 }}>{a.icon}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontWeight:500, fontSize:12.5 }}>{a.title}</div>
                  <div style={{ fontSize:11, color:"#888", marginTop:1 }}>{a.sub}</div>
                  <button onClick={()=>setPage(a.page)} style={{ marginTop:5, background:"none", border:"none", padding:0, fontSize:11, color:col.color, cursor:"pointer", fontWeight:500, textDecoration:"underline", textDecorationStyle:"dotted" }}>
                    {a.link}
                  </button>
                </div>
              </div>
            ))}
          </Card>
        ))}
      </div>
    </div>
  );
}

function Reportes() {
  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 12 }}>Reportes y métricas</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        <Card title="Rentabilidad por inmueble">
          <Table cols={["Inmueble", "Canon", "Gastos", "Neto"]}
            rows={[
              ["Local 08", "$3.200.000", "$210.000", <span style={{ color: "#27500A", fontWeight: 500 }}>$2.990.000</span>],
              ["Local 15-B", "$2.800.000", "$180.000", <span style={{ color: "#27500A", fontWeight: 500 }}>$2.620.000</span>],
              ["Oficina 204", "$2.500.000", "$98.700", <span style={{ color: "#27500A", fontWeight: 500 }}>$2.401.300</span>],
              ["Bodega B3", "$2.100.000", "$380.200", <span style={{ color: "#27500A", fontWeight: 500 }}>$1.719.800</span>],
              ["Apto 03", "$1.850.000", "$213.900", <span style={{ color: "#27500A", fontWeight: 500 }}>$1.636.100</span>],
            ].map((r, i) => <Tr key={i} cells={r} />)}
          />
        </Card>
        <Card title="Resumen mes a mes">
          <Table cols={["Mes", "Recaudo", "Gastos", "Utilidad"]}
            rows={[
              ["Enero", "$31.2M", "$7.1M", <span style={{ color: "#27500A" }}>$24.1M</span>],
              ["Febrero", "$33.4M", "$6.8M", <span style={{ color: "#27500A" }}>$26.6M</span>],
              ["Marzo", "$32.8M", "$8.2M", <span style={{ color: "#27500A" }}>$24.6M</span>],
              ["Abril", "$35.1M", "$7.4M", <span style={{ color: "#27500A" }}>$27.7M</span>],
              ["Mayo", "$36.8M", "$6.9M", <span style={{ color: "#27500A" }}>$29.9M</span>],
              ["Junio", "$38.4M", "$8.4M", <span style={{ color: "#27500A" }}>$30.0M</span>],
            ].map((r, i) => <Tr key={i} cells={r} />)}
          />
        </Card>
      </div>
      <Card title="Ocupación histórica 2025">
        <svg width="100%" height="90" viewBox="0 0 560 90">
          {[["Ene","82%",10,12],["Feb","84%",100,8],["Mar","81%",190,14],["Abr","85%",280,5],["May","86%",370,4],["Jun","87.5%",460,2]].map(([mes,pct,x,y],i)=>(
            <g key={i}>
              <rect x={x} y={y} width={70} height={68-y} rx="3" fill={i===5?"#185FA5":i===4?"#B5D4F4":"#E6F1FB"}/>
              <text x={x+35} y={y+20} fontSize="13" fontWeight="500" fill={i===5?"#fff":"#185FA5"} textAnchor="middle">{pct}</text>
              <text x={x+35} y="86" fontSize="9" fill="#aaa" textAnchor="middle">{mes}</text>
            </g>
          ))}
        </svg>
      </Card>
    </div>
  );
}



// ─── CHECKLIST DE CONFIGURACIÓN ──────────────────────────────────────────────

const SETUP_STEPS = [
  { id:1, cat:"Configuración", icon:"⚙️", title:"Datos de tu empresa",            desc:"Nombre, NIT, dirección, teléfono y logo para los recibos POS.",                       page:"configuracion" },
  { id:2, cat:"Configuración", icon:"🏦", title:"Cuenta bancaria",                 desc:"Datos de la cuenta donde recibes pagos (banco, tipo, número).",                        page:"configuracion" },
  { id:3, cat:"Inmuebles",     icon:"🏢", title:"Registra tus inmuebles",          desc:"Agrega cada propiedad con dirección, tipo, área y canon.",                             page:"inmuebles" },
  { id:4, cat:"Inquilinos",    icon:"👥", title:"Registra tus inquilinos",         desc:"Agrega cada inquilino con CC, teléfono y vinculación al inmueble.",                    page:"inquilinos" },
  { id:5, cat:"Pagos",         icon:"💵", title:"Registra el estado de pagos",     desc:"Marca qué inquilinos han pagado, cuáles están parciales o en mora.",                   page:"pagos" },
  { id:6, cat:"Servicios",     icon:"⚡", title:"Ingresa facturas de servicios",   desc:"Carga o registra el estado de acueducto, energía y gas.",                             page:"servicios" },
  { id:7, cat:"Gastos",        icon:"🧾", title:"Registra gastos y mantenimiento", desc:"Mantenimiento, seguros, plataformas y otros egresos. Adjunta soportes y contratos.", page:"gastos" },
  { id:8, cat:"Recordatorios", icon:"🔔", title:"Configura tus recordatorios",     desc:"Programa alertas de cobro mensual, vencimientos de contrato y servicios.",            page:"recordatorios" },
];

function ChecklistFlotante({ setPage }) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState({ 1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false });
  const total = SETUP_STEPS.length;
  const completados = Object.values(done).filter(Boolean).length;
  const pct = Math.round((completados/total)*100);

  return (
    <div style={{ position:"absolute", bottom:20, right:20, zIndex:999 }}>
      {open && (
        <div style={{ width:320, background:"#fff", border:"0.5px solid #E5E5E0", borderRadius:14, boxShadow:"0 4px 24px rgba(0,0,0,.10)", marginBottom:10, overflow:"hidden" }}>
          {/* Header */}
          <div style={{ padding:"12px 14px", borderBottom:"0.5px solid #F0F0EC", background:"#FAFAF8" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
              <span style={{ fontWeight:500, fontSize:13 }}>Configuración inicial</span>
              <button onClick={()=>setOpen(false)} style={{ background:"none", border:"none", cursor:"pointer", color:"#aaa", fontSize:16 }}>✕</button>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ flex:1, height:6, background:"#F0F0EC", borderRadius:3, overflow:"hidden" }}>
                <div style={{ height:"100%", width:`${pct}%`, background: pct===100?"#27500A":"#185FA5", borderRadius:3, transition:"width .3s" }}/>
              </div>
              <span style={{ fontSize:11, fontWeight:500, color: pct===100?"#27500A":"#185FA5", flexShrink:0 }}>{completados}/{total}</span>
            </div>
          </div>
          {/* Steps */}
          <div style={{ maxHeight:380, overflowY:"auto" }}>
            {SETUP_STEPS.map(s => (
              <div key={s.id} style={{ display:"flex", alignItems:"flex-start", gap:10, padding:"10px 14px", borderBottom:"0.5px solid #F5F5F3", background: done[s.id]?"#FAFAF8":"#fff", cursor:"pointer" }}
                onMouseEnter={e=>e.currentTarget.style.background="#F5F5F3"}
                onMouseLeave={e=>e.currentTarget.style.background=done[s.id]?"#FAFAF8":"#fff"}>
                <div onClick={()=>setDone(d=>({...d,[s.id]:!d[s.id]}))}
                  style={{ width:18, height:18, borderRadius:5, border:`1.5px solid ${done[s.id]?"#185FA5":"#D0D0C8"}`, background:done[s.id]?"#185FA5":"#fff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:2, cursor:"pointer" }}>
                  {done[s.id] && <span style={{ color:"#fff", fontSize:11, lineHeight:1 }}>✓</span>}
                </div>
                <div style={{ flex:1 }} onClick={()=>{ setPage(s.page); setOpen(false); }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <span style={{ fontSize:13 }}>{s.icon}</span>
                    <span style={{ fontWeight:500, fontSize:12.5, color: done[s.id]?"#aaa":"#1a1a1a", textDecoration:done[s.id]?"line-through":"none" }}>{s.title}</span>
                  </div>
                  <div style={{ fontSize:11, color:"#999", marginTop:2, lineHeight:1.5 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
          {completados===total && (
            <div style={{ padding:"10px 14px", background:"#EAF3DE", borderTop:"0.5px solid #C0DD97" }}>
              <div style={{ fontSize:12.5, color:"#27500A", fontWeight:500 }}>✅ ¡Configuración completa!</div>
              <div style={{ fontSize:11, color:"#3B6D11", marginTop:2 }}>Ya puedes usar RentaFlow al 100%.</div>
            </div>
          )}
        </div>
      )}
      {/* Botón flotante */}
      <button onClick={()=>setOpen(o=>!o)} style={{ width:48, height:48, borderRadius:"50%", background: pct===100?"#27500A":"#185FA5", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 3px 14px rgba(0,0,0,.18)", position:"relative" }}>
        <span style={{ fontSize:20 }}>✓</span>
        {completados < total && (
          <div style={{ position:"absolute", top:-4, right:-4, width:18, height:18, borderRadius:"50%", background:"#A32D2D", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontSize:9, color:"#fff", fontWeight:700 }}>{total-completados}</span>
          </div>
        )}
      </button>
    </div>
  );
}

// ─── CONFIGURACIÓN ────────────────────────────────────────────────────────────


function MonedaRegion() {
  const MONEDAS = [
    { code:"COP", nombre:"Peso colombiano",    simbolo:"$",  pais:"Colombia 🇨🇴",    formato:"1.850.000",   separadorMiles:".",  separadorDec:"," },
    { code:"MXN", nombre:"Peso mexicano",      simbolo:"$",  pais:"México 🇲🇽",       formato:"1,850,000",   separadorMiles:",",  separadorDec:"." },
    { code:"ARS", nombre:"Peso argentino",     simbolo:"$",  pais:"Argentina 🇦🇷",    formato:"1.850.000",   separadorMiles:".",  separadorDec:"," },
    { code:"PEN", nombre:"Sol peruano",        simbolo:"S/", pais:"Perú 🇵🇪",          formato:"1,850,000",   separadorMiles:",",  separadorDec:"." },
    { code:"CLP", nombre:"Peso chileno",       simbolo:"$",  pais:"Chile 🇨🇱",         formato:"1.850.000",   separadorMiles:".",  separadorDec:"," },
    { code:"BOB", nombre:"Boliviano",          simbolo:"Bs", pais:"Bolivia 🇧🇴",       formato:"1,850,000",   separadorMiles:",",  separadorDec:"." },
    { code:"PYG", nombre:"Guaraní paraguayo",  simbolo:"₲",  pais:"Paraguay 🇵🇾",     formato:"1.850.000",   separadorMiles:".",  separadorDec:"," },
    { code:"UYU", nombre:"Peso uruguayo",      simbolo:"$U", pais:"Uruguay 🇺🇾",       formato:"1,850,000",   separadorMiles:",",  separadorDec:"." },
    { code:"VES", nombre:"Bolívar venezolano", simbolo:"Bs", pais:"Venezuela 🇻🇪",    formato:"1.850.000",   separadorMiles:".",  separadorDec:"," },
    { code:"GTQ", nombre:"Quetzal guatemalteco",simbolo:"Q", pais:"Guatemala 🇬🇹",    formato:"1,850,000",   separadorMiles:",",  separadorDec:"." },
    { code:"CRC", nombre:"Colón costarricense",simbolo:"₡",  pais:"Costa Rica 🇨🇷",  formato:"1.850.000",   separadorMiles:".",  separadorDec:"," },
    { code:"USD", nombre:"Dólar estadounidense",simbolo:"$", pais:"Estados Unidos 🇺🇸",formato:"1,850,000",  separadorMiles:",",  separadorDec:"." },
    { code:"EUR", nombre:"Euro",               simbolo:"€",  pais:"Zona Euro 🇪🇺",    formato:"1.850.000",   separadorMiles:".",  separadorDec:"," },
    { code:"BRL", nombre:"Real brasileño",     simbolo:"R$", pais:"Brasil 🇧🇷",        formato:"1.850.000",   separadorMiles:".",  separadorDec:"," },
    { code:"DOP", nombre:"Peso dominicano",    simbolo:"$",  pais:"Rep. Dominicana 🇩🇴",formato:"1,850,000", separadorMiles:",",  separadorDec:"." },
    { code:"CUP", nombre:"Peso cubano",        simbolo:"$",  pais:"Cuba 🇨🇺",          formato:"1,850,000",   separadorMiles:",",  separadorDec:"." },
    { code:"PAB", nombre:"Balboa panameño",    simbolo:"B/.",pais:"Panamá 🇵🇦",        formato:"1,850,000",   separadorMiles:",",  separadorDec:"." },
    { code:"HNL", nombre:"Lempira hondureño",  simbolo:"L",  pais:"Honduras 🇭🇳",     formato:"1,850,000",   separadorMiles:",",  separadorDec:"." },
  ];

  const IDIOMAS = [
    { code:"es-CO", label:"Español (Colombia)" },
    { code:"es-MX", label:"Español (México)" },
    { code:"es-AR", label:"Español (Argentina)" },
    { code:"es-PE", label:"Español (Perú)" },
    { code:"es-CL", label:"Español (Chile)" },
    { code:"es-419", label:"Español (Latinoamérica)" },
    { code:"pt-BR", label:"Português (Brasil)" },
    { code:"en-US", label:"English (US)" },
  ];

  const ZONAS = [
    "America/Bogota (UTC-5)",
    "America/Mexico_City (UTC-6)",
    "America/Argentina/Buenos_Aires (UTC-3)",
    "America/Lima (UTC-5)",
    "America/Santiago (UTC-4)",
    "America/Caracas (UTC-4)",
    "America/La_Paz (UTC-4)",
    "America/Asuncion (UTC-4)",
    "America/Montevideo (UTC-3)",
    "America/Guatemala (UTC-6)",
    "America/Costa_Rica (UTC-6)",
    "America/Panama (UTC-5)",
    "America/Tegucigalpa (UTC-6)",
    "America/Santo_Domingo (UTC-4)",
    "America/Havana (UTC-5)",
    "America/New_York (UTC-5)",
    "America/Sao_Paulo (UTC-3)",
    "Europe/Madrid (UTC+1)",
  ];

  const [selMoneda, setSelMoneda] = useState("COP");
  const [buscar, setBuscar] = useState("");
  const [idioma, setIdioma] = useState("es-CO");
  const [zona, setZona] = useState("America/Bogota (UTC-5)");
  const [posSimb, setPosSimb] = useState("izquierda");
  const [separadorMiles, setSeparadorMiles] = useState(true);

  const monedaActual = MONEDAS.find(m => m.code === selMoneda) || MONEDAS[0];
  const filtradas = buscar
    ? MONEDAS.filter(m => m.nombre.toLowerCase().includes(buscar.toLowerCase()) || m.pais.toLowerCase().includes(buscar.toLowerCase()) || m.code.toLowerCase().includes(buscar.toLowerCase()))
    : MONEDAS;

  const preview = posSimb === "izquierda"
    ? `${monedaActual.simbolo} ${monedaActual.formato}`
    : `${monedaActual.formato} ${monedaActual.simbolo}`;

  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>

        {/* Selector de moneda */}
        <div>
          <div style={{ fontSize:12.5, fontWeight:500, marginBottom:10, color:"#555" }}>Moneda principal</div>
          <input
            placeholder="Buscar moneda o país..."
            value={buscar} onChange={e=>setBuscar(e.target.value)}
            style={{ width:"100%", padding:"7px 10px", border:"0.5px solid #D0D0C8", borderRadius:8, fontSize:12.5, marginBottom:8 }}
          />
          <div style={{ border:"0.5px solid #E5E5E0", borderRadius:10, overflow:"hidden", maxHeight:320, overflowY:"auto" }}>
            {filtradas.map((m,i) => (
              <div key={m.code} onClick={()=>{ setSelMoneda(m.code); setBuscar(""); }}
                style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"9px 12px",
                  borderBottom: i<filtradas.length-1?"0.5px solid #F5F5F3":"none",
                  background: selMoneda===m.code?"#E6F1FB":"#fff",
                  cursor:"pointer" }}
                onMouseEnter={e=>{ if(selMoneda!==m.code) e.currentTarget.style.background="#F8F8F6"; }}
                onMouseLeave={e=>{ if(selMoneda!==m.code) e.currentTarget.style.background="#fff"; }}>
                <div>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ fontSize:13, fontWeight:500, color: selMoneda===m.code?"#0C447C":"#1a1a1a" }}>{m.code}</span>
                    <span style={{ fontSize:12, color:"#888" }}>{m.nombre}</span>
                  </div>
                  <div style={{ fontSize:11, color:"#aaa", marginTop:1 }}>{m.pais}</div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
                  <span style={{ fontSize:13, fontWeight:500, color:"#555" }}>{m.simbolo}</span>
                  {selMoneda===m.code && <span style={{ fontSize:14, color:"#185FA5" }}>✓</span>}
                </div>
              </div>
            ))}
            {filtradas.length === 0 && (
              <div style={{ padding:"20px", textAlign:"center", color:"#bbb", fontSize:12.5 }}>Sin resultados para "{buscar}"</div>
            )}
          </div>
        </div>

        {/* Opciones de formato y región */}
        <div>
          {/* Preview */}
          <div style={{ background:"#E6F1FB", borderRadius:10, padding:"14px 16px", marginBottom:16, textAlign:"center" }}>
            <div style={{ fontSize:11, color:"#185FA5", textTransform:"uppercase", letterSpacing:".06em", marginBottom:6 }}>Vista previa del formato</div>
            <div style={{ fontSize:22, fontWeight:500, color:"#0C447C" }}>{preview}</div>
            <div style={{ fontSize:11, color:"#185FA5", marginTop:4 }}>{monedaActual.nombre} · {monedaActual.pais}</div>
          </div>

          {/* Posición del símbolo */}
          <div style={{ marginBottom:14 }}>
            <label style={{ fontSize:11.5, color:"#888", display:"block", marginBottom:6 }}>Posición del símbolo</label>
            <div style={{ display:"flex", gap:6 }}>
              {["izquierda","derecha"].map(p => (
                <button key={p} onClick={()=>setPosSimb(p)} style={{ flex:1, padding:"7px", border:`1.5px solid ${posSimb===p?"#185FA5":"#D0D0C8"}`, borderRadius:8, fontSize:12.5, cursor:"pointer", background:posSimb===p?"#E6F1FB":"#fff", color:posSimb===p?"#0C447C":"#666", fontWeight:posSimb===p?500:400 }}>
                  {p==="izquierda" ? `${monedaActual.simbolo} 1.850.000` : `1.850.000 ${monedaActual.simbolo}`}
                </button>
              ))}
            </div>
          </div>

          {/* Separador de miles */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 0", borderBottom:"0.5px solid #F5F5F3", marginBottom:14 }}>
            <div>
              <div style={{ fontSize:12.5, fontWeight:500 }}>Separador de miles</div>
              <div style={{ fontSize:11, color:"#888", marginTop:1 }}>Muestra puntos o comas entre miles</div>
            </div>
            <div onClick={()=>setSeparadorMiles(v=>!v)} style={{ width:36, height:20, borderRadius:10, background:separadorMiles?"#185FA5":"#D0D0C8", cursor:"pointer", position:"relative", transition:"background .2s", flexShrink:0 }}>
              <div style={{ position:"absolute", top:3, left:separadorMiles?18:3, width:14, height:14, borderRadius:"50%", background:"#fff", transition:"left .2s" }}/>
            </div>
          </div>

          {/* Idioma */}
          <div style={{ marginBottom:14 }}>
            <label style={{ fontSize:11.5, color:"#888", display:"block", marginBottom:4 }}>Idioma de la interfaz</label>
            <select value={idioma} onChange={e=>setIdioma(e.target.value)} style={{ width:"100%", padding:"8px 10px", border:"0.5px solid #D0D0C8", borderRadius:8, fontSize:12.5 }}>
              {IDIOMAS.map(i=><option key={i.code} value={i.code}>{i.label}</option>)}
            </select>
          </div>

          {/* Zona horaria */}
          <div style={{ marginBottom:14 }}>
            <label style={{ fontSize:11.5, color:"#888", display:"block", marginBottom:4 }}>Zona horaria</label>
            <select value={zona} onChange={e=>setZona(e.target.value)} style={{ width:"100%", padding:"8px 10px", border:"0.5px solid #D0D0C8", borderRadius:8, fontSize:12.5 }}>
              {ZONAS.map(z=><option key={z}>{z}</option>)}
            </select>
            <div style={{ fontSize:11, color:"#bbb", marginTop:3 }}>Afecta las fechas y horas en recordatorios y recibos.</div>
          </div>

          <div style={{ background:"#EAF3DE", borderRadius:8, padding:"10px 12px", fontSize:12, color:"#27500A" }}>
            ✅ Al guardar, todos los valores del sistema (cánones, gastos, recibos) se mostrarán en <strong>{monedaActual.code} {monedaActual.simbolo}</strong>.
          </div>
        </div>
      </div>
    </div>
  );
}

function CuentasBancarias() {
  const BANCOS = ["Bancolombia","Davivienda","BBVA","Banco de Bogotá","Scotiabank Colpatria","Banco Popular","Nequi","Daviplata","Movii","Otro / personalizado"];
  const TIPOS = ["Ahorros","Corriente","Billetera digital","Otra"];

  const [cuentas, setCuentas] = useState([
    { id:1, banco:"Bancolombia", tipo:"Ahorros", numero:"123-456789-00", titular:"Carlos Méndez", alias:"Cuenta principal", principal:true, editable:false },
  ]);
  const [editando, setEditando] = useState(null);
  const [nueva, setNueva] = useState(false);
  const [form, setForm] = useState({ banco:"Bancolombia", tipo:"Ahorros", numero:"", titular:"", alias:"" });

  const iniciarNueva = () => {
    setForm({ banco:"Bancolombia", tipo:"Ahorros", numero:"", titular:"", alias:"" });
    setNueva(true);
    setEditando(null);
  };

  const iniciarEditar = (c) => {
    setForm({ banco:c.banco, tipo:c.tipo, numero:c.numero, titular:c.titular, alias:c.alias });
    setEditando(c.id);
    setNueva(false);
  };

  const guardarNueva = () => {
    if (!form.numero || !form.titular) return;
    setCuentas(cs => [...cs, { ...form, id: Date.now(), principal:false, editable:false }]);
    setNueva(false);
  };

  const guardarEdicion = () => {
    setCuentas(cs => cs.map(c => c.id === editando ? { ...c, ...form } : c));
    setEditando(null);
  };

  const eliminar = (id) => {
    setCuentas(cs => cs.filter(c => c.id !== id));
    if (editando === id) setEditando(null);
  };

  const marcarPrincipal = (id) => {
    setCuentas(cs => cs.map(c => ({ ...c, principal: c.id === id })));
  };

  const inp = { width:"100%", padding:"7px 10px", border:"0.5px solid #D0D0C8", borderRadius:8, fontSize:12.5 };
  const sel = { ...inp };

  const FormCuenta = ({ onGuardar, onCancelar, titulo }) => (
    <div style={{ background:"#F8F8F6", border:"0.5px solid #E5E5E0", borderRadius:10, padding:14, marginTop:10 }}>
      <div style={{ fontSize:12.5, fontWeight:500, marginBottom:12, color:"#333" }}>{titulo}</div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
        <div>
          <label style={{ fontSize:11.5, color:"#888", display:"block", marginBottom:3 }}>Banco / entidad</label>
          <select value={form.banco} onChange={e=>setForm(f=>({...f,banco:e.target.value}))} style={sel}>
            {BANCOS.map(b=><option key={b}>{b}</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontSize:11.5, color:"#888", display:"block", marginBottom:3 }}>Tipo de cuenta</label>
          <select value={form.tipo} onChange={e=>setForm(f=>({...f,tipo:e.target.value}))} style={sel}>
            {TIPOS.map(t=><option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontSize:11.5, color:"#888", display:"block", marginBottom:3 }}>Número / celular</label>
          <input value={form.numero} onChange={e=>setForm(f=>({...f,numero:e.target.value}))} placeholder="Ej: 123-456789-00 o 300 000 0000" style={inp}/>
        </div>
        <div>
          <label style={{ fontSize:11.5, color:"#888", display:"block", marginBottom:3 }}>Titular</label>
          <input value={form.titular} onChange={e=>setForm(f=>({...f,titular:e.target.value}))} placeholder="Nombre del titular" style={inp}/>
        </div>
        <div style={{ gridColumn:"1/-1" }}>
          <label style={{ fontSize:11.5, color:"#888", display:"block", marginBottom:3 }}>Alias (etiqueta personalizada)</label>
          <input value={form.alias} onChange={e=>setForm(f=>({...f,alias:e.target.value}))} placeholder="Ej: Nequi personal, Cuenta nómina..." style={inp}/>
        </div>
      </div>
      <div style={{ display:"flex", gap:8, justifyContent:"flex-end" }}>
        <button onClick={onCancelar} style={{ padding:"6px 12px", border:"0.5px solid #D0D0C8", borderRadius:8, fontSize:12.5, cursor:"pointer", background:"#fff" }}>Cancelar</button>
        <button onClick={onGuardar} style={{ padding:"6px 14px", border:"none", borderRadius:8, fontSize:12.5, cursor:"pointer", background:"#185FA5", color:"#fff", fontWeight:500 }}>💾 Guardar cuenta</button>
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
        <div style={{ fontSize:12.5, color:"#666", lineHeight:1.6 }}>
          Agrega todas las cuentas donde recibes pagos. La cuenta marcada como <strong>principal</strong> aparece en las tirillas POS.
        </div>
        <button onClick={iniciarNueva} style={{ padding:"6px 12px", border:"none", borderRadius:8, fontSize:12.5, cursor:"pointer", background:"#185FA5", color:"#fff", fontWeight:500, flexShrink:0, marginLeft:12 }}>+ Agregar cuenta</button>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {cuentas.map(c => (
          <div key={c.id} style={{ border:`1.5px solid ${c.principal?"#185FA5":"#E5E5E0"}`, borderRadius:10, padding:14, background: c.principal?"#F0F7FF":"#fff" }}>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:10 }}>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                  <span style={{ fontWeight:500, fontSize:13 }}>{c.alias || c.banco}</span>
                  {c.principal && <span style={{ fontSize:10, padding:"2px 7px", borderRadius:12, background:"#185FA5", color:"#fff", fontWeight:500 }}>Principal</span>}
                  <span style={{ fontSize:11, padding:"2px 7px", borderRadius:12, background:"#F1EFE8", color:"#666" }}>{c.tipo}</span>
                </div>
                <div style={{ fontSize:12.5, color:"#555" }}>{c.banco} · {c.numero}</div>
                <div style={{ fontSize:11.5, color:"#888", marginTop:2 }}>Titular: {c.titular}</div>
              </div>
              <div style={{ display:"flex", gap:6, flexShrink:0 }}>
                {!c.principal && (
                  <button onClick={()=>marcarPrincipal(c.id)} style={{ padding:"4px 9px", border:"0.5px solid #D0D0C8", borderRadius:7, fontSize:11, cursor:"pointer", background:"#fff", color:"#185FA5" }}>
                    Marcar principal
                  </button>
                )}
                <button onClick={()=>editando===c.id ? setEditando(null) : iniciarEditar(c)} style={{ padding:"4px 9px", border:"0.5px solid #D0D0C8", borderRadius:7, fontSize:11, cursor:"pointer", background:"#fff" }}>
                  ✏ Editar
                </button>
                {!c.principal && (
                  <button onClick={()=>eliminar(c.id)} style={{ padding:"4px 9px", border:"0.5px solid #F09595", borderRadius:7, fontSize:11, cursor:"pointer", background:"#fff", color:"#A32D2D" }}>
                    🗑 Quitar
                  </button>
                )}
              </div>
            </div>
            {editando === c.id && (
              <FormCuenta titulo="Editar cuenta" onGuardar={guardarEdicion} onCancelar={()=>setEditando(null)} />
            )}
          </div>
        ))}
      </div>

      {nueva && (
        <FormCuenta titulo="Nueva cuenta bancaria" onGuardar={guardarNueva} onCancelar={()=>setNueva(false)} />
      )}

      {cuentas.length === 0 && (
        <div style={{ textAlign:"center", padding:"30px 20px", color:"#bbb", fontSize:13, border:"1px dashed #E0E0D8", borderRadius:10 }}>
          No hay cuentas registradas. Agrega tu primera cuenta de recaudo.
        </div>
      )}

      <div style={{ marginTop:14, background:"#E6F1FB", borderRadius:8, padding:"10px 12px", fontSize:12, color:"#0C447C" }}>
        ℹ La cuenta <strong>principal</strong> aparece automáticamente en todos los recibos POS. Las demás cuentas quedan disponibles como opciones de pago al registrar pagos.
      </div>
    </div>
  );
}

function Configuracion() {
  const [sec, setSec] = useState("empresa");

  const menu = [
    { id:"empresa",   icon:"🏢", label:"Mi empresa" },
    { id:"cuenta",    icon:"🏦", label:"Cuenta bancaria" },
    { id:"moneda",    icon:"💱", label:"Moneda y región" },
    { id:"recibos",   icon:"🖨",  label:"Recibos POS" },
    { id:"usuarios",  icon:"👤", label:"Usuarios y acceso" },
    { id:"notif",     icon:"🔔", label:"Notificaciones" },
    { id:"backup",    icon:"💾", label:"Datos y respaldo" },
  ];

  const Field = ({ label, val, type="text", hint }) => (
    <div style={{ marginBottom:14 }}>
      <label style={{ fontSize:11.5, color:"#888", display:"block", marginBottom:4 }}>{label}</label>
      {type==="select" ? (
        <select style={{ width:"100%", padding:"8px 10px", border:"0.5px solid #D0D0C8", borderRadius:8, fontSize:12.5, background:"#fff" }}>
          {val.map(o=><option key={o}>{o}</option>)}
        </select>
      ) : type==="textarea" ? (
        <textarea defaultValue={val} rows={3} style={{ width:"100%", padding:"8px 10px", border:"0.5px solid #D0D0C8", borderRadius:8, fontSize:12.5, resize:"vertical", fontFamily:"inherit" }}/>
      ) : (
        <input type={type} defaultValue={val} style={{ width:"100%", padding:"8px 10px", border:"0.5px solid #D0D0C8", borderRadius:8, fontSize:12.5 }}/>
      )}
      {hint && <div style={{ fontSize:11, color:"#bbb", marginTop:3 }}>{hint}</div>}
    </div>
  );

  const Toggle = ({ label, sub, on=true }) => {
    const [v,setV] = useState(on);
    return (
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 0", borderBottom:"0.5px solid #F5F5F3" }}>
        <div style={{ flex:1, paddingRight:12 }}>
          <div style={{ fontSize:12.5, fontWeight:500 }}>{label}</div>
          {sub && <div style={{ fontSize:11, color:"#888", marginTop:1 }}>{sub}</div>}
        </div>
        <div onClick={()=>setV(x=>!x)} style={{ width:36, height:20, borderRadius:10, background:v?"#185FA5":"#D0D0C8", cursor:"pointer", position:"relative", transition:"background .2s", flexShrink:0 }}>
          <div style={{ position:"absolute", top:3, left:v?18:3, width:14, height:14, borderRadius:"50%", background:"#fff", transition:"left .2s" }}/>
        </div>
      </div>
    );
  };

  const panels = {
    empresa: (
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        <div>
          <div style={{ fontSize:12.5, fontWeight:500, marginBottom:12, color:"#555" }}>Datos de la empresa</div>
          <Field label="Nombre o razón social" val="Inmobiliaria Méndez" />
          <Field label="NIT / RUT" val="900.234.187-3" />
          <Field label="Teléfono principal" val="316 820 4411" />
          <Field label="Correo electrónico" val="contacto@inmomendez.co" type="email" />
          <Field label="Dirección" val="Calle 35 #28-14, Bucaramanga" />
          <Field label="Ciudad" val="Bucaramanga" />
        </div>
        <div>
          <div style={{ fontSize:12.5, fontWeight:500, marginBottom:12, color:"#555" }}>Logo y marca</div>
          <div style={{ border:"1px dashed #D0D0C8", borderRadius:10, padding:"30px 20px", textAlign:"center", marginBottom:14, cursor:"pointer", background:"#FAFAF8" }}>
            <div style={{ fontSize:28, marginBottom:6 }}>🖼</div>
            <div style={{ fontSize:12.5, color:"#888" }}>Arrastra tu logo aquí</div>
            <div style={{ fontSize:11, color:"#bbb", marginTop:2 }}>PNG o JPG · máx 2MB</div>
          </div>
          <Field label="Slogan (opcional)" val="Tu hogar, nuestra responsabilidad" />
          <Field label="Sitio web (opcional)" val="www.inmomendez.co" />
        </div>
      </div>
    ),
    cuenta: <CuentasBancarias />,
    moneda: <MonedaRegion />,
    recibos: (
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        <div>
          <div style={{ fontSize:12.5, fontWeight:500, marginBottom:12, color:"#555" }}>Plantilla del recibo</div>
          <Field label="Encabezado" val="INMOBILIARIA MÉNDEZ" />
          <Field label="Pie de página" val="Gracias por su pago puntual." />
          <Field label="Consecutivo inicial" val="R-2025-0001" hint="El sistema incrementa automáticamente." />
          <Field label="Ancho de impresión" val={["58mm (mini POS)","80mm (estándar)","Carta"]} type="select" />
        </div>
        <div>
          <div style={{ fontSize:12.5, fontWeight:500, marginBottom:12, color:"#555" }}>Elementos del recibo</div>
          <Toggle label="Mostrar logo" sub="Aparece en la parte superior si tienes logo cargado" on={true} />
          <Toggle label="Código de barras" sub="Referencia en barras al pie del recibo" on={true} />
          <Toggle label="Datos bancarios" sub="Banco y número de cuenta de recaudo" on={true} />
          <Toggle label="Próxima fecha de vencimiento" sub="Recuerda al inquilino la fecha del siguiente pago" on={true} />
          <Toggle label="Aviso de mora" sub="Mensaje automático si el pago llegó después del día límite" on={false} />
        </div>
      </div>
    ),
    usuarios: (
      <div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
          <div style={{ fontSize:12.5, fontWeight:500, color:"#555" }}>Usuarios con acceso al sistema</div>
          <Btn primary>+ Invitar usuario</Btn>
        </div>
        {[
          { ini:"CM", col:"blue",   name:"Carlos Méndez",  email:"carlos@inmomendez.co",  rol:"Propietario / Admin",       activo:true },
          { ini:"LP", col:"teal",   name:"Lina Pedraza",   email:"lina@inmomendez.co",    rol:"Asistente",                 activo:true },
          { ini:"JR", col:"gray",   name:"Jorge Ruiz",     email:"jorge@inmomendez.co",   rol:"Contador (solo lectura)",   activo:false },
        ].map((u,i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:"0.5px solid #F0F0EC" }}>
            <Avatar initials={u.ini} color={u.col} />
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:500, fontSize:12.5 }}>{u.name}</div>
              <div style={{ fontSize:11, color:"#888" }}>{u.email}</div>
            </div>
            <Pill color={u.rol.includes("Admin")?"blue":u.rol.includes("Contador")?"gray":"teal"}>{u.rol}</Pill>
            <Pill color={u.activo?"green":"gray"}>{u.activo?"Activo":"Inactivo"}</Pill>
            <button style={{ background:"none", border:"none", cursor:"pointer", color:"#bbb", fontSize:15 }}>···</button>
          </div>
        ))}
        <div style={{ marginTop:14, background:"#FAEEDA", borderRadius:8, padding:"10px 12px", fontSize:12, color:"#633806" }}>
          ⚠ Los usuarios <strong>Contador</strong> solo pueden ver reportes y descargar documentos. No pueden registrar pagos ni editar datos.
        </div>
      </div>
    ),
    ipc: (
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        <div>
          <div style={{ fontSize:12.5, fontWeight:500, marginBottom:12, color:"#555" }}>Parámetros financieros</div>
          <Field label="IPC anual aplicado (%)" val="4.2" hint="Dato oficial DANE para el año en curso." />
          <Field label="Mes de aplicación del IPC" val={["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]} type="select" />
          <Field label="Día límite de pago" val="5" hint="Después de este día se considera mora." />
          <Field label="Tasa de interés de mora (% mensual)" val="1.5" hint="Se aplica sobre el canon adeudado." />
        </div>
        <div>
          <div style={{ fontSize:12.5, fontWeight:500, marginBottom:12, color:"#555" }}>Contratos que se ajustan este ciclo</div>
          {[
            { ref:"APT-03", nombre:"Apto 03",  canon:1850000 },
            { ref:"APT-12", nombre:"Apto 12",  canon:1450000 },
            { ref:"APT-07", nombre:"Apto 07",  canon:1350000 },
          ].map((c,i) => (
            <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:"0.5px solid #F0F0EC", fontSize:12.5 }}>
              <div>
                <div style={{ fontWeight:500 }}>{c.nombre}</div>
                <div style={{ fontSize:11, color:"#aaa" }}>{c.ref}</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ color:"#aaa", textDecoration:"line-through", fontSize:11 }}>${c.canon.toLocaleString("es-CO")}</div>
                <div style={{ fontWeight:500, color:"#27500A" }}>${Math.round(c.canon*1.042).toLocaleString("es-CO")}</div>
              </div>
            </div>
          ))}
          <div style={{ marginTop:10, background:"#EAF3DE", borderRadius:8, padding:"8px 12px", fontSize:11.5, color:"#27500A" }}>
            Incremento del 4.2% calculado. Guarda para actualizar los cánones.
          </div>
        </div>
      </div>
    ),
    notif: (
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        <div>
          <div style={{ fontSize:12.5, fontWeight:500, marginBottom:12, color:"#555" }}>Alertas automáticas</div>
          <Toggle label="Recordatorio de cobro mensual" sub="Aviso 3 días antes del vencimiento de cada pago" on={true} />
          <Toggle label="Alerta de mora" sub="Notificación cuando un pago lleva más de 5 días vencido" on={true} />
          <Toggle label="Contratos por vencer" sub="Alerta 30 días antes del vencimiento del contrato" on={true} />
          <Toggle label="Facturas de servicios sin registrar" sub="Si lleva más de 15 días sin cargar factura" on={false} />
          <Toggle label="Mantenimientos sin atender" sub="Si una solicitud lleva más de 7 días pendiente" on={true} />
          <Toggle label="Resumen semanal" sub="Reporte automático los lunes con el estado del portafolio" on={false} />
          <Toggle label="Recordatorio IPC anual" sub="Aviso en enero para aplicar el ajuste de cánones" on={true} />
        </div>
        <div>
          <div style={{ fontSize:12.5, fontWeight:500, marginBottom:12, color:"#555" }}>Canal de notificaciones</div>
          <Field label="Correo para alertas" val="carlos@inmomendez.co" type="email" />
          <Field label="WhatsApp (opcional)" val="+57 316 820 4411" hint="Para alertas urgentes de mora y vencimientos." />
          <div style={{ background:"#E6F1FB", borderRadius:8, padding:"10px 12px", fontSize:12, color:"#0C447C", marginTop:4 }}>
            ℹ Las notificaciones por WhatsApp requieren número verificado. Se envían solo para alertas de alta prioridad.
          </div>
        </div>
      </div>
    ),
    backup: (
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        <div>
          <div style={{ fontSize:12.5, fontWeight:500, marginBottom:12, color:"#555" }}>Exportar datos</div>
          {[
            { icon:"📊", label:"Exportar inmuebles",       fmt:"Excel .xlsx" },
            { icon:"👥", label:"Exportar inquilinos",      fmt:"Excel .xlsx" },
            { icon:"💵", label:"Exportar pagos del año",   fmt:"Excel .xlsx" },
            { icon:"🧾", label:"Exportar gastos del año",  fmt:"Excel .xlsx" },
            { icon:"📦", label:"Exportar todo el portafolio", fmt:"ZIP completo" },
          ].map((e,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"9px 0", borderBottom:"0.5px solid #F0F0EC", fontSize:12.5 }}>
              <span>{e.icon} {e.label}</span>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:11, color:"#aaa" }}>{e.fmt}</span>
                <Btn>↓ Descargar</Btn>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div style={{ fontSize:12.5, fontWeight:500, marginBottom:12, color:"#555" }}>Respaldo automático</div>
          <Toggle label="Respaldo diario automático" sub="Copia de seguridad cada 24 horas en la nube" on={true} />
          <Toggle label="Respaldo antes de cambios masivos" sub="Antes de aplicar IPC o ediciones masivas" on={true} />
          <div style={{ marginTop:14 }}>
            <div style={{ fontSize:11.5, color:"#888", marginBottom:8 }}>Último respaldo</div>
            <div style={{ background:"#EAF3DE", borderRadius:8, padding:"10px 12px", fontSize:12.5, color:"#27500A" }}>
              ✅ Hoy 06:00 a.m. — Todo en orden
            </div>
          </div>
          <div style={{ marginTop:12 }}>
            <Field label="Correo de respaldo" val="backup@inmomendez.co" type="email" hint="Recibes el archivo ZIP de respaldo en este correo." />
          </div>
        </div>
      </div>
    ),
  };

  return (
    <div style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
      <div style={{ width:180, flexShrink:0, background:"#fff", border:"0.5px solid #E5E5E0", borderRadius:12, overflow:"hidden" }}>
        {menu.map((m,i) => (
          <div key={m.id} onClick={()=>setSec(m.id)} style={{
            display:"flex", alignItems:"center", gap:9, padding:"10px 14px",
            cursor:"pointer", fontSize:12.5, borderBottom: i<menu.length-1?"0.5px solid #F5F5F3":"none",
            background: sec===m.id?"#F1EFE8":"#fff",
            color: sec===m.id?"#1a1a1a":"#666",
            fontWeight: sec===m.id?500:400,
          }}
            onMouseEnter={e=>{ if(sec!==m.id) e.currentTarget.style.background="#FAFAF8"; }}
            onMouseLeave={e=>{ if(sec!==m.id) e.currentTarget.style.background="#fff"; }}>
            <span style={{ fontSize:15 }}>{m.icon}</span>
            {m.label}
          </div>
        ))}
      </div>
      <div style={{ flex:1, background:"#fff", border:"0.5px solid #E5E5E0", borderRadius:12, padding:18 }}>
        <div style={{ fontSize:13, fontWeight:500, marginBottom:16, paddingBottom:10, borderBottom:"0.5px solid #F0F0EC", display:"flex", alignItems:"center", gap:8 }}>
          <span>{menu.find(m=>m.id===sec)?.icon}</span>
          {menu.find(m=>m.id===sec)?.label}
        </div>
        {panels[sec]}
        <div style={{ marginTop:18, paddingTop:14, borderTop:"0.5px solid #F0F0EC", display:"flex", gap:8, justifyContent:"flex-end" }}>
          <Btn>Cancelar</Btn>
          <Btn primary>💾 Guardar cambios</Btn>
        </div>
      </div>
    </div>
  );
}

const MODULOS_AYUDA = [
  {
    id:"dashboard", icon:"▦", nombre:"Dashboard", color:"blue",
    desc:"Vista general del negocio. El punto de partida cada vez que ingresas.",
    funciones:[
      { f:"Métricas principales", d:"Total de inmuebles, recaudo del mes, cartera vencida y porcentaje de ocupación vs meta." },
      { f:"Alertas prioritarias", d:"Inquilinos en mora, contratos por vencer, mantenimientos sin atender e incrementos IPC pendientes." },
      { f:"Últimos pagos", d:"Los 4 pagos más recientes con nombre, inmueble, valor y estado." },
      { f:"Gráfica Ingresos vs Gastos", d:"Barras comparativas por mes. Filtra por año o mes individual. Muestra ingresos, gastos y balance libre." },
      { f:"Panel de disponibilidad", d:"Inmuebles sin inquilino activo: libres, en reparación o disponibles." },
    ]
  },
  {
    id:"inmuebles", icon:"🏢", nombre:"Inmuebles", color:"teal",
    desc:"Registro y control de todas las propiedades del portafolio.",
    funciones:[
      { f:"Vista tabla", d:"Cada inmueble en una fila: referencia, nombre, tipo, dirección, área, inquilino, canon, depósito, vencimiento, servicios y dos estados." },
      { f:"Filtro por tipo", d:"Todos / Vivienda / Comercial / Bodega. Combinable con filtro de ocupación." },
      { f:"Filtro por ocupación", d:"Ocupado / Disponible / Mora / Reparación con color propio." },
      { f:"Ordenar columnas", d:"Clic en encabezado ordena ascendente o descendente." },
      { f:"Dos columnas de estado", d:"Ocupación (estado físico) y Contrato (Vigente/Por vencer/Vencido) son independientes." },
    ]
  },
  {
    id:"inquilinos", icon:"👥", nombre:"Inquilinos", color:"purple",
    desc:"Directorio permanente. El historial nunca se borra, solo cambia de estado.",
    funciones:[
      { f:"Historial permanente", d:"Los inquilinos jamás se eliminan. Solo cambian de estado para trazabilidad legal y financiera." },
      { f:"Ciclo de vida", d:"Activo, En mora, Prospecto, Retirado, Proceso jurídico." },
      { f:"Dos columnas de estado", d:"Estado de pago (Al día/Parcial/Mora) y estado de ciclo son columnas independientes." },
      { f:"Filtros combinables", d:"Puedes filtrar por ciclo Y por estado de pago al mismo tiempo." },
    ]
  },
  {
    id:"pagos", icon:"💵", nombre:"Pagos y recibos", color:"green",
    desc:"Registro de pagos y generación de tirillas POS.",
    funciones:[
      { f:"Registro de pago", d:"Selecciona inmueble-inquilino, valor, fecha, concepto y forma de pago. Admite pagos parciales." },
      { f:"Tirilla POS", d:"Generada automáticamente con número consecutivo, datos del inquilino, período y total. Lista para imprimir." },
      { f:"Intereses de mora", d:"Campo separado para registrar el valor de intereses si el pago llega tarde." },
      { f:"Nominal del mes", d:"Tabla resumen con todos los inquilinos y su estado de pago." },
    ]
  },
  {
    id:"gastos", icon:"🧾", nombre:"Gastos", color:"amber",
    desc:"Todos los egresos del negocio: mantenimiento, servicios, seguros, plataformas y documentos.",
    funciones:[
      { f:"Categorías", d:"Mantenimiento (arreglos, reparaciones), Servicios (acueducto, energía, gas), Administrativo, Seguros (todo riesgo, incendio, resp. civil), Plataformas (Airbnb, Booking) y Otros." },
      { f:"Filtros combinables", d:"Por categoría + por estado (Pagado/Pendiente) + buscador de texto simultáneamente." },
      { f:"Total dinámico", d:"El pie de tabla muestra el total exacto de los registros visibles según los filtros activos." },
      { f:"Mantenimiento desde gastos", d:"Registra arreglos y reparaciones directamente como gasto categoría Mantenimiento, con inmueble, técnico y descripción." },
      { f:"Documentos adjuntos", d:"Cada gasto permite adjuntar su soporte: factura, cotización, recibo o contrato de servicio." },
    ]
  },
  {
    id:"servicios", icon:"⚡", nombre:"Servicios públicos", color:"blue",
    desc:"Control del estado de acueducto, energía y gas por inmueble.",
    funciones:[
      { f:"Panel por servicio", d:"Tres columnas: Acueducto, Energía y Gas. Estado de pago por inmueble." },
      { f:"Estados", d:"Pagado, Vence hoy, Vencido, Pendiente, Vacío (sin inquilino)." },
      { f:"Cargar factura", d:"Sube el PDF de la factura asociado al inmueble y mes." },
    ]
  },
  {
    id:"recordatorios", icon:"🔔", nombre:"Recordatorios", color:"red",
    desc:"Alertas organizadas por urgencia: hoy, esta semana, este mes.",
    funciones:[
      { f:"Tres niveles", d:"Urgentes (hoy/rojo), Esta semana (naranja) y Este mes (azul)." },
      { f:"Links directos", d:"Cada alerta tiene un enlace que lleva directamente al módulo donde se resuelve." },
      { f:"Tipos", d:"Cobros de mora, facturas de servicios, contratos por vencer, mantenimientos y seguros." },
      { f:"Crear recordatorio", d:"Programa nuevos avisos con fecha, tipo y descripción." },
    ]
  },
  {
    id:"reportes", icon:"📊", nombre:"Reportes", color:"green",
    desc:"Análisis financiero del portafolio.",
    funciones:[
      { f:"Rentabilidad por inmueble", d:"Canon, gastos asociados y utilidad neta por propiedad." },
      { f:"Resumen mes a mes", d:"Recaudo, gastos y utilidad de cada mes del año." },
      { f:"Ocupación histórica", d:"Gráfica de barras con porcentaje de ocupación por mes." },
    ]
  },
  {
    id:"configuracion", icon:"⚙️", nombre:"Configuración", color:"gray",
    desc:"Ajustes del sistema, empresa, recibos, usuarios y notificaciones.",
    funciones:[
      { f:"Mi empresa", d:"Nombre, NIT, teléfono, correo, dirección y logo para los recibos." },
      { f:"Cuenta bancaria", d:"Datos de recaudo que aparecen automáticamente en las tirillas POS." },
      { f:"Recibos POS", d:"Personaliza encabezado, pie de página, consecutivo y elementos del recibo." },
      { f:"Usuarios y acceso", d:"Invita asistentes o contadores con roles y permisos diferenciados." },
      { f:"Notificaciones", d:"Activa o desactiva cada tipo de alerta y define el canal (correo/WhatsApp)." },
      { f:"Plataformas", d:"Conecta Airbnb, Booking y otras. Las comisiones se registran solas en Gastos." },
      { f:"Datos y respaldo", d:"Exporta Excel/ZIP de todo el portafolio y configura respaldo automático." },
    ]
  },
];

const INICIO_RAPIDO = [
  { paso:1, icon:"⚙️", titulo:"Configura tu empresa",           detalle:"Ve a Configuración → Mi empresa. Ingresa nombre, NIT, teléfono y correo. Luego configura Cuenta bancaria y Moneda y región.", page:"configuracion" },
  { paso:2, icon:"🖨",  titulo:"Personaliza tus recibos",        detalle:"En Configuración → Recibos POS ajusta el encabezado, pie de página y activa el logo. Esto se verá en cada tirilla que generes.", page:"configuracion" },
  { paso:3, icon:"🏢", titulo:"Registra tus inmuebles",          detalle:"Ve a Inmuebles → + Nuevo. Agrega cada propiedad con tipo (vivienda/comercial/bodega), dirección, área, canon y depósito.", page:"inmuebles" },
  { paso:4, icon:"👥", titulo:"Registra tus inquilinos",         detalle:"Ve a Inquilinos → + Nuevo inquilino. Ingresa CC, nombre, teléfono y asígnalo al inmueble. Estado inicial: Activo.", page:"inquilinos" },
  { paso:5, icon:"💵", titulo:"Registra el estado de pagos",     detalle:"En Pagos y recibos registra qué inquilinos pagaron, cuáles están parciales y cuáles en mora. Genera la tirilla POS de cada pago.", page:"pagos" },
  { paso:6, icon:"⚡", titulo:"Actualiza servicios públicos",    detalle:"En Servicios públicos ingresa el estado de acueducto, energía y gas de cada inmueble y carga las facturas del mes.", page:"servicios" },
  { paso:7, icon:"🧾", titulo:"Registra gastos y mantenimiento", detalle:"En Gastos añade mantenimiento, seguros, plataformas y otros egresos. Adjunta el soporte (factura, cotización o contrato).", page:"gastos" },
  { paso:8, icon:"🔔", titulo:"Configura tus recordatorios",     detalle:"En Recordatorios activa alertas de mora, contratos por vencer y servicios. Cada alerta tiene un link directo al módulo.", page:"recordatorios" },
  { paso:9, icon:"📊", titulo:"Revisa tus reportes",             detalle:"En Reportes consulta rentabilidad por inmueble, resumen mes a mes y ocupación histórica. Con todo cargado se actualiza solo.", page:"reportes" },
];

function Ayuda({ setPage }) {
  const [vista, setVista] = useState("inicio");
  const [buscar, setBuscar] = useState("");
  const [seccion, setSeccion] = useState("Todos");

  const secciones = ["Todos", ...MODULOS_AYUDA.map(m=>m.nombre)];
  const filteredMods = MODULOS_AYUDA.filter(m =>
    (seccion==="Todos" || m.nombre===seccion) &&
    (buscar==="" || m.nombre.toLowerCase().includes(buscar.toLowerCase()) ||
      m.funciones.some(f=>f.f.toLowerCase().includes(buscar.toLowerCase())||f.d.toLowerCase().includes(buscar.toLowerCase())))
  );

  return (
    <div>
      {/* Tabs principales */}
      <div style={{ display:"flex", gap:4, marginBottom:14 }}>
        {[
          { id:"inicio", label:"🚀 Inicio rápido", desc:"Cómo configurar paso a paso" },
          { id:"modulos", label:"📖 Funciones", desc:"Guía de todos los módulos" },
        ].map(v => (
          <button key={v.id} onClick={()=>setVista(v.id)} style={{ padding:"8px 16px", borderRadius:10, fontSize:12.5, cursor:"pointer", border:`1.5px solid ${vista===v.id?"#185FA5":"#E5E5E0"}`, background: vista===v.id?"#E6F1FB":"#fff", color: vista===v.id?"#0C447C":"#666", fontWeight: vista===v.id?500:400 }}>
            {v.label}
          </button>
        ))}
      </div>

      {vista==="inicio" && (
        <div>
          <div style={{ background:"#fff", border:"0.5px solid #E5E5E0", borderRadius:12, padding:"14px 18px", marginBottom:14 }}>
            <div style={{ fontSize:14, fontWeight:500, marginBottom:4 }}>Bienvenido a RentaFlow 👋</div>
            <div style={{ fontSize:12.5, color:"#666", lineHeight:1.7 }}>
              Sigue estos 10 pasos en orden y en menos de 30 minutos tendrás tu portafolio funcionando al 100%. Haz clic en <strong>Ir al módulo →</strong> para navegar directamente a donde necesitas trabajar.
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {INICIO_RAPIDO.map((s,i) => (
              <div key={i} style={{ background:"#fff", border:"0.5px solid #E5E5E0", borderRadius:10, padding:"12px 16px", display:"flex", gap:14, alignItems:"flex-start" }}>
                <div style={{ width:32, height:32, borderRadius:"50%", background:"#E6F1FB", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:"#185FA5", flexShrink:0 }}>{s.paso}</div>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                    <span style={{ fontSize:16 }}>{s.icon}</span>
                    <span style={{ fontWeight:500, fontSize:13 }}>{s.titulo}</span>
                  </div>
                  <div style={{ fontSize:12, color:"#666", lineHeight:1.6 }}>{s.detalle}</div>
                </div>
                <button onClick={()=>setPage(s.page)} style={{ padding:"5px 12px", borderRadius:8, border:"0.5px solid #D0D0C8", background:"#fff", cursor:"pointer", fontSize:12, color:"#185FA5", fontWeight:500, whiteSpace:"nowrap", flexShrink:0 }}>Ir →</button>
              </div>
            ))}
          </div>
          <div style={{ marginTop:12, padding:"12px 16px", background:"#EAF3DE", borderRadius:10, fontSize:12, color:"#27500A", lineHeight:1.7 }}>
            ✅ <strong>Consejo:</strong> Usa el botón flotante <strong>✓</strong> en la esquina inferior derecha para marcar cada paso como completado y ver tu progreso en todo momento.
          </div>
        </div>
      )}

      {vista==="modulos" && (
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12, flexWrap:"wrap" }}>
            <input placeholder="Buscar función o módulo..." value={buscar} onChange={e=>{setBuscar(e.target.value);setSeccion("Todos");}}
              style={{ width:240, padding:"7px 10px", border:"0.5px solid #D0D0C8", borderRadius:8, fontSize:12.5 }} />
            <div style={{ width:"0.5px", height:20, background:"#E0E0D8" }}/>
            <div style={{ display:"flex", gap:3, flexWrap:"wrap" }}>
              {secciones.map(s=>(
                <button key={s} onClick={()=>{setSeccion(s);setBuscar("");}} style={{ padding:"3px 9px", borderRadius:20, fontSize:11, cursor:"pointer", border:"0.5px solid #D0D0C8", background:seccion===s?"#1a1a1a":"#fff", color:seccion===s?"#fff":"#666" }}>{s}</button>
              ))}
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {filteredMods.map((m,mi)=>(
              <div key={mi} style={{ background:"#fff", border:"0.5px solid #E5E5E0", borderRadius:12, overflow:"hidden" }}>
                <div style={{ padding:"11px 16px", borderBottom:"0.5px solid #F0F0EC", background:"#FAFAF8", display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:30, height:30, borderRadius:8, background:COLORS[m.color]?.bg||"#F1EFE8", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, flexShrink:0 }}>{m.icon}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:500, fontSize:13 }}>{m.nombre}</div>
                    <div style={{ fontSize:11.5, color:"#888" }}>{m.desc}</div>
                  </div>
                  <span style={{ fontSize:11, color:"#bbb" }}>{m.funciones.length} funciones</span>
                </div>
                {m.funciones.map((fn,fi)=>(
                  <div key={fi} style={{ display:"flex", gap:10, padding:"9px 16px", borderBottom:fi<m.funciones.length-1?"0.5px solid #F5F5F3":"none" }}
                    onMouseEnter={e=>e.currentTarget.style.background="#FAFAF8"}
                    onMouseLeave={e=>e.currentTarget.style.background=""}>
                    <div style={{ width:6, height:6, borderRadius:"50%", background:COLORS[m.color]?.mid||"#888", marginTop:6, flexShrink:0 }}/>
                    <div>
                      <div style={{ fontWeight:500, fontSize:12.5, marginBottom:1 }}>{fn.f}</div>
                      <div style={{ fontSize:12, color:"#666", lineHeight:1.6 }}>{fn.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            {filteredMods.length===0 && (
              <div style={{ textAlign:"center", padding:"40px 20px", color:"#bbb", fontSize:13 }}>
                Sin resultados para "<strong style={{color:"#888"}}>{buscar}</strong>"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── APP SHELL ────────────────────────────────────────────────────────────────

const NAV = [
  { id:"recordatorios", label:"Recordatorios", icon:"🔔" },
  { id:"dashboard", label:"Dashboard", icon:"▦" },
  { id:"inmuebles", label:"Inmuebles", icon:"🏢" },
  { id:"inquilinos", label:"Inquilinos", icon:"👥" },
  { id:"pagos", label:"Pagos y recibos", icon:"💵" },
  { id:"gastos", label:"Gastos", icon:"🧾" },
];
const NAV2 = [
  { id:"servicios", label:"Servicios públicos", icon:"⚡" },
  { id:"reportes", label:"Reportes", icon:"📊" },
];

const PAGES = { dashboard:Dashboard, inmuebles:Inmuebles, inquilinos:Inquilinos, pagos:Pagos, gastos:Gastos, servicios:Servicios, mantenimiento:Mantenimiento, documentos:Documentos, recordatorios:Recordatorios, reportes:Reportes, configuracion:Configuracion, ayuda:Ayuda };
const TITLES = { dashboard:"Dashboard general", inmuebles:"Inmuebles", inquilinos:"Inquilinos", pagos:"Pagos y recibos", gastos:"Nominal de gastos", servicios:"Servicios públicos", mantenimiento:"Arreglos y mantenimiento", documentos:"Documentos", recordatorios:"Recordatorios", reportes:"Reportes y métricas", configuracion:"Configuración", ayuda:"Centro de ayuda" };

export default function App() {
  const [page, setPage] = useState("dashboard");
  const Page = PAGES[page];

  const NavItem = ({ item }) => (
    <div onClick={()=>setPage(item.id)} style={{ display:"flex", alignItems:"center", gap:9, padding:"7px 14px", margin:"1px 6px", borderRadius:8, cursor:"pointer", fontSize:12.5, background:page===item.id?"#F1EFE8":"transparent", color:page===item.id?"#1a1a1a":"#666", fontWeight:page===item.id?500:400 }}
      onMouseEnter={e=>{if(page!==item.id)e.currentTarget.style.background="#F8F8F6";}}
      onMouseLeave={e=>{if(page!==item.id)e.currentTarget.style.background="transparent";}}>
      <span style={{ fontSize:14 }}>{item.icon}</span>{item.label}
    </div>
  );

  return (
    <div style={{ display:"flex", height:"100vh", fontFamily:"system-ui,-apple-system,sans-serif", fontSize:13, color:"#1a1a1a", background:"#F5F5F2", position:"relative" }}>
      {/* Sidebar */}
      <div style={{ width:192, flexShrink:0, background:"#fff", borderRight:"0.5px solid #E5E5E0", display:"flex", flexDirection:"column" }}>
        <div style={{ padding:"14px 16px", borderBottom:"0.5px solid #E5E5E0" }}>
          <div style={{ fontSize:15, fontWeight:600, letterSpacing:"-.01em" }}>🏠 RentaFlow</div>
          <div style={{ fontSize:11, color:"#888", marginTop:1 }}>Gestión de arriendos</div>
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:"8px 0" }}>
          {NAV.map(item=><NavItem key={item.id} item={item}/>)}
          <div style={{ fontSize:10, fontWeight:500, color:"#bbb", padding:"10px 16px 3px", textTransform:"uppercase", letterSpacing:".06em" }}>Operación</div>
          {NAV2.map(item=><NavItem key={item.id} item={item}/>)}
          <div style={{ fontSize:10, fontWeight:500, color:"#bbb", padding:"10px 16px 3px", textTransform:"uppercase", letterSpacing:".06em" }}>Sistema</div>
          <NavItem item={{ id:"configuracion", label:"Configuración", icon:"⚙️" }}/>
          <NavItem item={{ id:"ayuda", label:"Ayuda", icon:"❓" }}/>
        </div>
        <div style={{ padding:"10px 14px", borderTop:"0.5px solid #E5E5E0", display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:28, height:28, borderRadius:"50%", background:"#E6F1FB", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:500, color:"#0C447C" }}>CM</div>
          <div><div style={{ fontSize:12, fontWeight:500 }}>Carlos Méndez</div><div style={{ fontSize:11, color:"#888" }}>Propietario</div></div>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0 }}>
        <div style={{ padding:"0 20px", height:48, borderBottom:"0.5px solid #E5E5E0", background:"#fff", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
          <span style={{ fontSize:14, fontWeight:500 }}>{TITLES[page]}</span>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:11, padding:"3px 9px", borderRadius:20, fontWeight:500, background:"#FCEBEB", color:"#A32D2D" }}>⚠ 3 alertas</span>
            {!["ayuda","configuracion"].includes(page) && <Btn primary>+ Nuevo</Btn>}
            {page==="configuracion" && <Btn primary onClick={()=>setPage("ayuda")}>❓ Ayuda</Btn>}
          </div>
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:18, position:"relative" }}>
          <Page setPage={setPage} />
        </div>
      </div>

      {/* Checklist flotante */}
      <ChecklistFlotante setPage={setPage} />
    </div>
  );
}
