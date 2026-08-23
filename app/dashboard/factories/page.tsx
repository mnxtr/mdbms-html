import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function FactoriesPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (!userId) redirect("/auth/login");

  const { data: memberships } = await supabase
    .from("organization_members")
    .select("organization_id, role")
    .eq("user_id", userId);

  const organizationIds = (memberships ?? []).map((m) => m.organization_id);
  const { data: factories } = organizationIds.length
    ? await supabase
        .from("factories")
        .select("id, organization_id, name, code, industry, timezone")
        .in("organization_id", organizationIds)
        .order("name")
    : { data: [] };

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: 40, fontFamily: "system-ui, sans-serif" }}>
      <header style={{ marginBottom: 32 }}>
        <p style={{ opacity: 0.6 }}>Manufacturing Intelligence OS</p>
        <h1>Factories</h1>
        <p>Manage factories belonging to your organizations.</p>
      </header>

      <section style={{ display: "grid", gap: 16 }}>
        {(factories ?? []).map((factory) => (
          <article key={factory.id} style={{ border: "1px solid #ddd", borderRadius: 12, padding: 20 }}>
            <h2 style={{ marginTop: 0 }}>{factory.name}</h2>
            <p><strong>Code:</strong> {factory.code}</p>
            <p><strong>Industry:</strong> {factory.industry || "Not specified"}</p>
            <p><strong>Timezone:</strong> {factory.timezone}</p>
            <a href={`/dashboard/factories/${factory.id}/lines`}>Production lines →</a>
          </article>
        ))}
        {!factories?.length && <p>No factories are available for your account yet.</p>}
      </section>
    </main>
  );
}
