export const anim = (variants) => {
    return {
      initial: "initial",
      whileInView: "animate",
      variants,
    };
  };
  export const banner = {
    initial:  {opacity:0},
    animate: {
        opacity:1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.02,
      },
    },
  };
  
  export const objectAni = {
    initial: { y: 200 },
    animate: {
      y: 0,
      transition: {
        duration: 1,
      },
    },
  };
  