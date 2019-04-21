const INPUT =
  "ls -a aoption -optionalone -moreoption anotheroption paramalone --verbose verboseoption -- shouldbeparam --shouldalsobeparam -yesparam";

const inputArray = INPUT.split(" ");
const len = inputArray.length;

let argsObj = {
  name: inputArray[0],
  options: {},
  parameters: []
};

const PATTERN = {
  OPTION: "option",
  PARAMETER: "parameter",
  ALLPARAMS: "allparams"
};

const getPattern = str => {
  if (str === "--") {
    return PATTERN.ALLPARAMS;
  } else if (str.startsWith("-") || str.startsWith("--")) {
    return PATTERN.OPTION;
  }
  return PATTERN.PARAMETER;
};

const stripFlags = str => {
  return str.startsWith("--") ? str.slice(2) : str.slice(1);
};

let { options, parameters } = argsObj;

for (let i = 1; i < len; i++) {
  const currentArg = inputArray[i];
  const currentPattern = getPattern(currentArg);
  const nextIndex = i + 1 < len ? i + 1 : null;
  const nextArg = nextIndex ? inputArray[nextIndex] : null;

  if (currentPattern === PATTERN.ALLPARAMS) {
    if (nextIndex) {
      parameters.push(...inputArray.slice(nextIndex));
    }
    break;
  } else if (currentPattern === PATTERN.OPTION) {
    let option = true;
    if (nextIndex && getPattern(nextArg) === PATTERN.PARAMETER) {
      option = nextArg;
      i++;
    }
    options[stripFlags(currentArg)] = option;
  } else {
    parameters.push(currentArg);
  }
}

console.log(argsObj);
