"use client";

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
    <div className="space-y-3 max-w-sm md:mx-8">
      {days.map((day) => (
        <div key={day} className="flex justify-between text-gray-700 font-bold">
          <span className="font-bold">{day}</span>
          <span>
            {hours[day].open} - {hours[day].close}
          </span>
        </div>
      ))}
    </div>
  );
}
