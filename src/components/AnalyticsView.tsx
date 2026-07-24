import React from "react";
import {
  BarChart3,
  TrendingUp,
  Coins,
  Zap,
  Award,
  Clock,
  PieChart as PieChartIcon,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { UserProfile } from "../types";

interface AnalyticsViewProps {
  user: UserProfile;
  totalProjectsCount: number;
}

const WEEKLY_DATA = [
  { day: "Mon", projects: 4, credits: 40 },
  { day: "Tue", projects: 6, credits: 60 },
  { day: "Wed", projects: 3, credits: 30 },
  { day: "Thu", projects: 8, credits: 80 },
  { day: "Fri", projects: 12, credits: 120 },
  { day: "Sat", projects: 9, credits: 90 },
  { day: "Sun", projects: 5, credits: 50 },
];

const CATEGORY_DATA = [
  { name: "Scripting", value: 45, color: "#ef4444" },
  { name: "Ideation", value: 20, color: "#f59e0b" },
  { name: "YouTube SEO", value: 15, color: "#3b82f6" },
  { name: "Thumbnails", value: 12, color: "#8b5cf6" },
  { name: "Extra AI", value: 8, color: "#10b981" },
];

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ user, totalProjectsCount }) => {
  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-900 via-slate-900 to-red-950 p-6 rounded-2xl border border-rose-900/40 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-500/30">
            TubeGenius Creator Metrics
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight mt-1">
            AI Productivity & Channel Analytics
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Track AI credit efficiency, weekly project throughput, tool usage breakdown, and channel growth trajectory.
          </p>
        </div>

        <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 flex items-center gap-3">
          <Award className="w-8 h-8 text-amber-400" />
          <div>
            <div className="text-xs text-slate-400 font-semibold">Creator Efficiency Score</div>
            <div className="text-lg font-bold text-emerald-400">96 / 100 (Top 5%)</div>
          </div>
        </div>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-xs">
          <span className="text-xs font-semibold text-slate-400 uppercase">Total AI Projects</span>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            {totalProjectsCount + 24}
          </div>
          <span className="text-[10px] text-emerald-500 font-bold">+18% this week</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-xs">
          <span className="text-xs font-semibold text-slate-400 uppercase">Credits Consumed</span>
          <div className="text-2xl font-extrabold text-amber-500 mt-1">470</div>
          <span className="text-[10px] text-slate-400">Daily Reset Active</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-xs">
          <span className="text-xs font-semibold text-slate-400 uppercase">Saved Scripts</span>
          <div className="text-2xl font-extrabold text-red-500 mt-1">
            {totalProjectsCount}
          </div>
          <span className="text-[10px] text-emerald-500 font-bold">100% Offline Cached</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-xs">
          <span className="text-xs font-semibold text-slate-400 uppercase">Est. Time Saved</span>
          <div className="text-2xl font-extrabold text-blue-500 mt-1">14.5 Hours</div>
          <span className="text-[10px] text-blue-400 font-bold">vs manual writing</span>
        </div>
      </div>

      {/* Recharts Data Visualization Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Activity Bar Chart */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-red-500" />
              Weekly AI Project Output
            </h3>
            <span className="text-xs text-slate-400 font-mono">Last 7 Days</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEKLY_DATA}>
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#334155",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="projects" fill="#ef4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown Pie Chart */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <PieChartIcon className="w-4 h-4 text-amber-500" />
              AI Tool Usage Distribution
            </h3>
          </div>

          <div className="h-52 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {CATEGORY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-2 justify-center pt-2">
            {CATEGORY_DATA.map((c, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }}></span>
                <span>{c.name} ({c.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
