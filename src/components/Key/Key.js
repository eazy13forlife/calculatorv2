import React from "react";

const Key = ({ key, theme, additionalClass }) => {
  const getAdditionalClass = () => {
    if (!additionalClass) {
      return null;
    } else
      return {
        additionalClass,
      };
  };

  return (
    <button className={`Calculator__button Calculator__button--${key}`}>
      <div
        className={`Caculator__key Calculator__key--${theme} ${getAdditionalClass()}`}
      >
        ${key}
      </div>
    </button>
  );
};

export default Key;
