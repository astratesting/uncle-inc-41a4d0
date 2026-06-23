"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function WaitlistCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setMessage("You're on the list! We'll be in touch soon.");
      setEmail("");
    }, 1000);
  }

  return (
    <section className="py-24 px-4">
      <div className="mx-auto max-w-2xl text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 mb-6">
          <Send className="h-6 w-6 text-indigo-400" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Ready to Validate Your{" "}
          <span className="gradient-text">Startup Idea</span>?
        </h2>
        <p className="text-gray-400 mb-8 text-lg">
          Join early-access founders who are validating smarter and shipping faster.
          No spam, just product updates.
        </p>

        {status === "success" ? (
          <div className="rounded-lg border border-teal-500/30 bg-teal-500/10 px-6 py-4 text-teal-300">
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
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
      </div>
    </section>
  );
}
