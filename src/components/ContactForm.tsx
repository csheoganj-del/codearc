"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Reveal, Magnetic } from './Motion';

const WHATSAPP_NUMBER = '919983721179';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    // Send the message straight to our WhatsApp — no backend required.
    const text = encodeURIComponent(
      `Hi CodeArc! I'm ${name}.\n\n${message}\n\nYou can also reach me at: ${email}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener,noreferrer');

    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSubmitted(false);
    }, 8000);
  };

  const inputClasses =
    'w-full px-5 py-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] text-base focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/15 focus:bg-white transition-all placeholder-slate-400 font-medium';

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#F8FAFC] relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] aspect-square bg-[radial-gradient(circle,_rgba(79,70,229,0.07)_0%,_transparent_70%)] rounded-full pointer-events-none animate-drift-a" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] aspect-square bg-[radial-gradient(circle,_rgba(6,182,212,0.07)_0%,_transparent_70%)] rounded-full pointer-events-none animate-drift-b" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <Reveal className="max-w-3xl mb-14 text-center mx-auto">
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#EEF2FF] text-[#4F46E5] text-xs uppercase tracking-widest font-bold mb-5">
            Contact Us
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
            Tell us about <span className="font-accent text-gradient">your idea.</span>
          </h2>
          <p className="text-lg text-[#475569] mt-4 leading-relaxed">
            Have a question or ready to start? Write to us in plain words and your
            message lands directly on our WhatsApp — we reply fast, in plain English.
          </p>
        </Reveal>

        {/* Form Container */}
        <Reveal delay={0.1}>
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#E2E8F0] shadow-[0_24px_60px_-30px_rgba(15,23,42,0.15)] relative overflow-hidden">

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-16 flex flex-col items-center justify-center text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0] flex items-center justify-center mb-2">
                <Check className="w-8 h-8" />
              </div>
              <div className="space-y-3 max-w-lg">
                <h3 className="text-2xl font-extrabold text-[#0F172A]">Almost there, {name}!</h3>
                <p className="text-base text-[#475569] leading-relaxed">
                  We've opened WhatsApp with your message ready to go — just press
                  send. We'll get back to you shortly.
                </p>
                <p className="text-sm text-[#4F46E5] font-semibold pt-4">
                  No technical jargon. Just plain English.
                </p>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-7">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="form-name" className="text-xs font-extrabold uppercase tracking-wider text-[#0F172A]">
                    Your Name
                  </label>
                  <input
                    id="form-name"
                    type="text"
                    required
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClasses}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="form-email" className="text-xs font-extrabold uppercase tracking-wider text-[#0F172A]">
                    Email Address
                  </label>
                  <input
                    id="form-email"
                    type="email"
                    required
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="form-message" className="text-xs font-extrabold uppercase tracking-wider text-[#0F172A]">
                  Tell us about your project in simple words
                </label>
                <textarea
                  id="form-message"
                  required
                  rows={6}
                  placeholder="Example: I want to build a simple mobile app where users can buy coffee from my local shop and earn loyalty points..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${inputClasses} resize-none leading-relaxed`}
                />
              </div>

              {/* Submit — straight to WhatsApp */}
              <Magnetic strength={0.15}>
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#16A34A] to-[#15803D] text-white font-bold text-base hover:shadow-[0_16px_40px_-12px_rgba(22,163,74,0.55)] transition-all active:scale-[0.99] duration-150 flex items-center justify-center gap-2.5"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.668-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.197 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.064 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Send on WhatsApp
                </button>
              </Magnetic>

              <p className="text-center text-sm text-[#64748B] font-medium">
                Prefer email? Write to us at{' '}
                <a href="mailto:hello@codearc.dev" className="text-[#4F46E5] font-semibold hover:underline">
                  hello@codearc.dev
                </a>{' '}
                or call{' '}
                <a href="tel:+919983721179" className="text-[#4F46E5] font-semibold hover:underline">
                  +91 99837 21179
                </a>
              </p>

            </form>
          )}

        </div>
        </Reveal>

      </div>
    </section>
  );
}
