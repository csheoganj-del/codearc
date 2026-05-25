import { motion } from 'framer-motion';
import { ShieldAlert, Layers, Box, Cpu, Compass, HardDrive } from 'lucide-react';

interface LogoStripProps {
  isDark: boolean;
}

export default function LogoStrip({ isDark }: LogoStripProps) {
  const fictionalLogos = [
    { name: 'ApexSaaS', icon: Layers, gradient: 'from-[#6366F1] to-[#3B82F6]' },
    { name: 'Zenith', icon: Box, gradient: 'from-[#06B6D4] to-[#22D3EE]' },
    { name: 'CoreFin', icon: Cpu, gradient: 'from-[#EC4899] to-[#8B5CF6]' },
    { name: 'CloudSync', icon: HardDrive, gradient: 'from-[#10B981] to-[#059669]' },
    { name: 'FinFlow', icon: Compass, gradient: 'from-[#F59E0B] to-[#D97706]' },
    { name: 'VeloDev', icon: ShieldAlert, gradient: 'from-[#EF4444] to-[#B91C1C]' },
  ];

  return (
    <section className="py-14 border-y border-gray-500/5 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
        {/* Caption */}
        <div className="md:w-1/4 text-center md:text-left">
          <p className={`text-xs uppercase font-extrabold tracking-widest ${
            isDark ? 'text-gray-500' : 'text-gray-400'
          }`}>
            Trusted by growing businesses
          </p>
        </div>

        {/* Logos Container */}
        <div className="md:w-3/4 flex flex-wrap items-center justify-center md:justify-end gap-10 md:gap-14">
          {fictionalLogos.map((logo, index) => {
            const IconComponent = logo.icon;
            return (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="flex items-center space-x-1.5 cursor-pointer group"
              >
                <div className="relative">
                  <IconComponent className={`w-5 h-5 transition-all duration-300 ${
                    isDark 
                      ? 'text-gray-500 group-hover:text-white' 
                      : 'text-gray-400 group-hover:text-brand-indigo'
                  } group-hover:scale-110`} />
                  
                  {/* Subtle hover colorful background light */}
                  <span className={`absolute -inset-1 bg-gradient-to-tr ${logo.gradient} rounded-md blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`} />
                </div>
                <span className={`text-sm font-semibold tracking-tight transition-colors duration-300 ${
                  isDark 
                    ? 'text-gray-500 group-hover:text-white' 
                    : 'text-gray-400 group-hover:text-brand-dark'
                }`}>
                  {logo.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
