import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop({ ready = true }) {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!ready) return undefined;

    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        window.setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
        return undefined;
      }
    }
    window.scrollTo(0, 0);
    return undefined;
  }, [pathname, hash, ready]);
  return null;
}

export default ScrollToTop;
