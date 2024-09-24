"use strict";
// https://www.totaltypescript.com/books/total-typescript-essentials/essential-types-and-annotations#exercise-1-basic-types-with-function-parameters
Object.defineProperty(exports, "__esModule", { value: true });
exports.example5 = exports.example4 = exports.example3 = exports.example2 = exports.example1 = exports.add = void 0;
const add = (a, b) => {
    return a + b;
};
exports.add = add;
const result = (0, exports.add)(1, 2);
// type test = Expect<Equal<typeof result, number>>;
// Exercise 2: Annotating Empty Parameters
const concatTwoStrings = (a, b) => {
    return [a, b].join(" ");
};
const result1 = concatTwoStrings("Hello", "World");
// type test = Expect<Equal<typeof result1, string>>;
// Exercise 3: The Basic Types
exports.example1 = "Hello World!";
exports.example2 = 42;
exports.example3 = true;
exports.example4 = Symbol();
exports.example5 = 123n;
// Exercise 4: The any Type
const handleFormData = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const value = Object.fromEntries(data.entries());
    return value;
};
