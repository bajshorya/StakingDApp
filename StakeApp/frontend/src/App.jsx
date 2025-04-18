import React, { useState } from "react";
import Stake from "./components/Stake";
import Unstake from "./components/Unstake";
import ClaimRewards from "./components/ClaimRewards";
import WalletConnection from "./components/WalletConnection";
import StatsPanel from "./components/StatsPanel";
import { FlipWords } from "../src/components/ui/flip-words";
import { motion } from "framer-motion";

function App() {
  const [connectedAddress, setConnectedAddress] = useState("");
  const words = ["Stake ETH", "Earn BARCA", "Decentralized", "Trustless"];

  const features = [
    {
      title: "Non-Custodial",
      description: "You maintain full control of your assets at all times",
      icon: "🔒",
    },
    {
      title: "Smart Contract",
      description: "Powered by audited Ethereum smart contracts",
      icon: "📜",
    },
    {
      title: "DeFi Native",
      description: "Seamlessly integrates with the DeFi ecosystem",
      icon: "🔄",
    },
    {
      title: "Zero Fees",
      description: "No platform fees - you keep 100% of rewards",
      icon: "💸",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 font-sans relative overflow-hidden">
      {/* Grid background */}
      <div className="fixed inset-0 bg-grid-white/[0.02]"></div>

      {/* Animated dots background */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-20"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center mb-4 md:mb-0"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-green-500 p-1 flex items-center justify-center mr-4">
                <img
                  src="/FC_Barcelona_(crest).svg"
                  alt="FC Barcelona Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-green-400">
                BARCA STAKE
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <WalletConnection onAddressChanged={setConnectedAddress} />
            </motion.div>
          </div>

          <div className="text-center mb-8 relative overflow-hidden rounded-xl bg-gray-900/50 p-8 backdrop-blur-sm border border-gray-800">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-4xl sm:text-5xl font-bold text-white mb-4">
                <FlipWords words={words} className="text-white" />
              </div>
              <p className="text-gray-300 text-xl">
                A decentralized staking protocol built on Ethereum
              </p>
              <div className="mt-6 flex justify-center">
                <div className="flex items-center text-sm text-gray-400">
                  <span className="flex h-2 w-2 relative mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Ethereum Mainnet
                </div>
              </div>
            </motion.div>
          </div>
        </header>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-black p-6 rounded-lg border border-gray-800 h-full"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        {connectedAddress ? (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
          >
            <div className="space-y-8">
              <Stake />
              <Unstake />
            </div>
            <div className="space-y-8">
              <ClaimRewards />
              <StatsPanel connectedAddress={connectedAddress} />
            </div>
          </motion.main>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center py-16 rounded-xl max-w-md mx-auto relative overflow-hidden bg-gradient-to-br from-purple-900/30 to-green-900/30 backdrop-blur-sm border border-gray-800"
          >
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-4">
                Start Staking Today
              </h2>
              <p className="text-gray-300 mb-6">
                Connect your wallet to stake ETH and earn BARCA rewards.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  document.querySelector(".connect-wallet-btn")?.click()
                }
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-green-600 rounded-lg font-medium text-white hover:opacity-90 transition-all shadow-lg"
              >
                Connect Wallet
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Blockchain Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-gray-900/50 rounded-xl p-6 mb-16 border border-gray-800"
        >
          <h3 className="text-xl font-semibold text-white mb-4">
            Protocol Stats
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-black/50 p-4 rounded-lg border border-gray-800">
              <div className="text-gray-400 text-sm">Total Value Locked</div>
              <div className="text-2xl font-bold text-purple-400">$42.8M</div>
            </div>
            <div className="bg-black/50 p-4 rounded-lg border border-gray-800">
              <div className="text-gray-400 text-sm">Total Stakers</div>
              <div className="text-2xl font-bold text-green-400">12,492</div>
            </div>
            <div className="bg-black/50 p-4 rounded-lg border border-gray-800">
              <div className="text-gray-400 text-sm">APY</div>
              <div className="text-2xl font-bold text-white">8.24%</div>
            </div>
            <div className="bg-black/50 p-4 rounded-lg border border-gray-800">
              <div className="text-gray-400 text-sm">BARCA Price</div>
              <div className="text-2xl font-bold text-white">$0.42</div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="flex items-center justify-center md:justify-start mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-green-500 p-1 flex items-center justify-center mr-3">
                <img
                  src="/FC_Barcelona_(crest).svg"
                  alt="FC Barcelona Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-white">BARCA STAKE</span>
            </div>
            <div className="flex space-x-6">
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
          </div>
          <p className="mb-4">Powered by Ethereum • Built for DeFi</p>
          <p className="text-xs text-gray-600">
            By connecting your wallet, you agree to our Terms of Service and
            Privacy Policy
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
