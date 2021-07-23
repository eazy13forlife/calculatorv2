import React from "react";

import Key from "../Key/Key.js";
import "./App.scss";
import keypad from "../../keypad";

const App = () => {
  const renderedKeypad = keypad.map((keyValue, index) => {
    console.log(keyValue);
    return (
      <React.Fragment key={index}>
        <Key keyValue={keyValue} />
      </React.Fragment>
    );
  });

  return (
    <div className="Calculator">
      <div className="Calculator__screen Calculator__screen--theme">
        <p className="Caluclator__result">20700</p>
      </div>
      <div className="Calculator__body Calculator__body--theme">
        {renderedKeypad}
      </div>
    </div>
  );
};

export default App;
