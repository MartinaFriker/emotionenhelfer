
import React, { useState, useEffect } from 'react';
import Card from './common/Card';
import speechService from '../services/speechService';

interface BreathingExerciseProps {
  onFinish: () => void;
}

const totalCycles = 3;
const cycleTime = 8000; // 4s in, 4s out

const BreathingExercise: React.FC<BreathingExerciseProps> = ({ onFinish }) => {
  const [text, setText] = useState('Atme ein...');
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    speechService.speak('Atme ein...');
    const inTimer = setTimeout(() => {
      setText('...und atme aus');
      speechService.speak('und atme aus');
    }, cycleTime / 2);

    const mainInterval = setInterval(() => {
      setCycleCount(prev => {
        const nextCount = prev + 1;
        if (nextCount >= totalCycles) {
          clearInterval(mainInterval);
          setTimeout(onFinish, cycleTime / 2); // Finish after the last exhale
          return nextCount;
        }
        setText('Atme ein...');
        speechService.speak('Atme ein...');
        setTimeout(() => {
          setText('...und atme aus');
          speechService.speak('und atme aus');
        }, cycleTime / 2);
        return nextCount;
      });
    }, cycleTime);

    return () => {
      clearTimeout(inTimer);
      clearInterval(mainInterval);
      speechService.cancel();
    };
  }, [onFinish]);

  return (
    <Card className="text-center">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Atemübung</h2>
      <div className="relative flex justify-center items-center h-52 sm:h-64 mb-6">
        <div className="absolute w-52 h-52 sm:w-64 sm:h-64 bg-sky-200 rounded-full animate-pulse-slow"></div>
        <div
          className="absolute w-24 h-24 sm:w-32 sm:h-32 bg-sky-400 rounded-full"
          style={{
            animation: `breathe ${cycleTime}ms ease-in-out infinite`,
          }}
        ></div>
        <p className="relative text-xl font-semibold text-white">{text}</p>
      </div>

      <style>{`
        @keyframes breathe {
          0% { transform: scale(1); }
          50% { transform: scale(1.8); }
          100% { transform: scale(1); }
        }
        .animate-pulse-slow {
            animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse { 50% { opacity: 0.5; } }
      `}</style>
    </Card>
  );
};

export default BreathingExercise;
