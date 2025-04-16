import React, { useState } from "react";
import { ethers } from "ethers";
import { connectWallet, getContract } from "../utils/web3";
import stakingAbi from "../abis/StakingContract.json";
import { CONTRACT_ADDRESSES } from "../config";

const Unstake = () => {
  const [amount, setAmount] = useState("");
  const [isUnstaking, setIsUnstaking] = useState(false);
  const [error, setError] = useState("");

  const handleUnstake = async () => {
    try {
      if (!window.ethereum || !window.ethereum.selectedAddress) {
        setError("Please connect your wallet first");
        return;
      }

      if (!amount || isNaN(amount) || Number(amount) <= 0) {
        setError("Please enter a valid amount of ETH to unstake.");
        return;
      }

      setIsUnstaking(true);
      setError("");

      const signer = await connectWallet();
      const stakingContract = await getContract(
        CONTRACT_ADDRESSES.stakingContract,
        stakingAbi,
        signer
      );

      const tx = await stakingContract.unstake(ethers.parseEther(amount));
      await tx.wait();
      alert("Unstaked successfully!");
      setAmount("");
    } catch (error) {
      console.error("Unstaking error:", error);
      setError(error.message || "Error unstaking. Check console for details.");
    } finally {
      setIsUnstaking(false);
    }
  };

  return (
    <div className="glass-card rounded-xl p-6 shadow-lg hover:shadow-red-500/20 transition-all duration-300">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-red-300 mb-3 tracking-tight">
          Unstake ETH
        </h2>
        <p className="text-gray-400 mb-6 text-sm">Withdraw your staked ETH</p>

        <div className="mb-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount in ETH"
            className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-600/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
          />
        </div>

        {error && <div className="mb-4 text-red-400 text-sm">{error}</div>}

        <button
          onClick={handleUnstake}
          disabled={isUnstaking}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 
            ${
              isUnstaking
                ? "bg-red-800/50 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 shadow-md hover:shadow-lg hover:shadow-red-500/50"
            }`}
        >
          {isUnstaking ? (
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
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Unstaking...
            </span>
          ) : (
            "Unstake ETH"
          )}
        </button>

        <div className="mt-4 text-sm text-gray-400">
          <p>You will stop earning rewards on unstaked amount</p>
        </div>
      </div>
    </div>
  );
};

export default Unstake;
