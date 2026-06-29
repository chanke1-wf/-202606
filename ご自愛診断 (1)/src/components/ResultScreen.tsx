import { motion } from 'motion/react';
import ReactGA from 'react-ga4';
import { DiagnosisResult } from '../types';
import { RotateCcw, Share, ChevronRight, Instagram, Youtube, MessageCircle } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface ResultScreenProps {
  result: DiagnosisResult;
  onRetake: () => void;
  score: number;
}

export function ResultScreen({ result, onRetake, score }: ResultScreenProps) {
  // 動的にアイコンを取得
  const IconComponent = (LucideIcons as any)[result.icon] || LucideIcons.Star;

  const handleCtaClick = (linkName: string, url: string) => {
    const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (gaId && gaId.startsWith('G-')) {
      ReactGA.event({
        category: "Diagnosis",
        action: "CTA_Clicked",
        label: `${result.title} - ${linkName}`,
      });
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'ご自愛タイプ診断',
      text: `私の診断結果は【${result.title}】（${score}点）でした！\n\nここから診断してみて👇\n`,
      url: window.location.origin,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareData.text}${shareData.url}`);
        alert('結果をクリップボードにコピーしました！');
      } catch (err) {
        console.error('Copy failed:', err);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col flex-1 pb-4 pt-4"
    >
      <div className="text-center mb-8">
        <p className="text-sm font-bold text-gray-400 tracking-widest mb-1">SCORE: {score}/39</p>
        <h2 className="text-2xl font-bold text-gray-800">
          あなたのタイプは...
        </h2>
      </div>

      <div className={`p-6 rounded-3xl ${result.color} mb-8 shadow-sm flex flex-col items-center text-center relative overflow-hidden`}>
        <div className="absolute top-0 right-0 -mr-6 -mt-6 opacity-20">
          <IconComponent className="w-32 h-32" />
        </div>
        
        <div className="bg-white/50 backdrop-blur-sm p-4 rounded-full mb-4 z-10 shadow-sm border border-white/40">
          <IconComponent className="w-8 h-8" />
        </div>
        
        <h3 className="text-2xl font-bold mb-2 z-10">{result.title}</h3>
        <p className="font-semibold text-sm opacity-90 mb-4 z-10 leading-relaxed whitespace-pre-wrap">
          {result.subtitle}
        </p>
        <p className="text-sm opacity-80 leading-relaxed text-left z-10 whitespace-pre-wrap">
          {result.description}
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm mb-6 border border-gray-100">
        <h4 className="text-sm font-bold text-gray-700 mb-4 flex items-center">
          <div className="w-1 h-4 bg-orange-400 rounded-full mr-2" />
          今のあなたにおすすめ
        </h4>
        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap mb-6">
          {result.recommended}
        </p>
        
        <a
          href={result.ctaLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleCtaClick('Main CTA', result.ctaLink)}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3.5 px-4 rounded-xl shadow-md shadow-orange-200 transition-transform active:scale-95 flex items-center justify-between"
        >
          <span className="flex-1 text-center font-bold">{result.mainCTA}</span>
          <ChevronRight className="w-5 h-5 opacity-70" />
        </a>
      </div>

      {result.otherOptions && (
        <div className="bg-gray-50 rounded-3xl p-6 shadow-inner mb-8 border border-gray-100">
          <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center">
            こちらのステップもおすすめ🕊️
          </h4>
          <p className="text-xs text-gray-500 leading-relaxed whitespace-pre-wrap mb-4">
            {result.otherOptions}
          </p>
          {result.subCtaLink && (
            <a
              href={result.subCtaLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCtaClick('Sub CTA', result.subCtaLink || '')}
              className="w-full bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 font-medium py-3 px-4 rounded-xl shadow-sm transition-transform active:scale-95 flex items-center justify-between text-sm mt-3"
            >
              <span className="flex-1 text-center font-bold">{result.subCtaText || '詳細はこちら'}</span>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </a>
          )}
        </div>
      )}

      {/* Free Life LAB SNS */}
      <div className="flex flex-col items-center mb-8 gap-4 px-2">
        <p className="text-xs font-bold text-gray-400 tracking-widest">Free Life LAB 公式SNSをチェック</p>
        <div className="flex gap-4">
          <a
            href="https://lin.ee/MKRl1TM"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white rounded-full text-[#06C755] flex items-center justify-center shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors"
            aria-label="LINE"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white rounded-full text-[#E4405F] flex items-center justify-center shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://youtube.com/@free_life_lab?si=YeCm5NwAfxqfgy7s"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white rounded-full text-[#FF0000] flex items-center justify-center shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors"
            aria-label="YouTube"
          >
            <Youtube className="w-5 h-5 fill-current" />
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-8 px-2">
        <button 
          onClick={handleShare}
          className="flex items-center justify-center w-full bg-gray-800 text-white font-medium py-3.5 rounded-full shadow-lg hover:bg-gray-700 transition-colors active:scale-95"
        >
          <Share className="w-4 h-4 mr-2" />
          結果をシェアする
        </button>
        <button
          onClick={onRetake}
          className="flex items-center justify-center w-full bg-white text-gray-500 font-medium py-3.5 rounded-full shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors active:scale-95"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          もう一度診断する
        </button>
      </div>
    </motion.div>
  );
}
