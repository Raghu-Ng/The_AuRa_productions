import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '../hooks/useGSAP';

const Loader = () => {
  const { gsap } = useGSAP();

  useEffect(() => {
    if (!gsap) return;
    
    const tl = gsap.timeline();
    
    tl.to('.loader-bar', {
      width: '100%',
      duration: 1.5,
      ease: 'power2.inOut',
    });
    
    tl.to('.loader-percentage', {
      innerHTML: '100%',
      duration: 1.5,
      snap: { innerHTML: 1 },
      ease: 'power2.inOut',
    }, 0);
  }, [gsap]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-aura-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <img 
          src="/assets/logo.png" 
          alt="The AuRa Productions Logo" 
          className="w-32 h-32 mb-8"
          onError={(e) => {
            e.currentTarget.onerror = null; 
            e.currentTarget.src = 'https://via.placeholder.com/128/171A14/D4AF37?text=AuRa';
          }}
        />
        
        <div className="w-64 h-[2px] bg-aura-darkGreen rounded-full overflow-hidden">
          <div className="loader-bar h-full w-0 bg-aura-gold"></div>
        </div>
        
        <div className="mt-4 text-aura-gold font-medium">
          <span className="loader-percentage">0%</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Loader;