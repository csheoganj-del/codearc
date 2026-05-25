import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Check, MessageSquare } from 'lucide-react';

interface ContactFormProps {
  prefilledText: string;
}

export default function ContactForm({ prefilledText }: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [budget, setBudget] = useState('2000-5000');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Prefill message if text is passed from Estimator
  useEffect(() => {
    if (prefilledText) {
      setMessage(prefilledText);
    }
  }, [prefilledText]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setSubmitted(true);
    // Simple state reset after display
    setTimeout(() => {
      setName('');
      setEmail('');
      setBudget('2000-5000');
      setMessage('');
      setSubmitted(false);
    }, 8000);
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#78716C] font-semibold block mb-3">
            Contact Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1C1917] leading-tight">
            Tell us about your idea.
          </h2>
          <p className="text-lg text-[#78716C] mt-4 leading-relaxed">
            Have a question or ready to start? Fill out this simple form, and we will get back to you with a friendly, plain-English response within 4 hours.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#FAFAF9] rounded-[32px] p-8 md:p-12 border border-[#E7E5E4] shadow-sm relative overflow-hidden">
          
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-16 flex flex-col items-center justify-center text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 border border-green-200 flex items-center justify-center mb-2">
                <Check className="w-8 h-8" />
              </div>
              <div className="space-y-3 max-w-lg">
                <h3 className="text-2xl font-bold text-[#1C1917]">We received your message, {name}!</h3>
                <p className="text-base text-[#78716C] leading-relaxed">
                  Thank you for reaching out. We are already looking over your idea and will email you back at <strong className="text-[#1C1917]">{email}</strong> within 4 hours.
                </p>
                <p className="text-sm text-stone-500 font-semibold pt-4">
                  No technical jargon. Just plain English.
                </p>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="form-name" className="text-xs font-extrabold uppercase tracking-wider text-[#1C1917]">
                    Your Name
                  </label>
                  <input
                    id="form-name"
                    type="text"
                    required
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl bg-white border border-[#E7E5E4] text-[#1C1917] text-base focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500 transition-all placeholder-stone-400 font-medium"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="form-email" className="text-xs font-extrabold uppercase tracking-wider text-[#1C1917]">
                    Email Address
                  </label>
                  <input
                    id="form-email"
                    type="email"
                    required
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl bg-white border border-[#E7E5E4] text-[#1C1917] text-base focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500 transition-all placeholder-stone-400 font-medium"
                  />
                </div>
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <label htmlFor="form-budget" className="text-xs font-extrabold uppercase tracking-wider text-[#1C1917] block">
                  What is your comfortable budget?
                </label>
                <div className="relative">
                  <select
                    id="form-budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl bg-white border border-[#E7E5E4] text-[#1C1917] text-base focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500 transition-all font-medium appearance-none cursor-pointer"
                  >
                    <option value="under-2000">Under $2,000 (Small projects/simple sites)</option>
                    <option value="2000-5000">$2,000 – $5,000 (Custom systems/apps)</option>
                    <option value="5000-10000">$5,000 – $10,000 (Complete bundles/larger tools)</option>
                    <option value="10000+">Over $10,000 (Enterprise solutions)</option>
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400 font-bold">
                    ▼
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="form-message" className="text-xs font-extrabold uppercase tracking-wider text-[#1C1917]">
                  Tell us about your project in simple words
                </label>
                <textarea
                  id="form-message"
                  required
                  rows={6}
                  placeholder="Example: I want to build a simple mobile app where users can buy coffee from my local shop and earn loyalty points..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl bg-white border border-[#E7E5E4] text-[#1C1917] text-base focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500 transition-all placeholder-stone-400 font-medium resize-none leading-relaxed"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-4.5 rounded-2xl bg-[#1C1917] text-white font-bold text-base hover:bg-stone-800 transition-colors shadow-sm active:scale-[0.99] duration-150 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                Send Message
              </button>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
