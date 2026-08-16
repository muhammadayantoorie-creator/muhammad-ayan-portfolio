import { useCallback, useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";

// Keeps 3D interaction on the element Framer Motion already owns, preventing
// CSS hover transforms from competing with animation transforms.
export default function useTilt3D({ disabled = false, max = 6, perspective = 1100 } = {}) {
  const inputRotateX = useMotionValue(0);
  const inputRotateY = useMotionValue(0);
  const rotateX = useSpring(inputRotateX, { damping: 18, mass: 0.42, stiffness: 180 });
  const rotateY = useSpring(inputRotateY, { damping: 18, mass: 0.42, stiffness: 180 });

  const resetTilt = useCallback(() => {
    inputRotateX.set(0);
    inputRotateY.set(0);
  }, [inputRotateX, inputRotateY]);

  useEffect(() => {
    if (disabled) resetTilt();
  }, [disabled, resetTilt]);

  const handlePointerMove = useCallback((event) => {
    if (disabled || event.pointerType === "touch") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontal = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const vertical = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    inputRotateX.set(-vertical * max);
    inputRotateY.set(horizontal * max);
  }, [disabled, inputRotateX, inputRotateY, max]);

  return {
    tiltProps: {
      onPointerCancel: resetTilt,
      onPointerLeave: resetTilt,
      onPointerMove: handlePointerMove,
    },
    tiltStyle: {
      rotateX,
      rotateY,
      transformPerspective: perspective,
    },
  };
}
