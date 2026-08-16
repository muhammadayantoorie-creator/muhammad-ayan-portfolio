import { fireEvent, render, screen } from "@testing-library/react";
import { MotionProvider } from "./Motion";
import ProjectCard from "./Projects/ProjectCards";
import ResumeNew from "./Resume/ResumeNew";

function renderWithMotion(component) {
  return render(<MotionProvider>{component}</MotionProvider>);
}

test("both resume controls are direct PDF download links", () => {
  renderWithMotion(<ResumeNew />);

  const downloadLinks = screen.getAllByRole("link", { name: /download resume/i });
  expect(downloadLinks).toHaveLength(2);
  downloadLinks.forEach((link) => {
    expect(link).toHaveAttribute("download", "Muhammad_Ayan_Resume.pdf");
    expect(link).toHaveAttribute("href");
  });
});

test("project case study expands and source code opens in a new tab", () => {
  renderWithMotion(
    <ProjectCard
      caseStudy={{
        challenge: "A real project challenge.",
        solution: "A practical solution.",
        capabilities: ["Automation"],
        outcome: "A completed project.",
      }}
      description="Project description"
      link="https://github.com/muhammadayantoorie-creator/MCP-Nexus"
      logoType="nexus"
      title="MCP-Nexus"
    />
  );

  fireEvent.click(screen.getByRole("button", { name: /view case study/i }));
  expect(screen.getByText("A real project challenge.")).toBeInTheDocument();

  const sourceLink = screen.getByRole("link", { name: /view source code/i });
  expect(sourceLink).toHaveAttribute("href", "https://github.com/muhammadayantoorie-creator/MCP-Nexus");
  expect(sourceLink).toHaveAttribute("target", "_blank");
});
