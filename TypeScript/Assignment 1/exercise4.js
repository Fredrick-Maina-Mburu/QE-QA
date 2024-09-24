"use strict";
const processCart = (cart) => {
    // Do something with the cart in here
};
processCart({
    userId: "user123",
    items: ["item1", "item2", "item3"],
});
const processRecipe = (recipe) => {
    // Do something with the recipe in here
};
processRecipe({
    title: "Chocolate Chip Cookies",
    ingredients: [
        { name: "Flour", quantity: "2 cups" },
        { name: "Sugar", quantity: "1 cup" },
    ],
    instructions: "...",
});
// Exercise 3: Tuples
const setRange = (range) => {
    const x = range[0];
    const y = range[1];
    // Do something with x and y in here
    // x and y should both be numbers!
    // type tests = [
    //   Expect<Equal<typeof x, number>>,
    //   Expect<Equal<typeof y, number>>,
    // ];
};
// Exercise 4: Optional Members of Tuples
const goToLocation = (coordinates) => {
    const latitude = coordinates[0];
    const longitude = coordinates[1];
    const elevation = coordinates[2];
    // Do something with latitude, longitude, and elevation in here
    // type tests = [
    //   Expect<Equal<typeof latitude, number>>,
    //   Expect<Equal<typeof longitude, number>>,
    //   Expect<Equal<typeof elevation, number | undefined>>,
};
