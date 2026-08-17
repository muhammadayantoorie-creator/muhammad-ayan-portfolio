import React, { useCallback, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import homeLogo from "../../Assets/muhammad-ayan.jpeg";
import Particle from "../Particle";
import Type from "./Type";
import { AiFillGithub } from "react-icons/ai";
import {
  FaLinkedinIn,
  FaShieldAlt,
  FaBrain,
  FaServer,
  FaArrowRight,
  FaCheckCircle,
  FaGraduationCap,
  FaRocket,
  FaLock,
} from "react-icons/fa";
import { CgFileDocument } from "react-icons/cg";
import { MdEmail } from "react-icons/md";
import { Reveal, usePortfolioMotion } from "../Motion";
import useTilt3D from "../useTilt3D";

const socialLinks = [
  { label: "GitHub", href: "https://github.com/muhammadayantoorie-creator", icon: <AiFillGithub /> },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/muhammad-ayan-84b605380/", icon: <FaLinkedinIn /> },
  { label: "X / Twitter", href: "https://x.com/MuhammadAy94075" },
  { label: "WhatsApp", href: "https://wa.me/923029153302" },
];

const emailComposeUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=muhammadayantoorie%40gmail.com";

const focusAreas = [
  { icon: <FaServer />, title: "Backend Systems", text: "Python APIs, data pipelines, and reliable services." },
  { icon: <FaBrain />, title: "AI Automation", text: "Practical agents and workflows that reduce manual work." },
  { icon: <FaShieldAlt />, title: "AI Security", text: "Building toward trustworthy, secure intelligent systems." },
];

const nextSteps = [
  { icon: <FaGraduationCap />, label: "Studying", text: "BS Artificial Intelligence at NUTECH, expected 2029." },
  { icon: <FaRocket />, label: "Building", text: "Practical Python, API, and AI automation projects." },
  { icon: <FaLock />, label: "Growing toward", text: "AI security for safe, robust, trustworthy systems." },
];

const portfolioHighlights = [
  ["04", "Completed projects"],
  ["17", "Certificates & achievements"],
  ["2029", "Expected graduation"],
];

function HeroReveal({ as = "div", children, className, delay = 0, direction = "up", ...props }) {
  const { getSlideVariants, shouldReduceMotion } = usePortfolioMotion();
  const MotionElement = motion[as] || motion.div;
  const variants = getSlideVariants(direction, delay);

  return (
    <MotionElement
      animate="visible"
      className={className}
      initial={shouldReduceMotion ? "visible" : "hidden"}
      variants={variants}
      {...props}
    >
      {children}
    </MotionElement>
  );
}

function AnimatedHeroLine({ className, dataText, delay, direction = "up", text }) {
  const {
    fadeUpVariants,
    getSlideVariants,
    motionTransition,
    settings,
    shouldReduceMotion,
  } = usePortfolioMotion();
  const words = text.split(" ");
  const baseVariants = getSlideVariants(direction, delay);
  const lineVariants = {
    hidden: baseVariants.hidden,
    visible: {
      ...baseVariants.visible,
      transition: {
        ...motionTransition,
        delay,
        delayChildren: 0.02,
        staggerChildren: settings.stagger,
      },
    },
  };

  return (
    <motion.span
      animate="visible"
      className={className}
      data-text={dataText}
      initial={shouldReduceMotion ? "visible" : "hidden"}
      style={{ display: "block" }}
      variants={lineVariants}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          style={{ display: "inline-block", marginRight: "0.28em" }}
          variants={fadeUpVariants}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

function Home() {
  const heroRef = useRef(null);
  const heroFrameRef = useRef(null);
  const {
    fadeUpVariants,
    getSlideVariants,
    hoverScale,
    hoverTransition,
    motionViewport,
    settings,
    shouldReduceMotion,
    staggerContainerVariants,
  } = usePortfolioMotion();
  const { tiltProps: profileTiltProps, tiltStyle: profileTiltStyle } = useTilt3D({
    disabled: shouldReduceMotion,
    max: 5,
    perspective: 1300,
  });
  const profileSlideVariants = getSlideVariants("right", 0.04);
  const handleHeroDepth = useCallback((event) => {
    if (shouldReduceMotion || event.pointerType === "touch" || !heroRef.current) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
    if (heroFrameRef.current) window.cancelAnimationFrame(heroFrameRef.current);
    heroFrameRef.current = window.requestAnimationFrame(() => {
      heroRef.current?.style.setProperty("--hero-far-x", `${horizontal * -10}px`);
      heroRef.current?.style.setProperty("--hero-far-y", `${vertical * -8}px`);
      heroRef.current?.style.setProperty("--hero-near-x", `${horizontal * -22}px`);
      heroRef.current?.style.setProperty("--hero-near-y", `${vertical * -18}px`);
      heroRef.current?.style.setProperty("--hero-glow-x", `${(horizontal + 0.5) * 100}%`);
      heroRef.current?.style.setProperty("--hero-glow-y", `${(vertical + 0.5) * 100}%`);
      heroFrameRef.current = null;
    });
  }, [shouldReduceMotion]);
  const resetHeroDepth = useCallback(() => {
    if (heroFrameRef.current) window.cancelAnimationFrame(heroFrameRef.current);
    heroFrameRef.current = null;
    if (!heroRef.current) return;
    ["--hero-far-x", "--hero-far-y", "--hero-near-x", "--hero-near-y", "--hero-glow-x", "--hero-glow-y"].forEach((variable) => heroRef.current.style.removeProperty(variable));
  }, []);
  const highlightVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: shouldReduceMotion ? 0 : 0.84,
        staggerChildren: shouldReduceMotion ? 0 : settings.stagger,
      },
    },
  };

  return (
    <section>
      <Container
        fluid
        className="home-section scroll-snap-section"
        id="home"
        onPointerLeave={resetHeroDepth}
        onPointerMove={handleHeroDepth}
        ref={heroRef}
      >
        <Particle />
        <div aria-hidden="true" className="hero-depth-field">
          <span className="hero-depth-plane hero-depth-plane--far" />
          <span className="hero-depth-plane hero-depth-plane--near" />
        </div>
        <Container className="home-content">
          <Row className="align-items-center">
            <Col md={7} className="home-header hero-copy-column order-2 order-md-1">
              <HeroReveal className="cyber-badge" delay={0.18}>
                <span className="badge-dot" />
                BS AI Student | Python &amp; FastAPI Developer | Islamabad, Pakistan
              </HeroReveal>
              <h1 className="cyber-tagline hero-welcome-heading">
                <AnimatedHeroLine className="glitch-text hero-welcome-name" dataText="Hi, I'm Muhammad Ayan." delay={0.28} text="Hi, I'm Muhammad Ayan." />
                <AnimatedHeroLine className="neon-green-text hero-welcome-role" delay={0.42} text="Python & FastAPI Developer. Machine Learning for Cybersecurity." />
              </h1>
              <HeroReveal as="h2" className="heading-name hero-welcome-signature" delay={0.54} style={{ marginTop: "16px" }}>
                Automate. Build. <strong className="main-name">Secure.</strong>
              </HeroReveal>
              <HeroReveal className="home-hero-typewriter" delay={0.62}><Type /></HeroReveal>
              <HeroReveal as="p" className="tagline home-hero-tagline" delay={0.7}>Building secure backend systems, AI automation, and machine-learning solutions for cybersecurity.</HeroReveal>
              <HeroReveal className="home-hero-cta" delay={0.78}>
                <motion.a
                  className="hero-primary-cta fm-button"
                  href={emailComposeUrl}
                  rel="noreferrer"
                  target="_blank"
                  transition={hoverTransition}
                  whileHover={shouldReduceMotion ? undefined : { boxShadow: "0 14px 32px rgba(56, 189, 248, 0.32)", scale: hoverScale }}
                >
                  <MdEmail /> Let&apos;s work together <FaArrowRight />
                </motion.a>
                <motion.a
                  aria-label="View Muhammad Ayan's featured projects"
                  className="hero-projects-cta fm-button"
                  href="#projects"
                  transition={hoverTransition}
                  whileHover={shouldReduceMotion ? undefined : { boxShadow: "0 12px 28px rgba(56, 189, 248, 0.2)", scale: hoverScale }}
                >
                  <FaServer /> View projects
                </motion.a>
                <motion.a
                  aria-label="View Muhammad Ayan's resume"
                  className="hero-resume-cta fm-button"
                  href="#resume"
                  transition={hoverTransition}
                  whileHover={shouldReduceMotion ? undefined : { boxShadow: "0 14px 32px rgba(56, 189, 248, 0.34)", scale: hoverScale }}
                >
                  <CgFileDocument /> View resume
                </motion.a>
              </HeroReveal>
              <HeroReveal className="hero-social-links" delay={0.88} aria-label="Contact and social links">
                {socialLinks.map((link) => (
                  <motion.a
                    href={link.href}
                    key={link.label}
                    rel="noreferrer"
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    transition={hoverTransition}
                    whileHover={shouldReduceMotion ? undefined : { scale: hoverScale }}
                  >
                    {link.icon} {link.label}
                  </motion.a>
                ))}
              </HeroReveal>
              <motion.div
                animate="visible"
                aria-label="Portfolio highlights"
                className="portfolio-highlights"
                initial={shouldReduceMotion ? "visible" : "hidden"}
                variants={highlightVariants}
              >
                {portfolioHighlights.map(([value, label]) => (
                  <motion.div key={label} variants={fadeUpVariants}>
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </Col>
            <Col md={5} className="hero-profile-column order-1 order-md-2" style={{ paddingBottom: 20 }}>
              <motion.div
                animate="visible"
                className="future-profile-shell"
                initial={shouldReduceMotion ? "visible" : "hidden"}
                variants={profileSlideVariants}
              >
                <div className="spatial-orbit" aria-hidden="true">
                  <span className="spatial-node node-python">PY</span>
                  <span className="spatial-node node-ai">AI</span>
                  <span className="spatial-node node-secure">SEC</span>
                </div>
                <motion.div className="profile-depth-stage" {...profileTiltProps} style={profileTiltStyle}>
                  <span aria-hidden="true" className="profile-3d-halo profile-3d-halo--outer" />
                  <span aria-hidden="true" className="profile-3d-halo profile-3d-halo--inner" />
                  <div className="cyber-profile-container">
                    <div className="cyber-profile-ring">
                      <img src={homeLogo} alt="Muhammad Ayan" className="img-fluid" decoding="async" fetchPriority="high" />
                    </div>
                  </div>
                  <div className="future-profile-console" aria-label="Professional status">
                    <div><span>STATUS</span><strong><i />Open to collaborate</strong></div>
                    <div><span>FOCUS</span><strong>Python + AI Automation</strong></div>
                    <div><span>LOCATION</span><strong>Islamabad, Pakistan</strong></div>
                  </div>
                </motion.div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </Container>

      <Container fluid className="home-about-section scroll-snap-section">
        <Container style={{ position: "relative", zIndex: 1 }}>
          <Reveal as="h2" className="project-heading">What I <span className="purple">Build</span></Reveal>
          <motion.div
            animate={shouldReduceMotion ? "visible" : undefined}
            className="row"
            initial={shouldReduceMotion ? "visible" : "hidden"}
            variants={staggerContainerVariants}
            viewport={motionViewport}
            whileInView={shouldReduceMotion ? undefined : "visible"}
          >
            {focusAreas.map((area) => (
              <motion.div className="col-md-4 project-card" key={area.title} variants={fadeUpVariants}>
                <div className="project-card-view" style={{ minHeight: "210px", padding: "28px", textAlign: "center" }}>
                  <div style={{ fontSize: "2.5rem", color: "var(--matrix-green)", marginBottom: "14px" }}>{area.icon}</div>
                  <h3 style={{ color: "white", fontSize: "1.35rem" }}>{area.title}</h3>
                  <p style={{ color: "#c6d4e8", margin: 0 }}>{area.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Container>

      <Container fluid className="home-now-section scroll-snap-section">
        <Container>
          <Reveal as="p" className="home-section-eyebrow">Now &amp; next</Reveal>
          <Reveal as="h2" className="project-heading">A focused path into <span className="purple">AI security</span></Reveal>
          <motion.div
            animate={shouldReduceMotion ? "visible" : undefined}
            className="row justify-content-center"
            initial={shouldReduceMotion ? "visible" : "hidden"}
            variants={staggerContainerVariants}
            viewport={motionViewport}
            whileInView={shouldReduceMotion ? undefined : "visible"}
          >
            {nextSteps.map((step) => (
              <motion.div className="col-lg-4 col-md-6 mb-3" key={step.label} variants={fadeUpVariants}>
                <div className="now-step-card">
                  <span className="now-step-icon">{step.icon}</span>
                  <div>
                    <h3>{step.label}</h3>
                    <p>{step.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Container>

      <Container fluid className="home-contact-section scroll-snap-section">
        <Container>
          <Reveal className="home-contact-card">
            <div>
              <span className="contact-availability"><FaCheckCircle /> Open to internships, projects, and collaborations</span>
              <h2>Let&apos;s build something reliable.</h2>
              <p>Have an AI automation, backend, or secure API challenge? I&apos;d be happy to discuss it.</p>
            </div>
            <div className="home-contact-actions">
              <motion.a
                className="hero-primary-cta fm-button"
                href={emailComposeUrl}
                rel="noreferrer"
                target="_blank"
                transition={hoverTransition}
                whileHover={shouldReduceMotion ? undefined : { boxShadow: "0 14px 32px rgba(56, 189, 248, 0.32)", scale: hoverScale }}
              ><MdEmail /> Email Muhammad</motion.a>
              <motion.a
                className="hero-resume-cta fm-button"
                href="#resume"
                transition={hoverTransition}
                whileHover={shouldReduceMotion ? undefined : { boxShadow: "0 12px 28px rgba(56, 189, 248, 0.2)", scale: hoverScale }}
              ><CgFileDocument /> View resume</motion.a>
            </div>
          </Reveal>
        </Container>
      </Container>
    </section>
  );
}

export default Home;
