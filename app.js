// ════════════════════════════════════════════════════════════════════════════
// CONSTANTES DE COLOR (deben coincidir con style.css)
// ════════════════════════════════════════════════════════════════════════════
const LIME = "#C6F127";
const LIME_D = "#9BBF1F";
const BLACK = "#0A0A0A";
const PANEL = "#151515";
const BORDER = "#2A2A2A";
const GREY = "#9CA3AF";
const WHITE = "#F5F5F5";

let componentes = [];

// ════════════════════════════════════════════════════════════════════════════
// TOGGLE DETALLE
// ════════════════════════════════════════════════════════════════════════════
function toggleDetail(id) {
  const detail = document.getElementById("detail-" + id);
  const row = document.querySelector(`[data-idx="${id}"]`);
  const arrow = row.querySelector(".comp-arrow");
  if (detail.style.display === "none") {
    detail.style.display = "table-row";
    arrow.textContent = "▼";
    arrow.style.color = LIME;
  } else {
    detail.style.display = "none";
    arrow.textContent = "▶";
    arrow.style.color = GREY;
  }
}

// ════════════════════════════════════════════════════════════════════════════
// NAVEGACIÓN PRINCIPAL
// ════════════════════════════════════════════════════════════════════════════
document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const target = btn.dataset.section;
    document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
    document.getElementById(`section-${target}`).classList.add("active");
  });
});

// ════════════════════════════════════════════════════════════════════════════
// TABS GENÉRICOS
// ════════════════════════════════════════════════════════════════════════════
function setupTabs(selectorAttr, panelPrefix) {
  document.querySelectorAll(`[${selectorAttr}]`).forEach(btn => {
    btn.addEventListener("click", () => {
      const group = btn.closest(".tabs");
      group.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const value = btn.getAttribute(selectorAttr);
      document.querySelectorAll(`[id^="${panelPrefix}-"]`).forEach(p => p.classList.remove("active"));
      document.getElementById(`${panelPrefix}-${value}`).classList.add("active");
    });
  });
}
setupTabs("data-tab", "tab");
setupTabs("data-lifetab", "life");

// ════════════════════════════════════════════════════════════════════════════
// HELPERS
// ════════════════════════════════════════════════════════════════════════════
function scoreColor(score) {
  return score >= 90 ? LIME : score >= 75 ? "#e3b341" : "#f85149";
}

function renderUso(usoDict) {
  let html = "";
  for (const [resol, nivel] of Object.entries(usoDict)) {
    html += `<span class="use-tag ${USE_CLASS[nivel]}">${resol}: ${USE_LABEL[nivel]}</span>`;
  }
  return html;
}

function destroyChart(id) {
  const existing = Chart.getChart(id);
  if (existing) existing.destroy();
}

const chartDefaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { labels: { color: WHITE } },
    tooltip: { backgroundColor: PANEL, titleColor: WHITE, bodyColor: WHITE }
  },
  scales: {
    x: { ticks: { color: GREY }, grid: { color: BORDER } },
    y: { ticks: { color: GREY }, grid: { color: BORDER } }
  }
};

function interpolateColor(c1, c2, t) {
  const a = hexToRgb(c1), b = hexToRgb(c2);
  const r = Math.round(a.r + (b.r - a.r) * t);
  const g = Math.round(a.g + (b.g - a.g) * t);
  const bl = Math.round(a.b + (b.b - a.b) * t);
  return `rgb(${r},${g},${bl})`;
}
function hexToRgb(hex) {
  const v = hex.replace("#", "");
  return {
    r: parseInt(v.substring(0, 2), 16),
    g: parseInt(v.substring(2, 4), 16),
    b: parseInt(v.substring(4, 6), 16)
  };
}

// ════════════════════════════════════════════════════════════════════════════
// SECCIÓN — COMPONENTES: CPU
// ════════════════════════════════════════════════════════════════════════════
function renderCPUs() {
  const activeBrands = [...document.querySelectorAll("#cpu-filter .chip.active")].map(c => c.dataset.value);
  const container = document.getElementById("cpu-cards");
  const filtrados = PROCESADORES.filter(cpu => {
    const marca = cpu.nombre.includes("Intel") ? "Intel" : "AMD";
    return activeBrands.includes(marca);
  });

  let html = `<table class="comp-table"><thead><tr><th>Procesador</th><th>Score</th></tr></thead><tbody>`;
  filtrados.forEach((cpu, i) => {
    const color = scoreColor(cpu.score);
    html += `
      <tr class="comp-row" data-idx="cpu-${i}" onclick="toggleDetail('cpu-${i}')">
        <td class="comp-name"><span class="comp-arrow">▶</span> ${cpu.nombre}</td>
        <td><span style="color:${color};font-weight:700;">${cpu.score}/100</span></td>
      </tr>
      <tr class="comp-detail" id="detail-cpu-${i}" style="display:none;">
        <td colspan="2"><div class="detail-grid">
          <div>🧠 <b>Núcleos:</b> ${cpu.nucleos} / ${cpu.hilos} hilos</div>
          <div>⚡ <b>TDP:</b> ${cpu.tdp} W</div>
          <div>🔌 <b>Socket:</b> ${cpu.socket}</div>
          <div>🏷️ <b>Gen:</b> ${cpu.gen}</div>
          <div>💲 <b>Precio:</b> $${cpu.precio} USD</div>
          <div>📅 <b>Vida útil:</b> ${cpu.vida_anos} años</div>
        </div></td>
      </tr>`;
  });
  html += "</tbody></table>";
  container.innerHTML = html;
  renderCPUChart();
}

function renderCPUChart() {
  destroyChart("cpu-chart");
  const ctx = document.getElementById("cpu-chart");
  new Chart(ctx, {
    type: "scatter",
    data: {
      datasets: [{
        label: "Procesadores",
        data: PROCESADORES.map(c => ({ x: c.precio, y: c.score, label: c.nombre })),
        backgroundColor: PROCESADORES.map(c => scoreColor(c.score)),
        pointRadius: 7,
        pointHoverRadius: 9
      }]
    },
    options: {
      ...chartDefaultOptions,
      plugins: {
        ...chartDefaultOptions.plugins,
        legend: { display: false },
        tooltip: {
          ...chartDefaultOptions.plugins.tooltip,
          callbacks: { label: (ctx) => `${ctx.raw.label}: $${ctx.raw.x} | Score ${ctx.raw.y}` }
        }
      },
      scales: {
        x: { ...chartDefaultOptions.scales.x, title: { display: true, text: "Precio (USD)", color: GREY } },
        y: { ...chartDefaultOptions.scales.y, title: { display: true, text: "Score", color: GREY } }
      }
    }
  });
}

document.querySelectorAll("#cpu-filter .chip").forEach(chip => {
  chip.addEventListener("click", () => { chip.classList.toggle("active"); renderCPUs(); });
});

// ════════════════════════════════════════════════════════════════════════════
// SECCIÓN — COMPONENTES: GPU
// ════════════════════════════════════════════════════════════════════════════
function renderGPUs() {
  const activeBrands = [...document.querySelectorAll("#gpu-filter .chip.active")].map(c => c.dataset.value);
  const container = document.getElementById("gpu-cards");
  const filtrados = GRAFICAS.filter(gpu => activeBrands.includes(gpu.marca));

  let html = `<table class="comp-table"><thead><tr><th>Tarjeta Gráfica</th><th>Score</th></tr></thead><tbody>`;
  filtrados.forEach((gpu, i) => {
    const color = scoreColor(gpu.score);
    const colorMarca = gpu.marca === "NVIDIA" ? "#76b900" : "#ed1c24";
    html += `
      <tr class="comp-row" data-idx="gpu-${i}" onclick="toggleDetail('gpu-${i}')">
        <td class="comp-name"><span class="comp-arrow">▶</span> ${gpu.nombre}</td>
        <td><span style="color:${color};font-weight:700;">${gpu.score}/100</span></td>
      </tr>
      <tr class="comp-detail" id="detail-gpu-${i}" style="display:none;">
        <td colspan="2"><div class="detail-grid">
          <div>🖼️ <b>VRAM:</b> ${gpu.vram} GB</div>
          <div>⚡ <b>TDP:</b> ${gpu.tdp} W</div>
          <div>💲 <b>Precio:</b> $${gpu.precio} USD</div>
          <div>🏷️ <b>Marca:</b> <span style="color:${colorMarca}">${gpu.marca}</span></div>
          <div>📅 <b>Vida útil:</b> ${gpu.vida_anos} años</div>
        </div></td>
      </tr>`;
  });
  html += "</tbody></table>";
  container.innerHTML = html;
  renderGPUChart();
}

function renderGPUChart() {
  destroyChart("gpu-chart");
  const ctx = document.getElementById("gpu-chart");
  const sorted = [...GRAFICAS].sort((a, b) => a.score - b.score);
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: sorted.map(g => g.nombre),
      datasets: [{ label: "Score", data: sorted.map(g => g.score), backgroundColor: sorted.map(g => g.marca === "NVIDIA" ? "#76b900" : "#ed1c24") }]
    },
    options: {
      ...chartDefaultOptions,
      indexAxis: "y",
      plugins: { ...chartDefaultOptions.plugins, legend: { display: false } },
      scales: {
        x: { ...chartDefaultOptions.scales.x, title: { display: true, text: "Score", color: GREY } },
        y: { ...chartDefaultOptions.scales.y, ticks: { color: GREY, font: { size: 10 } } }
      }
    }
  });
}

document.querySelectorAll("#gpu-filter .chip").forEach(chip => {
  chip.addEventListener("click", () => { chip.classList.toggle("active"); renderGPUs(); });
});

// ════════════════════════════════════════════════════════════════════════════
// SECCIÓN — COMPONENTES: RAM
// ════════════════════════════════════════════════════════════════════════════
function renderRAMs() {
  const activeTypes = [...document.querySelectorAll("#ram-filter .chip.active")].map(c => c.dataset.value);
  const container = document.getElementById("ram-cards");
  const filtradas = RAMS.filter(r => activeTypes.includes(r.tipo));

  let html = `<table class="comp-table"><thead><tr><th>Memoria RAM</th><th>Score</th></tr></thead><tbody>`;
  filtradas.forEach((ram, i) => {
    const color = scoreColor(ram.score);
    const colorTipo = ram.tipo === "DDR5" ? LIME : GREY;
    html += `
      <tr class="comp-row" data-idx="ram-${i}" onclick="toggleDetail('ram-${i}')">
        <td class="comp-name"><span class="comp-arrow">▶</span> ${ram.nombre}</td>
        <td><span style="color:${color};font-weight:700;">${ram.score}/100</span></td>
      </tr>
      <tr class="comp-detail" id="detail-ram-${i}" style="display:none;">
        <td colspan="2"><div class="detail-grid">
          <div>📦 <b>Capacidad:</b> ${ram.capacidad} GB</div>
          <div>⚡ <b>Velocidad:</b> ${ram.velocidad} MT/s</div>
          <div>⏱️ <b>Latencia:</b> ${ram.latencia}</div>
          <div>🏷️ <b>Tipo:</b> <span style="color:${colorTipo}">${ram.tipo}</span></div>
          <div>💲 <b>Precio:</b> $${ram.precio} USD</div>
          <div>📅 <b>Vida útil:</b> ${ram.vida_anos} años</div>
        </div></td>
      </tr>`;
  });
  html += "</tbody></table>";
  container.innerHTML = html;

  const chartSection = document.getElementById("ram-chart-section");
  const emptyMsg = document.getElementById("ram-empty");
  if (filtradas.length === 0) {
    chartSection.style.display = "none";
    emptyMsg.style.display = "block";
  } else {
    chartSection.style.display = "block";
    emptyMsg.style.display = "none";
    renderRAMChart(filtradas);
  }
}

function renderRAMChart(filtradas) {
  destroyChart("ram-chart");
  const ctx = document.getElementById("ram-chart");
  const speeds = filtradas.map(r => r.velocidad);
  const minS = Math.min(...speeds), maxS = Math.max(...speeds);
  function speedColor(v) {
    const t = maxS === minS ? 0.5 : (v - minS) / (maxS - minS);
    if (t < 0.5) return interpolateColor("#e3b341", LIME_D, t * 2);
    return interpolateColor(LIME_D, LIME, (t - 0.5) * 2);
  }
  new Chart(ctx, {
    type: "scatter",
    data: {
      datasets: [{
        label: "Memorias RAM",
        data: filtradas.map(r => ({ x: r.precio, y: r.capacidad, label: r.nombre, vel: r.velocidad, score: r.score })),
        backgroundColor: filtradas.map(r => speedColor(r.velocidad)),
        pointRadius: filtradas.map(r => 5 + (r.score / 100) * 12),
        pointHoverRadius: filtradas.map(r => 7 + (r.score / 100) * 12)
      }]
    },
    options: {
      ...chartDefaultOptions,
      plugins: {
        ...chartDefaultOptions.plugins,
        legend: { display: false },
        tooltip: {
          ...chartDefaultOptions.plugins.tooltip,
          callbacks: { label: (ctx) => `${ctx.raw.label}: $${ctx.raw.x} | ${ctx.raw.y} GB | ${ctx.raw.vel} MT/s` }
        }
      },
      scales: {
        x: { ...chartDefaultOptions.scales.x, title: { display: true, text: "Precio (USD)", color: GREY } },
        y: { ...chartDefaultOptions.scales.y, title: { display: true, text: "Capacidad (GB)", color: GREY } }
      }
    }
  });
}

document.querySelectorAll("#ram-filter .chip").forEach(chip => {
  chip.addEventListener("click", () => { chip.classList.toggle("active"); renderRAMs(); });
});

// ════════════════════════════════════════════════════════════════════════════
// SECCIÓN — VERSUS
// ════════════════════════════════════════════════════════════════════════════
let vsType = "cpu";
const vsConfig = {
  cpu: { items: PROCESADORES, campos: ["nucleos", "hilos", "tdp", "precio", "score"] },
  gpu: { items: GRAFICAS, campos: ["vram", "tdp", "precio", "score"] },
  ram: { items: RAMS, campos: ["capacidad", "velocidad", "precio", "score"] }
};

document.querySelectorAll("[data-vstype]").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("[data-vstype]").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    vsType = btn.dataset.vstype;
    populateVersusSelects();
  });
});

function populateVersusSelects() {
  const { items } = vsConfig[vsType];
  const selectA = document.getElementById("vs-select-a");
  const selectB = document.getElementById("vs-select-b");
  selectA.innerHTML = "";
  selectB.innerHTML = "";
  items.forEach((item) => {
    selectA.innerHTML += `<option value="${item.nombre}">${item.nombre}</option>`;
    selectB.innerHTML += `<option value="${item.nombre}">${item.nombre}</option>`;
  });
  selectA.selectedIndex = 0;
  selectB.selectedIndex = items.length > 1 ? 1 : 0;
  renderVersus();
}

document.getElementById("vs-select-a").addEventListener("change", renderVersus);
document.getElementById("vs-select-b").addEventListener("change", renderVersus);

function normalize(val, campo, items) {
  const vals = items.map(x => x[campo]);
  const mn = Math.min(...vals), mx = Math.max(...vals);
  if (mx === mn) return 0.5;
  if (campo === "precio" || campo === "tdp") return 1 - (val - mn) / (mx - mn);
  return (val - mn) / (mx - mn);
}

function renderVersus() {
  const sel1 = document.getElementById("vs-select-a").value;
  const sel2 = document.getElementById("vs-select-b").value;
  const { items, campos } = vsConfig[vsType];
  const warning = document.getElementById("vs-warning");
  const result = document.getElementById("vs-result");
  if (sel1 === sel2) { warning.style.display = "block"; result.style.display = "none"; return; }
  warning.style.display = "none";
  result.style.display = "block";
  const itemA = items.find(x => x.nombre === sel1);
  const itemB = items.find(x => x.nombre === sel2);
  let filas = [];
  let html = `<thead><tr><th>Especificación</th><th>${sel1}</th><th>${sel2}</th></tr></thead><tbody>`;
  campos.forEach(campo => {
    const vA = itemA[campo], vB = itemB[campo];
    let win;
    if (campo === "precio" || campo === "tdp") { win = vA < vB ? "A" : vB < vA ? "B" : "-"; }
    else { win = vA > vB ? "A" : vB > vA ? "B" : "-"; }
    filas.push(win);
    const claseA = win === "A" ? "vs-win" : "";
    const claseB = win === "B" ? "vs-win" : "";
    html += `<tr><td>${campo.toUpperCase()}</td><td class="${claseA}">${vA}</td><td class="${claseB}">${vB}</td></tr>`;
  });
  html += "</tbody>";
  document.getElementById("vs-table").innerHTML = html;
  renderVersusRadar(itemA, itemB, sel1, sel2, campos, items);
  const winsA = filas.filter(f => f === "A").length;
  const winsB = filas.filter(f => f === "B").length;
  const winnerEl = document.getElementById("vs-winner");
  if (winsA > winsB) { winnerEl.innerHTML = `🏆 <b>${sel1}</b> gana en ${winsA} de ${campos.length} especificaciones`; winnerEl.style.color = LIME; }
  else if (winsB > winsA) { winnerEl.innerHTML = `🏆 <b>${sel2}</b> gana en ${winsB} de ${campos.length} especificaciones`; winnerEl.style.color = "#f0883e"; }
  else { winnerEl.innerHTML = "🤝 Empate técnico — depende de tus prioridades"; winnerEl.style.color = "#e3b341"; }
}

function renderVersusRadar(itemA, itemB, sel1, sel2, campos, items) {
  destroyChart("vs-radar");
  const ctx = document.getElementById("vs-radar");
  const rA = campos.map(c => normalize(itemA[c], c, items));
  const rB = campos.map(c => normalize(itemB[c], c, items));
  new Chart(ctx, {
    type: "radar",
    data: {
      labels: campos.map(c => c.toUpperCase()),
      datasets: [
        { label: sel1, data: rA, borderColor: LIME, backgroundColor: "rgba(198,241,39,0.2)", pointBackgroundColor: LIME },
        { label: sel2, data: rB, borderColor: "#f0883e", backgroundColor: "rgba(240,136,46,0.2)", pointBackgroundColor: "#f0883e" }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { labels: { color: WHITE } }, tooltip: { backgroundColor: PANEL, titleColor: WHITE, bodyColor: WHITE } },
      scales: { r: { min: 0, max: 1, ticks: { color: GREY, backdropColor: "transparent" }, grid: { color: BORDER }, angleLines: { color: BORDER }, pointLabels: { color: GREY } } }
    }
  });
}

// ════════════════════════════════════════════════════════════════════════════
// SECCIÓN — RANKING
// ════════════════════════════════════════════════════════════════════════════
const priceSlider = document.getElementById("price-slider");
priceSlider.addEventListener("input", () => {
  document.getElementById("price-slider-value").textContent = priceSlider.value;
  renderRanking();
});

function renderRanking() {
  const maxPrice = parseInt(priceSlider.value);
  const filtrados = RANKINGS_PC.filter(b => b.precio <= maxPrice);
  const listEl = document.getElementById("ranking-list");
  const emptyEl = document.getElementById("ranking-empty");
  const chartSection = document.getElementById("ranking-chart-section");
  listEl.innerHTML = "";
  if (filtrados.length === 0) { emptyEl.style.display = "block"; chartSection.style.display = "none"; return; }
  emptyEl.style.display = "none";
  chartSection.style.display = "block";
  filtrados.forEach((build, idx) => {
    const pos = idx + 1;
    const medalClass = pos === 1 ? "gold" : pos === 2 ? "silver" : pos === 3 ? "bronze" : "";
    const medal = pos === 1 ? "🥇" : pos === 2 ? "🥈" : pos === 3 ? "🥉" : `#${pos}`;
    listEl.innerHTML += `
      <div class="rank-row">
        <div class="rank-num ${medalClass}">${medal}</div>
        <div class="rank-info">
          <strong>${build.nombre}</strong>
          <span>CPU: ${build.cpu} &nbsp;|&nbsp; GPU: ${build.gpu} &nbsp;|&nbsp; RAM: ${build.ram} GB</span>
        </div>
        <div class="rank-right">
          <div class="rank-score">Score ${build.score}</div>
          <div class="rank-price">$${build.precio.toLocaleString("en-US")} USD</div>
        </div>
      </div>`;
  });
  renderRankingChart(filtrados);
}

function renderRankingChart(filtrados) {
  destroyChart("ranking-chart");
  const ctx = document.getElementById("ranking-chart");
  const scores = filtrados.map(b => b.score);
  const minS = Math.min(...scores), maxS = Math.max(...scores);
  function scoreToColor(s) {
    const t = maxS === minS ? 0.5 : (s - minS) / (maxS - minS);
    if (t < 0.5) return interpolateColor("#e3b341", LIME_D, t * 2);
    return interpolateColor(LIME_D, LIME, (t - 0.5) * 2);
  }
  new Chart(ctx, {
    type: "scatter",
    data: {
      datasets: [{
        label: "Builds",
        data: filtrados.map(b => ({ x: b.precio, y: b.score, label: b.nombre })),
        backgroundColor: filtrados.map(b => scoreToColor(b.score)),
        pointRadius: filtrados.map(b => 6 + (b.score / 100) * 14),
        pointHoverRadius: filtrados.map(b => 8 + (b.score / 100) * 14)
      }]
    },
    options: {
      ...chartDefaultOptions,
      plugins: {
        ...chartDefaultOptions.plugins,
        legend: { display: false },
        tooltip: { ...chartDefaultOptions.plugins.tooltip, callbacks: { label: (ctx) => `${ctx.raw.label}: $${ctx.raw.x.toLocaleString("en-US")} | Score ${ctx.raw.y}` } }
      },
      scales: {
        x: { ...chartDefaultOptions.scales.x, title: { display: true, text: "Precio (USD)", color: GREY } },
        y: { ...chartDefaultOptions.scales.y, title: { display: true, text: "Score", color: GREY } }
      }
    }
  });
}

// ════════════════════════════════════════════════════════════════════════════
// SECCIÓN — PRESUPUESTO PC
// ════════════════════════════════════════════════════════════════════════════
const budgetTipoSelect = document.getElementById("budget-tipo");
PIEZAS_PRESUPUESTO.forEach(p => { budgetTipoSelect.innerHTML += `<option value="${p}">${p}</option>`; });

document.getElementById("budget-add").addEventListener("click", () => {
  const tipo = budgetTipoSelect.value;
  const nombre = document.getElementById("budget-nombre").value.trim();
  const precio = parseFloat(document.getElementById("budget-precio").value);
  const warning = document.getElementById("budget-warning");
  if (nombre === "") { warning.textContent = "Escribe el nombre del componente."; warning.style.display = "block"; return; }
  if (!precio || precio <= 0) { warning.textContent = "Ingresa un precio mayor a 0."; warning.style.display = "block"; return; }
  warning.style.display = "none";
  componentes.push({ tipo, nombre, precio });
  document.getElementById("budget-nombre").value = "";
  document.getElementById("budget-precio").value = "";
  renderBudget();
});

document.getElementById("budget-clear").addEventListener("click", () => { componentes = []; renderBudget(); });

function renderBudget() {
  const emptyEl = document.getElementById("budget-empty");
  const contentEl = document.getElementById("budget-content");
  if (componentes.length === 0) { emptyEl.style.display = "block"; contentEl.style.display = "none"; return; }
  emptyEl.style.display = "none";
  contentEl.style.display = "block";
  let html = "<thead><tr><th>#</th><th>Tipo</th><th>Componente</th><th>Precio (USD)</th><th></th></tr></thead><tbody>";
  componentes.forEach((c, i) => {
    html += `<tr><td>${i + 1}</td><td>${c.tipo}</td><td style="font-weight:600;">${c.nombre}</td><td class="price-cell">$${c.precio.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td><td><button class="btn-del" data-idx="${i}" title="Eliminar">🗑️</button></td></tr>`;
  });
  html += "</tbody>";
  document.getElementById("budget-table").innerHTML = html;
  document.querySelectorAll(".btn-del").forEach(btn => {
    btn.addEventListener("click", () => { componentes.splice(parseInt(btn.dataset.idx), 1); renderBudget(); });
  });
  const total = componentes.reduce((sum, c) => sum + c.precio, 0);
  document.getElementById("budget-total-value").textContent = `$${total.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD`;
  document.getElementById("budget-count").textContent = `${componentes.length} componente(s)`;
  const maxComp = componentes.reduce((max, c) => c.precio > max.precio ? c : max, componentes[0]);
  document.getElementById("budget-max-name").textContent = maxComp.nombre;
  document.getElementById("budget-max-price").textContent = `$${maxComp.precio.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
  document.getElementById("budget-avg").textContent = `$${(total / componentes.length).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
  renderBudgetChart();
}

function renderBudgetChart() {
  destroyChart("budget-chart");
  const ctx = document.getElementById("budget-chart");
  const grouped = {};
  componentes.forEach(c => { grouped[c.tipo] = (grouped[c.tipo] || 0) + c.precio; });
  const colors = [LIME, LIME_D, "#7a8c1a", "#5f6e14", "#46520f", "#2e370a"];
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: Object.keys(grouped),
      datasets: [{ data: Object.values(grouped), backgroundColor: Object.keys(grouped).map((_, i) => colors[i % colors.length]), borderColor: PANEL, borderWidth: 2 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: "45%",
      plugins: { legend: { position: "bottom", labels: { color: WHITE, font: { size: 11 } } }, tooltip: { backgroundColor: PANEL, titleColor: WHITE, bodyColor: WHITE } }
    }
  });
}

// ════════════════════════════════════════════════════════════════════════════
// SECCIÓN — VIDA ÚTIL
// ════════════════════════════════════════════════════════════════════════════
function renderLifeCards() {
  const cpuContainer = document.getElementById("life-cpu-cards");
  const gpuContainer = document.getElementById("life-gpu-cards");
  cpuContainer.innerHTML = "";
  PROCESADORES.forEach(cpu => {
    const pct = Math.min(cpu.vida_anos / 7 * 100, 100);
    cpuContainer.innerHTML += `<div class="life-card"><h3>${cpu.nombre}</h3><p class="life-desc">Vida útil estimada: <b>${cpu.vida_anos} años</b></p><div class="life-bar-bg"><div class="life-bar-fill" style="width:${pct}%;"></div></div><div style="margin-top:10px;">${renderUso(cpu.uso)}</div></div>`;
  });
  gpuContainer.innerHTML = "";
  GRAFICAS.forEach(gpu => {
    const pct = Math.min(gpu.vida_anos / 7 * 100, 100);
    gpuContainer.innerHTML += `<div class="life-card"><h3>${gpu.nombre}</h3><p class="life-desc">Vida útil estimada: <b>${gpu.vida_anos} años</b></p><div class="life-bar-bg"><div class="life-bar-fill" style="width:${pct}%;"></div></div><div style="margin-top:10px;">${renderUso(gpu.uso)}</div></div>`;
  });
}

// ════════════════════════════════════════════════════════════════════════════
// INICIALIZACIÓN
// ════════════════════════════════════════════════════════════════════════════
renderCPUs();
renderGPUs();
renderRAMs();
populateVersusSelects();
renderRanking();
renderBudget();
renderLifeCards();
