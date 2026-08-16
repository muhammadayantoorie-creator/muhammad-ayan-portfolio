import React from "react";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import CertificateCard from "./CertificateCards";
import { Reveal, usePortfolioMotion } from "../Motion";

const certificates = [
  {
    title: "AWS Student Builder Group - DEV WEEKEND",
    description: "Active participation certificate from the AWS Student Builder Group at Quaid-i-Azam University, Islamabad.",
    image: "/certificates/aws-student-builder-group.jpeg",
  },
  {
    title: "HackerRank Orchestrate - August 2026",
    description: "Certificate of achievement for building and deploying an AI agent. Final rank: #1865 of 1,983 participants.",
    image: "/certificates/hackerrank-orchestrate.jpeg",
  },
  {
    title: "Guide to Vibe Coding in Windsurf",
    description: "Certificate of completion, February 2026.",
    image: "/certificates/vibe-coding-windsurf.png",
  },
  {
    title: "Build Website With AI",
    description: "Certificate of completion, May 2026. Certificate code: 10182472.",
    image: "/certificates/build-website-ai.png",
  },
  {
    title: "Introduction to AI",
    description: "Authorized by Google and offered through Coursera. Completed November 2025. Credential: FTQG8784LHM9.",
    image: "/certificates/introduction-ai.png",
  },
  {
    title: "Android App Development for Beginners",
    description: "Certificate of completion, June 2026. Certificate code: 10323611.",
    image: "/certificates/android-development.png",
  },
  {
    title: "Introduction to Prompt Engineering",
    description: "Certificate of completion, December 2025. Certificate code: 9507508.",
    image: "/certificates/prompt-engineering.png",
  },
  {
    title: "Loop Engineering",
    description: "Certificate of completion, July 2026.",
    image: "/certificates/loop-engineering.png",
  },
  {
    title: "Claude Code: The Coding Assistant",
    description: "Certificate of completion, July 2026.",
    image: "/certificates/claude-coding-assistant.png",
  },
  {
    title: "n8n: A Complete Guide to the Automation Tool",
    description: "Certificate of completion, July 2026.",
    image: "/certificates/n8n-automation.png",
  },
  {
    title: "ABC of Coding to Build AI Agents",
    description: "Certificate of completion, July 2026.",
    image: "/certificates/abc-ai-agents.png",
  },
  {
    title: "Building Intelligent Chatbots Using AI",
    description: "Certificate of completion, July 2026.",
    image: "/certificates/intelligent-chatbots.png",
  },
  {
    title: "Build a Resume Review Agentic System with CrewAI",
    description: "Certificate of completion, July 2026.",
    image: "/certificates/resume-review-crewai.png",
  },
  {
    title: "Building Data Analyst AI Agent",
    description: "Certificate of completion, July 2026.",
    image: "/certificates/data-analyst-agent.png",
  },
  {
    title: "Claude Code 101",
    description: "Certificate of completion from Anthropic Education, July 2026.",
    image: "/certificates/claude-code-101.png",
  },
  {
    title: "Claude Platform 101",
    description: "Certificate of completion from Anthropic Education, July 2026.",
    image: "/certificates/claude-platform-101.png",
  },
  {
    title: "AI Fluency for K-12 Educators",
    description: "Certificate of completion from Anthropic in collaboration with Teach For America, July 2026.",
    image: "/certificates/ai-fluency.png",
  },
];

const certificateRows = Array.from(
  { length: Math.ceil(certificates.length / 3) },
  (_, index) => certificates.slice(index * 3, index * 3 + 3)
);

function Certificates() {
  const {
    fadeUpVariants,
    motionViewport,
    shouldReduceMotion,
    staggerContainerVariants,
  } = usePortfolioMotion();

  return (
    <Container fluid className="project-section scroll-snap-section" id="certificates">
      <Container>
        <Reveal as="h1" className="project-heading">
          Certificates &amp; <strong className="purple">Achievements</strong>
        </Reveal>
        <Reveal as="p" style={{ color: "white" }}>
          Learning milestones in AI, automation, software development, and cloud.
        </Reveal>
        {certificateRows.map((row, rowIndex) => (
          <motion.div
            animate={shouldReduceMotion ? "visible" : undefined}
            className="row"
            initial={shouldReduceMotion ? "visible" : "hidden"}
            key={`certificate-row-${rowIndex}`}
            style={{ justifyContent: "center", paddingBottom: rowIndex === certificateRows.length - 1 ? "10px" : "22px" }}
            variants={staggerContainerVariants}
            viewport={{ ...motionViewport, amount: 0.08 }}
            whileInView={shouldReduceMotion ? undefined : "visible"}
          >
            {row.map((certificate) => (
              <motion.div className="col-md-4 project-card" key={certificate.title} variants={fadeUpVariants}>
                <CertificateCard
                  imgPath={certificate.image}
                  isBlog={false}
                  title={certificate.title}
                  description={certificate.description}
                />
              </motion.div>
            ))}
          </motion.div>
        ))}
      </Container>
    </Container>
  );
}

export default Certificates;
