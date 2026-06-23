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
    <section id="waitlist" className="py-24 px-4">
      <div className="mx-auto max-w-2xl text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 border border-gold/20 mb-6">
          <Mail className="h-6 w-6 text-gold" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ivory mb-4">
          Join the Waitlist
        </h2>
        <p className="text-charcoal-400 mb-8 text-lg">
          Be among the first founders to validate smarter. No spam — just early
          access and product updates.
        </p>

        {status === "success" ? (
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-6 py-4 text-emerald-300">
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
              className="flex-1"
            />
            <Button type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Joining..." : "Join Waitlist"}
            </Button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-3 text-sm text-red-400">{message}</p>
        )}
      </div>
    </section>
  );
}