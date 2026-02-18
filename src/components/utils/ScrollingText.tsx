import { motion } from "framer-motion";

export default function ScrollingText() {
  return (
    <div
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        width: "100%",
      }}
    >
      <motion.div
        style={{
          display: "inline-flex",
        }}
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          repeat: Infinity,
          duration: 30, // slower and smoother
          ease: "linear",
        }}
      >
        {/* First Text */}
        <p className="mr-16">
          Fresh, Flavorful, Different Every Day – Lunch Served 10:30–15:00
        </p>

        {/* Duplicate Text */}
        <p className="mr-16">
          Fresh, Flavorful, Different Every Day – Lunch Served 10:30–15:00
        </p>

        {/* Duplicate Text */}
        <p className="mr-16">
          Fresh, Flavorful, Different Every Day – Lunch Served 10:30–15:00
        </p>
        <p className="mr-16">
          Fresh, Flavorful, Different Every Day – Lunch Served 10:30–15:00
        </p>
        <p className="mr-16">
          Fresh, Flavorful, Different Every Day – Lunch Served 10:30–15:00
        </p>
      </motion.div>
    </div>
  );
}
