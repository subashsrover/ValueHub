
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
  "🎮 Streaming & Entertainment": "Premium entertainment services for gaming, movies, and media.",
  "♾️ Lifetime Access Tools": "Perpetual access licenses to professional-grade platforms."
};

export const CATEGORIES: string[] = Object.keys(CATEGORY_DESCRIPTIONS);
export const DURATIONS: string[] = ['All Durations', '1 Year', '6 Months', '3 Months', '2 Months', '1 Month', 'Lifetime'];

export const TAGS: string[] = ['All Tags', 'Universal', 'Fast Moving', 'Featured', 'New'];

export const TAG_COLORS: { [key: string]: string } = {
  'Universal': 'bg-blue-500 text-white',
  'Fast Moving': 'bg-orange-500 text-white',
  'Featured': 'bg-purple-500 text-white',
  'New': 'bg-green-500 text-white',
};


const rawToolData = [
  // AI & Automation Tools
  { category: "🧠 AI & Automation Tools", name: "PromptDrive.ai", description: "AI prompt management for teams", domain: "promptdrive.ai", duration: "1 Year", tags: ['New'], originalPrice: 120, offerPrice: 49 },
  { category: "🧠 AI & Automation Tools", name: "Devin AI", description: "Autonomous AI software engineer", domain: "cognition.ai", duration: "1 Year", tags: ['Fast Moving', 'New'], originalPrice: 240, offerPrice: 120, imageUrlOverride: 'https://cognition-labs-site.vercel.app/logo-black.png' },
  { category: "🧠 AI & Automation Tools", name: "Lovable (Pro)", description: "AI app builder from text prompts", domain: "lovable.dev", duration: "2 Months", originalPrice: 98, offerPrice: 39, imageUrlOverride: 'https://lovable.dev/lovable-logo-wordmark.svg' },
  { category: "🧠 AI & Automation Tools", name: "Lovable (Pro - 1 Year)", description: "AI app builder from text prompts", domain: "lovable.dev", duration: "1 Year", originalPrice: 480, offerPrice: 69, imageUrlOverride: 'https://lovable.dev/lovable-logo-wordmark.svg' },
  { category: "🧠 AI & Automation Tools", name: "Gamma AI (Pro)", description: "AI presentation & document creator", domain: "gamma.app", duration: "1 Year", tags: ['Featured'], originalPrice: 240, offerPrice: 59, imageUrlOverride: 'https://gamma.app/gamma-logo.svg' },
  { category: "🧠 AI & Automation Tools", name: "Lex (Pro)", description: "AI writing assistant", domain: "lex.page", duration: "1 Year", originalPrice: 100, offerPrice: 49, imageUrlOverride: 'https://lex.page/images/logo-dark-mode.svg' },
  { category: "🧠 AI & Automation Tools", name: "Jasper AI (Pro)", description: "AI content and marketing copy generator", domain: "jasper.ai", duration: "1 Month", tags: ['Fast Moving'], originalPrice: 99, offerPrice: 49, imageUrlOverride: 'https://uploads-ssl.webflow.com/6358203035880a184c8a2985/6358203035880a06e58a2a08_jasper-logo-purple.svg' },
  { category: "🧠 AI & Automation Tools", name: "Jenni (Unlimited)", description: "Academic and research AI writer", domain: "jenni.ai", duration: "1 Month", originalPrice: 20, offerPrice: 12, imageUrlOverride: 'https://jenni.ai/images/logo.svg' },
  { category: "🧠 AI & Automation Tools", name: "Wordtune (Unlimited)", description: "AI writing improvement and rephrasing", domain: "wordtune.com", duration: "1 Month", originalPrice: 25, offerPrice: 10, imageUrlOverride: 'https://www.wordtune.com/images/wordtune_logo_new.svg' },
  { category: "🧠 AI & Automation Tools", name: "Quillbot (Premium)", description: "AI paraphrasing & grammar correction", domain: "quillbot.com", duration: "1 Month", originalPrice: 20, offerPrice: 8, imageUrlOverride: 'https://quillbot.com/images/logos/light-mode-logo.svg' },
  { category: "🧠 AI & Automation Tools", name: "Originality.ai (Pro)", description: "AI & plagiarism detector", domain: "originality.ai", duration: "1 Month", originalPrice: 15, offerPrice: 9, imageUrlOverride: 'https://global-uploads.webflow.com/6373705786427b385208290f/6373705786427b409c082937_OAI%20Logo.svg' },
  { category: "🧠 AI & Automation Tools", name: "Originality.ai ($30 Credits)", description: "AI & plagiarism detector credits", domain: "originality.ai", duration: "One Time", originalPrice: 30, offerPrice: 15, imageUrlOverride: 'https://global-uploads.webflow.com/6373705786427b385208290f/6373705786427b409c082937_OAI%20Logo.svg' },
  { category: "🧠 AI & Automation Tools", name: "Outbox AI (Agency Plus)", description: "AI-powered outreach automation", domain: "outbox.ai", duration: "1 Month", originalPrice: 149, offerPrice: 75 },
  { category: "🧠 AI & Automation Tools", name: "Trace (Pro / Trial)", description: "AI branding & logo generation", domain: "trace.com", duration: "3 Months", originalPrice: 60, offerPrice: 29, imageUrlOverride: 'https://assets-global.website-files.com/64b18974e89f1b202575b61f/64b54e0b57732a3934d4719e_logo-dark.svg' },
  { category: "🧠 AI & Automation Tools", name: "Humanic AI (Growth / Scale)", description: "AI-driven customer analytics", domain: "humanic.ai", duration: "1 Month", originalPrice: 299, offerPrice: 149 },
  { category: "🧠 AI & Automation Tools", name: "Famous.ai", description: "AI ad creative generator", domain: "famous.ai", duration: "1 Month", originalPrice: 79, offerPrice: 39, imageUrlOverride: 'https://famous.ai/wp-content/uploads/2023/10/logo.svg' },
  { category: "🧠 AI & Automation Tools", name: "Ebookmaker.ai", description: "AI eBook generation tool", domain: "ebookmaker.ai", duration: "1 Month", originalPrice: 29, offerPrice: 15 },
  { category: "🧠 AI & Automation Tools", name: "Windsurf (Pro)", description: "AI-assisted coding environment", domain: "windsurf.dev", duration: "1 Month", originalPrice: 20, offerPrice: 10 },
  { category: "🧠 AI & Automation Tools", name: "Rork (Junior)", description: "Lightweight AI productivity assistant", domain: "rork.ai", duration: "1 Month", originalPrice: 10, offerPrice: 5 },
  { category: "🧠 AI & Automation Tools", name: "Cosine.sh (Pro)", description: "AI observability and analytics for developers", domain: "cosine.sh", duration: "1 Month", originalPrice: 50, offerPrice: 25 },
  { category: "🧠 AI & Automation Tools", name: "Vapi ($200 Credits)", description: "Voice AI for intelligent assistants", domain: "vapi.ai", duration: "1 Year", tags: ['New'], originalPrice: 200, offerPrice: 50 },
  { category: "🧠 AI & Automation Tools", name: "Deepgram AI (1199 Credits)", description: "AI speech-to-text and transcription", domain: "deepgram.com", duration: "1 Year", originalPrice: 1199, offerPrice: 300, imageUrlOverride: 'https://static.deepgram.com/static/images/logo-deepgram.svg' },
  { category: "🧠 AI & Automation Tools", name: "Gumloop (Solo)", description: "AI-powered no-code workflow automation", domain: "gumloop.com", duration: "1 Year", originalPrice: 240, offerPrice: 120 },
  { category: "🧠 AI & Automation Tools", name: "Wispr Flow (Pro)", description: "Voice-based AI workspace", domain: "wispr.xyz", duration: "1 Year", originalPrice: 120, offerPrice: 60 },
  { category: "🧠 AI & Automation Tools", name: "Granola (Business)", description: "AI meeting notes summarizer", domain: "granola.so", duration: "1 Year", originalPrice: 180, offerPrice: 89 },
  { category: "🧠 AI & Automation Tools", name: "Fireflies.ai (Pro / Business)", description: "AI meeting transcription & insights", domain: "fireflies.ai", duration: "1 Year", tags: ['Fast Moving'], originalPrice: 216, offerPrice: 108, imageUrlOverride: 'https://fireflies.ai/images/logo-icon.svg' },
  { category: "🧠 AI & Automation Tools", name: "Otter.ai (Pro)", description: "AI meeting recorder & transcriber", domain: "otter.ai", duration: "1 Year", originalPrice: 200, offerPrice: 100, imageUrlOverride: 'https://otter.ai/images/logomark-color.svg' },
  { category: "🧠 AI & Automation Tools", name: "Augie Studio (Unlimited)", description: "AI video generation from text", domain: "augie.studio", duration: "1 Month", originalPrice: 49, offerPrice: 25 },
  { category: "🧠 AI & Automation Tools", name: "ElevenLabs (Creator)", description: "AI voice generator and text-to-speech", domain: "elevenlabs.io", duration: "3 Months", originalPrice: 66, offerPrice: 29 },
  { category: "🧠 AI & Automation Tools", name: "Gemini (Advanced)", description: "Google's most capable AI model", domain: "deepmind.google", duration: "1 Year", originalPrice: 240, offerPrice: 120, imageUrlOverride: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg" },
  { category: "🧠 AI & Automation Tools", name: "Google AI Ultra", description: "Access to Google's most capable AI models", domain: "google.com", duration: "1 Month", originalPrice: 20, offerPrice: 10 },
  { category: "🧠 AI & Automation Tools", name: "Perplexity (Pro)", description: "AI-powered answer engine", domain: "perplexity.ai", duration: "1 Year", tags: ['Featured'], originalPrice: 240, offerPrice: 9.99 },
  { category: "🧠 AI & Automation Tools", name: "ChatPRD (Pro)", description: "AI for Product Managers", domain: "chatprd.ai", duration: "1 Year", originalPrice: 240, offerPrice: 120 },

  // Design, Video & Creative Tools
  { category: "🎨 Design, Video & Creative Tools", name: "Adobe Creative Cloud (Pro Plus)", description: "Full suite for design, photo & video", domain: "adobe.com", duration: "1 Year", tags: ['Universal', 'Featured'], originalPrice: 600, offerPrice: 49, imageUrlOverride: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Adobe_Creative_Cloud_Logo.svg' },
  { category: "🎨 Design, Video & Creative Tools", name: "Slidebean (Starter)", description: "AI-designed presentations & pitch decks", domain: "slidebean.com", duration: "1 Year", originalPrice: 96, offerPrice: 48, imageUrlOverride: 'https://assets-global.website-files.com/593976453483986522037358/593976453483986522037361_Slidebean-logo.svg' },
  { category: "🎨 Design, Video & Creative Tools", name: "Beautiful.ai (Pro)", description: "Smart presentation designer", domain: "beautiful.ai", duration: "1 Year", originalPrice: 144, offerPrice: 72, imageUrlOverride: 'https://www.beautiful.ai/static-assets/images/logo-black.svg' },
  { category: "🎨 Design, Video & Creative Tools", name: "Descript (Creator)", description: "Text-based audio/video editing", domain: "descript.com", duration: "1 Year", originalPrice: 144, offerPrice: 72, imageUrlOverride: 'https://www.descript.com/logo.svg' },
  { category: "🎨 Design, Video & Creative Tools", name: "Flixier (Pro)", description: "Cloud video editor for creators", domain: "flixier.com", duration: "1 Year", originalPrice: 360, offerPrice: 180, imageUrlOverride: 'https://flixier.com/images/logo/flixier_logo.svg' },
  { category: "🎨 Design, Video & Creative Tools", name: "Frame.io (Teams)", description: "Video collaboration & review platform", domain: "frame.io", duration: "3 Months", originalPrice: 75, offerPrice: 37, imageUrlOverride: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Frame.io_logo.svg' },
  { category: "🎨 Design, Video & Creative Tools", name: "Screenspace.io (Launch)", description: "Device mockup generator for app showcases", domain: "screenspace.io", duration: "1 Month", originalPrice: 19, offerPrice: 9 },
  { category: "🎨 Design, Video & Creative Tools", name: "Trace (Pro)", description: "AI branding & design tool", domain: "trace.com", duration: "3 Months", originalPrice: 60, offerPrice: 30, imageUrlOverride: 'https://assets-global.website-files.com/64b18974e89f1b202575b61f/64b54e0b57732a3934d4719e_logo-dark.svg' },
  { category: "🎨 Design, Video & Creative Tools", name: "Mobbin (Pro)", description: "UI/UX inspiration library", domain: "mobbin.com", duration: "1 Year", tags: ['Featured'], originalPrice: 96, offerPrice: 48, imageUrlOverride: 'https://mobbin.com/static/images/logo.svg' },
  { category: "🎨 Design, Video & Creative Tools", name: "Mermaid Chart (Pro)", description: "Diagram & flowchart generator", domain: "mermaidchart.com", duration: "1 Year", originalPrice: 120, offerPrice: 60 },
  { category: "🎨 Design, Video & Creative Tools", name: "Magic Patterns (Hobby)", description: "AI UI pattern & design generator", domain: "magicpatterns.com", duration: "1 Year", originalPrice: 100, offerPrice: 50 },
  { category: "🎨 Design, Video & Creative Tools", name: "PNGTree (Premium)", description: "Lifetime library of PNGs & design assets", domain: "pngtree.com", duration: "Lifetime", originalPrice: 199, offerPrice: 89, imageUrlOverride: 'https://pngtree.com/static/2023/images/logo/pngtree-logo.png' },
  { category: "🎨 Design, Video & Creative Tools", name: "Zeplin (Advanced)", description: "Design-to-development handoff platform", domain: "zeplin.io", duration: "1 Year", originalPrice: 144, offerPrice: 72, imageUrlOverride: 'https://uploads-ssl.webflow.com/636df0179978a3424d8544a0/636df0179978a34a948544d6_Logo.svg' },
  { category: "🎨 Design, Video & Creative Tools", name: "3D Swymer + Suites", description: "Advanced 3D design, sculpting, and engineering", domain: "3ds.com", duration: "1 Year", originalPrice: 2500, offerPrice: 1250, imageUrlOverride: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Dassault_Syst%C3%A8mes_logo.svg' },
  { category: "🎨 Design, Video & Creative Tools", name: "Tilda (Personal)", description: "No-code design website builder", domain: "tilda.cc", duration: "1 Year", originalPrice: 120, offerPrice: 60, imageUrlOverride: 'https://tilda.cc/img/tildacopy_black.png' },
  { category: "🎨 Design, Video & Creative Tools", name: "Pixpa (Pro)", description: "Portfolio & photography website builder", domain: "pixpa.com", duration: "6 Months", originalPrice: 150, offerPrice: 75, imageUrlOverride: 'https://www.pixpa.com/images/pixpa-logo-black.svg' },
  { category: "🎨 Design, Video & Creative Tools", name: "Trace (Trial)", description: "AI visual branding", domain: "trace.com", duration: "1 Month", originalPrice: 20, offerPrice: 10, imageUrlOverride: 'https://assets-global.website-files.com/64b18974e89f1b202575b61f/64b54e0b57732a3934d4719e_logo-dark.svg' },
  { category: "🎨 Design, Video & Creative Tools", name: "Webflow (Growth)", description: "No-code web design & CMS platform", domain: "webflow.com", duration: "Lifetime", tags: ['Fast Moving'], originalPrice: 500, offerPrice: 249, imageUrlOverride: 'https://assets-global.website-files.com/62e123246995c9284223406f/62e123246995c91b5c2340b0_webflow-logo.svg' },
  { category: "🎨 Design, Video & Creative Tools", name: "CapCut (Pro)", description: "All-in-one video editor", domain: "capcut.com", duration: "6 Months", originalPrice: 60, offerPrice: 29 },
  { category: "🎨 Design, Video & Creative Tools", name: "Canva (Pro)", description: "Design anything. Publish anywhere.", domain: "canva.com", duration: "1 Year", tags: ['Fast Moving'], originalPrice: 120, offerPrice: 15 },
  { category: "🎨 Design, Video & Creative Tools", name: "Freepik (Essential)", description: "High-quality vectors, photos, and PSDs", domain: "freepik.com", duration: "1 Year", originalPrice: 144, offerPrice: 69 },

  // Productivity, Project Management & Collaboration
  { category: "💼 Productivity, Project Management & Collaboration", name: "ClickUp (Enterprise)", description: "Unified productivity & project management", domain: "clickup.com", duration: "1 Year", tags: ['Universal', 'Fast Moving'], originalPrice: 348, offerPrice: 174, imageUrlOverride: 'https://clickup.com/images/brand-assets/logo-symbol.svg' },
  { category: "💼 Productivity, Project Management & Collaboration", name: "Asana (Advanced)", description: "Workflow & project organization", domain: "asana.com", duration: "6 Months", originalPrice: 150, offerPrice: 75, imageUrlOverride: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Asana_Logo.svg' },
  { category: "💼 Productivity, Project Management & Collaboration", name: "Linear (Business)", description: "Agile project tracking for software teams", domain: "linear.app", duration: "1 Year", tags: ['Featured'], originalPrice: 120, offerPrice: 60, imageUrlOverride: 'https://cdn.worldvectorlogo.com/logos/linear-1.svg' },
  { category: "💼 Productivity, Project Management & Collaboration", name: "Notion Business + AI", description: "All-in-one workspace for docs, databases, and AI notes", domain: "notion.so", duration: "6 Months", tags: ['Universal', 'Featured'], originalPrice: 108, offerPrice: 54, imageUrlOverride: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png' },
  { category: "💼 Productivity, Project Management & Collaboration", name: "Miro (Starter / Business)", description: "Collaborative online whiteboard", domain: "miro.com", duration: "1 Year", originalPrice: 192, offerPrice: 96, imageUrlOverride: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Miro_logo.svg' },
  { category: "💼 Productivity, Project Management & Collaboration", name: "Cal.com (Teams)", description: "Scheduling & booking automation", domain: "cal.com", duration: "1 Year", originalPrice: 144, offerPrice: 72, imageUrlOverride: 'https://cal.com/logo-white.svg' },
  { category: "💼 Productivity, Project Management & Collaboration", name: "Superhuman (Starter)", description: "Fast, AI-powered email client", domain: "superhuman.com", duration: "1 Year", tags: ['Fast Moving'], originalPrice: 360, offerPrice: 180, imageUrlOverride: 'https://superhuman.com/images/logo-wordmark.svg' },
  { category: "💼 Productivity, Project Management & Collaboration", name: "Raycast (Pro)", description: "macOS productivity launcher", domain: "raycast.com", duration: "1 Year", originalPrice: 96, offerPrice: 48, imageUrlOverride: 'https://www.raycast.com/media/logo_raycast.png' },
  { category: "💼 Productivity, Project Management & Collaboration", name: "Neo.space (Starter Bundle)", description: "Unified AI workspace for teams", domain: "neo.space", duration: "1 Year", originalPrice: 120, offerPrice: 60 },
  { category: "💼 Productivity, Project Management & Collaboration", name: "Bitwarden (Premium)", description: "Password management & security", domain: "bitwarden.com", duration: "1 Year", tags: ['Universal'], originalPrice: 10, offerPrice: 5, imageUrlOverride: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Bitwarden_Logo.svg' },
  { category: "💼 Productivity, Project Management & Collaboration", name: "Requestly (Pro)", description: "Network debugging and modification tool", domain: "requestly.io", duration: "6 Months", originalPrice: 72, offerPrice: 36, imageUrlOverride: 'https://requestly.io/wp-content/uploads/2022/10/logo-dark-1.svg' },
  { category: "💼 Productivity, Project Management & Collaboration", name: "Fabrile (Teams)", description: "Design asset and brand management", domain: "fabrile.com", duration: "1 Month", originalPrice: 25, offerPrice: 12 },
  { category: "💼 Productivity, Project Management & Collaboration", name: "Typefully (Creator / Team)", description: "Content scheduling for Twitter/X", domain: "typefully.com", duration: "1 Month", originalPrice: 19, offerPrice: 9, imageUrlOverride: 'https://typefully.com/_next/static/media/logo.333cb411.svg' },
  { category: "💼 Productivity, Project Management & Collaboration", name: "LinkedIn Premium", description: "Professional productivity & career networking", domain: "linkedin.com", duration: "3 Months", originalPrice: 89, offerPrice: 44, imageUrlOverride: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png' },
  { category: "💼 Productivity, Project Management & Collaboration", name: "LinkedIn Business (Premium)", description: "Business insights and unlimited browsing", domain: "linkedin.com", duration: "3 Months", originalPrice: 180, offerPrice: 90, imageUrlOverride: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png' },
  { category: "💼 Productivity, Project Management & Collaboration", name: "LinkedIn Business (Premium)", description: "Business insights and unlimited browsing", domain: "linkedin.com", duration: "1 Year", originalPrice: 720, offerPrice: 299, imageUrlOverride: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png' },
  { category: "💼 Productivity, Project Management & Collaboration", name: "LinkedIn Career (Premium)", description: "Get hired faster with featured applicant status", domain: "linkedin.com", duration: "3 Months", originalPrice: 120, offerPrice: 60, imageUrlOverride: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png' },
  { category: "💼 Productivity, Project Management & Collaboration", name: "LinkedIn Career (Premium)", description: "Get hired faster with featured applicant status", domain: "linkedin.com", duration: "6 Months", originalPrice: 240, offerPrice: 110, imageUrlOverride: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png' },
  { category: "💼 Productivity, Project Management & Collaboration", name: "Grammarly (Premium)", description: "Advanced writing assistance", domain: "grammarly.com", duration: "1 Year", originalPrice: 144, offerPrice: 79 },

  // Developer & Engineering Tools
  { category: "👨‍💻 Developer & Engineering Tools", name: "Postman (Basic)", description: "API building and testing suite", domain: "postman.com", duration: "1 Year", tags: ['Universal'], originalPrice: 168, offerPrice: 84, imageUrlOverride: 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg' },
  { category: "👨‍💻 Developer & Engineering Tools", name: "Replit (Core)", description: "Collaborative cloud coding IDE", domain: "replit.com", duration: "1 Year", originalPrice: 240, offerPrice: 120, imageUrlOverride: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Replit_logo.svg' },
  { category: "👨‍💻 Developer & Engineering Tools", name: "CodeRabbit (Pro / Trial)", description: "AI code review and analysis", domain: "coderabbit.ai", duration: "2 Months", tags: ['New'], originalPrice: 24, offerPrice: 12, imageUrlOverride: 'https://coderabbit.ai/logo-with-text.svg' },
  { category: "👨‍💻 Developer & Engineering Tools", name: "Warp (Pro)", description: "Next-gen terminal for developers", domain: "warp.dev", duration: "1 Year", originalPrice: 144, offerPrice: 49, imageUrlOverride: 'https://www.warp.dev/images/logo.svg' },
  { category: "👨‍💻 Developer & Engineering Tools", name: "Expo.dev (Starter)", description: "React Native development toolkit", domain: "expo.dev", duration: "1 Month", originalPrice: 29, offerPrice: 14, imageUrlOverride: 'https://raw.githubusercontent.com/expo/expo/main/static/logo.svg' },
  { category: "👨‍💻 Developer & Engineering Tools", name: "JetBrains All Products (Edu)", description: "Complete developer tool suite", domain: "jetbrains.com", duration: "1 Year", tags: ['Universal', 'Featured'], originalPrice: 249, offerPrice: 125, imageUrlOverride: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/JetBrains_Logo_2022.svg' },
  { category: "👨‍💻 Developer & Engineering Tools", name: "Make.com (Team)", description: "Visual workflow and API integration builder", domain: "make.com", duration: "1 Year", originalPrice: 348, offerPrice: 174, imageUrlOverride: 'https://www.make.com/assets/images/branding-kit/make-logo-with-name--black.svg' },
  { category: "👨‍💻 Developer & Engineering Tools", name: "N8N (Starter)", description: "Automation and data workflow builder", domain: "n8n.io", duration: "1 Year", originalPrice: 240, offerPrice: 59, imageUrlOverride: 'https://n8n.io/n8n-logo.svg' },
  { category: "👨‍💻 Developer & Engineering Tools", name: "AWS ($100 Credits)", description: "Cloud computing infrastructure", domain: "aws.amazon.com", imageUrlOverride: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
  { category: "👨‍💻 Developer & Engineering Tools", name: "Confluent Cloud ($2000 Credit)", description: "Real-time event streaming with Kafka", domain: "confluent.io", imageUrlOverride: 'https://www.confluent.io/wp-content/uploads/logo-confluent--black.svg' },
  { category: "👨‍💻 Developer & Engineering Tools", name: "Sentry.io (Teams)", description: "Application error tracking and monitoring", domain: "sentry.io", duration: "6 Months", originalPrice: 156, offerPrice: 78, imageUrlOverride: 'https://sentry-brand.storage.googleapis.com/sentry-logo-black.svg' },
  { category: "👨‍💻 Developer & Engineering Tools", name: "Phantombuster (Starter)", description: "Automation & scraping for developers", domain: "phantombuster.com", duration: "1 Month", originalPrice: 69, offerPrice: 34, imageUrlOverride: 'https://phantombuster.com/assets/images/logos/phantombuster_logo.svg' },
  { category: "👨‍💻 Developer & Engineering Tools", name: "Dev.to (Plus Plus)", description: "Developer community & publishing hub", domain: "dev.to", duration: "1 Month", originalPrice: 10, offerPrice: 5, imageUrlOverride: 'https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png' },
  { category: "👨‍💻 Developer & Engineering Tools", name: "Microsoft Office 365 (A1)", description: "Productivity suite for documentation", domain: "microsoft.com", duration: "Lifetime", tags: ['Universal'], originalPrice: 150, offerPrice: 49, imageUrlOverride: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
  { category: "👨‍💻 Developer & Engineering Tools", name: "3DEXPERIENCE SOLIDWORKS + Suites", description: "CAD, CAM, and design collaboration tools", domain: "solidworks.com", duration: "1 Year", originalPrice: 4000, offerPrice: 1999, imageUrlOverride: 'https://upload.wikimedia.org/wikipedia/en/b/b2/Solidworks_logo.svg' },
  { category: "👨‍💻 Developer & Engineering Tools", name: "3D Swymer Variants", description: "Engineering and manufacturing suites", domain: "3ds.com", duration: "1 Year", originalPrice: 3000, offerPrice: 1500, imageUrlOverride: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Dassault_Syst%C3%A8mes_logo.svg' },
  { category: "👨‍💻 Developer & Engineering Tools", name: "Bolt.new (Pro)", description: "Full-stack AI web development in the browser", domain: "bolt.new", duration: "1 Year", originalPrice: 240, offerPrice: 42 },
  { category: "👨‍💻 Developer & Engineering Tools", name: "Replit (Pro)", description: "Advanced cloud development environment", domain: "replit.com", duration: "1 Year", originalPrice: 240, offerPrice: 59, imageUrlOverride: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Replit_logo.svg' },

  // Marketing, Growth & SEO Tools
  { category: "📈 Marketing, Growth & SEO Tools", name: "Keyword Hero (Ultimate Hero)", description: "Unlocks hidden Google keyword data", domain: "keyword-hero.com", duration: "6 Months", originalPrice: 294, offerPrice: 147 },
  { category: "📈 Marketing, Growth & SEO Tools", name: "Hootsuite (Standard)", description: "Social media scheduling & analytics", domain: "hootsuite.com", duration: "3 Months", originalPrice: 297, offerPrice: 148, imageUrlOverride: 'https://brand.hootsuite.com/wp-content/uploads/2023/10/owly-logo-color.svg' },
  { category: "📈 Marketing, Growth & SEO Tools", name: "Later for Reddit (Creator)", description: "Reddit post scheduling & management", domain: "later.com", duration: "1 Month", originalPrice: 15, offerPrice: 7, imageUrlOverride: 'https://later.com/static/images/header-logo-black.svg' },
  { category: "📈 Marketing, Growth & SEO Tools", name: "Creator Hooks Pro", description: "AI-based content ideas from trending topics", domain: "creatorhooks.com", duration: "1 Month", originalPrice: 29, offerPrice: 14 },
  { category: "📈 Marketing, Growth & SEO Tools", name: "Full Enrich (Pro)", description: "Contact & lead enrichment platform", domain: "fullenrich.com", duration: "1 Month", originalPrice: 99, offerPrice: 49 },
  { category: "📈 Marketing, Growth & SEO Tools", name: "Scalelist (Scaler 3000 Credits)", description: "B2B lead generation and prospecting", domain: "scalelist.com", duration: "1 Month", originalPrice: 59, offerPrice: 29 },
  { category: "📈 Marketing, Growth & SEO Tools", name: "Viral Launch (Core / Growth)", description: "Amazon seller analytics & optimization", domain: "viral-launch.com", duration: "1 Month", originalPrice: 69, offerPrice: 34, imageUrlOverride: 'https://www.viral-launch.com/wp-content/uploads/2021/04/Viral-Launch-Logo-Dark.svg' },
  { category: "📈 Marketing, Growth & SEO Tools", name: "Enginemailer (Free Forever)", description: "Email marketing and campaign automation", domain: "enginemailer.com", duration: "Lifetime", originalPrice: 99, offerPrice: 0 },
  { category: "📈 Marketing, Growth & SEO Tools", name: "LinkedIn Sales Navigator (Core / Advanced)", description: "Advanced sales tools and lead generation", domain: "linkedin.com", duration: "1 Month", originalPrice: 100, offerPrice: 50, imageUrlOverride: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png' },
  { category: "📈 Marketing, Growth & SEO Tools", name: "LinkedIn Ads Credit", description: "Ad credits to boost your reach", domain: "linkedin.com", duration: "One Time", originalPrice: 100, offerPrice: 50, imageUrlOverride: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png' },
  { category: "📈 Marketing, Growth & SEO Tools", name: "Moz (Pro)", description: "SEO software for smarter marketing", domain: "moz.com", duration: "1 Month", originalPrice: 99, offerPrice: 49 },
  { category: "📈 Marketing, Growth & SEO Tools", name: "Semrush (Guru)", description: "Advanced SEO and content marketing", domain: "semrush.com", duration: "2 Weeks", originalPrice: 125, offerPrice: 15 },

  // Education & Learning Platforms
  { category: "📚 Education & Learning Platforms", name: "DataCamp (Premium)", description: "Learn data science, Python, R, and ML", domain: "datacamp.com", duration: "1 Year", tags: ['Featured'], originalPrice: 399, offerPrice: 149, imageUrlOverride: 'https://www.datacamp.com/assets/logos/logo-green-2x-300.png' },
  { category: "📚 Education & Learning Platforms", name: "No Code MBA (Unlimited)", description: "Learn no-code app & business building", domain: "nocode.mba", duration: "1 Year", originalPrice: 299, offerPrice: 149 },
  { category: "📚 Education & Learning Platforms", name: "Whizlabs (Premium Plus)", description: "Cloud, DevOps, and IT certification prep", domain: "whizlabs.com", duration: "1 Month", originalPrice: 20, offerPrice: 10, imageUrlOverride: 'https://www.whizlabs.com/wp-content/uploads/2023/11/logo_214x50.svg' },
  { category: "📚 Education & Learning Platforms", name: "JetBrains Edu Pack", description: "Developer education tools", domain: "jetbrains.com", duration: "1 Year", originalPrice: 249, offerPrice: 0, imageUrlOverride: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/JetBrains_Logo_2022.svg' },
  { category: "📚 Education & Learning Platforms", name: "Kickresume (Premium)", description: "Resume-building and career education", domain: "kickresume.com", duration: "1 Month", originalPrice: 19, offerPrice: 9, imageUrlOverride: 'https://www.kickresume.com/assets/images/navigation/kickresume-logo_black.svg' },
  { category: "📚 Education & Learning Platforms", name: "Paperpal (Prime)", description: "Academic proofreading and writing enhancement", domain: "paperpal.com", duration: "1 Month", originalPrice: 12, offerPrice: 6, imageUrlOverride: 'https://paperpal.com/_next/static/media/logo-light.19e7943d.svg' },
  { category: "📚 Education & Learning Platforms", name: "Coursera Plus", description: "Unlimited access to courses and certificates", domain: "coursera.org", duration: "1 Year", originalPrice: 399, offerPrice: 25 },
  { category: "📚 Education & Learning Platforms", name: "edX (Official)", description: "Access to verified courses from top universities", domain: "edx.org", duration: "1 Year", originalPrice: 199, offerPrice: 99 },
  { category: "📚 Education & Learning Platforms", name: "LinkedIn Learning", description: "Access to over 16,000 expert-led courses", domain: "linkedin.com", duration: "3 Months", originalPrice: 90, offerPrice: 15, imageUrlOverride: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png' },

  // Cloud, Storage & Security
  { category: "☁️ Cloud, Storage & Security", name: "Backblaze (Unlimited)", description: "Cloud storage & backup", domain: "backblaze.com", duration: "1 Year", tags: ['Universal'], originalPrice: 70, offerPrice: 35, imageUrlOverride: 'https://www.backblaze.com/images/logo/backblaze_logo_2023.svg' },
  { category: "☁️ Cloud, Storage & Security", name: "Bitwarden (Family / Premium)", description: "Password & credential security", domain: "bitwarden.com", duration: "1 Year", tags: ['Universal'], originalPrice: 40, offerPrice: 20, imageUrlOverride: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Bitwarden_Logo.svg' },
  { category: "☁️ Cloud, Storage & Security", name: "Cloudinary (Plus)", description: "Cloud media management", domain: "cloudinary.com", duration: "1 Month", originalPrice: 99, offerPrice: 49, imageUrlOverride: 'https://cloudinary-res.cloudinary.com/image/upload/v1642686866/cloudinary_logo_for_white_bg.svg' },
  { category: "☁️ Cloud, Storage & Security", name: "ImageKit.io (Pro)", description: "Image optimization and CDN delivery", domain: "imagekit.io", duration: "1 Month", originalPrice: 49, offerPrice: 24, imageUrlOverride: 'https://imagekit.io/static/files/imagekit-light-logo-black-text.svg' },
  { category: "☁️ Cloud, Storage & Security", name: "ExpressVPN (3 Months) & Surfshark (2 Months)", description: "Premium VPN privacy protection bundle", domain: "expressvpn.com", duration: "5 Months", originalPrice: 65, offerPrice: 25 },
  { category: "☁️ Cloud, Storage & Security", name: "Google One (100GB)", description: "Expanded storage and Google experts", domain: "one.google.com", duration: "6 Months", originalPrice: 12, offerPrice: 5 },

  // 3D, CAD & Engineering Suites
  { category: "🧱 3D, CAD & Engineering Suites", name: "3D Swymer + Creator + Collaborative Industry Innovator", description: "Offers CAD modeling, 3D visualization, simulation, and manufacturing integration tools.", domain: "3ds.com", duration: "1 Year", originalPrice: 3500, offerPrice: 1750, imageUrlOverride: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Dassault_Syst%C3%A8mes_logo.svg' },
  { category: "🧱 3D, CAD & Engineering Suites", name: "3D Swymer + Sculptor + Collaborative Industry Innovator", description: "Offers CAD modeling, 3D visualization, simulation, and manufacturing integration tools.", domain: "3ds.com", duration: "1 Year", originalPrice: 3500, offerPrice: 1750, imageUrlOverride: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Dassault_Syst%C3%A8mes_logo.svg' },
  { category: "🧱 3D, CAD & Engineering Suites", name: "3DEXPERIENCE SOLIDWORKS Pro + Swymer + Collaborative Industry Innovator", description: "Offers CAD modeling, 3D visualization, simulation, and manufacturing integration tools.", domain: "solidworks.com", duration: "1 Year", originalPrice: 4500, offerPrice: 2250, imageUrlOverride: 'https://upload.wikimedia.org/wikipedia/en/b/b2/Solidworks_logo.svg' },
  { category: "🧱 3D, CAD & Engineering Suites", name: "3D Swymer + Collaborative Industry Innovator", description: "Offers CAD modeling, 3D visualization, simulation, and manufacturing integration tools.", domain: "3ds.com", duration: "1 Year", originalPrice: 2000, offerPrice: 1000, imageUrlOverride: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Dassault_Syst%C3%A8mes_logo.svg' },
  { category: "🧱 3D, CAD & Engineering Suites", name: "3D Swymer + NC Shop Floor Programmer + Collaborative Industry Innovator", description: "Offers CAD modeling, 3D visualization, simulation, and manufacturing integration tools.", domain: "3ds.com", duration: "1 Year", originalPrice: 5000, offerPrice: 2500, imageUrlOverride: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Dassault_Syst%C3%A8mes_logo.svg' },
  { category: "🧱 3D, CAD & Engineering Suites", name: "3D Swymer + Creator + Sculptor + NC Shop Floor Programmer + SOLIDWORKS Professional", description: "Offers CAD modeling, 3D visualization, simulation, and manufacturing integration tools.", domain: "solidworks.com", duration: "1 Year", originalPrice: 8000, offerPrice: 4000, imageUrlOverride: 'https://upload.wikimedia.org/wikipedia/en/b/b2/Solidworks_logo.svg' },

  // Streaming & Entertainment
  { category: "🎮 Streaming & Entertainment", name: "Xbox Game Pass Ultimate", description: "Access to over 100 high-quality games on console and PC", domain: "xbox.com", duration: "1 Year", originalPrice: 204, offerPrice: 85, imageUrlOverride: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Xbox_Game_Pass_logo.svg' },

  // Lifetime Access Tools
  { category: "♾️ Lifetime Access Tools", name: "Rezi AI (Lifetime)", description: "AI resume optimizer", domain: "rezi.ai", duration: "Lifetime", tags: ['Featured'], originalPrice: 129, offerPrice: 69, imageUrlOverride: 'https://assets-global.website-files.com/6310219f8510a520ac5687a7/63102554700f576136d400ac_logo.svg' },
  { category: "♾️ Lifetime Access Tools", name: "Microsoft Office 365 (A1 License)", description: "Lifetime productivity suite", domain: "microsoft.com", duration: "Lifetime", tags: ['Universal'], originalPrice: 150, offerPrice: 49, imageUrlOverride: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
  { category: "♾️ Lifetime Access Tools", name: "The-BitHub.com (Elite)", description: "Premium development resource repository", domain: "the-bithub.com", duration: "Lifetime", originalPrice: 99, offerPrice: 49 },
  { category: "♾️ Lifetime Access Tools", name: "OnlyFans (Voucher)", description: "Platform credit voucher", domain: "onlyfans.com", duration: "One Time", originalPrice: 50, offerPrice: 25 },
  
  // Special handling for tools in multiple categories
  { category: "📈 Marketing, Growth & SEO Tools", name: "Humanic AI", description: "Growth and customer journey analytics", domain: "humanic.ai", duration: "1 Month", originalPrice: 299, offerPrice: 149 },
  { category: "📈 Marketing, Growth & SEO Tools", name: "Famous.ai", description: "AI-powered ad and landing page creation", domain: "famous.ai", duration: "1 Month", originalPrice: 79, offerPrice: 39, imageUrlOverride: 'https://famous.ai/wp-content/uploads/2023/10/logo.svg' },
  { category: "📈 Marketing, Growth & SEO Tools", name: "Outbox AI", description: "AI sales outreach automation", domain: "outbox.ai", duration: "1 Month", originalPrice: 149, offerPrice: 75 },
  { category: "☁️ Cloud, Storage & Security", name: "AWS ($100 Credits)", description: "Cloud computing services", domain: "aws.amazon.com", imageUrlOverride: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
  { category: "☁️ Cloud, Storage & Security", name: "Confluent Cloud ($2000 Credit)", description: "Managed Kafka for data streaming", domain: "confluent.io", imageUrlOverride: 'https://www.confluent.io/wp-content/uploads/logo-confluent--black.svg' },
  { category: "☁️ Cloud, Storage & Security", name: "Enginemailer (Free Forever)", description: "Email infrastructure for campaigns", domain: "enginemailer.com", duration: "Lifetime", originalPrice: 99, offerPrice: 0 },
  { category: "♾️ Lifetime Access Tools", name: "Enginemailer (Free Forever)", description: "Email automation with lifetime credits", domain: "enginemailer.com", duration: "Lifetime", originalPrice: 99, offerPrice: 0 },
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
  { category: "💼 Productivity, Project Management & Collaboration", name: "Granola (Business)", description: "Smart meeting notes", domain: "granola.so", duration: "1 Year", originalPrice: 180, offerPrice: 89 },
  { category: "💼 Productivity, Project Management & Collaboration", name: "Backblaze (Unlimited)", description: "Cloud data backup", domain: "backblaze.com", duration: "1 Year", tags: ['Universal'], originalPrice: 70, offerPrice: 35, imageUrlOverride: 'https://www.backblaze.com/images/logo/backblaze_logo_2023.svg' },
  { category: "💼 Productivity, Project Management & Collaboration", name: "Zoom (Pro)", domain: "zoom.us", nameOverride: "Zoom (Pro)", descriptionOverride: "A reliable cloud platform for video and audio conferencing, collaboration, chat, and webinars.", imageUrlOverride: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Zoom_logo.svg", duration: "1 Year", tags: ['Universal', 'Fast Moving'], originalPrice: 150, offerPrice: 75 },
  { category: "💼 Productivity, Project Management & Collaboration", name: "Linear (Basic)", description: "A streamlined project management tool for modern software teams to track issues, manage sprints, and build momentum.", domain: "linear.app", duration: "1 Year", originalPrice: 120, offerPrice: 60, imageUrlOverride: 'https://cdn.worldvectorlogo.com/logos/linear-1.svg' },
  { category: "💼 Productivity, Project Management & Collaboration", name: "Airtable (Teams / Business Trial)", description: "A hybrid database and spreadsheet tool for managing projects, data, and workflows collaboratively.", domain: "airtable.com", duration: "1 Month", originalPrice: 24, offerPrice: 12, imageUrlOverride: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Airtable_logo.svg' },
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
      tags: tool.tags,
      originalPrice: tool.originalPrice,
      offerPrice: tool.offerPrice,
    }
});
