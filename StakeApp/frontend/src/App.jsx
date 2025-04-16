import React, { useState } from "react";
import Stake from "./components/Stake";
import Unstake from "./components/Unstake";
import ClaimRewards from "./components/ClaimRewards";
import WalletConnection from "./components/WalletConnection";
import StatsPanel from "./components/StatsPanel";

function App() {
  const [connectedAddress, setConnectedAddress] = useState("");

  return (
    <div className="min-h-screen bg-black font-sans relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 animate-gradient opacity-60"></div>
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4zKSIvPjwvc3ZnPg==')] bg-repeat opacity-10 animate-pulse"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="flex flex-col items-center mb-16">
          <div className="flex items-center justify-between w-full mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-green-500 flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">⚡</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-green-400 bg-clip-text text-transparent tracking-tight">
                BARCA Staking
              </h1>
            </div>
            <WalletConnection onAddressChanged={setConnectedAddress} />
          </div>
          <p className="text-gray-300 text-lg max-w-2xl text-center leading-relaxed">
            Stake ETH, earn BARCA, and unlock the power of DeFi.
          </p>
        </header>

        {connectedAddress ? (
          <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <Stake />
              <Unstake />
            </div>
            <div className="space-y-8">
              <ClaimRewards />
              <StatsPanel connectedAddress={connectedAddress} />
            </div>
          </main>
        ) : (
          <div className="text-center py-20 glass-card rounded-xl">
            <h2 className="text-3xl font-bold text-purple-400 mb-4 tracking-tight">
              Start Staking Today
            </h2>
            <p className="text-gray-300 mb-8 max-w-md mx-auto">
              Connect your wallet to stake ETH and earn BARCA rewards.
            </p>
            <button
              onClick={() =>
                document.querySelector(".connect-wallet-btn")?.click()
              }
              className="px-6 py-3 bg-purple-600 rounded-lg font-medium text-white hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-500/50"
            >
              Connect Wallet
            </button>
          </div>
        )}

        <footer className="mt-20 text-center text-gray-400 text-sm">
          <p className="mb-4">Powered by Ethereum • Built for DeFi</p>
          <div className="flex justify-center space-x-6">
            {["Docs", "Twitter", "Discord", "GitHub"].map((link) => (
              <a
                key={link}
                href="#"
                className="hover:text-purple-400 transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
