"use strict";
// Mutability and 
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const modifyButtons = (attributes) => { };
const buttonsToChange = [
    {
        type: "button",
    },
    {
        type: "submit",
    },
];
modifyButtons(buttonsToChange);
// Exercise 2: Avoiding Array Mutation
function printNames(names) {
    for (const name of names) {
        console.log(name);
    }
    // names.push("John");
    // names[0] = "Billy";
}
// Exercise 3: An Unsafe Tuple
const dangerousFunction = (arrayOfNumbers) => {
    arrayOfNumbers.pop();
    arrayOfNumbers.pop();
};
const myHouse = [0, 0];
// Deep Immutability with as const
// Exercises
// Exercise 1: Returning A Tuple From A Function
const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield fetch("/");
    if (!result.ok) {
        return [new Error("Could not fetch data.")];
    }
    const data = yield result.json();
    return [undefined, data];
});
const example = () => __awaiter(void 0, void 0, void 0, function* () {
    const [error, data] = yield fetchData();
    //   type Tests = [
    //     Expect<Equal<typeof error, Error | undefined>>,
    // Type 'false' does not satisfy the constraint 'true'.
    //     Expect<Equal<typeof data, any>>,
    //   ];
});
const modifyButtons1 = (attributes) => { };
const buttonsToChange1 = [
    {
        type: "button",
    },
    {
        type: "submit",
    },
];
modifyButtons1(buttonsToChange1);
