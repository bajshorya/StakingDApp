import React from "react";
import { connectWallet, getContract } from "../utils/web3";
import stakingAbi from "../abis/StakingContract.json";
import { CONTRACT_ADDRESSES } from "../config";

const ClaimRewards = () => {
  const [isClaiming, setIsClaiming] = React.useState(false);

  const handleClaim = async () => {
    try {
      setIsClaiming(true);
      const signer = await connectWallet();
      const stakingContract = await getContract(
        CONTRACT_ADDRESSES.stakingContract,
        stakingAbi,
        signer
      );

      const tx = await stakingContract.claimRewards();
      await tx.wait();
      alert("Rewards claimed successfully!");
    } catch (error) {
      console.error("Claim error:", error);
      alert("Error claiming rewards. Check console for details.");
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 rounded-xl shadow-lg overflow-hidden p-6 border border-gray-700">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-green-400 mb-2">
          Claim Rewards
        </h2>
        <p className="text-gray-400 mb-6">Claim your earned BARCA tokens</p>

        <button
          onClick={handleClaim}
          disabled={isClaiming}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all 
            ${
              isClaiming
                ? "bg-green-700 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg"
            }
            focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800`}
        >
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
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Claiming...
            </span>
          ) : (
            "Claim BARCA Tokens"
          )}
        </button>

        <div className="mt-4 text-sm text-gray-400">
          <p>Your rewards will be transferred to your wallet</p>
        </div>
      </div>
    </div>
  );
};

export default ClaimRewards;
