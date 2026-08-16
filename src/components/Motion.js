import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { MotionConfig, motion, useReducedMotion as useSystemReducedMotion } from "framer-motion";
import { FaHeart } from "react-icons/fa";

const STORAGE_KEY = "muhammad-ayan-motion-preset";

export const motionPresets = {
  expressive: {
    label: "Expressive",
    description: "More noticeable reveals and hover feedback",
    duration: 0.62,
    hoverDuration: 0.3,
    distance: 30,
    stagger: 0.1,
    delayChildren: 0.03,
    hoverScale: 1.025,
    pageOffset: 16,
  },
  normal: {
    label: "Balanced",
    description: "The recommended professional motion level",
    duration: 0.5,
    hoverDuration: 0.26,
    distance: 22,
    stagger: 0.08,
    delayChildren: 0.02,
    hoverScale: 1.02,
    pageOffset: 12,
  },
  calm: {
    label: "Calm",
    description: "Short, subtle transitions",
    duration: 0.32,
    hoverDuration: 0.2,
    distance: 12,
    stagger: 0.05,
    delayChildren: 0.01,
    hoverScale: 1.012,
    pageOffset: 8,
  },
  off: {
    label: "Off",
    description: "Show content immediately",
    duration: 0,
    hoverDuration: 0,
    distance: 0,
    stagger: 0,
    delayChildren: 0,
    hoverScale: 1,
    pageOffset: 0,
  },
};

const defaultPreset = "normal";
const defaultSettings = motionPresets[defaultPreset];
const MotionPreferencesContext = createContext(null);
const motionEase = [0.16, 1, 0.3, 1];

const createTransition = (settings) => ({
  duration: settings.duration,
  ease: motionEase,
});

const createHoverTransition = () => ({
  damping: 24,
  mass: 0.55,
  stiffness: 320,
  type: "spring",
});

const createSlideVariants = (settings, direction = "up", shouldReduceMotion = false, delay = 0) => {
  const offset = shouldReduceMotion ? 0 : settings.distance;
  const sideOffset = Math.round(offset * 0.38);
  const depthOffset = Math.round(offset * 0.55);
  const offsets = {
    left: { x: -sideOffset, y: depthOffset },
    right: { x: sideOffset, y: depthOffset },
    up: { x: 0, y: offset },
    down: { x: 0, y: -offset },
  };

  return {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      filter: shouldReduceMotion ? "blur(0px)" : "blur(8px)",
      scale: shouldReduceMotion ? 1 : 0.985,
      ...(offsets[direction] || offsets.left),
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      y: 0,
      x: 0,
      transition: { ...createTransition(settings), delay },
    },
  };
};

const createFadeUpVariants = (settings, shouldReduceMotion = false) =>
  createSlideVariants(settings, "up", shouldReduceMotion);

const createStaggerContainerVariants = (settings, shouldReduceMotion = false) => ({
  hidden: {},
  visible: {
    transition: {
      delayChildren: shouldReduceMotion ? 0 : settings.delayChildren,
      staggerChildren: shouldReduceMotion ? 0 : settings.stagger,
      when: "beforeChildren",
    },
  },
});

// These balanced defaults remain available for simple future components.
// Interactive components use usePortfolioMotion so they follow the visitor's choice.
export const motionTransition = createTransition(defaultSettings);
export const hoverTransition = createHoverTransition(defaultSettings);
export const motionViewport = { once: true, amount: 0.18 };
export const fadeUpVariants = createFadeUpVariants(defaultSettings);
export const staggerContainerVariants = createStaggerContainerVariants(defaultSettings);

function getStoredPreset() {
  if (typeof window === "undefined") return defaultPreset;

  try {
    const savedPreset = window.localStorage.getItem(STORAGE_KEY);
    return motionPresets[savedPreset] ? savedPreset : defaultPreset;
  } catch {
    return defaultPreset;
  }
}

export function MotionProvider({ children }) {
  const systemPrefersReducedMotion = useSystemReducedMotion();
  const [preset, setPreset] = useState(getStoredPreset);
  const effectivePreset = systemPrefersReducedMotion && preset !== "off" ? "calm" : preset;
  const settings = motionPresets[effectivePreset];
  const shouldReduceMotion = preset === "off" || systemPrefersReducedMotion;

  useEffect(() => {
    document.documentElement.dataset.motion = effectivePreset;

    try {
      window.localStorage.setItem(STORAGE_KEY, preset);
    } catch {
      // Private browsing can block storage; the selected preset still works
      // for the current visit.
    }
  }, [effectivePreset, preset]);

  const value = useMemo(
    () => ({
      preset,
      effectivePreset,
      settings,
      shouldReduceMotion,
      setPreset: (nextPreset) => {
        if (motionPresets[nextPreset]) setPreset(nextPreset);
      },
    }),
    [effectivePreset, preset, settings, shouldReduceMotion]
  );

  return (
    <MotionPreferencesContext.Provider value={value}>
      <MotionConfig reducedMotion={shouldReduceMotion ? "always" : "user"}>
        {children}
      </MotionConfig>
    </MotionPreferencesContext.Provider>
  );
}

export function usePortfolioMotion() {
  const systemPrefersReducedMotion = useSystemReducedMotion();
  const preferences = useContext(MotionPreferencesContext);
  const preset = preferences?.effectivePreset || (systemPrefersReducedMotion ? "calm" : defaultPreset);
  const settings = preferences?.settings || motionPresets[preset];
  const shouldReduceMotion = preferences?.shouldReduceMotion ?? systemPrefersReducedMotion;

  return useMemo(
    () => ({
      preset,
      settings,
      shouldReduceMotion,
      motionTransition: createTransition(settings),
      hoverTransition: createHoverTransition(settings),
      motionEase,
      motionViewport,
      fadeUpVariants: createFadeUpVariants(settings, shouldReduceMotion),
      getSlideVariants: (direction = "up", delay = 0) => createSlideVariants(settings, direction, shouldReduceMotion, delay),
      staggerContainerVariants: createStaggerContainerVariants(settings, shouldReduceMotion),
      hoverScale: shouldReduceMotion ? 1 : settings.hoverScale,
    }),
    [preset, settings, shouldReduceMotion]
  );
}

export function MotionControl() {
  const preferences = useContext(MotionPreferencesContext);
  const [isOpen, setIsOpen] = useState(false);

  if (!preferences) return null;

  const { preset, effectivePreset, setPreset } = preferences;

  return (
    <div className={`motion-control${isOpen ? " is-open" : ""}`}>
      <button
        aria-controls="motion-control-panel"
        aria-expanded={isOpen}
        aria-label="Choose portfolio animation level"
        className="motion-control-trigger"
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        <FaHeart aria-hidden="true" className="motion-control-heart-glow" />
        <FaHeart aria-hidden="true" className="motion-control-heart-shape" />
        <span className="motion-control-heart-content">
          <small>Motion</small>
          <strong>{motionPresets[effectivePreset].label}</strong>
        </span>
      </button>
      <div aria-label="Animation level" className="motion-control-panel" id="motion-control-panel" role="group">
        <p>Choose motion</p>
        {Object.entries(motionPresets).map(([key, option]) => (
          <button
            aria-pressed={preset === key}
            className={preset === key ? "is-selected" : ""}
            key={key}
            onClick={() => {
              setPreset(key);
              setIsOpen(false);
            }}
            type="button"
          >
            <span>{option.label}</span>
            <small>{option.description}</small>
          </button>
        ))}
      </div>
    </div>
  );
}

export function Reveal({
  amount = 0.18,
  as = "div",
  children,
  className,
  direction = "up",
  ...props
}) {
  const { getSlideVariants, shouldReduceMotion } = usePortfolioMotion();
  const activeVariants = getSlideVariants(direction);
  const MotionElement = motion[as] || motion.div;

  return (
    <MotionElement
      className={className}
      animate={shouldReduceMotion ? "visible" : undefined}
      initial={shouldReduceMotion ? "visible" : "hidden"}
      variants={activeVariants}
      viewport={{ once: true, amount }}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      {...props}
    >
      {children}
    </MotionElement>
  );
}

export function StaggerReveal({
  amount = 0.18,
  as = "div",
  children,
  className,
  ...props
}) {
  const { shouldReduceMotion, staggerContainerVariants: activeVariants } = usePortfolioMotion();
  const MotionElement = motion[as] || motion.div;

  return (
    <MotionElement
      className={className}
      animate={shouldReduceMotion ? "visible" : undefined}
      initial={shouldReduceMotion ? "visible" : "hidden"}
      variants={activeVariants}
      viewport={{ once: true, amount }}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      {...props}
    >
      {children}
    </MotionElement>
  );
}

export function StaggerItem({ as = "div", children, className, direction = "up", ...props }) {
  const { getSlideVariants } = usePortfolioMotion();
  const activeVariants = getSlideVariants(direction);
  const MotionElement = motion[as] || motion.div;

  return (
    <MotionElement className={className} variants={activeVariants} {...props}>
      {children}
    </MotionElement>
  );
}
