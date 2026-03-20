import { GoogleGenAI } from '@google/genai';
import { Loader2, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import FluidBackground from './components/FluidBackground';
import Results, { AnalysisResult } from './components/Results';
import Uploader from './components/Uploader';

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleUpload = async (uploadedFile: File) => {
    setFile(uploadedFile);
    setPreviewUrl(URL.createObjectURL(uploadedFile));
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const base64String = await fileToBase64(uploadedFile);
      const base64Data = base64String.split(',')[1];
      const mimeType = uploadedFile.type;

      const prompt = `
أنت خبير تصميم واجهات وهويات بصرية نجدي، تتحدث بلهجة نجدية عفوية وودية.
قم بتحليل هذا التصميم المرفق بدقة. ابحث في الويب عن تصاميم مشابهة في Dribbble و Behance.
أريد النتيجة بصيغة JSON فقط (تأكد من وضعها داخل \`\`\`json و \`\`\`) تحتوي على:
{
  "colors": ["#HEX1", "#HEX2", "#HEX3", "#HEX4"],
  "fonts": ["اسم خط 1", "اسم خط 2"],
  "style": "وصف لأسلوب التصميم بلهجة نجدية (مثلا: تصميم رايق ونظيف...)",
  "layout": "وصف لتخطيط العناصر بلهجة نجدية",
  "advice": "نصيحة أخوية نجدية للمصمم عشان يطور هالتصميم أو يستلهم منه",
  "inspirationLinks": [
    {"title": "عنوان التصميم المشابه", "url": "رابط التصميم من Dribbble أو Behance"}
  ]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          { text: prompt },
        ],
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text;
      
      if (!text) {
        throw new Error('No response from AI');
      }

      // Extract JSON from response
      const jsonMatch = text.match(/```(?:json)?\n([\s\S]*?)\n```/) || text.match(/{[\s\S]*}/);
      if (jsonMatch) {
        const data = JSON.parse(jsonMatch[1] || jsonMatch[0]) as AnalysisResult;
        setResult(data);
      } else {
        throw new Error('Failed to parse JSON from response');
      }
    } catch (err) {
      console.error('Error analyzing image:', err);
      setError('معليش، صار خطأ واحنا نحلل التصميم. جرب مرة ثانية!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center px-4 py-12 sm:px-6 lg:px-8">
      <FluidBackground />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center max-w-3xl mx-auto z-10"
      >
        <div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
          <h1 className="text-4xl font-bold text-sky-400 drop-shadow-[0_0_15px_rgba(56,189,248,0.8)]">
            يا هلا و مرحبا نورت المُلهم يا معلم
          </h1>
        </div>
        <p className="text-xl text-gray-300 leading-relaxed font-medium">
          دليلك السريع للإلهام البصري. ارفع تصميمك وخل المُلهم يضبطك بأفكار وتغذية بصرية على كيف كيفك.
        </p>
      </motion.div>

      {/* Main Content Area */}
      <div className="w-full z-10 flex-1 flex flex-col items-center">
        {!loading && !result && (
          <Uploader onUpload={handleUpload} />
        )}

        {loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-20 flex flex-col items-center justify-center p-12 rounded-3xl glass-panel"
          >
            <Loader2 className="w-12 h-12 text-blue-400 animate-spin mb-6" />
            <h2 className="text-2xl font-semibold text-white mb-2">
              دقايق يا مبدع...
            </h2>
            <p className="text-gray-400 text-lg">
              قاعدين نحلل التفاصيل وندور لك على أشياء تفتح النفس
            </p>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-center max-w-lg"
          >
            <p className="text-lg font-medium">{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-4 px-6 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white text-sm font-medium"
            >
              حاول مرة ثانية
            </button>
          </motion.div>
        )}

        {result && previewUrl && !loading && (
          <div className="w-full flex flex-col items-center">
            <Results result={result} imageUrl={previewUrl} />
            
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={() => {
                setResult(null);
                setFile(null);
                setPreviewUrl(null);
              }}
              className="mt-8 mb-10 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 transition-all duration-300 text-white font-semibold text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-1"
            >
              حلل تصميم ثاني
            </motion.button>
          </div>
        )}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-auto pt-12 pb-6 text-center z-10 w-full"
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-gray-400 text-sm font-medium">
            صُنع بواسطة الأفضل على الإطلاق <span className="text-blue-400 font-bold">محمد</span>
          </p>
          <div className="flex items-center gap-4 mt-2">
            <a href="https://mohscales.framer.ai/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-blue-400 transition-colors flex items-center gap-1">
              موقعي
            </a>
            <a href="https://x.com/H165Mo" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-blue-400 transition-colors flex items-center gap-1">
              𝕏
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
