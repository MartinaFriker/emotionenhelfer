
import React, { useState, useCallback } from 'react';
import { AppState } from './types';
import { getEmotionalSupport } from './services/geminiService';
import WelcomeScreen from './components/WelcomeScreen';
import FeelingInput from './components/FeelingInput';
import GeminiHelper from './components/GeminiHelper';
import BreathingExercise from './components/BreathingExercise';
import PositiveThought from './components/PositiveThought';
import EndScreen from './components/EndScreen';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.Welcome);
  const [userProblem, setUserProblem] = useState<string>('');
  const [geminiResponse, setGeminiResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => setAppState(AppState.Input);

  const handleSubmitProblem = useCallback(async (problem: string) => {
    setUserProblem(problem);
    setAppState(AppState.Processing);
    setIsLoading(true);
    setError(null);
    setGeminiResponse('');

    try {
      const response = await getEmotionalSupport(problem);
      setGeminiResponse(response);
    } catch (e) {
      setError("Ein Fehler ist aufgetreten. Bitte versuche es nochmal.");
    } finally {
      setIsLoading(false);
      setAppState(AppState.Result);
    }
  }, []);
  
  const handleRestart = () => {
    setUserProblem('');
    setGeminiResponse('');
    setError(null);
    setAppState(AppState.Welcome);
  };
  
  const handleResponseShown = () => setAppState(AppState.Breathing);
  const handleBreathingFinished = () => setAppState(AppState.PositiveThought);
  const handlePositiveThoughtFinished = () => setAppState(AppState.End);

  const renderContent = () => {
    switch (appState) {
      case AppState.Welcome:
        return <WelcomeScreen onStart={handleStart} />;
      case AppState.Input:
        return <FeelingInput onSubmit={handleSubmitProblem} onBack={handleRestart} />;
      case AppState.Processing:
      case AppState.Result:
        return (
          <GeminiHelper
            isLoading={isLoading}
            response={geminiResponse}
            error={error}
            onResponseShown={handleResponseShown}
            onRestart={handleRestart}
          />
        );
      case AppState.Breathing:
        return <BreathingExercise onFinish={handleBreathingFinished} />;
      case AppState.PositiveThought:
        return <PositiveThought onFinish={handlePositiveThoughtFinished} />;
      case AppState.End:
        return <EndScreen onRestart={handleRestart} />;
      default:
        return <WelcomeScreen onStart={handleStart} />;
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 flex flex-col items-center justify-center p-4 transition-colors duration-500">
      {renderContent()}
    </div>
  );
};

export default App;
