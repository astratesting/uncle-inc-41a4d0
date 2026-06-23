import { redirect } from "next/navigation";

// Demo sign-in preserved for backward compatibility
export async function GET() {
  redirect("/sign-in");
}
