import { useRef } from "react";
import { clients } from "../../data/clients";
import { useGsap } from "../../hooks/useGsap";

function LogoStrip() {
  const rootRef = useRef(null);

  useGsap(rootRef, ({ gsap }) => {
    gsap.from(".ls-item", {
      opacity: 0,
      y: 24,
      filter: "blur(8px)",
      duration: 1.1,
      ease: "expo.out",
      stagger: 0.09,
      scrollTrigger: { trigger: rootRef.current, start: "top 88%", once: true },
    });
  });

  return (
    <section ref={rootRef} className="relative mx-auto max-w-6xl px-5 pt-20 pb-10 sm:px-8 sm:pt-28">
      <p className="ls-item text-center text-[13px] text-zinc-500">
        Empresas que ya operan todos los días con sistemas Vireon
      </p>
      <ul className="mt-10 grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
        {clients.map((client) => (
          <li key={client.id} className="ls-item flex justify-center">
            <img
              src={client.logo}
              alt={client.name}
              loading="lazy"
              className={`w-auto object-contain opacity-90 transition duration-300 hover:opacity-100 ${
                client.logoClass ??
                "h-14 max-w-[11rem] sm:h-[4.25rem] sm:max-w-[13rem]"
              }`}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default LogoStrip;
