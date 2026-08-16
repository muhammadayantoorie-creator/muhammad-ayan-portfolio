import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AiFillGithub, AiOutlineTwitter } from "react-icons/ai";
import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { Reveal } from "./Motion";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <Reveal as="footer" className="footer">
      <Container fluid>
      <Row>
        <Col md="4" className="footer-copywright"><h3>Designed and developed by Muhammad Ayan</h3></Col>
        <Col md="4" className="footer-copywright"><h3>Copyright © {year} Muhammad Ayan</h3></Col>
        <Col md="4" className="footer-body">
          <ul className="footer-icons">
            <li className="social-icons"><a href="https://github.com/muhammadayantoorie-creator" style={{ color: "white" }} target="_blank" rel="noreferrer"><AiFillGithub /></a></li>
            <li className="social-icons"><a href="https://x.com/MuhammadAy94075" style={{ color: "white" }} target="_blank" rel="noreferrer"><AiOutlineTwitter /></a></li>
            <li className="social-icons"><a href="https://www.linkedin.com/in/muhammad-ayan-84b605380/" style={{ color: "white" }} target="_blank" rel="noreferrer"><FaLinkedinIn /></a></li>
            <li className="social-icons"><a href="https://wa.me/923029153302" style={{ color: "white" }} target="_blank" rel="noreferrer"><FaWhatsapp /></a></li>
          </ul>
        </Col>
      </Row>
      </Container>
    </Reveal>
  );
}

export default Footer;
