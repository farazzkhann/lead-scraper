# LeadScraper

An AI-powered B2B lead generation tool built with React and Groq AI. Generate qualified leads instantly by filtering by industry, location, role, company size, and keywords.

## Features

- AI-powered lead generation using Groq (LLaMA 3.3 70B)
- Filter by industry, location, target role, company size, and keywords
- Lead scoring (1–100) with visual score bars
- Status badges — Hot, Warm, Cold
- Lead detail panel with full contact info and AI insight
- Copy email and phone to clipboard in one click
- Filter leads by status and sort by score or name
- Export leads to CSV
- Select and bulk delete leads
- Leads saved to localStorage — survive page refresh
- Clean dark UI with Tailwind CSS and Lucide icons

## Tech Stack

- React + Vite
- Tailwind CSS v4
- Groq API (LLaMA 3.3 70B)
- Lucide React icons
- localStorage for persistence

## Getting Started

### 1. Clone the repo

\`\`\`bash
git clone https://github.com/YOUR_USERNAME/lead-scraper.git
cd lead-scraper
\`\`\`

### 2. Install dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Get a free Groq API key

- Go to https://console.groq.com
- Sign up with your Google account
- Create a new API key

### 4. Create a .env file

\`\`\`
VITE_GROQ_API_KEY=your_groq_api_key_here
\`\`\`

### 5. Run the app

\`\`\`bash
npm run dev
\`\`\`

Open http://localhost:5173 in your browser.

## Project Structure

\`\`\`
src/
├── components/
│ ├── Avatar.jsx
│ ├── LeadDetail.jsx
│ ├── LeadTable.jsx
│ ├── ScoreBar.jsx
│ ├── SearchForm.jsx
│ ├── StatCard.jsx
│ └── StatusBadge.jsx
├── constants/
│ └── index.js
├── hooks/
│ └── useLeads.js
├── services/
│ └── groq.js
├── utils/
│ └── exportCSV.js
├── App.jsx
├── index.css
└── main.jsx
\`\`\`

## Usage

1. Select your target **industry** and **location**
2. Choose the **job title** you want to reach
3. Set **company size** range
4. Add optional **keywords** to narrow the niche
5. Choose how many leads to generate
6. Click **Find Leads**
7. Click any row to see full contact details and AI insight
8. Export selected leads to CSV

## Important Note

Leads are AI-generated based on real-world patterns. Emails and phone numbers are synthesized and should be verified before outreach. Use tools like Hunter.io to verify emails.

## License

MIT
