import Link from "next/link";
import { login } from "../actions";

export default function LoginPage() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <form action={login} style={{ width: "100%", maxWidth: 420, display: "grid", gap: 16 }}>
        <div>
          <p style={{ opacity: 0.65 }}>Manufacturing Intelligence OS</p>
          <h1>Sign in</h1>
          <p>Access your factory workspace.</p>
        </div>
        <label>Email<input name="email" type="email" required autoComplete="email" style={{ display: "block", width: "100%", padding: 12, marginTop: 6 }} /></label>
        <label>Password<input name="password" type="password" required minLength={6} autoComplete="current-password" style={{ display: "block", width: "100%", padding: 12, marginTop: 6 }} /></label>
        <button type="submit" style={{ padding: 12 }}>Sign in</button>
        <p>New organization? <Link href="/auth/sign-up">Create an account</Link></p>
      </form>
    </main>
  );
}
