import { useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";

const QUERIES = {
  desktop: "(min-width: 1024px)",
  mobile: "(max-width: 1023px)",
  reduce: "(prefers-reduced-motion: reduce)",
};

/**
 * Runs `setup` inside a scoped gsap.matchMedia so every tween/ScrollTrigger is
 * reverted on unmount or breakpoint change. With reduced motion nothing runs
 * and the markup stays in its final, visible state.
 */
export function useGsap(scopeRef, setup) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) {
      return undefined;
    }

    const mm = gsap.matchMedia(scope);
    mm.add(QUERIES, (context) => {
      const { desktop, reduce } = context.conditions;
      if (reduce) {
        return undefined;
      }

      const fine = window.matchMedia("(pointer: fine)").matches;
      return setup({ scope, desktop, fine, gsap, ScrollTrigger });
    });

    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scopeRef]);
}
