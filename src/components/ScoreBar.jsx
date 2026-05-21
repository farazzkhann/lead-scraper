import { TrendingUp } from "lucide-react";

function scoreColor(score) {
  if (score >= 80) return "bg-red-500";
  if (score >= 60) return "bg-amber-500";
  if (score >= 40) return "bg-green-500";
  return "bg-slate-500";
}

function scoreLabel(score) {
  if (score >= 80) return "text-red-400";
  if (score >= 60) return "text-amber-400";
  if (score >= 40) return "text-green-400";
  return "text-slate-400";
}

export default function ScoreBar({ score }) {
  return (
    <div className="flex items-center gap-2">
      <TrendingUp size={12} className="text-slate-600 flex-shrink-0" />
      <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full ${scoreColor(score)} rounded-full transition-all duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className={`text-xs font-semibold w-6 ${scoreLabel(score)}`}>
        {score}
      </span>
    </div>
  );
}
