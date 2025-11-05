import React from 'react';
import { motion, useInView } from 'framer-motion';

const AnimateOnScroll = ({ 
  children, 
  animation = "fadeIn", 
  duration = 0.5, 
  delay = 0,
  threshold = 0.1,
  triggerOnce = true
}) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, {
    once: triggerOnce,
    amount: threshold,
  });

  // Animation variants
  const animations = {
    fadeIn: {
      visible: { opacity: 1, y: 0, transition: { duration, delay } },
      hidden: { opacity: 0, y: 50 }
    },
    slideUp: {
      visible: { opacity: 1, y: 0, transition: { duration, delay } },
      hidden: { opacity: 0, y: 100 }
    },
    slideRight: {
      visible: { opacity: 1, x: 0, transition: { duration, delay } },
      hidden: { opacity: 0, x: -100 }
    },
    slideLeft: {
      visible: { opacity: 1, x: 0, transition: { duration, delay } },
      hidden: { opacity: 0, x: 100 }
    },
    scale: {
      visible: { opacity: 1, scale: 1, transition: { duration, delay } },
      hidden: { opacity: 0, scale: 0.8 }
    },
    flip: {
      visible: { opacity: 1, rotateX: 0, transition: { duration, delay } },
      hidden: { opacity: 0, rotateX: 90 }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={animations[animation]}
    >
      {children}
    </motion.div>
  );
};

export default AnimateOnScroll; 