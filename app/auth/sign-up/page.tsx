import Link from "next/link";
import { signup } from "../actions";

export default function SignUpPage() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <form action={signup} style={{ width: "100%", maxWidth: 420, display: "grid", gap: 16 }}>
        <div>
          <p style={{ opacity: 0.65 }}>Manufacturing Intelligence OS</p>
          <h1>Create your account</h1>
          <p>Start a workspace for your manufacturing operation.</p>
        </div>
        <label>Full name<input name="full_name" type="text" required autoComplete="name" style={{ display: "block", width: "100%", padding: 12, marginTop: 6 }} /></label>
        <label>Email<input name="email" type="email" required autoComplete="email" style={{ display: "block", width: "100%", padding: 12, marginTop: 6 }} /></label>
        <label>Password<input name="password" type="password" required minLength={8} autoComplete="new-password" style={{ display: "block", width: "100%", padding: 12, marginTop: 6 }} /></label>
        <button type="submit" style={{ padding: 12 }}>Create account</button>
        <p>Already registered? <Link href="/auth/login">Sign in</Link></p>
      </form>
    </main>
  );
}
