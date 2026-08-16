import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import laptopImg from "../../Assets/muhammad-ayan.jpeg";
import { Reveal } from "../Motion";

function About() {
  return (
    <Container fluid className="about-section scroll-snap-section" id="about">
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <Reveal as="h1" style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
              Know Who <strong className="purple">I'M</strong>
            </Reveal>
            <Reveal><Aboutcard /></Reveal>
          </Col>
          <Col
            md={5}
            style={{ paddingTop: "120px", paddingBottom: "50px" }}
            className="about-img"
          >
            <Reveal direction="right"><img src={laptopImg} alt="Muhammad Ayan" className="img-fluid" decoding="async" loading="lazy" /></Reveal>
          </Col>
        </Row>
        <Reveal as="h1" className="project-heading">
          Professional <strong className="purple">Skillset </strong>
        </Reveal>

        <Techstack />
      </Container>
    </Container>
  );
}

export default About;
