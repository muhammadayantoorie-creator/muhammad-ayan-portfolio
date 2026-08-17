import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";
import { motion } from "framer-motion";
import { usePortfolioMotion } from "../Motion";

const activities = [
  "Backend engineering and reliable API development",
  "Python, FastAPI, and AI-driven workflow integration",
  "Data pipelines that make processes faster and more reliable",
  "Exploring machine learning for cybersecurity, secure AI systems, and protected data pipelines",
  "Career goal: becoming an AI Security Engineer who builds trustworthy intelligent systems",
  "Building small Python and AI projects through hands-on experimentation",
  "Playing cricket, reading about technology and security, and growing vegetables at home",
];

function AboutCard() {
  const {
    fadeUpVariants,
    motionViewport,
    shouldReduceMotion,
    staggerContainerVariants,
  } = usePortfolioMotion();

  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            I'm <span className="purple">Muhammad Ayan</span> — a{" "}
            <b className="purple">BS Artificial Intelligence Student, Python &amp; FastAPI Developer, and aspiring AI Security Engineer</b>{" "}
            based in Islamabad, Pakistan. I focus on building backend systems,
            automating workflows, and integrating AI to make processes faster and
            more reliable. My strengths include Python programming, API development,
            data pipelines, and designing automation solutions that reduce manual
            work. I am currently pursuing a <b className="purple">BS in Artificial Intelligence</b>{" "}
            at the National University of Technology Islamabad, with expected graduation in 2029.
          </p>
          <motion.ul
            animate={shouldReduceMotion ? "visible" : undefined}
            initial={shouldReduceMotion ? "visible" : "hidden"}
            variants={staggerContainerVariants}
            viewport={motionViewport}
            whileInView={shouldReduceMotion ? undefined : "visible"}
          >
            {activities.map((activity) => (
              <motion.li className="about-activity" key={activity} variants={fadeUpVariants}>
                <ImPointRight /> {activity}
              </motion.li>
            ))}
          </motion.ul>
          <p style={{ marginBlockEnd: 0, color: "rgb(155 126 172)" }}>
            "Build intelligent systems that are useful, reliable, and secure by design."
          </p>
          <br />
          <footer className="blockquote-footer">Muhammad Ayan</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
