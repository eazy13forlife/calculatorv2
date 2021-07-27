const multiplyAndDivide = (array) => {
  if (!array.includes("x") && !array.includes("/")) {
    return array;
  }

  let numberBefore;
  let start = 0;
  let endPoint;
  while (start < array.length && array[start] !== "x" && array[start] !== "/") {
    numberBefore = start;
    start++;
    endPoint = start + 1;
  }

  if (array[numberBefore] && array[endPoint]) {
    if (array[start] === "x") {
      const product = array[numberBefore] * array[endPoint];
      array.splice(numberBefore, 3, product);
    } else if (array[start] === "/") {
      const division = array[numberBefore] / array[endPoint];
      array.splice(numberBefore, 3, division);
    }
  }
  multiplyAndDivide(array);
};

const doExponents = (array) => {
  if (!array.includes("**")) {
    return array;
  }

  let numberBefore;
  let start = 0;
  let endPoint;
  while (start < array.length && array[start] !== "**") {
    numberBefore = start;
    start++;
    endPoint = start + 1;
  }

  if (array[numberBefore] && array[endPoint]) {
    if (array[start] === "**") {
      const exponential = array[numberBefore] ** array[endPoint];
      array.splice(numberBefore, 3, exponential);
    }
  }
  doExponents(array);
};
const doFactorials = (array) => {
  if (!array.includes("!")) {
    return array;
  }
  let startPoint = 0;
  let endPoint = startPoint + 1;
  while (array[endPoint] !== "!") {
    startPoint++;
    endPoint = startPoint + 1;
  }
  const number = array[startPoint];
  const factorial = getFactorial(number);
  console.log(factorial);
  array.splice(startPoint, 2, factorial);

  doFactorials(array);
};

const addAndSubtract = (array) => {
  if (!array.includes("+") && !array.includes("-")) {
    console.log(array);
    return array;
  }

  let numberBefore;
  let start = 0;
  let endPoint;
  while (start < array.length && array[start] !== "+" && array[start] !== "-") {
    numberBefore = start;
    start++;
    endPoint = start + 1;
  }

  if (array[numberBefore] && array[endPoint]) {
    if (array[start] === "+") {
      const sum = array[numberBefore] + array[endPoint];
      array.splice(numberBefore, 3, sum);
    } else if (array[start] === "-") {
      const subtraction = array[numberBefore] - array[endPoint];
      array.splice(numberBefore, 3, subtraction);
    }
  }
  addAndSubtract(array);
};

//takes an array of all strings and gets them into numbers and operations for us
const joinAllNumbers = (originalStringArray) => {
  let newArray = [];
  const combThrough = (array) => {
    if (!array.length) {
      return;
    }
    let startPoint = 0;
    let endPoint = startPoint;
    while (
      array[endPoint] &&
      array[endPoint] !== "x" &&
      array[endPoint] !== "/" &&
      array[endPoint] !== "+" &&
      array[endPoint] !== "-" &&
      array[endPoint] !== "**" &&
      array[endPoint] !== "!"
    ) {
      endPoint++;
    }

    //if value of startPoint is equal to _ we make it equal a negative sign so when we find numberString and then number, we get a negative number. I use "_" because I already make "-" equal a subtraction sign.
    if (array[startPoint] === "_") {
      array[startPoint] = "-";
    }

    const numberString = array.slice(startPoint, endPoint);
    const number = +numberString.join("");

    if (!array[endPoint]) {
      //array[endPoint] tells us the operator, so if it doesn't exist which means its outside the boundaries of our array, then just push in this number to newArray
      newArray.push(number);
      array.splice(startPoint, endPoint); //remove what we just added to our newArray from our current array. we don't need endPoint here
    } else {
      //if there is an endpoint and it equals "!", we push this in along with the operator after it if its there.
      if (array[endPoint] === "!") {
        if (array[endPoint + 1]) {
          newArray.push(number, array[endPoint], array[endPoint + 1]);
          array.splice(startPoint, endPoint + 2);
        } else {
          newArray.push(number, array[endPoint]);
          array.splice(startPoint);
        }
      } else {
        //else push both the number and the operator
        newArray.push(number, array[endPoint]);
        array.splice(startPoint, endPoint + 1); //remove what we just added to our newArray from our current array
      }
    }
    combThrough(array);
  };
  combThrough(originalStringArray);
  return newArray;
};

const solve = (valuesArray) => {
  switch (valuesArray[valuesArray.length - 1]) {
    case "x":
      return;
    case "/":
      return;
    case "_":
      return;
    default:
      break;
  }

  doFactorials(valuesArray);
  doExponents(valuesArray);
  multiplyAndDivide(valuesArray);
  addAndSubtract(valuesArray);
  return +valuesArray.join("");
};

const getFactorial = (number) => {
  if (number < 0) {
    return undefined;
  }
  if (number === 1) {
    return 1;
  }
  return number * getFactorial(number - 1);
};

export { solve, joinAllNumbers };
