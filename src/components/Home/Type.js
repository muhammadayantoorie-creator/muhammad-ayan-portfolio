import React from "react";
import Typewriter from "typewriter-effect";
import { usePortfolioMotion } from "../Motion";

function Type() {
  const { preset, shouldReduceMotion } = usePortfolioMotion();

  if (shouldReduceMotion) {
    return <span>Python Developer</span>;
  }

  const delayByPreset = {
    expressive: 58,
    normal: 44,
    calm: 30,
  };

  return (
    <Typewriter
      key={preset}
      options={{
        strings: [
          "Python Developer",
          "AI Automation Engineer",
          "AI Security Engineer (Aspiring)",
          "Backend & Automation Specialist",
        ],
        autoStart: true,
        delay: delayByPreset[preset] || delayByPreset.normal,
        loop: true,
        deleteSpeed: preset === "expressive" ? 42 : 50,
      }}
    />
  );
}

export default Type;
