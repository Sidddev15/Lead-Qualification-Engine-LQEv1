import type { ReactNode } from "react";
import "../globals.css";

export const metadata = {
  title: "Lead Qualification Engine v1",
  description: "Internal tool for automated industrial lead qualification.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-6">{children}</div>
      </body>
    </html>
  );
}
