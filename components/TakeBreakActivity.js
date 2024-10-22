import React, { useState, useEffect } from "react";
import { FaTimes, FaPlay, FaPause, FaUndo, FaCoffee } from "react-icons/fa";
import Confetti from "react-confetti";

const TakeBreakActivity = ({ onClose }) => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes break
  const [isActive, setIsActive] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showReward, setShowReward] = useState(false);

  const breakSuggestions = [
    "Сделайте несколько глубоких вдохов",
    "Встаньте и потянитесь",
    "Выпейте стакан воды",
    "Посмотрите в окно и сфокусируйтесь на чем-то вдалеке",
    "Сделайте короткую прогулку",
  ];

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft <= 0) {
      setIsActive(false);
      setTimeLeft(0);
      setShowConfetti(true);
      setShowReward(true);
      setTimeout(() => {
        setShowConfetti(false);
        setShowReward(false);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setTimeLeft(300);
    setIsActive(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      {showConfetti && <Confetti />}
      <div className="bg-white rounded-2xl p-10 max-w-md w-full shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800">Перерыв</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-2"
          >
            <FaTimes size={28} />
          </button>
        </div>
        <div className="text-center">
          {showReward ? (
            <div className="text-2xl font-bold text-green-600 mb-6">
              Отлично! Вы заработали 10 алмазов за перерыв! 💎
            </div>
          ) : (
            <>
              <div className="text-7xl font-bold mb-10 text-gray-700">
                {formatTime(timeLeft)}
              </div>
              <div className="flex justify-center space-x-6 mb-10">
                <button
                  className={`p-5 rounded-full ${
                    isActive
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                  } text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  onClick={toggleTimer}
                >
                  {isActive ? <FaPause size={28} /> : <FaPlay size={28} />}
                </button>
                <button
                  className="p-5 rounded-full bg-gray-300 hover:bg-gray-400 text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={resetTimer}
                >
                  <FaUndo size={28} />
                </button>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">
                  Идеи для перерыва:
                </h3>
                <ul className="text-left">
                  {breakSuggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-center mb-2">
                      <FaCoffee className="text-yellow-500 mr-2" />
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-100 ease-linear"
                  style={{ width: `${(timeLeft / 300) * 100}%` }}
                ></div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TakeBreakActivity;
