import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function MachinesPage({ params }: { params: Promise<{ factoryId: string; lineId: string }> }) {
  const { factoryId, lineId } = await params;
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims?.sub) redirect("/auth/login");

  const { data: line } = await supabase
    .from("production_lines")
    .select("id, name, code, factory_id")
    .eq("id", lineId)
    .eq("factory_id", factoryId)
    .maybeSingle();

  if (!line) redirect(`/dashboard/factories/${factoryId}/lines`);

  const { data: machines } = await supabase
    .from("machines")
    .select("id, name, code, machine_type, status, manufacturer, model")
    .eq("production_line_id", lineId)
    .order("name");

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: 40, fontFamily: "system-ui, sans-serif" }}>
      <p><a href={`/dashboard/factories/${factoryId}/lines`}>← Production lines</a></p>
      <h1>{line.name}</h1>
      <p>Machine registry for line {line.code}</p>
      <section style={{ display: "grid", gap: 16, marginTop: 28 }}>
        {(machines ?? []).map((machine) => (
          <article key={machine.id} style={{ border: "1px solid #ddd", borderRadius: 12, padding: 20 }}>
            <h2 style={{ marginTop: 0 }}>{machine.name}</h2>
            <p><strong>Code:</strong> {machine.code}</p>
            <p><strong>Type:</strong> {machine.machine_type || "Not specified"}</p>
            <p><strong>Status:</strong> {machine.status}</p>
            <p><strong>Manufacturer:</strong> {machine.manufacturer || "Not specified"}</p>
            <p><strong>Model:</strong> {machine.model || "Not specified"}</p>
          </article>
        ))}
        {!machines?.length && <p>No machines have been configured for this line yet.</p>}
      </section>
    </main>
  );
}
