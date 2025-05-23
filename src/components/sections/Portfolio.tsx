import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ArrowLeft, X, ExternalLink } from 'lucide-react';
import { useGSAP } from '../../hooks/useGSAP';

const Portfolio = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { gsap } = useGSAP();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  const portfolioItems = [
    {
      id: 1,
      title: "Wedding Photography Collection",
      category: "Photography",
      image: "https://images.pexels.com/photos/1589820/pexels-photo-1589820.jpeg",
      description: "Capturing timeless moments with cinematic elegance. Our wedding photography combines storytelling with artistic vision.",
      link: "#"
    },
    {
      id: 2,
      title: "Corporate Brand Video",
      category: "Videography",
      image: "https://images.pexels.com/photos/3379943/pexels-photo-3379943.jpeg",
      description: "High-end corporate video production showcasing brand values and company culture through compelling narratives.",
      link: "#"
    },
    {
      id: 3,
      title: "Social Media Campaign",
      category: "Digital Marketing",
      image: "https://images.pexels.com/photos/3856635/pexels-photo-3856635.jpeg",
      description: "Integrated social media strategy that increased engagement by 300% through creative content and targeted campaigns.",
      link: "#"
    },
    {
      id: 4,
      title: "Podcast Production",
      category: "Audio",
      image: "https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg",
      description: "Professional podcast production with premium audio quality and engaging content strategy.",
      link: "#"
    },
    {
      id: 5,
      title: "E-commerce Website",
      category: "Web Development",
      image: "https://images.pexels.com/photos/18105/pexels-photo.jpg",
      description: "Custom e-commerce platform with seamless user experience and stunning visual design.",
      link: "#"
    },
    {
      id: 6,
      title: "Event Coverage",
      category: "Photography & Video",
      image: "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg",
      description: "Comprehensive event coverage combining photography and videography for maximum impact.",
      link: "#"
    }
  ];

  useEffect(() => {
    if (!gsap || !sectionRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX / innerWidth) * 2 - 1;
      const y = (clientY / innerHeight) * 2 - 1;
      
      mouseX.set(x * 20);
      mouseY.set(y * 20);
      
      setMousePosition({ x: clientX, y: clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Parallax effect for portfolio items
    gsap.utils.toArray('.portfolio-item').forEach((item: any, i) => {
      gsap.to(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: (i % 2 === 0) ? 100 : -100,
        opacity: 1,
      });
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [gsap, mouseX, mouseY]);

  const calculateParallax = (index: number) => {
    return {
      x: useTransform(
        smoothMouseX,
        [-1, 1],
        [index % 2 === 0 ? -20 : 20, index % 2 === 0 ? 20 : -20]
      ),
      y: useTransform(
        smoothMouseY,
        [-1, 1],
        [index % 2 === 0 ? -20 : 20, index % 2 === 0 ? 20 : -20]
      ),
    };
  };

  return (
    <section id="portfolio" className="section py-20 bg-aura-black" ref={sectionRef}>
      <div className="container-custom">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            Our <span className="text-aura-gold">Work</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-300 mb-12">
            Explore our portfolio of creative projects, each crafted with precision and artistic vision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => {
            const parallax = calculateParallax(index);
            
            return (
              <motion.div
                key={item.id}
                className="portfolio-item group cursor-pointer"
                style={{
                  x: parallax.x,
                  y: parallax.y,
                }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedProject(item.id)}
              >
                <div className="relative overflow-hidden rounded-lg bg-aura-darkGreen">
                  <div className="relative h-[400px] overflow-hidden">
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-aura-black via-transparent to-transparent opacity-80" />
                  </div>
                  
                  <motion.div 
                    className="absolute inset-0 p-6 flex flex-col justify-end"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-aura-gold text-sm uppercase tracking-wider mb-2 block">
                        {item.category}
                      </span>
                      <h3 className="text-xl font-serif font-bold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {item.description}
                      </p>
                      <motion.button
                        className="mt-4 text-aura-gold flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ x: 5 }}
                      >
                        View Project <ExternalLink size={16} />
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Project Modal */}
        {selectedProject !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-aura-black/95 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="relative w-full max-w-6xl bg-aura-darkGreen rounded-lg overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-aura-black/50 text-white hover:bg-aura-gold hover:text-aura-black transition-colors duration-300"
                onClick={() => setSelectedProject(null)}
              >
                <X size={24} />
              </button>

              {/* Modal Content */}
              {/* Add your modal content here */}
            </motion.div>
          </motion.div>
        )}

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <a 
            href="#contact" 
            className="btn btn-primary inline-flex items-center gap-2"
          >
            Start Your Project <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;