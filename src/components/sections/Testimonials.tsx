import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useGSAP } from '../../hooks/useGSAP';

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { gsap } = useGSAP();

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "Elevate Fashion",
      role: "Marketing Director",
      quote: "The AuRa Productions transformed our brand imagery with their stunning photography and video work. Their attention to detail and ability to capture our brand essence exceeded our expectations.",
      image: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      stars: 5
    },
    {
      name: "Michael Chen",
      company: "TechNova",
      role: "CEO",
      quote: "Working with The AuRa Productions on our product launch video was a game-changer. Their creativity and technical excellence helped us communicate our complex product in a compelling, accessible way.",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      stars: 5
    },
    {
      name: "Olivia Martinez",
      company: "Bloom Restaurants",
      role: "Brand Manager",
      quote: "The rebranding project by AuRa Productions revolutionized how customers perceive our restaurant chain. Their holistic approach to visual identity has been instrumental in our recent growth.",
      image: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      stars: 5
    }
  ];

  useEffect(() => {
    if (!gsap || !sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      }
    });

    tl.from('.testimonials-title', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    });

    tl.from('.testimonials-subtitle', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.4');
  }, [gsap]);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="section py-20 bg-aura-black" ref={sectionRef}>
      <div className="container-custom">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="testimonials-title section-title">
            Client <span className="text-aura-gold">Testimonials</span>
          </h2>
          <p className="testimonials-subtitle max-w-3xl mx-auto text-lg text-gray-300 mb-12">
            Hear what our clients have to say about their experience working with The AuRa Productions.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div className="flex transition-all duration-700 ease-in-out" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <motion.div
                    className="bg-aura-darkGreen p-8 rounded-lg shadow-gold-lg border border-aura-gold/20"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center mb-8">
                      <div className="w-20 h-20 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-6 border-2 border-aura-gold">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-serif font-bold text-white">{testimonial.name}</h3>
                        <p className="text-aura-gold">{testimonial.role}, {testimonial.company}</p>
                        <div className="flex mt-2">
                          {Array(testimonial.stars).fill(null).map((_, i) => (
                            <Star key={i} size={16} className="text-aura-gold fill-aura-gold" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <blockquote className="text-gray-300 text-lg italic">"{testimonial.quote}"</blockquote>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 md:-translate-x-full p-3 rounded-full bg-aura-darkGreen text-aura-gold border border-aura-gold/30 hover:bg-aura-gold hover:text-aura-black transition-colors duration-300 focus:outline-none"
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 md:translate-x-full p-3 rounded-full bg-aura-darkGreen text-aura-gold border border-aura-gold/30 hover:bg-aura-gold hover:text-aura-black transition-colors duration-300 focus:outline-none"
            onClick={nextTestimonial}
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'bg-aura-gold w-6' : 'bg-aura-gold/30'
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;