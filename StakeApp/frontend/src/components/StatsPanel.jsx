import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getContract } from "../utils/web3";
import stakingAbi from "../abis/StakingContract.json";
import { CONTRACT_ADDRESSES } from "../config";

const StatsPanel = ({ connectedAddress }) => {
  const [stats, setStats] = useState({
    totalValueLocked: "N/A",
    apy: "0",
    totalRewards: "N/A",
    userStake: "0",
    userRewards: "0",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      if (!connectedAddress) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        // Initialize provider and contract
        const provider = new ethers.BrowserProvider(window.ethereum); // Ensure provider is initialized ,provider here is = window.ethereum
        //windows.ethereum gives access to the Ethereum provider injected by MetaMask
        const stakingContract = getContract(
          // getContract is a function that creates a new instance of the contract
          CONTRACT_ADDRESSES.stakingContract,
          stakingAbi,
          provider
        );

        // Fetch protocol stats
        const rewardRate = await stakingContract.rewardRate(); // Public variable access

        // Fetch user-specific stats
        const userStake = await stakingContract.balanceOf(connectedAddress);
        const userRewards = await stakingContract.getReward(connectedAddress);

        // Format values
        const userStakeEth = ethers.formatEther(userStake);
        const userRewardsBarca = ethers.formatUnits(userRewards, 18); // Assuming BARCA has 18 decimals

        // Calculate APY
        // rewardRate = 1e18 BARCA per second per ETH = 1 BARCA/sec/ETH
        // APY = (rewardRate * secondsPerYear * BARCA_price / ETH_price) * 100
        const secondsPerYear = 31536000;
        const apy = (
          (Number(ethers.formatUnits(rewardRate, 18)) * secondsPerYear) /
          1
        ).toFixed(2); // Simplified, assuming BARCA ≈ ETH price

        setStats({
          totalValueLocked: "N/A", // Replace with off-chain data if available
          apy,
          totalRewards: "N/A", // Replace with event-based or off-chain data
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

    fetchStats();
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
            <p className="text-gray-400 text-sm">Total Value Locked</p>
            <p className="text-xl font-bold">{stats.totalValueLocked}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">APY</p>
            <p className="text-xl font-bold text-green-400">{stats.apy}%</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Total Rewards Distributed</p>
            <p className="text-xl font-bold">{stats.totalRewards}</p>
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
