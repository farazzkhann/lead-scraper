import { useState, useEffect } from "react";
import { fetchLeads } from "../services/groq";

const STORAGE_KEY = "lead_scraper_leads";

export function useLeads() {
  const [leads, setLeads] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    } catch {
      console.error("Failed to save leads to localStorage");
    }
  }, [leads]);

  const searchLeads = async (params) => {
    setLoading(true);
    setError("");
    try {
      const results = await fetchLeads(params);
      setLeads(results);
    } catch (e) {
      setError(e.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const clearLeads = () => {
    setLeads([]);
    setError("");
    localStorage.removeItem(STORAGE_KEY);
  };

  const deleteLead = (id) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  const deleteSelected = (ids) => {
    setLeads((prev) => prev.filter((l) => !ids.has(l.id)));
  };

  return {
    leads,
    loading,
    error,
    searchLeads,
    clearLeads,
    deleteLead,
    deleteSelected,
  };
}
