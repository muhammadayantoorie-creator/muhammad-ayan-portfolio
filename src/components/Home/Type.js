import React from "react";
import Typewriter from "typewriter-effect";
import { usePortfolioMotion } from "../Motion";

function Type() {
  const { preset, shouldReduceMotion } = usePortfolioMotion();

  if (shouldReduceMotion) {
    return <span>Python &amp; FastAPI Developer</span>;
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
          "Python & FastAPI Developer",
          "Machine Learning for Cybersecurity",
          "Aspiring AI Security Engineer",
          "BS Artificial Intelligence Student",
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
