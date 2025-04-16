import React, { useState } from "react";
import Stake from "./components/Stake";
import Unstake from "./components/Unstake";
import ClaimRewards from "./components/ClaimRewards";
import WalletConnection from "./components/WalletConnection";
import StatsPanel from "./components/StatsPanel";

function App() {
  const [connectedAddress, setConnectedAddress] = useState("");

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Animated gradient background */}
      <div className="fixed inset-0 overflow-hidden opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-gray-900 to-green-900 animate-gradient"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header with logo and title */}
        <header className="flex flex-col items-center mb-12">
          <div className="flex items-center justify-between w-full mb-4">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-green-500 flex items-center justify-center mr-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-green-400 bg-clip-text text-transparent">
                BARCA Staking DApp
              </h1>
            </div>
            <WalletConnection onAddressChanged={setConnectedAddress} />
          </div>
          <p className="text-gray-400 text-lg max-w-2xl text-center">
            Stake your ETH, earn BARCA rewards, and unlock the power of
            decentralized finance
          </p>
        </header>

        {connectedAddress ? (
          <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Stake/Unstake section */}
            <div className="space-y-8">
              <Stake />
              <Unstake />
            </div>

            {/* Claim rewards section */}
            <div className="flex flex-col">
              <ClaimRewards />
              {/* Stats panel */}
              <StatsPanel connectedAddress={connectedAddress} />
            </div>
          </main>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">
              Connect your wallet to get started
            </h2>
            <p className="text-gray-400 mb-6">
              Please connect your Ethereum wallet to stake, unstake, or claim
              rewards
            </p>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>
            Powered by Ethereum • Secure smart contracts • Decentralized finance
          </p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="hover:text-purple-400 transition">
              Docs
            </a>
            <a href="#" className="hover:text-purple-400 transition">
              Twitter
            </a>
            <a href="#" className="hover:text-purple-400 transition">
              Discord
            </a>
            <a href="#" className="hover:text-purple-400 transition">
              GitHub
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
