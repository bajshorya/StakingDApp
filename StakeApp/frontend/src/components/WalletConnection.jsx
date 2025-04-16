import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const WalletConnection = ({ onAddressChanged }) => {
  const [account, setAccount] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState("");

  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      setError("");

      if (!window.ethereum) {
        throw new Error("Please install MetaMask or another Ethereum wallet");
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        setAccount(accounts[0]);
        if (onAddressChanged) onAddressChanged(accounts[0]);
      }
    } catch (err) {
      console.error("Wallet connection error:", err);
      setError(err.message);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount("");
    if (onAddressChanged) onAddressChanged("");
  };

  useEffect(() => {
    const checkConnectedWallet = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            if (onAddressChanged) onAddressChanged(accounts[0]);
          }
        } catch (err) {
          console.error("Error checking connected wallet:", err);
        }
      }
    };

    checkConnectedWallet();

    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        if (onAddressChanged) onAddressChanged(accounts[0]);
      } else {
        disconnectWallet();
      }
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, [onAddressChanged]);

  return (
    <div className="flex items-center">
      {account ? (
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-gray-700 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm font-mono">
              {`${account.substring(0, 6)}...${account.substring(
                account.length - 4
              )}`}
            </span>
          </div>
          <button
            onClick={disconnectWallet}
            className="px-3 py-1 text-sm rounded-full bg-gray-600 hover:bg-gray-500 transition"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          disabled={isConnecting}
          className={`px-4 py-2 rounded-full font-medium text-white transition-all ${
            isConnecting
              ? "bg-purple-700 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </button>
      )}
      {error && <div className="ml-4 text-red-400 text-sm">{error}</div>}
    </div>
  );
};

export default WalletConnection;
