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
  const [isHovering, setIsHovering] = useState(false);

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
    <div
      className="glass-card rounded-xl p-6 shadow-lg hover:shadow-blue-500/30 transition-all duration-500 relative overflow-hidden group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Animated gradient border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-500/30 to-blue-600/30 opacity-0 group-hover:opacity-100 animate-gradient rounded-xl -z-10"></div>

      {/* Data visualization particles effect */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-blue-400"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float-${i} ${3 + i}s ease-in-out infinite`,
            }}
          />
        ))}

        {/* Data visualization lines (showing only when hovering) */}
        {isHovering && (
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <div
                key={`line-${i}`}
                className="absolute h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"
                style={{
                  top: `${15 + i * 15}%`,
                  left: "0",
                  width: "100%",
                  transform: `translateY(${Math.sin(i) * 5}px)`,
                  opacity: 0.3,
                  animation: `pulse-opacity ${
                    2 + i * 0.5
                  }s ease-in-out infinite`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="text-center relative z-10">
        <div className="flex items-center justify-center mb-3">
          <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 text-blue-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-blue-300 tracking-tight">
            Your Stats
          </h2>
        </div>
        <p className="text-gray-400 mb-6 text-sm">
          Track your staking performance and rewards
        </p>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <svg
              className="animate-spin h-8 w-8 text-blue-500 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <p className="text-gray-400">Loading your stats...</p>
          </div>
        ) : error ? (
          <div className="mb-4 text-red-400 text-sm bg-red-900/20 py-4 px-3 rounded-lg border border-red-800/50 animate-pulse">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative overflow-hidden group/item bg-gradient-to-br from-blue-900/30 to-blue-800/10 p-4 rounded-lg border border-blue-800/30 transition-all duration-300 hover:shadow-md hover:shadow-blue-700/20">
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/5 to-transparent opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-full transition-all duration-1000 transform -translate-x-full"></div>

              <div className="flex justify-between items-center">
                <p className="text-gray-400 text-sm">Current APY</p>
                <div className="w-6 h-6 bg-green-500/10 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-3 h-3 text-green-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-2xl font-bold text-green-400 mt-2">
                {stats.apy}%
                <span className="text-xs ml-1 text-green-500/70">APY</span>
              </p>
            </div>

            <div className="relative overflow-hidden group/item bg-gradient-to-br from-purple-900/30 to-purple-800/10 p-4 rounded-lg border border-purple-800/30 transition-all duration-300 hover:shadow-md hover:shadow-purple-700/20">
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/5 to-transparent opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-full transition-all duration-1000 transform -translate-x-full"></div>

              <div className="flex justify-between items-center">
                <p className="text-gray-400 text-sm">Your Stake</p>
                <div className="w-6 h-6 bg-purple-500/10 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-3 h-3 text-purple-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 019 14.437V9.564z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-2xl font-bold text-purple-300 mt-2">
                {stats.userStake}
                <span className="text-xs ml-1 text-purple-400/70">ETH</span>
              </p>
            </div>

            <div className="relative overflow-hidden group/item bg-gradient-to-br from-yellow-900/30 to-yellow-800/10 p-4 rounded-lg border border-yellow-800/30 transition-all duration-300 hover:shadow-md hover:shadow-yellow-700/20">
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/5 to-transparent opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-full transition-all duration-1000 transform -translate-x-full"></div>

              <div className="flex justify-between items-center">
                <p className="text-gray-400 text-sm">Pending Rewards</p>
                <div className="w-6 h-6 bg-yellow-500/10 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-3 h-3 text-yellow-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-2xl font-bold text-yellow-300 mt-2">
                {stats.userRewards}
                <span className="text-xs ml-1 text-yellow-400/70">BARCA</span>
              </p>
            </div>

            <div className="relative overflow-hidden group/item bg-gradient-to-br from-teal-900/30 to-teal-800/10 p-4 rounded-lg border border-teal-800/30 transition-all duration-300 hover:shadow-md hover:shadow-teal-700/20">
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-400/5 to-transparent opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-full transition-all duration-1000 transform -translate-x-full"></div>

              <div className="flex justify-between items-center">
                <p className="text-gray-400 text-sm">Total Claimed</p>
                <div className="w-6 h-6 bg-teal-500/10 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-3 h-3 text-teal-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-2xl font-bold text-teal-300 mt-2">
                {stats.userClaimedRewards}
                <span className="text-xs ml-1 text-teal-400/70">BARCA</span>
              </p>
            </div>
          </div>
        )}

        <div className="mt-4 text-sm text-gray-400 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 mr-1 text-blue-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21a48.309 48.309 0 01-8.135-.687c-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
            />
          </svg>
          <p>Stats update automatically every 30 seconds</p>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
