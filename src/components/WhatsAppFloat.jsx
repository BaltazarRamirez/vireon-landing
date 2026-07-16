import { useState } from "react";

const WHATSAPP_NUMBER = "543865454534";
const WHATSAPP_MESSAGE =
  "Hola Vireon, quiero consultar por un sistema a medida para mi negocio.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

function WhatsAppFloat() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed right-4 bottom-4 z-[70] isolate flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {open && (
        <div className="animate-whatsapp-panel relative z-10 w-[min(18.5rem,calc(100vw-2rem))] overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 shadow-[0_20px_60px_rgba(2,6,23,0.55)] backdrop-blur-xl">
          <div className="flex items-start justify-between gap-3 border-b border-white/10 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-white">Vireon</p>
              <p className="mt-0.5 text-xs text-emerald-300">En línea por WhatsApp</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid h-7 w-7 place-items-center rounded-full text-slate-400 transition hover:bg-white/5 hover:text-white"
              aria-label="Cerrar chat de WhatsApp"
            >
              &times;
            </button>
          </div>

          <div className="space-y-3 px-4 py-4">
            <div className="max-w-[90%] rounded-2xl rounded-tl-md bg-white/8 px-3.5 py-2.5 text-sm leading-6 text-slate-200">
              Hola. Contame qué proceso querés ordenar y te ayudamos a armar la
              mejor solución.
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-[#2fe074]"
            >
              Abrir WhatsApp
            </a>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="group relative z-20 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_40px_rgba(37,211,102,0.45)] transition duration-300 hover:bg-[#2fe074] lg:animate-whatsapp-float"
        aria-label={open ? "Cerrar WhatsApp" : "Abrir WhatsApp"}
      >
        {open ? (
          <span className="text-2xl leading-none">&times;</span>
        ) : (
          <svg
            viewBox="0 0 24 24"
            className="h-7 w-7"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        )}
      </button>
    </div>
  );
}

export { WHATSAPP_URL, WHATSAPP_NUMBER };
export default WhatsAppFloat;
