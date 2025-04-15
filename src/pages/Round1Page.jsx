import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button.jsx';

// These values will be provided by you later
const ROUND_1_CONFIG = {
  puzzleEmojis: '🧠🔍🧩👁️‍🗨️', // Example emoji puzzle
  correctAnswer: 'mindful', // Example answer
  hints: [
    'Think about what you use to solve puzzles',
    'The first emoji represents your head',
    'The last emoji is about observation'
  ],
  maxAttemptsBeforeHint: 3
};

const Round1Page = () => {
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (userAnswer.trim().toLowerCase() === ROUND_1_CONFIG.correctAnswer.toLowerCase()) {
      setIsCorrect(true);
      setTimeout(() => {
        setShowCongrats(true);
      }, 500);
    } else {
      setAttempts(prev => prev + 1);
      setUserAnswer('');
    }
  };

  // Show hint after set number of attempts
  useEffect(() => {
    if (attempts >= ROUND_1_CONFIG.maxAttemptsBeforeHint && !showHint) {
      setShowHint(true);
    }
  }, [attempts]);

  const handleHintClick = () => {
    if (currentHintIndex < ROUND_1_CONFIG.hints.length - 1) {
      setCurrentHintIndex(prev => prev + 1);
    } else {
      setCurrentHintIndex(0);
    }
  };

  const handleNextRound = () => {
    navigate('/round2');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 flex flex-col items-center justify-center text-white p-4 relative overflow-hidden">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-600 opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="z-10 max-w-4xl w-full">
        {!showCongrats ? (
          <div className="bg-gray-800/40 backdrop-blur-md rounded-2xl p-8 border border-purple-900/50 shadow-2xl animate-fade-in">
            <h1 className="text-5xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
              Round 1: Emoji Puzzle
            </h1>
            
            <div className="text-7xl mb-10 text-center filter drop-shadow-lg animate-float">
              {ROUND_1_CONFIG.puzzleEmojis}
            </div>
            
            <div className="mb-8 w-full max-w-md mx-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative group">
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Enter your answer"
                    className="w-full p-4 bg-gray-800/60 border border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white text-lg placeholder-gray-400 transition-all"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur"></div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
                >
                  Submit Answer
                </Button>
              </form>
            </div>

            {attempts > 0 && !isCorrect && (
              <div className="text-pink-400 mb-6 text-center animate-shake">
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  That's not correct. Try again! Attempts: {attempts}
                </div>
              </div>
            )}
            
            {showHint && (
              <div className="mt-6 p-6 bg-purple-900/40 rounded-xl w-full max-w-md mx-auto border border-purple-700/50 animate-fade-in">
                <p className="font-semibold mb-3 text-purple-300 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Hint:
                </p>
                <p className="text-gray-300">{ROUND_1_CONFIG.hints[currentHintIndex]}</p>
                {ROUND_1_CONFIG.hints.length > 1 && (
                  <Button 
                    variant="outline" 
                    className="mt-4 border-purple-600/50 text-purple-300 hover:bg-purple-800/30 transition-all"
                    onClick={handleHintClick}
                  >
                    Next Hint
                  </Button>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center bg-gray-800/40 backdrop-blur-md p-10 rounded-2xl border border-green-500/30 shadow-2xl animate-fade-in">
            <div className="mb-8 transform animate-bounce-slow">
              <svg className="w-24 h-24 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            
            <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-300">Congratulations! 🎉</h2>
            <p className="text-xl mb-8 text-gray-300">You've solved the emoji puzzle!</p>
            
            <Button 
              size="lg" 
              onClick={handleNextRound}
              className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-lg py-6 px-10 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Next Round
            </Button>
          </div>
        )}
      </div>

      {/* Add animations */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce 2s infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default Round1Page;