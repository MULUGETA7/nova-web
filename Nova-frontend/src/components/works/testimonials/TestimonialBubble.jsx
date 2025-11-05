import React from "react";

function TestimonialBubble({ text, author, position }) {
  return (
    <div className={`absolute p-3 rounded-3xl bg-neutral-100 ${position}`}>
      <p className="mb-2.5 text-xs leading-6 text-black text-opacity-50">{text}</p>
      <p className="text-xs leading-4 text-black text-opacity-30">{author}</p>
    </div>
  );
}

export default TestimonialBubble;
