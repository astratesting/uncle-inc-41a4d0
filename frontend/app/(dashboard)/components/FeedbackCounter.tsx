"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { MessageSquare } from "lucide-react";
import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

interface FeedbackRow {
  id: string;
  created_at: string;
}

export function FeedbackCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const supabase = createClient();

    async function fetchCount() {
      const { count: c } = await supabase
        .from("feedback")
        .select("*", { count: "exact", head: true });
      if (c !== null) setCount(c);
    }

    fetchCount();

    const channel = supabase
      .channel("feedback-count")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "feedback",
        },
        (_payload: RealtimePostgresChangesPayload<FeedbackRow>) => {
          setCount((prev) => (prev !== null ? prev + 1 : prev));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-[#E8E0D8] p-6 card-hover forge-glow-coral">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-[#F97316]/10 flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-[#F97316]" />
        </div>
        <span className="text-xs font-medium text-[#F97316] bg-[#F97316]/10 px-2 py-0.5 rounded-full">
          Live
        </span>
      </div>
      <p className="font-heading text-3xl font-bold text-[#1F1F1F]">
        {count !== null ? count.toLocaleString() : "—"}
      </p>
      <p className="text-sm text-[#6B7280] mt-1">Feedback Submissions</p>
    </div>
  );
}
