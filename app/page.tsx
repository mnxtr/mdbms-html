export default function HomePage() {
  return (
    <main style={{ minHeight: "100vh", padding: "48px", fontFamily: "system-ui, sans-serif" }}>
      <p style={{ opacity: 0.65, marginBottom: 8 }}>Manufacturing Intelligence OS</p>
      <h1 style={{ fontSize: 42, margin: 0 }}>SaaS foundation is ready.</h1>
      <p style={{ maxWidth: 680, lineHeight: 1.6 }}>
        Phase 1 establishes the Next.js application shell and Supabase authentication/data layer.
        The existing FactoryOS demo remains available while the production architecture is introduced.
      </p>
    </main>
  );
}
