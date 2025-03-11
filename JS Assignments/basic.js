// // 1. Age category message.

var age = Number(prompt("Enter Your Age"));

if (age > 0 && age < 18) {
    console.log("You are a minor.");
} else if (age >= 18 && age <= 60) {
    console.log("You are an adult.");
} else if(age>60) {
    console.log("You are a senior citizen.");
} else {
    Number(prompt("Enter valid age"))
}

// // 2. Even Or Odd sum.

var num1 = Number(prompt("Enter num1"));
var num2 = Number(prompt("Enter num2"));

var sum = num1 + num2;

if (sum % 2 == 0) {
    console.log("Even sum");
} else {
    console.log("Odd sum");
}

//  3. Character case checker

let char = prompt("Enter a single character:");

if (char.length === 1) {
  if (char >= 'A' && char <= 'Z') {
    console.log("The character is uppercase.");
  } else if (char >= 'a' && char <= 'z') {
    console.log("The character is lowercase.");
  } else {
    console.log("The character is neither uppercase nor lowercase (not a letter).");
  }
} else {
  console.log("Please enter only one character.");
}

//  4. Largest of three numbers


let num1 = Number(prompt("Enter the first number:"));
let num2 = Number(prompt("Enter the second number:"));
let num3 = Number(prompt("Enter the third number:"));


let largest;
if (num1 >= num2 && num1 >= num3) {
  largest = num1;
} else if (num2 >= num1 && num2 >= num3) {
  largest = num2;
} else {
  largest = num3;
}

console.log("The largest number is: " + largest);

// 5. Leap Year Checker

let year = Number(prompt("Enter a year:"));


if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
  console.log(year + " is a leap year.");
} else {
  console.log(year + " is not a leap year.");
}

//  6. Simple Calculator
let num1 = Number(prompt("Enter the first number:"));
let operator = prompt("Enter operater symbol");
let num2 = Number(prompt("Enter the second number:"));

if (operator ==  "+") {
    console.log("Entered operator is +:" + (num1 + num2));
} else if (operator ==  "-") {
    console.log("Entered operator is -:" + (num1 - num2));
} else if (operator ==  "*") {
    console.log("Entered operator is *:" + (num1 * num2));
} else if (operator == "/") {
    console.log("Entered operator is /:" + (num1 / num2));
}else if (operator ==  "%") {
    console.log("Entered operator is %:" + (num1 % num2));
}else {
    console.log("Please enter valid operator.");
}

//  7. Positive,Negative or Zero

let num = Number(prompt("Enter the  number:"));

if (num > 0) {
    console.log("Positive number");
} else if (num < 0) {
    console.log("Negative Number.");
} else {
    console.log("It's Zero");
}

// 8. User Greeting

let userName = prompt("Enter your name");
let hour = Number(prompt("Enter 24-hour format time"));

 if (hour >= 5 && hour < 12) {
   console.log("Good Morning, " + userName + "!");
 } else if (hour >= 12 && hour < 17) {
   console.log("Good Afternoon, " + userName + "!");
 } else if (hour >= 17 && hour < 21) {
   console.log("Good Evening, " + userName + "!");
 } else {
   console.log("Good Night, " + userName + "!");
 }

// 9. Traffic Light System

let trafficLight = prompt("Enter Traffic light color:");

if (trafficLight == "red") {
    console.log("STOP!");
}else if (trafficLight == "yellow") {
    console.log("GET READY!");
} else if (trafficLight == "green") {
    console.log("Go!");
} else {
    console.log("Enter red yellow or green light not others.");
}

// 10. Multiplication Table

let num = Number(prompt("Enter number"));

for (let i = 1; i <= 10; i++){
    console.log(num + "*" + i + "=" + (num*i));
}

// 11. Grade Calculator

let marks = Number(prompt("Enter marks"));

if (marks > 0 && marks <= 100) {
    if (marks >= 90 && marks <= 100) {
        console.log("You achieved Grade A.");
    } else if (marks >= 80 && marks <= 89) {
        console.log("You achieved Grade B.");
    } else if (marks >= 70 && marks <= 79) {
        console.log("You achieved Grade C.");
    } else if (marks >= 60 && marks <= 69) {
        console.log("You achieved Grade D.");
    } else {
        console.log("You achieved Grade F.");
    }
} else {
    console.log("Enter marks between 1-100.");
}

// 12. Simple login System

const predefinedUserName = "admin";
const predefinedPassword = "admin123";

let userName = prompt("Enter username:");
let password = prompt("Enter password");

if (userName === predefinedUserName && password === predefinedPassword) {
    console.log("Login Succesful.");
} else {
    console.log("Incorrect username or password.");
}

// 13. Swapping Without Third Variable

let num1 = Number(prompt("Enter the first number:"));
let num2 = Number(prompt("Enter the second number:"));

 console.log("Before Swap:" , "num1 = " + num1 + ", num2 = " + num2);

num1 = num1 + num2;
num2 = num1 - num2;
num1 = num1 - num2;

 console.log("After Swap:" , "num1 = " + num1 + ", num2 = " + num2);

// 14. FizzBuzz

let num = Number(prompt("Enter the  number:"));

if (num % 3 == 0 && num % 5 == 0) {
    console.log("FizzBuzz.");
} else if (num % 3 == 0){
    console.log("Fizz.");
} else if (num % 5 == 0) {
    console.log("Buzz.");
} else {
    console.log("Number is: " + num);
}

// 15. Number Reversal
let num = Number(prompt("Enter a number:"));
let reversedNumber = 0;

while (num != 0) {
    let lastDigit = num % 10;
    reversedNumber = reversedNumber * 10 + lastDigit;
    num = Math.floor(num / 10);
}
console.log("Reverse number is: " + reversedNumber);

// 16. Sum of Digits

 let num = Number(prompt("Enter a number:"));
let sum = 0;

while (num != 0) {
    let digits = num % 10;
    sum = sum + digits;
    num = Math.floor(num / 10);
}
console.log("Sum of Digit is: " + sum);

// 17. Panlindrome checker

let word = prompt("Enter any word.");
word = word.toLowerCase();
let reversedWord = word.split('').reverse().join('');
console.log(reversedWord);

if (reversedWord == word) {
    console.log("Word is palindrome.");
} else {
    console.log("Not a palindrome word.");
}

// 18. Reverse Without String Methods

let num = Number(prompt("Enter a number:"));
let reversedNumber = 0;

while (num != 0) {
    let lastDigit = num % 10;
    reversedNumber = reversedNumber * 10 + lastDigit;
    num = Math.floor(num / 10);
}

console.log("Reverse number is: " + reversedNumber);

// 19. Find Second Largest

let num1 = Number(prompt("Enter the first number:"));
let num2 = Number(prompt("Enter the second number:"));
let num3 = Number(prompt("Enter the third number:"));

let secondLargest;

if ((num1 > num2) && (num1 < num3) || (num1 < num2) && (num1 > num3)) {
    secondLargest = num1;
} else if ((num2 > num1) && (num2 < num3) || (num2 < num1) && (num2 > num3)) {
    secondLargest = num2;
} else {
    secondLargest = num3;
}

console.log("Your entered number's are: " +  num1, num2, num3);
console.log("Second largest number is: " + secondLargest);

// 20. Find First Non-repeating Character.
let word = prompt("Enter your word.");
let nonRepeatingCharacter = null;

for (let char of word) {
    if (word.indexOf(char) === word.lastIndexOf(char)) {
        nonRepeatingCharacter = char;
        break;
    }
}

console.log("First Non-repating character is: " + nonRepeatingCharacter);

// 21. Even Digit counter

let num = Number(prompt("Enter any number."));

let evenCount = 0;
while (num != 0) {
    let lastDigit = num % 10;
    if (lastDigit % 2 == 0) {
        evenCount++;
        num = Math.floor(num / 10);
    } else {
        num = Math.floor(num / 10);

    }
}

console.log("Even digit count is: " + evenCount);

// 22. Nested condition challenge

let age = Number(prompt("Enter your age"));
let salary = Number(prompt("Enter your salary"));

if (age < 18) {
    console.log("Not Eligible.");
} else if (age >= 18 && salary <= 20000) {
    console.log("Low Salary.");
} else if (age >= 18 && salary >= 50000) {
    console.log("High Salary.");
} else {
    console.log("Medium Salary.");
}

// 23. Toggle case

function toggleChars(str) {
  for (let i = 0; i < str.length; i++) {
    if (str[i] >= "A" && str[i] <= "Z")
      str[i] = String.fromCharCode(
        str[i].charCodeAt(0) + "a".charCodeAt(0) - "A".charCodeAt(0)
      );
    else if (str[i] >= "a" && str[i] <= "z")
      str[i] = String.fromCharCode(
        str[i].charCodeAt(0) + "A".charCodeAt(0) - "a".charCodeAt(0)
      );
  }
}

let str = prompt("Enter word");
    str=str.split("");
toggleChars(str);
console.log("String after toggle " , str.join(""));

// 24. Missing number in Sequence

function findMissingNumber(arr) {
  const n = arr.length + 1;
  const sumOfFirstN = (n * (n + 1)) / 2;

  let sumOfArray = 0;
  for (let i = 0; i < n - 1; i++) {
    sumOfArray = sumOfArray + arr[i];
  }

  let missingNumber = sumOfFirstN - sumOfArray;

  return missingNumber;
}

const arr = [1, 2, 5, 4, 6, 8, 7];
const missingNumber = findMissingNumber(arr);
console.log("Missing Number: ", missingNumber);

// 25. Convert numbers to word

let num = Number(prompt("Enter single digit number:"));

switch (num) {
  case 1:
    console.log("One");
    break;
  case 2:
    console.log("Two");
    break;
  case 3:
    console.log("Three");
    break;
    case 4:
      console.log("Four");
      break;  
    case 5:
        console.log("Five");
      break;
    case 6:
      console.log("Six");
      break;  
    case 7:
      console.log("Seven");
      break;  
    case 8:
      console.log("Eight");
      break;  
    case 9:
      console.log("Nine");
      break;  
    case 0:
      console.log("Zero");
      break;  
}
