"use client";

import Link from "next/link";
import { useMenuItems } from "@/hooks/menu/useMenuItems";
import { useCategories } from "@/hooks/menu/useCategories";
import { useAdmins } from "@/hooks/useAdmins";
import { quickActions } from "@/data/adminQuickActions";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
  Skeleton,
} from "@mui/material";
import {
  People ,
  AddCircleOutline ,
  Category ,
  TrendingUp ,
  Inventory2 ,
  ArrowForward ,
  AdminPanelSettings,
} from "@mui/icons-material";



export default function AdminPage() {
  const { total: totalMenu, loading: menuLoading } = useMenuItems({ limit: 1 });
  const { data: categories, loading: categoriesLoading } = useCategories();
  const { admins, loading: adminsLoading } = useAdmins();

  const stats = [
    {
      label: "Total Menu Items",
      value: totalMenu,
      loading: menuLoading,
      icon: <Inventory2 />,
      color: "#f97316",
    },
    {
      label: "Total Users",
      value: admins.length,
      loading: adminsLoading,
      icon: <People />,
      color: "#6366f1",
    },
    {
      label: "Categories",
      value: categories.length,
      loading: categoriesLoading,
      icon: <Category />,
      color: "#10b981",
    },
    {
      label: "Active Tags",
      value: "—", // Could add useTags hook if needed
      loading: false,
      icon: <TrendingUp />,
      color: "#ec4899",
    },
  ];

  return (
    <div className=" bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto py-16  md:py-24 xl:py-28   items-center">

          <Container >
            {/* ── Header ── */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "flex-start", sm: "center" }}
              justifyContent="space-between"
              gap={2}
              mb={5}
            >
              <Box>
                <Stack direction="row" alignItems="center" gap={1.5} mb={0.5}>
                  <AdminPanelSettings sx={{ color: "#f97316", fontSize: 32 }} />
                  <Typography
                    variant="h4"
                    fontWeight={800}
                    sx={{
                      background:
                        "linear-gradient(90deg, #f97316 0%, #fb923c 50%, #fbbf24 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      letterSpacing: "-0.5px",
                    }}
                  >
                    Admin Dashboard
                  </Typography>
                </Stack>
                <Typography variant="body2" sx={{ color: "#64748b", ml: 0.5 }}>
                  Welcome back! Here&apos;s an overview of your restaurant operations.
                </Typography>
              </Box>
              <Link href="/admin/menu/new" style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined"
                  startIcon={<AddCircleOutline sx={{ fontSize: 18 }} />}
                  sx={{
                    borderColor: "rgba(249,115,22,0.3)",
                    color: "#f97316",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    height: "full",
                    px: 2,
                    borderRadius: "8px",
                    background: "rgba(249,115,22,0.05)",
                    "&:hover": {
                      background: "rgba(249,115,22,0.1)",
                      borderColor: "#f97316",
                    },
                    textTransform: "none",
                  }}
                >
                  Add Menu Item
                </Button>
              </Link>
            </Stack>

            {/* ── Stat Row ── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <Paper
                    elevation={0}
                    sx={{
                      height: "100%",
                      background: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: 3,
                      p: { xs: 2, md: 3 },
                      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: `0 12px 24px rgba(0,0,0,0.06)`,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: 2,
                        background: `${stat.color}22`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: stat.color,
                        mb: 2,
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography
                      variant="h4"
                      fontWeight={700}
                      sx={{ color: "#1e293b", lineHeight: 1 }}
                    >
                      {stat.loading ? (
                        <Skeleton
                          variant="text"
                          width={40}
                          sx={{ bgcolor: "#f1f5f9" }}
                        />
                      ) : (
                        stat.value
                      )}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "#64748b", mt: 0.5, display: "block", fontWeight: 500 }}
                    >
                      {stat.label}
                    </Typography>
                  </Paper>
                </div>
              ))}
            </div>

            {/* ── Section title ── */}
            <Stack direction="row" alignItems="center" gap={2} mb={3}>
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ color: "#1e293b", letterSpacing: "-0.3px" }}
              >
                Quick Actions
              </Typography>
              <Divider
                sx={{
                  flex: 1,
                  borderColor: "#e2e8f0",
                }}
              />
            </Stack>

            {/* ── Action Cards ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action) => (
                <div key={action.title}>
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      background: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: 4,
                      transition: "transform 0.25s cubic-bezier(.4,0,.2,1), box-shadow 0.25s",
                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                      },
                    }}
                  >
                    <CardActionArea
                      component={Link}
                      href={action.href}
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        p: 0,
                        borderRadius: 4,
                      }}
                    >
                      {/* Gradient banner */}
                      <Box
                        sx={{
                          width: "100%",
                          height: 10,
                          background: action.gradient,
                          borderRadius: "16px 16px 0 0",
                        }}
                      />

                      <CardContent sx={{ width: "100%", p: 3, flex: 1 }}>
                        {/* Icon + chip row */}
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                          mb={2.5}
                        >
                          <Box
                            sx={{
                              width: 60,
                              height: 60,
                              borderRadius: 3,
                              background: action.gradient,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#fff",
                              boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
                            }}
                          >
                            {action.icon}
                          </Box>
                          <Chip
                            label={action.chip}
                            size="small"
                            sx={{
                              background: action.chipColor,
                              color: action.chipTextColor,
                              fontWeight: 700,
                              fontSize: "0.7rem",
                              height: 26,
                              border: `1px solid ${action.chipTextColor}33`,
                            }}
                          />
                        </Stack>

                        {/* Title */}
                        <Typography
                          variant="h6"
                          fontWeight={700}
                          sx={{ color: "#1e293b", mb: 0.75, letterSpacing: "-0.2px" }}
                        >
                          {action.title}
                        </Typography>

                        {/* Description */}
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#64748b",
                            lineHeight: 1.6,
                            mb: 3,
                            minHeight: 56,
                          }}
                        >
                          {action.description}
                        </Typography>

                        {/* CTA row */}
                        <Stack direction="row" alignItems="center" gap={0.5}>
                          <Typography
                            variant="caption"
                            fontWeight={700}
                            sx={{
                              background: action.gradient,
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              letterSpacing: "0.5px",
                              textTransform: "uppercase",
                              fontSize: "0.7rem",
                            }}
                          >
                            {action.chip} now
                          </Typography>
                          <ArrowForward
                            sx={{
                              fontSize: 14,
                              color:
                                action.chipTextColor,
                            }}
                          />
                        </Stack>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
              ))}
            </div>

            
          </Container>
      </div>
    </div>

  );
}
