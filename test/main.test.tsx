import ReactDOM from "react-dom/client";
import App from "App";
import { render, screen } from "@testing-library/react";

// canary tests

describe("canaryTest", () => {
  it("should ensure that canary tests are working", () => {
    expect(true).toBeTruthy();
  });
});

describe("appTest", () => {
  it("should mount and unmount app without crashing", () => {
    const div = document.createElement("div");
    const root = ReactDOM.createRoot(div as HTMLElement);
    root.render(<App />);
    root.unmount();
    render(<App />);
    expect(screen.getByText("Welcome to RR Legal")).toBeInTheDocument();
  });
});
