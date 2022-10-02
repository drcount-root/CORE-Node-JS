console.log(arguments);
// Returns an array, which contains all the values passed into a function

console.log(require("module").wrapper); // the special wrapper function IIFE - Immediately Invoked Function Expression

// module.exports
const C = require("./test-module-1");
const calc1 = new C();
console.log(calc1.add(2, 5));

// exports
const calc2 = require("./test-module-2");
console.log(calc2.add(2, 5));

// exports with destructuring
// variables names must be same as props names
const { add, multiply, divide } = require("./test-module-2");
console.log(add(2, 5));
console.log(multiply(2, 5));
console.log(divide(10, 5));

// Caching

require("./test-module-3")();

require("./test-module-3")();
require("./test-module-3")();

// Technically test-module-3.js is loaded once, so the code inside of it was also executed once only. Hello from the module
// Log this beautiful test 👽 2nd and 3rd time are comes from cache, they were stored somewhere in the Node's processor cache.
// So when we call the function in 2nd and 3rd times it will simply retrieved from there instead of loading the module again.