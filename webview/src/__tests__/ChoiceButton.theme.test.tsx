import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChoiceButton } from "../components/ChoiceButton";

const noop = () => {};

describe("ChoiceButton — Cal Poly theme classes", () => {
  it("default state uses border-vybe-border-muted class", () => {
    render(<ChoiceButton label="A" text="Option A" state="default" onClick={noop} />);
    const button = screen.getByRole("button", { name: /Option A/i });
    expect(button.className).toContain("border-vybe-border-muted");
  });

  it("correct state uses green/gold classes (not amber)", () => {
    render(<ChoiceButton label="A" text="Correct answer" state="correct" onClick={noop} />);
    const button = screen.getByRole("button", { name: /Correct answer/i });
    expect(button.className).toContain("border-vybe-dexter-green");
    expect(button.className).toContain("text-vybe-stadium-gold");
    expect(button.className).not.toContain("amber");
  });

  it("incorrect state uses text-vybe-error class", () => {
    render(<ChoiceButton label="B" text="Wrong answer" state="incorrect" onClick={noop} />);
    const button = screen.getByRole("button", { name: /Wrong answer/i });
    expect(button.className).toContain("text-vybe-error");
  });

  it("disabled state has opacity-55 and text-vybe-muted", () => {
    render(<ChoiceButton label="C" text="Disabled option" state="disabled" onClick={noop} />);
    const button = screen.getByRole("button", { name: /Disabled option/i });
    expect(button.className).toContain("opacity-55");
    expect(button.className).toContain("text-vybe-muted");
  });

  it("disabled state preserves disabled and aria-disabled attributes", () => {
    render(<ChoiceButton label="D" text="Disabled option" state="disabled" onClick={noop} />);
    const button = screen.getByRole("button", { name: /Disabled option/i });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-disabled", "true");
  });
});
