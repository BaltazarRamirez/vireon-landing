import { Fragment, useRef } from "react";
import { useGsap } from "../../hooks/useGsap";

const TEXT = [
  "El crecimiento *no* comienza con más trabajo.",
  "Comienza con mejores procesos, información clara y *decisiones* *inteligentes.*",
  "Transformamos esa visión desde tecnología.",
];

function Manifesto() {
  const rootRef = useRef(null);

  useGsap(rootRef, ({ gsap }) => {
    gsap.fromTo(
      ".mf-w",
      { opacity: 0.12 },
      {
        opacity: 1,
        ease: "none",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".mf-text",
          start: "top 78%",
          end: "bottom 45%",
          scrub: true,
        },
      },
    );
  });

  return (
    <section ref={rootRef} className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-40">
      <p className="text-[13px] font-medium tracking-[0.24em] text-zinc-500 uppercase">
        Por qué Vireon
      </p>
      <p className="mf-text mt-8 text-[2rem] leading-[1.12] font-semibold tracking-[-0.045em] text-white sm:text-5xl lg:text-[4rem]">
        {TEXT.map((sentence, sIndex) => (
          <Fragment key={sentence}>
            {sIndex > 0 ? <br /> : null}
            {sentence.split(" ").filter(Boolean).map((raw, index) => {
              const accent = raw.startsWith("*");
              const word = raw.replaceAll("*", "");
              const isNo = accent && word.toLowerCase() === "no";
              return (
                <Fragment key={`${sIndex}-${index}`}>
                  <span
                    className={`mf-w ${
                      isNo ? "text-gradient-muted italic" : accent ? "text-gradient-muted italic" : ""
                    }`}
                  >
                    {word}
                  </span>{" "}
                </Fragment>
              );
            })}
          </Fragment>
        ))}
      </p>
    </section>
  );
}

export default Manifesto;
