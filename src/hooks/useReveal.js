import { useEffect, useRef, useState } from "react";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function useSectionReveal(options = {}) {
  const {
    // Reveal a bit before the section fully enters the viewport.
    threshold = 0.02,
    rootMargin = "0px 0px 35% 0px",
  } = options;
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(() => prefersReducedMotion());

  useEffect(() => {
    if (visible) {
      return undefined;
    }

    const node = sectionRef.current;
    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }
        setVisible(true);
        observer.disconnect();
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [visible, threshold, rootMargin]);

  return { sectionRef, visible };
}

export function useItemReveal(itemCount, options = {}) {
  const {
    threshold = 0.04,
    rootMargin = "0px 0px 32% 0px",
  } = options;
  const itemRefs = useRef([]);
  const [visibleItems, setVisibleItems] = useState(() =>
    Array.from({ length: itemCount }, () => prefersReducedMotion()),
  );

  useEffect(() => {
    if (prefersReducedMotion()) {
      return undefined;
    }

    const nodes = itemRefs.current.filter(Boolean);
    if (!nodes.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const index = Number(entry.target.dataset.revealIndex);
          setVisibleItems((current) => {
            if (current[index]) {
              return current;
            }
            const next = [...current];
            next[index] = true;
            return next;
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold, rootMargin },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [itemCount, threshold, rootMargin]);

  const setItemRef = (index) => (node) => {
    itemRefs.current[index] = node;
  };

  return { visibleItems, setItemRef };
}
