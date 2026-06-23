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
      "Internal operations dashboard for monitoring system health and team performance.",
    status: "Planning",
    progress: 15,
    team: ["JL", "SC"],
    updatedAt: "5 hours ago",
  },
];

export interface Activity {
  id: string;
  type: "update" | "milestone" | "feedback" | "deploy";
  message: string;
  project: string;
  time: string;
}

export const recentActivity: Activity[] = [
  {
    id: "act-001",
    type: "milestone",
    message: "Atlas Platform reached 75% completion",
    project: "Atlas Platform",
    time: "2 hours ago",
  },
  {
    id: "act-002",
    type: "deploy",
    message: "Forge API v2.3 deployed to staging",
    project: "Forge API",
    time: "3 hours ago",
  },
  {
    id: "act-003",
    type: "feedback",
    message: "New design review submitted for Meridian App",
    project: "Meridian App",
    time: "1 day ago",
  },
  {
    id: "act-004",
    type: "update",
    message: "Sprint planning completed for Crest Dashboard",
    project: "Crest Dashboard",
    time: "1 day ago",
  },
  {
    id: "act-005",
    type: "milestone",
    message: "Forge API passed all integration tests",
    project: "Forge API",
    time: "2 days ago",
  },
];
