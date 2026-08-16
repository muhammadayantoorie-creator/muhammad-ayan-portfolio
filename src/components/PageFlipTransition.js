import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { usePortfolioMotion } from "./Motion";

const PageFlipContext = createContext(null);
const FLIP_DURATION = 0.34;
const FLIP_EASE = "easeInOut";

export function PageFlipProvider({ children }) {
  const { shouldReduceMotion } = usePortfolioMotion();
  const pageControls = useAnimationControls();
  const shadowControls = useAnimationControls();
  const [direction, setDirection] = useState("forward");
  const isNavigating = useRef(false);

  const navigateToSection = useCallback(async (sectionId) => {
    const target = document.getElementById(sectionId);
    if (!target || isNavigating.current) return;

    const navigationHeight = document.querySelector("nav")?.getBoundingClientRect().height || 80;
    const targetScrollTop = Math.max(0, target.getBoundingClientRect().top + window.scrollY - navigationHeight);
    if (Math.abs(targetScrollTop - window.scrollY) < 32) return;

    const jumpToTarget = () => {
      const previousScrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo({ top: targetScrollTop, behavior: "auto" });
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
    };

    if (shouldReduceMotion) {
      window.history.pushState(null, "", `#${sectionId}`);
      jumpToTarget();
      return;
    }

    isNavigating.current = true;
    const nextDirection = targetScrollTop > window.scrollY ? "forward" : "backward";
    const simpleFade = window.matchMedia("(max-width: 767px)").matches;
    setDirection(nextDirection);

    try {
      if (simpleFade) {
        await Promise.all([
          pageControls.start({ opacity: 0, transition: { duration: 0.18, ease: FLIP_EASE } }),
          shadowControls.start({ opacity: 0.18, transition: { duration: 0.18, ease: FLIP_EASE } }),
        ]);
      } else {
        await Promise.all([
          pageControls.start({
            opacity: 0,
            rotateY: nextDirection === "forward" ? -90 : 90,
            transformOrigin: nextDirection === "forward" ? "left center" : "right center",
            transition: { duration: FLIP_DURATION, ease: FLIP_EASE },
          }),
          shadowControls.start({ opacity: 0.38, transition: { duration: FLIP_DURATION, ease: FLIP_EASE } }),
        ]);
      }

      window.history.pushState(null, "", `#${sectionId}`);
      jumpToTarget();

      if (simpleFade) {
        pageControls.set({ opacity: 0, rotateY: 0 });
        await Promise.all([
          pageControls.start({ opacity: 1, transition: { duration: 0.18, ease: FLIP_EASE } }),
          shadowControls.start({ opacity: 0, transition: { duration: 0.18, ease: FLIP_EASE } }),
        ]);
      } else {
        pageControls.set({
          opacity: 0,
          rotateY: nextDirection === "forward" ? 90 : -90,
          transformOrigin: nextDirection === "forward" ? "right center" : "left center",
        });
        await Promise.all([
          pageControls.start({
            opacity: 1,
            rotateY: 0,
            transition: { duration: FLIP_DURATION, ease: FLIP_EASE },
          }),
          shadowControls.start({ opacity: 0, transition: { duration: FLIP_DURATION, ease: FLIP_EASE } }),
        ]);
      }
    } finally {
      isNavigating.current = false;
    }
  }, [pageControls, shadowControls, shouldReduceMotion]);

  const value = useMemo(
    () => ({ direction, navigateToSection, pageControls, shadowControls }),
    [direction, navigateToSection, pageControls, shadowControls]
  );

  return <PageFlipContext.Provider value={value}>{children}</PageFlipContext.Provider>;
}

export function usePageFlipNavigation() {
  const context = useContext(PageFlipContext);
  return context || { navigateToSection: () => {} };
}

export function PageFlipMain({ children }) {
  const { direction, pageControls, shadowControls } = usePageFlipNavigation();

  return (
    <div className={`page-flip-perspective page-flip-perspective--${direction}`}>
      <motion.main animate={pageControls} className="page-flip-page" id="main-content" initial={false}>
        {children}
      </motion.main>
      <motion.span animate={shadowControls} aria-hidden="true" className="page-flip-shadow" initial={{ opacity: 0 }} />
    </div>
  );
}

// Use this wrapper when separate React routes are mounted and unmounted.
// The one-page portfolio above instead uses PageFlipProvider/PageFlipMain so
// manual scrolling stays natural and only deliberate section links flip.
export function RoutePageFlip({ children, pageKey }) {
  const { shouldReduceMotion } = usePortfolioMotion();
  const routeTransition = { duration: FLIP_DURATION, ease: FLIP_EASE };
  const routeVariants = shouldReduceMotion
    ? {
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      initial: { opacity: 0 },
    }
    : {
      animate: { opacity: 1, rotateY: 0, transformOrigin: "right center" },
      exit: { opacity: 0, rotateY: -90, transformOrigin: "left center" },
      initial: { opacity: 0, rotateY: 90, transformOrigin: "right center" },
    };

  return (
    <div className="route-page-flip">
      <AnimatePresence exitBeforeEnter initial={false}>
        <motion.div
          animate="animate"
          className="route-page-flip-page"
          exit="exit"
          initial="initial"
          key={pageKey}
          transition={routeTransition}
          variants={routeVariants}
        >
          <span aria-hidden="true" className="route-page-flip-shade" />
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
