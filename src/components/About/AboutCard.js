import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";
import { motion } from "framer-motion";
import { usePortfolioMotion } from "../Motion";

const activities = [
  "Python web app development and reliable API design",
  "Generative AI tools, AI-powered workflows, and practical automation",
  "Machine-learning workflows for cybersecurity use cases",
  "Exploring secure AI systems, responsible AI, and protected data pipelines",
  "Career goal: becoming an AI Security Engineer who builds trustworthy intelligent systems",
  "Building Python, Generative AI, and cybersecurity projects through hands-on experimentation",
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
            <b className="purple">BS Artificial Intelligence Student, Python &amp; Generative AI Developer, and aspiring AI Security Engineer</b>{" "}
            based in Islamabad, Pakistan. I focus on building Python web apps,
            Generative AI tools, and machine-learning workflows for cybersecurity.
            My interests include practical AI automation, reliable API development,
            and designing intelligent systems that are useful and secure. I am currently pursuing a <b className="purple">BS in Artificial Intelligence</b>{" "}
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
