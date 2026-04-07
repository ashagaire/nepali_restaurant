"use client";
import { Typography } from "@mui/material";
import ReservationForm from "@/components/forms/ReservationForm";

export default function Reservation() {
  return (
    <section className="py-6 md:py-12 bg-white container mx-auto max-w-7xl  ">
      <div className="mx-auto max-w-2xl p-4">
        <div className="text-center mb-6 md:mb-12">
          <Typography
              variant="h3"
              align="center"
              sx={{ fontWeight: 700, mt:  2, mb: 1, fontSize: { xs: 30, md: 50, lg: 60 } }}
            >
              <span className="block text-transparent leading-tight bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                Reserve Table
              </span>
            </Typography>
          <p className="text-base md:text-lg  text-gray-600">
            Join us for an authentic Nepali dining experience. 
          </p>
        </div>
        {/* Reservation form will go here */}
        <ReservationForm />
      </div>
    </section>
  );
}
