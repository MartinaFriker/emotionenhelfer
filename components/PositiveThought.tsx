import React, { useState, useMemo, useEffect } from 'react';
import Card from './common/Card';
import speechService from '../services/speechService';

interface PositiveThoughtProps {
  onFinish: () => void;
}

const affirmations = [
  "Du bist stärker als du denkst.",
  "Jeder Tag ist ein neuer Anfang.",
  "Es ist okay, traurig zu sein.",
  "Atme tief durch. Du schaffst das.",
  "Du bist wertvoll und wichtig.",
  "Sei stolz auf dich.",
  "Auch das geht vorbei."
];

const PositiveThought: React.FC<PositiveThoughtProps> = ({ onFinish }) => {
  const [imageId] = useState(Date.now());
  const randomAffirmation = useMemo(() => affirmations[Math.floor(Math.random() * affirmations.length)], []);

  useEffect(() => {
    speechService.speak(randomAffirmation);
    const timer = setTimeout(onFinish, 5000); // Auto-advance after 5 seconds

    return () => {
      clearTimeout(timer);
      speechService.cancel();
    };
  }, [randomAffirmation, onFinish]);

  return (
    <Card>
      <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center">Ein positiver Gedanke</h2>
      <div className="aspect-video w-full rounded-lg overflow-hidden mb-4 bg-slate-200">
        <img
          src={`https://picsum.photos/600/338?random=${imageId}`}
          alt="Eine beruhigende Szene"
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-center text-xl text-slate-700 font-semibold mb-6 p-4 bg-purple-50 rounded-lg">
        "{randomAffirmation}"
      </p>
    </Card>
  );
};

export default PositiveThought;
