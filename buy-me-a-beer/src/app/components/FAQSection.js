"use client"; // Add this line at the very top

import { useState } from "react";

const faqData = [
  {
    question: "What is Buy me a Beer?",
    answer:
      "Buy me a Beer is a platform that allows creators to receive donations, sell products, and offer memberships to their supporters.",
  },
  {
    question: "How does Buy me a Beer work?",
    answer:
      "Buy me a Beer lets fans support their favorite creators by sending tips or buying items. Creators can also set up membership tiers for more consistent support.",
  },
  {
    question: "Does Buy me a Beer take a fee?",
    answer:
      "Buy me a Beer offers a free plan with zero platform fees on donations. For advanced features, there is a Buy me a Beer Gold subscription.",
  },
  {
    question: "Can I use Buy me a Beer if I’m just starting out?",
    answer:
      "Yes! Buy me a Beer is great for creators at any stage, whether you’re just beginning or already established.",
  },
  {
    question: "How do I get paid on Buy me a Beer?",
    answer:
      "Buy me a Beer connects to Solana Blinks, allowing creators to receive funds directly without delays.",
  },
  {
    question: "How is Buy me a Beer different from Patreon?",
    answer:
      "Unlike Patreon, Buy me a Beer does not take a percentage of donations on the free plan. Buy me a Beer is also simpler for fans to make one-time donations.",
  },
];

export default function ContentSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-10 bg-white text-center">
      <div className="separator"></div>
      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto mt-2">
        <h2 className="text-3xl font-bold mb-6">FAQ</h2>
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className=" rounded-lg overflow-hidden transition-all duration-300"
            >
              <button
                className={`w-full text-left text-lg font-semibold py-4 px-6 bg-gradient-to-r from-orange-500 to-yellow-500 text-white flex justify-between items-center hover:text-black hover:scale-95 active:scale-90 transition-all duration-300 ${
                  activeIndex === index ? "rounded-t-lg" : "rounded-lg"
                }`}
                onClick={() => toggleFAQ(index)}
              >
                <span className="hover:text-black">{item.question}</span>
                <span className="text-2xl hover:text-black">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>
              {activeIndex === index && (
                <div className="bg-gray-100 p-6 text-gray-800 hover:scale-95 active:scale-90 transition-all duration-300 text-sm">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
