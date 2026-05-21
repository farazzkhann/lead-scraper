import { Flame, Zap, Snowflake } from "lucide-react";

const STYLES = {
  hot: "bg-red-950/80 text-red-400 border-red-800/60",
  warm: "bg-amber-950/80 text-amber-400 border-amber-800/60",
  cold: "bg-blue-950/80 text-blue-400 border-blue-800/60",
};

const ICONS = {
  hot: <Flame size={11} />,
  warm: <Zap size={11} />,
  cold: <Snowflake size={11} />,
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`text-xs px-2.5 py-1 rounded-full border capitalize flex items-center gap-1 w-fit ${STYLES[status] || STYLES.cold}`}
    >
      {ICONS[status]} {status}
    </span>
  );
}
