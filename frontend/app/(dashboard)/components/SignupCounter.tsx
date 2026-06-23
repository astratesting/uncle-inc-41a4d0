"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Users } from "lucide-react";
import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

interface ProfileRow {
  id: string;
  created_at: string;
}

export function SignupCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const supabase = createClient();

    async function fetchCount() {
      const { count: c } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });
      if (c !== null) setCount(c);
    }

    fetchCount();

    const channel = supabase
      .channel("profiles-signups")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "profiles",
        },
        (_payload: RealtimePostgresChangesPayload<ProfileRow>) => {
          setCount((prev) => (prev !== null ? prev + 1 : prev));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-[#E8E0D8] p-6 card-hover forge-glow-violet">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center">
          <Users className="w-5 h-5 text-[#7C3AED]" />
        </div>
        <span className="text-xs font-medium text-[#7C3AED] bg-[#7C3AED]/10 px-2 py-0.5 rounded-full">
          Live
        </span>
      </div>
      <p className="font-heading text-3xl font-bold text-[#1F1F1F]">
        {count !== null ? count.toLocaleString() : "—"}
      </p>
      <p className="text-sm text-[#6B7280] mt-1">Total Signups</p>
    </div>
  );
}
