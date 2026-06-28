import { motion, AnimatePresence } from 'motion/react';
import { Question } from '../types';

interface QuestionScreenProps {
  question: Question;
  currentIndex: number;
  total: number;
  onAnswer: (score: number) => void;
}

export function QuestionScreen({ question, currentIndex, total, onAnswer }: QuestionScreenProps) {
  const progress = ((currentIndex + 1) / total) * 100;

  return (
    <div className="flex flex-col flex-1 pt-4">
      {/* Progress Bar */}
      <div className="mb-8 px-2">
        <div className="flex justify-between text-xs text-gray-400 mb-2 font-medium">
          <span>Q{currentIndex + 1}</span>
          <span>{total} 問</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-orange-400 h-2 rounded-full"
            initial={{ width: `${(currentIndex / total) * 100}%` }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col"
        >
          <div className="mb-10 text-center px-4 mt-8">
            <h2 className="text-xl font-bold text-gray-800 leading-relaxed whitespace-pre-line">
              {question.text}
            </h2>
          </div>

          <div className="space-y-3 px-2 mt-6 pb-8">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => onAnswer(option.score)}
                className="w-full text-center p-4 rounded-xl bg-white/90 backdrop-blur-sm border border-gray-200 shadow-sm hover:border-orange-300 hover:bg-orange-50 transition-all active:scale-95 text-gray-700 font-bold leading-snug flex items-center justify-center"
              >
                {option.text}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
