const setColorScheme = () => {
  if (window.matchMedia(`(prefers-color-scheme:dark)`).matches) {
    setTheme("dark");
  } else if (window.matchMedia(`(prefers-color-scheme:light)`).matches) {
    setTheme("light");
  } else {
    setTheme("default");
  }
};

useEffect(() => {
  setColorScheme();
  window
    .matchMedia(`(prefers-color-scheme:light)`)
    .addEventListener("change", (e) => {
      setColorScheme();
    });
}, []);
