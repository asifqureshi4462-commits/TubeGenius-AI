import React, { useState } from "react";
import {
  Sparkles,
  Copy,
  Check,
  Bookmark,
  Share2,
  RefreshCw,
  Zap,
  ChevronRight,
  Filter,
  SlidersHorizontal,
  Bot,
  FileCheck,
  Download,
} from "lucide-react";
import { AI_TOOLS } from "../data/toolsData";
import { AITool, ToolCategory, SavedProject, UserProfile } from "../types";

interface AIStudioViewProps {
  user: UserProfile;
  initialTopic?: string;
  onSaveProject: (project: Omit<SavedProject, "id" | "createdAt">) => void;
  onDeductCredits: (amount: number) => boolean;
}

export const AIStudioView: React.FC<AIStudioViewProps> = ({
  user,
  initialTopic = "",
  onSaveProject,
  onDeductCredits,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | "all">("all");
  const [activeTool, setActiveTool] = useState<AITool>(AI_TOOLS[2]); // Default: AI Script Writer / Shorts
  const [promptInput, setPromptInput] = useState<string>(initialTopic || "");
  const [channelNiche, setChannelNiche] = useState<string>(user.channelNiche || "Tech & YouTube Growth");
  const [tone, setTone] = useState<string>("Energetic & Engaging");
  const [language, setLanguage] = useState<string>("English");
  const [targetAudience, setTargetAudience] = useState<string>("General Viewers & Subscribers");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedOutput, setGeneratedOutput] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const filteredTools =
    selectedCategory === "all"
      ? AI_TOOLS
      : AI_TOOLS.filter((tool) => tool.category === selectedCategory);

  const handleGenerate = async () => {
    if (!promptInput.trim()) return;

    // Check credits
    const hasCredits = onDeductCredits(10);
    if (!hasCredits) {
      alert("Out of credits! Please claim free daily credits or complete a reward action.");
      return;
    }

    setIsLoading(true);
    setCopied(false);
    setSavedSuccess(false);

    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolType: activeTool.name,
          prompt: promptInput,
          channelNiche,
          tone,
          language,
          targetAudience,
        }),
      });

      const data = await response.json();
      if (data.result) {
        setGeneratedOutput(data.result);
      } else {
        setGeneratedOutput("Failed to generate response. Please try again.");
      }
    } catch (err: any) {
      console.error(err);
      setGeneratedOutput("Error connecting to TubeGenius AI backend service.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedOutput) return;
    navigator.clipboard.writeText(generatedOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (!generatedOutput) return;
    onSaveProject({
      title: `${activeTool.name}: ${promptInput.slice(0, 30)}...`,
      toolType: activeTool.name,
      category: activeTool.category,
      prompt: promptInput,
      result: generatedOutput,
      isFavorite: false,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleDownload = () => {
    if (!generatedOutput) return;
    const element = document.createElement("a");
    const file = new Blob([generatedOutput], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = `TubeGenius_${activeTool.id}_${Date.now()}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            selectedCategory === "all"
              ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-sm"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
          }`}
        >
          All 20+ Tools
        </button>
        {(
          [
            "ideation",
            "scripting",
            "titles_tags",
            "thumbnail",
            "engagement",
            "multiplatform",
            "extra",
          ] as ToolCategory[]
        ).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? "bg-red-600 text-white shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
            }`}
          >
            {cat.replace("_", " & ")}
          </button>
        ))}
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Tool Selector List (Left Column) */}
        <div className="lg:col-span-4 space-y-3 max-h-[680px] overflow-y-auto pr-1">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
            Select Creator Tool
          </h3>
          <div className="space-y-2">
            {filteredTools.map((tool) => {
              const isSelected = activeTool.id === tool.id;
              return (
                <div
                  key={tool.id}
                  onClick={() => setActiveTool(tool)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                    isSelected
                      ? "bg-red-500/10 dark:bg-red-950/40 border-red-500 dark:border-red-500 shadow-xs"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h4
                        className={`font-bold text-sm ${
                          isSelected ? "text-red-600 dark:text-red-400" : "text-slate-900 dark:text-white"
                        }`}
                      >
                        {tool.name}
                      </h4>
                      {tool.isPopular && (
                        <span className="px-1.5 py-0.2 text-[9px] font-bold rounded bg-amber-500/20 text-amber-600 dark:text-amber-400">
                          POPULAR
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                      {tool.description}
                    </p>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 mt-1 ${
                      isSelected ? "text-red-500" : "text-slate-400"
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Prompt Input & Live Output (Right Column) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Tool Config & Prompt Box */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-red-600 text-white font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    {activeTool.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {activeTool.description}
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 self-start sm:self-center">
                10 Credits / Generation
              </span>
            </div>

            {/* Parameter Settings Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs">
              <div>
                <label className="block text-slate-500 dark:text-slate-400 font-medium mb-1">Niche</label>
                <input
                  type="text"
                  value={channelNiche}
                  onChange={(e) => setChannelNiche(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-900 dark:text-white font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-500 dark:text-slate-400 font-medium mb-1">Tone</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1.5 text-slate-900 dark:text-white font-medium"
                >
                  <option>Energetic & Engaging</option>
                  <option>Educational & Clear</option>
                  <option>Dramatic & Storytelling</option>
                  <option>Humorous & Relatable</option>
                  <option>Professional & Authoritative</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-500 dark:text-slate-400 font-medium mb-1">Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1.5 text-slate-900 dark:text-white font-medium"
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>Hindi</option>
                  <option>German</option>
                  <option>Japanese</option>
                  <option>French</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-500 dark:text-slate-400 font-medium mb-1">Audience</label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-900 dark:text-white font-medium"
                />
              </div>
            </div>

            {/* Text Area Prompt Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Enter Video Topic, Details, or Raw Text:
              </label>
              <textarea
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder={activeTool.promptPlaceholder}
                rows={4}
                className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition-all placeholder:text-slate-400"
              ></textarea>
            </div>

            {/* Suggested Prompts Badges */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                Suggested Prompts:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeTool.suggestedPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => setPromptInput(prompt)}
                    className="text-[11px] px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-red-500 hover:text-white transition-colors"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Action Button */}
            <button
              onClick={handleGenerate}
              disabled={isLoading || !promptInput.trim()}
              className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all shadow-md ${
                isLoading || !promptInput.trim()
                  ? "bg-slate-400 dark:bg-slate-800 cursor-not-allowed"
                  : "bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 shadow-red-600/30"
              }`}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>TubeGenius AI is Thinking...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  <span>Generate Content (-10 Credits)</span>
                </>
              )}
            </button>
          </div>

          {/* Generated Result Container */}
          {generatedOutput && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-red-500" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    Generated Result
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied!" : "Copy"}</span>
                  </button>

                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    {savedSuccess ? (
                      <FileCheck className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Bookmark className="w-3.5 h-3.5 text-red-500" />
                    )}
                    <span>{savedSuccess ? "Saved!" : "Save Draft"}</span>
                  </button>

                  <button
                    onClick={handleDownload}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                    title="Download as Markdown"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 whitespace-pre-wrap font-sans">
                {generatedOutput}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
