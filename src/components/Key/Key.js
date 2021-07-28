import React from "react";

import "./Key.scss";

const Key = ({
  keyValue,
  theme,
  additionalClass,
  onNumberAndOperatorClick,
  onEqualsClick,
  onDeleteClick,
  onResetClick,
}) => {
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
      case "=":
        return onEqualsClick();
      case "+/-":
        return onNumberAndOperatorClick("_");
      case "del":
        return onDeleteClick();
      case "reset":
        return onResetClick();
      default:
        return onNumberAndOperatorClick(value);
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
      className={`Key__button Key__button--${getKeyClassName()}`}
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
