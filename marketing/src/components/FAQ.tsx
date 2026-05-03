import { useState } from 'react';
import AnimateIn from './AnimateIn';

const faqs = [
  {
    q: 'Is this just another AI chatbot in a sidebar?',
    a: 'No. Vybe Tutor is a teaching tool, not a code generator. It explains your code, tests your understanding with quizzes, and adapts to your skill level. Think of it as a tutor that lives in your editor.',
  },
  {
    q: 'Will my professor know if I use it?',
    a: 'Only if you tell them. Vybe runs locally and doesn\u2019t report usage to anyone. Your progress, streaks, and mastery data stay on your machine.',
  },
  {
    q: 'What languages are supported?',
    a: 'Python, JavaScript, Java, and C++ are fully supported at launch. We\u2019re adding TypeScript, Go, and Rust based on student demand.',
  },
  {
    q: 'How does adaptive difficulty work?',
    a: 'Vybe tracks your quiz performance locally and adjusts question difficulty automatically. Get several right in a row? Questions get harder. Struggling? Vybe offers hints and easier questions to build your confidence back up.',
  },
  {
    q: 'Does my code get sent anywhere?',
    a: 'Only the code you select for explanation is sent to Gemini for analysis. Your full codebase, files, and progress data stay on your machine. Vybe is local-first by design.',
  },
  {
    q: 'What happens to my streak if I skip a day?',
    a: 'Your streak resets, but your XP and level never go down. Streaks are meant to encourage daily practice, not punish you. Jump back in anytime.',
  },
  {
    q: 'Will Vybe write code for me?',
    a: 'No. Vybe Tutor is designed to help you understand code, not write it for you. It explains what code does, why it works, and quizzes you on the concepts. You write the code \u2014 Vybe makes sure you learn from it.',
  },
  {
    q: 'Is it really free for students?',
    a: 'Yes. The student tier is completely free for anyone with a .edu email. Cal Poly funds the student tier. Pro and team plans cover the cost of the AI for everyone else.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 md:py-28 bg-cream">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateIn>
          <div className="text-center mb-14">
            <p className="text-gold-500 font-mono text-sm tracking-wide uppercase mb-3">
              FAQ
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-green-900 mb-3 font-bold">
              Questions students ask us.
            </h2>
          </div>
        </AnimateIn>

        <AnimateIn delay={100}>
          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={i} className="bg-white rounded-xl border border-green-900/5 overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left group"
                    aria-expanded={isOpen}
                  >
                    <span className="text-green-900 font-semibold pr-4 group-hover:text-green-700 transition-colors">
                      {faq.q}
                    </span>
                    <span className={`text-green-700 text-xl font-light shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}>
                      +
                    </span>
                  </button>
                  <div className="faq-answer" data-open={isOpen}>
                    <div>
                      <p className="text-gray-500 text-sm leading-relaxed px-5 pb-5">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
