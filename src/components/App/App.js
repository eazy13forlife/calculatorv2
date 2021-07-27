import React, { useState } from "react";

import Key from "../Key/Key.js";
import "./App.scss";
import keypad from "../../keypad";

import { solve, joinAllNumbers } from "../../calculations.js";

console.log(solve([2, "-", "9"]));
/*
console.log(
  joinAllNumbers(
    [
      "2",
      "3",
      "4",
      "x",
      "5",
      "-",
      "6",
      "9",
      "+",
      "1",
      "!",
      "x",
      "3",
      "x",
      "5",
      "9",
      "**",
      "2",
      "!",
      "x",
      "4",
      "x",
      "5",
    ],
    0
  )
);
*/
console.log(joinAllNumbers([2, "+", "_", 5]));
console.log(2 ** 8);
const App = () => {
  const [valuesArray, setValuesArray] = useState([]);
  const [result, setResult] = useState(null);

  const renderedKeypad = keypad.map((keyValue, index) => {
    return (
      <React.Fragment key={index}>
        <Key keyValue={keyValue} />
      </React.Fragment>
    );
  });

  return (
    <div className="Calculator">
      <div className="Calculator__screen Calculator__screen--theme">
        <p className="Caluclator__result">1248</p>
      </div>
      <div className="Calculator__body Calculator__body--theme">
        {renderedKeypad}
      </div>
    </div>
  );
};

export default App;
