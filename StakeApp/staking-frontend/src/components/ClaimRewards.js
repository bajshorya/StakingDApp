import React from "react";
import { connectWallet, getContract } from "../utils/web3";
import stakingAbi from "../abis/StakingContract.json";
import { CONTRACT_ADDRESSES } from "../config";

const ClaimRewards = () => {
  const handleClaim = async () => {
    try {
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
    }
  };

  return (
    <div className="component-box">
      <h2>Claim Rewards</h2>
      <button onClick={handleClaim}>Claim BARCA Tokens</button>
    </div>
  );
};

export default ClaimRewards;
