import React, { useState } from "react";
import Stake from "./components/Stake";
import Unstake from "./components/Unstake";
import ClaimRewards from "./components/ClaimRewards";
import WalletConnection from "./components/WalletConnection";
import StatsPanel from "./components/StatsPanel";
import { FlipWords } from "../src/components/ui/flip-words";
import { motion } from "framer-motion";
import { FaTwitter, FaGithub, FaBook } from "react-icons/fa";

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

  const socialLinks = [
    { name: "Docs", icon: <FaBook />, url: "#" },
    { name: "Twitter", icon: <FaTwitter />, url: "#" },
    { name: "GitHub", icon: <FaGithub />, url: "#" },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-800 font-sans relative overflow-hidden">
      <div className="fixed inset-0 bg-grid-white/[0.02]"></div>

      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-20"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              <div className="mt-6 flex justify-center font-bold">
                <div className="flex items-center text-sm text-gray-400">
                  <span className="flex h-2 w-2 relative mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Currently Operating on Ethereum Testnet (Sepolia)
                </div>
              </div>
            </motion.div>
          </div>
        </header>

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

        <div className="relative w-full h-32 mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-green-500/30 animate-wave opacity-50"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/50 via-blue-500/50 to-green-500/50 animate-wave-delayed opacity-30"></div>
        </div>

        <footer className="mt-16 text-center text-gray-500 text-sm relative">
          <div className="glass-card backdrop-blur-md bg-gray-900/30 border border-gray-800 rounded-xl p-6 mb-6">
            <div className="absolute inset-0 overflow-hidden opacity-20">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-purple-400"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animation: `float-${i} ${3 + i}s ease-in-out infinite`,
                  }}
                />
              ))}
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center mb-6 relative z-10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center md:justify-start mb-4 md:mb-0 group"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-green-500 p-1 flex items-center justify-center mr-3 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/50">
                  <img
                    src="/FC_Barcelona_(crest).svg"
                    alt="FC Barcelona Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-white font-semibold transition-all duration-300 group-hover:text-purple-400">
                  BARCA STAKE
                </span>
              </motion.div>
              <div className="flex space-x-6">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative text-gray-400 hover:text-purple-400 transition-colors duration-200 group text-xl"
                    aria-label={link.name}
                  >
                    {link.icon}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
                  </motion.a>
                ))}
              </div>
            </div>
            <p className="mb-4 text-gray-300 relative z-10">
              Powered by Ethereum • Built for DeFi
            </p>
            <p className="text-xs text-gray-600 relative z-10">
              By connecting your wallet, you agree to our Terms of Service and
              Privacy Policy
            </p>
          </div>
        </footer>
      </div>

      <style>
        {`
          @keyframes wave {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
          @keyframes wave-delayed {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
          @keyframes float-0 {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes float-1 {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          @keyframes float-2 {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          @keyframes float-3 {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-12px); }
          }
          @keyframes float-4 {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-wave {
            animation: wave 6s linear infinite;
          }
          .animate-wave-delayed {
            animation: wave-delayed 6s linear infinite;
            animation-delay: 2s;
          }
        `}
      </style>
    </div>
  );
}

export default App;
