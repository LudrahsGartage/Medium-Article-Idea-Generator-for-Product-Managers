
import React, { useState, useCallback, useEffect } from 'react';
import { generateSmartIdea } from './engine';
import { IdeaResult } from './types';
import { VALUE_DEFINITIONS } from './definitions';

const IOSButton: React.FC<{ onClick: () => void; children: React.ReactNode; primary?: boolean }> = ({ onClick, children, primary = false }) => (
  <button
    onClick={onClick}
    className={`
      px-4 py-3 sm:px-6 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg transition-all active:scale-95
      ${primary 
        ? 'bg-[#007AFF] text-white shadow-lg shadow-blue-500/20 hover:bg-[#0062CC]' 
        : 'bg-white text-[#007AFF] border border-gray-100 shadow-sm hover:bg-gray-50'}
    `}
  >
    {children}
  </button>
);

const ContextSheet: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  components: Record<string, string>;
}> = ({ isOpen, onClose, components }) => {
  if (!isOpen) return null;

  const matchedDefinitions = Object.entries(components)
    .map(([key, value]) => {
      const definition = VALUE_DEFINITIONS[value] || VALUE_DEFINITIONS[value.split(' ')[0]];
      return {
        label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
        value: value,
        definition: definition
      };
    })
    .filter(item => !!item.definition);

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white sm:rounded-[40px] rounded-t-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in slide-in-from-bottom duration-300">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <h3 className="text-xl font-bold text-gray-900">Context & Terms</h3>
          <button onClick={onClose} className="text-[#007AFF] font-bold text-lg">Done</button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {matchedDefinitions.length > 0 ? (
            matchedDefinitions.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-black text-[#8E8E93] uppercase tracking-widest">{item.label}</span>
                  <div className="h-px flex-1 bg-gray-100"></div>
                </div>
                <p className="text-lg font-bold text-gray-900 leading-tight">{item.value}</p>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">{item.definition}</p>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-gray-400 font-medium">
              No detailed definitions found for these variables.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DisclaimerSheet: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-6">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-[#F2F2F7] sm:rounded-[40px] rounded-t-[32px] shadow-2xl overflow-hidden flex flex-col h-full sm:h-[85vh] animate-in slide-in-from-bottom duration-300">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <h3 className="text-xl font-bold text-gray-900">Disclaimer</h3>
          <button onClick={onClose} className="text-[#007AFF] font-bold text-lg">Done</button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-white">
          <div className="space-y-2">
            <h4 className="text-2xl font-black text-gray-900 leading-tight">Disclaimer & User Guidance</h4>
            <p className="text-[#007AFF] font-bold uppercase tracking-widest text-xs">PM Article Idea Generator – Beta Version</p>
          </div>

          <p className="text-gray-600 font-medium leading-relaxed">
            This tool is designed to inspire and accelerate content creation for aspiring product managers. It combines variables from established PM frameworks, products, and career situations into article titles and outlines. While every effort has been made to ensure coherence and relevance, this is a combinatorial system, not a substitute for human judgment.
          </p>

          <section className="space-y-6">
            <h5 className="text-sm font-black text-[#8E8E93] uppercase tracking-widest border-b border-gray-100 pb-2">⚠️ Important Cautions & Limitations</h5>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="font-bold text-gray-900">1. Generated Ideas Require Human Review</p>
                <p className="text-sm text-gray-600 leading-relaxed">The tool produces titles by mixing predefined terms. Not all combinations are contextually valid, insightful, or realistic. You must evaluate each idea for logical fit, add your own research, and reword or discard outputs that feel forced.</p>
              </div>

              <div className="space-y-2">
                <p className="font-bold text-gray-900">2. No Guarantee of Accuracy or Completeness</p>
                <p className="text-sm text-gray-600 leading-relaxed">The tool references frameworks, products, and concepts at a summary level. Definitions are simplified. You must verify technical details from primary sources and avoid presenting hypothetical metrics as real company data.</p>
              </div>

              <div className="space-y-2">
                <p className="font-bold text-gray-900">3. Not Financial, Career, or Strategic Advice</p>
                <p className="text-sm text-gray-600 leading-relaxed">The tool suggests article topics only. It does not provide certified PM training, job search guarantees, or insider knowledge. Decisions made based on generated content are your sole responsibility.</p>
              </div>

              <div className="space-y-2">
                <p className="font-bold text-gray-900">4. Ethical Content Creation</p>
                <p className="text-sm text-gray-600 leading-relaxed">You are responsible for ensuring your articles are original, respectful of user privacy, transparent about data, and free of defamatory statements.</p>
              </div>

              <div className="space-y-2">
                <p className="font-bold text-gray-900">5. No Warranty</p>
                <p className="text-sm text-gray-600 leading-relaxed">This tool is provided “as is” without any warranties. The creators disclaim all liability for loss of time, misinterpretation of features, or negative professional consequences resulting from published articles.</p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h5 className="text-sm font-black text-[#8E8E93] uppercase tracking-widest border-b border-gray-100 pb-2">✅ Best Practices</h5>
            <div className="rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 font-black text-[#007AFF] uppercase text-[10px]">Do</th>
                    <th className="px-4 py-3 font-black text-red-500 uppercase text-[10px]">Don't</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-3 text-gray-600 align-top">✅ Use the tool to overcome writer’s block and explore new angles.</td>
                    <td className="px-4 py-3 text-gray-600 align-top">❌ Publish titles verbatim without critical thought.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-600 align-top">✅ Combine generated ideas with your own experiences.</td>
                    <td className="px-4 py-3 text-gray-600 align-top">❌ Claim insider knowledge or access you do not possess.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-600 align-top">✅ Disclose when a case study or prototype is purely hypothetical.</td>
                    <td className="px-4 py-3 text-gray-600 align-top">❌ Present hypothetical metrics as if they were real A/B test results.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <div className="pt-6 border-t border-gray-100 space-y-4">
            <p className="text-sm text-gray-500 italic leading-relaxed">
              📌 <strong>Final Note:</strong> This tool was built by an aspiring PM, for aspiring PMs. It reflects a passion for the craft and a belief that everyone starts somewhere. If you find a combination that doesn’t make sense, trust your instincts – your product sense is already stronger than any algorithm.
            </p>
            <p className="text-xl font-bold text-gray-900 text-center">Now go write something great. 🚀</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const HowItWorksSheet: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const formulas = [
    { id: 'C1', name: 'Learn PM / Data Things', formula: 'I studied [Source] on [Topic/Framework] and applied it to [Product] — here\'s [Outcome].' },
    { id: 'C2', name: 'Checklists / Cheat Sheets', formula: 'A [Format] for [Purpose] — [Unique Angle].' },
    { id: 'C3', name: 'Share Industry Research', formula: 'I analysed [Source] on [Sector] using [Framework] — here are [Number] [Lens] for PMs.' },
    { id: 'C4', name: 'Real World Case Studies', formula: 'How I’d fix [Pain Point] at [Domain] — a [Method] case study.' },
    { id: 'C5', name: 'Teardowns – Existing Features', formula: 'Teardown: Why [Product/Feature]’s [Framework/Angle] fails (and how I’d fix it).' },
    { id: 'C6', name: 'Hypothetical Features / Prototypes', formula: 'A [NewFeature] for [Product] to help [User/JTBD] — [Artifact] walkthrough.' },
    { id: 'C7', name: 'Career / Interview Chronicles', formula: '[Situation]: [Focus] — [Takeaway].' },
  ];

  const variables = [
    { var: 'Source', cat: 'C1, C3', def: 'A book, course, newsletter, or report from which the author learned a concept or extracted data.', ex: '"Cracking the PM Career", "Lenny’s Newsletter", "a16z", "CB Insights"' },
    { var: 'Topic / Framework', cat: 'C1, C3', def: 'A specific product management framework, methodology, or analytical concept applied to a product or sector.', ex: '"RICE", "JTBD", "Kano Model", "HEART", "Porter’s Five Forces"' },
    { var: 'Product', cat: 'C1, C5, C6', def: 'A well‑known digital product (app or service) used as the subject of analysis, teardown, or hypothetical feature.', ex: '"Spotify", "Notion", "Airbnb", "Google Maps", "Slack"' },
    { var: 'Outcome', cat: 'C1', def: 'A personal learning result or artifact produced after studying a source and applying it to a product.', ex: '"3 things I finally understand", "a template I created", "an experiment I designed"' },
    { var: 'Format (Resource)', cat: 'C2', def: 'The medium or template type used to package a practical resource for other PMs.', ex: '"Notion template", "Google Sheets", "PDF one‑pager", "Miro board"' },
    { var: 'Purpose', cat: 'C2', def: 'The specific PM activity or workflow that the resource is designed to support.', ex: '"OKR setting", "RICE scoring calculator", "PRD outline", "launch checklist"' },
    { var: 'Unique Angle', cat: 'C2', def: 'A short phrase that adds credibility, backstory, or distinctiveness to the resource.', ex: '"based on 3 failed quarters", "from a mentor at Google", "tested with 3 stakeholders"' },
    { var: 'Sector', cat: 'C3', def: 'An industry or market vertical analysed in investor reports or user feedback.', ex: '"EdTech", "FinTech", "HealthTech", "Creator Economy", "SaaS"' },
    { var: 'Number', cat: 'C3', def: 'A small integer indicating how many insights, trends, or opportunities are presented.', ex: '3, 5, 7' },
    { var: 'Lens', cat: 'C3', def: 'The type of insight extracted from research (e.g., opportunity, trend, gap).', ex: '"product opportunities", "UX trends", "competitive blind spots", "retention drivers"' },
    { var: 'Domain', cat: 'C4', def: 'A physical, non‑digital service environment used as the setting for a real‑world case study.', ex: '"Dentist’s office", "Grocery store", "Hotel", "Post office", "Airport"' },
    { var: 'Pain Point', cat: 'C4', def: 'A specific frustration or inefficiency experienced by users in the chosen domain.', ex: '"Waiting time", "Finding items", "Cancellation hassle", "Lost parcel"' },
    { var: 'Method', cat: 'C4', def: 'A product discovery or research technique applied to analyse and solve the pain point.', ex: '"Journey map", "5 Whys", "Service blueprint", "JTBD interview"' },
    { var: 'Solution Artifact', cat: 'C4', def: 'A tangible output or prototype proposed to address the pain point.', ex: '"SMS check‑in", "Store map in app", "Self‑service kiosk", "Digital receipt"' },
    { var: 'Product Feature', cat: 'C5', def: 'A specific existing feature of a digital product that is being critiqued or analysed.', ex: '"Airbnb Instant Book", "Spotify Enhance", "Gmail tabs", "Slack huddles"' },
    { var: 'Framework Angle', cat: 'C5', def: 'The specific PM framework or analytical lens used to evaluate the feature.', ex: '"JTBD (host fears)", "Kano (delighter → expected)", "UX friction", "Information architecture", "Adoption", "Trust", "Retention driver", "Gimmick vs. utility", "Onboarding success"' },
    { var: 'Evidence', cat: 'C5', def: 'Publicly available user feedback or data used to support the teardown argument.', ex: '"Public interviews (Lenny)", "Reddit threads", "App Store reviews", "Twitter complaints"' },
    { var: 'Fix', cat: 'C5', def: 'A concrete, actionable improvement proposed for the feature.', ex: '"Guest standards + education", "Persistent toggle", "Fee breakdown redesign", "Progress nudges"' },
    { var: 'User / JTBD', cat: 'C6', def: 'A specific underserved user persona and the “job” they are trying to accomplish.', ex: '"Anxious drivers (job: avoid stress)", "Parents (job: lullaby timer)", "Book clubs (job: shared progress)"' },
    { var: 'New Feature', cat: 'C6', def: 'A hypothetical feature designed to address the user’s job.', ex: '"Quiet mode", "Bedtime mode", "Sleep debt dashboard", "No‑spoiler filter"' },
    { var: 'Artifact', cat: 'C6', def: 'The format or fidelity level of the prototype created for the hypothetical feature.', ex: '"Low‑fi wireframe", "User story + mockup", "Figma prototype", "Success metrics", "Paper prototype", "Before/after flow"' },
    { var: 'Situation', cat: 'C7', def: 'A common career scenario or challenge faced by aspiring or early‑career PMs.', ex: '"Mock interview", "Job description analysis", "First 90 days", "Networking", "Portfolio building"' },
    { var: 'Focus', cat: 'C7', def: 'A specific aspect or skill within the broader situation that the article examines.', ex: '"Estimation questions", "Required PM skills", "Onboarding strategy", "Finding a sponsor", "Fake PRD"' },
    { var: 'Format (Narrative)', cat: 'C7', def: 'The structural style in which the career experience is presented.', ex: '"Post‑mortem", "Spreadsheet audit", "Personal retrospective", "Conversation summary"' },
    { var: 'Takeaway', cat: 'C7', def: 'The key lesson, mistake, or insight that gives the article value to readers.', ex: '"3 mistakes", "What ‘influence’ really means", "1 unexpected ask", "How I said ‘no’"' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-6">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-4xl bg-[#F2F2F7] sm:rounded-[40px] rounded-t-[32px] shadow-2xl overflow-hidden flex flex-col h-full sm:h-[85vh] animate-in slide-in-from-bottom duration-300">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <h3 className="text-xl font-bold text-gray-900">How It Works</h3>
          <button onClick={onClose} className="text-[#007AFF] font-bold text-lg">Done</button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-12">
          <section className="space-y-6">
            <h4 className="text-sm font-bold text-[#8E8E93] uppercase tracking-widest px-1">Combinatorial Formulas</h4>
            <div className="grid gap-4">
              {formulas.map((f) => (
                <div key={f.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <span className="text-[10px] font-black text-[#007AFF] uppercase mb-1 block">{f.id} • {f.name}</span>
                  <p className="text-gray-900 font-medium text-lg leading-tight">{f.formula}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <div className="px-1">
              <h4 className="text-sm font-bold text-[#8E8E93] uppercase tracking-widest mb-1">Variable Definitions</h4>
              <p className="text-xs text-gray-500 font-medium italic">A reference for the combinatorial system logic.</p>
            </div>
            
            <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-black text-[#8E8E93] uppercase tracking-wider">Variable</th>
                    <th className="px-6 py-4 text-[10px] font-black text-[#8E8E93] uppercase tracking-wider">Categories</th>
                    <th className="px-6 py-4 text-[10px] font-black text-[#8E8E93] uppercase tracking-wider">Definition</th>
                    <th className="px-6 py-4 text-[10px] font-black text-[#8E8E93] uppercase tracking-wider">Example Values</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {variables.map((v, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-bold text-gray-900 align-top">{v.var}</td>
                      <td className="px-6 py-4 text-[10px] font-black text-[#007AFF] align-top">{v.cat}</td>
                      <td className="px-6 py-4 text-xs text-gray-600 leading-relaxed align-top">{v.def}</td>
                      <td className="px-6 py-4 text-xs text-gray-400 font-medium italic align-top">{v.ex}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const SavedIdeasSheet: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  ideas: IdeaResult[]; 
  onRemove: (title: string) => void;
  onSelect: (idea: IdeaResult) => void;
  onCopyAll: () => void;
}> = ({ isOpen, onClose, ideas, onRemove, onSelect, onCopyAll }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white sm:rounded-[40px] rounded-t-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom duration-300">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <h3 className="text-xl font-bold text-gray-900">Saved Ideas</h3>
          <button onClick={onClose} className="text-[#007AFF] font-bold text-lg">Done</button>
        </div>

        {ideas.length > 0 && (
          <div className="flex px-6 py-4 border-b border-gray-100 bg-gray-50/30">
            <button 
              onClick={onCopyAll}
              className="w-full py-2.5 rounded-xl bg-white border border-gray-100 shadow-sm text-[#007AFF] text-sm font-bold active:scale-95 transition-all hover:bg-gray-50"
            >
              Copy All
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {ideas.length === 0 ? (
            <div className="py-20 text-center space-y-2">
              <p className="text-gray-400 font-medium">No saved ideas yet</p>
              <p className="text-xs text-gray-300 uppercase tracking-widest font-bold">Your library is empty</p>
            </div>
          ) : (
            ideas.map((idea, idx) => (
              <div key={idx} className="group relative bg-gray-50 rounded-2xl p-4 border border-gray-100 transition-colors hover:bg-gray-100/50">
                <div className="pr-12 cursor-pointer" onClick={() => { onSelect(idea); onClose(); }}>
                  <span className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block mb-1">
                    {idea.category}
                  </span>
                  <p className="text-sm font-bold text-gray-900 leading-snug">{idea.title}</p>
                </div>
                <button 
                  onClick={() => onRemove(idea.title)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-red-500 active:scale-90 transition-transform"
                  aria-label="Remove saved idea"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const IdeaCard: React.FC<{ 
  idea: IdeaResult | null; 
  onGenerate: () => void; 
  onSave: (idea: IdeaResult) => void;
  onContext: () => void;
  isSaved: boolean;
}> = ({ idea, onGenerate, onSave, onContext, isSaved }) => {
  if (!idea) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 w-full max-w-lg mx-auto py-8">
        <div className="text-center space-y-4 px-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto border border-gray-100">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#007AFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">PM Muse</h1>
          <p className="text-lg sm:text-xl text-gray-500 max-w-sm mx-auto font-medium">
            Intelligent article ideation for Product Managers.
          </p>
        </div>
        <div className="bg-white/80 backdrop-blur-xl p-8 sm:p-10 rounded-[32px] sm:rounded-[40px] shadow-2xl shadow-gray-200/50 border border-white/50 w-full text-center">
          <p className="text-lg sm:text-xl font-medium text-gray-400 italic">
            "Your next viral PM post is just a click away."
          </p>
          <div className="mt-8">
            <IOSButton primary onClick={onGenerate}>
              Generate Idea
            </IOSButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 animate-in fade-in zoom-in-95 duration-500 py-8">
      <div className="bg-white rounded-[32px] sm:rounded-[40px] p-6 sm:p-12 shadow-2xl shadow-gray-200/60 border border-gray-50 flex flex-col space-y-6 sm:space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-8 sm:right-12 flex space-x-1 pt-4 sm:pt-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < idea.validationScore ? 'bg-green-400' : 'bg-gray-200'}`} />
          ))}
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-start">
            <span className="text-[#8E8E93] text-[10px] sm:text-xs font-bold uppercase tracking-widest">
              {idea.category}
            </span>
            <button 
              onClick={() => onSave(idea)}
              className={`flex items-center space-x-1.5 text-xs sm:text-sm font-semibold transition-colors ${isSaved ? 'text-orange-500' : 'text-[#007AFF] hover:text-[#0062CC]'}`}
            >
              {isSaved ? (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 20 20">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              )}
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight text-gray-900 tracking-tight">
            {idea.title}
          </h2>
          {idea.subtitle && (
            <p className="text-base sm:text-lg text-[#8E8E93] font-medium leading-relaxed italic">
              {idea.subtitle}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-50">
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="flex-1 sm:flex-initial">
              <IOSButton primary onClick={onGenerate}>
                Generate New
              </IOSButton>
            </div>
            <button 
              onClick={() => {
                const text = `${idea.title}\n${idea.subtitle || ''}`;
                window.navigator.clipboard.writeText(text);
                alert('Copied to clipboard!');
              }}
              className="flex-1 sm:flex-initial px-4 py-3 sm:px-6 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg bg-white text-[#007AFF] border border-gray-100 shadow-sm hover:bg-gray-50 active:scale-95 transition-all"
            >
              Copy Text
            </button>
          </div>
          
          <button 
            onClick={onContext}
            className="w-full sm:w-auto px-4 py-3 sm:px-6 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg bg-white text-[#007AFF] border border-gray-100 shadow-sm hover:bg-gray-50 active:scale-95 transition-all flex items-center justify-center"
            title="Need context?"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="ml-2">Context</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [currentIdea, setCurrentIdea] = useState<IdeaResult | null>(null);
  const [savedIdeas, setSavedIdeas] = useState<IdeaResult[]>([]);
  const [isSavedSheetOpen, setIsSavedSheetOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [isContextOpen, setIsContextOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('pm_muse_saved_ideas');
    if (stored) {
      try {
        setSavedIdeas(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse saved ideas", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pm_muse_saved_ideas', JSON.stringify(savedIdeas));
  }, [savedIdeas]);

  const generateIdea = useCallback(() => {
    setCurrentIdea(generateSmartIdea());
  }, []);

  const toggleSave = useCallback((idea: IdeaResult) => {
    setSavedIdeas(prev => {
      const exists = prev.some(i => i.title === idea.title);
      if (exists) {
        return prev.filter(i => i.title !== idea.title);
      }
      return [idea, ...prev];
    });
  }, []);

  const removeSavedIdea = useCallback((title: string) => {
    setSavedIdeas(prev => prev.filter(i => i.title !== title));
  }, []);

  const handleCopyAll = useCallback(() => {
    if (savedIdeas.length === 0) return;
    const allText = savedIdeas.map(i => `${i.title}${i.subtitle ? '\n' + i.subtitle : ''}`).join('\n\n---\n\n');
    window.navigator.clipboard.writeText(allText);
    alert('All saved ideas copied to clipboard!');
  }, [savedIdeas]);

  const isCurrentSaved = currentIdea ? savedIdeas.some(i => i.title === currentIdea.title) : false;

  return (
    <div className="min-h-screen flex flex-col bg-[#F2F2F7] selection:bg-blue-100 overflow-x-hidden relative">
      <header className="sticky top-0 w-full p-4 sm:p-6 flex justify-between items-center z-20 bg-[#F2F2F7]/95 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded-lg shadow-lg flex items-center justify-center">
              <span className="text-white font-black text-base">M</span>
            </div>
            <span className="font-extrabold text-lg text-gray-900 tracking-tight">PM Muse</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setIsSavedSheetOpen(true)}
            className="relative px-4 py-2 bg-white rounded-full border border-gray-100 shadow-sm flex items-center space-x-2 text-sm font-bold text-gray-600 active:scale-95 transition-all"
          >
            <svg className="w-4 h-4 text-orange-500 fill-current" viewBox="0 0 20 20">
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
            <span>Saved ({savedIdeas.length})</span>
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center w-full px-4 overflow-y-visible">
        {/* Dynamic scaling div that provides vertical room but stays centered */}
        <div className="w-full h-full flex items-center justify-center transform origin-center transition-transform scale-[0.85] sm:scale-100 portrait:scale-[0.95] landscape:scale-[0.8] sm:landscape:scale-100">
          <IdeaCard 
            idea={currentIdea} 
            onGenerate={generateIdea} 
            onSave={toggleSave}
            onContext={() => setIsContextOpen(true)}
            isSaved={isCurrentSaved}
          />
        </div>
      </main>

      <footer className="w-full mt-auto p-6 sm:p-8 text-center bg-[#F2F2F7]/95 backdrop-blur-md z-10 border-t border-gray-200/20">
        <p className="text-[#8E8E93] text-[10px] sm:text-xs font-semibold tracking-wide uppercase mb-2">
          Combinatorial Engine • Validation Gates
        </p>
        <div className="flex justify-center items-center space-x-3 sm:space-x-4">
          <a 
            href="mailto:shardulchaturvedi1@gmail.com" 
            className="text-[#8E8E93] text-[9px] sm:text-[10px] font-bold uppercase tracking-widest hover:text-[#007AFF] transition-colors"
          >
            Contact
          </a>
          <span className="w-1 h-1 bg-gray-300 rounded-full" />
          <button 
            onClick={() => setIsHowItWorksOpen(true)}
            className="text-[#8E8E93] text-[9px] sm:text-[10px] font-bold uppercase tracking-widest hover:text-[#007AFF] transition-colors"
          >
            How it works
          </button>
          <span className="w-1 h-1 bg-gray-300 rounded-full" />
          <button 
            onClick={() => setIsDisclaimerOpen(true)}
            className="text-[#8E8E93] text-[9px] sm:text-[10px] font-bold uppercase tracking-widest hover:text-[#007AFF] transition-colors"
          >
            Disclaimer
          </button>
        </div>
      </footer>

      <SavedIdeasSheet 
        isOpen={isSavedSheetOpen} 
        onClose={() => setIsSavedSheetOpen(false)} 
        ideas={savedIdeas}
        onRemove={removeSavedIdea}
        onSelect={(idea) => setCurrentIdea(idea)}
        onCopyAll={handleCopyAll}
      />

      <HowItWorksSheet 
        isOpen={isHowItWorksOpen} 
        onClose={() => setIsHowItWorksOpen(false)} 
      />

      <DisclaimerSheet 
        isOpen={isDisclaimerOpen} 
        onClose={() => setIsDisclaimerOpen(false)} 
      />

      {currentIdea && (
        <ContextSheet 
          isOpen={isContextOpen} 
          onClose={() => setIsContextOpen(false)} 
          components={currentIdea.components}
        />
      )}
    </div>
  );
}
