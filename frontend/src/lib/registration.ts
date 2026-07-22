import type { Registration, RegistrationInput } from "./schema";
import { DIVISIONS, CATEGORIES } from "./schema";

const KEY = "rally2026:registrations";

function loadAll(): Registration[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveRegistration(input: RegistrationInput): Registration {
  const all = loadAll();
  const seq = (all.length + 1).toString().padStart(4, "0");
  const div = DIVISIONS.find((d) => d.id === input.division)!;
  const reg: Registration = {
    ...input,
    id: `REG-2026-${seq}`,
    createdAt: new Date().toISOString(),
    fee: div.fee,
  };
  all.push(reg);
  localStorage.setItem(KEY, JSON.stringify(all));
  return reg;
}

export function generateReceipt(reg: Registration): string {
  const w = 640;
  const h = 900;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  const cream = "#fcfbf3";
  const navy = "#0f1f3d";
  const lime = "#b8d13a";

  ctx.fillStyle = cream;
  ctx.fillRect(0, 0, w, h);

  // Header band
  ctx.fillStyle = navy;
  ctx.fillRect(0, 0, w, 140);
  ctx.fillStyle = lime;
  ctx.fillRect(0, 140, w, 8);

  ctx.fillStyle = cream;
  ctx.font = "bold 42px 'Bebas Neue', Inter, sans-serif";
  ctx.fillText("RALLY TOGETHER 2026", 32, 70);
  ctx.font = "500 18px Inter, sans-serif";
  ctx.fillStyle = lime;
  ctx.fillText("Drive & Dink Pickleball Tournament", 32, 100);
  ctx.fillStyle = cream;
  ctx.font = "500 14px Inter, sans-serif";
  ctx.fillText("Official Registration Receipt", 32, 124);

  // Body
  ctx.fillStyle = navy;
  ctx.font = "700 16px Inter, sans-serif";
  let y = 190;
  const line = (label: string, value: string) => {
    ctx.fillStyle = "#6b7280";
    ctx.font = "500 12px Inter, sans-serif";
    ctx.fillText(label.toUpperCase(), 32, y);
    ctx.fillStyle = navy;
    ctx.font = "600 18px Inter, sans-serif";
    ctx.fillText(value, 32, y + 22);
    y += 54;
  };

  const div = DIVISIONS.find((d) => d.id === reg.division)!;
  const cat = CATEGORIES.find((c) => c.id === reg.category);
  line("Registration ID", reg.id);
  line("Date", new Date(reg.createdAt).toLocaleString("en-PH"));
  line("Division", `${div.label}${cat ? ` · ${cat.label}` : ""}`);
  line("Player 1", `${reg.player1.fullName} · ${reg.player1.shirtSize}`);
  if (reg.player2) {
    line("Player 2", `${reg.player2.fullName} · ${reg.player2.shirtSize}`);
  }
  line("GCash Reference", reg.gcashReference);

  // Total
  ctx.fillStyle = navy;
  ctx.fillRect(0, y + 8, w, 80);
  ctx.fillStyle = lime;
  ctx.font = "500 12px Inter, sans-serif";
  ctx.fillText("AMOUNT PAID", 32, y + 36);
  ctx.fillStyle = cream;
  ctx.font = "bold 32px 'Bebas Neue', Inter, sans-serif";
  ctx.fillText(`₱ ${reg.fee.toLocaleString("en-PH")}.00`, 32, y + 72);

  // Footer
  ctx.fillStyle = "#6b7280";
  ctx.font = "400 12px Inter, sans-serif";
  ctx.fillText("Present this receipt at tournament check-in.", 32, h - 40);
  ctx.fillText("rallytogether2026@example.com", 32, h - 20);

  return canvas.toDataURL("image/png");
}