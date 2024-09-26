"use strict";
// #
// Intro to Unions, Literals and Narrowing
// Exercise 1: string or null
function getUsername(username) {
    if (username !== null) {
        return `User: ${username}`;
    }
    else {
        return 'Guest';
    }
}
const result = getUsername('Alice');
// type test = Expect<Equal<typeof result, string>>
const result2 = getUsername(null);
function move(direction, distance) {
    // Move the specified distance in the given direction
}
move('up', 10);
move('left', 5);
