import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { navItems } from "../data/nav";

const sectionIds = navItems
  .filter((item) => item.type === "section")
  .map((item) => item.id);

export function useActiveNav() {
  const location = useLocation();
  const [spySection, setSpySection] = useState(null);
  const [manualSection, setManualSection] = useState(null);

  useEffect(() => {
    if (location.pathname !== "/") {
      return undefined;
    }

    const nodes = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!nodes.length) {
      return undefined;
    }

    const ratios = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        });

        let bestId = null;
        let bestRatio = 0;

        sectionIds.forEach((id) => {
          const ratio = ratios.get(id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });

        if (!bestId) {
          return;
        }

        setSpySection((current) => (current === bestId ? current : bestId));
        setManualSection((current) =>
          current && current === bestId ? null : current,
        );
      },
      {
        root: null,
        rootMargin: "-28% 0px -48% 0px",
        threshold: [0, 0.15, 0.35, 0.55, 0.75, 1],
      },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [location.pathname]);

  const hashSection =
    location.pathname === "/" && location.hash
      ? location.hash.replace("#", "")
      : null;

  const activeSection =
    location.pathname === "/"
      ? (manualSection ?? spySection ?? hashSection)
      : null;

  const isItemActive = (item) => {
    if (item.type === "route") {
      return location.pathname === item.to;
    }

    return activeSection === item.id;
  };

  const markSection = (id) => {
    setManualSection(id);
    setSpySection(id);
  };

  return { isItemActive, activeSection, markSection };
}
