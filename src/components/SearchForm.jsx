import { useState } from "react";
import {
  Search,
  MapPin,
  Building2,
  Users,
  Tag,
  Loader2,
  Zap,
} from "lucide-react";
import { INDUSTRIES, ROLES, SIZES, LEAD_COUNTS } from "../constants";

export default function SearchForm({ onSearch, loading }) {
  const [industry, setIndustry] = useState("SaaS / Tech");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("CEO / Founder");
  const [size, setSize] = useState("11–50");
  const [keywords, setKeywords] = useState("");
  const [count, setCount] = useState(10);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location.trim()) return;
    onSearch({ industry, location, role, size, keywords, count });
  };

  const inputClass = `
    w-full bg-slate-900 border border-slate-700/60 text-white text-sm
    rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-green-500/60
    focus:bg-slate-800/80 transition-all placeholder-slate-600
  `;
  const labelClass =
    "flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-1.5";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-900/80 border border-slate-800/60 rounded-2xl p-6 mb-6 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
          Search Filters
        </h2>
        <span className="text-xs text-slate-600">* Location is required</span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className={labelClass}>
            <Building2 size={12} /> Industry
          </label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className={inputClass}
          >
            {INDUSTRIES.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>
            <MapPin size={12} /> Location{" "}
            <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. New York, USA"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>
            <Users size={12} /> Target role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={inputClass}
          >
            {ROLES.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>
            <Users size={12} /> Company size
          </label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className={inputClass}
          >
            {SIZES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-5">
        <label className={labelClass}>
          <Tag size={12} /> Keywords / niche
          <span className="text-slate-600 font-normal ml-1">(optional)</span>
        </label>
        <input
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="e.g. Series A startups, Shopify ecosystem..."
          className={inputClass}
        />
      </div>

      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-3">
          <label className={labelClass}>
            <Search size={12} /> Leads to generate
          </label>
          <select
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="bg-slate-800 border border-slate-700/60 text-white text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-green-500/60"
          >
            {LEAD_COUNTS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading || !location.trim()}
          className="bg-green-600 hover:bg-green-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-8 py-2.5 rounded-xl transition-all flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Finding...
            </>
          ) : (
            <>
              <Zap size={14} />
              Find Leads
            </>
          )}
        </button>
      </div>
    </form>
  );
}
