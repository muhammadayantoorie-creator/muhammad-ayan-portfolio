import React from "react";
import { Row } from "react-bootstrap";
import {
  SiPython, SiJavascript, SiPostgresql, SiGnubash, SiFastapi, SiDjango,
  SiFlask, SiMysql, SiRedis, SiOpenai, SiSelenium, SiPandas, SiNumpy,
  SiScikitlearn, SiLinux, SiOwasp, SiDocker, SiGithub, SiVisualstudiocode,
  SiPostman, SiJupyter,
} from "react-icons/si";
import { FaBrain, FaCode, FaLink, FaNetworkWired, FaPlug, FaShieldAlt, FaTerminal } from "react-icons/fa";
import { motion } from "framer-motion";
import { usePortfolioMotion } from "../Motion";
import useTilt3D from "../useTilt3D";

const skillGroups = [
  {
    title: "Languages",
    skills: [
      ["Python", SiPython], ["JavaScript", SiJavascript], ["SQL", SiPostgresql], ["Bash", SiGnubash],
    ],
  },
  {
    title: "Backend & API",
    skills: [
      ["FastAPI", SiFastapi], ["Django", SiDjango], ["Flask", SiFlask], ["REST APIs", FaPlug],
      ["PostgreSQL", SiPostgresql], ["MySQL", SiMysql], ["Redis", SiRedis],
    ],
  },
  {
    title: "AI & Automation",
    skills: [
      ["OpenAI API", SiOpenai], ["LangChain", FaLink], ["n8n", FaNetworkWired], ["Selenium", SiSelenium],
      ["Pandas", SiPandas], ["NumPy", SiNumpy], ["Scikit-learn", SiScikitlearn], ["LLM orchestration", FaBrain],
    ],
  },
  {
    title: "Security",
    skills: [
      ["Linux", SiLinux], ["OWASP Top 10", SiOwasp], ["Networking", FaNetworkWired], ["Docker", SiDocker],
      ["Container security", FaShieldAlt], ["Secure coding", FaCode],
    ],
  },
  {
    title: "Tools",
    skills: [
      ["Git / GitHub", SiGithub], ["VS Code", SiVisualstudiocode], ["Postman", SiPostman], ["Docker", SiDocker],
      ["Jupyter", SiJupyter], ["Terminal", FaTerminal],
    ],
  },
];

function SkillTile({ Icon, skill, variants, disabled }) {
  const { tiltProps, tiltStyle } = useTilt3D({
    disabled,
    max: 3,
    perspective: 850,
  });

  return (
    <motion.div className="col-6 col-sm-4 col-md-3 tech-icons tech-icon-shell" variants={variants}>
      <motion.div className="skill-tilt-surface" {...tiltProps} style={tiltStyle}>
        <Icon className="skill-logo" aria-hidden="true" />
        <h5>{skill}</h5>
      </motion.div>
    </motion.div>
  );
}

function Techstack() {
  const {
    fadeUpVariants,
    motionViewport,
    shouldReduceMotion,
    staggerContainerVariants,
  } = usePortfolioMotion();

  return (
    <div className="skills-groups">
      {skillGroups.map((group) => (
        <motion.section
          animate={shouldReduceMotion ? "visible" : undefined}
          className="skills-group"
          initial={shouldReduceMotion ? "visible" : "hidden"}
          key={group.title}
          variants={staggerContainerVariants}
          viewport={motionViewport}
          whileInView={shouldReduceMotion ? undefined : "visible"}
        >
          <motion.h3 className="skills-group-title" variants={fadeUpVariants}>{group.title}</motion.h3>
          <Row className="justify-content-center">
            {group.skills.map(([skill, Icon]) => (
              <SkillTile Icon={Icon} disabled={shouldReduceMotion} key={skill} skill={skill} variants={fadeUpVariants} />
            ))}
          </Row>
        </motion.section>
      ))}
    </div>
  );
}

export default Techstack;
