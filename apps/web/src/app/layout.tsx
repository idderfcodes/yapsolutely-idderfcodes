import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserProvider } from "@/components/user-context";
import ThemeProvider from "@/components/theme-provider";
import { getSession } from "@/lib/auth";
import "./globals.css";

const bagossCondensed = localFont({
  src: [
    {
      path: "./fonts/landing/bagoss-condensed-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/landing/bagoss-condensed-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/landing/bagoss-condensed-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-bagoss",
  display: "swap",
});

const inter = localFont({
  src: [
    {
      path: "./fonts/landing/inter-400.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/landing/inter-500.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/landing/inter-600.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/landing/inter-700.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Yapsolutely | AI Voice Agent Platform",
    template: "%s | Yapsolutely",
  },
  description:
    "Build, deploy, and manage AI voice agents for inbound phone calls. Configure agents, assign numbers, view transcripts, and test conversations, all from one dashboard.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://yapsolutely.xyz"),
  openGraph: {
    title: "Yapsolutely | AI Voice Agent Platform",
    description:
      "Build, deploy, and manage AI voice agents for inbound phone calls. Configure agents, assign numbers, view transcripts, and test conversations, all from one dashboard.",
    siteName: "Yapsolutely",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Yapsolutely | AI Voice Agent Platform",
    description:
      "Build, deploy, and manage AI voice agents for inbound phone calls.",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <html
      lang="en"
      className={`${bagossCondensed.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
        <ThemeProvider>
          <UserProvider user={session}>
            <TooltipProvider delayDuration={300}>
              {children}
            </TooltipProvider>
          </UserProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
