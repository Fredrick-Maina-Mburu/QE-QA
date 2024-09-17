// filterAndSort Function: Create a function called filterAndSort that takes an indefinite number of arguments. The first argument should be a filter function, and the remaining arguments should be numbers. The function should:
// 1.	Use the rest operator to capture all arguments except the first one.
// 2.	Filter the numbers using the provided filter function.
// 3.	Sort the filtered numbers in ascending order.
// 4.	Return the sorted array of numbers.
function filterAndSort(filterfn, ...numbers) {
  const arr = numbers;
  return arr.filter(filterfn).sort();
}

const isEven = (num) => num % 2 === 0;
console.log(filterAndSort(isEven, 5, 3, 8, 6, 2));

// mergeObjects Function: Create a function called mergeObjects that accepts an indefinite number of objects. The function should:
// 1.	Use the spread operator to merge all objects into one.
// 2.	Ensure that if multiple objects contain the same key, the last object's value for that key should be used.
// 3.	Return the merged object.
function mergeObjects(...objs) {
  return objs.reduce((acc, obj) => ({ ...acc, ...obj }), {});
}

const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, b: 4 };
console.log(mergeObjects(obj1, obj2));

function mergeObjects(...objs) {
  return objs.reduce((acc, obj) => ({ ...acc, ...obj }), {});
}

// combineArrays Function: Create a function called combineArrays that takes multiple arrays as arguments. The function should:
// 1.	Use the spread operator to combine all arrays into one.
// 2.	Remove duplicate elements from the combined array.
// 3.	Return the new array with unique elements.
function combineArrays(...arrays) {
  const newArr = arrays.flat();
  const mySet = new Set();
  newArr.forEach((element) => mySet.add(element));
  return [...mySet];
}

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [7, 8, 9];
console.log(combineArrays(arr1, arr2, arr3));

// Create a function named extractProperties that accepts the following:
// •	An array of objects.
// •	A list of property names.
// The function should:
// •	Use the spread operator to create a new array of objects with only the specified properties.
// •	Return the new array of objects.

function extractProperties(objects, ...properties) {
  return objects.map((obj) => {
     return properties.reduce((acc, prop) => ({...acc, [prop]: obj[prop]}),{})
  })
}
const objects = [
  { a: 1, b: 2, c: 3 },
  { a: 4, b: 5, c: 6 },
];
console.log(extractProperties(objects, "a", "c"));
