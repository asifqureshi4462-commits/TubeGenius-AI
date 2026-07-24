import React, { useState } from "react";
import {
  Image as ImageIcon,
  Type,
  Palette,
  Sparkles,
  Zap,
  Copy,
  Check,
  Flame,
  Layout,
  Smile,
  Eye,
} from "lucide-react";

export const ThumbnailStudioView: React.FC = () => {
  const [topicInput, setTopicInput] = useState<string>(
    "I Built an AI Robot in 24 Hours"
  );
  const [overlayText, setOverlayText] = useState<string>("IT WORKS?!");
  const [fontStyle, setFontStyle] = useState<string>("Impact Bold");
  const [colorTheme, setColorTheme] = useState<string>("Red & Yellow Gradient");
  const [emotionStyle, setEmotionStyle] = useState<string>("Shocked / High Contrast");

  const [promptResult, setPromptResult] = useState<string>(
    `3D cinematic thumbnail art of a shocked young creator pointing at a glowing holographic robot emitting bright neon blue particles. Hyper-detailed, 8k resolution, dramatic rim lighting, vibrant color contrast, 16:9 aspect ratio --ar 16:9 --v 6.0`
  );
  const [copied, setCopied] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleGeneratePrompt = async () => {
    if (!topicInput.trim()) return;
    setIsGenerating(true);

    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolType: "AI Thumbnail Prompt Generator",
          prompt: `Create a viral Midjourney thumbnail prompt and text overlay idea for YouTube video: "${topicInput}"`,
        }),
      });

      const data = await res.json();
      if (data.result) {
        setPromptResult(data.result);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(promptResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-slate-900 to-indigo-950 p-6 rounded-2xl border border-purple-900/40 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold border border-purple-500/30">
            Click-Through Rate (CTR) Optimizer
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight mt-1">
            Thumbnail Studio & Concept Generator
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Design high-converting YouTube thumbnails with Midjourney image prompts, punchy text overlays, and emotion guidance.
          </p>
        </div>

        <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex items-center gap-3">
          <Eye className="w-8 h-8 text-amber-400" />
          <div>
            <div className="text-xs text-slate-400 font-semibold">Estimated CTR Score</div>
            <div className="text-sm font-bold text-emerald-400">9.4% (Very High CTR)</div>
          </div>
        </div>
      </div>

      {/* Main Studio Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Parameters (Left Column) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-purple-500" />
              Thumbnail Design Settings
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Video Concept or Title
              </label>
              <input
                type="text"
                value={topicInput}
                onChange={(e) => setTopicInput(e.target.value)}
                placeholder="e.g., I Built a Secret Gaming Room..."
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Text Overlay (Max 3-4 Words)
              </label>
              <input
                type="text"
                value={overlayText}
                onChange={(e) => setOverlayText(e.target.value)}
                placeholder="e.g., IT WORKS?!"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none uppercase font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Font Style
                </label>
                <select
                  value={fontStyle}
                  onChange={(e) => setFontStyle(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white"
                >
                  <option>Impact Bold</option>
                  <option>Futuristic Neon</option>
                  <option>Minimalist Sans</option>
                  <option>Handwritten Marker</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Color Theme
                </label>
                <select
                  value={colorTheme}
                  onChange={(e) => setColorTheme(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white"
                >
                  <option>Red & Yellow Gradient</option>
                  <option>Neon Cyan & Purple</option>
                  <option>Dark & Gold Luxury</option>
                  <option>Bright Yellow & Black</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Emotion & Expression
              </label>
              <select
                value={emotionStyle}
                onChange={(e) => setEmotionStyle(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white"
              >
                <option>Shocked / High Contrast</option>
                <option>Curious / Mystery</option>
                <option>Extremely Happy / Victorious</option>
                <option>Serious / Professional</option>
              </select>
            </div>

            <button
              onClick={handleGeneratePrompt}
              disabled={isGenerating}
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              {isGenerating ? (
                <span>Generating Concept Prompt...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Image Prompt</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Canvas Preview & Prompt Output (Right Column) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Mock Visual Canvas */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Layout className="w-4 h-4 text-indigo-500" />
                Live 16:9 Thumbnail Mockup Preview
              </h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-500">
                1280 x 720 High Res
              </span>
            </div>

            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-gradient-to-tr from-purple-950 via-slate-900 to-red-950 border border-slate-800 shadow-inner flex items-center justify-center p-6 group">
              {/* Background Art Simulation */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.2),transparent)]"></div>
              
              {/* Center Emotion Graphic */}
              <div className="text-center z-10 space-y-2">
                <div className="inline-block px-4 py-2 rounded-2xl bg-amber-400 text-slate-950 font-black text-2xl md:text-4xl shadow-2xl tracking-tight border-2 border-white transform -rotate-2 group-hover:scale-105 transition-transform">
                  {overlayText || "TEXT HERE"}
                </div>
                <p className="text-xs text-amber-200/80 font-mono">
                  Theme: {colorTheme} • Font: {fontStyle}
                </p>
              </div>

              {/* Timestamp badge */}
              <div className="absolute bottom-3 right-3 bg-black/80 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                10:42
              </div>
            </div>
          </div>

          {/* AI Image Prompt Box */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-500" />
                Midjourney / DALL-E Image Prompt
              </h4>

              <button
                onClick={handleCopyPrompt}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy Prompt"}</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
              {promptResult}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
