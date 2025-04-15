import React from "react";

const StatsPanel = () => {
  return (
    <div>
      <div className="mt-8 bg-gray-800 rounded-xl p-6 border border-gray-700"></div>
      <h3 className="text-xl font-semibold text-purple-300 mb-4">
        Protocol Stats
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">Total Value Locked</p>
          <p className="text-xl font-bold">42.69 ETH</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">APY</p>
          <p className="text-xl font-bold text-green-400">12.8%</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">Total Rewards</p>
          <p className="text-xl font-bold">1,240,000 BARCA</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">Your Stake</p>
          <p className="text-xl font-bold">3.5 ETH</p>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
