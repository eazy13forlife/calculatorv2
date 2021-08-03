import React from "react";

import "./Toggle.scss";

const Toggle = ({ onRadioSelection, theme }) => {
  const getToggleCirclePosition = () => {
    switch (theme) {
      case "default":
        return {
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        };
      case "light":
        return {
          top: "50%",
          left: " 2%",
          transform: "translateX(0%) translateY(-50%)",
        };
      case "dark":
        return {
          top: "50%",
          left: " 98%",
          transform: "translateX(-100%) translateY(-50%)",
        };
      default:
        return null;
    }
  };

  return (
    <div className="Toggle">
      <div className="Toggle__options">
        <p>1</p>
        <p>2</p>
        <p>3</p>
      </div>
      <div className={`Toggle__container Toggle__container--${theme}`}>
        <input
          type="radio"
          className="Toggle__radio-button Toggle__radio-button--light"
          id="light"
          value="light"
          name="theme"
          onChange={(e) => {
            onRadioSelection(e.target.value);
          }}
        />
        <input
          type="radio"
          className="Toggle__radio-button Toggle__radio-button--default"
          id="default"
          value="default"
          name="theme"
          onChange={(e) => {
            onRadioSelection(e.target.value);
          }}
        />
        <input
          type="radio"
          className="Toggle__radio-button Toggle__radio-button--dark"
          id="dark"
          value="dark"
          name="theme"
          onChange={(e) => {
            onRadioSelection(e.target.value);
          }}
        />
        <label htmlFor="light" className="Toggle__reference"></label>
        <label htmlFor="default" className="Toggle__reference"></label>
        <label htmlFor="dark" className="Toggle__reference"></label>
        <div
          className={`Toggle__circle Toggle__circle--${theme}`}
          style={getToggleCirclePosition()}
        ></div>
      </div>
    </div>
  );
};
export default Toggle;
