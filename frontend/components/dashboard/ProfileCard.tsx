import type { User } from "@supabase/supabase-js";

interface Profile {
  id: string;
  email: string;
  name: string | null;
  created_at: string;
  email_verified: boolean;
}

interface ProfileCardProps {
  user: User;
  profile: Profile | null;
}

export function ProfileCard({ user, profile }: ProfileCardProps) {
  const name = profile?.name || user.user_metadata?.name || user.email?.split("@")[0] || "Founder";
  const email = profile?.email || user.email || "";
  const createdAt = profile?.created_at || user.created_at;
  const emailVerified = profile?.email_verified ?? !!user.email_confirmed_at;

  const signupDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="rounded-xl border border-[#1e1e2e] bg-[#0d0d16] p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-lg font-bold text-indigo-400">
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="text-sm text-[#8888a0] font-mono">{email}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {emailVerified ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-teal-500/10 border border-teal-500/20 text-teal-400">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Verified
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Unverified
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-[#1e1e2e] grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-[#8888a0] uppercase tracking-wider mb-1">Signed up</p>
          <p className="text-sm font-medium">{signupDate}</p>
        </div>
        <div>
          <p className="text-xs text-[#8888a0] uppercase tracking-wider mb-1">Account</p>
          <p className="text-sm font-medium">Free Plan</p>
        </div>
        <div>
          <p className="text-xs text-[#8888a0] uppercase tracking-wider mb-1">Status</p>
          <p className="text-sm font-medium text-teal-400">Active</p>
        </div>
      </div>
    </div>
  );
}
