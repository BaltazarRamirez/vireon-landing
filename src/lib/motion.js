export const easeOutExpo = [0.16, 1, 0.3, 1];
export const easeOutSoft = [0.22, 1, 0.36, 1];

export const viewportOnce = {
  once: true,
  amount: 0.12,
  margin: "0px 0px 16% 0px",
};

export const springSnappy = {
  type: "spring",
  stiffness: 160,
  damping: 16,
  mass: 0.85,
};

export const springSoft = {
  type: "spring",
  stiffness: 120,
  damping: 18,
  mass: 0.95,
};

export const tweenSoft = {
  duration: 0.38,
  ease: easeOutSoft,
};

export const introContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.04,
    },
  },
};

export const introContainerLight = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
};

export const introItem = {
  hidden: {
    opacity: 0,
    y: 22,
    clipPath: "inset(0 0 100% 0)",
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: {
      ...springSoft,
      clipPath: { duration: 0.7, ease: easeOutExpo },
    },
  },
};

export const introItemLight = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: tweenSoft,
  },
};

export const introRule = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.65, ease: easeOutExpo },
  },
};

export const introRuleLight = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.35, ease: easeOutSoft },
  },
};

export const fadeUpLight = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: tweenSoft,
  },
};
