"use strict";
// https://www.totaltypescript.com/books/total-typescript-essentials/essential-types-and-annotations#passing-types-to-functions
// exercise-1-passing-types-to-map
const userMap = new Map();
userMap.set(1, { name: "Max", age: 30 });
userMap.set(2, { name: "Manuel", age: 31 });
// userMap.set("3", { name: "Anna", age: 29 });
// userMap.set(3, "123");
// https://www.totaltypescript.com/books/total-typescript-essentials/essential-types-and-annotations#exercise-2-jsonparse-cant-receive-type-arguments
const parsedData = JSON.parse('{"name": "Alice", "age": 30}');
