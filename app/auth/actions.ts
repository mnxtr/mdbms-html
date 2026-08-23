"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function readCredentials(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) throw new Error("Email and password are required.");
  return { email, password };
}

export async function login(formData: FormData) {
  const supabase = await createClient();
  const { email, password } = readCredentials(formData);
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) redirect(`/auth/error?message=${encodeURIComponent(error.message)}`);

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const { email, password } = readCredentials(formData);
  const fullName = String(formData.get("full_name") ?? "").trim();
  if (!fullName) redirect("/auth/error?message=Full%20name%20is%20required");

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  });

  if (error) redirect(`/auth/error?message=${encodeURIComponent(error.message)}`);

  // If email confirmation is enabled, Supabase returns no active session.
  if (!data.session) redirect("/auth/check-email");

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
