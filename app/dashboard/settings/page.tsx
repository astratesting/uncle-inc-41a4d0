import { auth } from "@/lib/auth";
import { Card } from "@/components/ui/Card";
import { User, Mail, Calendar } from "lucide-react";

export default async function SettingsPage() {
  const session = await auth();

  const displayName = session?.user?.name ?? session?.user?.email?.split("@")[0] ?? "User";
  const email = session?.user?.email ?? "";

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage your account preferences
        </p>
      </div>

      <Card>
        <h3 className="text-lg font-heading font-semibold text-gray-900 mb-4">
          Account Information
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50">
            <User className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-400">Name</p>
              <p className="text-sm text-gray-900 font-medium">{displayName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50">
            <Mail className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-400">Email</p>
              <p className="text-sm text-gray-900 font-medium">{email}</p>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-heading font-semibold text-gray-900 mb-4">
          Plan
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Free Plan</p>
            <p className="text-sm text-gray-500">
              Basic features for early-stage founders
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 font-medium">
            Active
          </span>
        </div>
      </Card>
    </div>
  );
}
