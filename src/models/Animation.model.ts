export const AnimatedDropDown = {
  initial: { marginTop: "-20px", opacity: 0 },
  animate: { marginTop: "6px", opacity: 1 },
  exit: { marginTop: "-20px", opacity: 0 },
  transition: { duration: 0.2 },
};

export const AnimatedListFile = {
  initial: { transform: "translateX(600px)", opacity: 0 },
  animate: { transform: "translateX(0px)", opacity: 1 },
  exit: { transform: "translateX(-600px)", opacity: 0 },
};

export const AnimatedLoadingStack = {
  initial: { height: "0px", opacity: 0 },
  animate: { height: "300px", opacity: 1 },
  exit: { height: "0px", opacity: 0 },
  transition: { duration: 0.2 },
};

export const AnimatedCreateDir = {
  // initial: { transform: "rotate(180deg)" },
  // animate: { transform: "rotate(0deg)" },
  // exit: { transform: "rotate(90deg)" },
  // transition: { duration: 0.2 },
};
