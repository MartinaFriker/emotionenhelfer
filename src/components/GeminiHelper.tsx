
import React, { useEffect } from 'react';
import Card from './common/Card';
import Spinner from './common/Spinner';
import speechService from '../services/speechService';

interface GeminiHelperProps {
  isLoading: boolean;
  response: string;
  error: string | null;
  onResponseShown: () => void;
  onRestart: () => void;
}

const GeminiHelper: React.FC<GeminiHelperProps> = ({
  isLoading,
  response,
  error,
  onResponseShown,
  onRestart,
}) => {
  useEffect(() => {
    if (response) {
      speechService.speak(response);
      const timer = setTimeout(() => {
        onResponseShown();
      }, 4000 + response.length * 80); // Wait for speech to finish (approx) + buffer

      return () => {
        clearTimeout(timer);
        speechService.cancel();
      };
    }
  }, [response, onResponseShown]);

  useEffect(() => {
    if (error) {
      speechService.speak(error);
      return () => speechService.cancel();
    }
  }, [error]);

  return (
    <Card>
      {isLoading && (
        <div className="text-center">
          <Spinner />
          <p className="mt-4 text-slate-600">Einen Moment...</p>
        </div>
      )}
      {error && (
        <div className="text-center">
          <p className="text-red-500 font-semibold">{error}</p>
          <button
            onClick={onRestart}
            className="mt-4 bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Nochmal versuchen
          </button>
        </div>
      )}
      {!isLoading && !error && response && (
        <div>
          <div className="text-slate-700 space-y-4 text-2xl text-center font-semibold bg-sky-50 p-6 rounded-lg">
            <p>{response}</p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default GeminiHelper;
