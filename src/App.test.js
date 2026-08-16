import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Muhammad Ayan portfolio shell", () => {
  render(<App />);
  expect(screen.getByText("Muhammad Ayan")).toBeInTheDocument();
  expect(screen.getByRole("navigation")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /projects/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /resume/i })).toBeInTheDocument();
});
