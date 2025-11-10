// import { useEffect, useRef, useState } from "react";

// export function useScrollAnimation() {
//   const ref = useRef();
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setVisible(true);
//           observer.disconnect(); // animate only once
//         }
//       },
//       { threshold: 0.2 }
//     );

//     if (ref.current) observer.observe(ref.current);

//     return () => observer.disconnect();
//   }, []);

//   return [ref, visible];
// }
import { useEffect, useRef, useState } from "react";

export function useScrollAnimation(options = { threshold: 0.2, once: true }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (options.once) observer.unobserve(entry.target);
        } else if (!options.once) {
          setVisible(false);
        }
      },
      { threshold: options.threshold }
    );

    const el = ref.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [options]);

  return [ref, visible];
}
