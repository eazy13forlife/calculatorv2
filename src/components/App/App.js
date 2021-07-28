import React, { useState } from "react";

import Key from "../Key/Key.js";
import "./App.scss";
import keypad from "../../keypad";

import { solve, joinAllNumbers } from "../../calculations.js";
console.log(solve([2, "**", 5]));

const App = () => {
  const [valuesArray, setValuesArray] = useState([]);
  const [result, setResult] = useState(null);

  const onNumberAndOperatorClick = (value) => {
    const newValues = [...valuesArray];
    if (!valuesArray.length) {
      switch (value) {
        case "+":
        case "-":
        case "x":
        case "^":
        case "/":
          newValues.push("0", value);
          setValuesArray(newValues);
          break;
        default:
          newValues.push(value);
          setValuesArray(newValues);
      }
    } else {
      newValues.push(value);
      setValuesArray(newValues);
    }
  };

  const onOperatorClick = (operator, valuesArray, setValuesArray) => {
    const newValues = [...valuesArray];
    //if length of newValues doesn't exist, we need to push in 0 before the operator
    if (!newValues.length) {
      newValues.push("0", operator);
      setValuesArray(newValues);
      return;
    }
    //if the last item in newValues is one of our operators, we change that operator to whatever we just clicked.Otherwise, the default is pushing in our operator
    switch (newValues[newValues.length - 1]) {
      case "+":
      case "-":
      case "x":
      case "/":
        newValues[newValues.length - 1] = operator;
        setValuesArray(newValues);
        return;
      default:
        newValues.push(operator);
        setValuesArray(newValues);
    }
  };

  const onNumberClick = (number, valuesArray, setValuesArray) => {
    const newValues = [...valuesArray];

    //if the last value is a factorial, don't push in a number. An operator has to
    //follow a factorial
    if (newValues[newValues.length - 1] === "!") {
      return;
    }

    newValues.push(number);
    setValuesArray(newValues);
  };

  const onNegativeClick = (valuesArray, setValuesArray) => {
    const newValues = [...valuesArray];

    //if the last value is a factorial, don't push in the negative sign. An operator has to
    //follow a factorial
    if (newValues[newValues.length - 1] === "!") {
      return;
    }

    //if the last value is a number or a decimal and we are trying to push in the negative sign, don't do it.
    if (
      !isNaN(+newValues[newValues.length - 1]) ||
      newValues[newValues.length - 1] === "."
    ) {
      return;
    }

    newValues.push("_");
    setValuesArray(newValues);
  };

  const onDecimalClick = (valuesArray, setValuesArray) => {
    const newValues = [...valuesArray];

    //if the last value is a factorial, don't push in the decimal. An operator has to
    //follow a factorial
    if (newValues[newValues.length - 1] === "!") {
      return;
    }

    //if the last value is an operator or underscore(negative sign) or it doesn't exist, push in a 0 before we push in the decimal
    switch (newValues[newValues.length - 1]) {
      case undefined:
      case "x":
      case "/":
      case "+":
      case "-":
      case "_":
        newValues.push("0", ".");
        setValuesArray(newValues);
        return;
      default:
        break;
    }

    //if the last value is a decimal, don't push in the decimal. We don't want multiple successive decimals
    if (newValues[newValues.length - 1] === ".") {
      return;
    }

    newValues.push(".");
    setValuesArray(newValues);
  };

  const onExponentClick = (valuesArray, setValuesArray) => {
    const newValues = [...valuesArray];

    //if the last value is a decimal and we click equal sign
    switch (newValues[newValues.length - 1]) {
      case ".":
        newValues.push(0, "^");
        setValuesArray(newValues);
        return;
      case undefined:
      case "x":
      case "/":
      case "+":
      case "-":
      case "_":
      case "!":
        return;
      default:
        break;
    }

    newValues.push("^");
    setValuesArray(newValues);
  };

  console.log(valuesArray);
  const onEqualsClick = () => {
    const array = joinAllNumbers(valuesArray);
    const result = solve(array);
    const newValues = result.toString().split("");
    setResult(result);
  };

  const onDeleteClick = () => {
    const newValues = [...valuesArray];
    newValues.pop();
    setValuesArray(newValues);
  };

  const onResetClick = () => {
    setValuesArray([]);
  };

  const renderedKeypad = keypad.map((keyValue, index) => {
    return (
      <React.Fragment key={index}>
        <Key
          keyValue={keyValue}
          onNumberAndOperatorClick={onNumberAndOperatorClick}
          onEqualsClick={onEqualsClick}
          onDeleteClick={onDeleteClick}
          onResetClick={onResetClick}
        />
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
          <p className="negative">{value}</p>
        </p>
      );
    }
  });
  return (
    <div className="Calculator">
      <div className="Calculator__screen Calculator__screen--theme">
        <p className="Calculator__math">{renderedScreenValues}</p>
        <p className="Caluclator__result">{result}</p>
      </div>
      <div className="Calculator__body Calculator__body--theme">
        {renderedKeypad}
      </div>
    </div>
  );
};

export default App;
