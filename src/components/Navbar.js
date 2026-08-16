import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { AiFillGithub, AiOutlineFundProjectionScreen, AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";

function NavBar({ activeSection }) {
  const [expand, setExpand] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY >= 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setExpand(false);
  return (
    <Navbar expanded={expand} fixed="top" expand="md" className={scrolled ? "sticky" : "navbar"}>
      <Container>
        <Navbar.Brand href="#home" onClick={closeMenu} className="ayan-brand">
          <span className="ayan-brand-mark" aria-hidden="true">
            <span>M</span><span>A</span>
          </span>
          <span className="ayan-brand-copy">
            <span className="ayan-brand-name">Muhammad Ayan</span>
            <span className="ayan-brand-role">Python &amp; AI Automation</span>
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpand(expand ? false : "expanded")}>
          <span /><span /><span />
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link aria-current={activeSection === "home" ? "page" : undefined} className={activeSection === "home" ? "active" : ""} href="#home" onClick={closeMenu}><AiOutlineHome /> Home</Nav.Link>
            <Nav.Link aria-current={activeSection === "about" ? "page" : undefined} className={activeSection === "about" ? "active" : ""} href="#about" onClick={closeMenu}><AiOutlineUser /> About &amp; Skills</Nav.Link>
            <Nav.Link aria-current={activeSection === "projects" ? "page" : undefined} className={activeSection === "projects" ? "active" : ""} href="#projects" onClick={closeMenu}><AiOutlineFundProjectionScreen /> Projects</Nav.Link>
            <Nav.Link aria-current={activeSection === "experience" ? "page" : undefined} className={activeSection === "experience" ? "active" : ""} href="#experience" onClick={closeMenu}><AiOutlineFundProjectionScreen /> Experience</Nav.Link>
            <Nav.Link aria-current={activeSection === "certificates" ? "page" : undefined} className={activeSection === "certificates" ? "active" : ""} href="#certificates" onClick={closeMenu}><AiOutlineFundProjectionScreen /> Certificates</Nav.Link>
            <Nav.Link aria-current={activeSection === "resume" ? "page" : undefined} className={activeSection === "resume" ? "active" : ""} href="#resume" onClick={closeMenu}><CgFileDocument /> Resume</Nav.Link>
            <Nav.Item className="fork-btn">
              <Button href="https://github.com/muhammadayantoorie-creator" target="_blank" rel="noreferrer" className="fork-btn-inner">
                <AiFillGithub style={{ fontSize: "1.1em" }} /> GitHub
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
