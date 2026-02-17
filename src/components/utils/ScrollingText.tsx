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
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 12, // slower and smoother
          ease: "linear",
        }}
      >
        {/* First Text */}
        <h2 className="mr-16">
          Fresh, Flavorful, Different Every Day – Lunch Served 10:30–15:00
        </h2>

        {/* Duplicate Text */}
        <h2 className="mr-16">
          Fresh, Flavorful, Different Every Day – Lunch Served 10:30–15:00
        </h2>
      </motion.div>
    </div>
  );
}
