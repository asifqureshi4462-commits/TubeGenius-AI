import React from "react";
import {
  Sparkles,
  Zap,
  TrendingUp,
  Coins,
  ArrowRight,
  Search,
  FileText,
  Image as ImageIcon,
  Flame,
  CheckCircle2,
  Clock,
  PlayCircle,
  BarChart2,
  Bookmark,
} from "lucide-react";
import { UserProfile, SavedProject, ActiveTab } from "../types";
import { TRENDING_YOUTUBE_TOPICS } from "../data/toolsData";

interface DashboardViewProps {
  user: UserProfile;
  projects: SavedProject[];
  onNavigateTab: (tab: ActiveTab) => void;
  onSelectProject: (project: SavedProject) => void;
  onOpenMonetization: () => void;
  onQuickTopicSelect: (topic: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  projects,
  onNavigateTab,
  onSelectProject,
  onOpenMonetization,
  onQuickTopicSelect,
}) => {
  const lastProject = projects.length > 0 ? projects[0] : null;
  const subscriberPercent = Math.min(
    100,
    Math.round((user.currentSubscribers / user.subscribersGoal) * 100)
  );

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Welcome Banner & Subscriber Milestone */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-900 via-slate-900 to-red-950 border border-red-900/40 p-6 shadow-xl text-white">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 text-xs font-semibold border border-red-500/30">
                Welcome back, Creator 👋
              </span>
              <span className="text-xs text-slate-400">• Channel: {user.channelName}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ready to create your next <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-amber-300">Viral YouTube Video?</span>
            </h2>
            <p className="text-sm text-slate-300 max-w-xl">
              TubeGenius AI is active with 20+ creator tools for scriptwriting, YouTube SEO, thumbnail concepts, and channel scaling.
            </p>
          </div>

          {/* Goal Progress Tracker */}
          <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 p-4 rounded-xl min-w-[260px] space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-medium">Subscriber Goal</span>
              <span className="text-amber-400 font-bold">{subscriberPercent}% Achieved</span>
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-white">{user.currentSubscribers.toLocaleString()} subs</span>
                <span className="text-slate-400">{user.subscribersGoal.toLocaleString()} goal</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden p-0.5">
                <div
                  className="bg-gradient-to-r from-amber-500 to-red-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${subscriberPercent}%` }}
                ></div>
              </div>
            </div>
            <button
              onClick={() => onNavigateTab("aistudio")}
              className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch AI Studio</span>
            </button>
          </div>
        </div>
      </div>

      {/* Credits & Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-xs flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-500">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900 dark:text-white">{user.credits}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Available Credits</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-xs flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-red-500/10 text-red-500">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900 dark:text-white">{projects.length}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Total Projects</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-xs flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-500">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900 dark:text-white">96%</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">SEO Score Avg</div>
          </div>
        </div>

        <button
          onClick={onOpenMonetization}
          className="bg-gradient-to-br from-amber-500 to-orange-600 text-white p-4 rounded-xl shadow-xs flex items-center justify-between hover:opacity-95 transition-all text-left"
        >
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-100">Claim Reward</div>
            <div className="text-sm font-extrabold">+50 Free Credits</div>
          </div>
          <Coins className="w-6 h-6 text-amber-200 animate-bounce" />
        </button>
      </div>

      {/* Quick Actions Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-red-500" />
            Quick AI Actions
          </h3>
          <button
            onClick={() => onNavigateTab("aistudio")}
            className="text-xs font-semibold text-red-500 hover:text-red-600 flex items-center gap-1"
          >
            <span>View All 20+ Tools</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => onNavigateTab("aistudio")}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-red-500 dark:hover:border-red-500 p-4 rounded-xl cursor-pointer transition-all group shadow-xs hover:shadow-md"
          >
            <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-950/80 text-red-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">AI Script Writer</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Generate full YouTube Shorts or long-form video scripts.</p>
          </div>

          <div
            onClick={() => onNavigateTab("seotoolkit")}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-red-500 dark:hover:border-red-500 p-4 rounded-xl cursor-pointer transition-all group shadow-xs hover:shadow-md"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Search className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">YouTube SEO Checker</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Keyword volume, competition, and video optimization score.</p>
          </div>

          <div
            onClick={() => onNavigateTab("thumbnailstudio")}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-red-500 dark:hover:border-red-500 p-4 rounded-xl cursor-pointer transition-all group shadow-xs hover:shadow-md"
          >
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-950/80 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <ImageIcon className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Thumbnail Studio</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">AI image prompts, text overlays, and CTR clickbait rating.</p>
          </div>

          <div
            onClick={() => onNavigateTab("aistudio")}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-red-500 dark:hover:border-red-500 p-4 rounded-xl cursor-pointer transition-all group shadow-xs hover:shadow-md"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Flame className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Viral Topic Finder</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Discover trending news and high-growth YouTube niches.</p>
          </div>
        </div>
      </div>

      {/* Continue Last Project & Trending Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Continue Last Project */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-red-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Continue Draft
              </span>
              {lastProject && (
                <span className="text-[10px] text-slate-400 font-mono">{lastProject.createdAt}</span>
              )}
            </div>

            {lastProject ? (
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-base line-clamp-1">
                  {lastProject.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                  {lastProject.result}
                </p>
              </div>
            ) : (
              <div className="text-center py-6 text-slate-400 text-xs">
                No recent projects yet. Start by generating a video script or idea!
              </div>
            )}
          </div>

          <button
            onClick={() => lastProject ? onSelectProject(lastProject) : onNavigateTab("aistudio")}
            className="mt-4 w-full py-2.5 px-4 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold text-xs flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            <PlayCircle className="w-4 h-4" />
            <span>{lastProject ? "Resume Last Project" : "Start New AI Project"}</span>
          </button>
        </div>

        {/* Trending YouTube Topics Feed */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                Trending YouTube Topics (2026)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">High search volume topics with high monetization potential.</p>
            </div>
            <span className="px-2 py-0.5 text-[10px] bg-emerald-500/10 text-emerald-500 font-bold rounded-full">
              LIVE ALGORITHM
            </span>
          </div>

          <div className="space-y-3">
            {TRENDING_YOUTUBE_TOPICS.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 hover:border-red-500/50 transition-colors gap-2"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">
                      {item.topic}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium">
                      {item.category}
                    </span>
                  </div>
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    {item.viewsTrend} • Viral Score: {item.viralRating}/100
                  </div>
                </div>

                <button
                  onClick={() => {
                    onQuickTopicSelect(item.topic);
                    onNavigateTab("aistudio");
                  }}
                  className="px-3 py-1.5 rounded-md bg-red-600/10 hover:bg-red-600 text-red-600 hover:text-white font-semibold text-xs transition-all whitespace-nowrap self-start sm:self-center"
                >
                  Generate Script
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
