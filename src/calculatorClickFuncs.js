//function for when we select an operator
const onOperatorClick = (operator, valuesArray, setValuesArray) => {
  //if the last item is an exponent, we don't push in operator
  if (valuesArray[valuesArray.length - 1] === "^") {
    return;
  }

  const newValues = [...valuesArray];

  //if length of newValues doesn't exist, we need to push in 0 before the operator
  if (!newValues.length) {
    newValues.push("0", operator);
    setValuesArray(newValues);
    return;
  }
  //if the last item in newValues is one of our operators, we change that operator to whatever we just clicked.Otherwise, the default is pushing in our operator
  switch (newValues[newValues.length - 1]) {
    case "+":
    case "-":
    case "x":
    case "/":
      newValues[newValues.length - 1] = operator;
      setValuesArray(newValues);
      return;
    default:
      newValues.push(operator);
      setValuesArray(newValues);
      return;
  }
};

//function for when we select a number
const onNumberClick = (number, valuesArray, setValuesArray) => {
  //if the last value is a factorial, don't push in a number. An operator has to
  //follow a factorial
  if (valuesArray[valuesArray.length - 1] === "!") {
    return;
  }

  const newValues = [...valuesArray];

  newValues.push(number);
  setValuesArray(newValues);
};

//function for when we select negative sign
const onNegativeClick = (valuesArray, setValuesArray) => {
  //if the last value is a factorial, don't push in the negative sign. An operator has to
  //follow a factorial
  if (valuesArray[valuesArray.length - 1] === "!") {
    return;
  }

  //if the last value is a number or a decimal and we are trying to push in the negative sign, don't do it, because negative sign comes before a number or decimal
  if (
    !isNaN(+valuesArray[valuesArray.length - 1]) ||
    valuesArray[valuesArray.length - 1] === "."
  ) {
    return;
  }

  const newValues = [...valuesArray];

  newValues.push("_");
  setValuesArray(newValues);
};

//function for when we select a decimal
const onDecimalClick = (valuesArray, setValuesArray) => {
  //if the last value is a factorial, don't push in the decimal. An operator has to
  //follow a factorial
  if (valuesArray[valuesArray.length - 1] === "!") {
    return;
  }

  //if the last value is a decimal, don't push in the decimal. We don't want multiple successive decimals
  if (valuesArray[valuesArray.length - 1] === ".") {
    return;
  }

  const newValues = [...valuesArray];

  //if the last value is an operator or underscore(negative sign) or it doesn't exist, push in a 0 before we push in the decimal
  switch (newValues[newValues.length - 1]) {
    case undefined:
    case "x":
    case "/":
    case "+":
    case "-":
    case "_":
      newValues.push("0", ".");
      setValuesArray(newValues);
      return;
    default:
      break;
  }

  newValues.push(".");
  setValuesArray(newValues);
};

//function for when we select an exponent
const onExponentClick = (valuesArray, setValuesArray) => {
  //if the last value doesnt exist or it equals an operator or negative sign and we click exponent, don't do anything. An exponent should only follow a number
  switch (valuesArray[valuesArray.length - 1]) {
    case undefined:
    case "x":
    case "/":
    case "+":
    case "-":
    case "_":
    case "!":
      return;
    default:
      break;
  }

  const newValues = [...valuesArray];

  //if the last value is a decimal and we click exponent sign,we check to see if a number comes before the decimal. If it does, we add 0 after the decimal before pushing in exponent. if no number comes before the decimal then we don't push in this exponent
  if (newValues[newValues.length - 1] == ".") {
    if (!isNaN(+newValues[newValues.length - 2])) {
      newValues.push(0, "^");
      setValuesArray(newValues);
    } else {
      return;
    }
  }

  newValues.push("^");
  setValuesArray(newValues);
};

//function for when we select a factorial
const onFactorialClick = (valuesArray, setValuesArray) => {
  //if the last item equals an operator,negative sign, or exponent, don't do anything. A factorial should only come after a number
  switch (valuesArray[valuesArray.length - 1]) {
    case "x":
    case "/":
    case "+":
    case "-":
    case "_":
    case "^":
      return;
    default:
      break;
  }

  const newValues = [...valuesArray];

  //if what comes last is a decimal, make sure a number appears before the decimal. The we can add a 0 and our factorial. if no number comes before, so just a lone decimal, don't do anything.
  if (newValues[newValues.length - 1] === ".") {
    if (!isNaN(+newValues[newValues.length - 2])) {
      newValues.push(0, "!");
      setValuesArray(newValues);
    } else {
      return;
    }
  }

  newValues.push("!");
  setValuesArray(newValues);
};

//function for when we select equal sign
const onEqualsClick = (joinAllNumbers, solve, valuesArray, setResult) => {
  const array = joinAllNumbers(valuesArray);
  const result = solve(array);
  const newValues = result.toString().split("");
  setResult(result);
};

//function for when we select delete
const onDeleteClick = (valuesArray, setValuesArray) => {
  const newValues = [...valuesArray];
  newValues.pop();
  setValuesArray(newValues);
};

//function for when we select reset
const onResetClick = (setValuesArray, setResult) => {
  setValuesArray([]);
  setResult(null);
};

export {
  onOperatorClick,
  onNumberClick,
  onNegativeClick,
  onDecimalClick,
  onExponentClick,
  onEqualsClick,
  onDeleteClick,
  onResetClick,
  onFactorialClick,
};
