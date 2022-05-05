import { useEffect, useRef } from "react";

//////////// useFadeIn - 컨텐츠를 서서히 fade in 시키기 ////////////
export const useFadeIn = (duration = 1, delay = 0) => {
  if (typeof duration !== "number" || typeof delay !== "number") return;
  const element = useRef();
  useEffect(() => {
    if (element.current) {
      const { current } = element;
      current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`;
      current.style.opacity = 1;
    }
  }, []);
  return { ref: element, style: { opacity: 0 } };
};
