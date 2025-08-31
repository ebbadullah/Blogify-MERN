import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AnimatedSection = ({
  children,
  className = "",
  variants,
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  once = true
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, threshold });

  const defaultVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration,
        delay,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants || defaultVariants}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
