import { Card } from "@/components/ui/Card";
import { User, Mail, Calendar, Shield } from "lucide-react";
import { demoUser } from "@/lib/demo-data";

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage your account settings
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
              <p className="text-sm text-gray-900 font-medium">{demoUser.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50">
            <Mail className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-400">Email</p>
              <p className="text-sm text-gray-900 font-medium">{demoUser.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50">
            <Calendar className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-400">Joined</p>
              <p className="text-sm text-gray-900 font-medium">January 15, 2025</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50">
            <Shield className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-400">Plan</p>
              <p className="text-sm text-gray-900 font-medium">Free (Demo)</p>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-heading font-semibold text-gray-900 mb-4">
          Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-xl border border-gray-200 bg-gray-50">
            <div>
              <p className="text-sm text-gray-900 font-medium">Email Notifications</p>
              <p className="text-xs text-gray-400">
                Receive updates about your projects
              </p>
            </div>
            <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-violet-600 cursor-pointer">
              <span className="inline-block h-4 w-4 translate-x-6 rounded-full bg-white shadow-sm transition-transform" />
            </div>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl border border-gray-200 bg-gray-50">
            <div>
              <p className="text-sm text-gray-900 font-medium">Product Updates</p>
              <p className="text-xs text-gray-400">
                Get notified about new Uncle Inc. features
              </p>
            </div>
            <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-violet-600 cursor-pointer">
              <span className="inline-block h-4 w-4 translate-x-6 rounded-full bg-white shadow-sm transition-transform" />
            </div>
          </div>
        </div>
      </Card>

      <Card className="border-red-200">
        <h3 className="text-lg font-heading font-semibold text-red-600 mb-2">
          Danger Zone
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Permanently delete your account and all associated data.
        </p>
        <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
          Delete Account
        </button>
      </Card>
    </div>
  );
}
