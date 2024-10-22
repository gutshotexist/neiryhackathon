import React from "react";
import { motion } from "framer-motion";
import {
  FaTrophy,
  FaLock,
  FaUnlock,
  FaChevronLeft,
  FaCog,
} from "react-icons/fa";
import BottomBar from "../components/BottomBar";

const mockAchievements = [
  {
    id: 1,
    name: "First Steps",
    description: "Complete your first task",
    unlocked: true,
    duration: "Instant",
  },
  {
    id: 2,
    name: "Focus Master",
    description: "Maintain high focus for 30 minutes",
    unlocked: false,
    duration: "1800s",
  },
  {
    id: 3,
    name: "Zen Mode",
    description: "Achieve perfect relaxation",
    unlocked: false,
    duration: "Instant",
  },
];

const Achievements = () => {
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
            {mockAchievements.map((achievement) => (
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
                  {achievement.unlocked ? (
                    <FaUnlock className="text-green-300" />
                  ) : (
                    <FaLock className="text-gray-300" />
                  )}
                  <span className="text-xs">{achievement.duration}</span>
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
