import React, { useState } from "react";
import {
  FolderCheck,
  Search,
  Bookmark,
  Star,
  Plus,
  Trash2,
  Copy,
  Check,
  FileText,
  FolderPlus,
} from "lucide-react";
import { SavedProject, CreatorNote } from "../types";

interface ProductivityViewProps {
  projects: SavedProject[];
  onSelectProject: (project: SavedProject) => void;
  onDeleteProject: (id: string) => void;
}

export const ProductivityView: React.FC<ProductivityViewProps> = ({
  projects,
  onSelectProject,
  onDeleteProject,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"projects" | "notes">("projects");
  const [notes, setNotes] = useState<CreatorNote[]>([
    {
      id: "n1",
      title: "Hook Ideas for Camera Review Video",
      content: "1. Stop buying 4K cameras until you watch this.\n2. Is this $500 lens better than $2000 gear?\n3. The 1 setting that instantly fixes blurry footage.",
      updatedAt: "2026-07-22",
      folder: "Hardware Reviews",
      isFavorite: true,
    },
    {
      id: "n2",
      title: "Sponsor Pitch Script - NordVPN",
      content: "Thanks to NordVPN for sponsoring today's video. If you browse online at public coffee shops, your data is vulnerable...",
      updatedAt: "2026-07-20",
      folder: "Sponsorships",
      isFavorite: false,
    },
  ]);

  const [newNoteTitle, setNewNoteTitle] = useState<string>("");
  const [newNoteContent, setNewNoteContent] = useState<string>("");
  const [selectedFolder, setSelectedFolder] = useState<string>("All Folders");

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.result.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddNote = () => {
    if (!newNoteTitle.trim()) return;
    const newNote: CreatorNote = {
      id: `note_${Date.now()}`,
      title: newNoteTitle,
      content: newNoteContent,
      updatedAt: new Date().toISOString().split("T")[0],
      folder: "General",
      isFavorite: false,
    };
    setNotes([newNote, ...notes]);
    setNewNoteTitle("");
    setNewNoteContent("");
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Search Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="p-2.5 rounded-xl bg-red-100 dark:bg-red-950/80 text-red-600">
            <FolderCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-slate-900 dark:text-white">
              Creator Productivity Hub
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Access all saved AI scripts, prompt library, notes, and channel drafts.
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search saved projects and scripts..."
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab("projects")}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
            activeTab === "projects"
              ? "bg-red-600 text-white"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          Saved Projects ({projects.length})
        </button>

        <button
          onClick={() => setActiveTab("notes")}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
            activeTab === "notes"
              ? "bg-red-600 text-white"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          Creator Notes & Scratchpad ({notes.length})
        </button>
      </div>

      {/* Projects Tab Content */}
      {activeTab === "projects" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-red-500/50 transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-500/10 text-red-500 uppercase">
                      {proj.toolType}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{proj.createdAt}</span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                    {proj.title}
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-4 bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800/60 font-sans">
                    {proj.result}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 mt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => handleCopyText(proj.id, proj.result)}
                    className="flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  >
                    {copiedId === proj.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedId === proj.id ? "Copied" : "Copy"}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectProject(proj)}
                      className="text-xs font-bold text-red-500 hover:underline"
                    >
                      View Full
                    </button>
                    <button
                      onClick={() => onDeleteProject(proj.id)}
                      className="text-slate-400 hover:text-rose-500 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-slate-400 text-xs">
              No saved projects found matching search query.
            </div>
          )}
        </div>
      )}

      {/* Creator Notes Tab Content */}
      {activeTab === "notes" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* New Note Form (Left Column) */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-red-500" />
              Create Quick Creator Note
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Note Title
              </label>
              <input
                type="text"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
                placeholder="e.g., Ideas for Next Sponsor Slot..."
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Note Content
              </label>
              <textarea
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                rows={5}
                placeholder="Write video script outlines, hooks, or sponsor talk points..."
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white"
              ></textarea>
            </div>

            <button
              onClick={handleAddNote}
              disabled={!newNoteTitle.trim()}
              className="w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Save Note</span>
            </button>
          </div>

          {/* Saved Notes List (Right Column) */}
          <div className="lg:col-span-7 space-y-3">
            {notes.map((note) => (
              <div
                key={note.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {note.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono">{note.updatedAt}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 whitespace-pre-wrap font-sans bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800/80">
                  {note.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
