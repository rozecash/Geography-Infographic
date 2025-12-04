import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Mountain, Snowflake, Layers, Tractor, Users, ArrowDown, Building2, Droplets } from 'lucide-react';

/**
 * Hook for scroll animations.
 * Returns a ref to attach to an element, and a boolean indicating if it is visible.
 */
const useOnScreen = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); // Only trigger once
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, isVisible];
};

/**
 * Reusable Bento Card Component
 */
const BentoCard = ({ children, className = "", delay = 0 }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-3xl bg-neutral-900/80 border border-white/10 backdrop-blur-md p-6 transition-all duration-700 ease-out transform hover:scale-[1.02] hover:bg-neutral-800/80 hover:border-white/20 shadow-xl ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const App = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500 selection:text-white font-sans">
      {/* Background Gradient Orbs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Header / Hero Section */}
        <header className="mb-16 text-center space-y-6 pt-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-purple-300 mb-4 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            CGC1W Landform Regions Project
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500 tracking-tight leading-tight">
            Great Lakes – <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              St. Lawrence Lowlands
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Canada's industrial and agricultural heartland. A deep dive into the physical and human geography of the nation's most populated region.
          </p>

          <div className="flex justify-center pt-8">
            <ArrowDown className="text-gray-500 animate-bounce w-8 h-8" />
          </div>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
          
          {/* 1. Location Card (Wide) */}
          <BentoCard className="md:col-span-2 lg:col-span-2 row-span-1 bg-gradient-to-br from-neutral-900 to-neutral-900">
            <div className="h-full flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="p-3 bg-blue-500/20 rounded-2xl w-fit text-blue-400">
                  <MapPin size={24} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Location</span>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-semibold text-white mb-2">Ontario & Quebec</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Located in the southern parts of these two provinces. This is the most southerly landform region in Canada.
                </p>
              </div>
              {/* Abstract Map Visual */}
              <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
                 <MapPin size={150} />
              </div>
            </div>
          </BentoCard>

          {/* 2. Formation / Glaciation (Tall) */}
          <BentoCard className="md:col-span-1 lg:col-span-1 row-span-2 bg-gradient-to-b from-neutral-900 to-indigo-900/20" delay={100}>
            <div className="h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                 <div className="p-3 bg-cyan-500/20 rounded-2xl text-cyan-400">
                  <Snowflake size={24} />
                 </div>
                 <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Formation</span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">Shaped by Ice</h3>
              
              <div className="space-y-4 text-gray-400 text-sm flex-grow">
                <p>
                  <strong className="text-white">Glaciation</strong> was the most important process.
                </p>
                <p>
                  Massive retreating glaciers created ancient lakes. As they melted, they deposited thick layers of clay and sand at the bottom.
                </p>
                <div className="mt-4 p-4 rounded-xl bg-black/40 border border-white/5">
                   <p className="text-xs text-cyan-200">
                     "The glaciers left behind thick deposits... forming the present flat plains."
                   </p>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* 3. Geology (Standard) */}
          <BentoCard className="md:col-span-1 lg:col-span-1 bg-neutral-900" delay={200}>
            <div className="flex flex-col h-full justify-between">
              <div className="flex justify-between items-start">
                 <div className="p-3 bg-amber-500/20 rounded-2xl text-amber-400">
                  <Layers size={24} />
                 </div>
                 <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Geology</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mt-4">Sedimentary Rock</h3>
                <p className="text-gray-400 text-xs mt-2">
                  Deep layers of ancient sedimentary bedrock covered by glacial soil.
                </p>
              </div>
            </div>
          </BentoCard>

          {/* 4. Population (Large Highlight) */}
          <BentoCard className="md:col-span-3 lg:col-span-2 row-span-2 bg-gradient-to-tr from-purple-900/40 to-neutral-900 border-purple-500/20" delay={300}>
             <div className="h-full flex flex-col justify-center items-center text-center relative z-10">
                <div className="p-4 bg-purple-500/20 rounded-full mb-6 text-purple-400">
                  <Users size={40} />
                </div>
                <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-2">
                  60%
                </h2>
                <h3 className="text-xl md:text-2xl font-medium text-purple-200 mb-6">
                  of Canada's Population
                </h3>
                <div className="grid grid-cols-2 gap-4 text-left w-full max-w-md bg-black/20 p-6 rounded-2xl backdrop-blur-sm border border-white/5">
                   <div>
                     <div className="flex items-center gap-2 mb-1 text-white font-bold">
                       <Building2 size={16} /> Cities
                     </div>
                     <p className="text-xs text-gray-400">Ideal for massive urban centers like Toronto & Montreal.</p>
                   </div>
                   <div>
                     <div className="flex items-center gap-2 mb-1 text-white font-bold">
                       <ArrowDown size={16} className="rotate-[-45deg]" /> Transport
                     </div>
                     <p className="text-xs text-gray-400">Flat land makes building roads & railways easy.</p>
                   </div>
                </div>
             </div>
             {/* Decorative blob */}
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px] -z-0" />
          </BentoCard>

          {/* 5. Landscape Features (Standard) */}
          <BentoCard className="md:col-span-1 lg:col-span-1" delay={400}>
            <div className="h-full flex flex-col justify-between">
               <div className="flex justify-between items-start">
                  <div className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-400">
                    <Mountain size={24} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Terrain</span>
               </div>
               <div className="mt-4">
                  <h3 className="text-lg font-bold text-white">Flat & Rolling</h3>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="px-2 py-1 bg-white/5 rounded-md text-xs text-gray-300">Plains</span>
                    <span className="px-2 py-1 bg-white/5 rounded-md text-xs text-gray-300">Hills</span>
                    <span className="px-2 py-1 bg-white/5 rounded-md text-xs text-gray-300">Lakes</span>
                  </div>
               </div>
            </div>
          </BentoCard>

           {/* 6. Water Features (Small) */}
           <BentoCard className="md:col-span-1 lg:col-span-1 bg-blue-900/10" delay={450}>
             <div className="flex flex-col h-full justify-center items-center text-center">
                <Droplets size={32} className="text-blue-400 mb-3" />
                <h3 className="font-bold text-white">Ancient Lakes</h3>
                <p className="text-xs text-gray-400 mt-1">Formed by melting glaciers</p>
             </div>
           </BentoCard>

          {/* 7. Agriculture (Wide) */}
          <BentoCard className="md:col-span-2 lg:col-span-2 bg-gradient-to-r from-neutral-900 to-green-900/20" delay={500}>
             <div className="flex flex-col md:flex-row items-center gap-6 h-full">
                <div className="flex-shrink-0 p-6 bg-green-500/10 rounded-full border border-green-500/20">
                   <Tractor size={48} className="text-green-400" />
                </div>
                <div className="flex-grow">
                   <h3 className="text-3xl font-bold text-white mb-2">Agricultural Powerhouse</h3>
                   <p className="text-gray-300 text-sm leading-relaxed mb-4">
                     Excellent for farming due to rich, fertile soils and flat topography. It contains some of the best farmland in all of Canada.
                   </p>
                   <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-green-500 w-[90%] rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                   </div>
                   <div className="mt-2 text-right text-xs text-green-400 font-mono">Fertility Rating: High</div>
                </div>
             </div>
          </BentoCard>

        </div>

        {/* Footer */}
        <footer className="mt-20 border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
          <p>Designed for CGC1W • December 2025</p>
        </footer>

      </div>
    </div>
  );
};

export default App;