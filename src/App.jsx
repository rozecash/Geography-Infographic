import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Mountain, Snowflake, Layers, Tractor, Users, ArrowDown, Building2, Droplets, Globe, History, TrendingUp } from 'lucide-react';

/**
 * Hook for scroll animations.
 */
const useOnScreen = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
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
      className={`relative overflow-hidden rounded-3xl bg-neutral-900/80 border border-white/10 backdrop-blur-md transition-all duration-700 ease-out transform hover:scale-[1.02] hover:border-white/20 shadow-xl group ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative z-10 p-6 h-full">
        {children}
      </div>
    </div>
  );
};

/**
 * New Detail Section Component for Large Images
 */
const DetailSection = ({ title, subtitle, content, image, align = 'left', icon: Icon }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.2 });

  return (
    <div ref={ref} className={`min-h-[60vh] flex flex-col md:flex-row items-center gap-12 py-16 ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
      {/* Text Content */}
      <div className={`flex-1 space-y-6 ${align === 'right' ? 'md:order-2' : ''}`}>
        <div className="inline-flex items-center gap-2 text-blue-400 font-bold uppercase tracking-widest text-sm">
          {Icon && <Icon size={16} />}
          <span>{subtitle}</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">{title}</h2>
        <div className="w-20 h-1 bg-blue-500 rounded-full" />
        <p className="text-lg text-gray-300 leading-relaxed">
          {content}
        </p>
      </div>

      {/* Image Content */}
      <div className={`flex-1 w-full ${align === 'right' ? 'md:order-1' : ''}`}>
        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group max-h-[500px]">
          <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>
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
        <header className="mb-20 text-center space-y-6 pt-10 min-h-[60vh] flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-purple-300 mb-4 mx-auto animate-fade-in-up">
            <Globe size={12} />
            CGC1W Landform Regions Project
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500 tracking-tight leading-tight">
            Great Lakes – <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              St. Lawrence Lowlands
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            The industrial and agricultural heartland. A region defined by fertile soil, water, and urbanization.
          </p>

          <div className="flex justify-center pt-12">
            <ArrowDown className="text-gray-500 animate-bounce w-8 h-8" />
          </div>
        </header>

        {/* 1. OVERVIEW: Bento Grid Layout */}
        <div className="mb-24">
          <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-blue-500 pl-4">Quick Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
            
            {/* Location Card */}
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
              </div>
            </BentoCard>

            {/* Formation Summary */}
            <BentoCard className="md:col-span-1 lg:col-span-1 row-span-2 bg-gradient-to-b from-neutral-900 to-indigo-900/20" delay={100}>
              <div className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                     <div className="p-3 bg-cyan-500/20 rounded-2xl text-cyan-400">
                      <Snowflake size={24} />
                     </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Shaped by Ice</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Glaciation was the key process. Massive retreating glaciers created big ancient lakes.
                  </p>
                </div>
              </div>
            </BentoCard>

            {/* Geology Summary */}
            <BentoCard className="md:col-span-1 lg:col-span-1 bg-neutral-900" delay={200}>
              <div className="flex flex-col h-full justify-between">
                <div className="flex justify-between items-start">
                   <div className="p-3 bg-amber-500/20 rounded-2xl text-amber-400">
                    <Layers size={24} />
                   </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mt-4">Sedimentary Rock</h3>
                  <p className="text-gray-400 text-xs mt-2">
                    Deep layers of ancient sedimentary bedrock covered by glacial soil.
                  </p>
                </div>
              </div>
            </BentoCard>

            {/* Population Summary */}
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
                </div>
            </BentoCard>

            {/* Landscape Features */}
            <BentoCard className="md:col-span-1 lg:col-span-1 bg-neutral-900" delay={400}>
              <div className="h-full flex flex-col justify-between">
                 <div className="flex justify-between items-start">
                    <div className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-400">
                      <Mountain size={24} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Terrain</span>
                 </div>
                 <div className="mt-4">
                    <h3 className="text-lg font-bold text-white">Flat & Rolling</h3>
                    <p className="text-xs text-gray-400 mt-2">
                      Primary features are flat plains, gently rolling hills, and large lakes.
                    </p>
                 </div>
              </div>
            </BentoCard>

             {/* Water Features */}
             <BentoCard className="md:col-span-1 lg:col-span-1 bg-blue-900/10" delay={450}>
               <div className="flex flex-col h-full justify-center items-center text-center">
                  <Droplets size={32} className="text-blue-400 mb-3" />
                  <h3 className="font-bold text-white">Ancient Lakes</h3>
                  <p className="text-xs text-gray-400 mt-1">Formed by melting glaciers</p>
               </div>
             </BentoCard>

            {/* Agriculture */}
            <BentoCard className="md:col-span-2 lg:col-span-2 bg-gradient-to-r from-neutral-900 to-green-900/20" delay={500}>
               <div className="flex flex-col md:flex-row items-center gap-6 h-full">
                  <div className="flex-shrink-0 p-6 bg-green-500/10 rounded-full border border-green-500/20">
                     <Tractor size={48} className="text-green-400" />
                  </div>
                  <div className="flex-grow">
                     <h3 className="text-3xl font-bold text-white mb-2">Agricultural Powerhouse</h3>
                     <p className="text-gray-300 text-sm leading-relaxed mb-4">
                       Excellent for farming due to rich, fertile soils and flat landscape.
                     </p>
                     <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                       <div className="h-full bg-green-500 w-[90%] rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                     </div>
                  </div>
               </div>
            </BentoCard>
          </div>
        </div>

        {/* 2. DEEP DIVE SECTIONS */}
        <div className="space-y-24 pb-24">
          
          <div className="text-center">
            <span className="px-4 py-2 rounded-full border border-white/20 text-sm tracking-wider uppercase bg-white/5">Detailed Analysis</span>
          </div>

          {/* Section 1: Formation */}
          <DetailSection 
            title="Glaciation & Landscape"
            subtitle="Formation Process"
            icon={Snowflake}
            align="left"
            image="/hydro.jpg"
            content="Glaciation was the most important process in developing the current landscape. The massive glaciers that retreated from their original places created big ancient lakes through their melting process. The glaciers left behind thick deposits of sand and clay at the lake bottoms which formed the present flat plains and rolling hills."
          />

          {/* Section 2: Geology */}
          <DetailSection 
            title="Geological Structure"
            subtitle="Bedrock & Soil"
            icon={Layers}
            align="right"
            image="/rocks.png"
            content="This region is primarily made of sedimentary rock. The flat clay and sand plains deposited by glaciers cover these deep layers of ancient sedimentary bedrock."
          />

          {/* Section 3: Population */}
          <DetailSection 
            title="Population & Settlement"
            subtitle="Human Geography"
            icon={Users}
            align="left"
            image="/population.png"
            content="Yes, the region contains approximately 60% of Canada's population because it serves as the home for many Canadians. The southernmost part of Canada features flat terrain which enables builders to construct major cities including Toronto and Montreal and establish vital transportation networks through roads and railways. The first settlers arrived in this region because of its fertile agricultural soil which they used to establish their settlement."
          />

        </div>

        {/* Footer */}
        <footer className="mt-12 border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
          <p>Designed for CGC1W • December 2025</p>
        </footer>

      </div>
    </div>
  );
};

export default App;