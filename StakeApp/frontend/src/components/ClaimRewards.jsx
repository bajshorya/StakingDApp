import React, { useState } from "react";
import { connectWallet, getContract } from "../utils/web3";
import stakingAbi from "../abis/StakingContract.json";
import { CONTRACT_ADDRESSES } from "../config";
import SuccessDialog from "./SuccessDialog";

const ClaimRewards = () => {
  const [isClaiming, setIsClaiming] = useState(false);
  const [error, setError] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleClaim = async () => {
    try {
      if (!window.ethereum || !window.ethereum.selectedAddress) {
        setError("Please connect your wallet first");
        return;
      }

      setIsClaiming(true);
      setError("");

      const signer = await connectWallet();
      const stakingContract = await getContract(
        CONTRACT_ADDRESSES.stakingContract,
        stakingAbi,
        signer
      );

      const tx = await stakingContract.claimRewards();
      await tx.wait();
      setShowSuccess(true);
    } catch (error) {
      console.error("Claim error:", error);
      setError(
        error.message || "Error claiming rewards. Check console for details."
      );
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <div
      className="glass-card rounded-xl p-6 shadow-lg hover:shadow-green-500/30 transition-all duration-500 relative overflow-hidden group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Animated gradient border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-600/30 via-teal-500/30 to-green-600/30 opacity-0 group-hover:opacity-100 animate-gradient rounded-xl -z-10"></div>

      {/* Coins floating effect (visible on hover) */}
      <div className="absolute inset-0 overflow-hidden">
        {isHovering &&
          [...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-yellow-400"
              style={{
                top: `${70 + Math.random() * 20}%`, // Start at the bottom
                left: `${10 + i * 7}%`,
                opacity: Math.random() * 0.7 + 0.3,
                transform: `scale(${Math.random() * 0.5 + 0.5})`,
                animation: `float-up-${i} ${1 + Math.random() * 2}s ease-out ${
                  i * 0.1
                }s ${isHovering ? "infinite" : "paused"}`,
              }}
            />
          ))}
      </div>

      <div className="text-center relative z-10">
        <div className="flex items-center justify-center mb-3">
          <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 text-green-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-green-300 tracking-tight">
            Claim Rewards
          </h2>
        </div>
        <p className="text-gray-400 mb-6 text-sm">
          Claim your earned BARCA tokens
        </p>

        {error && (
          <div className="mb-4 text-red-400 text-sm bg-red-900/20 py-2 px-3 rounded-lg border border-red-800/50 animate-pulse">
            {error}
          </div>
        )}

        <button
          onClick={handleClaim}
          disabled={isClaiming}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 relative overflow-hidden
            ${
              isClaiming
                ? "bg-green-800/50 cursor-not-allowed"
                : "bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 shadow-md hover:shadow-lg hover:shadow-green-500/50"
            }`}
        >
          {/* Button shine effect */}
          <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>

          {isClaiming ? (
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
              Claiming...
            </span>
          ) : (
            <span className="flex items-center justify-center hover:cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-2"
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
              Claim BARCA Tokens
            </span>
          )}
        </button>

        <div className="mt-4 text-sm text-gray-400">
          <p>Your rewards will be transferred to your wallet</p>
        </div>

        <SuccessDialog
          isOpen={showSuccess}
          onClose={() => setShowSuccess(false)}
          message="Rewards claimed successfully!"
          color="green-500"
        />
      </div>
    </div>
  );
};

export default ClaimRewards;
