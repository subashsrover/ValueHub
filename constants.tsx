import React from 'react';
import type { Benefit, Tool } from './types';
import { 
    CheckCircleIcon, SparklesIcon, ShieldCheckIcon, ZapIcon
} from './components/icons';

export const BENEFITS: Benefit[] = [
  {
    icon: <CheckCircleIcon className="w-12 h-12 text-secondary" />,
    title: 'Curated Selection',
    description: 'Every tool is hand-picked and rigorously tested by industry experts to ensure top-tier quality and performance.'
  },
  {
    icon: <SparklesIcon className="w-12 h-12 text-accent" />,
    title: 'Exclusive Deals',
    description: 'Access unbeatable prices and special bundles you won\'t find anywhere else, saving you money on premium software.'
  },
  {
    icon: <ShieldCheckIcon className="w-12 h-12 text-green-400" />,
    title: 'Secure & Trusted',
    description: 'Shop with confidence. All transactions are secure, and software is sourced directly from verified vendors.'
  },
  {
    icon: <ZapIcon className="w-12 h-12 text-yellow-400" />,
    title: 'Instant Digital Delivery',
    description: 'Get immediate access to your new tools. No waiting for shipping, just download and start creating.'
  }
];

export const CATEGORY_DESCRIPTIONS: { [key: string]: string } = {
  "🧠 AI & Automation Tools": "Tools that leverage artificial intelligence for automation, content generation, or workflow optimization.",
  "🎨 Design, Video & Creative Tools": "For design, presentation, video editing, and visual creation.",
  "💼 Productivity, Project Management & Collaboration": "Platforms that help teams organize tasks, meetings, and work processes.",
  "👨‍💻 Developer & Engineering Tools": "Tools for coding, software development, API management, and automation.",
  "📈 Marketing, Growth & SEO Tools": "Tools to grow, optimize, and analyze brand and marketing performance.",
  "📚 Education & Learning Platforms": "Learning and certification tools for upskilling in tech, business, and design.",
  "☁️ Cloud, Storage & Security": "Tools that ensure data safety, security, and hosting scalability.",
  "🧱 3D, CAD & Engineering Suites": "High-end design and simulation platforms for engineers, manufacturers, and product designers.",
  "♾️ Lifetime Access Tools": "Perpetual access licenses to professional-grade platforms."
};

export const CATEGORIES: string[] = Object.keys(CATEGORY_DESCRIPTIONS);
export const DURATIONS: string[] = ['All Durations', '1 Year', '6 Months', '3 Months', '2 Months', '1 Month', 'Lifetime'];

const rawToolData = [
  // AI & Automation Tools
  { category: "🧠 AI & Automation Tools", name: "PromptDrive.ai", description: "AI prompt management for teams", domain: "promptdrive.ai", duration: "1 Year" },
  { category: "🧠 AI & Automation Tools", name: "Devin AI", description: "Autonomous AI software engineer", domain: "cognition.ai", duration: "1 Year" },
  { category: "🧠 AI & Automation Tools", name: "Lovable (Pro)", description: "AI app builder from text prompts", domain: "lovable.dev", duration: "2 Months" },
  { category: "🧠 AI & Automation Tools", name: "Gamma AI (Pro)", description: "AI presentation & document creator", domain: "gamma.app", duration: "1 Year" },
  { category: "🧠 AI & Automation Tools", name: "Lex (Pro)", description: "AI writing assistant", domain: "lex.page", duration: "1 Year" },
  { category: "🧠 AI & Automation Tools", name: "Jasper AI (Pro)", description: "AI content and marketing copy generator", domain: "jasper.ai", duration: "1 Month" },
  { category: "🧠 AI & Automation Tools", name: "Jenni (Unlimited)", description: "Academic and research AI writer", domain: "jenni.ai", duration: "1 Month" },
  { category: "🧠 AI & Automation Tools", name: "Wordtune (Unlimited)", description: "AI writing improvement and rephrasing", domain: "wordtune.com", duration: "1 Month" },
  { category: "🧠 AI & Automation Tools", name: "Quillbot (Premium)", description: "AI paraphrasing & grammar correction", domain: "quillbot.com", duration: "1 Month" },
  { category: "🧠 AI & Automation Tools", name: "Originality.ai (Pro)", description: "AI & plagiarism detector", domain: "originality.ai", duration: "1 Month" },
  { category: "🧠 AI & Automation Tools", name: "Outbox AI (Agency Plus)", description: "AI-powered outreach automation", domain: "outbox.ai", duration: "1 Month" },
  { category: "🧠 AI & Automation Tools", name: "Trace (Pro / Trial)", description: "AI branding & logo generation", domain: "trace.com", duration: "3 Months" },
  { category: "🧠 AI & Automation Tools", name: "Humanic AI (Growth / Scale)", description: "AI-driven customer analytics", domain: "humanic.ai", duration: "1 Month" },
  { category: "🧠 AI & Automation Tools", name: "Famous.ai", description: "AI ad creative generator", domain: "famous.ai", duration: "1 Month" },
  { category: "🧠 AI & Automation Tools", name: "Ebookmaker.ai", description: "AI eBook generation tool", domain: "ebookmaker.ai", duration: "1 Month" },
  { category: "🧠 AI & Automation Tools", name: "Windsurf (Pro)", description: "AI-assisted coding environment", domain: "windsurf.dev", duration: "1 Month" },
  { category: "🧠 AI & Automation Tools", name: "Rork (Junior)", description: "Lightweight AI productivity assistant", domain: "rork.ai", duration: "1 Month" },
  { category: "🧠 AI & Automation Tools", name: "Cosine.sh (Pro)", description: "AI observability and analytics for developers", domain: "cosine.sh", duration: "1 Month" },
  { category: "🧠 AI & Automation Tools", name: "Vapi ($200 Credits)", description: "Voice AI for intelligent assistants", domain: "vapi.ai", duration: "1 Year" },
  { category: "🧠 AI & Automation Tools", name: "Deepgram AI (1199 Credits)", description: "AI speech-to-text and transcription", domain: "deepgram.com", duration: "1 Year" },
  { category: "🧠 AI & Automation Tools", name: "Gumloop (Solo)", description: "AI-powered no-code workflow automation", domain: "gumloop.com", duration: "1 Year" },
  { category: "🧠 AI & Automation Tools", name: "Wispr Flow (Pro)", description: "Voice-based AI workspace", domain: "wispr.xyz", duration: "1 Year" },
  { category: "🧠 AI & Automation Tools", name: "Granola (Business)", description: "AI meeting notes summarizer", domain: "granola.so", duration: "1 Year" },
  { category: "🧠 AI & Automation Tools", name: "Fireflies.ai (Pro / Business)", description: "AI meeting transcription & insights", domain: "fireflies.ai", duration: "1 Year" },
  { category: "🧠 AI & Automation Tools", name: "Otter.ai (Pro)", description: "AI meeting recorder & transcriber", domain: "otter.ai", duration: "1 Year" },
  { category: "🧠 AI & Automation Tools", name: "Augie Studio (Unlimited)", description: "AI video generation from text", domain: "augie.studio", duration: "1 Month" },
  
  // Design, Video & Creative Tools
  { category: "🎨 Design, Video & Creative Tools", name: "Adobe Creative Cloud (Pro Plus)", description: "Full suite for design, photo & video", domain: "adobe.com", duration: "1 Year" },
  { category: "🎨 Design, Video & Creative Tools", name: "Slidebean (Starter)", description: "AI-designed presentations & pitch decks", domain: "slidebean.com", duration: "1 Year" },
  { category: "🎨 Design, Video & Creative Tools", name: "Beautiful.ai (Pro)", description: "Smart presentation designer", domain: "beautiful.ai", duration: "1 Year" },
  { category: "🎨 Design, Video & Creative Tools", name: "Descript (Creator)", description: "Text-based audio/video editing", domain: "descript.com", duration: "1 Year" },
  { category: "🎨 Design, Video & Creative Tools", name: "Flixier (Pro)", description: "Cloud video editor for creators", domain: "flixier.com", duration: "1 Year" },
  { category: "🎨 Design, Video & Creative Tools", name: "Frame.io (Teams)", description: "Video collaboration & review platform", domain: "frame.io", duration: "3 Months" },
  { category: "🎨 Design, Video & Creative Tools", name: "Screenspace.io (Launch)", description: "Device mockup generator for app showcases", domain: "screenspace.io", duration: "1 Month" },
  { category: "🎨 Design, Video & Creative Tools", name: "Trace (Pro)", description: "AI branding & design tool", domain: "trace.com", duration: "3 Months" },
  { category: "🎨 Design, Video & Creative Tools", name: "Mobbin (Pro)", description: "UI/UX inspiration library", domain: "mobbin.com", duration: "1 Year" },
  { category: "🎨 Design, Video & Creative Tools", name: "Mermaid Chart (Pro)", description: "Diagram & flowchart generator", domain: "mermaidchart.com", duration: "1 Year" },
  { category: "🎨 Design, Video & Creative Tools", name: "Magic Patterns (Hobby)", description: "AI UI pattern & design generator", domain: "magicpatterns.com", duration: "1 Year" },
  { category: "🎨 Design, Video & Creative Tools", name: "PNGTree (Premium)", description: "Lifetime library of PNGs & design assets", domain: "pngtree.com", duration: "Lifetime" },
  { category: "🎨 Design, Video & Creative Tools", name: "Zeplin (Advanced)", description: "Design-to-development handoff platform", domain: "zeplin.io", duration: "1 Year" },
  { category: "🎨 Design, Video & Creative Tools", name: "3D Swymer + Suites", description: "Advanced 3D design, sculpting, and engineering", domain: "3ds.com", duration: "1 Year" },
  { category: "🎨 Design, Video & Creative Tools", name: "Tilda (Personal)", description: "No-code design website builder", domain: "tilda.cc", duration: "1 Year" },
  { category: "🎨 Design, Video & Creative Tools", name: "Pixpa (Pro)", description: "Portfolio & photography website builder", domain: "pixpa.com", duration: "6 Months" },
  { category: "🎨 Design, Video & Creative Tools", name: "Trace (Trial)", description: "AI visual branding", domain: "trace.com", duration: "1 Month" },
  { category: "🎨 Design, Video & Creative Tools", name: "Webflow (Growth)", description: "No-code web design & CMS platform", domain: "webflow.com", duration: "Lifetime" },

  // Productivity, Project Management & Collaboration
  { category: "💼 Productivity, Project Management & Collaboration", name: "ClickUp (Enterprise)", description: "Unified productivity & project management", domain: "clickup.com", duration: "1 Year" },
  { category: "💼 Productivity, Project Management & Collaboration", name: "Asana (Advanced)", description: "Workflow & project organization", domain: "asana.com", duration: "6 Months" },
  { category: "💼 Productivity, Project Management & Collaboration", name: "Linear (Business)", description: "Agile project tracking for software teams", domain: "linear.app", duration: "1 Year" },
  { category: "💼 Productivity, Project Management & Collaboration", name: "Notion Business + AI", description: "All-in-one workspace for docs, databases, and AI notes", domain: "notion.so", duration: "6 Months" },
  { category: "💼 Productivity, Project Management & Collaboration", name: "Miro (Starter / Business)", description: "Collaborative online whiteboard", domain: "miro.com", duration: "1 Year" },
  { category: "💼 Productivity, Project Management & Collaboration", name: "Cal.com (Teams)", description: "Scheduling & booking automation", domain: "cal.com", duration: "1 Year" },
  { category: "💼 Productivity, Project Management & Collaboration", name: "Superhuman (Starter)", description: "Fast, AI-powered email client", domain: "superhuman.com", duration: "1 Year" },
  { category: "💼 Productivity, Project Management & Collaboration", name: "Raycast (Pro)", description: "macOS productivity launcher", domain: "raycast.com", duration: "1 Year" },
  { category: "💼 Productivity, Project Management & Collaboration", name: "Neo.space (Starter Bundle)", description: "Unified AI workspace for teams", domain: "neo.space", duration: "1 Year" },
  { category: "💼 Productivity, Project Management & Collaboration", name: "Bitwarden (Premium)", description: "Password management & security", domain: "bitwarden.com", duration: "1 Year" },
  { category: "💼 Productivity, Project Management & Collaboration", name: "Requestly (Pro)", description: "Network debugging and modification tool", domain: "requestly.io", duration: "6 Months" },
  { category: "💼 Productivity, Project Management & Collaboration", name: "Fabrile (Teams)", description: "Design asset and brand management", domain: "fabrile.com", duration: "1 Month" },
  { category: "💼 Productivity, Project Management & Collaboration", name: "Typefully (Creator / Team)", description: "Content scheduling for Twitter/X", domain: "typefully.com", duration: "1 Month" },
  { category: "💼 Productivity, Project Management & Collaboration", name: "LinkedIn Premium", description: "Professional productivity & career networking", domain: "linkedin.com", duration: "3 Months" },
  
  // Developer & Engineering Tools
  { category: "👨‍💻 Developer & Engineering Tools", name: "Postman (Basic)", description: "API building and testing suite", domain: "postman.com", duration: "1 Year" },
  { category: "👨‍💻 Developer & Engineering Tools", name: "Replit (Core)", description: "Collaborative cloud coding IDE", domain: "replit.com", duration: "1 Year" },
  { category: "👨‍💻 Developer & Engineering Tools", name: "CodeRabbit (Pro / Trial)", description: "AI code review and analysis", domain: "coderabbit.ai", duration: "2 Months" },
  { category: "👨‍💻 Developer & Engineering Tools", name: "Warp (Pro)", description: "Next-gen terminal for developers", domain: "warp.dev", duration: "1 Year" },
  { category: "👨‍💻 Developer & Engineering Tools", name: "Expo.dev (Starter)", description: "React Native development toolkit", domain: "expo.dev", duration: "1 Month" },
  { category: "👨‍💻 Developer & Engineering Tools", name: "JetBrains All Products (Edu)", description: "Complete developer tool suite", domain: "jetbrains.com", duration: "1 Year" },
  { category: "👨‍💻 Developer & Engineering Tools", name: "Make.com (Team)", description: "Visual workflow and API integration builder", domain: "make.com", duration: "1 Year" },
  { category: "👨‍💻 Developer & Engineering Tools", name: "N8N (Starter)", description: "Automation and data workflow builder", domain: "n8n.io", duration: "1 Year" },
  { category: "👨‍💻 Developer & Engineering Tools", name: "AWS ($100 Credits)", description: "Cloud computing infrastructure", domain: "aws.amazon.com" },
  { category: "👨‍💻 Developer & Engineering Tools", name: "Confluent Cloud ($2000 Credit)", description: "Real-time event streaming with Kafka", domain: "confluent.io" },
  { category: "👨‍💻 Developer & Engineering Tools", name: "Sentry.io (Teams)", description: "Application error tracking and monitoring", domain: "sentry.io", duration: "6 Months" },
  { category: "👨‍💻 Developer & Engineering Tools", name: "Phantombuster (Starter)", description: "Automation & scraping for developers", domain: "phantombuster.com", duration: "1 Month" },
  { category: "👨‍💻 Developer & Engineering Tools", name: "Dev.to (Plus Plus)", description: "Developer community & publishing hub", domain: "dev.to", duration: "1 Month" },
  { category: "👨‍💻 Developer & Engineering Tools", name: "Microsoft Office 365 (A1)", description: "Productivity suite for documentation", domain: "microsoft.com", duration: "Lifetime" },
  { category: "👨‍💻 Developer & Engineering Tools", name: "3DEXPERIENCE SOLIDWORKS + Suites", description: "CAD, CAM, and design collaboration tools", domain: "solidworks.com", duration: "1 Year" },
  { category: "👨‍💻 Developer & Engineering Tools", name: "3D Swymer Variants", description: "Engineering and manufacturing suites", domain: "3ds.com", duration: "1 Year" },

  // Marketing, Growth & SEO Tools
  { category: "📈 Marketing, Growth & SEO Tools", name: "Keyword Hero (Ultimate Hero)", description: "Unlocks hidden Google keyword data", domain: "keyword-hero.com", duration: "6 Months" },
  { category: "📈 Marketing, Growth & SEO Tools", name: "Hootsuite (Standard)", description: "Social media scheduling & analytics", domain: "hootsuite.com", duration: "3 Months" },
  { category: "📈 Marketing, Growth & SEO Tools", name: "Later for Reddit (Creator)", description: "Reddit post scheduling & management", domain: "later.com", duration: "1 Month" },
  { category: "📈 Marketing, Growth & SEO Tools", name: "Creator Hooks Pro", description: "AI-based content ideas from trending topics", domain: "creatorhooks.com", duration: "1 Month" },
  { category: "📈 Marketing, Growth & SEO Tools", name: "Full Enrich (Pro)", description: "Contact & lead enrichment platform", domain: "fullenrich.com", duration: "1 Month" },
  { category: "📈 Marketing, Growth & SEO Tools", name: "Scalelist (Scaler 3000 Credits)", description: "B2B lead generation and prospecting", domain: "scalelist.com", duration: "1 Month" },
  { category: "📈 Marketing, Growth & SEO Tools", name: "Viral Launch (Core / Growth)", description: "Amazon seller analytics & optimization", domain: "viral-launch.com", duration: "1 Month" },
  { category: "📈 Marketing, Growth & SEO Tools", name: "Enginemailer (Free Forever)", description: "Email marketing and campaign automation", domain: "enginemailer.com", duration: "Lifetime" },
  
  // Education & Learning Platforms
  { category: "📚 Education & Learning Platforms", name: "DataCamp (Premium)", description: "Learn data science, Python, R, and ML", domain: "datacamp.com", duration: "1 Year" },
  { category: "📚 Education & Learning Platforms", name: "No Code MBA (Unlimited)", description: "Learn no-code app & business building", domain: "nocode.mba", duration: "1 Year" },
  { category: "📚 Education & Learning Platforms", name: "Whizlabs (Premium Plus)", description: "Cloud, DevOps, and IT certification prep", domain: "whizlabs.com", duration: "1 Month" },
  { category: "📚 Education & Learning Platforms", name: "JetBrains Edu Pack", description: "Developer education tools", domain: "jetbrains.com", duration: "1 Year" },
  { category: "📚 Education & Learning Platforms", name: "Kickresume (Premium)", description: "Resume-building and career education", domain: "kickresume.com", duration: "1 Month" },
  { category: "📚 Education & Learning Platforms", name: "Paperpal (Prime)", description: "Academic proofreading and writing enhancement", domain: "paperpal.com", duration: "1 Month" },

  // Cloud, Storage & Security
  { category: "☁️ Cloud, Storage & Security", name: "Backblaze (Unlimited)", description: "Cloud storage & backup", domain: "backblaze.com", duration: "1 Year" },
  { category: "☁️ Cloud, Storage & Security", name: "Bitwarden (Family / Premium)", description: "Password & credential security", domain: "bitwarden.com", duration: "1 Year" },
  { category: "☁️ Cloud, Storage & Security", name: "Cloudinary (Plus)", description: "Cloud media management", domain: "cloudinary.com", duration: "1 Month" },
  { category: "☁️ Cloud, Storage & Security", name: "ImageKit.io (Pro)", description: "Image optimization and CDN delivery", domain: "imagekit.io", duration: "1 Month" },
  
  // 3D, CAD & Engineering Suites
  { category: "🧱 3D, CAD & Engineering Suites", name: "3D Swymer + Creator + Collaborative Industry Innovator", description: "Offers CAD modeling, 3D visualization, simulation, and manufacturing integration tools.", domain: "3ds.com", duration: "1 Year" },
  { category: "🧱 3D, CAD & Engineering Suites", name: "3D Swymer + Sculptor + Collaborative Industry Innovator", description: "Offers CAD modeling, 3D visualization, simulation, and manufacturing integration tools.", domain: "3ds.com", duration: "1 Year" },
  { category: "🧱 3D, CAD & Engineering Suites", name: "3DEXPERIENCE SOLIDWORKS Pro + Swymer + Collaborative Industry Innovator", description: "Offers CAD modeling, 3D visualization, simulation, and manufacturing integration tools.", domain: "solidworks.com", duration: "1 Year" },
  { category: "🧱 3D, CAD & Engineering Suites", name: "3D Swymer + Collaborative Industry Innovator", description: "Offers CAD modeling, 3D visualization, simulation, and manufacturing integration tools.", domain: "3ds.com", duration: "1 Year" },
  { category: "🧱 3D, CAD & Engineering Suites", name: "3D Swymer + NC Shop Floor Programmer + Collaborative Industry Innovator", description: "Offers CAD modeling, 3D visualization, simulation, and manufacturing integration tools.", domain: "3ds.com", duration: "1 Year" },
  { category: "🧱 3D, CAD & Engineering Suites", name: "3D Swymer + Creator + Sculptor + NC Shop Floor Programmer + SOLIDWORKS Professional", description: "Offers CAD modeling, 3D visualization, simulation, and manufacturing integration tools.", domain: "solidworks.com", duration: "1 Year" },

  // Lifetime Access Tools
  { category: "♾️ Lifetime Access Tools", name: "Rezi AI (Lifetime)", description: "AI resume optimizer", domain: "rezi.ai", duration: "Lifetime" },
  { category: "♾️ Lifetime Access Tools", name: "Microsoft Office 365 (A1 License)", description: "Lifetime productivity suite", domain: "microsoft.com", duration: "Lifetime" },
  { category: "♾️ Lifetime Access Tools", name: "The-BitHub.com (Elite)", description: "Premium development resource repository", domain: "the-bithub.com", duration: "Lifetime" },
  
  // Special handling for tools in multiple categories
  { category: "📈 Marketing, Growth & SEO Tools", name: "Humanic AI", description: "Growth and customer journey analytics", domain: "humanic.ai", duration: "1 Month" },
  { category: "📈 Marketing, Growth & SEO Tools", name: "Famous.ai", description: "AI-powered ad and landing page creation", domain: "famous.ai", duration: "1 Month" },
  { category: "📈 Marketing, Growth & SEO Tools", name: "Outbox AI", description: "AI sales outreach automation", domain: "outbox.ai", duration: "1 Month" },
  { category: "☁️ Cloud, Storage & Security", name: "AWS ($100 Credits)", description: "Cloud computing services", domain: "aws.amazon.com" },
  { category: "☁️ Cloud, Storage & Security", name: "Confluent Cloud ($2000 Credit)", description: "Managed Kafka for data streaming", domain: "confluent.io" },
  { category: "☁️ Cloud, Storage & Security", name: "Enginemailer (Free Forever)", description: "Email infrastructure for campaigns", domain: "enginemailer.com", duration: "Lifetime" },
  { category: "♾️ Lifetime Access Tools", name: "Enginemailer (Free Forever)", description: "Email automation with lifetime credits", domain: "enginemailer.com", duration: "Lifetime" },
];

const nameDescriptionMap = new Map();
rawToolData.forEach(tool => {
  if (!nameDescriptionMap.has(tool.name)) {
    nameDescriptionMap.set(tool.name, tool.description);
  }
});

const getCombinedDescription = (tool: any) => {
  let finalDescription = tool.description;
  const oldDescription = nameDescriptionMap.get(tool.name);
  if (oldDescription && oldDescription !== tool.description) {
     finalDescription = `${tool.description}. ${oldDescription}`;
  }
  return finalDescription;
}

const fullToolData = [
  ...rawToolData,
  { category: "💼 Productivity, Project Management & Collaboration", name: "Granola (Business)", description: "Smart meeting notes", domain: "granola.so", duration: "1 Year" },
  { category: "💼 Productivity, Project Management & Collaboration", name: "Backblaze (Unlimited)", description: "Cloud data backup", domain: "backblaze.com", duration: "1 Year" },
  { category: "💼 Productivity, Project Management & Collaboration", name: "Zoom (Pro)", domain: "zoom.us", nameOverride: "Zoom (Pro)", descriptionOverride: "A reliable cloud platform for video and audio conferencing, collaboration, chat, and webinars.", imageUrlOverride: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Zoom_logo.svg", duration: "1 Year" },
  { category: "💼 Productivity, Project Management & Collaboration", name: "Linear (Basic)", description: "A streamlined project management tool for modern software teams to track issues, manage sprints, and build momentum.", domain: "linear.app", duration: "1 Year" },
  { category: "💼 Productivity, Project Management & Collaboration", name: "Airtable (Teams / Business Trial)", description: "A hybrid database and spreadsheet tool for managing projects, data, and workflows collaboratively.", domain: "airtable.com", duration: "1 Month" },
];


// FIX: Explicitly type sort arguments as 'any' to handle the mixed-shape objects within 'fullToolData'.
export const TOOLS: Tool[] = fullToolData
  .sort((a: any, b: any) => (a.nameOverride || a.name).localeCompare(b.nameOverride || b.name))
  .map((tool: any) => {
    const name = tool.nameOverride || tool.name;
    return {
      name: name,
      category: tool.category,
      imageUrl: tool.imageUrlOverride || `https://logo.clearbit.com/${tool.domain}`,
      description: tool.descriptionOverride || getCombinedDescription(tool) || `Discover the powerful features of ${name}, a top-tier solution designed to enhance your workflow and boost productivity.`,
      duration: tool.duration,
    }
});
