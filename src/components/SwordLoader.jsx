import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const SwordLoader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Start fade out after 1.5s
    const fadeOutTimer = setTimeout(() => {
      setIsVisible(false);
      
      // Allow scrolling after fade out completes
      const removeTimer = setTimeout(() => {
        document.body.style.overflow = 'auto';
        setIsAnimating(false);
      }, 700); // Slightly longer for smoother transition
      
      return () => clearTimeout(removeTimer);
    }, 1500);

    document.body.style.overflow = 'hidden';
    
    return () => {
      clearTimeout(fadeOutTimer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!isAnimating && !isVisible) return null;

  return (
    <motion.div 
      className="fixed inset-0 bg-gray-900/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        transition: { 
          duration: 0.7, 
          ease: [0.16, 1, 0.3, 1], // Custom easing for smoother motion
          opacity: { duration: 0.6 }
        }
      }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative w-24 h-24"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ 
          scale: 1,
          opacity: 1,
          rotate: 360,
          transition: {
            rotate: { 
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            },
            scale: {
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1]
            },
            opacity: {
              duration: 0.8,
              ease: "easeOut"
            }
          }
        }}
      >
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  className="w-10 h-10 text-red-500"
  fill="currentColor"
>
  {/* Blade */}
  <path
    d="M12 2 L14 18 L12 20 L10 18 L12 2 Z"
  />
  {/* Crossguard */}
  <path
    d="M8 12 H16"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  />
  {/* Handle */}
  <rect
    x="11"
    y="18"
    width="2"
    height="4"
    fill="currentColor"
  />
  {/* Pommel */}
  <circle
    cx="12"
    cy="22"
    r="1"
    fill="currentColor"
  />
</svg>

      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : -5,
          transition: {
            duration: 0.5,
            delay: 0.2,
            ease: [0.2, 0, 0, 1]
          }
        }}
      >
        <p className="mt-6 text-lg font-medium text-gray-300">
          Loading
          <motion.span
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop"
            }}
            className="inline-flex space-x-1"
          >
            <span>.</span>
            <span style={{ animationDelay: '0.2s' }}>.</span>
            <span style={{ animationDelay: '0.4s' }}>.</span>
          </motion.span>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SwordLoader;
