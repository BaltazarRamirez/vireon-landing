import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  ScrollTrigger.clearScrollMemory("manual");
}

export function refreshScrollTriggers() {
  const stayTop = window.scrollY < 40;
  ScrollTrigger.sort();
  ScrollTrigger.refresh();
  if (stayTop) {
    window.scrollTo(0, 0);
  }
}

const numberFormat = new Intl.NumberFormat("es-AR");

export function revealWords(target, { start = "top 85%", delay = 0, stagger = 0.05 } = {}) {
  const words = target.querySelectorAll(".sw-i");
  if (!words.length) {
    return null;
  }

  return gsap.from(words, {
    yPercent: 115,
    rotate: 4,
    duration: 1.15,
    ease: "expo.out",
    stagger,
    delay,
    scrollTrigger: start ? { trigger: target, start, once: true } : undefined,
  });
}

export function countUp(el, { duration = 1.6, delay = 0, scrollTrigger } = {}) {
  const value = Number(el.dataset.value);
  const decimals = Number(el.dataset.decimals || 0);
  const prefix = el.dataset.prefix || "";
  const suffix = el.dataset.suffix || "";
  const state = { v: 0 };
  const format = (v) =>
    decimals
      ? v.toLocaleString("es-AR", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : numberFormat.format(Math.round(v));

  el.textContent = `${prefix}${format(0)}${suffix}`;

  return gsap.to(state, {
    v: value,
    duration,
    delay,
    ease: "power3.out",
    scrollTrigger,
    onUpdate: () => {
      el.textContent = `${prefix}${format(state.v)}${suffix}`;
    },
  });
}

export { gsap, ScrollTrigger };
