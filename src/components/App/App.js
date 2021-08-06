import React, { useState, useEffect } from "react";

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

  //creating my keydown events for each key on calculator
  useEffect(() => {
    const operations = (e) => {
      switch (e.key) {
        case "x":
        case "/":
        case "-":
        case "+":
          return clickFunctions.onOperatorClick(e.key);
        case "=":
        case "Enter":
          return clickFunctions.onEqualsClick();
        case "c":
          return clickFunctions.onResetClick();
        case "Backspace":
          return clickFunctions.onDeleteClick();
        case "!":
          return clickFunctions.onFactorialClick();
        case "^":
          return clickFunctions.onExponentClick();
        case ".":
          return clickFunctions.onDecimalClick();
        case "_":
          return clickFunctions.onNegativeClick();
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          return clickFunctions.onNumberClick(e.key);
        default:
          break;
      }
    };
    document.addEventListener("keydown", operations);

    return () => {
      document.removeEventListener("keydown", operations);
    };
  }, [valuesArray]);

  //click functions for when we click on a button
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
      onDecimalClick(
        valuesArray,
        setValuesArray,
        result,
        setResult,
        setErrorMessage
      );
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
      onDeleteClick(valuesArray, setValuesArray, setErrorMessage);
    },
    onResetClick: () => {
      onResetClick(setValuesArray, setResult, setErrorMessage);
    },
    onEqualsClick: () => {
      onEqualsClick(joinAllNumbers, solve, valuesArray, setResult);
    },
  };

  //create our keypad for our calculator
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

  const renderScreenOperatorClasses = (value) => {
    switch (value) {
      case "x":
        return "Calculator__screen-number--operator Calculator__screen-number--operator--multiply";
      case "-":
        return "Calculator__screen-number--operator Calculator__screen-number--operator--subtract";
      case "/":
      case "+":
        return "Calculator__screen-number--operator";
      default:
        return "";
    }
  };

  //renders each value we see on calculator screen
  const renderedScreenValues = valuesArray.map((value, index) => {
    if (value !== "_") {
      return (
        <p
          key={index}
          className={`Calculator__screen-number ${renderScreenOperatorClasses(
            value
          )} ${`Calculator__screen-number--${theme}`}`}
        >
          {value}
        </p>
      );
    } else {
      return (
        <p
          key={index}
          className="Calculator__screen-number Calculator__screen-number--negative "
        >
          {value}
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
          <p className="Calculator__error-message">{errorMessage}</p>
        </div>

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
