import React, { useState, useEffect } from "react";
import { achievements } from "../components/achievements";
import { motion } from "framer-motion";
import {
  FaTrophy,
  FaLock,
  FaUnlock,
  FaChevronLeft,
  FaCog,
} from "react-icons/fa";
import Link from "next/link";
import BottomBar from "../components/BottomBar";

const Achievements = () => {
  const [apiData, setApiData] = useState({
    iAPF: 0,
    concentrationIndex: 0,
    relaxationIndex: 0,
    fatigueScore: 0,
    alphaGravity: 0,
    cognitiveScore: 0,
    gamingFocus: 0,
    gamingChill: 0,
    gamingStress: 0,
    BPM: 0,
    alphaRhythm: 0,
  });
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [achievementProgress, setAchievementProgress] = useState({});

  useEffect(() => {
    // Simulate API data fetch
    const fetchData = () => {
      setApiData({
        iAPF: Math.random() * 100,
        concentrationIndex: Math.random() * 100,
        relaxationIndex: Math.random() * 100,
        fatigueScore: Math.random() * 100,
        alphaGravity: Math.random() * 100,
        cognitiveScore: Math.random() * 100,
        gamingFocus: Math.random() * 100,
        gamingChill: Math.random() * 100,
        gamingStress: Math.random() * 100,
        BPM: 60 + Math.random() * 40,
        alphaRhythm: Math.random(),
        // Add other metrics as needed
      });
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    checkAchievements();
  }, [apiData]);

  const checkAchievements = () => {
    achievements.forEach((achievement) => {
      if (!unlockedAchievements.includes(achievement.id)) {
        if (achievement.instant) {
          if (achievement.condition(apiData[achievement.metric])) {
            unlockAchievement(achievement);
          }
        } else if (achievement.needsInitial) {
          if (!achievementProgress[achievement.id]) {
            setAchievementProgress((prev) => ({
              ...prev,
              [achievement.id]: {
                startTime: Date.now(),
                initialValue: apiData[achievement.metric],
              },
            }));
          } else {
            const { initialValue } = achievementProgress[achievement.id];
            if (
              achievement.condition(apiData[achievement.metric], initialValue)
            ) {
              unlockAchievement(achievement);
            }
          }
        } else if (achievement.duration) {
          if (!achievementProgress[achievement.id]) {
            setAchievementProgress((prev) => ({
              ...prev,
              [achievement.id]: { startTime: Date.now() },
            }));
          } else {
            const { startTime } = achievementProgress[achievement.id];
            if (Date.now() - startTime >= achievement.duration) {
              if (achievement.metrics) {
                // For multi-metric achievements, pass the entire apiData
                if (achievement.condition(apiData)) {
                  unlockAchievement(achievement);
                }
              } else if (achievement.condition(apiData[achievement.metric])) {
                unlockAchievement(achievement);
              }
            } else if (
              achievement.metrics
                ? !achievement.condition(apiData)
                : !achievement.condition(apiData[achievement.metric])
            ) {
              setAchievementProgress((prev) => ({
                ...prev,
                [achievement.id]: { startTime: Date.now() },
              }));
            }
          }
        }
      }
    });
  };

  const unlockAchievement = (achievement) => {
    setUnlockedAchievements((prev) => [...prev, achievement.id]);
    // Replace alert with a more elegant notification system
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white p-4 flex justify-between items-center">
        <FaChevronLeft className="text-gray-600 text-xl" />
        <h1 className="text-xl font-semibold">Achievements</h1>
        <FaCog className="text-gray-600 text-xl" />
      </header>

      <main className="p-6">
        <div className="bg-white rounded-3xl p-6 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-orange-400 to-red-500 p-4 rounded-lg shadow-md text-white"
              >
                <div className="flex items-center mb-2">
                  <FaTrophy className="text-yellow-300 mr-2" />
                  <h3 className="text-lg font-semibold">{achievement.name}</h3>
                </div>
                <p className="text-sm mb-2">{achievement.description}</p>
                <div className="flex justify-between items-center">
                  {unlockedAchievements.includes(achievement.id) ? (
                    <FaUnlock className="text-green-300" />
                  ) : (
                    <FaLock className="text-gray-300" />
                  )}
                  <span className="text-xs">
                    {achievement.duration
                      ? `${achievement.duration / 1000}s`
                      : "Instant"}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <BottomBar />
    </div>
  );
};

export default Achievements;
