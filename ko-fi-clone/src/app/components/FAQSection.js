"use client"; // Add this line at the very top

import { useState } from 'react';

const faqData = [
  { 
    question: 'What is Ko-fi?', 
    answer: 'Ko-fi is a platform that allows creators to receive donations, sell products, and offer memberships to their supporters.' 
  },
  { 
    question: 'How does Ko-fi work?', 
    answer: 'Ko-fi lets fans support their favorite creators by sending tips or buying items. Creators can also set up membership tiers for more consistent support.' 
  },
  { 
    question: 'Does Ko-fi take a fee?', 
    answer: 'Ko-fi offers a free plan with zero platform fees on donations. For advanced features, there is a Ko-fi Gold subscription.' 
  },
  { 
    question: 'Can I use Ko-fi if I’m just starting out?', 
    answer: 'Yes! Ko-fi is great for creators at any stage, whether you’re just beginning or already established.' 
  },
  { 
    question: 'How do I get paid on Ko-fi?', 
    answer: 'Ko-fi connects to PayPal and Stripe, allowing creators to receive funds directly without delays.' 
  },
  { 
    question: 'How is Ko-fi different from Patreon?', 
    answer: 'Unlike Patreon, Ko-fi does not take a percentage of donations on the free plan. Ko-fi is also simpler for fans to make one-time donations.' 
  }
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
              className="border rounded-lg overflow-hidden shadow-lg transition-all duration-300"
            >
              <button 
                className={`w-full text-left text-lg font-semibold py-4 px-6 bg-gradient-to-r from-orange-500 to-yellow-500 text-white flex justify-between items-center transition-all duration-300 ${activeIndex === index ? 'rounded-t-lg' : 'rounded-lg'}`}
                onClick={() => toggleFAQ(index)}
              >
                <span className="hover:text-black">{item.question}</span>
                <span className="text-2xl">{activeIndex === index ? '−' : '+'}</span>
              </button>
              {activeIndex === index && (
                <div className="bg-gray-100 p-6 text-gray-800 text-sm">
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
