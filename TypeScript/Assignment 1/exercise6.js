"use strict";
// https://www.totaltypescript.com/books/total-typescript-essentials/essential-types-and-annotations#typing-functions
Object.defineProperty(exports, "__esModule", { value: true });
exports.concatenate = concatenate;
// Exercise 1: Optional Function Parameters
const concatName2 = (first, last) => {
    if (!last) {
        return first;
    }
    return `${first} ${last}`;
};
const result = concatName2("John", "Doe");
// Exercise 2: Default Function Parameters
const concatName3 = (first, last = "Pockok") => {
    if (!last) {
        return first;
    }
    return `${first} ${last}`;
};
// it("should return the first name", () => {
//   const result = concatName("John");
//   type test = Expect<Equal<typeof result, string>>;
//   expect(result).toEqual("John Pocock");
// });
// exercise-3-rest-parameters
function concatenate(...strings) {
    return strings.join("");
}
const modifyUser = (user, id, makeChange) => {
    return user.map((u) => {
        if (u.id === id) {
            return makeChange(u);
        }
        return u;
    });
};
// Exercise 5: Functions Returning void
const addClickEventListener = (listener) => {
    document.addEventListener("click", listener);
};
// Solution 6: void vs undefined
const acceptsCallback = (callback) => {
    callback();
};
const returnString = () => {
    return "Hello!";
};
acceptsCallback(returnString);
// Exercise 7: Typing Async Functions
async function fetchData() {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    return data;
}
