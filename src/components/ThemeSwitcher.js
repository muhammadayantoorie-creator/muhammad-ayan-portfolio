import React, { useEffect, useRef, useState } from "react";
import { FaHeart } from "react-icons/fa";

const themes = [
  { id: "red", name: "Red", color: "#ef4444" },
  { id: "orange", name: "Orange", color: "#f97316" },
  { id: "yellow", name: "Yellow", color: "#eab308" },
  { id: "green", name: "Green", color: "#22c55e" },
  { id: "blue", name: "Blue", color: "#3b82f6" },
  { id: "indigo", name: "Indigo", color: "#6366f1" },
  { id: "violet", name: "Violet", color: "#a855f7" },
];

function ThemeSwitcher() {
  const [themeIndex, setThemeIndex] = useState(0);
  const [pullDistance, setPullDistance] = useState(0);
  const pullStartY = useRef(null);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("ayan-portfolio-theme");
    const savedIndex = themes.findIndex((theme) => theme.id === savedTheme);
    const index = savedIndex >= 0 ? savedIndex : 0;
    setThemeIndex(index);
    document.documentElement.dataset.theme = themes[index].id;
  }, []);

  const changeTheme = () => {
    const nextIndex = (themeIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    setThemeIndex(nextIndex);
    document.documentElement.dataset.theme = nextTheme.id;
    window.localStorage.setItem("ayan-portfolio-theme", nextTheme.id);
  };

  const activeTheme = themes[themeIndex];

  return (
    <div className="theme-switcher" style={{ "--pull-offset": `${pullDistance}px` }}>
      <span className="theme-switcher-cord" aria-hidden="true" />
      <button
        aria-label={`Pull down to change color theme. Current theme: ${activeTheme.name}`}
        className="theme-switcher-button"
        onPointerDown={(event) => {
          pullStartY.current = event.clientY;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (pullStartY.current === null) return;
          setPullDistance(Math.max(0, Math.min(event.clientY - pullStartY.current, 46)));
        }}
        onPointerUp={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
          if (pullDistance >= 20) changeTheme();
          pullStartY.current = null;
          setPullDistance(0);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            changeTheme();
          }
        }}
        title={`Theme: ${activeTheme.name}. Pull down and release to change.`}
        type="button"
      >
        <FaHeart className="theme-switcher-heart-glow" aria-hidden="true" />
        <FaHeart className="theme-switcher-heart-shape" aria-hidden="true" />
        <span className="theme-switcher-heart-content">
          <span className="theme-switcher-label">Theme</span>
          <span className="theme-switcher-count">{themeIndex + 1}/7</span>
        </span>
      </button>
      <div className="theme-switcher-dots" aria-hidden="true">
        {themes.map((theme, index) => (
          <span
            className={index === themeIndex ? "active" : ""}
            key={theme.id}
            style={{ backgroundColor: theme.color }}
          />
        ))}
      </div>
    </div>
  );
}

export default ThemeSwitcher;
