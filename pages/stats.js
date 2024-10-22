import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import BottomBar from "../components/BottomBar";

const StatsPage = () => {
  // Mock data for stats
  const statsData = {
    weeklyProgress: {
      tasksCompleted: 23,
      pointsEarned: 450,
      productivityScore: 85,
    },
    monthlyComparison: {
      tasksCompleted: { current: 92, previous: 87 },
      pointsEarned: { current: 1800, previous: 1650 },
      productivityScore: { current: 88, previous: 82 },
    },
    topAchievements: [
      { id: 1, icon: "🏆", name: "Consistency King", count: 30 },
      { id: 2, icon: "🚀", name: "Productivity Boost", count: 15 },
      { id: 3, icon: "🎯", name: "Goal Crusher", count: 10 },
    ],
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 to-purple-100 min-h-screen p-6 flex flex-col">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Stats</h1>
        <div className="bg-yellow-400 text-white px-4 py-2 rounded-full">
          <span className="mr-2">📊</span>
          <span>Stats</span>
        </div>
      </header>

      <div className="bg-white rounded-3xl p-6 shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4">Weekly Progress</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h4 className="font-medium">Tasks Completed</h4>
            <p className="text-2xl font-bold mt-2">
              {statsData.weeklyProgress.tasksCompleted}
            </p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <h4 className="font-medium">Points Earned</h4>
            <p className="text-2xl font-bold mt-2">
              {statsData.weeklyProgress.pointsEarned}
            </p>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg">
            <h4 className="font-medium">Productivity Score</h4>
            <p className="text-2xl font-bold mt-2">
              {statsData.weeklyProgress.productivityScore}%
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4">Monthly Comparison</h2>
        <div className="space-y-4">
          {Object.entries(statsData.monthlyComparison).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center">
              <span className="capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </span>
              <div className="flex items-center">
                <span className="font-bold mr-2">{value.current}</span>
                {value.current > value.previous ? (
                  <FaChevronUp className="text-green-500" />
                ) : (
                  <FaChevronDown className="text-red-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-lg p-6 mb-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-white">Top Achievements</h2>
        <div className="grid grid-cols-3 gap-4">
          {statsData.topAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className="bg-white bg-opacity-20 rounded-lg p-4 flex flex-col items-center"
            >
              <span className="text-4xl mb-2">{achievement.icon}</span>
              <span className="text-white text-center font-medium">
                {achievement.name}
              </span>
              <span className="text-white text-lg font-bold mt-2">
                x{achievement.count}
              </span>
            </div>
          ))}
        </div>
      </div>
      <BottomBar />
    </div>
  );
};

export default StatsPage;
