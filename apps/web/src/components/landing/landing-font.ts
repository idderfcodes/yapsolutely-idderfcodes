import localFont from "next/font/local";

export const landingDisplayFont = localFont({
  src: [
    {
      path: "../../app/fonts/landing/bagoss-condensed/BagossCondensedTRIAL-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../app/fonts/landing/bagoss-condensed/BagossCondensedTRIAL-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../app/fonts/landing/bagoss-condensed/BagossCondensedTRIAL-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-landing-display",
  display: "swap",
});

export const landingBodyFont = localFont({
  src: [
    {
      path: "../../app/fonts/landing/inter-variable.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-landing-body",
  display: "swap",
  adjustFontFallback: false,
});