"use client";

import { useState, type FormEvent } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "You're on the list! We'll be in touch.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <section
      id="waitlist"
      className="py-24 px-4 bg-gradient-to-br from-violet-600 via-violet-700 to-violet-900 relative overflow-hidden"
    >
      {/* Decorative circles */}
      <div className="absolute top-10 right-10 h-64 w-64 rounded-full bg-coral-400/10 blur-[80px]" />
      <div className="absolute bottom-10 left-10 h-48 w-48 rounded-full bg-honey-400/10 blur-[60px]" />

      <div className="mx-auto max-w-2xl text-center relative z-10">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 border border-white/20 mb-6">
          <Mail className="h-7 w-7 text-white" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
          Join the Waitlist
        </h2>
        <p className="text-violet-200 mb-10 text-lg leading-relaxed">
          Be the first to know when Uncle Inc. launches. No spam — just
          early access and product updates.
        </p>

        {status === "success" ? (
          <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/20 px-6 py-5 text-emerald-200 font-medium">
            {message}
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 !bg-white/10 !border-white/20 !text-white !placeholder-violet-300 focus:!ring-white/30 focus:!border-white/40"
            />
            <Button
              type="submit"
              variant="coral"
              size="lg"
              disabled={status === "loading"}
              className="whitespace-nowrap"
            >
              {status === "loading" ? "Joining..." : "Get Early Access"}
            </Button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-3 text-sm text-red-300">{message}</p>
        )}
      </div>
    </section>
  );
}
