export function goToHome(event, navigate, location) {
  event?.preventDefault();

  if (location.pathname !== "/" || location.hash) {
    navigate("/");
  }

  window.dispatchEvent(new CustomEvent("lenis:scrollTo", { detail: { top: 0 } }));
}
