import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Film, Award, Users, Target, Monitor } from 'lucide-react';
import { useGSAP } from '../../hooks/useGSAP';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { gsap } = useGSAP();

  const stats = [
    { icon: <Camera className="text-aura-gold" size={24} />, count: '150+', label: 'Projects Completed' },
    { icon: <Film className="text-aura-gold" size={24} />, count: '10+', label: 'Years Experience' },
    { icon: <Award className="text-aura-gold" size={24} />, count: '25+', label: 'Awards Won' },
    { icon: <Users className="text-aura-gold" size={24} />, count: '80+', label: 'Happy Clients' },
  ];

  const values = [
    { 
      icon: <Target className="text-aura-gold" size={28} />, 
      title: 'Vision',
      description: 'We turn concepts into stunning visual narratives that leave lasting impressions.'
    },
    { 
      icon: <Monitor className="text-aura-gold" size={28} />, 
      title: 'Innovation',
      description: 'We embrace cutting-edge technologies and creative approaches to stay ahead.'
    },
    { 
      icon: <Users className="text-aura-gold" size={28} />, 
      title: 'Collaboration',
      description: 'We work closely with clients to ensure their vision is perfectly realized.'
    },
  ];

  useEffect(() => {
    if (!gsap || !sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none',
      }
    });

    tl.from('.about-title', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    });

    tl.from('.about-content', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.4');

    tl.from('.stat-item', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
    }, '-=0.4');

    tl.from('.value-item', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
    }, '-=0.4');
  }, [gsap]);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="section py-20 bg-aura-darkGreen"
    >
      <div className="container-custom">
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <motion.h2 
            className="about-title section-title"
            variants={itemVariants}
          >
            About <span className="text-aura-gold">AuRa</span>
          </motion.h2>
          
          <motion.div 
            className="about-content max-w-3xl mx-auto mb-12"
            variants={itemVariants}
          >
            <p className="text-lg text-gray-300 mb-8">
              The AuRa Productions is a premium digital marketing agency specializing in creating cinematic visual experiences that transform brands and captivate audiences. We combine technical expertise with artistic vision to produce content that resonates and inspires.
            </p>
            <p className="text-lg text-gray-300">
              Founded on the principles of innovation and creative excellence, we work with clients ranging from startups to established enterprises, helping them tell their stories in visually compelling ways.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
            variants={sectionVariants}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="stat-item flex flex-col items-center"
                variants={itemVariants}
              >
                <div className="mb-3">{stat.icon}</div>
                <h3 className="text-3xl md:text-4xl font-bold text-aura-gold mb-2">{stat.count}</h3>
                <p className="text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.h3 
            className="text-2xl font-serif font-bold mb-8"
            variants={itemVariants}
          >
            Our <span className="text-aura-gold">Core Values</span>
          </motion.h3>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={sectionVariants}
          >
            {values.map((value, index) => (
              <motion.div 
                key={index} 
                className="value-item p-6 border border-aura-gold/20 rounded-md bg-aura-black/30 hover:border-aura-gold/60 transition-all duration-300"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="mb-4">{value.icon}</div>
                <h4 className="text-xl font-serif font-bold text-aura-gold mb-3">{value.title}</h4>
                <p className="text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;