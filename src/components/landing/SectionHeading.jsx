import { useRef } from "react";
import { useGsap } from "../../hooks/useGsap";
import { revealWords } from "../../lib/gsap";
import SplitWords from "./SplitWords";

function SectionHeading({ eyebrow, title, description, align = "left", className = "" }) {
  const rootRef = useRef(null);

  useGsap(rootRef, ({ scope, gsap }) => {
    const trigger = { trigger: scope, start: "top 85%", once: true };
    const eyebrowEl = scope.querySelector(".sh-eyebrow");
    const descEl = scope.querySelector(".sh-desc");
    if (eyebrowEl) {
      gsap.from(eyebrowEl, { opacity: 0, y: 12, duration: 0.9, ease: "expo.out", scrollTrigger: trigger });
    }
    revealWords(scope.querySelector(".sh-title"), { start: "top 85%", delay: 0.05 });
    if (descEl) {
      gsap.from(descEl, {
        opacity: 0,
        y: 20,
        duration: 1.1,
        delay: 0.3,
        ease: "expo.out",
        scrollTrigger: trigger,
      });
    }
  });

  const centered = align === "center";

  return (
    <div
      ref={rootRef}
      className={`${centered ? "mx-auto text-center" : ""} max-w-3xl ${className}`}
    >
      {eyebrow ? (
        <p className="sh-eyebrow text-[13px] font-medium tracking-[0.24em] text-zinc-500 uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="sh-title mt-5 text-[2.1rem] leading-[1.05] font-semibold tracking-[-0.045em] text-white sm:text-5xl lg:text-[3.6rem]">
        <SplitWords parts={title} />
      </h2>
      {description ? (
        <p
          className={`sh-desc mt-6 text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8 ${
            centered ? "mx-auto max-w-2xl" : "max-w-xl"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default SectionHeading;
