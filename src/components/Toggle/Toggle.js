import React from "react";

import "./Toggle.scss";

const Toggle = ({ onRadioSelection }) => {
  return (
    <div className="Toggle">
      <div className="Toggle__options">
        <p>1</p>
        <p>2</p>
        <p>3</p>
      </div>
      <div className="Toggle__container Toggle__container--theme">
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
        <div className="Toggle__circle Toggle__circle--theme"></div>
      </div>
    </div>
  );
};
export default Toggle;
