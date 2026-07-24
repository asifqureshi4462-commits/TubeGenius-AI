import React, { useState } from "react";
import {
  Coins,
  Tv,
  CheckCircle2,
  Sparkles,
  Zap,
  Gift,
  ShieldCheck,
  Share2,
  Check,
} from "lucide-react";
import { UserProfile } from "../types";

interface MonetizationViewProps {
  user: UserProfile;
  onAddCredits: (amount: number) => void;
}

export const MonetizationView: React.FC<MonetizationViewProps> = ({ user, onAddCredits }) => {
  const [isWatchingAd, setIsWatchingAd] = useState<boolean>(false);
  const [adProgress, setAdProgress] = useState<number>(0);
  const [adSuccess, setAdSuccess] = useState<boolean>(false);
  const [referralCopied, setReferralCopied] = useState<boolean>(false);

  const handleWatchAd = () => {
    setIsWatchingAd(true);
    setAdProgress(0);
    setAdSuccess(false);

    let current = 0;
    const interval = setInterval(() => {
      current += 20;
      setAdProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setIsWatchingAd(false);
        onAddCredits(50);
        setAdSuccess(true);
        setTimeout(() => setAdSuccess(false), 3000);
      }
    }, 600);
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(`https://tubegenius.ai/invite?ref=${user.email.split("@")[0] || "creator"}`);
    setReferralCopied(true);
    setTimeout(() => setReferralCopied(false), 2000);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-slate-900 to-yellow-950 p-6 rounded-2xl border border-amber-900/40 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
            Monetization & Credits Center
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight mt-1">
            TubeGenius AI Credits & VIP Pro Pass
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Claim free daily credit refills, watch rewarded AdMob sponsors for instant boosts, or unlock unlimited Pro Studio access.
          </p>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex items-center gap-3">
          <Coins className="w-8 h-8 text-amber-400 fill-amber-400" />
          <div>
            <div className="text-xs text-slate-400 font-semibold">Current Balance</div>
            <div className="text-xl font-extrabold text-amber-400">{user.credits} AI Credits</div>
          </div>
        </div>
      </div>

      {/* AdMob Rewarded Action Card */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/40 rounded-2xl p-6 text-white shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Tv className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400">
                AdMob Rewarded Video Ad
              </span>
              <h3 className="font-extrabold text-lg text-white">Watch Sponsor Video (+50 Free Credits)</h3>
              <p className="text-xs text-slate-300">
                Watch a short 5-second sponsor video to immediately claim +50 bonus AI credits.
              </p>
            </div>
          </div>

          <button
            onClick={handleWatchAd}
            disabled={isWatchingAd}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isWatchingAd ? "Simulating AdMob Stream..." : "Watch Ad & Claim 50 Credits"}</span>
          </button>
        </div>

        {isWatchingAd && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-amber-400 font-semibold">
              <span>Playing Sponsor Video...</span>
              <span>{adProgress}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-400 h-full transition-all duration-300"
                style={{ width: `${adProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {adSuccess && (
          <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Success! +50 AI Credits added to your account balance!</span>
          </div>
        )}
      </div>

      {/* Credit Packs & Pro VIP Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Starter Free Tier */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Daily Free Plan</span>
            <h4 className="font-extrabold text-xl text-slate-900 dark:text-white">500 Daily Credits</h4>
            <div className="text-2xl font-black text-slate-900 dark:text-white">$0 <span className="text-xs text-slate-400 font-normal">/ month</span></div>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2 pt-2">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>50 AI generations per day</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>YouTube SEO Toolkit & Score</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>AdMob Rewarded Credits Refill</span>
              </li>
            </ul>
          </div>

          <div className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold text-center">
            Active Current Tier
          </div>
        </div>

        {/* Creator Pro VIP Tier */}
        <div className="bg-gradient-to-b from-red-950 via-slate-900 to-slate-900 border-2 border-red-500 rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4 text-white relative overflow-hidden">
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-red-600 text-white font-bold text-[10px] uppercase">
            POPULAR
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-red-400 uppercase">Creator Pro VIP</span>
            <h4 className="font-extrabold text-xl text-white">Unlimited Studio Access</h4>
            <div className="text-2xl font-black text-white">$12.99 <span className="text-xs text-slate-300 font-normal">/ month</span></div>
            <ul className="text-xs text-slate-200 space-y-2 pt-2">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-red-400" />
                <span>Unlimited AI Script & Title Generation</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-red-400" />
                <span>Priority Gemini 3.6 Flash AI Speed</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-red-400" />
                <span>Zero Ads & Unlimited Offline Backups</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => {
              onAddCredits(5000);
              alert("Pro VIP Activated! +5000 bonus credits added!");
            }}
            className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs shadow-md transition-all"
          >
            Upgrade to Pro VIP
          </button>
        </div>

        {/* Referral Program Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-purple-500 uppercase">Referral Program</span>
            <h4 className="font-extrabold text-xl text-slate-900 dark:text-white">Invite Creator Friends</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Earn +100 bonus AI credits for every creator friend who joins TubeGenius AI with your link.
            </p>
          </div>

          <button
            onClick={handleCopyReferral}
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            <span>{referralCopied ? "Link Copied!" : "Copy Invite Link"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
