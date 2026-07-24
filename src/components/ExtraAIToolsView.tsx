import React, { useState } from "react";
import {
  Wand2,
  RefreshCw,
  Sparkles,
  Copy,
  Check,
  Zap,
  Globe,
  Sliders,
  Maximize2,
  Minimize2,
} from "lucide-react";

const EXTRA_TOOLS = [
  { id: "script_rewriter", name: "Script Rewriter & Polisher", icon: RefreshCw, desc: "Rewrite awkward sentences, improve pace, and enhance retention flow." },
  { id: "grammar_fixer", name: "Grammar & Flow Fixer", icon: Check, desc: "Fix typos, awkward phrasing, and smooth on-camera pronunciation." },
  { id: "script_expander", name: "Script Expander", icon: Maximize2, desc: "Expand short bullet points into rich 10-minute video paragraphs." },
  { id: "script_shortener", name: "Script Shortener", icon: Minimize2, desc: "Trim long script rambles into 60-second punchy Shorts scripts." },
  { id: "tone_changer", name: "Tone Changer", icon: Sliders, desc: "Convert formal text into energetic, humorous, or mysterious narration." },
  { id: "translator", name: "Multi-Language Translator", icon: Globe, desc: "Translate video metadata and scripts into 30+ languages." },
];

export const ExtraAIToolsView: React.FC = () => {
  const [activeToolId, setActiveToolId] = useState<string>("script_rewriter");
  const [inputText, setInputText] = useState<string>(
    "In this video I will show you how I built a computer program that can automatically edit videos for YouTube."
  );
  const [targetTone, setTargetTone] = useState<string>("High Energy & Dramatic");
  const [targetLang, setTargetLang] = useState<string>("Spanish");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [resultOutput, setResultOutput] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const activeTool = EXTRA_TOOLS.find((t) => t.id === activeToolId) || EXTRA_TOOLS[0];

  const handleProcess = async () => {
    if (!inputText.trim()) return;
    setIsProcessing(true);

    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolType: activeTool.name,
          prompt: inputText,
          tone: targetTone,
          language: targetLang,
        }),
      });

      const data = await res.json();
      if (data.result) {
        setResultOutput(data.result);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(resultOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-slate-900 to-orange-950 p-6 rounded-2xl border border-amber-900/40 text-white shadow-xl">
        <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
          Specialized Utility Engine
        </span>
        <h2 className="text-2xl font-extrabold tracking-tight mt-1">
          Extra Creator AI Tools
        </h2>
        <p className="text-xs text-slate-300 mt-1 max-w-xl">
          Polish scripts, fix grammar, expand bullet points, adjust speaking tone, and translate metadata for global distribution.
        </p>
      </div>

      {/* Tools Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {EXTRA_TOOLS.map((tool) => {
          const Icon = tool.icon;
          const isSelected = activeToolId === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => setActiveToolId(tool.id)}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 ${
                isSelected
                  ? "bg-amber-500/10 border-amber-500 text-amber-500 shadow-xs"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300"
              }`}
            >
              <Icon className="w-5 h-5" />
              <div>
                <div className="font-bold text-xs">{tool.name}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Form Workspace */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
          <Wand2 className="w-5 h-5 text-amber-500" />
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            {activeTool.name}
          </h3>
        </div>

        {activeToolId === "tone_changer" && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Select Target Tone
            </label>
            <select
              value={targetTone}
              onChange={(e) => setTargetTone(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
            >
              <option>High Energy & Dramatic</option>
              <option>Humorous & Sarcastic</option>
              <option>Calm & Educational</option>
              <option>Professional Corporate</option>
            </select>
          </div>
        )}

        {activeToolId === "translator" && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Select Target Language
            </label>
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
            >
              <option>Spanish</option>
              <option>Hindi</option>
              <option>German</option>
              <option>Japanese</option>
              <option>Portuguese</option>
              <option>French</option>
            </select>
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Input Text / Script Segment
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={4}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
          ></textarea>
        </div>

        <button
          onClick={handleProcess}
          disabled={isProcessing || !inputText.trim()}
          className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          {isProcessing ? (
            <span>Processing Text...</span>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Apply {activeTool.name}</span>
            </>
          )}
        </button>

        {resultOutput && (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 mt-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="font-bold text-xs text-slate-900 dark:text-white">Enhanced Output</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs text-amber-500 font-bold"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <p className="text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap font-sans">
              {resultOutput}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
