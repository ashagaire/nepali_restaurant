"use client";

import { Box, Typography } from "@mui/material";
import ReviewsCarousel from "./ReviewsCarousel";

export default function GoogleReviews() {
  return (
    <section className="relative py-16 md:py-24">
      {/* Background Image with Opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('/images/banner1.jpg')",
          opacity: 0.7,
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 ">
        {/* Section Title */}
        <Box className="text-center mb-8 md:mb-12 text-white">
          <Typography
            variant="h3"
            component="h2"
            className="text-3xl md:text-4xl lg:text-5xl "
            sx={{
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            What Our Customers Say
          </Typography>
          <Typography
            variant="h6"
            component="p"
            className="text-lg md:text-xl text-white/90"
            sx={{
              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
            }}
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
