import { useState, useEffect } from 'react';
import ReactGA from 'react-ga4';
import { StartScreen } from './components/StartScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { ResultScreen } from './components/ResultScreen';
import { questions, resultsData } from './data';
import { ScreenState } from './types';

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-5QV2Y6HLHE';
    if (gaId && gaId.startsWith('G-')) {
      ReactGA.initialize(gaId);
      ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    }
  }, []);

  const getResult = () => {
    return resultsData.find(
      (res) => totalScore >= res.scoreRange[0] && totalScore <= res.scoreRange[1]
    ) || resultsData[0];
  };

  useEffect(() => {
    if (screen === 'result') {
      const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-5QV2Y6HLHE';
      if (gaId && gaId.startsWith('G-')) {
        const result = getResult();
        ReactGA.event({
          category: "Diagnosis",
          action: "Result_Shown",
          label: result.title,
          value: totalScore
        });
      }
    }
  }, [screen, totalScore]);

  const handleStart = () => {
    setScreen('playing');
    setCurrentQuestionIndex(0);
    setTotalScore(0);
  };

  const handleAnswer = (score: number) => {
    const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-5QV2Y6HLHE';
    if (gaId && gaId.startsWith('G-')) {
      const currentQ = questions[currentQuestionIndex];
      const selectedOption = currentQ.options.find(o => o.score === score);
      
      ReactGA.event({
        category: "Diagnosis",
        action: `Answered_Q${currentQ.id}`,
        label: selectedOption ? selectedOption.text : `Score: ${score}`,
        value: score
      });
    }

    setTotalScore(prev => prev + score);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setScreen('result');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-[100dvh] relative flex flex-col bg-orange-50">
      <div className="relative z-10 flex flex-col flex-1 pt-8 pb-12 px-6">
        {screen === 'start' && <StartScreen onStart={handleStart} total={questions.length} />}
        
        {screen === 'playing' && (
          <QuestionScreen
            question={questions[currentQuestionIndex]}
            currentIndex={currentQuestionIndex}
            total={questions.length}
            onAnswer={handleAnswer}
          />
        )}
        
        {screen === 'result' && (
          <ResultScreen
            result={getResult()}
            onRetake={handleStart}
            score={totalScore}
          />
        )}
      </div>
    </div>
  );
}
