import React, { useState, useEffect } from "react";

const setColorScheme = () => {
  if (window.matchMedia(`(prefers-color-scheme:dark)`).matches) {
    return "dark";
  } else if (window.matchMedia(`(prefers-color-scheme:light)`).matches) {
    return "light";
  } else {
    return "default";
  }
};

const useColorTheme = () => {
  const [theme, setTheme] = useState(setColorScheme());

  useEffect(() => {
    window
      .matchMedia(`(prefers-color-scheme:light)`)
      .addEventListener("change", (e) => {
        console.log("foo");
        setTheme(setColorScheme());
      });
  }, []);

  return [theme, setTheme];
};

export default useColorTheme;
