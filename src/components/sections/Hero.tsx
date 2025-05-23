import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useGSAP } from '../../hooks/useGSAP';
import CameraModel from '../3d/CameraModel';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { gsap } = useGSAP();

  useEffect(() => {
    if (!gsap || !heroRef.current) return;

    const tl = gsap.timeline();
    
    tl.from('.hero-title span', {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power4.out',
    });

    tl.from('.hero-subtitle', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.6');

    tl.from('.hero-cta', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.4');

    // Parallax effect on scroll
    gsap.to('.parallax-hero', {
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      y: (index, target) => {
        const speed = target.dataset.speed || 0;
        return window.innerHeight * speed;
      },
    });
  }, [gsap]);

  const scrollToNextSection = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-aura-black bg-opacity-70 backdrop-blur-sm z-10"></div>
      </div>
      
      {/* 3D Camera Model */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <CameraModel />
      </div>
      
      <div className="container-custom relative z-20 px-4 md:px-0 mt-20">
        <div className="flex flex-col items-center text-center">
          <motion.h1 
            className="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block overflow-hidden">
              <span className="inline-block">Cinematic</span>
            </span>{' '}
            <span className="inline-block overflow-hidden">
              <span className="inline-block">Digital</span>
            </span>{' '}
            <span className="inline-block overflow-hidden">
              <span className="inline-block text-aura-gold">Storytelling</span>
            </span>
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle text-xl md:text-2xl text-gray-300 max-w-2xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            We transform visions into visual masterpieces, crafting immersive digital experiences that captivate and inspire.
          </motion.p>
          
          <motion.div 
            className="hero-cta flex flex-col sm:flex-row items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <a 
              href="#portfolio" 
              className="btn btn-primary"
            >
              View Our Work
            </a>
            <a 
              href="#contact" 
              className="btn btn-outline"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        onClick={scrollToNextSection}
        whileHover={{ y: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronDown className="text-aura-gold animate-bounce" size={32} />
      </motion.div>
    </section>
  );
};

export default Hero;