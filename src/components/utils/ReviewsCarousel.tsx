"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import ReviewCard from "./ReviewCard";
import { reviews } from "@/data/reviews";

export default function ReviewsCarousel() {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  };

  const handleDotClick = (index: number) => {
    if (swiper) {
      swiper.slideToLoop(index);
    }
  };

  return (
    <>
      {/* Swiper Carousel */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
          "& .swiper": {
            paddingBottom: "50px",
          },
          "& .swiper-pagination": {
            bottom: "0px !important",
          },
          "& .swiper-pagination-bullet": {
            width: "10px",
            height: "10px",
            backgroundColor: "rgba(255,255,255,0.5)",
            opacity: 1,
            transition: "all 0.3s ease",
            "&.swiper-pagination-bullet-active": {
              width: "24px",
              borderRadius: "5px",
              backgroundColor: "#4285F4",
            },
          },
        }}
      >
        <Swiper
          onSwiper={setSwiper}
          onSlideChange={handleSlideChange}
          modules={[Autoplay, Pagination, EffectCoverflow]}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          slidesPerView={isMobile ? 1 : isTablet ? 1.5 : 1.5}
          spaceBetween={isMobile ? 16 : 24}
          centeredSlides={true}
          pagination={{
            clickable: true,
            renderBullet: (_index: number, className: string) => {
              return `<span class="${className}"></span>`;
            },
          }}
          breakpoints={{
            640: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 2.5,
              spaceBetween: 24,
            },
          }}
          effect="coverflow"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
}
