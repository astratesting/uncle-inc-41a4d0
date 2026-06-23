import { SignupCounter } from "../components/SignupCounter";
import { FeedbackCounter } from "../components/FeedbackCounter";
import { FeedbackWidget } from "../components/FeedbackWidget";
import { RecentFeedback } from "../components/RecentFeedback";
import { Flame, ArrowRight } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function OverviewPage() {
  return (
    <div className="space-y-8">
      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] p-8 text-white">
        <div className="absolute top-4 right-6 opacity-10">
          <Flame className="w-32 h-32" />
        </div>
        <div className="relative z-10">
          <h2 className="font-heading text-2xl font-bold mb-2">
            Your Forge Dashboard
          </h2>
          <p className="text-white/80 text-sm max-w-lg leading-relaxed">
            Track your startup&apos;s growth in real time. Monitor signups,
            collect feedback from early users, and iterate toward product-market
            fit — all from one place.
          </p>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <SignupCounter />
        <FeedbackCounter />
      </div>

      {/* Feedback section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <RecentFeedback />
        </div>
        <div className="lg:col-span-2">
          <FeedbackWidget />
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/dashboard/projects"
          className="group flex items-center justify-between bg-white rounded-xl border border-[#E8E0D8] p-5 hover:border-[#7C3AED]/30 hover:shadow-md transition-all"
        >
          <div>
            <p className="font-heading font-semibold text-sm text-[#1F1F1F]">
              Projects
            </p>
            <p className="text-xs text-[#9CA3AF] mt-0.5">
              Manage your MVPs
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#7C3AED] transition-colors" />
        </Link>
        <Link
          href="/dashboard/analytics"
          className="group flex items-center justify-between bg-white rounded-xl border border-[#E8E0D8] p-5 hover:border-[#7C3AED]/30 hover:shadow-md transition-all"
        >
          <div>
            <p className="font-heading font-semibold text-sm text-[#1F1F1F]">
              Analytics
            </p>
            <p className="text-xs text-[#9CA3AF] mt-0.5">
              View your metrics
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#7C3AED] transition-colors" />
        </Link>
        <Link
          href="/dashboard/settings"
          className="group flex items-center justify-between bg-white rounded-xl border border-[#E8E0D8] p-5 hover:border-[#7C3AED]/30 hover:shadow-md transition-all"
        >
          <div>
            <p className="font-heading font-semibold text-sm text-[#1F1F1F]">
              Settings
            </p>
            <p className="text-xs text-[#9CA3AF] mt-0.5">
              Account & billing
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#7C3AED] transition-colors" />
        </Link>
      </div>
    </div>
  );
}
