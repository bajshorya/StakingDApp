import React, { useState } from "react";
import { ethers } from "ethers";
import { connectWallet, getContract } from "../utils/web3";
import stakingAbi from "../abis/StakingContract.json";
import { CONTRACT_ADDRESSES } from "../config";
import SuccessDialog from "./SuccessDialog";

const Unstake = () => {
  const [amount, setAmount] = useState("");
  const [isUnstaking, setIsUnstaking] = useState(false);
  const [error, setError] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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
      setShowSuccess(true);
      setAmount("");
    } catch (error) {
      console.error("Unstaking error:", error);
      setError(error.message || "Error unstaking. Check console for details.");
    } finally {
      setIsUnstaking(false);
    }
  };

  return (
    <div className="glass-card rounded-xl p-6 shadow-lg hover:shadow-red-500/30 transition-all duration-500 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 via-yellow-500/30 to-red-600/30 opacity-0 group-hover:opacity-100 animate-gradient rounded-xl -z-10"></div>

      <div className="absolute inset-0 overflow-hidden opacity-30">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-red-400"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float-${i} ${3 + i}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      <div className="text-center relative z-10">
        <div className="flex items-center justify-center mb-3">
          <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 text-red-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-red-300 tracking-tight">
            Unstake ETH
          </h2>
        </div>
        <p className="text-gray-400 mb-6 text-sm">Withdraw your staked ETH</p>

        <div className="mb-6 relative">
          <div
            className={`absolute inset-0 rounded-lg bg-gradient-to-r from-red-500/50 to-yellow-500/50 blur ${
              inputFocused ? "opacity-50" : "opacity-0"
            } transition-opacity duration-300`}
          ></div>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              placeholder="Amount in ETH"
              className="w-full px-4 py-3 rounded-lg bg-gray-800/80 border border-gray-600/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
            />
            <div className="absolute right-3 top-3 text-gray-500">ETH</div>
          </div>
        </div>

        {error && (
          <div className="mb-4 text-red-400 text-sm bg-red-900/20 py-2 px-3 rounded-lg border border-red-800/50 animate-pulse">
            {error}
          </div>
        )}

        <button
          onClick={handleUnstake}
          disabled={isUnstaking}
          className={` hover:cursor-pointer w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 relative overflow-hidden
            ${
              isUnstaking
                ? "bg-red-800/50 cursor-not-allowed"
                : "bg-gradient-to-r from-red-600 to-yellow-600 hover:from-red-700 hover:to-yellow-700 shadow-md hover:shadow-lg hover:shadow-red-500/50"
            }`}
        >
          <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>

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

        <SuccessDialog
          isOpen={showSuccess}
          onClose={() => setShowSuccess(false)}
          message="Unstaked successfully!"
          color="red-500"
        />
      </div>
    </div>
  );
};

export default Unstake;
