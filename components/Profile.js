import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaCog, FaTimes } from "react-icons/fa";
import BottomBar from "./BottomBar";
import Image from "next/image";

const ProfileComponent = () => {
  const [totalDiamonds, setTotalDiamonds] = useState(0);
  const [activityCounts, setActivityCounts] = useState({
    meditation: 0,
    break: 0,
    goals: 0,
    workSession: 0,
  });
  const [showActivityDetails, setShowActivityDetails] = useState(false);

  useEffect(() => {
    // Load total diamonds from localStorage when component mounts
    const storedDiamonds = localStorage.getItem("totalDiamonds");
    if (storedDiamonds) {
      setTotalDiamonds(parseInt(storedDiamonds, 10));
    }

    // Load activity counts from localStorage
    const storedActivityCounts = localStorage.getItem("activityCounts");
    if (storedActivityCounts) {
      setActivityCounts(JSON.parse(storedActivityCounts));
    }
  }, []);

  // Mock user data (keep other fields, update points with totalDiamonds)
  const user = {
    username: "Пан Сашов",
    avatar: "/unnamed.png",
    level: "Bronze",
    ongoingActivities: 4,
    badges: [
      { id: 1, icon: "🏆", name: "Champion" },
      { id: 2, icon: "🌟", name: "Star Performer" },
      { id: 3, icon: "🚀", name: "Quick Learner" },
      { id: 4, icon: "🎯", name: "Goal Achiever" },
      { id: 5, icon: "💪", name: "Persistent" },
      { id: 6, icon: "🧠", name: "Knowledge Seeker" },
      { id: 7, icon: "🤝", name: "Team Player" },
      { id: 8, icon: "🔥", name: "On Fire" },
    ],
  };

  const totalActivities = Object.values(activityCounts).reduce(
    (a, b) => a + b,
    0
  );

  const toggleActivityDetails = () => {
    setShowActivityDetails(!showActivityDetails);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white p-4 flex justify-between items-center">
        <FaChevronLeft className="text-gray-600 text-xl" />
        <h1 className="text-xl font-semibold">Profile</h1>
        <FaCog className="text-gray-600 text-xl" />
      </header>

      <main className="p-6">
        <div className="bg-white rounded-3xl p-6 shadow-md">
          <div className="flex flex-col items-center">
            <Image
              src={user.avatar}
              alt="Аватар пользователя"
              width={128}
              height={128}
              className="rounded-full mr-3 object-cover"
            />
            <h2 className="mt-4 text-3xl font-semibold">{user.username}</h2>
            <div className="mt-2 flex items-center">
              <span className="bg-orange-400 text-white px-3 py-1 rounded-full text-lg mr-2">
                💎 {totalDiamonds}
              </span>
              <span className="bg-green-400 text-white px-3 py-1 rounded-full text-lg">
                {user.level}
              </span>
            </div>
          </div>

          <section className="mt-8">
            <h3 className="text-lg font-semibold mb-4">My Badges</h3>
            <div className="grid grid-cols-4 gap-4">
              {user.badges.map((badge) => (
                <div
                  key={badge.id}
                  className="bg-gray-200 rounded-lg p-2 flex flex-col items-center justify-center aspect-square"
                  title={badge.name}
                >
                  <span className="text-3xl">{badge.icon}</span>
                  <span className="text-xs mt-1 text-center truncate w-full">
                    {badge.name}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <h3 className="text-lg font-semibold mb-4">My Activities</h3>
            <div className="grid grid-cols-2 gap-4">
              <div
                className="bg-yellow-100 p-4 rounded-lg cursor-pointer"
                onClick={toggleActivityDetails}
              >
                <h4 className="font-medium">Total</h4>
                <p className="text-2xl font-bold mt-2">{totalActivities}</p>
              </div>
              <div className="bg-orange-100 p-4 rounded-lg">
                <h4 className="font-medium">Ongoing</h4>
                <p className="text-2xl font-bold mt-2">
                  {user.ongoingActivities}
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <AnimatePresence>
        {showActivityDetails && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 w-11/12 max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Activity Details</h3>
                <FaTimes
                  className="text-gray-600 cursor-pointer"
                  onClick={toggleActivityDetails}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(activityCounts).map(([activity, count]) => (
                  <div key={activity} className="bg-blue-100 p-4 rounded-lg">
                    <h4 className="font-medium capitalize">{activity}</h4>
                    <p className="text-2xl font-bold mt-2">{count}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileComponent;
