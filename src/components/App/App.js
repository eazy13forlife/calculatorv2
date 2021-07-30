import React, { useState } from "react";

import Key from "../Key/Key.js";
import "./App.scss";
import keypad from "../../keypad";

console.log(256.7 % 256.7);
import { solve, joinAllNumbers } from "../../calculations.js";
import {
  onOperatorClick,
  onNumberClick,
  onNegativeClick,
  onDecimalClick,
  onExponentClick,
  onEqualsClick,
  onDeleteClick,
  onResetClick,
  onFactorialClick,
} from "../../calculatorClickFuncs.js";

const App = () => {
  const [valuesArray, setValuesArray] = useState([]);
  const [result, setResult] = useState(null);

  const clickFunctions = {
    onOperatorClick: (operator) => {
      onOperatorClick(operator, valuesArray, setValuesArray);
    },
    onNumberClick: (number) => {
      onNumberClick(number, valuesArray, setValuesArray);
    },
    onNegativeClick: () => {
      onNegativeClick(valuesArray, setValuesArray);
    },
    onDecimalClick: () => {
      onDecimalClick(valuesArray, setValuesArray);
    },
    onExponentClick: () => {
      onExponentClick(valuesArray, setValuesArray);
    },
    onFactorialClick: () => {
      onFactorialClick(valuesArray, setValuesArray);
    },
    onDeleteClick: () => {
      onDeleteClick(valuesArray, setValuesArray);
    },
    onResetClick: () => {
      onResetClick(setValuesArray, setResult);
    },
    onEqualsClick: () => {
      onEqualsClick(joinAllNumbers, solve, valuesArray, setResult);
    },
  };

  const renderedKeypad = keypad.map((keyValue, index) => {
    return (
      <React.Fragment key={index}>
        <Key keyValue={keyValue} clickFunctions={clickFunctions} />
      </React.Fragment>
    );
  });

  const renderedScreenValues = valuesArray.map((value, index) => {
    if (value !== "_") {
      return (
        <p key={index} className="number">
          {value}
        </p>
      );
    } else {
      return (
        <p key={index} className="number number--negative">
          <span className="negative">{value}</span>
        </p>
      );
    }
  });
  return (
    <div className="Calculator Calculator--theme">
      <div className="Calculator__screen Calculator__screen--theme">
        <div className="Calculator__math Calculator__math--theme">
          {renderedScreenValues}
        </div>
        <p className="Calculator__result Calculator__result--theme">{result}</p>
      </div>
      <div className="Calculator__body Calculator__body--theme">
        {renderedKeypad}
      </div>
    </div>
  );
};

export default App;
