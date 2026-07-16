import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const RICH_QUERY = "(min-width: 1024px) and (pointer: fine)";

function getRichMatch() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(RICH_QUERY).matches;
}

/**
 * Desktop + mouse: clipPath / 3D / springs pesados.
 * Mobile/touch: solo opacity + transform (GPU-friendly).
 * Se sincroniza en el primer paint para no swapear variantes a mitad de entrada.
 */
export function useRichMotion() {
  const reduceMotion = useReducedMotion();
  const [rich, setRich] = useState(getRichMatch);

  useEffect(() => {
    const media = window.matchMedia(RICH_QUERY);
    const sync = () => setRich(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return Boolean(rich && !reduceMotion);
}
