//  [year, day, hour, minute , second]
const unitMap = {
  second: 1,
  minute: 60,
  hour: 60 * 60,
  day: 60 * 60 * 24,
  year: 365 * 60 * 60 * 24,
};

function formatDuration(seconds) {
  let leftOut = seconds;
  // Complete this function
  const readableWords = ["year", "day", "hour", "minute", "second"].reduce(
    (acc, key) => {
      const unit = unitMap[key];
      if (leftOut >= unit) {
        const remainder = seconds % unit;
        console.log("leftOut", leftOut);
        const quotient = Math.floor(leftOut / unit);
        leftOut -= quotient * unit;
        console.log("reminder", key, quotient, remainder);

        const readableWord = ` ${quotient} ${key}${quotient > 1 ? "s" : ""},`;

        acc.push(readableWord);
      }

      // last one
      if (key === "second") {
        const lastIndex = acc.length - 1;
        acc[lastIndex] = `${acc.length > 1 ? " and" : ""}${
          acc[lastIndex]
        }`.replace(",", "");
        if (acc[lastIndex - 1])
          acc[lastIndex - 1] = acc[lastIndex - 1].replace(",", "");
      }
      return acc;
    },
    []
  );
  console.log("readableWords", readableWords.join(""));

  return readableWords.join(",").trim();
}
// formatDuration(62); // returns "1 minute and 2 seconds"
// formatDuration(3662)  // returns "1 hour, 1 minute and 2 seconds"

const Calculator = function () {
  this.calcTwo = (num1 = 0, operator, num2 = 0) => {
    const number1 = Number(num1);
    const number2 = Number(num2);
    switch (operator) {
      case "+":
        return Number(number1 + number2);
      case "-":
        return Number(number1 - number2);
      case "/":
        return Number(number1 / number2);
      case "*":
        return Number(number1 * number2);
      default:
        return undefined;
    }
  };
  this.prioritized = (operator) => {
    return ["*", "/"].indexOf(operator) !== -1;
  };
  this.evaluate = (string) => {
    const strArr = string.split(" ");
    if (strArr.length < 3) return Number(strArr[0]);

    let sectionExpression = "";
    // combine
    const expression = strArr.reduce((acc, cur, index) => {
      // odd => operator
      if (index % 2) {
        const isPrior = this.prioritized(cur);
        if (isPrior) {
          sectionExpression = sectionExpression
            ? [this.calcTwo(sectionExpression[0], cur, strArr[index + 1])]
            : [this.calcTwo(strArr[index - 1], cur, strArr[index + 1])];
          // console.log("sectionExpression2", sectionExpression);
        } else {
          if (sectionExpression) {
            acc.push(sectionExpression[0]);
            acc.push(cur);
            // acc.push(strArr[index + 1]);

            sectionExpression = "";
          } else {
            acc.push(strArr[index - 1]);
            acc.push(strArr[index]);
            // acc.push(strArr[index + 1]);
          }
        }

        // last operator
        if (index === strArr.length - 2) {
          acc.push(isPrior ? sectionExpression[0] : strArr[index + 1]);
        }
      }
      return acc;
    }, []);

    if (expression.length < 3) return expression[0];

    // all operators are - or +
    const result = expression.reduce((acc, cur, index) => {
      if (index % 2) {
        acc = this.calcTwo(
          acc === undefined ? expression[index - 1] : acc,
          cur,
          expression[index + 1]
        );
      }

      return acc;
    }, undefined);
    return result;
  };
};
var calculate = new Calculator();
const a = calculate.calcTwo(83, "/", 84);
const r = calculate.calcTwo(a, "*", 80);
const v = calculate.calcTwo(0.034432234432234435, "*", 12);
console.log("aaaaaa", a, r);
calculate.evaluate("91 * 34 / 35 - 1 + 31 / 41 / 71 / 57 + 6"); // 6-6+8
// strArr: [[8,'/',2,'/',2],'+',[3 ,'*', 4 ,'*', 5],'-',6]
