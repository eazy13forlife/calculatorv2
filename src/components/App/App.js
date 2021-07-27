import React, { useState } from "react";

import Key from "../Key/Key.js";
import "./App.scss";
import keypad from "../../keypad";

import { solve, joinAllNumbers } from "../../calculations.js";
console.log(solve([2, "**", 5]));

const App = () => {
  const [valuesArray, setValuesArray] = useState([]);
  const [result, setResult] = useState(null);

  const onButtonClick = (value) => {
    const newValues = [...valuesArray];
    newValues.push(value);
    setValuesArray(newValues);
  };
  console.log(valuesArray);
  const onEqualsClick = () => {
    const array = joinAllNumbers(valuesArray);
    const result = solve(array);
    setResult(result);
  };

  const renderedKeypad = keypad.map((keyValue, index) => {
    return (
      <React.Fragment key={index}>
        <Key
          keyValue={keyValue}
          onButtonClick={onButtonClick}
          onEqualsClick={onEqualsClick}
        />
      </React.Fragment>
    );
  });

  return (
    <div className="Calculator">
      <div className="Calculator__screen Calculator__screen--theme">
        <p className="Caluclator__math">{valuesArray}</p>
        <p className="Caluclator__result">{result}</p>
      </div>
      <div className="Calculator__body Calculator__body--theme">
        {renderedKeypad}
      </div>
    </div>
  );
};

export default App;
