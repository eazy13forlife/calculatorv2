import React, { useState } from "react";

import Key from "../Key/Key.js";
import "./App.scss";
import keypad from "../../keypad";
import Toggle from "../Toggle/Toggle.js";
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

import useColorTheme from "../../Hooks/useColorTheme.js";

const App = () => {
  const [valuesArray, setValuesArray] = useState([]);
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [theme, setTheme] = useColorTheme();

  const clickFunctions = {
    onOperatorClick: (operator) => {
      onOperatorClick(
        operator,
        valuesArray,
        setValuesArray,
        result,
        setResult,
        setErrorMessage
      );
    },
    onNumberClick: (number) => {
      onNumberClick(
        number,
        valuesArray,
        setValuesArray,
        result,
        setResult,
        setErrorMessage
      );
    },
    onNegativeClick: () => {
      onNegativeClick(
        valuesArray,
        setValuesArray,
        result,
        setResult,
        setErrorMessage
      );
    },
    onDecimalClick: () => {
      onDecimalClick(valuesArray, setValuesArray, setErrorMessage);
    },
    onExponentClick: () => {
      onExponentClick(
        valuesArray,
        setValuesArray,
        result,
        setResult,
        setErrorMessage
      );
    },
    onFactorialClick: () => {
      onFactorialClick(
        valuesArray,
        setValuesArray,
        result,
        setResult,
        setErrorMessage
      );
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
        <Key
          keyValue={keyValue}
          clickFunctions={clickFunctions}
          theme={theme}
        />
      </React.Fragment>
    );
  });

  const renderedScreenValues = valuesArray.map((value, index) => {
    if (value !== "_") {
      return (
        <p
          key={index}
          className={`Calculator__screen-number ${
            value === "x" ? "Calculator__screen-number--multiply" : ""
          } ${value === "-" ? "Calculator__screen-number--subtract" : ""}
          ${value === "+" ? "Calculator__screen-number--add" : ""}
          ${value === "/" ? "Calculator__screen-number--divide" : ""}
          ${
            value === "/" ? "Calculator__screen-number--divide" : ""
          } ${`Calculator__screen-number--${theme}`}`}
        >
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
    <main className={`Calculator__background Calculator__background--${theme}`}>
      <div className={`Calculator Calculator--${theme}`}>
        <div className={`Calculator__heading Calculator__heading--${theme}`}>
          <h1 className={`Calculator__logo `}>calc</h1>
          <div className="Calculator__toggle">
            <p className=" Calculator__text">Theme</p>
            <Toggle onRadioSelection={setTheme} theme={theme} />
          </div>
        </div>
        <span className="text">{errorMessage}</span>
        <div className={`Calculator__screen Calculator__screen--${theme}`}>
          <div className="Calculator__math Calculator__math--theme">
            {renderedScreenValues}
          </div>
          <p className={`Calculator__result Calculator__result--${theme}`}>
            {result}
          </p>
        </div>
        <div className={`Calculator__body Calculator__body--${theme}`}>
          {renderedKeypad}
        </div>
      </div>
    </main>
  );
};

export default App;
