// src/components/LoadingSpinner.jsx

import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

function LoadingSpinner({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">

      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Loader2
          size={55}
          className="text-blue-600"
        />
      </motion.div>

      <h2 className="mt-6 text-xl font-semibold text-gray-700">
        {text}
      </h2>

      <p className="text-gray-500 mt-2">
        Waypoint AI is processing your request...
      </p>

      <div className="w-64 h-2 bg-gray-200 rounded-full mt-6 overflow-hidden">

        <motion.div
          className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "linear",
          }}
        />

      </div>

    </div>
  );
}

export default LoadingSpinner;