"use client";

import Header from "@/component/layouts/Header";
import Hero from "@/component/sections/Hero";
import SplashScreen from "@/component/sections/SplashScreen";
import Streams from "@/component/sections/Streams";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [ isLoading, setIsLoading ] = useState(true);

  if (isLoading) {
    return <SplashScreen finishLoading={() => setIsLoading(false)} />
  }

  return (
    <div className="max-w-[1440px] mx-auto">
      <Header />
      <Hero />
      <Streams />
    </div>
  );
}
