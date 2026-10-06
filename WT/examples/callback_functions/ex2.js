/*Synchronous Callback
Used in functions that execute immediately.
Example: Array methods (forEach, map, filter, etc.)
*/

const numbers = [1, 2, 3, 4];

numbers.forEach(function(num) {  console.log(num * 2);});

console.log("*******************************************");
numbers.forEach((num) => {
    console.log(num * 2);
});
console.log("*******************************************");
function display(num) {
    console.log(num * 2);
}

numbers.forEach(display);
console.log("*******************************************");
const display1 = function(num) {
    console.log(num * 2);
};

numbers.forEach(display1);
console.log("*******************************************");
const display2 = num => console.log(num * 2);

numbers.forEach(display);

//Explanation: The callback function(num) is called for each element of the array.