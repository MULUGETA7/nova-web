import React from "react";
import "./TaskSection.css";

function TaskSection() {
  return (
    <div className="flex flex-col items-center px-0 pt-16 pb-20 mt-32 w-full rounded-xl bg-[linear-gradient(180deg,#212121_0%,#1C1B1B_48.72%)]">
      <p className="mb-12 text-base tracking-tight leading-5 text-center text-white">
        Trust us we are good at this :)
      </p>
      <div className="marquee">
        <div className="track">
          <div className="content">
            <PendingTasks />
            <ProcessingIndicator />
            <CompletedTasks />
          </div>
          <div className="content">
            <PendingTasks />
            <ProcessingIndicator />
            <CompletedTasks />
          </div>
        </div>
      </div>
    </div>
  );
}

function PendingTasks() {
  const pendingTasks = [
    "web Development",
    "Redesign Your Site",
    "Get Your Saas Alive",
    "Branding",
    "New Marketing Strategy",
  ];

  return (
    <div className="flex gap-2.5 items-center">
      {pendingTasks.map((task, index) => (
        <div
          key={index}
          className="flex gap-1.5 items-center px-3 py-2 border-[dashedpx] border-white border-opacity-20 rounded-[35px]"
        >
          <div
            className={`w-4 h-4 ${index === 0 ? "" : "border border-white border-opacity-20"} rounded-[329px]`}
          />
          <div className="text-xs font-medium tracking-tight leading-4 text-center text-white">
            {task}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProcessingIndicator() {
  return (
    <div className="px-20 py-6 text-base tracking-tight leading-6 text-center text-white bg-zinc-800">
      Nova is Here
    </div>
  );
}

function CompletedTasks() {
  const completedTasks = [

    "web Development",
    "Redesign Your Site",
    "Get Your Saas Alive",
    "Ai System",
  ];

  return (
    <div className="flex gap-2.5 items-center">
      {completedTasks.map((task, index) => (
        <div
          key={index}
          className="flex gap-2 items-center px-3 py-2 bg-white bg-opacity-10 rounded-[35px]"
        >
          <CheckIcon />
          <div className="text-xs font-medium tracking-tight leading-4 text-center text-white">
            {task}
          </div>
        </div>
      ))}
    </div>
  );
}

function CheckIcon() {
  return (
    <div>
      <svg
        width="17"
        height="15"
        viewBox="0 0 17 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[16px] h-[15px]"
      >
        <path
          d="M14.6548 4.4377L6.65481 11.4377C6.60837 11.4784 6.55323 11.5107 6.49253 11.5327C6.43183 11.5547 6.36677 11.566 6.30106 11.566C6.23535 11.566 6.17029 11.5547 6.10959 11.5327C6.04889 11.5107 5.99375 11.4784 5.94731 11.4377L2.44731 8.3752C2.35349 8.29311 2.30078 8.18177 2.30078 8.06567C2.30078 7.94958 2.35349 7.83823 2.44731 7.75614C2.54113 7.67405 2.66838 7.62793 2.80106 7.62793C2.93374 7.62793 3.06099 7.67405 3.15481 7.75614L6.30106 10.5097L13.9473 3.81864C14.0411 3.73655 14.1684 3.69043 14.3011 3.69043C14.4337 3.69043 14.561 3.73655 14.6548 3.81864C14.7486 3.90073 14.8013 4.01208 14.8013 4.12817C14.8013 4.24427 14.7486 4.35561 14.6548 4.4377Z"
          fill="white"
        />
      </svg>
    </div>
  );
}

export default TaskSection;
