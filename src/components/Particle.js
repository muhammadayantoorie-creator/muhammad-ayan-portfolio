import React from "react";
import Particles from "react-tsparticles";
import { usePortfolioMotion } from "./Motion";

function Particle() {
  const { preset, shouldReduceMotion } = usePortfolioMotion();
  const isSmallScreen = typeof window !== "undefined"
    && window.matchMedia("(max-width: 767px)").matches;

  if (shouldReduceMotion || isSmallScreen) return null;

  const isCalm = preset === "calm";
  const isExpressive = preset === "expressive";
  const isLaptopViewport = typeof window !== "undefined"
    && (window.innerWidth <= 1440 || window.innerHeight <= 900);
  const particleCount = isLaptopViewport
    ? (isExpressive ? 40 : (isCalm ? 24 : 32))
    : (isExpressive ? 52 : (isCalm ? 30 : 40));

  return (
    <Particles
      id="tsparticles"
      params={{
        background: {
          opacity: 0
        },
        particles: {
          number: {
            value: particleCount,
            density: {
              enable: true,
              value_area: 1200,
            },
          },
          color: {
            value: ["#00d4ff", "#667eea", "#f093fb", "#ffffff"]
          },
          shape: {
            type: ["circle", "triangle", "star"],
          },
          line_linked: {
            enable: true,
            distance: 138,
            color: "#00d4ff",
            opacity: isExpressive ? 0.16 : 0.11,
            width: 1,
          },
          move: {
            enable: true,
            speed: isExpressive ? 0.65 : (isCalm ? 0.22 : 0.4),
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          },
          size: {
            value: 2,
            random: true,
            anim: {
              enable: isExpressive,
              speed: 1,
              size_min: 0.1,
              sync: false
            }
          },
          opacity: {
            value: 0.6,
            random: true,
            anim: {
              enable: isExpressive,
              speed: 0.6,
              opacity_min: 0.1,
              sync: false
            },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: isExpressive,
              mode: "grab",
            },
            onclick: {
              enable: false,
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 200,
              line_linked: {
                opacity: 0.5
              }
            },
            repulse: {
              distance: 100,
              duration: 0.4,
            }
          },
        },
        // A capped canvas keeps the desktop experience smooth on laptops while
        // retaining the same ambient visual treatment.
        fps_limit: isLaptopViewport ? 30 : 45,
        retina_detect: !isLaptopViewport,
      }}
    />
  );
}

export default Particle;
