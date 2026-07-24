export type ToolCategory =
  | "ideation"
  | "scripting"
  | "titles_tags"
  | "thumbnail"
  | "engagement"
  | "multiplatform"
  | "seo"
  | "extra";

export interface AITool {
  id: string;
  name: string;
  category: ToolCategory;
  description: string;
  icon: string;
  isPopular?: boolean;
  isNew?: boolean;
  promptPlaceholder: string;
  suggestedPrompts: string[];
  inputs?: {
    name: string;
    label: string;
    type: "text" | "textarea" | "select" | "number";
    options?: string[];
    default?: string;
  }[];
}

export interface SavedProject {
  id: string;
  title: string;
  toolType: string;
  category: ToolCategory | string;
  prompt: string;
  result: string;
  createdAt: string;
  isFavorite: boolean;
  folder?: string;
  tags?: string[];
}

export interface PlannerItem {
  id: string;
  title: string;
  type: "Shorts" | "Long Video" | "Community Post" | "Live Stream";
  scheduledDate: string;
  status: "Idea" | "Scripted" | "Filmed" | "Editing" | "Scheduled" | "Published";
  channelNiche?: string;
  notes?: string;
  targetGoal?: string;
}

export interface CreatorNote {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  folder: string;
  isFavorite: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  channelName: string;
  channelNiche: string;
  subscribersGoal: number;
  currentSubscribers: number;
  credits: number;
  maxDailyCredits: number;
  isPremium: boolean;
  avatar: string;
}

export interface SEOReport {
  id: string;
  keyword: string;
  videoTitle: string;
  score: number;
  searchVolume: string;
  competition: "Low" | "Medium" | "High" | "Very High";
  rankingDifficulty: number;
  primaryKeywords: string[];
  longTailKeywords: string[];
  suggestedTitles: string[];
  checklist: {
    item: string;
    passed: boolean;
    recommendation: string;
  }[];
  date: string;
}

export interface AnalyticsStats {
  totalProjects: number;
  aiCreditsUsed: number;
  savedContentCount: number;
  weeklyProgressPercent: number;
  productivityScore: number;
  weeklyActivity: { day: string; projects: number; credits: number }[];
  categoryDistribution: { name: string; count: number }[];
}

export type ActiveTab =
  | "dashboard"
  | "aistudio"
  | "seotoolkit"
  | "thumbnailstudio"
  | "planner"
  | "productivity"
  | "analytics"
  | "extraai"
  | "settings"
  | "monetization";
