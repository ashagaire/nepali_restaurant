import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { Box } from "@mui/material";
import { GiChiliPepper } from "react-icons/gi";

const SpiceIndicator = ({
  level,
}: {
  level: "NO" | "LOW" | "MEDIUM" | "HIGH";
}) => {
  const filledCount =
    level === "LOW" ? 1 : level === "MEDIUM" ? 2 : level === "HIGH" ? 3 : 0;

  return (
    <Box sx={{ display: "flex", gap: 0.5 }}>
      {[1, 2, 3].map((i) => (
        <GiChiliPepper
          key={i}
          fontSize="1.3rem"
          className={i <= filledCount ? "text-red-500" : "text-gray-300"}
        />
      ))}
    </Box>
  );
};

export default SpiceIndicator;
