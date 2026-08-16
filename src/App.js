import React, { useState, useEffect } from "react";
import Preloader from "./components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer";
import Resume from "./components/Resume/ResumeNew";
import Expriences from "./components/Experiences/Experiences";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Certificates from "./components/Certificates/Certificates";
import ThemeSwitcher from "./components/ThemeSwitcher";
import { MotionControl, MotionProvider } from "./components/Motion";

function OnePagePortfolio() {
  return (
    <>
      <Home />
      <About />
      <Projects />
      <Expriences />
      <Certificates />
      <Resume />
    </>
  );
}

function AnimatedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<OnePagePortfolio />} />
      <Route path="/project" element={<Navigate to="/#projects" replace />} />
      <Route path="/about" element={<Navigate to="/#about" replace />} />
      <Route path="/resume" element={<Navigate to="/#resume" replace />} />
      <Route path="/certificates" element={<Navigate to="/#certificates" replace />} />
      <Route path="/experience" element={<Navigate to="/#experience" replace />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function PortfolioApp() {
  const [load, upadateLoad] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (load) return undefined;

    const sectionIds = ["home", "about", "projects", "experience", "certificates", "resume"];
    let frameId = null;

    const updateScrollInterface = () => {
      frameId = null;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = maxScroll > 0 ? Math.min((window.scrollY / maxScroll) * 100, 100) : 0;
      setScrollProgress((current) => Math.abs(current - nextProgress) < 0.1 ? current : nextProgress);

      const readingLine = window.scrollY + window.innerHeight * 0.42;
      let nextActive = "home";
      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= readingLine) nextActive = id;
      });
      setActiveSection((current) => (current === nextActive ? current : nextActive));
    };

    const requestUpdate = () => {
      if (frameId === null) frameId = window.requestAnimationFrame(updateScrollInterface);
    };

    updateScrollInterface();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, [load]);

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <div
          aria-label="Page scroll progress"
          aria-valuemax="100"
          aria-valuemin="0"
          aria-valuenow={Math.round(scrollProgress)}
          className="scroll-progress-indicator"
          role="progressbar"
        >
          <span style={{ transform: `scaleX(${scrollProgress / 100})` }} />
        </div>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <Navbar activeSection={activeSection} />
        <ThemeSwitcher />
        {!load && <MotionControl />}
        <ScrollToTop ready={!load} />
        <main id="main-content">
          {!load && <AnimatedRoutes />}
        </main>
        {!load && <Footer />}
      </div>
    </Router>
  );
}

function App() {
  return (
    <MotionProvider>
      <PortfolioApp />
    </MotionProvider>
  );
}

export default App;
