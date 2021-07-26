import React, { useState } from "react";

import Key from "../Key/Key.js";
import "./App.scss";
import keypad from "../../keypad";
import {
  onEqualsClick,
  onOperatorClick,
  onNumberClick,
  reset,
  deleteNumber,
  onDecimalClick,
} from "../../calculatorFuncs";

const App = () => {
  const [firstNumber, setFirstNumber] = useState("");
  const [operator, setOperator] = useState(null);
  const [secondNumber, setSecondNumber] = useState("");
  const [view, setView] = useState(""); //what we see on calculator screen
  const [equalsPressed, setEqualsPressed] = useState(false); //if equals button has been pressed

  console.log(firstNumber, operator, secondNumber);

  const onEqualButtonClick = () => {
    return onEqualsClick(
      firstNumber,
      operator,
      secondNumber,
      setFirstNumber,
      setOperator,
      setSecondNumber,
      setView,
      setEqualsPressed,
      equalsPressed
    );
  };

  const onOperatorButtonClick = (operatorClicked) => {
    return onOperatorClick(
      firstNumber,
      operator,
      secondNumber,
      setFirstNumber,
      setOperator,
      setSecondNumber,
      setView,
      operatorClicked,
      setEqualsPressed,
      equalsPressed
    );
  };

  const onNumberButtonClick = (currentNumber) => {
    return onNumberClick(
      currentNumber,
      firstNumber,
      operator,
      secondNumber,
      setFirstNumber,
      setSecondNumber,
      setView,
      setEqualsPressed,
      equalsPressed
    );
  };

  const onDecimalButtonClick = () => {
    return onDecimalClick(
      firstNumber,
      operator,
      secondNumber,
      setFirstNumber,
      setSecondNumber,
      setView,
      equalsPressed,
      setEqualsPressed
    );
  };

  const onResetButtonClick = () => {
    reset(setFirstNumber, setOperator, setSecondNumber);
  };

  const onDeleteButtonClick = () => {
    deleteNumber(
      firstNumber,
      secondNumber,
      operator,
      setOperator,
      setFirstNumber,
      setSecondNumber,
      setView
    );
  };
  const renderedKeypad = keypad.map((keyValue, index) => {
    return (
      <React.Fragment key={index}>
        <Key
          keyValue={keyValue}
          onEqualButtonClick={onEqualButtonClick}
          onOperatorButtonClick={onOperatorButtonClick}
          onNumberButtonClick={onNumberButtonClick}
          onResetButtonClick={onResetButtonClick}
          onDeleteButtonClick={onDeleteButtonClick}
          onDecimalButtonClick={onDecimalButtonClick}
        />
      </React.Fragment>
    );
  });

  return (
    <div className="Calculator">
      <div className="Calculator__screen Calculator__screen--theme">
        <p className="Caluclator__result">{view}</p>
      </div>
      <div className="Calculator__body Calculator__body--theme">
        {renderedKeypad}
      </div>
    </div>
  );
};

export default App;
