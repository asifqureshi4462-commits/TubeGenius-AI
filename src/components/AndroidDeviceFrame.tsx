import React from "react";
import { Wifi, Signal, Battery, Clock } from "lucide-react";
import { AndroidBottomNav } from "./AndroidBottomNav";
import { ActiveTab } from "../types";

interface AndroidDeviceFrameProps {
  children: React.ReactNode;
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onCloseFrame: () => void;
}

export const AndroidDeviceFrame: React.FC<AndroidDeviceFrameProps> = ({
  children,
  activeTab,
  onTabChange,
  onCloseFrame,
}) => {
  const [timeString, setTimeString] = React.useState("09:41");

  React.useEffect(() => {
    const update = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })
      );
    };
    update();
    const timer = setInterval(update, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen py-6 px-2 bg-slate-950 flex flex-col items-center justify-center font-sans">
      {/* Top Controls info */}
      <div className="mb-4 text-center max-w-md">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
          Android Studio View Mode (Material Design 3)
        </span>
        <p className="text-xs text-slate-400 mt-1">
          Testing TubeGenius AI as an Android APK layout.
        </p>
      </div>

      {/* Mobile Shell Device */}
      <div className="w-full max-w-[420px] h-[840px] bg-slate-900 border-[8px] border-slate-800 rounded-[48px] shadow-2xl shadow-red-950/40 relative overflow-hidden flex flex-col">
        {/* Top Status Bar */}
        <div className="bg-slate-950 text-slate-300 px-6 py-2 flex items-center justify-between text-xs select-none z-30 shrink-0">
          <div className="flex items-center gap-1.5 font-semibold text-[11px] text-white">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>{timeString}</span>
          </div>

          {/* Camera Punchhole */}
          <div className="w-4 h-4 bg-black rounded-full border border-slate-800 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-slate-900 rounded-full"></div>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-bold text-slate-300">92%</span>
              <Battery className="w-4 h-4 text-emerald-400 fill-emerald-400" />
            </div>
          </div>
        </div>

        {/* Scrollable App Screen Content */}
        <div className="flex-1 overflow-y-auto bg-slate-900 text-slate-100 scrollbar-none relative">
          {children}
        </div>

        {/* Android Material 3 Bottom Navigation */}
        <div className="shrink-0">
          <AndroidBottomNav activeTab={activeTab} onTabChange={onTabChange} />
          {/* Gesture Pill */}
          <div className="bg-slate-900 py-1 flex justify-center items-center">
            <div className="w-28 h-1 bg-slate-700 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
