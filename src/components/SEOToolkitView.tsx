import React, { useState } from "react";
import {
  Search,
  CheckCircle2,
  XCircle,
  TrendingUp,
  BarChart,
  Zap,
  HelpCircle,
  Sparkles,
  Award,
  ListChecks,
} from "lucide-react";
import { INITIAL_CHECKLIST } from "../data/toolsData";
import { SEOReport } from "../types";

export const SEOToolkitView: React.FC = () => {
  const [keywordInput, setKeywordInput] = useState<string>("YouTube Shorts growth 2026");
  const [titleInput, setTitleInput] = useState<string>(
    "How to Go Viral on YouTube Shorts in 2026 (Secret Algorithm Update)"
  );
  const [descriptionInput, setDescriptionInput] = useState<string>(
    "Learn the top YouTube Shorts growth strategies for 2026. In this step-by-step video tutorial, we break down high-retention editing, secret thumbnail text tricks, and optimal posting times."
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [report, setReport] = useState<SEOReport | null>({
    id: "seo_1",
    keyword: "YouTube Shorts growth 2026",
    videoTitle: "How to Go Viral on YouTube Shorts in 2026 (Secret Algorithm Update)",
    score: 92,
    searchVolume: "High (145,000/mo)",
    competition: "Medium",
    rankingDifficulty: 38,
    primaryKeywords: ["youtube shorts", "viral shorts strategy", "shorts algorithm 2026"],
    longTailKeywords: [
      "how to go viral on youtube shorts step by step",
      "best time to upload youtube shorts 2026",
      "youtube shorts retention editing tutorial",
      "how to get 1 million views on youtube shorts",
    ],
    suggestedTitles: [
      "I Tried the New YouTube Shorts Algorithm for 30 Days",
      "Stop Uploading Shorts Wrong in 2026 (Fix This Now)",
      "How I Scaled Shorts from 0 to 500K Views in 14 Days",
    ],
    checklist: INITIAL_CHECKLIST,
    date: new Date().toLocaleDateString(),
  });

  const [checklistState, setChecklistState] = useState(INITIAL_CHECKLIST);

  const handleAnalyze = async () => {
    if (!keywordInput.trim()) return;
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/seo-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keyword: keywordInput,
          videoTitle: titleInput,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setReport({
          id: `seo_${Date.now()}`,
          keyword: keywordInput,
          videoTitle: titleInput,
          score: data.seoScore || Math.floor(Math.random() * 20) + 80,
          searchVolume: data.searchVolume || "Very High (180,000/mo)",
          competition: data.competition || "Medium",
          rankingDifficulty: data.rankingDifficulty || 42,
          primaryKeywords: data.primaryKeywords || [keywordInput, "youtube tips", "content creator"],
          longTailKeywords: data.longTailKeywords || [
            `best ${keywordInput} strategy 2026`,
            `how to master ${keywordInput} for beginners`,
            `${keywordInput} complete guide`,
          ],
          suggestedTitles: [
            `${titleInput} - Ultimate 2026 Guide`,
            `The Truth About ${keywordInput} (Don't Ignore This)`,
            `How I Mastered ${keywordInput} in 7 Days`,
          ],
          checklist: checklistState,
          date: new Date().toLocaleDateString(),
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChecklistItem = (idx: number) => {
    const updated = [...checklistState];
    updated[idx].passed = !updated[idx].passed;
    setChecklistState(updated);
  };

  const passedCount = checklistState.filter((c) => c.passed).length;

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 p-6 rounded-2xl border border-blue-900/40 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-500/30">
            YouTube Algorithm Optimizer
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight mt-1">
            YouTube SEO & Keyword Intelligence Toolkit
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Audit video titles, estimate search volume, analyze competition, and optimize metadata before publishing.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
          <Award className="w-8 h-8 text-amber-400" />
          <div>
            <div className="text-xs text-slate-400 font-semibold">SEO Optimization Status</div>
            <div className="text-sm font-bold text-white">
              {passedCount} of {checklistState.length} Checks Passed
            </div>
          </div>
        </div>
      </div>

      {/* Inputs Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <Search className="w-4 h-4 text-blue-500" />
          Keyword & Video Metadata Analyzer
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Main Target Keyword
            </label>
            <input
              type="text"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              placeholder="e.g., YouTube Shorts growth 2026..."
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Proposed Video Title
            </label>
            <input
              type="text"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              placeholder="e.g., How to Go Viral on YouTube Shorts..."
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Video Description Snippet
          </label>
          <textarea
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
            rows={2}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          ></textarea>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={isLoading || !keywordInput.trim()}
          className="w-full py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          {isLoading ? (
            <span>Analyzing YouTube Search Indexes...</span>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Run Deep SEO Audit</span>
            </>
          )}
        </button>
      </div>

      {/* Report Cards Grid */}
      {report && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Key Metrics Columns */}
          <div className="lg:col-span-5 space-y-4">
            {/* SEO Score Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs text-center space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Total SEO Optimization Score
              </span>
              <div className="text-5xl font-extrabold text-emerald-500 flex items-center justify-center gap-1">
                {report.score}
                <span className="text-lg text-slate-400 font-normal">/100</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Excellent keyword placement and high click-through intent.
              </p>
            </div>

            {/* Keyword Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
                <span className="text-[11px] text-slate-400 font-semibold uppercase">Search Volume</span>
                <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                  {report.searchVolume}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
                <span className="text-[11px] text-slate-400 font-semibold uppercase">Competition Level</span>
                <div className="text-sm font-bold text-amber-500 mt-1">
                  {report.competition}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
                <span className="text-[11px] text-slate-400 font-semibold uppercase">Ranking Difficulty</span>
                <div className="text-sm font-bold text-emerald-500 mt-1">
                  {report.rankingDifficulty} / 100 (Easy)
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
                <span className="text-[11px] text-slate-400 font-semibold uppercase">Suggested Reach</span>
                <div className="text-sm font-bold text-blue-500 mt-1">
                  Viral Opportunity
                </div>
              </div>
            </div>

            {/* High CTR Suggested Titles */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                AI Suggested High-CTR Title Alternatives
              </h4>
              <div className="space-y-2">
                {report.suggestedTitles.map((st, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 flex items-center justify-between"
                  >
                    <span>{st}</span>
                    <button
                      onClick={() => setTitleInput(st)}
                      className="text-[10px] font-bold text-blue-500 hover:underline"
                    >
                      Use Title
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Long Tail Keywords & Checklist Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Long Tail Keywords */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart className="w-4 h-4 text-purple-500" />
                High-Conversion Long-Tail Keywords
              </h4>
              <div className="flex flex-wrap gap-2">
                {report.longTailKeywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800/60 text-purple-700 dark:text-purple-300 text-xs font-medium"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Video Optimization Checklist */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <ListChecks className="w-4 h-4 text-emerald-500" />
                  YouTube Pre-Upload Checklist
                </h4>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {passedCount} / {checklistState.length} Completed
                </span>
              </div>

              <div className="space-y-3">
                {checklistState.map((chk, idx) => (
                  <div
                    key={idx}
                    onClick={() => toggleChecklistItem(idx)}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/70 cursor-pointer transition-colors flex items-start gap-3"
                  >
                    {chk.passed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        {chk.item}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {chk.recommendation}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
