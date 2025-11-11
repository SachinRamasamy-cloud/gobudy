import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function SmoothScroll({ children }) {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    container: scrollRef,
  });

  // You can customize this transform for smoothness or parallax effect
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div
      ref={scrollRef}
      className="scroll-container"
      style={{
        overflowY: "scroll",
        height: "100vh",
        scrollBehavior: "smooth",
      }}
    >
      <motion.div
        style={{
          y,
          minHeight: "200vh", // extend for visible scroll effect
        }}
        transition={{
          type: "tween",
          ease: "easeInOut",
          duration: 0.8,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
