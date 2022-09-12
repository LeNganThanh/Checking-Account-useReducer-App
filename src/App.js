import React, { useEffect, useReducer } from "react";
import "./App.css";

//declare balance and reducer
const initialBalance = Number(localStorage.getItem("balance")) || 0;

const initialState = {
  balance: initialBalance,
  deposit: "",
  withdraw: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "updateDepositStr": {
      return {
        ...state,
        deposit: action.deposit,
      };
    }
    case "updateWithdrawalStr": {
      return {
        ...state,
        withdraw: action.withdraw,
      };
    }
    case "deposit": {
      return {
        ...state,
        balance: parseInt(state.balance) + parseInt(state.deposit),
        deposit: "",
      };
    }
    case "withdraw": {
      return {
        ...state,
        balance: state.balance - parseInt(state.withdraw),
        withdraw: "",
      };
    }
    default: {
      throw new Error();
    }
  }
};

//refactor checking account by using useReducer
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("balance", state.balance);
  }, [state.balance]);

  function updateDepositStr(e) {
    dispatch({
      type: "updateDepositStr",
      deposit: e.target.value,
    });
  }

  function updateWithdrawalStr(e) {
    dispatch({
      type: "updateWithdrawalStr",
      withdraw: e.target.value,
    });
  }

  function deposit() {
    dispatch({
      type: "deposit",
    });
  }

  function withdraw() {
    dispatch({
      type: "withdraw",
    });
  }
  return (
    <div className="container">
      <h1>Your current balance is {state.balance}</h1>
      <div>
        <div>
          <input onChange={updateDepositStr} value={state.deposit} />
          <button onClick={deposit}>Deposit</button>
        </div>
        <div>
          <input onChange={updateWithdrawalStr} value={state.withdraw} />
          <button onClick={withdraw}>Withdraw</button>
        </div>
      </div>
    </div>
  );
}

export default App;
