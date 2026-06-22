export const demoUser = {
  id: "demo-user-001",
  name: "Demo User",
  email: "demo@demo.app",
  role: "Admin",
  joinedAt: "2025-01-15",
};

export const stats = [
  {
    label: "Active Projects",
    value: "4",
    change: "+2 this month",
    trend: "up" as const,
  },
  {
    label: "In Development",
    value: "2",
    change: "On track",
    trend: "neutral" as const,
  },
  {
    label: "Completed",
    value: "7",
    change: "+3 this quarter",
    trend: "up" as const,
  },
  {
    label: "Team Members",
    value: "12",
    change: "+1 this week",
    trend: "up" as const,
  },
];

export interface Project {
  id: string;
  name: string;
  description: string;
  status: "Planning" | "In Design" | "In Development" | "Final Review" | "Completed";
  progress: number;
  team: string[];
  updatedAt: string;
}

export const projects: Project[] = [
  {
    id: "proj-001",
    name: "Atlas Platform",
    description:
      "Enterprise data management platform with real-time analytics and reporting capabilities.",
    status: "In Development",
    progress: 75,
    team: ["AK", "MR", "JL"],
    updatedAt: "2 hours ago",
  },
  {
    id: "proj-002",
    name: "Meridian App",
    description:
      "Consumer-facing mobile application for lifestyle management and personal productivity.",
    status: "In Design",
    progress: 45,
    team: ["SC", "NP"],
    updatedAt: "1 day ago",
  },
  {
    id: "proj-003",
    name: "Forge API",
    description:
      "RESTful API service for third-party integrations, built for scalability and reliability.",
    status: "Final Review",
    progress: 90,
    team: ["AK", "DW", "MR"],
    updatedAt: "3 hours ago",
  },
  {
    id: "proj-004",
    name: "Crest Dashboard",
    description:
      "Internal analytics dashboard for business intelligence and operational insights.",
    status: "Planning",
    progress: 30,
    team: ["JL", "SC"],
    updatedAt: "5 days ago",
  },
];

export const recentActivity = [
  {
    action: "Deployment completed",
    project: "Forge API",
    time: "2 hours ago",
    type: "deploy",
  },
  {
    action: "Design review scheduled",
    project: "Meridian App",
    time: "4 hours ago",
    type: "review",
  },
  {
    action: "Sprint planning completed",
    project: "Atlas Platform",
    time: "1 day ago",
    type: "planning",
  },
  {
    action: "New team member added",
    project: "Crest Dashboard",
    time: "2 days ago",
    type: "team",
  },
  {
    action: "Milestone reached: Beta",
    project: "Atlas Platform",
    time: "3 days ago",
    type: "milestone",
  },
  {
    action: "Code review approved",
    project: "Forge API",
    time: "4 days ago",
    type: "review",
  },
];
