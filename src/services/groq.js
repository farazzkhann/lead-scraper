const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

function buildPrompt({ industry, location, role, size, keywords, count }) {
  return `You are a B2B lead generation expert. Generate ${count} realistic business leads for:

Industry: ${industry}
Location: ${location || "Global"}
Target Role: ${role}
Company Size: ${size} employees
Keywords: ${keywords || "general"}

Return ONLY a valid JSON array. No explanation, no markdown, no code blocks.
Each object must have exactly these fields:
- id: "lead_1", "lead_2", etc
- name: full name
- title: job title
- company: company name
- location: city, country
- email: work email
- phone: phone with country code
- linkedin: linkedin URL
- website: company website
- employees: number within ${size} range
- revenue: estimated revenue like "$2M" or "$15M"
- score: integer 1-100
- status: "hot", "warm", or "cold"
- tags: array of 2-3 strings
- notes: one sentence on why they are a good lead

Make leads realistic, varied, and different companies.

IMPORTANT: Return only a clean JSON array. No trailing commas. No comments. No extra text.`;
}

export async function fetchLeads(params) {
  if (!API_KEY)
    throw new Error("Groq API key is missing. Check your .env file.");

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "user", content: buildPrompt(params) }],
      temperature: 0.7,
      max_tokens: 4000,
    }),
  });

  const data = await res.json();
  if (data.error) throw new Error(data.error.message);

  const raw = data.choices?.[0]?.message?.content || "[]";

  let clean = raw
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const firstBracket = clean.indexOf("[");
  const lastBracket = clean.lastIndexOf("]");
  if (firstBracket !== -1 && lastBracket !== -1) {
    clean = clean.slice(firstBracket, lastBracket + 1);
  }

  try {
    return JSON.parse(clean);
  } catch (e) {
    console.error("Parse error:", e.message);
    throw new Error("AI returned invalid data. Please try again.", {
      cause: e,
    });
  }
}
