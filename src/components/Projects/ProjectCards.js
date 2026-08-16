import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";
import { BiLinkExternal } from "react-icons/bi";
import {
  FaRobot,
  FaSitemap,
  FaBullseye,
  FaCalendarCheck,
  FaWhatsapp,
  FaProjectDiagram,
  FaSpider,
} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { usePortfolioMotion } from "../Motion";
import useTilt3D from "../useTilt3D";

const projectLogos = {
  calendar: { Icon: FaCalendarCheck, eyebrow: "Smart scheduling", initials: "CCR" },
  whatsapp: { Icon: FaWhatsapp, eyebrow: "Priority routing", initials: "WA" },
  nexus: { Icon: FaProjectDiagram, eyebrow: "Model context hub", initials: "MCP" },
  scrape: { Icon: FaSpider, eyebrow: "Structured web data", initials: "SH" },
  default: { Icon: FaRobot, eyebrow: "AI project", initials: "AI" },
};

function ProjectCards(props) {
  const isInternal = props.link && props.link.startsWith("/");
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);
  const {
    hoverScale,
    hoverTransition,
    motionTransition,
    motionViewport,
    shouldReduceMotion,
  } = usePortfolioMotion();
  const { tiltProps, tiltStyle } = useTilt3D({
    disabled: shouldReduceMotion,
    max: 3.5,
    perspective: 1000,
  });
  const imageReveal = {
    hidden: { clipPath: "inset(0 100% 0 0)" },
    visible: { clipPath: "inset(0 0% 0 0)", transition: motionTransition },
  };
  const projectLogo = projectLogos[props.logoType] || projectLogos.default;
  const ProjectLogo = projectLogo.Icon;
  const caseStudyId = `case-study-${(props.title || "project").toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <motion.div
      className="fm-project-card"
      transition={hoverTransition}
      whileHover={shouldReduceMotion ? undefined : { boxShadow: "0 22px 50px rgba(56, 189, 248, 0.22)", scale: hoverScale, y: -6 }}
    >
      <Card className="project-card-view">
        <motion.div className="project-tilt-surface" {...tiltProps} style={tiltStyle}>
          <motion.div
            animate={shouldReduceMotion ? "visible" : undefined}
            className="fm-project-thumbnail"
            initial={shouldReduceMotion ? "visible" : "hidden"}
            variants={imageReveal}
            viewport={motionViewport}
            whileInView={shouldReduceMotion ? undefined : "visible"}
          >
            {props.imgPath ? (
              <Card.Img variant="top" src={props.imgPath} alt={props.title} loading="lazy" decoding="async" />
            ) : (
              <div className={`project-logo-header project-logo-header--${props.logoType || "default"}`}>
                <span aria-hidden="true" className="project-logo-halo" />
                <span aria-hidden="true" className="project-logo-mark"><ProjectLogo /></span>
                <div className="project-logo-copy">
                  <span>{projectLogo.eyebrow}</span>
                  <strong>{props.logoLabel || props.title}</strong>
                </div>
                <span aria-hidden="true" className="project-logo-initials">{projectLogo.initials}</span>
              </div>
            )}
          </motion.div>
          <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            {props.focus && <div className="project-focus"><FaBullseye /> {props.focus}</div>}
            {props.status && (
              <Badge bg="success" style={{ marginBottom: "12px" }}>
                {props.status}
              </Badge>
            )}
            <Card.Text style={{ textAlign: "justify" }}>
              {props.description}
            </Card.Text>
            {props.role && <p className="project-role"><strong>My contribution:</strong> {props.role}</p>}
            {props.tags?.length > 0 && (
              <div style={{ marginBottom: "16px" }}>
                {props.tags.map((tag) => (
                  <Badge
                    bg="secondary"
                    key={tag}
                    style={{ marginRight: "6px", marginBottom: "6px" }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            {props.caseStudy && (
              <>
                <button
                  aria-controls={caseStudyId}
                  aria-expanded={isCaseStudyOpen}
                  className="project-case-study-toggle"
                  onClick={() => setIsCaseStudyOpen((open) => !open)}
                  type="button"
                >
                  <FaSitemap aria-hidden="true" />
                  {isCaseStudyOpen ? "Hide case study" : "View case study"}
                </button>
                <AnimatePresence initial={false}>
                  {isCaseStudyOpen && (
                    <motion.div
                      animate={{ height: "auto", opacity: 1, y: 0 }}
                      className="project-case-study"
                      exit={{ height: 0, opacity: 0, y: -8 }}
                      id={caseStudyId}
                      initial={shouldReduceMotion ? false : { height: 0, opacity: 0, y: -8 }}
                      transition={motionTransition}
                    >
                      <div className="project-case-study-grid">
                        <article>
                          <span>Challenge</span>
                          <p>{props.caseStudy.challenge}</p>
                        </article>
                        <article>
                          <span>Solution</span>
                          <p>{props.caseStudy.solution}</p>
                        </article>
                        <article className="project-case-study-capabilities">
                          <span>Capabilities</span>
                          <ul>
                            {props.caseStudy.capabilities.map((capability) => <li key={capability}>{capability}</li>)}
                          </ul>
                        </article>
                        <article>
                          <span>Project outcome</span>
                          <p>{props.caseStudy.outcome}</p>
                        </article>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
            <motion.div
              className="d-inline-block"
              transition={hoverTransition}
              whileHover={shouldReduceMotion ? undefined : { boxShadow: "0 12px 28px rgba(56, 189, 248, 0.28)", scale: hoverScale, y: -2 }}
            >
              {isInternal ? (
                <Link className="btn btn-primary" to={props.link}>
                  <FaSitemap /> &nbsp;View Case Study
                </Link>
              ) : (
                <a className="btn btn-primary" href={props.link} target="_blank" rel="noopener noreferrer">
                  <BiLinkExternal /> &nbsp;
                  {props.isBlog ? "View Blog" : "View Source Code"}
                </a>
              )}
            </motion.div>
          </Card.Body>
        </motion.div>
      </Card>
    </motion.div>
  );
}
export default ProjectCards;
