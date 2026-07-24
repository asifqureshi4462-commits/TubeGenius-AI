import React from "react";
import {
  LayoutDashboard,
  Sparkles,
  Search,
  Calendar,
  FolderCheck,
  BarChart3,
  Settings,
} from "lucide-react";
import { ActiveTab } from "../types";

interface AndroidBottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

const ANDROID_NAV = [
  { id: "dashboard" as ActiveTab, label: "Home", icon: LayoutDashboard },
  { id: "aistudio" as ActiveTab, label: "AI Studio", icon: Sparkles },
  { id: "seotoolkit" as ActiveTab, label: "SEO", icon: Search },
  { id: "planner" as ActiveTab, label: "Planner", icon: Calendar },
  { id: "productivity" as ActiveTab, label: "Saved", icon: FolderCheck },
  { id: "analytics" as ActiveTab, label: "Stats", icon: BarChart3 },
  { id: "settings" as ActiveTab, label: "Settings", icon: Settings },
];

export const AndroidBottomNav: React.FC<AndroidBottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="w-full bg-slate-900 border-t border-slate-800 px-2 py-1.5 flex items-center justify-around z-30">
      {ANDROID_NAV.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className="flex flex-col items-center gap-1 group py-1 px-2 focus:outline-none"
          >
            <div
              className={`px-4 py-1 rounded-full transition-all flex items-center justify-center ${
                isActive
                  ? "bg-red-600 text-white shadow-sm"
                  : "text-slate-400 group-hover:text-slate-200"
              }`}
            >
              <Icon className="w-4 h-4" />
            </div>
            <span
              className={`text-[10px] font-medium transition-colors ${
                isActive ? "text-red-400 font-semibold" : "text-slate-400"
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
