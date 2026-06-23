"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AuthFormCard } from "@/components/ui/AuthFormCard";

export default function VerifyPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenHash = params.get("token_hash");
    const type = params.get("type") || "signup";

    if (!tokenHash) {
      setStatus("error");
      setMessage("No verification token found. Please check your email for the verification link.");
      return;
    }

    fetch(`/api/auth/verify?token_hash=${encodeURIComponent(tokenHash)}&type=${encodeURIComponent(type)}`)
      .then((res) => {
        if (res.redirected) {
          window.location.href = res.url;
          return;
        }
        if (res.ok) {
          setStatus("success");
          setMessage("Your email has been verified! Redirecting to dashboard...");
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 2000);
        } else {
          return res.json().then((data) => {
            setStatus("error");
            setMessage(data.error || "Verification failed. Please try again.");
          });
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      });
  }, []);

  return (
    <AuthFormCard
      title={status === "loading" ? "Verifying your email..." : status === "success" ? "Email verified!" : "Verification failed"}
      subtitle={status === "loading" ? "Please wait while we confirm your email address." : undefined}
    >
      <div className="text-center space-y-4">
        {status === "loading" && (
          <div className="flex justify-center py-6">
            <div className="w-8 h-8 border-2 border-[#7C3AED]/20 border-t-[#7C3AED] rounded-full animate-spin" />
          </div>
        )}

        {status === "success" && (
          <div className="py-4">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-sm text-[#6B5E7A]">{message}</p>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
              {message}
            </div>
            <div className="flex flex-col gap-2">
              <Link
                href="/sign-in"
                className="w-full py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold transition-colors text-center"
              >
                Go to Sign In
              </Link>
              <Link
                href="/sign-up"
                className="w-full py-2.5 rounded-xl border border-[#E8E0D8] hover:bg-[#F5F0EB] text-[#1A1025] font-medium transition-colors text-center"
              >
                Create Account
              </Link>
            </div>
          </div>
        )}
      </div>
    </AuthFormCard>
  );
}
