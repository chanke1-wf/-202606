import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
  total: number;
}

export function StartScreen({ onStart, total }: StartScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col flex-1 items-center justify-center text-center px-4"
    >
      <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mb-8 shadow-inner">
        <Heart className="w-12 h-12 text-rose-400" fill="currentColor" />
      </div>
      
      <h1 className="text-2xl font-bold text-gray-800 mb-4 leading-tight">
        あなたにぴったりな<br />
        <span className="text-rose-500 text-3xl">「ご自愛方法」</span><br />
        見つける診断
      </h1>
      
      <p className="text-gray-500 mb-12 text-sm leading-relaxed">
        今のあなたの"ご自愛バロメーター"を診断し、<br />
        ぴったりのおすすめアクションをご提案します✨
      </p>

      <button
        onClick={onStart}
        className="w-full max-w-xs bg-rose-500 hover:bg-rose-600 text-white font-medium py-4 px-8 rounded-full shadow-lg shadow-rose-200 transition-transform active:scale-95"
      >
        診断をはじめる (全{total}問)
      </button>
    </motion.div>
  );
}
