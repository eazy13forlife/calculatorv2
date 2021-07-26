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

  return (
    <button className={`Key__button Key__button--${getKeyValue()}`}>
      <div
        className={`Key__value Key__value--${theme} ${getAdditionalClass()}`}
      >
        {keyValue}
      </div>
    </button>
  );
};

export default Key;
