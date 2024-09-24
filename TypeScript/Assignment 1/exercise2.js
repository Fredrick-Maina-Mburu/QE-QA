"use strict";
// Exercise 1: Object Literal Types
const concatName = (user) => {
    return `${user.first} ${user.last}`;
};
// it("should return the full name", () => {
//   const result = concatName({
//     first: "John",
//     last: "Doe",
//   });
//   type test = Expect<Equal<typeof result, string>>;
//   expect(result).toEqual("John Doe");
// });
const concatName1 = (user) => {
    return `${user.first} ${user.last}`;
};
