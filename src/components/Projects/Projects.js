import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { AnimatePresence, motion } from "framer-motion";
import { FaRobot, FaServer, FaShieldAlt } from "react-icons/fa";
import ProjectCard from "./ProjectCards";
import { Reveal, usePortfolioMotion } from "../Motion";

const projects = [
  {
    title: "Calendar Conflict Resolver Agent",
    description: "An AI agent that analyzes calendar availability, resolves scheduling conflicts, and suggests optimal meeting times.",
    status: "Completed",
    tags: ["Python", "AI Agent", "Automation"],
    categories: ["ai-agents", "python", "automation"],
    logoType: "calendar",
    logoLabel: "Calendar AI",
    focus: "Scheduling intelligence",
    role: "Designed and built the agent workflow in Python.",
    caseStudy: {
      challenge: "Meeting requests can overlap and make it difficult to find a time that works for everyone.",
      solution: "A Python AI agent that evaluates availability, identifies conflicts, and suggests practical meeting options.",
      capabilities: ["Availability analysis", "Conflict detection", "Meeting-time suggestions"],
      outcome: "A completed scheduling-automation project that demonstrates agent decision-making in Python.",
    },
    link: "https://github.com/muhammadayantoorie-creator/Calender_Conflict_Resolver_Agent",
  },
  {
    title: "WhatsApp Notification Router AI Agent",
    description: "An AI agent that routes and prioritizes WhatsApp notifications, filtering noise so important messages receive attention.",
    status: "Completed",
    tags: ["TypeScript", "AI Agent", "Automation"],
    categories: ["ai-agents", "typescript", "automation"],
    logoType: "whatsapp",
    logoLabel: "WhatsApp AI",
    focus: "Notification prioritization",
    role: "Built an AI-assisted routing workflow for message triage.",
    caseStudy: {
      challenge: "Busy notification streams make urgent messages easy to miss and low-value messages hard to manage.",
      solution: "A TypeScript-based AI workflow that classifies, prioritizes, and routes WhatsApp notifications.",
      capabilities: ["Priority classification", "Noise filtering", "Notification routing"],
      outcome: "A completed automation project focused on helping important messages get attention first.",
    },
    link: "https://github.com/muhammadayantoorie-creator/Whatsapp_Notification_router_AI_Agent",
  },
  {
    title: "MCP-Nexus",
    description: "A hub for managing AI model interactions through the Model Context Protocol, enabling seamless communication between AI systems.",
    status: "Completed",
    tags: ["Python", "MCP", "AI Infrastructure"],
    categories: ["python", "mcp"],
    logoType: "nexus",
    logoLabel: "MCP Nexus",
    focus: "AI infrastructure",
    role: "Explored model-context communication patterns with MCP.",
    caseStudy: {
      challenge: "AI tools need a structured way to share context and coordinate model interactions.",
      solution: "A Python hub that explores Model Context Protocol patterns for connecting intelligent systems.",
      capabilities: ["MCP exploration", "Context management", "AI-system coordination"],
      outcome: "A completed AI-infrastructure project that shows forward-looking work with the MCP ecosystem.",
    },
    link: "https://github.com/muhammadayantoorie-creator/MCP-Nexus",
  },
  {
    title: "ScarpeHub",
    description: "A web-scraping toolkit for collecting and aggregating data from multiple online sources into structured formats.",
    status: "Completed",
    tags: ["Python", "Web Scraping", "Selenium"],
    categories: ["python", "data-scraping"],
    logoType: "scrape",
    logoLabel: "ScarpeHub",
    focus: "Data collection",
    role: "Created a structured data-collection and aggregation toolkit.",
    caseStudy: {
      challenge: "Web data is often scattered, inconsistent, and difficult to prepare for analysis.",
      solution: "A Python toolkit for collecting, structuring, and aggregating information from multiple web sources.",
      capabilities: ["Web scraping", "Structured extraction", "Data aggregation"],
      outcome: "A completed data-collection project that supports practical automation and analysis workflows.",
    },
    link: "https://github.com/muhammadayantoorie-creator/ScarpeHub",
  },
];

const hiringStrengths = [
  {
    icon: <FaServer aria-hidden="true" />,
    title: "Python builder",
    text: "I build Python web apps, APIs, and data workflows with reliability in mind.",
  },
  {
    icon: <FaRobot aria-hidden="true" />,
    title: "Generative AI focused",
    text: "I create AI agents and workflow automations that solve practical problems.",
  },
  {
    icon: <FaShieldAlt aria-hidden="true" />,
    title: "AI-security path",
    text: "I am growing toward ML for cybersecurity and secure, trustworthy AI systems.",
  },
];

const projectFilters = [
  { id: "all", label: "All work" },
  { id: "ai-agents", label: "AI Agents" },
  { id: "python", label: "Python" },
  { id: "typescript", label: "TypeScript" },
  { id: "automation", label: "Automation" },
  { id: "data-scraping", label: "Data / Scraping" },
  { id: "mcp", label: "MCP" },
];

function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const {
    getSlideVariants,
    motionTransition,
    motionViewport,
    shouldReduceMotion,
    staggerContainerVariants,
  } = usePortfolioMotion();
  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter((project) => project.categories.includes(activeFilter));

  return (
    <Container fluid className="project-section scroll-snap-section" id="projects">
      <Container>
        <Reveal as="h1" className="project-heading">
          Featured <strong className="purple">Projects</strong>
        </Reveal>
        <Reveal as="p" style={{ color: "white" }}>
          Python, Generative AI, automation, and data projects supporting my path into ML for cybersecurity and AI security.
        </Reveal>
        <div aria-label="Filter featured projects" className="project-filter-shell" role="group">
          <div className="project-filter-bar">
            {projectFilters.map((filter) => (
              <button
                aria-pressed={activeFilter === filter.id}
                className={activeFilter === filter.id ? "is-active" : ""}
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                type="button"
              >
                {filter.label}
              </button>
            ))}
          </div>
          <p aria-live="polite" className="project-filter-status">
            Showing {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
          </p>
        </div>
        <motion.div
          animate={shouldReduceMotion ? "visible" : undefined}
          className="row"
          initial={shouldReduceMotion ? "visible" : "hidden"}
          style={{ justifyContent: "center", paddingBottom: "10px" }}
          variants={staggerContainerVariants}
          viewport={motionViewport}
          whileInView={shouldReduceMotion ? undefined : "visible"}
        >
          <AnimatePresence initial={false}>
            {filteredProjects.map((project, index) => (
              <motion.div
                className="col-md-6 project-card"
                exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.97, y: -12 }}
                key={project.title}
                layout="position"
                transition={{ ...motionTransition, layout: motionTransition }}
                variants={getSlideVariants(index % 2 === 0 ? "left" : "right")}
              >
                <ProjectCard
                  isBlog={false}
                  title={project.title}
                  description={project.description}
                  caseStudy={project.caseStudy}
                  logoLabel={project.logoLabel}
                  logoType={project.logoType}
                  status={project.status}
                  tags={project.tags}
                  focus={project.focus}
                  role={project.role}
                  link={project.link}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        <Reveal className="project-proof-panel">
          <div className="project-proof-copy">
            <span className="project-proof-eyebrow">Why work with me</span>
            <h2>Built to turn Python and AI ideas into <strong>practical systems.</strong></h2>
            <p>My projects combine Python development, Generative AI, and automation while I grow toward ML for cybersecurity and secure AI design.</p>
          </div>
          <div className="project-proof-grid">
            {hiringStrengths.map((strength) => (
              <article className="project-proof-item" key={strength.title}>
                <span className="project-proof-icon">{strength.icon}</span>
                <div>
                  <h3>{strength.title}</h3>
                  <p>{strength.text}</p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </Container>
    </Container>
  );
}

export default Projects;
