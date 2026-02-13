import React from 'react';

const TechStack = () => {
  const techGroups = [
    {
      text: "INDIVIDUALLY WE BUILD,",
      items: [
        { name: "Super Apps & Systems", color: "bg-[#00F0FF]", textColor: "text-black" },
        { name: "AI Agents", color: "bg-[#FF1CF7]", textColor: "text-white" },
      ]
    },
    {
      text: "TOGETHER WE INNOVATE.",
      items: [
        { name: "Automation Platforms", color: "bg-[#00F0FF]", textColor: "text-black" },
        { name: "Blockchain", color: "bg-[#FF1CF7]", textColor: "text-white" },
      ]
    },
    {
      items: [
        { name: "Advanced Web Development", color: "bg-[#00F0FF]", textColor: "text-black" },
      ],
      connector: ", using"
    },
    {
      items: [
        { name: "Latest Tools", color: "bg-[#FF1CF7]", textColor: "text-white" },
        { name: "Modern", color: "bg-[#00F0FF]", textColor: "text-black" },
        { name: "Frameworks", color: "bg-[#FF1CF7]", textColor: "text-white" },
      ]
    },
    {
      items: [
        { name: "Design", color: "bg-[#00F0FF]", textColor: "text-black" },
        { name: "Smart Infrastructure", color: "bg-[#FF1CF7]", textColor: "text-white" },
      ],
      connector: "."
    }
  ];

  return (
    <div className="flex flex-wrap gap-4 items-center justify-center p-12 py-24 min-h-[400px] bg-black">
      {techGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="flex flex-wrap gap-4 items-center justify-center">
          {group.text && (
            <span className="text-white text-4xl font-black tracking-tighter uppercase whitespace-nowrap">
              {group.text}
            </span>
          )}
          {group.items.map((item, itemIndex) => (
            <span
              key={itemIndex}
              className={`${item.color} px-8 py-4 rounded-lg ${item.textColor} text-4xl font-normal whitespace-nowrap shadow-2xl shadow-cyan-500/5`}
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