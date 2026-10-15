import { useLayoutEffect, useRef, useState } from "react";

/**
 * Renders children at a fixed design size and scales them to the available
 * width, so product mockups keep their proportions on every screen.
 */
function ScaledFrame({ width = 1280, height = 800, className = "", children }) {
  const outerRef = useRef(null);
  const [scale, setScale] = useState(0.5);

  useLayoutEffect(() => {
    const node = outerRef.current;
    if (!node) {
      return undefined;
    }

    const sync = () => setScale(node.clientWidth / width);
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(node);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div
      ref={outerRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: height * scale }}
    >
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{ width, height, transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}

export default ScaledFrame;
