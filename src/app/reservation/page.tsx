"use client";
import { Typography } from "@mui/material";
import ReservationForm from "@/components/forms/ReservationForm";

export default function Reservation() {
  return (
    <section className="py-12 bg-white container mx-auto max-w-7xl  ">
      <div className="mx-auto max-w-2xl p-4">
        <div className="text-center mb-12">
          <Typography
              variant="h3"
              align="center"
              sx={{ fontWeight: 700, my:  2, fontSize: { xs: 30, md: 50, lg: 60 } }}
            >
              <span className="block text-transparent leading-tight bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                Reserve a Table
              </span>
            </Typography>
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
