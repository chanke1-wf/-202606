import { motion } from 'motion/react';

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
      <div className="w-56 h-56 mb-8 rounded-full overflow-hidden shadow-lg border-4 border-white">
        <img 
          src="/master.jpg" 
          alt="ご自愛"
          className="w-full h-full object-cover"
        />
      </div>
      
      <h1 className="text-2xl font-bold text-gray-800 mb-4 leading-tight">
        <span className="text-orange-500 text-3xl">ご自愛マスター診断</span>
      </h1>
      
      <p className="text-gray-500 mb-12 text-sm leading-relaxed">
        今のあなたの"ご自愛バロメーター"を診断し、<br />
        ぴったりのおすすめアクションをご提案します✨
      </p>

      <button
        onClick={onStart}
        className="w-full max-w-xs bg-orange-500 hover:bg-orange-600 text-white font-medium py-4 px-8 rounded-full shadow-lg shadow-orange-200 transition-transform active:scale-95"
      >
        診断をはじめる (全{total}問)
      </button>
    </motion.div>
  );
}
