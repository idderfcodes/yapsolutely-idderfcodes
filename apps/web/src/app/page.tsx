import dynamic from "next/dynamic";

const LandingPage = dynamic(() => import("./page-landing-new"), {
  ssr: true,
});

export default function Home() {
  return <LandingPage />;
}
