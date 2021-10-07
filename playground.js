const cloneDeep = require("lodash/cloneDeep");
const compact = require("lodash/compact");
const people = [{ name: "Bob" }, { name: "Alice" }];
const morePeople = cloneDeep(people).concat([{ name: "John" }]);
// const traverse = require("lodash/traverse");

const newArr = [...people];
// console.log(people[1] === newArr[1]);
// console.log(morePeople[1] === people[1]);

// interval setInterval setTimeout
// 413 614 8026 652
let timer = 0;
let intervalMap = new Map();
function mySetInterval(func, intervals) {
  timer++;
  console.log("intervals", timer);
  if (timer > 5) return;
  function inner() {
    mySetInterval(func, intervals);
  }
  setTimeout(inner, intervals);
  return timer;
}
function clearInterval(id) {
  const intervalInstance = intervalMap.get(id);
  clearTimeout(intervalInstance);
}
// const id = mySetInterval(() => {
//   console.log("interval");
// }, 1000);
// clearInterval(id);

/**
 * Create a for loop that iterates up to 100 while
 * outputting "fizz" at multiples of 3,"buzz" at multiples of 5 and "fizzbuzz" at multiples of 3 and 5.
 */

function buzzfizz() {
  for (let i = 0, len = 20; i < len; i++) {
    const three = i % 3 === 0;
    const five = i % 5 === 0;
    console.log(`${i} : ${three ? "fizz" : ""}${five ? "buzz" : ""}`);
  }
}

// buzzfizz();

/**
 * In this kata you have to create all permutations of an input string and remove duplicates,
 * if present. This means, you have to shuffle all letters from the input in all possible orders.
 * @example
 * permutations('a'); // ['a']
 * permutations('ab'); // ['ab', 'ba']
 * permutations('aabb'); // ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']
 */

function* posGenerator(start, limit) {
  let count = 0;
  let _pos = start;

  while (count < limit) {
    count++;
    if (_pos + 1 <= limit) {
      yield _pos++;
    } else {
      _pos = 0;
      yield _pos++;
    }
  }
}

function permutations1(string) {
  const length = string.length;
  const result = [];

  for (let i = 0; i < length; i++) {
    const pos = posGenerator(i, length);
    let words = [];
    for (let j = 0; j < length; j++) {
      const index = pos.next().value;

      words[index] = string[j];
    }

    result.push(words);
  }
  console.log("result", result);
  return result;
}

// function* fibonacci(current = 0, next = 1) {
//   while (true) {
//     yield current;
//     [current, next] = [next, current + next];
//   }
// }

// function genfib() {
//   const sequence = fibonacci();

//   return function fib() {
//     return sequence.next().value;
//   };
// }

function memo(f) {
  let cache = {};
  return (n) => {
    if (cache[n]) return cache[n];
    else {
      cache[n] = f(n);
      return cache[n];
    }
  };
}
const fibonacci = memo(function (n) {
  if (n === 1 || n === 0) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});
function genfib() {
  let [cur, next] = [0, 1];
  function* generator() {
    while (true) {
      // console.log("in generator", n);
      yield cur;
      [cur, next] = [next, cur + next];
    }
  }
  const factory = generator();
  return function fib() {
    return factory.next().value;
  };
}
// const fib = genfib();
// console.log("fib0", fib());
// console.log("fib1", fib());
// console.log("fib2", fib());
// console.log("fib3", fib());
// console.log("fib4", fib());

function permutations2(string) {
  // first a type check to make sure we are dealing with a proper var
  if (!string || typeof string !== "string") {
    return "Please enter a string";
  }

  // if the string length is less than 2, then we already know all permutations Ex. 'a'
  if (!!string.length && string.length < 2) {
    return [string];
  }

  let permutationsArr = [];

  for (let i = 0; i < string.length; i++) {
    let char = string[i];

    if (string.indexOf(char) != i) {
      continue;
    }
    // get the remainder of the two sides that the character is inbetween
    let remainder = string.slice(0, i) + string.slice(i + 1, string.length);

    // set another for loop iterating over the recursive return values for the permutations array, this time passing in the remainder of the string
    for (let permutation of permutations(remainder)) {
      permutationsArr.push(char + permutation);
    }
  }
  return permutationsArr;
}

function permutations(string) {
  return string.length == 1
    ? [string]
    : string
        .split("")
        .map((e, i) =>
          permutations(string.slice(0, i) + string.slice(i + 1)).map((e2) => {
            console.log("e + e2", e + e2);
            return e + e2;
          })
        )
        .reduce((r, e) => r.concat(e))
        .sort()
        .filter((e, i, a) => {
          console.log("i == 0 || a[i - 1] != e", e, i, a);
          return i == 0 || a[i - 1] != e;
        });
}
// permutations("aabb");
// permutations("23456");
const s1 = "In many languages",
  s2 = "there's a pair of functions";
const inRange = (charCode) => {
  const pos = charCode.charCodeAt();
  return pos >= "a".charCodeAt() && pos <= "z".charCodeAt();
};

function sortCompareAscent(a, b) {
  if (a.charCodeAt() === b.charCodeAt()) {
    return sortCompareAscent(a.slice(1), b.slice(1));
  }
  return a.charCodeAt() - b.charCodeAt();
}
function tidyUpString(str) {
  return str.split("").filter((i) => inRange(i));
}
function sortStrByCharCode(strArr) {
  return strArr.sort((a, b) => {
    if (b.length === a.length) return sortCompareAscent(a, b);
    else return b.length - a.length;
  });
}

function getDupMap(arr) {
  const dupMap = {};
  arr.map((i) => {
    if (dupMap[i]) dupMap[i] += 1;
    else dupMap[i] = 1;
  });
  return dupMap;
}

function generateString(ele, count) {
  let str = "";
  while (count > 0) {
    count--;
    str += ele;
  }
  return str;
}
function mix(s1, s2) {
  const neatS1 = tidyUpString(s1);
  const neatS2 = tidyUpString(s2);

  const dupMapS1 = getDupMap(neatS1);
  const dupMapS2 = getDupMap(neatS2);
  const wholeDupMap = { ...dupMapS1, ...dupMapS2 };
  // console.log("wholeDupMap", wholeDupMap);
  const intersectArr = [];
  for (const ele in wholeDupMap) {
    const oneEle = dupMapS1[ele];
    const anotherEle = dupMapS2[ele];

    if (anotherEle === oneEle && anotherEle !== 1) {
      const str = generateString(ele, anotherEle);
      intersectArr.push(`=:${str}`);
    } else if (anotherEle || oneEle) {
      // not equal and element count is not ONE, then comp
      const max =
        (anotherEle || 0) > (oneEle || 0)
          ? { count: anotherEle, index: 2 }
          : { count: oneEle, index: 1 };
      if (max.count === 1) continue;
      console.log("max", max, anotherEle);
      intersectArr.push(`${max.index}:${generateString(ele, max.count)}`);
    }
  }

  console.log(neatS1, dupMapS1);
  const sorted = sortStrByCharCode(intersectArr);
  // console.log("sorted", sorted);

  return sorted.join("/");
  // console.log("result intersection arr :", result);
  // console.log("sortStrByCharCode(intersectArr);");
}
// mix(s1, s2);

function getCurrentNumber(index) {
  let result = [1];
  for (let i = 0, len = index; i < len; i++) {
    const temp = generator(result[i]);
    console.log("base", result[i], "=>", temp);

    result = [...result, ...temp].sort((a, b) => a - b);
  }
  console.log("result arr", result);
  return result[index];
}
function generator(ele) {
  const twice = ele * 2 + 1;
  const triple = ele * 3 + 1;
  return [twice, triple];
}
// console.log("getCurrentNumber(10);", getCurrentNumber(10));

function twiceLinear(n) {
  let arr = [1],
    p1 = 0,
    p2 = 0;
  for (let i = 0; i < n; i++) {
    const twice = arr[p1] * 2 + 1;
    const triple = arr[p2] * 3 + 1;
    if (twice <= triple) {
      arr.push(twice);
      p1++;
      if (twice === triple) p2++;
    } else {
      arr.push(triple);
      p2++;
    }
  }
  console.log("result array", arr, "ele is", arr[n]);
}
// twiceLinear(10);
/**
 * Note: Libraries are disabled for this kata.

Doing arithmetic with big numbers is impossible to do with regular integer types. 
In JavaScript (which represents numbers as 64-bit floats), 
anything beyond 2^53-1 becomes increasingly less accurate.
For example, 12345678901234567890 becomes 12345678901234567000— off by 890.

For this reason, the only way of accurately representing such large integers is as strings.

You must write two functions,
bigAdd and bigSub, which will both take two arguments. 
These two arguments will either be a valid representation of an integer as a string 
(negative or positive, no leading zeros),
or a regular number. They will return the correct answer as a string,
bigAdd summing the two values, and bigSub subtracting the second value from the first.


 */

// bigAdd(1, "123456789012345678901234567890") ===
//   "123456789012345678901234567891";
// bigSub("123456789012345678901234567890", 1) ===
//   "123456789012345678901234567889";

function bigSub(minuend, subtrahend) {}
function bigAdd(augend, addend) {
  const len = Math.max(augend.length, addend.length);
  console.log("loop times", len);
}
// bigAdd(1, "123456789012345678901234567890");

// type Story = {
//   storyId: string;
//   userId: string;
//   content: string;
//   comments: { userId: string; content: string; links: string[]; images: string[] }[];
// };
// type User = {
//   userName: string;
//   avatar: string;
//   userId: string;
//   email: string;
//   password: string;
// };
// type StoryList = {
//   pageIndex: number;
//   current: number;
//   list: Story[];
// };

// type Comment = {
//   storyId: string;
//   content: string;
//   userInfo: User;
// };

// queryCurrentUser({ userId: string })=> User
// queryStroyList({ userId: string })=> StoryList
// queryStroyDetail({ storyId: string })=> { Story & Comments[] }

// createStory({Story,userId})=> Boolean
// createComment({ Comment,storyId,userId })=> Boolean

// uploadImage({file,userId})=>Boolean
// uploadVideo({file,userId})=>Boolean

// const aObj = { name: { first: "xinping", last: "zhang" } };
// const bObj = { ...aObj };
// console.log("aObj === bObj", aObj === bObj);
// bObj.name.first = "xingping";
// console.log("after change bObj", bObj, aObj);

/**
 * Palindrome string : 
"aba" 
input: string 
output: all palindrome substrings 
"abab" 

"abab" 
a b a b aba bab 
"abbab"
 */
// console.log("traverse", "abc".split("").reverse().join(""));
// a;
// ab;
// aba;
// abab;
// even case
function howManyPalindromes(string) {
  let count = 0;
  const inputLength = string.length;
  for (let i = 0, len = inputLength; i < len; i++) {
    let noNeedToCheckEven = false,
      noNeedToCheckOdd = false;
    const maxTime = Math.min(i, len - i);
    for (let j = 1; j <= maxTime; j++) {
      if (noNeedToCheckEven && noNeedToCheckOdd) break;

      const leftEleIndex = i - j,
        evenRightEleIndex = i + j - 1,
        oddRightIndex = i + j;
      const leftEle = string[leftEleIndex];

      // even case
      if (i > 0 && i < len && noNeedToCheckEven === false) {
        const evenRightEle = string[evenRightEleIndex];

        if (leftEle === evenRightEle) {
          // const palindromeStr = string.slice(leftEleIndex,evenRightEleIndex + 1);
          // result.push(string.slice(leftEleIndex, evenRightEleIndex + 1));
          count += 1;
        } else {
          noNeedToCheckEven = true;
        }
      }
      // odd case:use ele as pivot
      if (noNeedToCheckOdd === false) {
        const rightPartEle = string[oddRightIndex];

        if (leftEle === rightPartEle) {
          // const palindromeStr = string.slice(leftEleIndex, oddRightIndex + 1);
          // result.push(palindromeStr);
          count += 1;
        } else {
          noNeedToCheckOdd = true;
        }
      }
    }
  }

  return count + inputLength;
}

// console.log("leftPart", leftPart, "rightPart", rightPart);
// console.log("-------");
// console.log("result", result);
// console.log("result length", result.length);
// abbbbab 17
// palindrome("feetea"); // 8
// 9 ('a', 'a', 'b', 'b', 'c', 'c', 'cc', 'bccb', 'abccba')
function getIndex(len, next) {
  return Math.min(len - 1, next);
}
function dirReduc(arr) {
  let result = [];
  let needRecheck = false;
  let p1 = 0,
    p2 = 1;

  const len = arr.length;
  while (p2 < len) {
    console.log("arr[p1] arr[p2]", arr[p1], arr[p2], p1, p2);
    if (p1 === p2 && p2 === len - 1) {
      // result.push(arr[p1]);
      result.push(arr[p1]);
      p2 += 1;
    } else if (arr[p1].slice(-2) === arr[p2].slice(-2) && arr[p1] !== arr[p2]) {
      // console.log("skip", arr[p1], arr[p2], p1, p2);
      if (p2 === len - 1) break;
      // skip
      p1 = getIndex(len, p1 + 2);
      p2 = getIndex(len, p2 + 2);
      console.log("next p1 p2", p1, p2);
      needRecheck = true;
    } else {
      result.push(arr[p1]);
      p1 = getIndex(len, p1 + 1);
      p2 = getIndex(len, p2 + 1);
    }
  }
  console.log("result 1", result);
  if (needRecheck && result.length > 1) return dirReduc(result);
  console.log(result);
  return result;
}

function dirReduc_best(plan) {
  var opposite = {
    NORTH: "SOUTH",
    EAST: "WEST",
    SOUTH: "NORTH",
    WEST: "EAST",
  };
  return plan.reduce(function (dirs, dir) {
    if (dirs[dirs.length - 1] === opposite[dir]) {
      console.log("dirs", dirs);
      dirs.pop();
    } else dirs.push(dir);
    return dirs;
  }, []);
}

function dirReduc_refactor(arr) {
  const OPPOSITE_DIRECTION = {
    NORTH: "SOUTH",
    EAST: "WEST",
    SOUTH: "NORTH",
    WEST: "EAST",
  };
  return arr.reduce((acc, cur) => {
    if (acc.slice(-1)[0] === OPPOSITE_DIRECTION[cur]) {
      // 被抵消，把它从结果中 pop 出来
      acc.pop();
    } else acc.push(cur);
    return acc;
  }, []);
}
const testArr = [
  "NORTH",
  "SOUTH",
  "WEST",
  "SOUTH",
  "NORTH",
  "EAST",
  "SOUTH",
  "WEST",
  "WEST",
  "EAST",
  "NORTH",
  "SOUTH",
  "EAST",
  "WEST",
];
// console.log("dirReduc_refactor ", dirReduc_refactor(testArr));
// dirReduc_best([]);
// dirReduc([]);

const romanToArabic = {
  I: 1,
  IV: 4,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};
function reverseVMap() {
  let result = {};
  // console.log("in reverseVMap ");
  for (let k in romanToArabic) {
    result[romanToArabic[k]] = k;
  }
  return result;
}

const arabicToRoman = reverseVMap();
const RomanNumerals_mine = {
  getWholeNum(digit, pos) {
    return Number(`${digit}e${pos - 1}`);
  },
  // 小于5
  generateRepeatChar(digit, pos) {
    let repeatedChar = "";
    const char = arabicToRoman[RomanNumerals.getWholeNum(1, pos)];
    if (pos === 1 && digit === "4") return "IV";
    for (let i = 0; i < digit; i++) {
      repeatedChar += char;
    }
    return repeatedChar;
  },

  getRomanByNum(digit, pos) {
    const number = RomanNumerals.getWholeNum(digit, pos);
    // 7000
    if (digit === "9" && pos < 4) {
      // 900 : minuendChar 1000  subtrahendChar 100
      const minuendChar = arabicToRoman[RomanNumerals.getWholeNum(1, pos + 1)];
      const subtrahendChar = arabicToRoman[RomanNumerals.getWholeNum(1, pos)];
      return `${subtrahendChar}${minuendChar}`;
    } else if (digit >= 5 && pos < 4) {
      // base 5
      const left = digit - 5;
      const char = arabicToRoman[RomanNumerals.getWholeNum(5, pos)];
      const oneBase = RomanNumerals.generateRepeatChar(left, pos);
      return `${char}${oneBase}`;
    } else {
      // base 1
      const oneBase = RomanNumerals.generateRepeatChar(digit, pos);
      // console.log("5- number is: ", number, ", roman char is: ", oneBase);

      return oneBase;
    }
  },
  fromRoman(romanNum) {
    const romanNumStr = romanNum + "";
    let acc = 0;
    for (let i = 0, len = romanNumStr.length; i < len; i++) {
      const curChar = romanNumStr[i];
      const nextChar = romanNumStr[i + 1];

      if (romanToArabic[curChar] < romanToArabic[nextChar]) {
        // 9
        acc -= romanToArabic[curChar];
      } else {
        acc += romanToArabic[curChar];
      }
    }
    // console.log("result", acc);
    return acc;
  },
  toRoman(number) {
    const arabicNum = `${number}`;
    // 3201
    let result = "";

    const digitCount = arabicNum.length;

    for (let i = 0, len = digitCount; i < len; i++) {
      const digit = arabicNum[i];
      const roman = RomanNumerals.getRomanByNum(digit, len - i);
      // console.log("拆解", roman);
      result += roman;
    }
    console.log("result", result);
    return result;
  },
};
var numerals = [
  ["M", 1000],
  ["CM", 900],
  ["D", 500],
  ["CD", 400],
  ["C", 100],
  ["XC", 90],
  ["L", 50],
  ["XL", 40],
  ["X", 10],
  ["IX", 9],
  ["V", 5],
  ["IV", 4],
  ["I", 1],
];

RomanNumerals = {
  toRoman: function (v) {
    var s = "";
    numerals.forEach(function (n) {
      while (v >= n[1]) {
        s += n[0];
        v -= n[1];
      }
    });
    return s;
  },
  fromRoman: function (s) {
    var v = 0;
    numerals.forEach(function (n) {
      while (s.substr(0, n[0].length) == n[0]) {
        s = s.substr(n[0].length);
        v += n[1];
      }
    });
    return v;
  },
};
// RomanNumerals.toRoman(4); // CMXCIX
// console.log("arabicToRoman", arabicToRoman);
// RomanNumerals.fromRoman("MDCLXIX");

function nextBigger(n) {
  const numStr = `${n}`;
  for (let len = numStr.length, i = len - 1; i > 0; i--) {
    // console.log("cur ele", numStr[i]);

    // from right to left
    if (numStr[i - 1] && numStr[i] > numStr[i - 1]) {
      const toArr = Array.from(numStr);
      const rightPart = toArr.slice(i);
      const biggerPart = rightPart.filter((ele) => ele > numStr[i - 1]);
      const minimum = Math.min(...biggerPart);
      // console.log("minimum", minimum, biggerPart);
      const indexOfMin = biggerPart.indexOf(minimum + "");
      rightPart.splice(indexOfMin, 1, numStr[i - 1]);
      // console.log("right part in order", indexOfMin, rightPart);

      toArr.splice(i - 1, 2, minimum); // , numStr[i - 1]
      // console.log("right part", toArr.slice(i), toArr.slice(0, i));

      return Number(
        toArr
          .slice(0, i)
          .concat(rightPart.sort((a, b) => a - b))
          .join("")
      );
    }
  }
  return -1;
}

// console.log("nextBigger:", nextBigger(9933462));
console.log("nextBigger:", nextBigger(994572)); // 994725
