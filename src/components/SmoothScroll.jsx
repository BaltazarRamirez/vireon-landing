import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import "lenis/dist/lenis.css";

function SmoothScroll({ children, paused = false, lenisRef }) {
  const internalRef = useRef(null);
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!lenisRef) {
      return undefined;
    }

    const sync = () => {
      lenisRef.current = internalRef.current?.lenis ?? null;
    };

    sync();
    const frame = requestAnimationFrame(sync);

    return () => {
      cancelAnimationFrame(frame);
      lenisRef.current = null;
    };
  }, [lenisRef, paused]);

  useEffect(() => {
    const lenis = internalRef.current?.lenis;
    if (!lenis) {
      return undefined;
    }

    if (paused) {
      lenis.stop();
    } else {
      lenis.start();
    }

    return undefined;
  }, [paused]);

  useEffect(() => {
    const onStop = () => internalRef.current?.lenis?.stop();
    const onStart = () => {
      if (!paused) {
        internalRef.current?.lenis?.start();
      }
    };

    window.addEventListener("lenis:stop", onStop);
    window.addEventListener("lenis:start", onStart);

    return () => {
      window.removeEventListener("lenis:stop", onStop);
      window.removeEventListener("lenis:start", onStart);
    };
  }, [paused]);

  if (reducedMotion) {
    return children;
  }

  return (
    <ReactLenis
      ref={internalRef}
      root
      options={{
        autoRaf: true,
        lerp: 0.085,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1.2,
        wheelMultiplier: 0.9,
        anchors: false,
        allowNestedScroll: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;
