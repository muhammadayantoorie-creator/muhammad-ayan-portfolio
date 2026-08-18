import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import { Reveal } from "../Motion";
import resumePdf from "../../Assets/muhammad-ayan-resume.pdf";

const resumeFilename = "Muhammad_Ayan_Resume.pdf";
// The imported file powers the on-page preview; the public file is used for
// direct downloads so each control has a stable URL after deployment.
const resumePreviewUrl = resumePdf;
const resumeDownloadUrl = `${process.env.PUBLIC_URL}/download/${resumeFilename}`;

pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.js`;

function ResumeNew() {
  const [pageCount, setPageCount] = useState(0);

  const handleDocumentLoad = ({ numPages }) => setPageCount(numPages);

  return (
    <Container fluid className="resume-section scroll-snap-section" id="resume">
      <Reveal className="resume-intro">
        <p className="resume-eyebrow">Professional snapshot</p>
        <h1>My <span className="purple">Resume</span></h1>
        <p>Download my latest resume for a snapshot of my journey in Python, Generative AI, ML for cybersecurity, and AI security.</p>
      </Reveal>

      <Reveal className="resume-download-panel">
        <span>PDF - Muhammad Ayan - Python, Generative AI &amp; AI Security</span>
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

      <Reveal className="resume-pdf-pages">
        <Document
          file={resumePreviewUrl}
          loading={<p className="resume-pdf-status">Loading resume…</p>}
          onLoadSuccess={handleDocumentLoad}
          error={<p className="resume-pdf-status">The resume preview could not load. Please use the download button above.</p>}
        >
          {Array.from({ length: pageCount }, (_, index) => (
            <Page
              key={`resume-page-${index + 1}`}
              pageNumber={index + 1}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          ))}
        </Document>
      </Reveal>

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
