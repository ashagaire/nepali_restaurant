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
        backgroundColor: "white",
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
        },
      }}
    >
      <CardContent className="p-4 md:p-6">
        {/* Review Header */}
        <Box className="flex items-center gap-3 mb-3">
          <Avatar
            sx={{
              width: 48,
              height: 48,
              bgcolor: "#4285F4",
              fontSize: "1.2rem",
            }}
          >
            {review.name.charAt(0)}
          </Avatar>
          <Box className="flex-1 min-w-0">
            <Typography
              variant="subtitle1"
              className="font-semibold text-gray-900"
              sx={{
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              {review.name}
            </Typography>
            <Box className="flex items-center gap-1">
              <Rating
                value={review.rating}
                readOnly
                size="small"
                icon={
                  <Star
                    sx={{
                      color: "#FFC107",
                      fontSize: "1.2rem",
                    }}
                  />
                }
                emptyIcon={
                  <Star
                    sx={{
                      color: "#E0E0E0",
                      fontSize: "1.2rem",
                    }}
                  />
                }
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
        </Box>

        {/* Review Text */}
        <Typography
          variant="body2"
          className="text-gray-700 leading-relaxed"
          sx={{
            fontSize: "0.9rem",
            lineHeight: 1.6,
            display: "-webkit-box",
            WebkitLineClamp: 6,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {review.text}
        </Typography>

        {/* Google Logo Badge */}
        <Box className="mt-4 flex items-center justify-end">
          <Box
            className="flex items-center gap-1"
            sx={{
              opacity: 0.7,
            }}
          >
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
              alt="Google Logo"
              width={20}
              height={20}
            />
            <Typography
              variant="caption"
              className="text-gray-600"
              sx={{
                fontSize: "0.7rem",
                fontWeight: 500,
              }}
            >
              Google
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
