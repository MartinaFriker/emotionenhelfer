import React, { useEffect } from 'react';
import Card from './common/Card';
import speechService from '../services/speechService';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const welcomeMessage = "Hallo! Drücke auf Start, wenn du Hilfe brauchst.";

  useEffect(() => {
    speechService.speak(welcomeMessage);
    return () => {
      speechService.cancel();
    };
  }, [welcomeMessage]);

  return (
    <Card className="text-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-8">Hallo!</h1>
      <button
        onClick={onStart}
        className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-lg text-xl transition-transform transform hover:scale-105"
        aria-label="Starten"
      >
        Starten
      </button>
    </Card>
  );
};

export default WelcomeScreen;
