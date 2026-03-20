import { motion } from 'motion/react';

export default function FluidBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#020617]">
      {/* Deep Navy Orb */}
      <motion.div
        animate={{
          x: [0, 150, -100, 0],
          y: [0, -150, 100, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-15%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-900/30 blur-[140px]"
      />
      
      {/* Dark Blue Orb */}
      <motion.div
        animate={{
          x: [0, -200, 150, 0],
          y: [0, 200, -100, 0],
          scale: [1, 1.4, 0.9, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-indigo-900/30 blur-[160px]"
      />
      
      {/* Subtle Light Blue/Cyan Highlight Orb */}
      <motion.div
        animate={{
          x: [0, 100, -100, 0],
          y: [0, 100, -100, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[30%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-sky-900/20 blur-[120px]"
      />

      {/* NEW: White-Blue Light wrapping around the page (Clockwise) */}
      <motion.div
        animate={{
          x: ['-10vw', '90vw', '90vw', '-10vw', '-10vw'],
          y: ['-10vh', '-10vh', '90vh', '90vh', '-10vh'],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-[20vw] h-[20vw] rounded-full bg-sky-100/10 blur-[80px]"
      />

      {/* NEW: White-Blue Light wrapping around the page (Clockwise, starting opposite) */}
      <motion.div
        animate={{
          x: ['90vw', '-10vw', '-10vw', '90vw', '90vw'],
          y: ['90vh', '90vh', '-10vh', '-10vh', '90vh'],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-[25vw] h-[25vw] rounded-full bg-blue-100/10 blur-[100px]"
      />

      {/* Twinkling Stars Overlay */}
      <motion.div 
        className="absolute inset-0"
        animate={{ opacity: [0.05, 0.25, 0.05] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          backgroundPosition: '0 0'
        }}
      />
      <motion.div 
        className="absolute inset-0"
        animate={{ opacity: [0.03, 0.15, 0.03] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)`,
          backgroundSize: '48px 48px',
          backgroundPosition: '16px 16px'
        }}
      />
      <motion.div 
        className="absolute inset-0"
        animate={{ opacity: [0.08, 0.35, 0.08] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          backgroundPosition: '32px 32px'
        }}
      />
    </div>
  );
}
