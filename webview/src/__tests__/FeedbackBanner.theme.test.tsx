import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeedbackBanner } from "../components/FeedbackBanner";

describe("FeedbackBanner — Cal Poly theme classes (correct state)", () => {
  it("renders '✓ Correct!' with gold heading", () => {
    render(
      <FeedbackBanner isCorrect={true} hint="" xpAwarded={10} onContinue={() => {}} />
    );
    const heading = screen.getByText("✓ Correct!");
    expect(heading.className).toContain("text-vybe-mustang-gold");
  });

  it("uses green/gold border and background classes", () => {
    const { container } = render(
      <FeedbackBanner isCorrect={true} hint="" xpAwarded={10} onContinue={() => {}} />
    );
    const card = container.firstElementChild as HTMLElement;
    expect(card.className).toContain("border-vybe-success-deep/40");
    expect(card.className).toContain("bg-vybe-poly-green/20");
  });

  it("'Next Challenge' button uses gold styling", () => {
    render(
      <FeedbackBanner isCorrect={true} hint="" xpAwarded={10} onContinue={() => {}} />
    );
    const button = screen.getByRole("button", { name: /Next Challenge/i });
    expect(button.className).toContain("border-vybe-mustang-gold");
    expect(button.className).toContain("text-vybe-mustang-gold");
    expect(button.className).toContain("bg-vybe-poly-green/30");
  });
});

describe("FeedbackBanner — Cal Poly theme classes (incorrect state)", () => {
  it("renders '✗ Not quite' with error color", () => {
    render(
      <FeedbackBanner isCorrect={false} hint="Think about caching" xpAwarded={5} />
    );
    const heading = screen.getByText("✗ Not quite");
    expect(heading.className).toContain("text-vybe-error");
  });

  it("renders RECOVERY MODE badge when isRecovering", () => {
    render(
      <FeedbackBanner
        isCorrect={false}
        hint="Think about caching"
        xpAwarded={5}
        isRecovering={true}
      />
    );
    const badge = screen.getByText("RECOVERY MODE");
    expect(badge.className).toContain("bg-vybe-error/10");
    expect(badge.className).toContain("text-vybe-error/80");
    expect(badge.className).toContain("border-vybe-error/20");
  });

  it("'Try Easier Question' button uses green/gold styling, not red", () => {
    render(
      <FeedbackBanner
        isCorrect={false}
        hint="Think about caching"
        xpAwarded={5}
        onTryEasier={() => {}}
      />
    );
    const button = screen.getByRole("button", { name: /Try Easier Question/i });
    expect(button.className).toContain("border-vybe-border");
    expect(button.className).toContain("bg-vybe-card-raised");
    expect(button.className).toContain("text-vybe-text");
    expect(button.className).not.toContain("red");
  });
});
