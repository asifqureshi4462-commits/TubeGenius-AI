import React from "react";
import {
  Sparkles,
  Coins,
  Smartphone,
  Monitor,
  Moon,
  Sun,
  User,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { UserProfile } from "../types";

interface HeaderProps {
  user: UserProfile;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  isAndroidFrame: boolean;
  onToggleAndroidFrame: () => void;
  onOpenAuth: () => void;
  onOpenMonetization: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  isDarkMode,
  onToggleDarkMode,
  isAndroidFrame,
  onToggleAndroidFrame,
  onOpenAuth,
  onOpenMonetization,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 via-rose-500 to-amber-500 p-0.5 shadow-md shadow-red-500/20">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg text-slate-900 dark:text-white tracking-tight leading-none">
                TubeGenius<span className="text-red-500">.AI</span>
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
                PRO STUDIO
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              Complete AI YouTube Creator Suite
            </p>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* AI Credits Badge */}
          <button
            onClick={onOpenMonetization}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-all text-xs font-semibold shadow-xs"
            title="Manage AI Credits"
          >
            <Coins className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>{user.credits} Credits</span>
            <span className="ml-1 px-1.5 py-0.2 rounded bg-amber-500 text-white text-[10px] font-bold">
              +FREE
            </span>
          </button>

          {/* Frame Toggle (Studio Web vs Mobile Android) */}
          <button
            onClick={onToggleAndroidFrame}
            className={`p-2 rounded-lg border transition-all text-xs font-medium flex items-center gap-1.5 ${
              isAndroidFrame
                ? "bg-red-600 text-white border-red-500 shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
            title={isAndroidFrame ? "Switch to Full Web Studio View" : "Switch to Android Mobile Device Preview"}
          >
            {isAndroidFrame ? (
              <>
                <Monitor className="w-4 h-4" />
                <span className="hidden md:inline">Web Studio</span>
              </>
            ) : (
              <>
                <Smartphone className="w-4 h-4" />
                <span className="hidden md:inline">Android Preview</span>
              </>
            )}
          </button>

          {/* Theme Switcher */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* User Profile / Auth */}
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:opacity-90 transition-opacity font-medium text-xs shadow-sm"
          >
            <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-xs">
              {user.name ? user.name.charAt(0) : "C"}
            </div>
            <span className="hidden sm:inline max-w-[100px] truncate">{user.name || "Creator"}</span>
            {user.isPremium && <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />}
          </button>
        </div>
      </div>
    </header>
  );
};
