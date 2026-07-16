function getHeaderHeight() {
  const header = document.querySelector("header");
  return header?.getBoundingClientRect().height ?? 120;
}

export function getSectionScrollTarget(sectionId) {
  const byId = document.getElementById(sectionId);
  if (!byId) {
    return null;
  }

  if (byId.hasAttribute("data-section-anchor")) {
    return byId;
  }

  return byId.querySelector("[data-section-anchor]") || byId;
}

/**
 * Places the section's first text in the upper-center of the viewport
 * below the sticky header.
 */
export function scrollToSection(sectionId, lenis) {
  const target = getSectionScrollTarget(sectionId);
  if (!target) {
    return false;
  }

  const headerHeight = getHeaderHeight();
  const anchorTop = target.getBoundingClientRect().top + window.scrollY;
  const content = target.nextElementSibling;
  const contentHeight =
    content?.getBoundingClientRect().height ||
    target.getBoundingClientRect().height ||
    220;

  const available = Math.max(240, window.innerHeight - headerHeight);
  const blockHeight = Math.min(contentHeight, available * 0.65);
  // Keep the intro slightly above true center so the section feels balanced.
  const topGap = Math.max(24, (available - blockHeight) * 0.32);
  const top = Math.max(0, Math.round(anchorTop - headerHeight - topGap));

  if (lenis) {
    lenis.resize();
    lenis.scrollTo(top, {
      duration: 1.05,
      immediate: false,
    });
    return true;
  }

  window.scrollTo({ top, behavior: "smooth" });
  return true;
}

export function scrollToSectionWhenReady(sectionId, lenis, attempt = 0) {
  if (scrollToSection(sectionId, lenis)) {
    if (attempt === 0) {
      window.setTimeout(() => {
        scrollToSection(sectionId, lenis);
      }, 240);
    }
    return;
  }

  if (attempt >= 10) {
    return;
  }

  window.setTimeout(() => {
    scrollToSectionWhenReady(sectionId, lenis, attempt + 1);
  }, 90);
}
