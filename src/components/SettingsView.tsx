import React from "react";
import {
  Settings as SettingsIcon,
  Moon,
  Sun,
  Globe,
  Download,
  Upload,
  User,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { UserProfile, SavedProject } from "../types";

interface SettingsViewProps {
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  projects: SavedProject[];
  onClearProjects: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  user,
  onUpdateUser,
  isDarkMode,
  onToggleDarkMode,
  projects,
  onClearProjects,
}) => {
  const handleExportData = () => {
    const data = {
      user,
      projects,
      exportDate: new Date().toISOString(),
    };
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    element.href = URL.createObjectURL(file);
    element.download = `TubeGenius_Backup_${Date.now()}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-red-100 dark:bg-red-950/80 text-red-600">
          <SettingsIcon className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-bold text-lg text-slate-900 dark:text-white">
            App Settings & Preferences
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Configure channel default niche, dark/light theme, backup projects, and account settings.
          </p>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="space-y-4">
        {/* Appearance Settings */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            {isDarkMode ? <Moon className="w-4 h-4 text-amber-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
            Theme & Display Mode
          </h3>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">Dark / Light Mode</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Toggle between high-contrast dark theme and clean light theme.</div>
            </div>

            <button
              onClick={onToggleDarkMode}
              className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 font-bold text-xs text-slate-900 dark:text-white"
            >
              {isDarkMode ? "Dark Mode Active" : "Light Mode Active"}
            </button>
          </div>
        </div>

        {/* Default Channel Niche Settings */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <User className="w-4 h-4 text-red-500" />
            Channel Profile Settings
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                YouTube Channel Name
              </label>
              <input
                type="text"
                value={user.channelName}
                onChange={(e) => onUpdateUser({ channelName: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Channel Niche / Category
              </label>
              <input
                type="text"
                value={user.channelNiche}
                onChange={(e) => onUpdateUser({ channelNiche: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Data Backup & Restore */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Download className="w-4 h-4 text-blue-500" />
            Data Backup & Export
          </h3>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">Export Local Backup</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Download all your saved projects, scripts, and settings as JSON file.</div>
            </div>

            <button
              onClick={handleExportData}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON Backup</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
            <div>
              <div className="text-xs font-bold text-rose-500">Clear Saved Projects</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Permanently delete locally stored AI drafts.</div>
            </div>

            <button
              onClick={() => {
                if (confirm("Are you sure you want to clear all saved projects?")) {
                  onClearProjects();
                }
              }}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-2 whitespace-nowrap"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Cache</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
