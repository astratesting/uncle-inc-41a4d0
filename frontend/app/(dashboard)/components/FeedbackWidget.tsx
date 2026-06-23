"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Send, CheckCircle } from "lucide-react";

export function FeedbackWidget() {
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;

    setStatus("loading");

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setStatus("error");
      return;
    }

    const { error } = await supabase.from("feedback").insert({
      user_id: user.id,
      email: user.email,
      content: content.trim(),
    });

    if (error) {
      setStatus("error");
    } else {
      setStatus("success");
      setContent("");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-[#E8E0D8] p-6">
      <h3 className="font-heading text-lg font-semibold text-[#1F1F1F] mb-1">
        Share Feedback
      </h3>
      <p className="text-sm text-[#6B7280] mb-4">
        Help us improve Uncle Inc. — every piece of feedback counts.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind? Feature request, bug report, or general thoughts..."
          rows={3}
          className="w-full rounded-xl border border-[#E8E0D8] bg-[#FFFBF5] px-4 py-3 text-sm text-[#1F1F1F] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] transition-all resize-none"
        />
        <div className="flex items-center justify-between">
          <div>
            {status === "success" && (
              <span className="flex items-center gap-1.5 text-sm text-emerald-600">
                <CheckCircle className="w-4 h-4" />
                Submitted — thank you!
              </span>
            )}
            {status === "error" && (
              <span className="text-sm text-red-500">
                Something went wrong. Please try again.
              </span>
            )}
          </div>
          <button
            type="submit"
            disabled={status === "loading" || !content.trim()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            {status === "loading" ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {status === "loading" ? "Sending..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
