
import { CategoryData, CategoryType } from './types';

export const DIGITAL_PRODUCTS = ["Spotify", "Duolingo", "Notion", "Figma", "Calm", "Airbnb", "Uber Eats", "Slack", "Netflix", "Headspace", "Zoom", "DoorDash", "Amazon", "Google", "Meta"];
export const PUBLIC_COMPANIES = ["Spotify", "Airbnb", "Uber", "Netflix", "DoorDash", "Amazon", "Google", "Meta"];
export const PHYSICAL_DOMAINS = ["Dentist’s office", "Grocery store", "Coffee shop", "Gym", "Hotel", "Post office", "Airport", "Library", "Pharmacy", "Parking garage"];

export const PM_FRAMEWORKS: CategoryData[] = [
  {
    id: 'C1',
    type: CategoryType.LEARN,
    formula: (p) => `I studied ${p.source} on ${p.topic} and applied it to ${p.product} — here's ${p.outcome}`,
    columns: {
      source: ["Cracking the PM Career", "The Mom Test", "Inspired", "Lenny’s Newsletter", "Reforge", "Product School", "Google Analytics Academy", "LinkedIn Learning", "Mind the Product", "Stratechery"],
      topic: ["RICE prioritisation", "Kano Model", "JTBD", "OKRs", "HEART metrics", "technical debt", "unit economics", "A/B testing", "DACI", "RACI", "SWOT", "Porter’s Five Forces", "PESTEL", "Value Proposition Canvas", "North Star Metric", "Retention cohorts"],
      product: DIGITAL_PRODUCTS,
      outcome: ["3 things I finally understand", "a mistake I made", "a concept I applied", "a question I still have", "a template I created", "my cheat sheet", "an experiment I designed", "a workshop I facilitated"]
    }
  },
  {
    id: 'C2',
    type: CategoryType.CHECKLISTS,
    formula: (p) => `A ${p.format} for ${p.purpose} — ${p.angle}`,
    columns: {
      format: ["Notion template", "Google Sheets", "PDF one-pager", "Miro board", "Figma wireframe kit", "Trello board", "Confluence template", "Airtable base"],
      purpose: ["OKR setting", "RICE scoring calculator", "PRD outline", "user interview guide", "launch checklist", "post-mortem retrospective", "roadmap communication", "competitive analysis"],
      angle: ["based on 3 failed quarters", "after reading Inspired", "from a mentor at Google", "tested with 3 stakeholders", "distilled from 5 real post-mortems", "for remote teams", "with 5 competitor scores"]
    }
  },
  {
    id: 'C3',
    type: CategoryType.RESEARCH,
    formula: (p) => `I analysed ${p.source} on ${p.sector} using ${p.framework} — here are ${p.number} ${p.lens} for PMs`,
    columns: {
      source: ["a16z", "CB Insights", "McKinsey", "Gartner", "Forrester", "earnings calls", "App Store reviews", "Reddit", "TrustRadius", "G2"],
      sector: ["EdTech", "FinTech", "HealthTech", "Creator Economy", "E-commerce", "SaaS", "Climate Tech", "Food Delivery", "Meditation Apps"],
      framework: ["SWOT", "PESTEL", "Porter’s Five Forces", "Value Proposition Canvas", "JTBD analysis", "Kano classification", "HEART framework", "RICE"],
      number: ["3", "5", "7", "10"],
      lens: ["product opportunities", "UX trends", "business model shifts", "competitive blind spots", "under-hyped segments", "delighters that became basics", "retention drivers"]
    }
  },
  {
    id: 'C4',
    type: CategoryType.CASE_STUDIES,
    formula: (p) => `How I’d fix ${p.painPoint} at ${p.domain} — a ${p.method} case study`,
    columns: {
      domain: PHYSICAL_DOMAINS,
      painPoint: ["Waiting time", "Finding items", "Order accuracy", "Cancellation hassle", "Check-in queue", "Lost parcel", "Security anxiety", "Fine confusion"],
      method: ["Journey map", "Diary study", "5 Whys", "Assumption mapping", "Service blueprint", "Root cause analysis", "JTBD interview", "Usability test"],
      solutionArtifact: ["SMS check-in", "Store map in app", "Digital ticket", "One-click pause", "Self-service kiosk", "Tracking micro-updates", "Fast-track prediction", "Digital receipt"]
    }
  },
  {
    id: 'C5',
    type: CategoryType.TEARDOWNS,
    formula: (p) => `Teardown: Why ${p.productFeature}’s ${p.angle} fails (and how I’d fix it)`,
    columns: {
      productFeature: ["Airbnb Instant Book", "Spotify Enhance", "Instagram Reels", "Gmail tabs", "Slack huddles", "DoorDash fees", "Goodreads ‘Want to Read’", "Zoom backgrounds", "Notion templates"],
      angle: ["JTBD", "Kano", "UX friction", "Information architecture", "Adoption", "Trust", "Retention driver", "Gimmick vs. utility", "Onboarding success"],
      evidence: ["Public interviews", "Reddit threads", "Screenshot annotation", "Twitter complaints", "User feedback", "App Store reviews", "Personal usage", "User interviews", "Cohort analysis"],
      fix: ["Guest standards + education", "Make it persistent", "Reposition close button", "Merge two tabs", "Persistent entry point", "Fee breakdown redesign", "Progress nudges", "Meeting-context suggestions", "Personalised starter packs"]
    }
  },
  {
    id: 'C6',
    type: CategoryType.HYPOTHETICAL,
    formula: (p) => `A ${p.newFeature} for ${p.product} to help ${p.userJob} — ${p.artifact} walkthrough`,
    columns: {
      product: DIGITAL_PRODUCTS,
      userJob: ["Anxious drivers", "Parents", "Book clubs", "Shift workers", "Students", "Elderly users", "Avoid-spoiler seekers", "ADHD users"],
      newFeature: ["Quiet mode", "Bedtime mode", "Group reading tracker", "Sleep debt dashboard", "AI lecture summariser", "Large-text mode", "No-spoiler filter", "Micro-meditation"],
      artifact: ["Low-fi wireframe", "User story + mockup", "Figma prototype", "Success metrics", "Paper prototype", "Before/after flow", "Toggle design", "Inline prompt"]
    }
  },
  {
    id: 'C7',
    type: CategoryType.CAREER,
    formula: (p) => `${p.situation}: ${p.focus} — ${p.takeaway}`,
    columns: {
      situation: ["Mock interview", "Job description analysis", "First 90 days", "Networking", "Portfolio building", "Career ladder", "Common PM problem"],
      focus: ["Estimation questions", "Required PM skills", "Onboarding strategy", "Finding a sponsor", "Fake PRD", "APM → PM → Senior", "Executive feature request"],
      format: ["Post-mortem", "Spreadsheet audit", "Personal retrospective", "Conversation summary", "Template + reflection", "Self-assessment", "Problem-solution story"],
      takeaway: ["3 mistakes", "What “influence” really means", "What I wish I’d known", "1 unexpected ask", "Before/after", "My weakest spoke", "How I said “no”"]
    }
  }
];
