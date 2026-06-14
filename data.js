// ════════════════════════════════════════════════════════════════════════════
// DATOS — Componentes, rankings y opciones de presupuesto
// ════════════════════════════════════════════════════════════════════════════

const PROCESADORES = [
  // Intel Arrow Lake (Core Ultra 200S - LGA1851)
  { nombre: "Intel Core Ultra 9 285K", nucleos: 24, hilos: 24, tdp: 125, precio: 589, gen: "Core Ultra 200S", socket: "LGA1851", score: 99, vida_anos: 6, uso: { "4K": "good", "1440p": "good", "1080p": "good", "Oficina": "good" } },
  { nombre: "Intel Core Ultra 7 265K", nucleos: 20, hilos: 20, tdp: 125, precio: 394, gen: "Core Ultra 200S", socket: "LGA1851", score: 90, vida_anos: 6, uso: { "4K": "good", "1440p": "good", "1080p": "good", "Oficina": "good" } },
  { nombre: "Intel Core Ultra 5 245K", nucleos: 14, hilos: 14, tdp: 125, precio: 309, gen: "Core Ultra 200S", socket: "LGA1851", score: 80, vida_anos: 5, uso: { "4K": "mid", "1440p": "good", "1080p": "good", "Oficina": "good" } },

  // AMD Ryzen 9000 (Zen 5 - AM5)
  { nombre: "AMD Ryzen 9 9950X3D", nucleos: 16, hilos: 32, tdp: 170, precio: 699, gen: "Zen 5 (X3D)", socket: "AM5", score: 100, vida_anos: 7, uso: { "4K": "good", "1440p": "good", "1080p": "good", "Oficina": "good" } },
  { nombre: "AMD Ryzen 9 9900X3D", nucleos: 12, hilos: 24, tdp: 120, precio: 599, gen: "Zen 5 (X3D)", socket: "AM5", score: 97, vida_anos: 7, uso: { "4K": "good", "1440p": "good", "1080p": "good", "Oficina": "good" } },
  { nombre: "AMD Ryzen 7 9850X3D", nucleos: 8, hilos: 16, tdp: 120, precio: 499, gen: "Zen 5 (X3D)", socket: "AM5", score: 96, vida_anos: 6, uso: { "4K": "good", "1440p": "good", "1080p": "good", "Oficina": "good" } },
  { nombre: "AMD Ryzen 7 9800X3D", nucleos: 8, hilos: 16, tdp: 120, precio: 479, gen: "Zen 5 (X3D)", socket: "AM5", score: 95, vida_anos: 6, uso: { "4K": "good", "1440p": "good", "1080p": "good", "Oficina": "good" } },
  { nombre: "AMD Ryzen 9 9950X", nucleos: 16, hilos: 32, tdp: 170, precio: 649, gen: "Zen 5", socket: "AM5", score: 98, vida_anos: 6, uso: { "4K": "good", "1440p": "good", "1080p": "good", "Oficina": "good" } },
  { nombre: "AMD Ryzen 9 9900X", nucleos: 12, hilos: 24, tdp: 120, precio: 449, gen: "Zen 5", socket: "AM5", score: 93, vida_anos: 6, uso: { "4K": "good", "1440p": "good", "1080p": "good", "Oficina": "good" } },
  { nombre: "AMD Ryzen 7 9700X", nucleos: 8, hilos: 16, tdp: 65, precio: 359, gen: "Zen 5", socket: "AM5", score: 86, vida_anos: 5, uso: { "4K": "good", "1440p": "good", "1080p": "good", "Oficina": "good" } },
  { nombre: "AMD Ryzen 5 9600X", nucleos: 6, hilos: 12, tdp: 65, precio: 279, gen: "Zen 5", socket: "AM5", score: 76, vida_anos: 4, uso: { "4K": "mid", "1440p": "good", "1080p": "good", "Oficina": "good" } },

  // Intel 14ª / 13ª Gen (LGA1700)
  { nombre: "Intel Core i9-14900K", nucleos: 24, hilos: 32, tdp: 125, precio: 589, gen: "14ª Gen", socket: "LGA1700", score: 98, vida_anos: 5, uso: { "4K": "good", "1440p": "good", "1080p": "good", "Oficina": "good" } },
  { nombre: "Intel Core i7-14700K", nucleos: 20, hilos: 28, tdp: 125, precio: 399, gen: "14ª Gen", socket: "LGA1700", score: 89, vida_anos: 5, uso: { "4K": "good", "1440p": "good", "1080p": "good", "Oficina": "good" } },
  { nombre: "Intel Core i5-14600K", nucleos: 14, hilos: 20, tdp: 125, precio: 289, gen: "14ª Gen", socket: "LGA1700", score: 78, vida_anos: 4, uso: { "4K": "mid", "1440p": "good", "1080p": "good", "Oficina": "good" } },
  { nombre: "Intel Core i9-13900K", nucleos: 24, hilos: 32, tdp: 125, precio: 589, gen: "13ª Gen", socket: "LGA1700", score: 96, vida_anos: 5, uso: { "4K": "good", "1440p": "good", "1080p": "good", "Oficina": "good" } },
  { nombre: "Intel Core i7-13700K", nucleos: 16, hilos: 24, tdp: 125, precio: 409, gen: "13ª Gen", socket: "LGA1700", score: 87, vida_anos: 5, uso: { "4K": "good", "1440p": "good", "1080p": "good", "Oficina": "good" } },
  { nombre: "Intel Core i5-13600K", nucleos: 14, hilos: 20, tdp: 125, precio: 319, gen: "13ª Gen", socket: "LGA1700", score: 76, vida_anos: 4, uso: { "4K": "mid", "1440p": "good", "1080p": "good", "Oficina": "good" } },

  // AMD Ryzen 7000 (Zen 4 - AM5)
  { nombre: "AMD Ryzen 9 7950X3D", nucleos: 16, hilos: 32, tdp: 120, precio: 599, gen: "Zen 4 (X3D)", socket: "AM5", score: 96, vida_anos: 6, uso: { "4K": "good", "1440p": "good", "1080p": "good", "Oficina": "good" } },
  { nombre: "AMD Ryzen 7 7800X3D", nucleos: 8, hilos: 16, tdp: 120, precio: 449, gen: "Zen 4 (X3D)", socket: "AM5", score: 92, vida_anos: 6, uso: { "4K": "good", "1440p": "good", "1080p": "good", "Oficina": "good" } },
  { nombre: "AMD Ryzen 9 7950X", nucleos: 16, hilos: 32, tdp: 170, precio: 549, gen: "Zen 4", socket: "AM5", score: 95, vida_anos: 6, uso: { "4K": "good", "1440p": "good", "1080p": "good", "Oficina": "good" } },
  { nombre: "AMD Ryzen 9 7900X", nucleos: 12, hilos: 24, tdp: 170, precio: 429, gen: "Zen 4", socket: "AM5", score: 90, vida_anos: 5, uso: { "4K": "good", "1440p": "good", "1080p": "good", "Oficina": "good" } },
  { nombre: "AMD Ryzen 7 7700X", nucleos: 8, hilos: 16, tdp: 105, precio: 299, gen: "Zen 4", socket: "AM5", score: 82, vida_anos: 5, uso: { "4K": "mid", "1440p": "good", "1080p": "good", "Oficina": "good" } },
  { nombre: "AMD Ryzen 5 7600X", nucleos: 6, hilos: 12, tdp: 105, precio: 199, gen: "Zen 4", socket: "AM5", score: 71, vida_anos: 4, uso: { "4K": "bad", "1440p": "mid", "1080p": "good", "Oficina": "good" } },
  { nombre: "AMD Ryzen 5 7500F", nucleos: 6, hilos: 12, tdp: 65, precio: 129, gen: "Zen 4", socket: "AM5", score: 65, vida_anos: 3, uso: { "4K": "bad", "1440p": "mid", "1080p": "good", "Oficina": "good" } },

  // Gama media / entrada
  { nombre: "Intel Core i5-14400F", nucleos: 10, hilos: 16, tdp: 65, precio: 179, gen: "14ª Gen", socket: "LGA1700", score: 68, vida_anos: 3, uso: { "4K": "bad", "1440p": "mid", "1080p": "good", "Oficina": "good" } },
  { nombre: "Intel Core i3-14100F", nucleos: 4, hilos: 8, tdp: 58, precio: 99, gen: "14ª Gen", socket: "LGA1700", score: 48, vida_anos: 3, uso: { "4K": "bad", "1440p": "bad", "1080p": "mid", "Oficina": "good" } },
  { nombre: "AMD Ryzen 5 5600", nucleos: 6, hilos: 12, tdp: 65, precio: 109, gen: "Zen 3", socket: "AM4", score: 58, vida_anos: 2, uso: { "4K": "bad", "1440p": "bad", "1080p": "mid", "Oficina": "good" } },
];

const GRAFICAS = [
  // NVIDIA RTX 50 (Blackwell)
  { nombre: "NVIDIA RTX 5090", vram: 32, tdp: 575, precio: 1999, marca: "NVIDIA", score: 100, vida_anos: 7, uso: { "4K": "good", "1440p": "good", "1080p": "good", "Oficina": "good" } },
  { nombre: "NVIDIA RTX 5080", vram: 16, tdp: 360, precio: 999, marca: "NVIDIA", score: 92, vida_anos: 6, uso: { "4K": "good", "1440p": "good", "1080p": "good", "Oficina": "good" } },
  { nombre: "NVIDIA RTX 5070 Ti", vram: 16, tdp: 300, precio: 749, marca: "NVIDIA", score: 87, vida_anos: 6, uso: { "4K": "good", "1440p": "good", "1080p": "good", "Oficina": "good" } },
  { nombre: "NVIDIA RTX 5070", vram: 12, tdp: 250, precio: 549, marca: "NVIDIA", score: 80, vida_anos: 5, uso: { "4K": "mid", "1440p": "good", "1080p": "good", "Oficina": "good" } },
  { nombre: "NVIDIA RTX 5060 Ti", vram: 16, tdp: 180, precio: 429, marca: "NVIDIA", score: 72, vida_anos: 5, uso: { "4K": "mid", "1440p": "good", "1080p": "good", "Oficina": "good" } },
  { nombre: "NVIDIA RTX 5060", vram: 8, tdp: 145, precio: 299, marca: "NVIDIA", score: 63, vida_anos: 4, uso: { "4K": "bad", "1440p": "mid", "1080p": "good", "Oficina": "good" } },

  // AMD Radeon RX 9000 (RDNA 4)
  { nombre: "AMD RX 9070 XT", vram: 16, tdp: 304, precio: 599, marca: "AMD", score: 85, vida_anos: 5, uso: { "4K": "good", "1440p": "good", "1080p": "good", "Oficina": "good" } },
  { nombre: "AMD RX 9070", vram: 16, tdp: 220, precio: 549, marca: "AMD", score: 80, vida_anos: 5, uso: { "4K": "good", "1440p": "good", "1080p": "good", "Oficina": "good" } },
  { nombre: "AMD RX 9060 XT", vram: 16, tdp: 160, precio: 349, marca: "AMD", score: 67, vida_anos: 4, uso: { "4K": "mid", "1440p": "good", "1080p": "good", "Oficina": "good" } },

  // NVIDIA RTX 40 (Ada)
  { nombre: "NVIDIA RTX 4090", vram: 24, tdp: 450, precio: 1599, marca: "NVIDIA", score: 98, vida_anos: 6, uso: { "4K": "good", "1440p": "good", "1080p": "good", "Oficina": "good" } },
  { nombre: "NVIDIA RTX 4080 Super", vram: 16, tdp: 320, precio: 999, marca: "NVIDIA", score: 88, vida_anos: 5, uso: { "4K": "good", "1440p": "good", "1080p": "good", "Oficina": "good" } },
  { nombre: "NVIDIA RTX 4070 Ti Super", vram: 16, tdp: 285, precio: 799, marca: "NVIDIA", score: 83, vida_anos: 5, uso: { "4K": "good", "1440p": "good", "1080p": "good", "Oficina": "good" } },
  { nombre: "NVIDIA RTX 4070 Ti", vram: 12, tdp: 285, precio: 699, marca: "NVIDIA", score: 78, vida_anos: 4, uso: { "4K": "mid", "1440p": "good", "1080p": "good", "Oficina": "good" } },
  { nombre: "NVIDIA RTX 4070 Super", vram: 12, tdp: 220, precio: 599, marca: "NVIDIA", score: 76, vida_anos: 4, uso: { "4K": "mid", "1440p": "good", "1080p": "good", "Oficina": "good" } },
  { nombre: "NVIDIA RTX 4070", vram: 12, tdp: 200, precio: 549, marca: "NVIDIA", score: 72, vida_anos: 4, uso: { "4K": "mid", "1440p": "good", "1080p": "good", "Oficina": "good" } },
  { nombre: "NVIDIA RTX 4060 Ti", vram: 8, tdp: 165, precio: 399, marca: "NVIDIA", score: 62, vida_anos: 3, uso: { "4K": "bad", "1440p": "mid", "1080p": "good", "Oficina": "good" } },
  { nombre: "NVIDIA RTX 4060", vram: 8, tdp: 115, precio: 299, marca: "NVIDIA", score: 55, vida_anos: 3, uso: { "4K": "bad", "1440p": "mid", "1080p": "good", "Oficina": "good" } },

  // AMD Radeon RX 7000 (RDNA 3)
  { nombre: "AMD RX 7900 XTX", vram: 24, tdp: 355, precio: 899, marca: "AMD", score: 84, vida_anos: 5, uso: { "4K": "good", "1440p": "good", "1080p": "good", "Oficina": "good" } },
  { nombre: "AMD RX 7900 XT", vram: 20, tdp: 315, precio: 749, marca: "AMD", score: 80, vida_anos: 5, uso: { "4K": "good", "1440p": "good", "1080p": "good", "Oficina": "good" } },
  { nombre: "AMD RX 7800 XT", vram: 16, tdp: 263, precio: 449, marca: "AMD", score: 68, vida_anos: 4, uso: { "4K": "mid", "1440p": "good", "1080p": "good", "Oficina": "good" } },
  { nombre: "AMD RX 7700 XT", vram: 12, tdp: 245, precio: 379, marca: "AMD", score: 64, vida_anos: 4, uso: { "4K": "mid", "1440p": "good", "1080p": "good", "Oficina": "good" } },
  { nombre: "AMD RX 7600", vram: 8, tdp: 165, precio: 269, marca: "AMD", score: 52, vida_anos: 3, uso: { "4K": "bad", "1440p": "mid", "1080p": "good", "Oficina": "good" } },
];

const RAMS = [
  { nombre: "Corsair Vengeance RGB 32GB (2x16) DDR5-6000", tipo: "DDR5", capacidad: 32, velocidad: 6000, latencia: "CL30", precio: 109, score: 88, vida_anos: 6 },
  { nombre: "Corsair Vengeance RGB 64GB (2x32) DDR5-6000", tipo: "DDR5", capacidad: 64, velocidad: 6000, latencia: "CL30", precio: 219, score: 92, vida_anos: 6 },
  { nombre: "G.Skill Trident Z5 RGB 32GB (2x16) DDR5-6400", tipo: "DDR5", capacidad: 32, velocidad: 6400, latencia: "CL32", precio: 129, score: 90, vida_anos: 6 },
  { nombre: "G.Skill Trident Z5 Neo 32GB (2x16) DDR5-6000 (AMD EXPO)", tipo: "DDR5", capacidad: 32, velocidad: 6000, latencia: "CL30", precio: 119, score: 89, vida_anos: 6 },
  { nombre: "Kingston Fury Beast 32GB (2x16) DDR5-5600", tipo: "DDR5", capacidad: 32, velocidad: 5600, latencia: "CL36", precio: 99, score: 82, vida_anos: 5 },
  { nombre: "Kingston Fury Beast 16GB (2x8) DDR5-5200", tipo: "DDR5", capacidad: 16, velocidad: 5200, latencia: "CL40", precio: 59, score: 70, vida_anos: 4 },
  { nombre: "Corsair Dominator Titanium 96GB (2x48) DDR5-6600", tipo: "DDR5", capacidad: 96, velocidad: 6600, latencia: "CL32", precio: 349, score: 97, vida_anos: 7 },
  { nombre: "G.Skill Trident Z5 RGB 64GB (2x32) DDR5-6000", tipo: "DDR5", capacidad: 64, velocidad: 6000, latencia: "CL30", precio: 209, score: 91, vida_anos: 6 },
  { nombre: "Crucial Pro 32GB (2x16) DDR5-5600", tipo: "DDR5", capacidad: 32, velocidad: 5600, latencia: "CL46", precio: 89, score: 79, vida_anos: 5 },
  { nombre: "Corsair Vengeance LPX 32GB (2x16) DDR4-3600", tipo: "DDR4", capacidad: 32, velocidad: 3600, latencia: "CL18", precio: 75, score: 65, vida_anos: 3 },
  { nombre: "G.Skill Ripjaws V 16GB (2x8) DDR4-3200", tipo: "DDR4", capacidad: 16, velocidad: 3200, latencia: "CL16", precio: 45, score: 55, vida_anos: 3 },
  { nombre: "Kingston Fury Beast 32GB (2x16) DDR4-3200", tipo: "DDR4", capacidad: 32, velocidad: 3200, latencia: "CL16", precio: 69, score: 58, vida_anos: 3 },
];

const RANKINGS_PC = [
  { nombre: "PC Ultimate 4K / Workstation", cpu: "Ryzen 9 9950X3D", gpu: "RTX 5090", ram: 64, precio: 5500, score: 100 },
  { nombre: "PC Ultimate 4K", cpu: "i9-14900K", gpu: "RTX 4090", ram: 64, precio: 4500, score: 99 },
  { nombre: "PC Gaming Enthusiast", cpu: "Core Ultra 9 285K", gpu: "RTX 5080", ram: 32, precio: 3200, score: 96 },
  { nombre: "PC Workstation Pro", cpu: "Ryzen 9 7950X", gpu: "RTX 4080 Super", ram: 64, precio: 3800, score: 94 },
  { nombre: "PC Gaming High-End", cpu: "Ryzen 7 9800X3D", gpu: "RTX 5070 Ti", ram: 32, precio: 2400, score: 90 },
  { nombre: "PC Gaming High-End (Intel)", cpu: "i7-14700K", gpu: "RTX 4070 Ti", ram: 32, precio: 2500, score: 85 },
  { nombre: "PC Gaming Mid-Range Plus", cpu: "Ryzen 7 9700X", gpu: "RX 9070 XT", ram: 32, precio: 2000, score: 83 },
  { nombre: "PC Gaming Mid-Range", cpu: "Ryzen 7 7700X", gpu: "RX 7800 XT", ram: 32, precio: 1800, score: 74 },
  { nombre: "PC Equilibrado", cpu: "i5-14600K", gpu: "RTX 4060 Ti", ram: 16, precio: 1200, score: 63 },
  { nombre: "PC Entrada 1080p", cpu: "Ryzen 5 9600X", gpu: "RX 9060 XT", ram: 16, precio: 1100, score: 67 },
  { nombre: "PC Gamer Básico", cpu: "Ryzen 5 7600X", gpu: "RX 7800 XT", ram: 16, precio: 950, score: 55 },
  { nombre: "PC Gamer Económico", cpu: "i3-14100F", gpu: "RTX 4060", ram: 16, precio: 750, score: 45 },
];

const PIEZAS_PRESUPUESTO = [
  "Procesador (CPU)",
  "Tarjeta Gráfica (GPU)",
  "Placa Madre (Motherboard)",
  "Memoria RAM",
  "Almacenamiento (SSD/HDD)",
  "Fuente de Poder (PSU)",
  "Gabinete (Case)",
  "Enfriamiento (Cooler)",
  "Monitor",
  "Teclado",
  "Mouse",
  "Otro",
];

const USE_LABEL = { good: "Recomendado", mid: "Aceptable", bad: "Limitado" };
const USE_CLASS = { good: "use-good", mid: "use-mid", bad: "use-bad" };
