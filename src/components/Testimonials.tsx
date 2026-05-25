import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface TestimonialsProps {
  isDark: boolean;
}

interface TestimonialItem {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatarBg: string;
  avatarText: string;
  initials: string;
}

export default function Testimonials({}: TestimonialsProps) {
  const reviews: TestimonialItem[] = [
    {
      name: 'Liam Carter',
      role: 'Founder & CEO',
      company: 'ZenithSaaS',
      quote: 'CodeArc revamped our central React web application in 6 weeks, helping us raise our $4.2M Series A. The interface layout is breathtakingly responsive and clean.',
      avatarBg: 'from-brand-indigo to-brand-blue',
      avatarText: 'text-white',
      initials: 'LC',
    },
    {
      name: 'Sophia Chen',
      role: 'Head of Product',
      company: 'ApexPay',
      quote: 'The Android mobile ordering application they delivered was robust and elegant. The spring physics animations feel incredibly tactile, and mobile conversions spiked by 28%.',
      avatarBg: 'from-brand-cyan to-brand-blue',
      avatarText: 'text-white',
      initials: 'SC',
    },
    {
      name: 'Marcus Vance',
      role: 'Chief Technology Officer',
      company: 'CloudSync Inc.',
      quote: 'They constructed a secure cloud server API backend that reduced our database response latency to under 30ms for both our web and Android platforms. True masters of code.',
      avatarBg: 'from-brand-indigo to-brand-magenta',
      avatarText: 'text-white',
      initials: 'MV',
    }
  ];

  return (
    <section id="testimonials" className="py-24 md:py-36 relative overflow-hidden transition-colors duration-300">
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-brand-indigo/5 blur-blob" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-brand-indigo/10 border border-brand-indigo/25 text-brand-indigo tracking-wider uppercase inline-block mb-5">
              Partnerships
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6.5xl font-black tracking-tight leading-none text-white"
          >
            What Founders Say.
          </motion.h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {reviews.map((rev, index) => (
            <motion.div
              key={rev.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              whileHover={{ y: -6 }}
              className="rounded-3xl p-8 shadow-2xl relative overflow-hidden bg-[#090915]/50 border border-white/5 hover:border-brand-indigo/25 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="absolute inset-0 bg-grid-field opacity-[0.02] pointer-events-none" />

              {/* Quote Mark */}
              <Quote className="absolute top-6 right-8 w-10 h-10 opacity-5 text-white" />

              {/* Quote text */}
              <p className="text-sm leading-relaxed mb-8 font-medium text-gray-300">
                "{rev.quote}"
              </p>

              {/* Founder Avatar & Metadata */}
              <div className="flex items-center gap-4">
                {/* Gradient Avatar */}
                <div className={`w-11 h-11 rounded-full bg-gradient-to-tr ${rev.avatarBg} flex items-center justify-center font-bold text-sm select-none ${rev.avatarText}`}>
                  {rev.initials}
                </div>
                
                <div className="text-left">
                  <h4 className="text-sm font-bold tracking-tight text-white">
                    {rev.name}
                  </h4>
                  <p className="text-[9px] uppercase font-black tracking-widest mt-1 text-gray-500">
                    {rev.role}, <span className="text-brand-indigo">{rev.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
