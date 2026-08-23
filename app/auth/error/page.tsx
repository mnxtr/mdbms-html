import Link from "next/link";

export default async function AuthErrorPage({ searchParams }: { searchParams: Promise<{ message?: string }> }) {
  const params = await searchParams;
  const message = params.message || "Authentication failed. Please try again.";

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <section style={{ maxWidth: 560 }}>
        <p style={{ opacity: 0.65 }}>Manufacturing Intelligence OS</p>
        <h1>Authentication error</h1>
        <p>{message}</p>
        <Link href="/auth/login">Return to sign in</Link>
      </section>
    </main>
  );
}
