import { Card } from "@/components/ui/Card";
import { User, Mail, Calendar, Shield } from "lucide-react";
import { demoUser } from "@/lib/demo-data";

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-serif font-bold text-ivory">Settings</h1>
        <p className="text-charcoal-400 text-sm mt-1">
          Manage your account settings
        </p>
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-ivory mb-4">
          Account Information
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-lg border border-charcoal-800 bg-charcoal-900/30">
            <User className="h-4 w-4 text-charcoal-500" />
            <div>
              <p className="text-xs text-charcoal-500">Name</p>
              <p className="text-sm text-ivory">{demoUser.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg border border-charcoal-800 bg-charcoal-900/30">
            <Mail className="h-4 w-4 text-charcoal-500" />
            <div>
              <p className="text-xs text-charcoal-500">Email</p>
              <p className="text-sm text-ivory">{demoUser.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg border border-charcoal-800 bg-charcoal-900/30">
            <Calendar className="h-4 w-4 text-charcoal-500" />
            <div>
              <p className="text-xs text-charcoal-500">Joined</p>
              <p className="text-sm text-ivory">January 15, 2025</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg border border-charcoal-800 bg-charcoal-900/30">
            <Shield className="h-4 w-4 text-charcoal-500" />
            <div>
              <p className="text-xs text-charcoal-500">Plan</p>
              <p className="text-sm text-ivory">Free</p>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-ivory mb-4">
          Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg border border-charcoal-800 bg-charcoal-900/30">
            <div>
              <p className="text-sm text-ivory">Email notifications</p>
              <p className="text-xs text-charcoal-500">Receive updates about your projects</p>
            </div>
            <div className="h-6 w-11 rounded-full bg-gold/20 border border-gold/30 relative">
              <div className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-gold transition-transform" />
            </div>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border border-charcoal-800 bg-charcoal-900/30">
            <div>
              <p className="text-sm text-ivory">Weekly digest</p>
              <p className="text-xs text-charcoal-500">Summary of validation activity</p>
            </div>
            <div className="h-6 w-11 rounded-full bg-charcoal-700 border border-charcoal-600 relative">
              <div className="absolute top-0.5 left-5 h-5 w-5 rounded-full bg-charcoal-500 transition-transform" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
