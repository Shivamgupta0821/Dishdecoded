import { motion } from "motion/react";
import { useEffect } from "react";

import { Sparkles, Apple, Utensils } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center overflow-hidden">
      {/* Simplified background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />

      {/* Simplified animated particles */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-green-400/30 rounded-full"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 1.2,
          ease: "easeOut",
          delay: 0.2 
        }}
        className="text-center relative z-10"
      >
        {/* Main logo container */}
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="relative mb-8"
        >
          {/* Outer glowing ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="w-40 h-40 mx-auto relative"
          >
            <div className="w-full h-full rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-1 shadow-2xl">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                {/* Inner rotating elements */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  className="relative w-28 h-28 rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center shadow-xl"
                >
                  {/* Food icons around the circle */}
                  <div className="absolute inset-0">
                    <Apple className="absolute top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 text-white/80" />
                    <Utensils className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 text-white/80" />
                    <Sparkles className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/80" />
                    <Sparkles className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/80" />
                  </div>
                  
                  {/* Center plate emoji */}
                  <motion.span
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-4xl filter drop-shadow-lg"
                  >
                    🍽️
                  </motion.span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* App name with gradient text */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-5xl font-bold mb-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
        >
          DishDecoded
        </motion.h1>
        
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="text-white/80 text-xl font-medium mb-6"
        >
          AI-Powered Nutrition Tracking
        </motion.p>

        {/* Feature tags */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="flex justify-center gap-3 flex-wrap"
        >
          {["Smart Scanning", "Personalized Goals", "Health Insights"].map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2 + index * 0.1, type: "spring" }}
              className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/70 text-sm"
            >
              {feature}
            </motion.div>
          ))}
        </motion.div>

        {/* Loading indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.6 }}
          className="mt-8"
        >
          <div className="flex justify-center items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
              className="w-2 h-2 bg-green-400 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
              className="w-2 h-2 bg-blue-400 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
              className="w-2 h-2 bg-purple-400 rounded-full"
            />
          </div>
          <p className="text-white/60 text-sm mt-2">Loading your nutrition journey...</p>
        </motion.div>
      </motion.div>
    </div>
  );
}