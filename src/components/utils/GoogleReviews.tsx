"use client";

import { Box, Typography } from "@mui/material";
import ReviewsCarousel from "./ReviewsCarousel";

export default function GoogleReviews() {
  return (
    <section className=" relative py-8 md:py-24">
      {/* Background Image with Opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center  "
        style={{
          backgroundImage: "url('/images/spices.jpg')",
          opacity: 0.9,
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto  ">
        {/* Section Title */}
        <Box className="text-center mb-8 md:mb-12 text-white">
          <h2 className="text-4xl md:text-5xl font-bold text-white-900">
            What Our <span className="text-orange-500">Customers Say</span>
          </h2>
          {/* <h1 className="text-3xl md:text-4xl lg:text-5xl ">
            What Our Customers Say
          </h1> */}
          <Typography
            variant="h6"
            component="p"
            className="text-lg md:text-xl text-white/90"
          >
            Google Reviews
          </Typography>
        </Box>

        {/* Reviews Carousel Component */}
        <ReviewsCarousel />
      </div>
    </section>
  );
}
