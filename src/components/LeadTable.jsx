import { useState } from "react";
import { Copy, Check, Trash2, Download, ChevronDown } from "lucide-react";
import Avatar from "./Avatar";
import ScoreBar from "./ScoreBar";
import StatusBadge from "./StatusBadge";
import LeadDetail from "./LeadDetail";

function CopyField({ value }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 group text-left"
    >
      <span className="text-xs text-blue-400 group-hover:text-blue-300 transition-colors">
        {value}
      </span>
      {copied ? (
        <Check size={11} className="text-green-400" />
      ) : (
        <Copy
          size={11}
          className="text-slate-600 group-hover:text-slate-400 transition-colors"
        />
      )}
    </button>
  );
}

function LeadRow({
  lead,
  isSelected,
  onSelect,
  onExpand,
  isExpanded,
  onDelete,
}) {
  return (
    <>
      <tr
        onClick={() => onExpand(lead)}
        className={`border-b border-slate-800/60 hover:bg-slate-800/40 transition-all cursor-pointer ${isExpanded ? "bg-slate-800/40" : ""}`}
      >
        <td
          className="px-4 py-3.5"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(lead.id);
          }}
        >
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => {}}
            className="cursor-pointer accent-green-500"
          />
        </td>
        <td className="px-4 py-3.5">
          <div className="flex items-center gap-3">
            <Avatar name={lead.name} />
            <div>
              <p className="font-medium text-white text-sm">{lead.name}</p>
              <p className="text-xs text-slate-500">{lead.title}</p>
            </div>
          </div>
        </td>
        <td className="px-4 py-3.5">
          <p className="text-sm text-white">{lead.company}</p>
          <p className="text-xs text-slate-500">{lead.location}</p>
        </td>
        <td className="px-4 py-3.5">
          <CopyField value={lead.email} />
        </td>
        <td className="px-4 py-3.5 w-36">
          <ScoreBar score={lead.score} />
        </td>
        <td className="px-4 py-3.5">
          <StatusBadge status={lead.status} />
        </td>
        <td className="px-4 py-3.5">
          <div className="flex gap-1.5 flex-wrap">
            {(lead.tags || []).map((t) => (
              <span
                key={t}
                className="text-xs bg-slate-800 text-slate-400 border border-slate-700/60 px-2 py-0.5 rounded-md"
              >
                {t}
              </span>
            ))}
          </div>
        </td>
        <td className="px-4 py-3.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(lead.id);
            }}
            className="text-slate-600 hover:text-red-400 transition-colors p-1 rounded-lg hover:bg-red-950/40"
            title="Delete lead"
          >
            <Trash2 size={14} />
          </button>
        </td>
      </tr>
      {isExpanded && <LeadDetail lead={lead} onClose={() => onExpand(null)} />}
    </>
  );
}

export default function LeadTable({
  leads,
  onExport,
  onDelete,
  onDeleteSelected,
}) {
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [expandedId, setExpandedId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("score");

  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    setSelectedIds((prev) =>
      prev.size === leads.length ? new Set() : new Set(leads.map((l) => l.id)),
    );
  };

  const handleExpand = (lead) => {
    setExpandedId((prev) => (prev === lead?.id ? null : lead?.id));
  };

  const filteredLeads = leads
    .filter((l) => filterStatus === "all" || l.status === filterStatus)
    .sort((a, b) =>
      sortBy === "score" ? b.score - a.score : a.name.localeCompare(b.name),
    );

  const selectedLeads = leads.filter((l) => selectedIds.has(l.id));

  return (
    <div className="bg-slate-900/80 border border-slate-800/60 rounded-2xl overflow-hidden backdrop-blur-sm">
      {/* Table Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-slate-800/60">
        <div className="flex items-center gap-2 flex-wrap">
          {["all", "hot", "warm", "cold"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`text-xs px-3 py-1.5 rounded-lg capitalize transition-all ${
                filterStatus === status
                  ? "bg-green-600 text-white font-medium"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {status === "all" ? `All (${leads.length})` : status}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Sort by</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-800 border border-slate-700/60 text-white text-xs rounded-lg px-2.5 py-1.5 focus:outline-none flex items-center gap-1"
            >
              <option value="score">Score</option>
              <option value="name">Name</option>
            </select>
          </div>
          <button
            onClick={() =>
              onExport(selectedLeads.length > 0 ? selectedLeads : leads)
            }
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/60 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5"
          >
            <Download size={12} /> Export CSV
          </button>
        </div>
      </div>

      {/* Selection Bar */}
      {selectedIds.size > 0 && (
        <div className="flex items-center justify-between px-5 py-2.5 bg-green-950/40 border-b border-green-900/40">
          <p className="text-xs text-green-400 font-medium">
            {selectedIds.size} lead{selectedIds.size > 1 ? "s" : ""} selected
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onExport(selectedLeads)}
              className="text-xs bg-green-700 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Download size={12} /> Export Selected
            </button>
            <button
              onClick={() => {
                onDeleteSelected(selectedIds);
                setSelectedIds(new Set());
              }}
              className="text-xs bg-red-900/60 hover:bg-red-800 text-red-400 border border-red-800/60 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Trash2 size={12} /> Delete Selected
            </button>
            <button
              onClick={() => setSelectedIds(new Set())}
              className="text-xs text-slate-400 hover:text-white px-2 py-1.5"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-800/60 text-xs text-slate-500 uppercase tracking-wider bg-slate-900/40">
              <th className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={
                    selectedIds.size === leads.length && leads.length > 0
                  }
                  onChange={toggleSelectAll}
                  className="cursor-pointer accent-green-500"
                />
              </th>
              <th className="text-left px-4 py-3">Person</th>
              <th className="text-left px-4 py-3">Company</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Score</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Tags</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <LeadRow
                key={lead.id}
                lead={lead}
                isSelected={selectedIds.has(lead.id)}
                onSelect={toggleSelect}
                onExpand={handleExpand}
                isExpanded={expandedId === lead.id}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-slate-800/60 flex items-center justify-between">
        <p className="text-xs text-slate-600">
          Showing {filteredLeads.length} of {leads.length} leads
        </p>
        <p className="text-xs text-slate-600 flex items-center gap-1">
          <ChevronDown size={11} /> Click any row to view full details
        </p>
      </div>
    </div>
  );
}
