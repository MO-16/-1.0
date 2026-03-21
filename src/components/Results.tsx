import { ExternalLink, Palette, Type, Layout, Sparkles, Copy, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export interface AnalysisResult {
  colors: string[];
  fonts: string[];
  style: string;
  layout: string;
  advice: string;
  inspirationLinks: { title: string; url: string }[];
}

interface ResultsProps {
  result: AnalysisResult;
  imageUrl: string;
}

export default function Results({ result, imageUrl }: ResultsProps) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const getHostname = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return 'رابط خارجي';
    }
  };

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full max-w-6xl mx-auto mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 pb-20"
    >
      {/* Left Column: Original Image & Moodboard Elements */}
      <div className="lg:col-span-5 space-y-6">
        <motion.div variants={itemVariants} className="glass-panel rounded-3xl p-4">
          <div className="relative aspect-auto rounded-2xl overflow-hidden bg-black/50 border border-white/5">
            <img src={imageUrl} alt="Uploaded Design" className="w-full h-auto object-contain max-h-[500px]" />
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-medium text-white/80 border border-white/10">
              التصميم الأصلي
            </div>
          </div>
        </motion.div>

        {/* Colors */}
        <motion.div variants={itemVariants} className="glass-panel rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400">
              <Palette className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-semibold text-white">الألوان اللي تضبط معك</h3>
          </div>
          <div className="flex flex-wrap gap-4">
            {(result.colors || []).map((color, idx) => (
              <button
                key={idx}
                onClick={() => copyToClipboard(color)}
                className="group relative flex flex-col items-center gap-2 transition-transform hover:scale-105"
              >
                <div
                  className="w-14 h-14 rounded-2xl shadow-lg border border-white/10 flex items-center justify-center"
                  style={{ backgroundColor: color }}
                >
                  {copiedColor === color ? (
                    <Check className="w-5 h-5 text-white drop-shadow-md" />
                  ) : (
                    <Copy className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
                  )}
                </div>
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">{color}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Typography */}
        <motion.div variants={itemVariants} className="glass-panel rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400">
              <Type className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-semibold text-white">الخطوط المقترحة</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {(result.fonts || []).map((font, idx) => (
              <div key={idx} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-gray-200">
                {font}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Column: Analysis & Inspiration */}
      <div className="lg:col-span-7 space-y-6">
        {/* Style & Layout Analysis */}
        <motion.div variants={itemVariants} className="glass-panel rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full" />
          
          <div className="space-y-8 relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-3 text-blue-400">
                <Sparkles className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-white">وش جو التصميم؟ (الستايل)</h3>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg">{result.style}</p>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div>
              <div className="flex items-center gap-3 mb-3 text-sky-400">
                <Layout className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-white">توزيع العناصر (Layout)</h3>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg">{result.layout}</p>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5">
              <h3 className="text-blue-300 font-semibold mb-2 flex items-center gap-2">
                نصيحة أخوية:
              </h3>
              <p className="text-blue-100/80 leading-relaxed">{result.advice}</p>
            </div>
          </div>
        </motion.div>

        {/* Inspiration Links */}
        <motion.div variants={itemVariants} className="glass-panel rounded-3xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            تغذية بصرية (روابط بتفيدك)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(result.inspirationLinks || []).map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300"
              >
                <h4 className="text-gray-200 font-medium mb-4 group-hover:text-blue-300 transition-colors line-clamp-2">
                  {link.title}
                </h4>
                <div className="flex items-center justify-between text-sm text-gray-500 group-hover:text-blue-400">
                  <span className="truncate max-w-[80%]">{getHostname(link.url)}</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
