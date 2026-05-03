export interface MockQuestion {
  concept: string;
  difficulty: number;
  question: string;
  choices: string[];
  correctAnswerIndex: number;
  hint: string;
  explanation: string;
}

const mockQuestions: MockQuestion[] = [
  // async/await - difficulty 1
  {
    concept: 'async/await',
    difficulty: 1,
    question: 'What keyword marks a function as asynchronous?',
    choices: ['await', 'async', 'promise', 'defer'],
    correctAnswerIndex: 1,
    hint: 'It goes before the function keyword.',
    explanation: 'The async keyword before a function declaration marks it as asynchronous, meaning it will always return a Promise.',
  },
  {
    concept: 'async/await',
    difficulty: 2,
    question: 'What does an async function always return?',
    choices: ['undefined', 'A callback function', 'A Promise', 'The raw value directly'],
    correctAnswerIndex: 2,
    hint: 'Even if you return a plain value, the runtime wraps it automatically.',
    explanation: 'An async function always returns a Promise. If you return a value, it gets wrapped in Promise.resolve() automatically.',
  },
  {
    concept: 'async/await',
    difficulty: 3,
    question: 'What happens if you forget to await a Promise inside an async function?',
    choices: [
      'The code throws a syntax error',
      'The Promise runs but the result is not captured in time',
      'The function returns undefined',
      'The Promise is automatically cancelled',
    ],
    correctAnswerIndex: 1,
    hint: 'The Promise still executes, but your variable holds the Promise object, not its resolved value.',
    explanation: 'Without await, the Promise runs in the background but your code continues without waiting for the result, leading to timing issues.',
  },
  {
    concept: 'async/await',
    difficulty: 4,
    question: 'How do you handle errors from multiple concurrent awaited Promises?',
    choices: [
      'Use a single try/catch around Promise.all()',
      'Each await needs its own try/catch',
      'Errors are automatically ignored in async functions',
      'Use .finally() on each Promise',
    ],
    correctAnswerIndex: 0,
    hint: 'There is a method that runs Promises concurrently and rejects if any one fails.',
    explanation: 'Promise.all() rejects as soon as any Promise rejects, so a single try/catch around it handles errors from all concurrent operations.',
  },
  {
    concept: 'async/await',
    difficulty: 5,
    question: 'What is the difference between Promise.all() and Promise.allSettled()?',
    choices: [
      'Promise.all() is faster',
      'Promise.allSettled() waits for all to finish regardless of rejection',
      'Promise.all() runs sequentially while allSettled() runs in parallel',
      'There is no difference',
    ],
    correctAnswerIndex: 1,
    hint: 'Think about what happens when one Promise rejects.',
    explanation: 'Promise.all() short-circuits on the first rejection. Promise.allSettled() waits for every Promise to either resolve or reject, giving you the status of each.',
  },

  // caching/memoization - difficulty 1
  {
    concept: 'caching/memoization',
    difficulty: 1,
    question: 'What is the main purpose of caching?',
    choices: [
      'To make code more readable',
      'To store results for reuse instead of recomputing',
      'To reduce file size',
      'To add type safety',
    ],
    correctAnswerIndex: 1,
    hint: 'Think about what "caching" means — storing something for later reuse.',
    explanation: 'Caching stores previously computed results so they can be returned quickly when the same input appears again.',
  },
  {
    concept: 'caching/memoization',
    difficulty: 2,
    question: 'What does @cache do when the same arguments are passed again?',
    choices: [
      'Raises a TypeError',
      'Returns the cached result without recomputing',
      'Deletes the previous result',
      'Calls the function twice for verification',
    ],
    correctAnswerIndex: 1,
    hint: 'The decorator remembers what it already computed.',
    explanation: '@cache stores previously computed results. When the same input appears again, it skips the function body and returns the stored value.',
  },
  {
    concept: 'caching/memoization',
    difficulty: 3,
    question: 'Which type of function benefits most from memoization?',
    choices: [
      'Functions with side effects',
      'Pure functions with expensive computation',
      'Functions that modify global state',
      'Functions that always return different values',
    ],
    correctAnswerIndex: 1,
    hint: 'Memoization assumes the same inputs always produce the same output.',
    explanation: 'Pure functions (same input, same output) with expensive computation benefit most because the cached result is guaranteed to be correct.',
  },
  {
    concept: 'caching/memoization',
    difficulty: 4,
    question: 'What is a potential downside of aggressive memoization?',
    choices: [
      'It makes code run slower',
      'It increases memory usage by storing all results',
      'It prevents garbage collection entirely',
      'It causes race conditions',
    ],
    correctAnswerIndex: 1,
    hint: 'Every cached result takes up space somewhere.',
    explanation: 'Memoization trades memory for speed. If a function is called with many unique inputs, the cache can grow unbounded and consume significant memory.',
  },
  {
    concept: 'caching/memoization',
    difficulty: 5,
    question: 'When should you use an LRU cache instead of unlimited memoization?',
    choices: [
      'When the function is called rarely',
      'When the input space is large and memory is limited',
      'When the function has no parameters',
      'When you need the cache to persist across restarts',
    ],
    correctAnswerIndex: 1,
    hint: 'LRU stands for Least Recently Used — it evicts old entries.',
    explanation: 'An LRU cache limits memory by evicting the least recently used entries. This is ideal when the input space is large but recent inputs are more likely to recur.',
  },

  // code structure - difficulty 1
  {
    concept: 'code structure',
    difficulty: 1,
    question: 'Why is it helpful to understand code structure before modifying it?',
    choices: [
      'It makes the code run faster',
      'It helps you reason about program flow and catch bugs',
      'It is required by the compiler',
      'It automatically fixes syntax errors',
    ],
    correctAnswerIndex: 1,
    hint: "Think about what happens when you change code you don't fully understand.",
    explanation: 'Understanding structure helps you predict how changes will affect behavior, making it easier to find and prevent bugs.',
  },
  {
    concept: 'code structure',
    difficulty: 2,
    question: 'What is the benefit of separating code into small functions?',
    choices: [
      'It always makes code faster',
      'Each function can be understood, tested, and reused independently',
      'It reduces the total number of lines',
      'It prevents all runtime errors',
    ],
    correctAnswerIndex: 1,
    hint: 'Think about readability, testing, and reuse.',
    explanation: 'Small functions with clear responsibilities are easier to understand, test in isolation, and reuse across the codebase.',
  },
  {
    concept: 'code structure',
    difficulty: 3,
    question: 'What does "separation of concerns" mean in code design?',
    choices: [
      'Each file should be as short as possible',
      'Different responsibilities should be handled by different modules',
      'All related code must be in one file',
      'Concerns are comments explaining the code',
    ],
    correctAnswerIndex: 1,
    hint: 'Think about keeping unrelated logic apart.',
    explanation: 'Separation of concerns means organizing code so each module handles one responsibility, making the system easier to change and reason about.',
  },
  {
    concept: 'code structure',
    difficulty: 4,
    question: 'What is a common sign that a function has too many responsibilities?',
    choices: [
      'It has more than 5 parameters or does unrelated things',
      'It uses a loop',
      'It returns a value',
      'It calls other functions',
    ],
    correctAnswerIndex: 0,
    hint: 'Think about what makes a function hard to name or test.',
    explanation: 'Many parameters or mixing unrelated logic are signs a function does too much. If you struggle to name it clearly, it likely needs splitting.',
  },
  {
    concept: 'code structure',
    difficulty: 5,
    question: 'How does the dependency inversion principle improve code structure?',
    choices: [
      'It removes all dependencies',
      'High-level modules depend on abstractions, not concrete implementations',
      'It inverts the order of function calls',
      'It makes all functions pure',
    ],
    correctAnswerIndex: 1,
    hint: 'Think about depending on interfaces rather than specific classes.',
    explanation: 'Dependency inversion means high-level logic depends on abstractions (interfaces), not low-level details. This makes code more flexible and testable.',
  },
];

export function getQuestionsByConceptAndDifficulty(
  concept: string,
  difficulty: number
): MockQuestion[] {
  return mockQuestions.filter(
    (q) => q.concept === concept && q.difficulty === difficulty
  );
}

export function getQuestionByConcept(concept: string): MockQuestion[] {
  return mockQuestions.filter((q) => q.concept === concept);
}

export function getNextQuestion(
  concept: string,
  difficulty: number,
  excludeQuestion?: string
): MockQuestion | null {
  // Try to find a question at the requested difficulty
  let candidates = mockQuestions.filter(
    (q) => q.concept === concept && q.difficulty === difficulty && q.question !== excludeQuestion
  );

  // If no questions at exact difficulty, try adjacent difficulties
  if (candidates.length === 0) {
    candidates = mockQuestions.filter(
      (q) => q.concept === concept && Math.abs(q.difficulty - difficulty) <= 1 && q.question !== excludeQuestion
    );
  }

  // If still nothing, get any question from the concept
  if (candidates.length === 0) {
    candidates = mockQuestions.filter(
      (q) => q.concept === concept && q.question !== excludeQuestion
    );
  }

  if (candidates.length === 0) return null;

  // Pick a random question from candidates
  const index = Math.floor(Math.random() * candidates.length);
  return candidates[index];
}

export function getAllConcepts(): string[] {
  return [...new Set(mockQuestions.map((q) => q.concept))];
}
