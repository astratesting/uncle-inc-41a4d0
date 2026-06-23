import { auth } from "@/lib/auth";
import { getUserByEmail, getStats, getVerifiedUsers, getFeedback } from "@/lib/store";
import { Users, UserCheck, Shield, Zap, MessageSquare } from "lucide-react";
import { FeedbackWidget } from "@/components/dashboard/FeedbackWidget";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();
  const user = getUserByEmail(session?.user?.email || "");
  const stats = getStats();
  const verifiedUsers = getVerifiedUsers();
  const feedback = getFeedback();

  return (
    <div className="space-y-8">
      {/* Profile card */}
      <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/80 p-6">
        <h2 className="text-lg font-semibold mb-4">
          <span className="gradient-text">Your Profile</span>
        </h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-[#8888a0]">Name</span>
            <p className="text-[#e4e4ec] font-medium">{user?.name || "\u2014"}</p>
          </div>
          <div>
            <span className="text-[#8888a0]">Email</span>
            <p className="text-[#e4e4ec] font-medium">{user?.email || "\u2014"}</p>
          </div>
          <div>
            <span className="text-[#8888a0]">Status</span>
            <p className={user?.verified ? "text-teal-400 font-medium" : "text-yellow-400 font-medium"}>
              {user?.verified ? "Verified" : "Not verified"}
            </p>
          </div>
          <div>
            <span className="text-[#8888a0]">Joined</span>
            <p className="text-[#e4e4ec] font-medium">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "\u2014"}
            </p>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Users className="w-5 h-5 text-indigo-400" />}
          label="Total Signups"
          value={stats.totalSignups}
          color="indigo"
        />
        <StatCard
          icon={<UserCheck className="w-5 h-5 text-teal-400" />}
          label="Verified Users"
          value={stats.verifiedUsers}
          color="teal"
        />
        <StatCard
          icon={<MessageSquare className="w-5 h-5 text-cyan-400" />}
          label="Feedback"
          value={feedback.length}
          color="cyan"
        />
        <StatCard
          icon={<Shield className="w-5 h-5 text-yellow-400" />}
          label="Conversion"
          value={stats.totalSignups > 0 ? `${Math.round((stats.verifiedUsers / stats.totalSignups) * 100)}%` : "0%"}
          color="yellow"
        />
      </div>

      {/* Feedback Widget */}
      <FeedbackWidget
        initialFeedback={feedback.map((f) => ({
          id: f.id,
          email: f.email,
          response: f.response,
          createdAt: f.createdAt,
        }))}
        feedbackCount={feedback.length}
      />

      {/* Verified Users Table */}
      <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/80 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">
            <span className="gradient-text">Verified Users</span>
          </h2>
          <span className="text-xs text-[#8888a0] font-mono">
            {verifiedUsers.length} users
          </span>
        </div>

        {verifiedUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1e1e2e]">
                  <th className="text-left py-3 px-4 text-xs font-medium text-[#8888a0] uppercase tracking-wider">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-[#8888a0] uppercase tracking-wider">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-[#8888a0] uppercase tracking-wider">
                    Company
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-[#8888a0] uppercase tracking-wider">
                    Signup Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {verifiedUsers.map((u) => (
                  <tr
                    key={u.id}
                    className="border-b border-[#1e1e2e] last:border-0 hover:bg-[#0d0d16] transition-colors"
                  >
                    <td className="py-3 px-4 text-[#e4e4ec] font-medium">
                      {u.name}
                    </td>
                    <td className="py-3 px-4 text-[#8888a0] font-mono text-xs">
                      {u.email}
                    </td>
                    <td className="py-3 px-4 text-[#e4e4ec]">
                      {u.companyName || "\u2014"}
                    </td>
                    <td className="py-3 px-4 text-[#8888a0] font-mono text-xs">
                      {new Date(u.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4">
              <Users className="w-7 h-7 text-indigo-400" />
            </div>
            <h3 className="text-base font-semibold mb-2">No verified users yet</h3>
            <p className="text-sm text-[#8888a0] max-w-sm">
              Share the signup link to start collecting users.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/80 p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-9 h-9 rounded-xl bg-${color}-500/10 border border-${color}-500/20 flex items-center justify-center`}>
          {icon}
        </div>
        <span className="text-sm text-[#8888a0]">{label}</span>
      </div>
      <p className="text-2xl font-bold text-[#e4e4ec]">{value}</p>
    </div>
  );
}
