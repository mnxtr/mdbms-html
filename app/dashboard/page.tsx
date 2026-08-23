import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (!data?.claims?.sub) redirect("/auth/login");

  return (
    <main style={{ minHeight: "100vh", padding: 48, fontFamily: "system-ui, sans-serif" }}>
      <p style={{ opacity: 0.65 }}>Manufacturing Intelligence OS</p>
      <h1>Factory workspace</h1>
      <p>Authenticated successfully. Phase 2 will add production, machines, downtime, maintenance, and quality modules.</p>
      <form action="/auth/signout" method="post">
        <button type="submit" style={{ padding: 10 }}>Sign out</button>
      </form>
    </main>
  );
}
