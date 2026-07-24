import React from "react";
import {
  LayoutDashboard,
  Sparkles,
  Search,
  Image as ImageIcon,
  Calendar,
  FolderCheck,
  BarChart3,
  Wand2,
  Settings,
  Coins,
} from "lucide-react";
import { ActiveTab } from "../types";

interface NavigationProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const NAV_ITEMS: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }>; badge?: string }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "aistudio", label: "AI Studio", icon: Sparkles, badge: "20+ Tools" },
  { id: "seotoolkit", label: "YouTube SEO", icon: Search, badge: "Score" },
  { id: "thumbnailstudio", label: "Thumbnail Studio", icon: ImageIcon },
  { id: "planner", label: "Content Planner", icon: Calendar },
  { id: "productivity", label: "Notes & Saved", icon: FolderCheck },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "extraai", label: "Extra AI Tools", icon: Wand2 },
  { id: "monetization", label: "Credits & VIP", icon: Coins, badge: "+Ad" },
  { id: "settings", label: "Settings", icon: Settings },
];

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="w-full bg-slate-900/95 dark:bg-slate-950 text-slate-300 border-b border-slate-800 px-4 overflow-x-auto scrollbar-none">
      <div className="max-w-7xl mx-auto flex items-center gap-1 sm:gap-2 py-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/20 font-semibold"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
              <span>{item.label}</span>
              {item.badge && (
                <span
                  className={`px-1.5 py-0.2 text-[9px] font-bold rounded-full ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-800 text-red-400 border border-red-500/30"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
