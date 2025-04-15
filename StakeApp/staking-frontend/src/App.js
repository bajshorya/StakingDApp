import React from "react";
import Stake from "./components/Stake";
import Unstake from "./components/Unstake";
import ClaimRewards from "./components/ClaimRewards";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>⚡ Barca Staking DApp</h1>
      <Stake />
      <Unstake />
      <ClaimRewards />
    </div>
  );
}

export default App;
