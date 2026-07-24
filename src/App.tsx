import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Navigation } from "./components/Navigation";
import { DashboardView } from "./components/DashboardView";
import { AIStudioView } from "./components/AIStudioView";
import { SEOToolkitView } from "./components/SEOToolkitView";
import { ThumbnailStudioView } from "./components/ThumbnailStudioView";
import { ContentPlannerView } from "./components/ContentPlannerView";
import { ProductivityView } from "./components/ProductivityView";
import { AnalyticsView } from "./components/AnalyticsView";
import { ExtraAIToolsView } from "./components/ExtraAIToolsView";
import { MonetizationView } from "./components/MonetizationView";
import { SettingsView } from "./components/SettingsView";
import { AuthModal } from "./components/AuthModal";
import { AndroidDeviceFrame } from "./components/AndroidDeviceFrame";
import { ActiveTab, UserProfile, SavedProject } from "./types";
import { X, Copy, Check, Sparkles } from "lucide-react";

const INITIAL_PROJECTS: SavedProject[] = [
  {
    id: "proj_1",
    title: "AI Script: How I Built a Robot in 24 Hours",
    toolType: "AI Script Writer",
    category: "scripting",
    prompt: "Write an engaging 10-minute video script about building a voice assistant robot.",
    result: `[HOOK - 00:00]
"I spent the last 24 hours locked in my garage attempting to build an AI robot that responds in real-time... and on hour 22, something insane happened."

[INTRO - 00:30]
"Welcome back! In today's video, we are combining Raspberry Pi, Gemini 3.6 Flash API, and custom 3D printed servo motors to construct an autonomous creator assistant."

[SECTION 1: THE HARDWARE SETUP - 02:15]
"First step was mounting the ultrasonic distance sensor onto the front frame..."`,
    createdAt: "2026-07-22",
    isFavorite: true,
  },
  {
    id: "proj_2",
    title: "10 High-CTR Titles: Coding Tutorials 2026",
    toolType: "AI Title Generator",
    category: "titles_tags",
    prompt: "Generate 10 viral titles for Python programming tutorial.",
    result: `1. Stop Learning Python Wrong in 2026 (Do This Instead)
2. How I Mastered Python in 30 Days (Full Roadmap)
3. 5 Python Tricks Senior Engineers Never Tell Beginners
4. The Only Python Tutorial You Will Ever Need
5. Why 90% of Coding Beginners Fail in the First Month`,
    createdAt: "2026-07-21",
    isFavorite: false,
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("dashboard");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isAndroidFrame, setIsAndroidFrame] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem("tubegenius_user");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      name: "Alex Vance",
      email: "alex.creator@youtube.com",
      channelName: "TechVision Studio",
      channelNiche: "Tech & Coding Tutorials",
      subscribersGoal: 100000,
      currentSubscribers: 42500,
      credits: 480,
      maxDailyCredits: 500,
      isPremium: true,
      avatar: "",
    };
  });

  const [projects, setProjects] = useState<SavedProject[]>(() => {
    const saved = localStorage.getItem("tubegenius_projects");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_PROJECTS;
  });

  const [quickTopic, setQuickTopic] = useState<string>("");
  const [selectedProjectModal, setSelectedProjectModal] = useState<SavedProject | null>(null);
  const [copiedModal, setCopiedModal] = useState<boolean>(false);

  // Sync dark mode class with body
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Persist storage
  useEffect(() => {
    localStorage.setItem("tubegenius_user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("tubegenius_projects", JSON.stringify(projects));
  }, [projects]);

  const handleUpdateUser = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
  };

  const handleSaveProject = (newProj: Omit<SavedProject, "id" | "createdAt">) => {
    const created: SavedProject = {
      ...newProj,
      id: `proj_${Date.now()}`,
      createdAt: new Date().toLocaleDateString(),
    };
    setProjects((prev) => [created, ...prev]);
  };

  const handleDeleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const handleClearProjects = () => {
    setProjects([]);
  };

  const handleDeductCredits = (amount: number): boolean => {
    if (user.credits < amount) return false;
    setUser((prev) => ({ ...prev, credits: prev.credits - amount }));
    return true;
  };

  const handleAddCredits = (amount: number) => {
    setUser((prev) => ({ ...prev, credits: prev.credits + amount }));
  };

  // Render main screen view
  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <DashboardView
            user={user}
            projects={projects}
            onNavigateTab={setActiveTab}
            onSelectProject={setSelectedProjectModal}
            onOpenMonetization={() => setActiveTab("monetization")}
            onQuickTopicSelect={(topic) => {
              setQuickTopic(topic);
              setActiveTab("aistudio");
            }}
          />
        );
      case "aistudio":
        return (
          <AIStudioView
            user={user}
            initialTopic={quickTopic}
            onSaveProject={handleSaveProject}
            onDeductCredits={handleDeductCredits}
          />
        );
      case "seotoolkit":
        return <SEOToolkitView />;
      case "thumbnailstudio":
        return <ThumbnailStudioView />;
      case "planner":
        return <ContentPlannerView />;
      case "productivity":
        return (
          <ProductivityView
            projects={projects}
            onSelectProject={setSelectedProjectModal}
            onDeleteProject={handleDeleteProject}
          />
        );
      case "analytics":
        return <AnalyticsView user={user} totalProjectsCount={projects.length} />;
      case "extraai":
        return <ExtraAIToolsView />;
      case "monetization":
        return <MonetizationView user={user} onAddCredits={handleAddCredits} />;
      case "settings":
        return (
          <SettingsView
            user={user}
            onUpdateUser={handleUpdateUser}
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            projects={projects}
            onClearProjects={handleClearProjects}
          />
        );
      default:
        return (
          <DashboardView
            user={user}
            projects={projects}
            onNavigateTab={setActiveTab}
            onSelectProject={setSelectedProjectModal}
            onOpenMonetization={() => setActiveTab("monetization")}
            onQuickTopicSelect={(topic) => {
              setQuickTopic(topic);
              setActiveTab("aistudio");
            }}
          />
        );
    }
  };

  const mainAppLayout = (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors font-sans pb-12">
      <Header
        user={user}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        isAndroidFrame={isAndroidFrame}
        onToggleAndroidFrame={() => setIsAndroidFrame(!isAndroidFrame)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenMonetization={() => setActiveTab("monetization")}
      />

      {!isAndroidFrame && (
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      )}

      <main>{renderTabContent()}</main>

      {/* Project Inspector Detail Modal */}
      {selectedProjectModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProjectModal(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-red-500" />
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                {selectedProjectModal.title}
              </h3>
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <span className="font-bold uppercase text-red-500">{selectedProjectModal.toolType}</span>
              <span>• Created {selectedProjectModal.createdAt}</span>
            </div>

            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs space-y-1">
              <span className="font-bold text-slate-700 dark:text-slate-300">Prompt Used:</span>
              <p className="text-slate-600 dark:text-slate-400 italic">{selectedProjectModal.prompt}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-sans text-xs leading-relaxed whitespace-pre-wrap text-slate-800 dark:text-slate-200">
              {selectedProjectModal.result}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(selectedProjectModal.result);
                  setCopiedModal(true);
                  setTimeout(() => setCopiedModal(false), 2000);
                }}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5"
              >
                {copiedModal ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedModal ? "Copied to Clipboard!" : "Copy Full Script"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        user={user}
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onUpdateUser={handleUpdateUser}
      />
    </div>
  );

  if (isAndroidFrame) {
    return (
      <AndroidDeviceFrame
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onCloseFrame={() => setIsAndroidFrame(false)}
      >
        {mainAppLayout}
      </AndroidDeviceFrame>
    );
  }

  return mainAppLayout;
}
