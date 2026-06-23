import { createClient } from "@/lib/supabase/server";
import { MessageSquare, Clock } from "lucide-react";

interface FeedbackItem {
  id: string;
  content: string;
  email: string;
  created_at: string;
}

export async function RecentFeedback() {
  const supabase = await createClient();

  const { data: feedback } = await supabase
    .from("feedback")
    .select("id, content, email, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  const items: FeedbackItem[] = feedback ?? [];

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-[#E8E0D8] p-6">
        <h3 className="font-heading text-lg font-semibold text-[#1F1F1F] mb-4">
          Recent Feedback
        </h3>
        <div className="text-center py-10">
          <div className="w-12 h-12 rounded-full bg-[#F5F0EB] flex items-center justify-center mx-auto mb-3">
            <MessageSquare className="w-5 h-5 text-[#9CA3AF]" />
          </div>
          <p className="text-sm text-[#6B7280]">No feedback yet.</p>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Be the first to share your thoughts!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#E8E0D8] p-6">
      <h3 className="font-heading text-lg font-semibold text-[#1F1F1F] mb-4">
        Recent Feedback
      </h3>
      <ul className="space-y-3">
        {items.map((item) => {
          const date = new Date(item.created_at);
          const timeAgo = getTimeAgo(date);

          return (
            <li
              key={item.id}
              className="group flex gap-3 p-3 rounded-xl hover:bg-[#FFFBF5] transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-[#F97316]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-[#F97316]">
                  {item.email?.charAt(0).toUpperCase() ?? "?"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#1F1F1F] leading-relaxed line-clamp-2">
                  {item.content}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-xs text-[#9CA3AF] truncate max-w-[140px]">
                    {item.email}
                  </span>
                  <span className="text-[#D1D5DB]">&middot;</span>
                  <span className="flex items-center gap-1 text-xs text-[#9CA3AF]">
                    <Clock className="w-3 h-3" />
                    {timeAgo}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
