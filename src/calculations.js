//recursive function.Takes an array filled with numbers and operators as strings.
//uses PEMDAS to multiply and divide two values from left to right and replaces
//the expression in the array with the factorial
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

  if (numberBefore < array.length && endPoint < array.length) {
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

//recursive function.Takes an array filled with numbers and operators as strings.
//uses PEMDAS to add and subtract two values from left to right and replaces the
//expression in the array with the solution
const addAndSubtract = (array) => {
  if (!array.includes("+") && !array.includes("-")) {
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

  if (numberBefore < array.length && endPoint < array.length) {
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

//recursive function. Takes an array filled with numbers and operators as strings.
//anytime  ** is seen, it performs base**exponent and replaces the expression in
//the array with the solution
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
    const exponential = array[numberBefore] ** array[endPoint];
    array.splice(numberBefore, 3, exponential);
  }
  doExponents(array);
};

//recursive function.Takes an array filled with numbers and operators as strings
//when it sees a number followed by "!",it finds the factorial and replaces the expression in the array with the factorial
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
  array.splice(startPoint, 2, factorial);

  doFactorials(array);
};

//takes an array of all strings and returns a new array,(where each individual
//string of successive numbers are turned into one number) that we can then pass
//to our solve recursive function.
const joinAllNumbers = (originalStringArray) => {
  let originalStringArrayCopy = [...originalStringArray];
  let newArray = [];
  //recursive function.Takes an array,finds where a successive string of numbers are and
  //combines into one single number.
  //This number and its successive operator is then passed to newArray and then deleted from originalArray because
  //originalArray should always begin with a number so we can find the next group of successive string of numbers easily
  const combThrough = (array) => {
    if (!array.length) {
      return;
    }
    let startPoint = 0;
    let endPoint = startPoint;
    while (
      //if array[endPoint]equals any of these operators, that means we've
      //found where our successive string of numbers end,so we can turn everything
      //before this operator into a single number
      endPoint < array.length &&
      array[endPoint] !== "x" &&
      array[endPoint] !== "/" &&
      array[endPoint] !== "+" &&
      array[endPoint] !== "-" &&
      array[endPoint] !== "**" &&
      array[endPoint] !== "!"
    ) {
      endPoint++;
    }

    //if value of startPoint is equal to _(underscore) we make it equal a negative //sign so when we create "numberString" and "number" variables below, we get a //negative number. I use an underscore for negative because I already made "-" //equal a subtraction sign.
    if (array[startPoint] === "_") {
      array[startPoint] = "-";
    }

    const numberString = array.slice(startPoint, endPoint);
    const number = +numberString.join(""); //not necessary to turn this string into a number because strings are treated like numbers

    addToNewArray(array, newArray, number, startPoint, endPoint);
    combThrough(array);
  };
  combThrough(originalStringArrayCopy);
  return newArray;
};

//function responsible for taking in the number and the operator that we want to
//push to newArray and pushing it in along with updating our originalArray, so it begins with a number
const addToNewArray = (
  originalArray,
  newArray,
  number,
  startPoint,
  endPoint
) => {
  //originalArray[endPoint] tells us the operator,so if operator doesn't exist
  if (endPoint >= originalArray.length) {
    newArray.push(number); // we just push in number that was created to newArray
    originalArray.splice(startPoint); //we remove this number,which starts from startPoint and all that comes after it from our originalArray since endPoint is outside our array bounds
    return;
  }

  //originalArray[endPoint] tells us the operator,so if operator does exist and it equals a factorial, we check to see if there is an  +,-,/,x after it.*we set in rules that what follows a factorial has to be one of those operators, so this is why this works. Because if there is we push the number, factorial and operator into our newArray
  if (originalArray[endPoint] === "!") {
    if (endPoint + 1 < originalArray.length) {
      //if an operator comes after the factorial sign
      newArray.push(
        number,
        originalArray[endPoint],
        originalArray[endPoint + 1]
      ); ///we push the number, factorial and operator to our newArray
      originalArray.splice(startPoint, endPoint + 2); //we remove the number, the factorial and the operator from originalArray
    } else {
      newArray.push(number, originalArray[endPoint]); //if no operator comes after the factorial, we just push in the number and factorial to newArray.We don't want to accidentally end up putting undefined, so this is why we only push in the factorial
      originalArray.splice(startPoint); //we remove the number and all that comes after it from originalArray since what comes after factorial is outside the scope of our array
    }
    return;
  }

  if (originalArray[endPoint] !== "!") {
    newArray.push(number, originalArray[endPoint]); //push both number and operator to newArray
    originalArray.splice(startPoint, endPoint + 1); //remove the startPoint and the operator from our originalArray
  }
};

//takes our array filled with numbers and operators as strings and runs the recursive functions below to get one result
const solve = (valuesArray) => {
  switch (valuesArray[valuesArray.length - 1]) {
    case "x":
      return "Error";
    case "/":
      return "Error";
    case "-":
      return "Error";
    case "_":
      return "Error";
    case "+":
      return "Error";
    case "**":
      return "Error";
    default:
      break;
  }

  doFactorials(valuesArray);
  doExponents(valuesArray);
  multiplyAndDivide(valuesArray);
  addAndSubtract(valuesArray);
  return +valuesArray.join("");
};

//recursive function for finding the factorial
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
