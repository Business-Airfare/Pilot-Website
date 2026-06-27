import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Info, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * MercuryHero - A high-end hero section for a banking application.
 * Recreated from the provided HTML capture with a focus on elegance and interactivity.
 */

interface MarketingTooltipProps {
  isOpen: boolean;
  onToggleOptOut: () => void;
  isOptedOut: boolean;
}
const MarketingTooltip = ({
  isOpen,
  onToggleOptOut,
  isOptedOut
}: MarketingTooltipProps) => {
  return <AnimatePresence>
      {isOpen && <motion.div initial={{
      opacity: 0,
      y: 10,
      scale: 0.95
    }} animate={{
      opacity: 1,
      y: 0,
      scale: 1
    }} exit={{
      opacity: 0,
      y: 10,
      scale: 0.95
    }} transition={{
      duration: 0.2,
      ease: "easeOut"
    }} className="absolute top-full left-0 mt-4 z-20 w-full max-w-[411px]">
          <div className="bg-white rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 flex flex-col gap-4 text-left">
            <p className="text-[13px] leading-relaxed text-slate-900 font-medium">
              Mercury will occasionally send you emails with offers, news, and promotions. 
              <span className="block mt-1 font-bold">Check this box if you do not want to receive them.</span>
            </p>
            
            <button type="button" onClick={onToggleOptOut} className="flex items-center gap-3 group cursor-pointer w-fit">
              <div className={cn("w-5 h-5 rounded border transition-all duration-200 flex items-center justify-center", isOptedOut ? "bg-slate-900 border-slate-900" : "bg-slate-50 border-slate-200 group-hover:bg-slate-100")}>
                {isOptedOut && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
              </div>
              <span className="text-[13px] font-bold text-slate-900">Opt out</span>
            </button>
          </div>
        </motion.div>}
    </AnimatePresence>;
};
export const MercuryHero = () => {
  const [email, setEmail] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(false);
  const [isOptedOut, setIsOptedOut] = React.useState(false);
  const [showMarketingTooltip, setShowMarketingTooltip] = React.useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with:', {
      email,
      isOptedOut
    });
  };
  return <section className="w-full min-h-[80vh] flex flex-col items-center justify-center px-6 py-20 bg-white selection:bg-slate-900 selection:text-white">
      <div className="max-w-4xl w-full flex flex-col items-center text-center">
        {/* Headline */}
        <motion.h1 initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }} className="text-[clamp(2.5rem,8vw,5.5rem)] font-normal tracking-[-0.03em] leading-[1.05] text-slate-950 mb-8">
          Radically different <br /> banking
        </motion.h1>

        {/* Subheader */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 0.1,
        ease: [0.16, 1, 0.3, 1]
      }} className="max-w-xl mb-12">
          <p className="text-[17px] sm:text-[19px] leading-relaxed text-slate-600 font-normal text-balance">
            Apply online in 10 minutes to experience banking
            <a href="#" onClick={e => e.preventDefault()} className="inline-flex items-baseline px-0.5 align-top">
              <sup className="text-[10px] font-medium text-slate-400 hover:text-slate-900 transition-colors">1</sup>
            </a>
            &nbsp;unlike anything that’s come before.
          </p>
        </motion.div>

        {/* Email Signup Form */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 0.2,
        ease: [0.16, 1, 0.3, 1]
      }} className="relative w-full max-w-[448px]">
          <form onSubmit={handleSubmit} className="w-full group">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className={cn("relative flex-1 w-full h-14 min-h-[56px] flex items-center gap-2 px-1.5 rounded-full border border-slate-200 transition-all duration-300", "bg-slate-50/50 backdrop-blur-sm", isFocused ? "border-slate-400 bg-white shadow-sm ring-1 ring-slate-400/10" : "hover:border-slate-300 hover:bg-slate-100/50")}>
                <label htmlFor="email-input" className="sr-only">Enter your email</label>
                <input id="email-input" type="email" value={email} onChange={e => setEmail(e.target.value)} onFocus={() => {
                setIsFocused(true);
                setShowMarketingTooltip(true);
              }} onBlur={() => {
                setIsFocused(false);
                // Keep it open for a bit so users can interact with it
                // but usually in a production app we'd handle this with a container ref
              }} placeholder="Enter your email" className="flex-1 h-full bg-transparent outline-none px-4 text-[15px] font-medium text-slate-900 placeholder:text-slate-400" autoComplete="email" />
                
                <button type="submit" className="hidden sm:inline-flex h-11 px-6 rounded-full bg-slate-950 text-white text-[14px] font-bold items-center justify-center transition-all duration-200 hover:bg-slate-800 active:scale-[0.98] whitespace-nowrap">
                  Open account
                </button>
              </div>

              {/* Mobile Submit Button */}
              <button type="submit" className="sm:hidden w-full h-14 rounded-full bg-slate-950 text-white text-[15px] font-bold flex items-center justify-center transition-all duration-200 hover:bg-slate-800 active:scale-[0.98]">
                Open account
              </button>
            </div>

            {/* Info Icon / Tooltip Trigger */}
            <div className="mt-3 flex justify-start sm:justify-start">
               <button type="button" onClick={() => setShowMarketingTooltip(!showMarketingTooltip)} className="text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1.5 px-2 py-1">
                 <Info className="w-3.5 h-3.5" />
                 <span className="text-[11px] font-bold uppercase tracking-wider">Marketing Preferences</span>
               </button>
            </div>

            {/* Marketing Preferences Tooltip */}
            <MarketingTooltip isOpen={showMarketingTooltip} isOptedOut={isOptedOut} onToggleOptOut={() => setIsOptedOut(!isOptedOut)} />
          </form>
        </motion.div>
      </div>

      {/* Subtle Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[15%] w-[400px] h-[400px] bg-slate-100/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] bg-slate-50 rounded-full blur-[100px]" />
      </div>
    </section>;
};