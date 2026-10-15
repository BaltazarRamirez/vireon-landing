import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import "lenis/dist/lenis.css";
import { refreshScrollTriggers, ScrollTrigger } from "../lib/gsap";

function shouldUseLenis() {
  if (typeof window === "undefined") {
    return false;
  }

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Touch devices already scroll natively; skipping Lenis saves a permanent RAF.
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.matchMedia("(max-width: 1023px)").matches;

  return !reduced && !coarse && !narrow;
}

function SmoothScroll({ children, paused = false, lenisRef }) {
  const internalRef = useRef(null);
  const enabled = shouldUseLenis();

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
    const onScrollTo = (event) => {
      const top = event.detail?.top;
      if (typeof top !== "number") {
        return;
      }

      const lenis = internalRef.current?.lenis;
      if (lenis) {
        lenis.scrollTo(top, { duration: 1.15 });
        return;
      }

      window.scrollTo({ top, behavior: "smooth" });
    };

    window.addEventListener("lenis:scrollTo", onScrollTo);
    return () => window.removeEventListener("lenis:scrollTo", onScrollTo);
  }, []);

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

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    let raf = 0;
    let lenis = null;
    const onScroll = () => ScrollTrigger.update();

    const attach = () => {
      lenis = internalRef.current?.lenis ?? null;
      if (!lenis) {
        raf = requestAnimationFrame(attach);
        return;
      }

      lenis.on("scroll", onScroll);
      refreshScrollTriggers();
    };

    attach();

    return () => {
      cancelAnimationFrame(raf);
      lenis?.off("scroll", onScroll);
    };
  }, [enabled]);

  if (!enabled) {
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
