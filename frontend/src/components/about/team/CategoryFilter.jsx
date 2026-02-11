import React from "react";

const CategoryFilter = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <nav className="flex gap-2 mb-12 max-sm:flex-wrap">
      {categories.map((category) => (
        <button
          key={category}
          className={`px-4 py-1 text-lg text-gray-200 rounded-3xl  relative ${
            selectedCategory === category 
              ? "bg-gradient-to-b from-[#FF1CF7] to-[#00F0FF]" 
              : "border-[1px] border-transparent"
          }`}
          style={{ 
            background: selectedCategory === category 
              ? 'linear-gradient(to bottom, #FF1CF7, #00F0FF)'
              : 'linear-gradient(#0a131a, #0a131a) padding-box, linear-gradient(to bottom, #FF1CF7, #00F0FF) border-box'
          }}
          onClick={() => onCategorySelect(category)}
          aria-pressed={selectedCategory === category}
        >
          {category}
        </button>
      ))}
    </nav>
  );
};

export default CategoryFilter;
