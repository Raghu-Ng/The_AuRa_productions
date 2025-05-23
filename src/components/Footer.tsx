import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Facebook, Linkedin, Youtube, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <Instagram size={20} />, href: '#', label: 'Instagram' },
    { icon: <Youtube size={20} />, href: '#', label: 'YouTube' },
    { icon: <Linkedin size={20} />, href: '#', label: 'LinkedIn' },
    { icon: <Twitter size={20} />, href: '#', label: 'Twitter' },
    { icon: <Facebook size={20} />, href: '#', label: 'Facebook' },
    { icon: <Mail size={20} />, href: '#', label: 'Email' },
  ];

  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.footer 
      className="relative bg-aura-darkGreen py-16 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={footerVariants}
    >
      <div className="container-custom mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div className="md:col-span-1" variants={itemVariants}>
            <h3 className="text-2xl font-serif font-bold mb-6">
              <span className="text-aura-gold">THE</span> AURA
              <span className="text-aura-gold"> PRODUCTIONS</span>
            </h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Transforming visions into cinematic reality. We specialize in creating immersive digital experiences that elevate brands and captivate audiences.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  aria-label={link.label}
                  className="text-gray-300 hover:text-aura-gold transition-colors duration-300"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div className="md:col-span-1" variants={itemVariants}>
            <h4 className="text-lg font-serif font-bold text-aura-gold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'About', 'Services', 'Portfolio', 'Testimonials', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-aura-gold transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="md:col-span-1" variants={itemVariants}>
            <h4 className="text-lg font-serif font-bold text-aura-gold mb-6">Contact Us</h4>
            <address className="not-italic space-y-4 text-gray-300">
              <p>123 Creative Avenue</p>
              <p>Design District, NY 10001</p>
              <p>
                <a href="mailto:info@auraproductions.com" className="hover:text-aura-gold transition-colors duration-300">
                  info@auraproductions.com
                </a>
              </p>
              <p>
                <a href="tel:+12125551234" className="hover:text-aura-gold transition-colors duration-300">
                  +1 (212) 555-1234
                </a>
              </p>
            </address>
          </motion.div>
        </div>

        <motion.div 
          className="border-t border-aura-gold/20 mt-12 pt-8 text-center text-gray-400 text-sm"
          variants={itemVariants}
        >
          <p>&copy; {currentYear} The AuRa Productions. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;