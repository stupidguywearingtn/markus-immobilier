"use client";

import { motion } from "framer-motion";
import { MapPinIllust } from "./map-pin";

/**
 * MapPin animé qui "tombe" au load.
 * - Le pin descend depuis le haut avec un bounce
 * - L'ellipse au sol (ombre) se dessine en même temps (illust + DrawOnScroll wraps autour)
 */
export function MapPinDrop({ size = 200 }: { size?: number }) {
  return (
    <motion.div
      initial={{ y: -120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 14,
        delay: 0.15,
      }}
      style={{ originY: 1 }}
    >
      <MapPinIllust size={size} />
    </motion.div>
  );
}
