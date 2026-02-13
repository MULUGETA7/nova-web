"use client";
import React, { useState } from "react";
import FAQItem from "./FAQItem";


const FAQSection = ({ showContact = true }) => {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const faqItems = [
    {
      question: "How does the delivery process work?",
      answer:
        "We use a phased approach: Discovery, Design, Engineering, Testing & Handover, adapting to your project's needs.",
    },
    {
      question: "Is there a limit to how many design requests I can have?",
      answer:
        "Deliverables are based on project scope or retainer agreements, not unlimited requests.",
    },
    {
      question: "How fast will I receive my designs?",
      answer:
        " Timelines depend on task complexity; we set clear delivery milestones in our project plan.",
    },
    {
      question: "What if I don't like the design?",
      answer:
        "Our iterative process includes feedback rounds to ensure the design aligns with your vision.",
    },
    {
      question: "Do you make SaaS systems?",
      answer:
        "Yes, we engineer and design scalable SaaS platforms, including advanced Web3/AI systems.",
    },
    {
      question: "What does it mean to pause a subscription?",
      answer:
        "Pausing typically applies to retainer agreements per specific terms; project work follows milestones",
    },
    {
      question: "Why wouldn't I just hire a full-time designer?",
      answer:
        "Get access to our diverse team (Eng, Design, Web3, AI) plus flexibility, often for less than one senior hire's cost",
    },
    {
      question: "Can I get a refund?",
      answer:
        "We ensure value delivery via our process; refunds generally don't apply to work completed per milestones.",
    },
    {
      question: "What makes you unique?",
      answer:
        "Our blend of deep engineering, strategic design, and specialized Web3 & AI expertise.",
    },
  ];

  const avatarImages = [
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=David"
  ];

  const handleToggle = (index) => {
    setExpandedIndex(index === expandedIndex ? -1 : index);
  };

  return (
    <section className="flex flex-col items-center w-full ">
      <div className="flex flex-col items-center px-5 py-12 w-full max-w-[1100px] max-md:px-10 max-sm:px-5">
        <h2 className="mb-3.5 text-3xl font-bold tracking-tighter text-center">
          Frequently Asked Questions
        </h2>
        <p className="mb-12 text-base tracking-tight text-center">
          <span>We Get It—Curiosity Leads to Success!</span>
          <br />
          <span>Got questions? That's a great sign. Here are some</span>
        </p>
        <div className="w-full max-w-[700px]">
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              avatarIndex={index % avatarImages.length}
              isExpanded={index === expandedIndex}
              onClick={() => handleToggle(index)}
            />
          ))}

          {showContact && (
            <div className="flex justify-between items-center mt-10 max-sm:flex-col max-sm:gap-5">
              <h3 className="text-xl tracking-tighter">
                Can't find your answer?
              </h3>
              <button className="flex gap-2 items-center p-5 text-white cursor-pointer bg-neutral-900 rounded-[118px]">
                <span>
                  <svg
                    width="19"
                    height="20"
                    viewBox="0 0 19 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[18px]"
                  >
                    <path
                      d="M16.1142 3.06824C15.9728 2.91901 15.7962 2.81229 15.6026 2.75906C15.4091 2.70584 15.2056 2.70804 15.0131 2.76543H15.0026L1.50682 7.08793C1.28772 7.15458 1.09298 7.28993 0.948409 7.47605C0.803836 7.66217 0.716253 7.89026 0.697267 8.13011C0.678281 8.36996 0.728788 8.61023 0.842095 8.81909C0.955402 9.02795 1.12616 9.19554 1.33174 9.29965L7.30268 12.3693L10.2066 18.6683C10.2969 18.8717 10.4405 19.0437 10.6204 19.1637C10.8003 19.2838 11.009 19.347 11.2219 19.3459C11.2542 19.3459 11.2866 19.3444 11.3189 19.3414C11.546 19.322 11.762 19.2298 11.9379 19.0771C12.1139 18.9244 12.2414 18.7186 12.3033 18.4872L16.3955 4.24164C16.3955 4.23793 16.3955 4.23422 16.3955 4.23051C16.4506 4.02787 16.4535 3.8134 16.4041 3.60913C16.3547 3.40487 16.2546 3.21818 16.1142 3.06824ZM11.2282 18.1473L11.2247 18.1577V18.1525L8.40799 12.0443L11.783 8.48176C11.884 8.3695 11.9395 8.22003 11.9376 8.0652C11.9358 7.91037 11.8767 7.76244 11.7729 7.65296C11.6692 7.54347 11.5291 7.48108 11.3824 7.4791C11.2357 7.47712 11.0941 7.5357 10.9878 7.64234L7.61276 11.2048L1.82393 8.23164H1.81901H1.82885L15.3183 3.9084L11.2282 18.1473Z"
                      fill="white"
                    ></path>
                  </svg>
                </span>
                <span className="text-base tracking-tighter">Send us a Mail</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
