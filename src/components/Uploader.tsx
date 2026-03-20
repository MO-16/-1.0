import { UploadCloud } from 'lucide-react';
import { motion } from 'motion/react';
import React, { useCallback, useState } from 'react';

interface UploaderProps {
  onUpload: (file: File) => void;
}

export default function Uploader({ onUpload }: UploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && validateFile(file)) {
        onUpload(file);
      }
    },
    [onUpload]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && validateFile(file)) {
        onUpload(file);
      }
    },
    [onUpload]
  );

  const validateFile = (file: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('معليش، ندعم بس صيغ JPG, PNG, WebP');
      return false;
    }
    return true;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full max-w-2xl mx-auto mt-12"
    >
      <div className="relative w-full h-96 rounded-3xl overflow-hidden p-[2px] group">
        {/* Animated Border Light */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-100%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_75%,#38bdf8_100%)] opacity-70 group-hover:opacity-100 transition-opacity duration-300"
        />
        
        <label
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative flex flex-col items-center justify-center w-full h-full rounded-[22px] transition-all duration-300 cursor-pointer overflow-hidden z-10 ${
            isDragging
              ? 'bg-blue-900/40'
              : 'bg-slate-950/90 hover:bg-slate-900/90'
          }`}
        >
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-black/40" />
        
        <motion.div
          animate={{ y: isDragging ? -10 : 0 }}
          className="flex flex-col items-center justify-center pt-5 pb-6 z-10"
        >
          <div className="p-4 rounded-full bg-white/5 mb-4 group-hover:scale-110 transition-transform duration-300">
            <UploadCloud className="w-10 h-10 text-blue-400" />
          </div>
          <p className="mb-2 text-xl font-semibold text-white">
            اسحب تصميم و حطه هنا
          </p>
          <p className="text-sm text-gray-400">
            أو اضغط عشان تختار ملف من جهازك
          </p>
          <div className="mt-6 flex items-center gap-2 text-xs text-gray-500 font-mono">
            <span className="px-2 py-1 rounded-md bg-white/5">JPG</span>
            <span className="px-2 py-1 rounded-md bg-white/5">PNG</span>
            <span className="px-2 py-1 rounded-md bg-white/5">WEBP</span>
          </div>
        </motion.div>
        
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          accept="image/jpeg, image/png, image/webp"
          onChange={handleFileChange}
        />
        </label>
      </div>
    </motion.div>
  );
}
