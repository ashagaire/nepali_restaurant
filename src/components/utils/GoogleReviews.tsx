"use client";

import { Box, Typography } from "@mui/material";
import ReviewsCarousel from "./ReviewsCarousel";

export default function GoogleReviews() {
  return (
    <section className=" relative py-8 md:py-24">
      {/* Background Image with Opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('/images/spices.jpg')",
          opacity: 0.7,
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto  ">
        {/* Section Title */}
        <Box className="text-center mb-8 md:mb-12 text-white">
          <h1 className="text-3xl md:text-4xl lg:text-5xl ">
            What Our Customers Say
          </h1>
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
