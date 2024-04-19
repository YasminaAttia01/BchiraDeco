export const anim = (variants) => {
  return {
    initial: "initial",
    whileInView: "animate",
    variants,
  };
};
export const banner = {
  animate: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.02,
    },
  },
};

export const letterAni = {
  initial: { y: 200 },
  animate: {
    y: 0,
    transition: {
      duration: 1,
    },
  },
};

export const text = {
  style: "STYLE",
  sans: "SANS ",
  frontieres:"FRONTIÈRES,",
  pour: "POUR",
  chaque: "CHAQUE",
moument:"MOMENT",
  de: "DE",
  votre: "VOTRE",
  vie: "VIE",
};
