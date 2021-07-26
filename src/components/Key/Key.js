import React from "react";

import "./Key.scss";

const Key = ({
  keyValue,
  theme,
  additionalClass,
  onEqualButtonClick,
  onOperatorButtonClick,
  onNumberButtonClick,
  onDeleteButtonClick,
  onResetButtonClick,
  onDecimalButtonClick,
}) => {
  const getKeyValue = () => {
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
      default:
        return keyValue;
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

  const getOnClickValue = () => {
    //if its a number or a decimal, we will run the onNumberButtonClick function
    if (!isNaN(Number(keyValue))) {
      return onNumberButtonClick(keyValue);
    }
    if (keyValue === ".") {
      return onDecimalButtonClick();
    }
    if (keyValue === "=") {
      return onEqualButtonClick();
    }
    if (keyValue === "del") {
      return onDeleteButtonClick();
    }
    if (keyValue === "reset") {
      return onResetButtonClick();
    }
    if (typeof keyValue === "string") {
      return onOperatorButtonClick(keyValue);
    }
  };

  return (
    <button
      className={`Key__button Key__button--${getKeyValue()}`}
      onClick={getOnClickValue}
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
