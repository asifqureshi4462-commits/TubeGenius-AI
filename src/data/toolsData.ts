import { AITool, ToolCategory } from "../types";

export const AI_TOOLS: AITool[] = [
  // IDEATION
  {
    id: "idea_generator",
    name: "AI Video Idea Generator",
    category: "ideation",
    description: "Generate high-CTR, viral video concepts tailored to your niche and audience.",
    icon: "Lightbulb",
    isPopular: true,
    promptPlaceholder: "e.g., Tech review channel covering budget smartphones under $300...",
    suggestedPrompts: [
      "10 viral video ideas for a coding tutorial channel",
      "Creative gaming challenge video ideas for Minecraft",
      "5 high-CPM finance video topics for young adults",
    ],
  },
  {
    id: "viral_topic_finder",
    name: "AI Viral Topic Finder",
    category: "ideation",
    description: "Discover breakout trends, emerging news, and high-demand YouTube topics right now.",
    icon: "TrendingUp",
    isPopular: true,
    promptPlaceholder: "e.g., Artificial Intelligence, AI Agents, or Fitness Trends 2026...",
    suggestedPrompts: [
      "Find top 5 trending topics in AI software right now",
      "What is viral in productivity and habit building?",
      "Breakout tech news topics for video essays",
    ],
  },

  // SCRIPTING
  {
    id: "shorts_script",
    name: "AI Shorts Script Generator",
    category: "scripting",
    description: "Write ultra-engaging, 60-second vertical video scripts with visual cues and audio callouts.",
    icon: "Zap",
    isPopular: true,
    promptPlaceholder: "e.g., 3 Hidden iPhone features nobody uses...",
    suggestedPrompts: [
      "Shorts script about 3 psychological tricks to study faster",
      "60-second story about how Airbnb was founded",
      "Quick 30-second coding tip for JavaScript developers",
    ],
  },
  {
    id: "long_video_script",
    name: "AI Long Video Script Generator",
    category: "scripting",
    description: "Full timestamped script breakdown with hook, body points, visual B-roll cues, and CTA.",
    icon: "FileText",
    isPopular: true,
    promptPlaceholder: "e.g., Full 10-minute guide on how to build a passive income business in 2026...",
    suggestedPrompts: [
      "8-minute script explaining quantum computing simply",
      "12-minute video essay script on the rise of electric vehicles",
      "10-minute step-by-step camera gear setup for beginners",
    ],
  },
  {
    id: "storytelling_script",
    name: "AI Storytelling Generator",
    category: "scripting",
    description: "Craft cinematic story arcs, hero journeys, and narrative tension for documentaries and essays.",
    icon: "BookOpen",
    promptPlaceholder: "e.g., The untold story of how Apple created the iPod...",
    suggestedPrompts: [
      "Dramatic story arc about the space race to the moon",
      "Storytelling script for a solo travel vlog in Japan",
    ],
  },
  {
    id: "voiceover_script",
    name: "AI Voice-over Script Generator",
    category: "scripting",
    description: "Generate fluid, natural voiceover scripts formatted specifically for ElevenLabs, AI voiceover, or narration.",
    icon: "Mic",
    promptPlaceholder: "e.g., Deep, mysterious voiceover for a sci-fi documentary about space anomalies...",
    suggestedPrompts: [
      "Enthusiastic voiceover script for a 30s product teaser",
      "Calm, meditative voiceover script for a morning routine video",
    ],
  },

  // TITLES & TAGS
  {
    id: "title_generator",
    name: "AI Title Generator",
    category: "titles_tags",
    description: "Generate 10 high-CTR, psychological click-worthy titles optimized for search and suggested feeds.",
    icon: "Heading",
    isPopular: true,
    promptPlaceholder: "e.g., Video about building my first SaaS app in 30 days...",
    suggestedPrompts: [
      "Titles for a video about quitting coffee for 30 days",
      "High CTR titles for a desk setup tour 2026",
    ],
  },
  {
    id: "description_generator",
    name: "AI Description Generator",
    category: "titles_tags",
    description: "SEO-rich video description with keyword density, timestamps, chapter links, and affiliate disclaimers.",
    icon: "AlignLeft",
    promptPlaceholder: "e.g., Video reviewing the Sony A7IV camera for YouTube creators...",
    suggestedPrompts: [
      "Description for a Python programming full course",
      "Description for a home gym workout routine",
    ],
  },
  {
    id: "tags_generator",
    name: "AI Tags & Hashtags Generator",
    category: "titles_tags",
    description: "Generate optimized YouTube tags array and viral hashtags for maximum search reach.",
    icon: "Tag",
    promptPlaceholder: "e.g., Best video editing software for beginners 2026...",
    suggestedPrompts: [
      "Tags for a video on Tesla FSD updates",
      "Hashtags for a gaming setup tutorial",
    ],
  },

  // ENGAGEMENT & HOOKS
  {
    id: "hook_generator",
    name: "AI Hook Generator",
    category: "engagement",
    description: "Write 5 explosive first-5-second video hooks to stop viewers from scrolling away.",
    icon: "Anchor",
    isPopular: true,
    promptPlaceholder: "e.g., A video revealing how algorithms track your data...",
    suggestedPrompts: [
      "5 pattern-interrupt hooks for a finance video",
      "5 curiosity-gap hooks for a mystery story video",
    ],
  },
  {
    id: "intro_outro",
    name: "AI Intro & Outro Generator",
    category: "engagement",
    description: "Create memorable channel intros and compelling end-screen retention outro scripts.",
    icon: "PlayCircle",
    promptPlaceholder: "e.g., Fast-paced intro for a tech review channel called 'TechNexus'...",
    suggestedPrompts: [
      "Energetic channel intro script under 10 seconds",
      "End screen outro directing viewers to watch next recommended video",
    ],
  },
  {
    id: "cta_generator",
    name: "AI CTA & Subscribe Call Generator",
    category: "engagement",
    description: "Incorporate natural, high-converting subscribe and like calls without disrupting viewer drop-off.",
    icon: "BellRing",
    promptPlaceholder: "e.g., Subtle call to action halfway through a coding tutorial...",
    suggestedPrompts: [
      "Humorous call to subscribe during a gaming video",
      "Professional newsletter CTA for an educational channel",
    ],
  },
  {
    id: "chapter_summary",
    name: "AI Video Chapter & Summary Generator",
    category: "engagement",
    description: "Automatically format precise timestamps (00:00 Intro...) and key takeaway executive summaries.",
    icon: "ListOrdered",
    promptPlaceholder: "e.g., Paste your video script or bullet points here to generate chapters...",
    suggestedPrompts: [
      "Generate YouTube chapters for a 15-minute podcast interview",
      "Summary points for video description pinned comment",
    ],
  },

  // THUMBNAILS
  {
    id: "thumbnail_prompt",
    name: "AI Thumbnail Prompt Generator",
    category: "thumbnail",
    description: "Detailed Midjourney / DALL-E / Nano Banana image prompts for eye-catching thumbnail graphics.",
    icon: "Image",
    isPopular: true,
    promptPlaceholder: "e.g., Shocked creator looking at a floating holographic YouTube play button...",
    suggestedPrompts: [
      "Dramatic 3D thumbnail prompt for a cyber security warning video",
      "Minimalist sleek thumbnail design prompt for an Apple event review",
    ],
  },
  {
    id: "thumbnail_text",
    name: "AI Thumbnail Text & Style Generator",
    category: "thumbnail",
    description: "Get 3-4 word punchy text overlays, font style suggestions, colors, and emotion direction.",
    icon: "Type",
    promptPlaceholder: "e.g., Video title: 'I Spent 100 Hours Building a Robot'...",
    suggestedPrompts: [
      "High CTR 2-word text overlay for a challenge video",
      "Contrasting color palette suggestions for dark background thumbnails",
    ],
  },

  // MULTIPLATFORM DISTRIBUTION
  {
    id: "multi_socials",
    name: "AI Cross-Platform Post Generator",
    category: "multiplatform",
    description: "Repurpose your video into Blog Articles, Tweets, LinkedIn posts, Instagram captions, & Telegram posts.",
    icon: "Share2",
    promptPlaceholder: "e.g., Repurpose my latest video about 'Top 5 AI Tools in 2026' into social posts...",
    suggestedPrompts: [
      "Convert video script to a 5-tweet viral thread",
      "Write a LinkedIn article summarizing my video key findings",
      "Draft an Instagram carousel caption with bullet takeaways",
    ],
  },
  {
    id: "community_post",
    name: "AI Community Post & Poll Generator",
    category: "multiplatform",
    description: "Keep subscriber engagement high with interactive YouTube Community Tab polls and updates.",
    icon: "MessageSquare",
    promptPlaceholder: "e.g., Poll asking subscribers what video topic they want to see next Friday...",
    suggestedPrompts: [
      "Engagement poll with 4 funny options about video editing struggles",
      "Behind the scenes teaser post for upcoming video release",
    ],
  },
  {
    id: "comment_reply",
    name: "AI Comment Reply Generator",
    category: "multiplatform",
    description: "Draft smart, warm, algorithm-boosting replies to viewer comments and constructive feedback.",
    icon: "MessageCircle",
    promptPlaceholder: "e.g., Viewer comment: 'Loved minute 4:12! Can you do a follow up on the camera setup?'...",
    suggestedPrompts: [
      "Enthusiastic reply thanking viewer and asking a follow-up question",
      "Polite reply answering a technical question asked in comments",
    ],
  },

  // EXTRA AI TOOLS
  {
    id: "script_rewriter",
    name: "AI Script Rewriter & Polisher",
    category: "extra",
    description: "Rewrite awkward sentences, improve pace, and optimize flow for on-camera speaking.",
    icon: "RefreshCw",
    promptPlaceholder: "e.g., Paste raw script text here to enhance clarity and pacing...",
    suggestedPrompts: [
      "Make this script sound 2x more energetic and concise",
      "Simplify complex technical terms for beginner audience",
    ],
  },
  {
    id: "headline_improver",
    name: "AI Headline Improver",
    category: "extra",
    description: "Transform weak, boring titles into high-performing YouTube headline masterpieces.",
    icon: "Sparkles",
    promptPlaceholder: "e.g., Existing title: 'My Review of the New Laptop'...",
    suggestedPrompts: [
      "Improve title: 'How to code in Python'",
      "Improve title: 'I tried sleeping 8 hours for a week'",
    ],
  },
  {
    id: "translator",
    name: "AI Script & Metadata Translator",
    category: "extra",
    description: "Translate scripts, titles, and descriptions into Spanish, Hindi, German, Japanese, and 30+ languages.",
    icon: "Globe",
    promptPlaceholder: "e.g., Translate my video title and description into Spanish and German...",
    suggestedPrompts: [
      "Translate title and tags to Spanish for global search reach",
      "Translate script summary to Japanese",
    ],
  },
];

export const TRENDING_YOUTUBE_TOPICS = [
  { topic: "Gemini 3.5 & AI Agents 2026", category: "Tech & AI", viewsTrend: "+240% Search Volume", viralRating: 98 },
  { topic: "Custom PC Building under $500", category: "Gaming & Tech", viewsTrend: "+180% Interest", viralRating: 92 },
  { topic: "0-100K Subscriber Growth Strategy", category: "Education", viewsTrend: "+310% Search Volume", viralRating: 99 },
  { topic: "Day in the Life of Remote Software Engineer", category: "Vlog & Career", viewsTrend: "+150% Interest", viralRating: 88 },
  { topic: "High Retention YouTube Shorts Edits", category: "Creator Tools", viewsTrend: "+420% Search Volume", viralRating: 97 },
];

export const INITIAL_CHECKLIST = [
  { item: "Target Keyword in Video Title (First 50 chars)", passed: true, recommendation: "Good job! Keyword is positioned early." },
  { item: "First 2 lines of Description contain Target Keyword", passed: true, recommendation: "Includes main keyword for YouTube search index." },
  { item: "High Contrast 1280x720 Thumbnail attached", passed: false, recommendation: "Ensure text on thumbnail has high outline contrast." },
  { item: "Timestamps / Chapters included in description", passed: false, recommendation: "Add 00:00 Intro format for key chapters." },
  { item: "Pinned Comment with CTA link & Question", passed: true, recommendation: "Pinned comment drives subscriber replies." },
  { item: "At least 3 relevant Hashtags in description", passed: true, recommendation: "#Hashtags aid categorization." },
  { item: "Cards and End Screens added during upload", passed: false, recommendation: "Link to a related playlist on end screen." },
];
