import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import { useGSAP } from '../../hooks/useGSAP';

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { gsap } = useGSAP();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after showing success message
      setTimeout(() => {
        setFormState({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  // GSAP animations are set up inside the useEffect hook in each component

  const contactInfo = [
    {
      icon: <Mail className="text-aura-gold" size={24} />,
      title: 'Email',
      details: 'info@auraproductions.com',
      link: 'mailto:info@auraproductions.com',
    },
    {
      icon: <Phone className="text-aura-gold" size={24} />,
      title: 'Phone',
      details: '+1 (212) 555-1234',
      link: 'tel:+12125551234',
    },
    {
      icon: <MapPin className="text-aura-gold" size={24} />,
      title: 'Location',
      details: 'New York, NY',
      link: '#',
    },
  ];

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
    <section id="contact" className="section py-20 bg-aura-darkGreen" ref={sectionRef}>
      <div className="container-custom">
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title" variants={itemVariants}>
            Get in <span className="text-aura-gold">Touch</span>
          </motion.h2>
          <motion.p className="max-w-3xl mx-auto text-lg text-gray-300 mb-12" variants={itemVariants}>
            Ready to elevate your brand with cinematic storytelling? Let's discuss your project.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Information */}
          <motion.div
            className="lg:col-span-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <div className="bg-aura-black rounded-lg p-8 h-full">
              <motion.h3 
                className="text-2xl font-serif font-bold text-white mb-6"
                variants={itemVariants}
              >
                Contact Information
              </motion.h3>
              
              <motion.div className="space-y-6" variants={containerVariants}>
                {contactInfo.map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start"
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                  >
                    <div className="mr-4 mt-1">{item.icon}</div>
                    <div>
                      <h4 className="text-aura-gold font-medium mb-1">{item.title}</h4>
                      <a 
                        href={item.link} 
                        className="text-gray-300 hover:text-white transition-colors duration-300"
                      >
                        {item.details}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div 
                className="mt-12"
                variants={itemVariants}
              >
                <h4 className="text-lg font-serif font-bold text-aura-gold mb-4">Business Hours</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 2:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.div 
              className="bg-aura-black rounded-lg p-8"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-serif font-bold text-white mb-6">Send Us a Message</h3>
              
              {isSubmitted ? (
                <motion.div 
                  className="flex flex-col items-center justify-center text-center h-80"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-16 h-16 rounded-full bg-aura-gold/20 flex items-center justify-center mb-4">
                    <Check className="text-aura-gold" size={32} />
                  </div>
                  <h4 className="text-xl font-serif font-bold text-aura-gold mb-2">Thank You!</h4>
                  <p className="text-gray-300 max-w-md">
                    Your message has been sent successfully. We'll get back to you shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-300 mb-2">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-aura-darkGreen border border-aura-gold/30 rounded-sm text-white focus:border-aura-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-300 mb-2">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-aura-darkGreen border border-aura-gold/30 rounded-sm text-white focus:border-aura-gold focus:outline-none"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="phone" className="block text-gray-300 mb-2">Phone (Optional)</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-aura-darkGreen border border-aura-gold/30 rounded-sm text-white focus:border-aura-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-gray-300 mb-2">Subject</label>
                      <select
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-aura-darkGreen border border-aura-gold/30 rounded-sm text-white focus:border-aura-gold focus:outline-none"
                      >
                        <option value="">Select a subject</option>
                        <option value="Photography">Photography</option>
                        <option value="Cinematography">Cinematography</option>
                        <option value="Brand Identity">Brand Identity</option>
                        <option value="Web Design">Web Design</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-300 mb-2">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-aura-darkGreen border border-aura-gold/30 rounded-sm text-white focus:border-aura-gold focus:outline-none"
                    ></textarea>
                  </div>
                  
                  <motion.button
                    type="submit"
                    className="btn btn-primary flex items-center justify-center"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isSubmitting ? (
                      <span className="inline-block w-5 h-5 border-2 border-aura-black border-t-transparent rounded-full animate-spin mr-2"></span>
                    ) : (
                      <Send size={18} className="mr-2" />
                    )}
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;