import React from "react";

function SectionHeader({ title, subtitle }) {
  return (
    <header className="flex flex-col gap-3.5 items-center text-center">
      <h2 className="text-4xl font-bold tracking-tighter leading-10 text-white">
        {title}
      </h2>
      <p className="flex flex-col items-center text-base tracking-tight leading-5 text-white">
        {Array.isArray(subtitle) ? (
          subtitle.map((line, index) => <span key={index}>{line}</span>)
        ) : (
          <span>{subtitle}</span>
        )}
      </p>
    </header>
  );
}

export default SectionHeader;
