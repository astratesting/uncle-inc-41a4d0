import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { User, Mail, Calendar, Shield } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const createdAt = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown";

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 text-sm mt-1">
          Manage your account settings
        </p>
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">
          Account Information
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-800 bg-white/[0.02]">
            <User className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Name</p>
              <p className="text-sm text-white">
                {user?.user_metadata?.name || "Not set"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-800 bg-white/[0.02]">
            <Mail className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm text-white">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-800 bg-white/[0.02]">
            <Calendar className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Joined</p>
              <p className="text-sm text-white">{createdAt}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-800 bg-white/[0.02]">
            <Shield className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Plan</p>
              <p className="text-sm text-white">Free</p>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">
          Supabase Setup
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          Create these tables in your Supabase SQL editor to enable all
          features:
        </p>
        <div className="rounded-lg border border-gray-800 bg-black/40 p-4 overflow-x-auto">
          <pre className="text-xs font-mono text-gray-300 whitespace-pre">
{`-- Profiles table (auto-populated on signup via trigger)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Feedback table
CREATE TABLE feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- RLS policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own feedback"
  ON feedback FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own feedback"
  ON feedback FOR SELECT USING (auth.uid() = user_id);`}
          </pre>
        </div>
      </Card>
    </div>
  );
}
