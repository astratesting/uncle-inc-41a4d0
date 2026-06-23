export interface Profile {
  id: string;
  email: string;
  name: string | null;
  plan: "free" | "pro" | "team";
  created_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  status: "draft" | "testing" | "completed" | "archived";
  created_at: string;
  updated_at: string;
}

export interface ProjectStats {
  totalProjects: number;
  activeTests: number;
  totalTesters: number;
  avgScore: number;
}
