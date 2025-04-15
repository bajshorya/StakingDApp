import Stake from "./components/Stake";
import Unstake from "./components/Unstake";
import ClaimRewards from "./components/ClaimRewards";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Animated gradient background */}
      <div className="fixed inset-0 overflow-hidden opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-gray-900 to-green-900 animate-gradient"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header with logo and title */}
        <header className="flex flex-col items-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-green-500 flex items-center justify-center mr-4">
              <span className="text-3xl">⚡</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-green-400 bg-clip-text text-transparent">
              BARCA Staking DApp
            </h1>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl text-center">
            Stake your ETH, earn BARCA rewards, and unlock the power of
            decentralized finance
          </p>
        </header>

        {/* Main content grid */}
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
            <div className="mt-8 bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-purple-300 mb-4">
                Protocol Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Total Value Locked</p>
                  <p className="text-xl font-bold">42.69 ETH</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">APY</p>
                  <p className="text-xl font-bold text-green-400">12.8%</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Total Rewards</p>
                  <p className="text-xl font-bold">1,240,000 BARCA</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Your Stake</p>
                  <p className="text-xl font-bold">3.5 ETH</p>
                </div>
              </div>
            </div>
          </div>
        </main>

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

      {/* Add this to your global CSS or App.css */}
      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }
      `}</style>
    </div>
  );
}

export default App;
