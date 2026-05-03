import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeaderBar } from "../components/HeaderBar";
import { XPProgressBar } from "../components/XPProgressBar";
import { createInitialGameState } from "../state/gameState";

describe("HeaderBar — Cal Poly theme classes", () => {
  it("renders 'VYBE EXPLAIN' title", () => {
    const gameState = createInitialGameState("decorators");
    render(<HeaderBar isLive={true} gameState={gameState} />);
    expect(screen.getByText("VYBE EXPLAIN")).toBeInTheDocument();
  });

  it("LIVE badge uses gold-on-green styling", () => {
    const gameState = createInitialGameState("decorators");
    render(<HeaderBar isLive={true} gameState={gameState} />);
    const badge = screen.getByText("LIVE");
    expect(badge.className).toContain("bg-vybe-poly-green");
    expect(badge.className).toContain("text-vybe-mustang-gold");
  });
});

describe("XPProgressBar — Cal Poly theme classes", () => {
  it("uses gold fill class (bg-vybe-mustang-gold)", () => {
    const { container } = render(<XPProgressBar level={2} xpInLevel={40} />);
    // The fill bar is the inner div inside the track
    const track = container.querySelector(".bg-vybe-poly-green");
    expect(track).not.toBeNull();
    const fill = track?.querySelector(".bg-vybe-mustang-gold");
    expect(fill).not.toBeNull();
  });
});
