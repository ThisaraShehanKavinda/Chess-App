// src/components/AnimatedBoard.js
import { motion } from "framer-motion";
import React from "react";

const AnimatedBoard = ({ children }) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedBoard;
