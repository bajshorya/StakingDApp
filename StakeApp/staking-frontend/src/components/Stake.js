import React, { useState } from "react";
import { ethers } from "ethers";
import { connectWallet, getContract } from "../utils/web3";
import stakingAbi from "../abis/StakingContract.json";
import { CONTRACT_ADDRESSES } from "../config";

const Stake = () => {
  const [amount, setAmount] = useState("");

  const handleStake = async () => {
    try {
      if (!amount || isNaN(amount) || Number(amount) <= 0) {
        alert("Please enter a valid amount of ETH to stake.");
        return;
      }

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
    } catch (error) {
      console.error("Staking error:", error);
      alert("Error staking. Check console for details.");
    }
  };

  return (
    <div className="component-box">
      <h2>Stake ETH</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount in ETH"
      />
      <button onClick={handleStake}>Stake</button>
    </div>
  );
};

export default Stake;
