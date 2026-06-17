import { Settings } from "lucide-react";

export const dynamic = "force-dynamic";

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-[#8888a0] mt-1">
          Manage your account and preferences
        </p>
      </div>

      <div className="rounded-xl border border-[#1e1e2e] bg-[#0d0d16] p-8">
        <div className="flex items-center gap-4 mb-6">
          <Settings className="w-5 h-5 text-[#8888a0]" />
          <h2 className="text-lg font-semibold">Account Settings</h2>
        </div>
        <p className="text-sm text-[#8888a0]">
          Account settings and profile management will be available soon.
        </p>
      </div>
    </div>
  );
}
