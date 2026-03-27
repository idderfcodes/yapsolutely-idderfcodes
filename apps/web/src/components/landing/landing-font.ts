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
  ],
  variable: "--font-landing-display",
  display: "swap",
});