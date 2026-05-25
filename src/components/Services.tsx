import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, AppWindow, Smartphone, ArrowRight } from 'lucide-react';

interface ServiceItem {
  title: string;
  badge: string;
  description: string;
  purpose: string;
  features: string[];
  icon: React.ElementType;
}

export default function Services() {
  const services: ServiceItem[] = [
    {
      title: 'Websites',
      badge: 'Your Online Front Door',
      description: 'A beautiful, easy-to-read website that tells people who you are, what you do, and how to reach you.',
      purpose: 'Best for: Local shops, family businesses, service providers, and getting found on Google.',
      features: [
        'Works perfectly on phones & tablets',
        'Fast-loading and easy to read',
        'Includes contact info & maps',
        'Simple to update yourself'
      ],
      icon: Monitor,
    },
    {
      title: 'Web Applications',
      badge: 'Your Custom Business Tools',
      description: 'A private tool or portal that runs directly in your internet browser, built to help you run your business.',
      purpose: 'Best for: Booking calendars, customer records, staff portals, and custom order tracking.',
      features: [
        'Secure logins for you & your clients',
        'Calculates & organizes data automatically',
        'Replaces messy Excel sheets',
        'Accessible from anywhere'
      ],
      icon: AppWindow,
    },
    {
      title: 'Android Apps',
      badge: 'Your App in Pockets',
      description: 'A dedicated, high-quality mobile app designed specifically for Android phones and tablets.',
      purpose: 'Best for: Customer loyalty programs, mobile ordering, field worker tools, and offline utility.',
      features: [
        'Smooth and fast to swipe through',
        'Sends notifications directly to phones',
        'Can work even without internet',
        'Designed specifically for touchscreens'
      ],
      icon: Smartphone,
    },
  ];

  return (
    <section id="services" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <span className="text-xs uppercase tracking-widest text-[#78716C] font-semibold block mb-3">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1C1917] leading-tight">
            We build what your business needs to grow. Simply.
          </h2>
          <p className="text-lg md:text-xl text-[#78716C] mt-6 leading-relaxed">
            We don’t confuse you with technical details. Tell us what you want to achieve, and we’ll build the perfect tool for the job.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col bg-[#FAFAF9] rounded-[32px] p-8 md:p-10 border border-[#E7E5E4] hover:shadow-md transition-shadow duration-300"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-[#E7E5E4] mb-8">
                  <Icon className="w-6 h-6 text-[#1C1917]" />
                </div>

                {/* Badge & Title */}
                <span className="text-xs font-bold uppercase tracking-wider text-[#78716C] mb-2">
                  {service.badge}
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-[#1C1917] mb-4">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-base text-[#78716C] leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Purpose */}
                <p className="text-sm font-semibold text-[#1C1917] bg-[#E7E5E4]/30 px-4 py-2.5 rounded-xl mb-8 leading-relaxed">
                  {service.purpose}
                </p>

                {/* Divider */}
                <div className="h-px bg-[#E7E5E4] w-full mb-8" />

                {/* Features */}
                <div className="space-y-3.5 mt-auto">
                  {service.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1C1917] mt-2 shrink-0" />
                      <span className="text-sm text-[#78716C] font-medium leading-tight">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
