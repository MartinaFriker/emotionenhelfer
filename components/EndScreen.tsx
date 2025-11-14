import React, { useEffect } from 'react';
import Card from './common/Card';
import speechService from '../services/speechService';

interface EndScreenProps {
  onRestart: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ onRestart }) => {
  const message = "Ich hoffe, es geht dir jetzt ein bisschen besser.";

  useEffect(() => {
    speechService.speak(message);
    return () => speechService.cancel();
  }, [message]);

  return (
    <Card className="text-center">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">{message}</h1>
      <button
        onClick={onRestart}
        className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-lg text-xl transition-transform transform hover:scale-105"
      >
        Nochmal von vorne
      </button>
    </Card>
  );
};

export default EndScreen;
