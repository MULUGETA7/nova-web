"use client";
import React, { useState, useEffect } from "react";

function GlobalTimeFooter() {
  const [times, setTimes] = useState({
    newYork: "",
    dubai: "",
    addisAbaba: "",
    london: "",
  });

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();

      // New York (UTC-5)
      const newYorkTime = new Date(
        now.toLocaleString("en-US", { timeZone: "America/New_York" }),
      );

      // Dubai (UTC+4)
      const dubaiTime = new Date(
        now.toLocaleString("en-US", { timeZone: "Asia/Dubai" }),
      );

      // addisAbaba (UTC+3)
      const addisAbabaTime = new Date(
        now.toLocaleString("en-US", { timeZone: "Africa/Addis_Ababa" }),
      );

      // London (UTC+0/+1)
      const londonTime = new Date(
        now.toLocaleString("en-US", { timeZone: "Europe/London" }),
      );

      setTimes({
        newYork: formatTime(newYorkTime),
        dubai: formatTime(dubaiTime),
        addisAbaba: formatTime(addisAbabaTime),
        london: formatTime(londonTime),
      });
    };

    // Format time to HH:MM:SS AM/PM
    const formatTime = (date) => {
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="flex flex-wrap gap-2.5 justify-between items-center py-2.5 w-full text-xs border-t border-neutral-800 border-opacity-10 text-white text-opacity-40">
      <div className="flex gap-2.5 items-center">
        <time>{times.newYork}</time>
        <span>New York, USA</span>
      </div>
      <div className="flex gap-2.5 items-center">
        <time>{times.dubai}</time>
        <span>Dubai, UAE</span>
      </div>
      <p className="text-sm text-black">Best time to get your website online</p>
      <div className="flex gap-2.5 items-center">
        <time>{times.addisAbaba}</time>
        <span>Addis Ababa, Ethiopia</span>
      </div>
      <div className="flex gap-2.5 items-center">
        <time>{times.london}</time>
        <span>London, UK</span>
      </div>
    </footer>
  );
}

export default GlobalTimeFooter;
