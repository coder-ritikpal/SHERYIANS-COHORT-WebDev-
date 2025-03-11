// 1 . Indian currency notes breakdown

let amount = +prompt("Enter amount"); 
let denominations = [2000, 500, 200, 100, 50, 20, 10, 5, 2, 1];

for (let denom of denominations) {
  if (amount >= denom) {
    let count = Math.floor(amount / denom);
    console.log(`${denom} X ${count}`);
    amount %= denom; 
  }
}


// 2. Rating of a Movie

let rating = parseFloat(prompt("Enter movie rating."));
let movieName = prompt("Enter movie name:");

if (rating > 0.0 && rating <= 2.0) {
  console.log(`${movieName} is a Flop movie.`);
} else if (rating > 2.0 && rating <= 3.4) {
  console.log(`${movieName} is a Semi-Hit movie.`);
} else if (rating > 3.4 && rating <= 4.5) {
  console.log(`${movieName} is a Hit movie.`);
} else if (rating > 4.5 && rating <= 5.0) {
  console.log(`${movieName} is a Super-Hit movie.`);
}

// // 3. Calculate Salary
let gender = prompt("Enter your gender.");
let exp = +prompt("Enter years of experience");
let qualification = prompt("Enter graduation PG or G");

let salary;
    salary=(gender == "male")
    ? (exp >= 10
        ? (qualification == "pg" ? 15000: 10000)
        : (qualification == "pg" ? 10000 : 7000))
    : (exp >= 10
        ? (qualification == "pg" ? 12000 : 9000)
        : (qualification == "pg" ? 10000 : 6000));

console.log("Your salary is: " + salary);


