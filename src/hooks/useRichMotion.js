import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/** Desktop + fine pointer: springs / clipPath / 3D. Mobile: light fades only. */
export function useRichMotion() {
  const reduceMotion = useReducedMotion();
  const [rich, setRich] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(
      "(min-width: 1024px) and (pointer: fine)",
    );
    const sync = () => setRich(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return Boolean(rich && !reduceMotion);
}
