"use client";

import { useEffect, useState } from "react";

const hours = {
  Monday: { open: "11:00", close: "21:00" },
  Tuesday: { open: "11:00", close: "21:00" },
  Wednesday: { open: "11:00", close: "21:00" },
  Thursday: { open: "11:00", close: "21:00" },
  Friday: { open: "11:00", close: "22:00" },
  Saturday: { open: "12:00", close: "22:00" },
  Sunday: { open: "12:00", close: "20:00" },
};

export default function OpeningHours() {
  const [currentDay, setCurrentDay] = useState("");

  useEffect(() => {
    setCurrentDay(new Date().toLocaleDateString("en-US", { weekday: "long" }));
  }, []);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ] as const;

  return (
    <div className="space-y-0.5 max-w-sm  ">
      {days.map((day) => (
        <div
          key={day}
          className={`flex justify-between mx-8 md:mx-0 rounded-lg px-4 py-1 text-gray-700 font-bold ${currentDay === day ? "bg-orange-300" : ""}`}
        >
          <span className=" font-bold">{day}</span>
          <span className="justify-end">
            {hours[day].open} - {hours[day].close}
          </span>
        </div>
      ))}
    </div>
  );
}
