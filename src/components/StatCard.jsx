import { Users, Flame, Zap, BarChart2 } from "lucide-react";

const COLOR_MAP = {
  slate: {
    bg: "bg-slate-800/50",
    text: "text-slate-300",
    border: "border-slate-700/50",
    icon: <Users size={16} />,
  },
  red: {
    bg: "bg-red-950/50",
    text: "text-red-400",
    border: "border-red-800/50",
    icon: <Flame size={16} />,
  },
  yellow: {
    bg: "bg-yellow-950/50",
    text: "text-yellow-400",
    border: "border-yellow-800/50",
    icon: <Zap size={16} />,
  },
  green: {
    bg: "bg-green-950/50",
    text: "text-green-400",
    border: "border-green-800/50",
    icon: <BarChart2 size={16} />,
  },
};

export default function StatCard({ label, value, color = "slate" }) {
  const c = COLOR_MAP[color];
  return (
    <div className={`${c.bg} border ${c.border} rounded-xl p-4`}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
          {label}
        </p>
        <span className={c.text}>{c.icon}</span>
      </div>
      <p className={`text-2xl font-semibold ${c.text}`}>{value}</p>
    </div>
  );
}
