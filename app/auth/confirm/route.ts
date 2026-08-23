import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const tokenHash = request.nextUrl.searchParams.get("token_hash");
  const type = request.nextUrl.searchParams.get("type");
  const redirectTo = new URL("/dashboard", request.url);

  if (!tokenHash || type !== "email") {
    redirectTo.pathname = "/auth/error";
    redirectTo.searchParams.set("message", "Invalid confirmation link.");
    return NextResponse.redirect(redirectTo);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({ type: "email", token_hash: tokenHash });

  if (error) {
    redirectTo.pathname = "/auth/error";
    redirectTo.searchParams.set("message", error.message);
    return NextResponse.redirect(redirectTo);
  }

  return NextResponse.redirect(redirectTo);
}
