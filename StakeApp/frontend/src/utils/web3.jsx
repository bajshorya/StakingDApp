import { ethers } from "ethers";

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const signer = await provider.getSigner();
      return signer;
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      throw error;
    }
  } else {
    throw new Error("MetaMask is not installed");
  }
};

export const getContract = async (address, abi, signer) => {
  return new ethers.Contract(address, abi, signer);
};
