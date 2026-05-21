export function exportToCSV(leads) {
  if (!leads.length) return;

  const headers = [
    "Name",
    "Title",
    "Company",
    "Location",
    "Email",
    "Phone",
    "Website",
    "LinkedIn",
    "Employees",
    "Revenue",
    "Score",
    "Status",
    "Notes",
  ];

  const rows = leads.map((l) => [
    l.name,
    l.title,
    l.company,
    l.location,
    l.email,
    l.phone,
    l.website,
    l.linkedin,
    l.employees,
    l.revenue,
    l.score,
    l.status,
    `"${l.notes}"`,
  ]);

  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `leads_${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
