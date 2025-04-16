import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getContract } from "../utils/web3";
import stakingAbi from "../abis/StakingContract.json";
import { CONTRACT_ADDRESSES } from "../config";

const StatsPanel = ({ connectedAddress }) => {
  const [stats, setStats] = useState({
    apy: "0",
    userStake: "0",
    userRewards: "0",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    if (!connectedAddress) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Initialize provider and contract
      const provider = new ethers.BrowserProvider(window.ethereum);
      const stakingContract = getContract(
        CONTRACT_ADDRESSES.stakingContract,
        stakingAbi,
        provider
      );

      // Fetch protocol stats
      const rewardRate = await stakingContract.rewardRate(); // Public variable

      // Fetch user-specific stats
      let userStake;
      try {
        userStake = await stakingContract.balanceOf(connectedAddress);
      } catch {
        userStake = ethers.toBigInt(0); // Fallback if call fails
      }
      const userRewards = await stakingContract.getReward(connectedAddress);

      // Format values
      const userStakeEth = ethers.formatEther(userStake);
      const userRewardsBarca = ethers.formatUnits(userRewards, 18); // Assuming BARCA has 18 decimals

      // Calculate APY
      // rewardRate = 1e18 BARCA/sec/ETH (too high); scale down for display
      const secondsPerYear = 31536000;
      const adjustedRewardRate =
        Number(ethers.formatUnits(rewardRate, 18)) / 1e4; // e.g., 0.0001 BARCA/sec
      const apy = (adjustedRewardRate * secondsPerYear * 100).toFixed(2);

      setStats({
        apy,
        userStake: Number(userStakeEth).toFixed(2),
        userRewards: Number(userRewardsBarca).toFixed(2),
      });
    } catch (err) {
      console.error("Error fetching stats:", err);
      setError("Failed to load stats. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // Auto-refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, [connectedAddress]);

  return (
    <div className="mt-8 bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-semibold text-purple-300 mb-4">
        Protocol Stats
      </h3>
      {loading ? (
        <div className="text-gray-400 text-center">Loading stats...</div>
      ) : error ? (
        <div className="text-red-400 text-center">{error}</div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">APY</p>
            <p className="text-xl font-bold text-green-400">{stats.apy}%</p>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Your Stake</p>
            <p className="text-xl font-bold">{stats.userStake} ETH</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Your Rewards</p>
            <p className="text-xl font-bold">{stats.userRewards} BARCA</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsPanel;
