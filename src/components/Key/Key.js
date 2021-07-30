import React from "react";

import "./Key.scss";

const Key = ({ keyValue, theme, additionalClass, clickFunctions }) => {
  const getKeyClassName = () => {
    switch (keyValue) {
      case "+":
        return "add";
      case "-":
        return "subtract";
      case "/":
        return "divide";
      case "x":
        return "multiply";
      case "=":
        return "equals";
      case ".":
        return "decimal";
      case "!":
        return "factorial";
      case "+/-":
        return "negative";
      case "^":
        return "exponent";
      default:
        return keyValue;
    }
  };

  const onButtonClick = (value) => {
    switch (value) {
      case "x":
      case "/":
      case "-":
      case "+":
        return clickFunctions.onOperatorClick(value);
      case "=":
        return clickFunctions.onEqualsClick();
      case "reset":
        return clickFunctions.onResetClick();
      case "del":
        return clickFunctions.onDeleteClick();
      case "!":
        return clickFunctions.onFactorialClick();
      case "^":
        return clickFunctions.onExponentClick();
      case ".":
        return clickFunctions.onDecimalClick();
      case "+/-":
        console.log("hey");
        return clickFunctions.onNegativeClick();
      default:
        return clickFunctions.onNumberClick(value);
    }
  };

  const getAdditionalClass = () => {
    if (!additionalClass) {
      return null;
    } else
      return {
        additionalClass,
      };
  };

  return (
    <button
      className={`Key__button  Key__button--theme Key__button--${getKeyClassName()}`}
      onClick={() => {
        onButtonClick(keyValue);
      }}
    >
      <div
        className={`Key__value Key__value--${theme} ${getAdditionalClass()}`}
      >
        {keyValue}
      </div>
    </button>
  );
};

export default Key;
