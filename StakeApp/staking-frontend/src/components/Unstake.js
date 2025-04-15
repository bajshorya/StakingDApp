import React, { useState } from "react";
import { ethers } from "ethers";
import { connectWallet, getContract } from "../utils/web3";
import stakingAbi from "../abis/StakingContract.json";
import { CONTRACT_ADDRESSES } from "../config";

const Unstake = () => {
  const [amount, setAmount] = useState("");

  const handleUnstake = async () => {
    try {
      const signer = await connectWallet();
      const stakingContract = await getContract(
        CONTRACT_ADDRESSES.stakingContract,
        stakingAbi,
        signer
      );

      const tx = await stakingContract.unstake(ethers.parseEther(amount));
      await tx.wait();
      alert("Unstaked successfully!");
    } catch (error) {
      console.error("Unstaking error:", error);
      alert("Error unstaking. Check console for details.");
    }
  };

  return (
    <div className="component-box">
      <h2>Unstake ETH</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount in ETH"
      />
      <button onClick={handleUnstake}>Unstake</button>
    </div>
  );
};

export default Unstake;
