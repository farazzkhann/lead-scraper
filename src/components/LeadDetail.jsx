import { useState } from "react";
import {
  X,
  Mail,
  Phone,
  Globe,
  MapPin,
  Users,
  DollarSign,
  Link2,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";
import Avatar from "./Avatar";
import StatusBadge from "./StatusBadge";
import ScoreBar from "./ScoreBar";

function DetailCopyField({ value }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 group text-left w-full"
    >
      <span className="text-sm text-white font-medium truncate group-hover:text-blue-300 transition-colors">
        {value}
      </span>
      {copied ? (
        <Check size={12} className="text-green-400 flex-shrink-0" />
      ) : (
        <Copy
          size={12}
          className="text-slate-600 group-hover:text-slate-400 flex-shrink-0 transition-colors"
        />
      )}
    </button>
  );
}

export default function LeadDetail({ lead, onClose }) {
  return (
    <tr>
      <td colSpan={8} className="px-4 pb-3 pt-0">
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <Avatar name={lead.name} />
              <div>
                <p className="font-semibold text-white">{lead.name}</p>
                <p className="text-sm text-slate-400">
                  {lead.title} · {lead.company}
                </p>
              </div>
              <StatusBadge status={lead.status} />
            </div>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-white transition-colors w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-700"
            >
              <X size={16} />
            </button>
          </div>

          {/* Score */}
          <div className="mb-5 bg-slate-900/60 rounded-xl px-4 py-3">
            <p className="text-xs text-slate-500 mb-2 font-medium">
              Lead score
            </p>
            <ScoreBar score={lead.score} />
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              {
                icon: <Mail size={13} />,
                label: "Email",
                value: lead.email,
                copy: true,
              },
              {
                icon: <Phone size={13} />,
                label: "Phone",
                value: lead.phone,
                copy: true,
              },
              {
                icon: <Globe size={13} />,
                label: "Website",
                value: lead.website,
                copy: false,
              },
              {
                icon: <MapPin size={13} />,
                label: "Location",
                value: lead.location,
                copy: false,
              },
              {
                icon: <Users size={13} />,
                label: "Employees",
                value: lead.employees,
                copy: false,
              },
              {
                icon: <DollarSign size={13} />,
                label: "Est. Revenue",
                value: lead.revenue,
                copy: false,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-slate-900/60 rounded-xl px-3.5 py-3 border border-slate-700/40"
              >
                <p className="text-xs text-slate-500 mb-1 flex items-center gap-1.5">
                  {item.icon} {item.label}
                </p>
                {item.copy && item.value ? (
                  <DetailCopyField value={item.value} />
                ) : (
                  <p className="text-sm text-white font-medium truncate">
                    {item.value || "—"}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Tags */}
          {lead.tags?.length > 0 && (
            <div className="flex gap-2 mb-4 flex-wrap">
              {lead.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-slate-900/60 text-slate-400 border border-slate-700/40 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* LinkedIn */}
          {lead.linkedin && (
            <div className="mb-4">
              <a
                href={lead.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5"
              >
                <Link2 size={14} /> View LinkedIn Profile
              </a>
            </div>
          )}

          {/* AI Insight */}
          <div className="bg-green-950/30 border border-green-800/30 rounded-xl px-4 py-3">
            <p className="text-xs text-green-500 font-semibold mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles size={12} /> AI Insight
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              {lead.notes}
            </p>
          </div>
        </div>
      </td>
    </tr>
  );
}
