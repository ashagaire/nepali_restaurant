"use client";

const hours = {
  monday: { open: "11:00", close: "21:00" },
  tuesday: { open: "11:00", close: "21:00" },
  wednesday: { open: "11:00", close: "21:00" },
  thursday: { open: "11:00", close: "21:00" },
  friday: { open: "11:00", close: "22:00" },
  saturday: { open: "12:00", close: "22:00" },
  sunday: { open: "12:00", close: "20:00" },
};

export default function OpeningHours() {
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ] as const;

  return (
    <div className="space-y-3">
      {days.map((day) => (
        <div key={day} className="flex justify-between text-gray-700">
          <span className="font-medium">{day}</span>
          <span>
            {hours[day].open} - {hours[day].close}
          </span>
        </div>
      ))}
    </div>
  );
}
