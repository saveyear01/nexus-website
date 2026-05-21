"use client";

import Footer from "@/component/layouts/Footer";
import Header from "@/component/layouts/Header";
import GiveBand from "@/component/sections/GiveBand";
import Hero from "@/component/sections/Hero";
import LatestSermon from "@/component/sections/LatestSermon";
import Mission from "@/component/sections/Mission";
import Pillars from "@/component/sections/Pillars";
import ResourcesTeaser from "@/component/sections/ResourcesTeaser";
import SplashScreen from "@/component/sections/SplashScreen";
import Streams from "@/component/sections/Streams";
import { useEffect, useState } from "react";

const SPLASH_KEY = "nexus-splash-shown";

type Phase = "checking" | "splash" | "app";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("checking");

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SPLASH_KEY) === "1") {
        setPhase("app");
      } else {
        sessionStorage.setItem(SPLASH_KEY, "1");
        setPhase("splash");
      }
    } catch {
      setPhase("splash");
    }
  }, []);

  if (phase === "checking") {
    return <div className="min-h-screen bg-[#D4DAE9]" />;
  }

  if (phase === "splash") {
    return <SplashScreen finishLoading={() => setPhase("app")} />;
  }

  return (
    <div className="max-w-[1440px] mx-auto pt-4 md:pt-6 pb-8">
      <Header />
      <main className="mt-6 md:mt-10">
        <Hero />
        <Mission />
        <LatestSermon />
        <Pillars />
        <ResourcesTeaser />
        <Streams />
        <GiveBand />
      </main>
      <Footer />
    </div>
  );
}
