import React from "react";
import { Container } from "react-bootstrap";
import { AiOutlineDownload } from "react-icons/ai";
import { Reveal } from "../Motion";
import resumePdf from "../../Assets/muhammad-ayan-resume.pdf";

const resumeFilename = "Muhammad_Ayan_Resume.pdf";
// Importing the PDF gives React the exact deployed asset URL. This remains
// correct on localhost, repository subfolders, and static hosting platforms.
const resumeDownloadUrl = resumePdf;
const resumePages = [
  "/resume-pages/muhammad-ayan-resume-1.png",
  "/resume-pages/muhammad-ayan-resume-2.png",
];

function ResumeNew() {
  return (
    <Container fluid className="resume-section scroll-snap-section" id="resume">
      <Reveal className="resume-intro">
        <p className="resume-eyebrow">Career snapshot</p>
        <h1>My <span className="purple">Resume</span></h1>
        <p>Download my resume or review it directly below.</p>
      </Reveal>

      <Reveal className="resume-download-panel">
        <span>PDF - Muhammad Ayan - Python &amp; AI Automation</span>
        <a
          className="resume-download-button fm-button"
          download={resumeFilename}
          href={resumeDownloadUrl}
        >
          <AiOutlineDownload />
          &nbsp;Download Resume
        </a>
      </Reveal>

      <a
        className="resume-open-link"
        href={resumeDownloadUrl}
        rel="noreferrer"
        target="_blank"
      >
        Open the PDF in a new tab
      </a>

      <div className="resume-pages-stack">
        {resumePages.map((page, index) => (
          <Reveal key={page}>
            <img
              alt={`Muhammad Ayan resume - page ${index + 1}`}
              className="resume-page-image"
              decoding="async"
              loading={index === 0 ? "eager" : "lazy"}
              src={page}
            />
          </Reveal>
        ))}
      </div>

      <Reveal className="resume-bottom-action row">
        <a
          className="resume-download-button fm-button"
          download={resumeFilename}
          href={resumeDownloadUrl}
        >
          <AiOutlineDownload />
          &nbsp;Download Resume
        </a>
      </Reveal>
    </Container>
  );
}

export default ResumeNew;
