"use client";

import ReservationForm from "@/components/forms/ReservationForm";

export default function Reservation() {
  return (
    <section className="py-12 bg-white container mx-auto max-w-7xl p-4 ">
      <div className="py-12 bg-whitecontainer mx-auto max-w-2xl p-4">
        <div className="text-center mb-12">
          <h1 className=" text-2xl font-bold mb-4">Reserve a Table</h1>
          <p className="text-lg text-gray-600">
            Book your table for an authentic Nepali dining experience
          </p>
        </div>
        {/* Reservation form will go here */}
        <ReservationForm />
      </div>
    </section>
  );
}
