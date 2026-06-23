import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

// Demo sign-in preserved for backward compatibility but now uses Supabase if available
export async function GET() {
  // Redirect to sign-in page — real auth happens through Supabase now
  redirect("/sign-in");
}
