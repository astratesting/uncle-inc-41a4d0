"use client";

import { useState, useEffect } from "react";

export function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [signupCount, setSignupCount] = useState<number | null>(null);
  const [verifiedCount, setVerifiedCount] = useState<number>(0);
  const [target, setTarget] = useState<number>(10);
  const [verifyUrl, setVerifyUrl] = useState<string>("");

  useEffect(() => {
    fetch("/api/signup-count")
      .then((res) => res.json())
      .then((data) => {
        setSignupCount(data.count);
        setVerifiedCount(data.verified ?? 0);
        setTarget(data.target ?? 10);
      })
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message);
        if (data.verifyUrl) setVerifyUrl(data.verifyUrl);
        setEmail("");
        setName("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="w-full max-w-md mx-auto text-center">
        <div className="p-6 rounded-2xl bg-gold-50 border border-gold-200">
          <svg
            className="w-10 h-10 text-gold mx-auto mb-3"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
          <p className="font-semibold text-charcoal mb-1">Check your inbox</p>
          <p className="text-sm text-charcoal-400 mb-3">{message}</p>
          {verifyUrl && (
            <div className="mt-3 p-3 rounded-lg bg-ivory border border-charcoal-100">
              <p className="text-xs text-charcoal-400 mb-1">
                Since we can&apos;t send real emails yet, use this verification link:
              </p>
              <a
                href={verifyUrl}
                className="text-sm font-medium text-burgundy hover:text-burgundy-800 break-all underline"
              >
                {verifyUrl}
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full px-5 py-3.5 rounded-xl bg-white border border-charcoal-100 text-charcoal placeholder-charcoal-300 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all text-base"
        />
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@startup.com"
            required
            className="flex-1 px-5 py-3.5 rounded-xl bg-white border border-charcoal-100 text-charcoal placeholder-charcoal-300 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all text-base"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-3.5 rounded-xl bg-charcoal text-ivory font-semibold hover:bg-charcoal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base whitespace-nowrap"
          >
            {status === "loading" ? "Joining..." : "Join the Waitlist"}
          </button>
        </div>
      </form>

      {status === "error" && (
        <p className="mt-3 text-sm text-burgundy text-center">{message}</p>
      )}

      {signupCount !== null && signupCount > 0 && (
        <p className="mt-4 text-xs text-charcoal-300 text-center">
          {verifiedCount} of {target} verified users &middot; {signupCount} {signupCount === 1 ? "signup" : "signups"} total
        </p>
      )}
    </div>
  );
}
