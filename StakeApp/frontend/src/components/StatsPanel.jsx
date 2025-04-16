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
    userClaimedRewards: "0",
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

      const provider = new ethers.BrowserProvider(window.ethereum);
      const stakingContract = getContract(
        CONTRACT_ADDRESSES.stakingContract,
        stakingAbi,
        provider
      );

      const rewardRate = await stakingContract.rewardRate();
      let userStake;
      try {
        userStake = await stakingContract.balanceOf(connectedAddress);
      } catch {
        userStake = ethers.toBigInt(0);
      }
      const userRewards = await stakingContract.getReward(connectedAddress);

      let userClaimedRewards = ethers.toBigInt(0);
      try {
        const barcaTokenAddress = await stakingContract.barcaToken();
        const barcaAbi = [
          "event Transfer(address indexed from, address indexed to, uint256 value)",
        ];
        const barcaContract = new ethers.Contract(
          barcaTokenAddress,
          barcaAbi,
          provider
        );
        const filter = barcaContract.filters.Transfer(
          ethers.ZeroAddress,
          connectedAddress
        );
        const events = await barcaContract.queryFilter(filter, 0, "latest");
        userClaimedRewards = events.reduce(
          (sum, event) => sum + ethers.toBigInt(event.args[2]),
          ethers.toBigInt(0)
        );
      } catch {
        userClaimedRewards = ethers.toBigInt(0);
      }

      const userStakeEth = ethers.formatEther(userStake);
      const userRewardsBarca = ethers.formatUnits(userRewards, 18);
      const userClaimedRewardsBarca = ethers.formatUnits(
        userClaimedRewards,
        18
      );

      const secondsPerYear = 31536000;
      const adjustedRewardRate =
        Number(ethers.formatUnits(rewardRate, 18)) / 1e4;
      const apy = (adjustedRewardRate * secondsPerYear * 100).toFixed(2);

      setStats({
        apy,
        userStake: Number(userStakeEth).toFixed(2),
        userRewards: Number(userRewardsBarca).toFixed(2),
        userClaimedRewards: Number(userClaimedRewardsBarca).toFixed(2),
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
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, [connectedAddress]);

  return (
    <div className="glass-card rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-semibold text-purple-300 mb-6 tracking-tight">
        Your Stats
      </h3>
      {loading ? (
        <div className="text-gray-400 text-center animate-pulse">
          Loading stats...
        </div>
      ) : error ? (
        <div className="text-red-400 text-center">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800/70 transition-all duration-200">
            <p className="text-gray-400 text-sm">APY</p>
            <p className="text-xl font-bold text-green-400">{stats.apy}%</p>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800/70 transition-all duration-200">
            <p className="text-gray-400 text-sm">Your Stake</p>
            <p className="text-xl font-bold">{stats.userStake} ETH</p>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800/70 transition-all duration-200">
            <p className="text-gray-400 text-sm">Your Rewards</p>
            <p className="text-xl font-bold">{stats.userRewards} BARCA</p>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800/70 transition-all duration-200">
            <p className="text-gray-400 text-sm">Your Claimed Rewards</p>
            <p className="text-xl font-bold">
              {stats.userClaimedRewards} BARCA
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsPanel;
