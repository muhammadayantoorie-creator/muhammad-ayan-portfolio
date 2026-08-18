import React from "react";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import ExperienceCard from "./ExperiencesCards";
import "./Experiences.css";
import { Reveal, usePortfolioMotion } from "../Motion";

const educationData = [
  {
    type: "education",
    title: "BS in Artificial Intelligence",
    organization: "National University of Technology, Islamabad",
    date: "2025 - 2029 (Expected)",
    description:
      "Focus areas: Python development, Generative AI, machine learning for cybersecurity, and AI security.",
  },
];

const experienceData = [
  {
    type: "experience",
    title: "Automation Engineer Intern",
    organization: "DevelopersHub Corporation, Islamabad",
    date: "2026 - Present",
    description:
      "Building Python and Generative AI automation pipelines, integrating AI agents into workflows, and designing secure APIs.",
  },
  {
    type: "experience",
    title: "Founder & Lead Developer",
    organization: "ERAEDU, NIC Islamabad",
    date: "2026 - Present",
    description:
      "Leading an ed-tech startup with a focus on Python web development, product delivery, and team leadership.",
  },
  {
    type: "experience",
    title: "Hackathons & Technical Challenges",
    organization: "Antigravity National | BANO Qabil Pakistan | HackerRank",
    date: "Active participant",
    description:
      "Applying Python, Generative AI, machine learning, and automation skills through competitive hackathons and technical challenges.",
  },
  {
    type: "experience",
    title: "AWS Student Builder Group",
    organization: "Active member",
    date: "Present",
    description:
      "Continuing hands-on learning in cloud, Python development, Generative AI, and secure engineering practices.",
  },
];

function Experiences() {
  const {
    fadeUpVariants,
    motionViewport,
    shouldReduceMotion,
    staggerContainerVariants,
  } = usePortfolioMotion();

  return (
    <Container fluid className="experience-section scroll-snap-section" id="experience">
      <Container>
        <Reveal className="section-heading">
          <h1 className="experience-heading">
            <span className="purple">Experience &amp; Education</span>
          </h1>
          <p className="section-description">
            My education, professional work, and hands-on growth in Python, Generative AI, ML for cybersecurity, and AI security.
          </p>
        </Reveal>

        <div className="experience-layout">
          <Reveal as="section" className="education-summary" aria-labelledby="education-title">
            <div className="experience-section-kicker">Academic journey</div>
            <h3 id="education-title" className="column-title education-color">Education</h3>
            {educationData.map((item) => (
              <ExperienceCard key={item.title} {...item} />
            ))}
          </Reveal>

          <motion.section
            animate={shouldReduceMotion ? "visible" : undefined}
            aria-labelledby="experience-title"
            className="experience-timeline"
            initial={shouldReduceMotion ? "visible" : "hidden"}
            variants={staggerContainerVariants}
            viewport={motionViewport}
            whileInView={shouldReduceMotion ? undefined : "visible"}
          >
            <motion.div className="experience-section-kicker" variants={fadeUpVariants}>Building in public</motion.div>
            <motion.h3 id="experience-title" className="column-title experience-color" variants={fadeUpVariants}>
              Experience &amp; Activities
            </motion.h3>
            <div className="timeline-line" aria-hidden="true" />
            {experienceData.map((item) => (
              <motion.div key={item.title} className="timeline-item" variants={fadeUpVariants}>
                <div className="timeline-marker" aria-hidden="true" />
                <ExperienceCard {...item} />
              </motion.div>
            ))}
          </motion.section>
        </div>
      </Container>
    </Container>
  );
}

export default Experiences;
