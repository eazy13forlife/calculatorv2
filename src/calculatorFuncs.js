//lets us know if a number has been selected
const hasInputNumber = (number) => {
  if (number || number === "0") {
    return true;
  }
};

//let us know if an operator has been selected
const hasInputOperator = (operator) => {
  if (
    operator === "-" ||
    operator === "x" ||
    operator === "+" ||
    operator === "/"
  ) {
    return true;
  }
};

//lets us know if we're ready to perform an operation between two numbers
const allValuesEntered = (firstNumber, operator, secondNumber) => {
  const validFirstNumber = hasInputNumber(firstNumber);
  const validSecondNumber = hasInputNumber(secondNumber);
  const validOperator = hasInputOperator(operator);
  if (validFirstNumber && validSecondNumber && validOperator) {
    return true;
  } else {
    return false;
  }
};

//let us know if no values have been entered yet.
const noValuesEntered = (firstNumber, operator, secondNumber) => {
  const validFirstNumber = hasInputNumber(firstNumber);
  const validSecondNumber = hasInputNumber(secondNumber);
  const validOperator = hasInputOperator(operator);
  if (!validFirstNumber && !validSecondNumber && !validOperator) {
    return true;
  } else {
    return false;
  }
};

//solves an equation involving two numbers and an operator. *toFixed() returns a string.
const solve = (firstNumber, operator, secondNumber) => {
  firstNumber = +firstNumber;
  secondNumber = +secondNumber;
  if (operator === "+") {
    return (firstNumber + secondNumber).toFixed(3);
  } else if (operator === "-") {
    return (firstNumber - secondNumber).toFixed(3);
  } else if (operator === "/") {
    return (firstNumber / secondNumber).toFixed(3);
  } else if (operator === "x") {
    return (firstNumber * secondNumber).toFixed(3);
  } else {
    return undefined;
  }
};

//when equals sign is selected, if we can solve, we solve. Otherwise, we don't do anything.
const onEqualsClick = (
  firstNumber,
  operator,
  secondNumber,
  setFirstNumber,
  setOperator,
  setSecondNumber,
  setView,
  setEqualsPressed
) => {
  if (allValuesEntered(firstNumber, operator, secondNumber)) {
    const value = solve(firstNumber, operator, secondNumber);
    //if value exists and it doesn't equal Infinity
    if (value && value !== "Infinity") {
      setFirstNumber(value.toString());
      setView(value.toString());
    } else {
      setFirstNumber(""); //we clear firstNumber,because it is infinity and we make it empty again
      setView("Error");
    }
    setOperator(null);
    setSecondNumber("");
    setEqualsPressed(true);
  }
};

//when an operator is selected, if we can solve, we solve with the current values. //Otherwise, if there is only one number selected or one number and an operator   already selected, we set operator to the new operatorclicked.
//if no values selected, we don't do anything with operator.
const onOperatorClick = (
  firstNumber,
  operator,
  secondNumber,
  setFirstNumber,
  setOperator,
  setSecondNumber,
  setView,
  newOperator,
  setEqualsPressed,
  equalsPressed
) => {
  if (allValuesEntered(firstNumber, operator, secondNumber)) {
    const value = solve(firstNumber, operator, secondNumber);
    if (value && value !== "Infinity") {
      setView(value.toString());
    } else {
      setView("Error");
    }
    setFirstNumber(value.toString()); //even if value.toString() is infinity, we keep firstNumber as infinity instead of firstNumber  equaling "" because then when we select a number again, we will be dealing with the first number instead of the second number, which is not what should happen after an operator is clicked after all 3 values have been enterred
    setOperator(newOperator);
    setSecondNumber("");
  } else if (!noValuesEntered(firstNumber, operator, secondNumber)) {
    if (equalsPressed) {
      //if equals sign is pressed before clicking operator, we still change the operator(even if equals sign is not)but we change setEqualsPressed to false since it wasn't just clicked
      setEqualsPressed(false);
    }
    setOperator(newOperator);
  }
};

//function that runs when we click a number on our calculator
const onNumberClick = (
  currentNumber,
  firstNumber,
  operator,
  secondNumber,
  setFirstNumber,
  setSecondNumber,
  setView,
  setEqualsPressed,
  equalsPressed
) => {
  //if no operator is selected and no second number is selected, then we are just dealing with firstNumber.If equals sign was just clicked and we are typing a number, we want our number to start from being empty
  if (!hasInputOperator(operator) && !hasInputNumber(secondNumber)) {
    let newNumber;
    if (equalsPressed) {
      //if the equals sign was just pressed and we are clicking a number we start that number from scratch before adding the rest of numbers. Then we want to set equalsPressed back to false
      newNumber = "";
      setEqualsPressed(false);
    } else {
      newNumber = firstNumber;
    }
    newNumber += currentNumber;
    setFirstNumber(newNumber);
    setView(newNumber);
    //if first number and operator both provided, then we are just typing in our second number
  } else if (hasInputNumber(firstNumber) && hasInputOperator(operator)) {
    let newNumber = secondNumber;
    newNumber += currentNumber;
    setSecondNumber(newNumber);
    setView(newNumber);
  }
};

//when we click on a decimal, essentially, same as number click, but we just want to make sure a decimal hasn't already been clicked and put a 0 in front of decimal.
const onDecimalClick = (
  firstNumber,
  operator,
  secondNumber,
  setFirstNumber,
  setSecondNumber,
  setView,
  equalsPressed,
  setEqualsPressed
) => {
  if (!hasInputOperator(operator) && !hasInputNumber(secondNumber)) {
    let newNumber;
    //if we just pressed equals sign, then newNumber will start out as 0,because we want 0 to precede our decimals. Also we then reset equalsPressed to false.
    if (equalsPressed) {
      newNumber = "0";
      setEqualsPressed(false);
    } else {
      //otherwise, newNumber will equal firstNumber, but if firstNumber has no length, then newNumber wil start by equaling 0,because we want 0 to precede our decimals.
      newNumber = firstNumber;
      if (newNumber.length === 0) {
        newNumber = "0";
      }
    }

    const newNumberArray = newNumber.split("");

    if (!newNumberArray.includes(".")) {
      newNumber += ".";
      setFirstNumber(newNumber);
      setView(newNumber);
    }
  } else if (hasInputNumber(firstNumber) && hasInputOperator(operator)) {
    let newNumber = secondNumber;
    const newNumberArray = newNumber.split("");
    if (!newNumberArray.includes(".")) {
      if (!newNumberArray.length) {
        //if the number hasnt been entered and we're already clicking decimal put a 0 in front first
        newNumber = "0";
      }
      newNumber += ".";
      setSecondNumber(newNumber);
      setView(newNumber);
    }
  }
};

//if we delete when only first number or operator has  been entered,we remove operator and take one off firstNumber. Other
const deleteNumber = (
  firstNumber,
  secondNumber,
  operator,
  setOperator,
  setFirstNumber,
  setSecondNumber,
  setView
) => {
  if (
    hasInputNumber(firstNumber) &&
    !hasInputOperator(operator) &&
    !hasInputNumber(secondNumber)
  ) {
    let newNumberArray = firstNumber.split("");
    newNumberArray.pop();
    setFirstNumber(newNumberArray.join(""));
    setView(newNumberArray.join(""));
    setOperator(null);
  } else if (allValuesEntered(firstNumber, operator, secondNumber)) {
    let newNumberArray = secondNumber.split("");
    newNumberArray.pop();
    setSecondNumber(newNumberArray.join(""));
    setView(newNumberArray.join(""));
  }
};

//resets all the values in calculator
const reset = (setFirstNumber, setOperator, setSecondNumber) => {
  setFirstNumber("");
  setOperator(null);
  setSecondNumber("");
};
export {
  onEqualsClick,
  onOperatorClick,
  onNumberClick,
  reset,
  deleteNumber,
  onDecimalClick,
};
