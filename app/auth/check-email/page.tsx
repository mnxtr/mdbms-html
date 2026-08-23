import Link from "next/link";

export default function CheckEmailPage() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <section style={{ maxWidth: 520 }}>
        <p style={{ opacity: 0.65 }}>Manufacturing Intelligence OS</p>
        <h1>Check your email</h1>
        <p>Your account was created. Confirm the email address associated with your account, then return here to sign in.</p>
        <Link href="/auth/login">Back to sign in</Link>
      </section>
    </main>
  );
}
