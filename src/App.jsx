import { Trash2, Radio } from "lucide-react";
import { useLeads } from "./hooks/useLeads";
import { exportToCSV } from "./utils/exportCSV";
import SearchForm from "./components/SearchForm";
import LeadTable from "./components/LeadTable";
import StatCard from "./components/StatCard";

export default function App() {
  const {
    leads,
    loading,
    error,
    searchLeads,
    clearLeads,
    deleteLead,
    deleteSelected,
  } = useLeads();

  const hotLeads = leads.filter((l) => l.status === "hot").length;
  const warmLeads = leads.filter((l) => l.status === "warm").length;
  const avgScore = leads.length
    ? Math.round(leads.reduce((a, b) => a + b.score, 0) / leads.length)
    : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="border-b border-slate-800/60 px-8 py-4 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-black font-bold text-sm">
              L
            </div>
            <div>
              <h1 className="text-base font-semibold text-white leading-none">
                LeadScraper
              </h1>
              <p className="text-slate-500 text-xs mt-0.5">
                AI-powered B2B prospect finder
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {leads.length > 0 && (
              <>
                <span className="text-xs text-slate-400">
                  {leads.length} leads saved
                </span>
                <button
                  onClick={clearLeads}
                  className="text-xs text-red-400 hover:text-red-300 border border-red-800/60 hover:bg-red-950/40 px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5"
                >
                  <Trash2 size={11} /> Clear all
                </button>
              </>
            )}
            <span className="text-xs text-green-400 border border-green-800/60 bg-green-950/50 px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <Radio size={11} className="animate-pulse" />
              Groq AI
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-8">
        <SearchForm onSearch={searchLeads} loading={loading} />

        {/* Error */}
        {error && (
          <div className="bg-red-950/50 border border-red-800/60 text-red-400 text-sm px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
            ⚠️ {error}
          </div>
        )}

        {/* Stats */}
        {leads.length > 0 && (
          <div className="grid grid-cols-4 gap-4 mb-6">
            <StatCard label="Total leads" value={leads.length} color="slate" />
            <StatCard label="Hot leads" value={hotLeads} color="red" />
            <StatCard label="Warm leads" value={warmLeads} color="yellow" />
            <StatCard
              label="Avg. score"
              value={`${avgScore}/100`}
              color="green"
            />
          </div>
        )}

        {/* Loading Skeletons */}
        {loading && (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="bg-slate-900 border border-slate-800 rounded-xl p-4 animate-pulse"
                style={{ opacity: 1 - i * 0.15 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-slate-800 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-slate-800 rounded w-32" />
                    <div className="h-2.5 bg-slate-800 rounded w-24" />
                  </div>
                  <div className="h-3 bg-slate-800 rounded w-40" />
                  <div className="h-3 bg-slate-800 rounded w-20" />
                  <div className="h-5 bg-slate-800 rounded-full w-14" />
                </div>
              </div>
            ))}
            <p className="text-center text-slate-500 text-sm pt-2 animate-pulse">
              Finding leads with AI...
            </p>
          </div>
        )}

        {/* Results */}
        {!loading && leads.length > 0 && (
          <LeadTable
            leads={leads}
            onExport={exportToCSV}
            onDelete={deleteLead}
            onDeleteSelected={deleteSelected}
          />
        )}

        {/* Empty State */}
        {!loading && leads.length === 0 && !error && (
          <div className="bg-slate-900/50 border border-slate-800 border-dashed rounded-2xl p-20 text-center">
            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Radio size={28} className="text-slate-600" />
            </div>
            <p className="text-slate-300 font-medium mb-1">
              Ready to find leads
            </p>
            <p className="text-slate-600 text-sm">
              Fill in the filters above and click Find Leads
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
