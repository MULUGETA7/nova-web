import React from 'react';

const TechStack = () => {
  const techGroups = [
    {
      text: "We work in",
      items: [
        { name: "Super Apps & Systems", color: "bg-[#00F0FF]", textColor: "text-white" },
        { name: "AI Agents", color: "bg-[#ff1cf7]", textColor: "text-[#E1E1A8]" },
      ]
    },
    {
      items: [
        { name: "AR / VR Development", color: "bg-gradient-to-r from-[#06878f] to-[#ff1cf7]", textColor: "text-[#E1E1A8]" },
        { name: "Artificial Intelligence", color: "bg-[#00F0FF]", textColor: "text-white" },
      ]
    },
    {
      items: [
        { name: "Web Development", color: "bg-[#ff1cf7]", textColor: "text-[#E1E1A8]" },
      ],
      connector: ", using"
    },
    {
      items: [
        { name: "Latest Tools", color: "bg-gradient-to-r from-[#06878f] to-[#ff1cf7]", textColor: "text-[#E1E1A8]" },
        { name: "Modern", color: "bg-[#06878f]", textColor: "text-[#E1E1A8]" },
        { name: "Frameworks", color: "bg-[#ff1cf7]", textColor: "text-[#E1E1A8]" },
      ]
    },
    {
      items: [
        { name: "Design", color: "bg-gradient-to-r from-[#06878f] to-[#ff1cf7]", textColor: "text-[#E1E1A8]" },
        { name: "Smart Tech", color: "bg-[#00F0FF]", textColor: "text-white" },
      ],
      connector: "and Starting"
    },
    {
      items: [
        { name: "R&D", color: "bg-gradient-to-r from-[#06878f] to-[#ff1cf7]", textColor: "text-[#E1E1A8]" },
        { name: "Blookchain", color: "bg-gradient-to-r from-[#06878f] to-[#ff1cf7]", textColor: "text-[#E1E1A8]" },
      ],
      connector: "."
    }
  ];

  return (
    <div className="flex flex-wrap gap-3 items-center justify-center p-8 min-h-[400px]">
      {techGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="flex flex-wrap gap-3 items-center">
          {group.text && (
            <span className="text-white text-4xl font-normal">
              {group.text}
            </span>
          )}
          {group.items.map((item, itemIndex) => (
            <span
              key={itemIndex}
              className={`${item.color} px-6 py-3 rounded-lg ${item.textColor || 'text-[#E1E1A8]'} text-4xl font-normal`}
            >
              {item.name}
            </span>
          ))}
          {group.connector && (
            <span className="text-white text-4xl font-normal">
              {group.connector}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default TechStack; 