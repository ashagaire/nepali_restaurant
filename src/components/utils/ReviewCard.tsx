"use client";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Star } from "@mui/icons-material";
import Image from "next/image";
import { reviews } from "@/data/reviews";

interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  text: string;
  avatar?: string;
}

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: isMobile ? "100%" : isTablet ? "400px" : "400px",
        margin: "0 auto",
        // Floating glass effect
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(8px)",
        borderRadius: "24px", // More rounded for modern look
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
        overflow: "visible", // Allows elements to "float"
        // transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        // "&:hover": {
        //   transform: "translateY(-10px) scale(1.02) translateZ(0)",
        //   boxShadow: "0 20px 60px rgba(255, 140, 0, 0.15)", // Light orange glow
        // },
        // backgroundColor: "white",
        // borderRadius: 3,
        // boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
        },
      }}
    >
      <CardContent className="p-4 relative">
        {/* Review Header */}
        {/* Floating Google Logo - Top Right */}
        

        {/* Header Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              bgcolor: "#FFB347", // Your Light Orange
              fontWeight: 700,
              fontSize: "1.4rem",
              boxShadow: "0 4px 10px rgba(255, 179, 71, 0.4)"
            }}
          >
            {review.name.charAt(0)}
          </Avatar>
          <Box className="flex flex-col items-start gap-1">
            <Typography variant="h6" sx={{ fontWeight: 800, fontSize: "1.1rem", color: "#222" }}>
              {review.name}
            </Typography>
            <Rating
              value={review.rating}
              readOnly
              size="small"
              icon={<Star sx={{ color: "#FF8C00", fontSize: "1rem" }} />} // Themed stars
            />
            <Typography
                variant="caption"
                className="text-gray-600 ml-1"
                sx={{ fontSize: "0.75rem" }}
              >
                {review.date}
              </Typography>
          </Box>
        </Box>

        {/* Cleaner Typography Scale */}
        <Typography
          variant="body1"
          sx={{
            color: "#444",
            fontStyle: "italic",
            lineHeight: 1.8,
            fontSize: "0.95rem",
            position: "relative",
            "&::before": {
              content: '"\\201C"',
              position: "absolute",
              top: -20,
              left: -10,
              fontSize: "4rem",
              color: "rgba(255, 140, 0, 0.1)", // Subtle orange quote
              fontFamily: "serif"
            }
          }}
        >
          {review.text}
        </Typography>
        <Box className="flex justify-end items-center justify-end">
          <Box className="flex items-center justify-end"
            sx={{ 
              
              
              bg: "white", 
              p: 1, 
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              
              gap: 0.5
            }}
          >
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
              alt="Google"
              width={16}
              height={16}
            />
            <Typography sx={{ fontSize: "10px", fontWeight: 500, color: "#777" }}>
              Google
            </Typography>
          </Box>
        </Box>

        
       
      </CardContent>
    </Card>
  );
}
