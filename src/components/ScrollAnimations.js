import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Custom hook for scroll animations
export function useScrollAnimation(options = {}) {
  const { threshold = 0.1, triggerOnce = true } = options;
  const [ref, inView] = useInView({
    threshold,
    triggerOnce
  });

  return [ref, inView];
}

// Animated section wrapper
export function AnimatedSection({ children, className = '', animation = 'fadeInUp', delay = 0 }) {
  const [ref, inView] = useScrollAnimation();

  const animations = {
    fadeInUp: {
      initial: { opacity: 0, y: 60 },
      animate: { opacity: 1, y: 0 }
    },
    fadeInLeft: {
      initial: { opacity: 0, x: -60 },
      animate: { opacity: 1, x: 0 }
    },
    fadeInRight: {
      initial: { opacity: 0, x: 60 },
      animate: { opacity: 1, x: 0 }
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 }
    },
    slideInUp: {
      initial: { opacity: 0, y: 100 },
      animate: { opacity: 1, y: 0 }
    }
  };

  const selectedAnimation = animations[animation] || animations.fadeInUp;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={selectedAnimation.initial}
      animate={inView ? selectedAnimation.animate : selectedAnimation.initial}
      transition={{ 
        duration: 0.8, 
        delay: delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
}

// Staggered children animation
export function StaggeredContainer({ children, className = '', staggerDelay = 0.1 }) {
  const [ref, inView] = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

// Individual staggered item
export function StaggeredItem({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

// Parallax effect wrapper
export function ParallaxWrapper({ children, speed = 0.5, className = '' }) {
  const [ref, inView] = useScrollAnimation({ threshold: 0 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        transform: inView ? `translateY(${window.scrollY * speed}px)` : 'translateY(0px)'
      }}
      transition={{ duration: 0 }}
    >
      {children}
    </motion.div>
  );
} 