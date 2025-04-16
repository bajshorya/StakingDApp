import React, { useState } from "react";
import { ethers } from "ethers";
import { connectWallet, getContract } from "../utils/web3";
import stakingAbi from "../abis/StakingContract.json";
import { CONTRACT_ADDRESSES } from "../config";

const Stake = () => {
  const [amount, setAmount] = useState("");
  const [isStaking, setIsStaking] = useState(false);
  const [error, setError] = useState("");

  const handleStake = async () => {
    try {
      if (!window.ethereum || !window.ethereum.selectedAddress) {
        setError("Please connect your wallet first");
        return;
      }

      if (!amount || isNaN(amount) || Number(amount) <= 0) {
        setError("Please enter a valid amount of ETH to stake.");
        return;
      }

      setIsStaking(true);
      setError("");

      const signer = await connectWallet();
      const stakingContract = await getContract(
        CONTRACT_ADDRESSES.stakingContract,
        stakingAbi,
        signer
      );

      const tx = await stakingContract.stake({
        value: ethers.parseEther(amount),
      });
      await tx.wait();
      alert("Staked successfully!");
      setAmount("");
    } catch (error) {
      console.error("Staking error:", error);
      setError(error.message || "Error staking. Check console for details.");
    } finally {
      setIsStaking(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 rounded-xl shadow-lg overflow-hidden p-6 border border-gray-700">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-purple-400 mb-2">Stake ETH</h2>
        <p className="text-gray-400 mb-6">
          Lock your ETH to earn BARCA rewards
        </p>

        <div className="mb-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount in ETH"
            className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {error && <div className="mb-4 text-red-400 text-sm">{error}</div>}

        <button
          onClick={handleStake}
          disabled={isStaking}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all 
            ${
              isStaking
                ? "bg-purple-700 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700 shadow-md hover:shadow-lg"
            }
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800`}
        >
          {isStaking ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Staking...
            </span>
          ) : (
            "Stake ETH"
          )}
        </button>

        <div className="mt-4 text-sm text-gray-400">
          <p>Your ETH will be locked in the staking contract</p>
        </div>
      </div>
    </div>
  );
};

export default Stake;
