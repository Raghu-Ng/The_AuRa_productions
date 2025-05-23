import { useEffect, useState } from 'react';

export const useGSAP = () => {
  const [gsap, setGsap] = useState<any>(null);

  useEffect(() => {
    // Dynamic import to avoid SSR issues
    const loadGSAP = async () => {
      try {
        const gsapModule = await import('gsap');
        const ScrollTriggerModule = await import('gsap/ScrollTrigger');
        
        gsapModule.default.registerPlugin(ScrollTriggerModule.default);
        setGsap(gsapModule.default);
      } catch (error) {
        console.error('Failed to load GSAP:', error);
      }
    };
    
    loadGSAP();
  }, []);

  return { gsap };
};