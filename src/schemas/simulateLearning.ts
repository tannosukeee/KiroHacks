import { createConceptMastery } from "./mastery";
import { updateMasteryState } from "../services/adaptiveEngine";

console.log("=== Starting Simulation ===");

let state = createConceptMastery("loops");

console.log("Initial:", state);

// wrong
state = updateMasteryState({ state, isCorrect: false });
console.log("\nAfter WRONG:", state);

// wrong again
state = updateMasteryState({ state, isCorrect: false });
console.log("\nAfter WRONG again:", state);

// correct (recover)
state = updateMasteryState({ state, isCorrect: true });
console.log("\nAfter CORRECT (recover):", state);

// correct again
state = updateMasteryState({ state, isCorrect: true });
console.log("\nAfter CORRECT again:", state);

console.log("=== End Simulation ===");