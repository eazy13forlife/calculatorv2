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
const joinAllNumbers = (array) => {
  let newArray = [];
  const combThrough = (array, start = 0) => {
    if (start >= array.length) {
      return;
    }

    let startPoint = start;
    let endPoint = startPoint;
    while (
      array[endPoint] &&
      array[endPoint] !== "x" &&
      array[endPoint] !== "/" &&
      array[endPoint] !== "+" &&
      array[endPoint] !== "-"
    ) {
      endPoint++;
    }

    const numberString = array.slice(start, endPoint);

    const number = +numberString.join("");
    let operator;
    if (!array[endPoint + 1]) {
      newArray.push(number);
    } else {
      newArray.push(number, array[endPoint]);
    }

    array.splice(startPoint, endPoint + 1);

    combThrough(array, 0);
  };

  combThrough(array, 0);
  return newArray;
};

/*to delete
const mike = [400, "x", 434, "+", 40, "/", 32, "x", 54, "-", 321];
mike.pop();
mike.pop();
let apple = mike.join("&");
const mikel = mike.map((number) => {
  if (number !== "x" && number !== "+" && number !== "-" && number !== "/") {
    return +number;
  } else {
    return number;
  }
});
*/

const solve = (valuesArray) => {
  multiplyAndDivide(valuesArray);
  addAndSubtract(valuesArray);
  return +valuesArray.join("");
};

export { solve, joinAllNumbers };
