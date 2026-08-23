import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manufacturing Intelligence OS",
  description: "AI-powered manufacturing intelligence for factories.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
