import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function LinesPage({ params }: { params: Promise<{ factoryId: string }> }) {
  const { factoryId } = await params;
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (!userId) redirect("/auth/login");

  const { data: factory } = await supabase
    .from("factories")
    .select("id, name, code")
    .eq("id", factoryId)
    .maybeSingle();

  if (!factory) redirect("/dashboard/factories");

  const { data: lines } = await supabase
    .from("production_lines")
    .select("id, name, code, status")
    .eq("factory_id", factoryId)
    .order("name");

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: 40, fontFamily: "system-ui, sans-serif" }}>
      <p><a href="/dashboard/factories">← Factories</a></p>
      <h1>{factory.name}</h1>
      <p>Production lines for {factory.code}</p>
      <section style={{ display: "grid", gap: 16, marginTop: 28 }}>
        {(lines ?? []).map((line) => (
          <article key={line.id} style={{ border: "1px solid #ddd", borderRadius: 12, padding: 20 }}>
            <h2 style={{ marginTop: 0 }}>{line.name}</h2>
            <p><strong>Code:</strong> {line.code}</p>
            <p><strong>Status:</strong> {line.status}</p>
            <a href={`/dashboard/factories/${factoryId}/lines/${line.id}/machines`}>Machines →</a>
          </article>
        ))}
        {!lines?.length && <p>No production lines have been configured yet.</p>}
      </section>
    </main>
  );
}
