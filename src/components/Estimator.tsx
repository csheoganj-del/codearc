import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layout, Shield, CreditCard, Zap, CheckCircle } from 'lucide-react';

interface EstimatorProps {
  onSelectEstimate: (estimateText: string) => void;
}

type PlatformType = 'website' | 'webapp' | 'android' | 'bundle';

export default function Estimator({ onSelectEstimate }: EstimatorProps) {
  const [platform, setPlatform] = useState<PlatformType>('website');
  const [needLogin, setNeedLogin] = useState<boolean>(false);
  const [needPayments, setNeedPayments] = useState<boolean>(false);
  const [speed, setSpeed] = useState<'standard' | 'rush'>('standard');
  const [applied, setApplied] = useState<boolean>(false);

  // Pricing constants in INR (indicated in simple, honest starter ranges)
  const basePrices: Record<PlatformType, number> = {
    website: 15000,
    webapp: 45000,
    android: 60000,
    bundle: 85000,
  };

  const calculateEstimate = () => {
    let price = basePrices[platform];
    if (needLogin) price += 15000;
    if (needPayments) price += 15000;
    if (speed === 'rush') price *= 1.25;

    const lower = Math.round((price * 0.9) / 1000) * 1000;
    const upper = Math.round((price * 1.1) / 1000) * 1000;
    return { lower, upper };
  };

  const { lower, upper } = calculateEstimate();

  const handleApply = () => {
    const platformLabel: Record<PlatformType, string> = {
      website: 'Simple Website',
      webapp: 'Web Application (Private Portal/System)',
      android: 'Android Mobile App',
      bundle: 'Website + Android App Bundle',
    };

    const detailsText = `I used your estimator and got an estimate of ₹${lower.toLocaleString('en-IN')} - ₹${upper.toLocaleString('en-IN')}. 
- Product: ${platformLabel[platform]}
- Requires Customer Login: ${needLogin ? 'Yes' : 'No'}
- Requires Payments/Store: ${needPayments ? 'Yes' : 'No'}
- Delivery Speed: ${speed === 'rush' ? 'Fast Rush Delivery' : 'Standard Delivery'}

I would like to discuss my project!`;

    onSelectEstimate(detailsText);
    setApplied(true);
    setTimeout(() => setApplied(false), 3000);
  };

  return (
    <section id="estimator" className="py-20 md:py-32 bg-[#FAFAF9] border-t border-[#E7E5E4]">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-xs uppercase tracking-widest text-[#78716C] font-semibold block mb-3">
            Project Estimator
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1C1917] leading-tight">
            Estimate your project in 30 seconds.
          </h2>
          <p className="text-lg text-[#78716C] mt-4 leading-relaxed">
            Wondering about pricing? Toggle the options below to see a friendly starter estimate. No pressure, no sign-up required.
          </p>
        </div>

        {/* Dynamic Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls Left Column */}
          <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-[32px] border border-[#E7E5E4] space-y-8 flex flex-col justify-between">
            
            {/* Step 1: What are we building */}
            <div className="space-y-4">
              <label className="text-sm font-extrabold uppercase tracking-wider text-[#1C1917]">
                1. What would you like us to build?
              </label>
              <div className="grid grid-cols-2 gap-3.5">
                {(['website', 'webapp', 'android', 'bundle'] as PlatformType[]).map((type) => {
                  const labels: Record<PlatformType, string> = {
                    website: 'Website',
                    webapp: 'Web App',
                    android: 'Android App',
                    bundle: 'Web + App Bundle',
                  };
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setPlatform(type)}
                      className={`px-5 py-4 rounded-2xl text-left border text-base font-semibold transition-all duration-300 ${
                        platform === type
                          ? 'border-[#1C1917] bg-[#1C1917] text-white'
                          : 'border-[#E7E5E4] hover:border-stone-400 bg-stone-50/50 text-[#78716C]'
                      }`}
                    >
                      {labels[type]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Special Features */}
            <div className="space-y-4">
              <label className="text-sm font-extrabold uppercase tracking-wider text-[#1C1917] block">
                2. Do you need these special additions?
              </label>
              <div className="space-y-3.5">
                {/* Logins */}
                <button
                  type="button"
                  onClick={() => setNeedLogin(!needLogin)}
                  className={`w-full flex items-center justify-between p-4.5 rounded-2xl border text-left transition-all duration-300 ${
                    needLogin
                      ? 'border-[#1C1917] bg-stone-50 font-semibold text-[#1C1917]'
                      : 'border-[#E7E5E4] bg-transparent text-[#78716C]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 shrink-0" />
                    <div>
                      <span className="font-semibold block text-sm">User Logins & Profiles</span>
                      <span className="text-xs opacity-80 block font-normal">Clients or staff need usernames & passwords to sign in.</span>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                    needLogin ? 'bg-[#1C1917] border-transparent text-white' : 'border-stone-300'
                  }`}>
                    {needLogin && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </button>

                {/* Payments */}
                <button
                  type="button"
                  onClick={() => setNeedPayments(!needPayments)}
                  className={`w-full flex items-center justify-between p-4.5 rounded-2xl border text-left transition-all duration-300 ${
                    needPayments
                      ? 'border-[#1C1917] bg-stone-50 font-semibold text-[#1C1917]'
                      : 'border-[#E7E5E4] bg-transparent text-[#78716C]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 shrink-0" />
                    <div>
                      <span className="font-semibold block text-sm">Online Payments & Shop</span>
                      <span className="text-xs opacity-80 block font-normal">You want to sell items, book tickets, or charge customer cards online.</span>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                    needPayments ? 'bg-[#1C1917] border-transparent text-white' : 'border-stone-300'
                  }`}>
                    {needPayments && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </button>
              </div>
            </div>

            {/* Step 3: Speed */}
            <div className="space-y-4">
              <label className="text-sm font-extrabold uppercase tracking-wider text-[#1C1917] block">
                3. How quickly do you need it?
              </label>
              <div className="flex bg-[#E7E5E4]/40 p-1.5 rounded-2xl gap-2">
                <button
                  type="button"
                  onClick={() => setSpeed('standard')}
                  className={`flex-1 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    speed === 'standard'
                      ? 'bg-white shadow-sm text-[#1C1917]'
                      : 'text-[#78716C] hover:text-[#1C1917]'
                  }`}
                >
                  Standard Pace
                </button>
                <button
                  type="button"
                  onClick={() => setSpeed('rush')}
                  className={`flex-1 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    speed === 'rush'
                      ? 'bg-[#1C1917] text-white shadow-sm'
                      : 'text-[#78716C] hover:text-[#1C1917]'
                  }`}
                >
                  Rush Delivery (+25%)
                </button>
              </div>
            </div>

          </div>

          {/* Pricing Right Column */}
          <div className="lg:col-span-5 bg-[#1C1917] text-white p-8 md:p-10 rounded-[32px] flex flex-col justify-between relative overflow-hidden">
            {/* Background design */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent opacity-60 pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <h3 className="text-xl font-bold tracking-tight text-stone-300">
                Your Estimated Cost
              </h3>
              
              <div className="pt-4 pb-6 border-b border-stone-800">
                <span className="text-4xl md:text-5xl font-black tracking-tight block">
                  ₹{lower.toLocaleString('en-IN')} – ₹{upper.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-stone-400 mt-2 block font-medium">
                  Indicative starter price range (INR)
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-stone-300">Includes all mockups & layout design screens</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-stone-300">Tested thoroughly on real mobile phones</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-stone-300">First 30 days of technical support are free</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-12 space-y-4">
              <button
                type="button"
                onClick={handleApply}
                className="w-full py-4.5 bg-white text-[#1C1917] font-bold text-base rounded-2xl hover:bg-stone-100 transition-colors shadow-lg active:scale-[0.99] duration-150"
              >
                {applied ? '✓ Estimate Copied Below!' : 'Discuss This Estimate'}
              </button>
              
              <p className="text-xs text-stone-400 text-center font-medium">
                *Tapping copies options to the contact form below and scrolls you down automatically.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
