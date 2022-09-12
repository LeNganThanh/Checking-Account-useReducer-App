import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // const initialBalance = Number(localStorage.getItem('balance')) || 0;
  // const [balance, setBalance] = useState(initialBalance);
  const [balance, setBalance] = useState(0);
  const [depositStr, setDepositStr] = useState(0);
  const [withdrawalStr, setWithdrawalStr] = useState(0);

  // on mount, retrieve the balance from localStorage
  useEffect(() => {
    const storageBalance = localStorage.getItem('balance');
    if (storageBalance) {
      setBalance(parseInt(storageBalance));
    }
  }, []); // to ensure that useEffect runs only after the first render

  useEffect(() => {
    localStorage.setItem('balance', balance);
  }, [balance]) // whenever balance changes, this effect will be executed

  function updateDepositStr(e) {
    setDepositStr(e.target.value);
  }

  function updateWithdrawalStr(e) {
    setWithdrawalStr(e.target.value);
  }

  function deposit() {
    setBalance(balance => balance + parseInt(depositStr));
    setDepositStr(0);
  }

  function withdraw() {
    setBalance(balance => balance - parseInt(withdrawalStr));
    setWithdrawalStr(0);
  }
  return (
    <div className="App">
      <h1>Your current balance is {balance}</h1>
      <div>
        <input onChange={updateDepositStr} value={depositStr}/>
        <button onClick={deposit}>Deposit</button>
      </div>
      <div>
        <input onChange={updateWithdrawalStr} value={withdrawalStr}/>
        <button onClick={withdraw}>Withdraw</button>
      </div>
    </div>
  );
}

export default App;
