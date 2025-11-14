
import React, { useState, useEffect } from 'react';
import Card from './common/Card';
import speechService from '../services/speechService';

interface FeelingInputProps {
  onSubmit: (problem: string) => void;
  onBack: () => void;
}

const FeelingInput: React.FC<FeelingInputProps> = ({ onSubmit, onBack }) => {
  const [problem, setProblem] = useState('');
  const promptText = "Was beschäftigt dich gerade?";

  useEffect(() => {
    speechService.speak(promptText);
    return () => {
      speechService.cancel();
    };
  }, [promptText]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (problem.trim()) {
      onSubmit(problem.trim());
    }
  };

  return (
    <Card>
      <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center">{promptText}</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          placeholder="Schreibe hier..."
          className="w-full h-40 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-200 resize-none"
          aria-label="Eingabefeld für Gedanken"
        />
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            type="button"
            onClick={onBack}
            className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
          >
            Zurück
          </button>
          <button
            type="submit"
            disabled={!problem.trim()}
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            Weiter
          </button>
        </div>
      </form>
    </Card>
  );
};

export default FeelingInput;
