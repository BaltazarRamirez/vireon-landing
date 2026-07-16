/** Stable scroll target at the first text of a section (unaffected by Motion). */
function SectionAnchor() {
  return (
    <div
      data-section-anchor=""
      className="pointer-events-none h-0 w-full scroll-mt-[var(--site-header-h,7.5rem)]"
      aria-hidden="true"
    />
  );
}

export default SectionAnchor;
