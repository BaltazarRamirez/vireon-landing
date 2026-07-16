import { WHATSAPP_NUMBER } from "./WhatsAppFloat";

const PROMO_WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hola Vireon, vi el 10% de descuento en la web y quiero consultar / reservar.",
)}`;

function PromoTopBar() {
  return (
    <div className="promo-topbar relative overflow-hidden border-b border-cyan-200/20">
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-r from-cyan-950 via-slate-950 to-blue-950"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-300/50 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-8 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-cyan-400/15 blur-2xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-8 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-blue-500/15 blur-2xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex max-w-7xl items-center justify-center gap-2.5 px-4 py-2.5 sm:gap-3 sm:px-8 sm:py-2.5">
        <span className="hidden h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.8)] sm:block" />

        <p className="text-center text-[11px] leading-4 text-slate-200 sm:text-xs sm:leading-5">
          <span className="mr-1.5 inline-flex items-center rounded-full border border-cyan-200/30 bg-cyan-300/15 px-2 py-0.5 text-[10px] font-semibold tracking-[0.14em] text-cyan-100 uppercase sm:mr-2 sm:text-[11px]">
            10% off
          </span>
          <span className="font-medium text-white">Descuento exclusivo web.</span>{" "}
          <span className="text-slate-300">
            Al comprar o reservar desde esta página.
          </span>
        </p>

        <a
          href={PROMO_WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="hidden shrink-0 items-center gap-1 rounded-full border border-cyan-200/25 bg-cyan-300/10 px-2.5 py-1 text-[11px] font-semibold text-cyan-100 transition hover:border-cyan-200/45 hover:bg-cyan-300/20 sm:inline-flex"
        >
          Aprovechar
          <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </div>
  );
}

export default PromoTopBar;
