import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Film, Video, LayoutGrid, PenTool, Globe, Share2, Zap } from 'lucide-react';
import { useGSAP } from '../../hooks/useGSAP';

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const { gsap } = useGSAP();

  const serviceCategories = [
    { id: 0, title: 'Content Creation' },
    { id: 1, title: 'Design & Branding' },
    { id: 2, title: 'Digital Marketing' },
  ];

  const servicesData = [
    // Content Creation
    [
      {
        icon: <Camera size={36} />,
        title: 'Photography',
        description: 'Professional photography services for products, events, and brand storytelling.',
      },
      {
        icon: <Film size={36} />,
        title: 'Cinematography',
        description: 'Cinematic video production to capture your brand story with stunning visuals.',
      },
      {
        icon: <Video size={36} />,
        title: 'Video Editing',
        description: 'Post-production excellence to transform raw footage into compelling narratives.',
      },
      {
        icon: <LayoutGrid size={36} />,
        title: 'Content Strategy',
        description: 'Strategic planning for content that engages audiences and achieves objectives.',
      },
    ],
    // Design & Branding
    [
      {
        icon: <PenTool size={36} />,
        title: 'Brand Identity',
        description: 'Comprehensive brand development including logos, color palettes, and guidelines.',
      },
      {
        icon: <LayoutGrid size={36} />,
        title: 'UI/UX Design',
        description: 'User-centered design for websites and applications that delight users.',
      },
      {
        icon: <Globe size={36} />,
        title: 'Web Design',
        description: 'Stunning, responsive websites that represent your brand and convert visitors.',
      },
      {
        icon: <PenTool size={36} />,
        title: 'Print Design',
        description: 'Eye-catching print materials from business cards to billboards and beyond.',
      },
    ],
    // Digital Marketing
    [
      {
        icon: <Share2 size={36} />,
        title: 'Social Media',
        description: 'Strategic social media management to build community and drive engagement.',
      },
      {
        icon: <Zap size={36} />,
        title: 'SEO & SEM',
        description: 'Search engine optimization and marketing to increase visibility and traffic.',
      },
      {
        icon: <LayoutGrid size={36} />,
        title: 'Content Marketing',
        description: 'Strategic content creation and distribution to attract and retain customers.',
      },
      {
        icon: <Globe size={36} />,
        title: 'Email Campaigns',
        description: 'Targeted email marketing that nurtures leads and builds customer loyalty.',
      },
    ],
  ];

  useEffect(() => {
    if (!gsap || !sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      }
    });

    tl.from('.services-title', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    });

    tl.from('.services-tabs', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.4');

    tl.from('.service-card', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
    }, '-=0.2');
  }, [gsap, activeTab]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <section id="services" className="section py-20 bg-aura-black" ref={sectionRef}>
      <div className="container-custom">
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2 className="services-title section-title" variants={itemVariants}>
            Our <span className="text-aura-gold">Services</span>
          </motion.h2>
          <motion.p className="max-w-3xl mx-auto text-lg text-gray-300 mb-12" variants={itemVariants}>
            We offer a comprehensive suite of creative services to elevate your brand and captivate your audience.
          </motion.p>

          {/* Service Tabs */}
          <motion.div className="services-tabs flex flex-wrap justify-center gap-4 mb-12" variants={itemVariants}>
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-6 py-3 rounded-sm transition-all duration-300 ${
                  activeTab === category.id
                    ? 'bg-aura-gold text-aura-black font-medium'
                    : 'bg-transparent border border-aura-gold/40 text-aura-gold hover:border-aura-gold'
                }`}
              >
                {category.title}
              </button>
            ))}
          </motion.div>

          {/* Service Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            key={activeTab}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {servicesData[activeTab].map((service, index) => (
              <motion.div
                key={index}
                className="service-card group"
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
              >
                <div className="text-aura-gold mb-4 transition-all duration-300 group-hover:scale-110">
                  {service.icon}
                </div>
                <h3 className="text-xl font-serif font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-serif font-bold mb-6">
            Ready to <span className="text-aura-gold">elevate your brand</span>?
          </h3>
          <a href="#contact" className="btn btn-primary">
            Get Started
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;