import { ethers } from "ethers"; // Add this import

export const connectWallet = async () => {
  try {
    if (!window.ethereum) {
      throw new Error("No Ethereum provider found. Please install MetaMask!");
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    return signer;
  } catch (error) {
    console.error("Error connecting wallet:", error);
    throw error;
  }
};

export const getContract = (address, abi, signer) => {
  return new ethers.Contract(address, abi, signer);
};
