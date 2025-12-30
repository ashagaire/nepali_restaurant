// components/utils/spiceLevel.ts
import WhatshotIcon from "@mui/icons-material/Whatshot";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import SpaIcon from "@mui/icons-material/Spa";

export const getSpiceConfig = (level: string) => {
  switch (level) {
    case "LOW":
      return { icon: <SpaIcon />, color: "text-green-600", label: "Mild" };
    case "MEDIUM":
      return {
        icon: <WhatshotIcon />,
        color: "text-orange-500",
        label: "Medium",
      };
    case "HIGH":
      return {
        icon: <LocalFireDepartmentIcon />,
        color: "text-red-600",
        label: "Hot",
      };
    default:
      return { icon: <SpaIcon />, color: "text-gray-400", label: "No spice" };
  }
};
