function initials(name = "") {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

const COLORS = [
  "bg-blue-900/80 text-blue-300",
  "bg-purple-900/80 text-purple-300",
  "bg-emerald-900/80 text-emerald-300",
  "bg-amber-900/80 text-amber-300",
  "bg-pink-900/80 text-pink-300",
  "bg-cyan-900/80 text-cyan-300",
];

export default function Avatar({ name }) {
  const color = COLORS[name.charCodeAt(0) % COLORS.length];
  return (
    <div
      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${color}`}
    >
      {initials(name)}
    </div>
  );
}
