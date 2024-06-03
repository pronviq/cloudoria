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
  animate: { height: "calc(min(300px, 50vh))", opacity: 1 },
  exit: { height: "0px", opacity: 0 },
  transition: { duration: 0.2 },
};

export const AnimatedSelection = {
  initial: { marginTop: "-40px", opacity: 0 },
  animate: { marginTop: "0px", opacity: 1 },
  exit: { marginTop: "-40px", opacity: 0 },
  transition: { duration: 0.2 },
};

export const AnimatedPopup = {
  initial: { marginTop: "-800px", opacity: 0 },
  animate: { marginTop: "-20vh", opacity: 1 },
  exit: { marginTop: "-800px", opacity: 0 },
  transition: { duration: 0.2 },
};

export const AnimatedPopupBG = {
  initial: { marginTop: "-0px", opacity: 0 },
  animate: { marginTop: "0px", opacity: 1 },
  exit: { marginTop: "-0px", opacity: 0 },
  transition: { duration: 0.2 },
};
