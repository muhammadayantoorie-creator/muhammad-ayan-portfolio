import React from "react";
import { Card } from "react-bootstrap";
import { FaExternalLinkAlt } from "react-icons/fa";

function ExperienceCard(props) {
  const isEducation = props.type === "education";

  return (
    <Card className={`experience-card-view ${isEducation ? "education-card" : "work-card"}`}>
      <Card.Body className="experience-card-body">
        <span className="experience-card-label">
          {isEducation ? "Education" : "Experience"}
        </span>
        <Card.Title className="experience-card-title">{props.title}</Card.Title>
        <Card.Subtitle className="experience-card-organization">
          {props.organization}
        </Card.Subtitle>
        <Card.Text className="experience-card-date">{props.date}</Card.Text>
        <Card.Text className="experience-card-description">
          {props.description}
        </Card.Text>
        {props.documentLink && (
          <a
            className="experience-card-link"
            href={props.documentLink} 
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaExternalLinkAlt /> View Certificate
          </a>
        )}
      </Card.Body>
    </Card>
  );
}

export default ExperienceCard;
