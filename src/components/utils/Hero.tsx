"use client";
import styles from "@/styles/Hero.module.css"; // Import the external CSS module
import { Button, Typography } from "@mui/material";
import Link from "next/link";

export default function Hero() {
  return (
    <section className=" container mx-auto max-w-7xl  ">
      {/* <Typography
        variant="h2"
        align="center"
        sx={{
          py: 4,
          color: "primary.main",
        }}
      >
        Fusion Nepal Ravintola
      </Typography> */}
      {/* <h2 className=" py-4 text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-orange-900 sm:mb-4 text-center ">
        Fusion Nepal Ravintola
      </h2> */}
      {/* takes full width of the screen */}
      <div className="">
        <div className="text-center relative bg-cover bg-center h-[40vh] md:h-[30vh] lg:h-[30vh] xl:h-[50vh] flex justify-center items-center ">
          <div
            className="absolute inset-0 bg-cover bg-center "
            style={{
              backgroundImage: "url('/images/spicesaroundbg.jpg')",
              opacity: 1, // Apply opacity only to the background
            }}
          >
            {/* Top Gradient Fade */}
            <div className="absolute inset-x-0 top-0 h-24 z-[5] pointer-events-none bg-gradient-to-b from-white/100 via-white/40  to-transparent   "></div>
            
            {/* Bottom Gradient Fade */}
            <div className="absolute inset-x-0 bottom-0 h-16 z-[5] pointer-events-none bg-gradient-to-t from-white/100 via-white/50  to-transparent   "></div>
          </div>
          <div className="absolute  flex flex-col items-center justify-center text-white px-4">
            <Typography
              variant="h2"
              align="center"
              sx={{
                py: 4,
                color: "primary.main",
              }}
            >
              Fusion Nepal Ravintola
            </Typography>
            <Typography
              variant="h3"
              align="center"
              sx={{ fontWeight: 700, color: "orange.900", mb: 2 }}
            >
              Experience Authentic Flavor
            </Typography>

            <Typography
              variant="body1"
              align="center"
              sx={{ color: "gray.600", mb: 2 }}
            >
              Exceed your expectations with our flavorful dishes and exceptional
              customer service.
            </Typography>
            {/* <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-orange-900 sm:mb-4">
              Experience Authentic Flavor
            </h2>
            <p className="text-sm sm:text-sm md:text-lg text-gray-600 sm:mb-4 text-center ">
              Exceed your expectations with our flavorful dishes and exceptional
              customer service.
            </p> */}
            <div className="flex mt-4  gap-2 md:gap-4">
              <Button
                component={Link}
                href="/lunch"
                variant="contained"
                color="primary"
                size="small"
                // className="hero-button"
              >
                Lunch
              </Button>
              <Button
                component={Link}
                href="/menu"
                variant="contained"
                color="primary"
                size="small"
                // className="hero-button"
              >
                Order
              </Button>
              <Button
                component={Link}
                href="/alacarte"
                variant="contained"
                color="primary"
                size="small"
                // className="hero-button"
              >
                Alacarte
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
