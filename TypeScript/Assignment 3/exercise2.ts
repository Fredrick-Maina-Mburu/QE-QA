
// Dynamic Object Keys
// use of index signature to handle dynamic keys
type Obj = {
  [index: string]: boolean | string | number;
}
const albumAwards: Obj  = {}

albumAwards.Grammy = 'cat';
albumAwards.MercuryPrize = false;
albumAwards.Billboard = 45;

//Using a Record Type for Dynamic Keys

const albumAwards1 : Record<string, boolean | string | number> = {}

albumAwards1.Grammy = 'cat';
albumAwards1.MercuryPrize = false;
albumAwards1.Billboard = 95;

// Exercise 1: Use an Index Signature for Dynamic Keys

const score: Record<PropertyKey,number> = {};

score.math = 95;

score.english = 90;

score.science = 85;


// Exercise 2: Default Properties with Dynamic Keys

interface Scores {
  [index: string]: number;
  math: number;
  english:number;
  science: number;
}

const scores: Scores = {
  math: 95,
  english: 90,
  science: 98,
};

scores.athletics = 100;

scores.french = 75;

scores.spanish = 70;

// Exercise 3: Restricting Object Keys With Records

type Environment = "development" | "production" | "staging";

type Configurations = Record<Environment,{}>;

const configurations: Configurations = {
  development: {
    apiBaseUrl: "http://localhost:8080",
    timeout: 5000,
  },
  production: {
    apiBaseUrl: "https://api.example.com",
    timeout: 10000,
  },
  staging: {
    apiBaseUrl: "https://staging.example.com",
    timeout: 8000,
  },

  // notAllowed: {
  //   apiBaseUrl: "https://staging.example.com",
  //   timeout: 8000,
  // },
};

// Exercise 4: Dynamic Key Support

const hasKey = (obj: object, key: PropertyKey) => {
  return obj.hasOwnProperty(key);
};

// it("Should work on string keys", () => {
//   const obj = {
//     foo: "bar",
//   };

//   expect(hasKey(obj, "foo")).toBe(true);
//   expect(hasKey(obj, "bar")).toBe(false);
// });
// A test case that checks for numeric keys does have issues because the function is expecting a string key:

// it("Should work on number keys", () => {
//   const obj = {
//     1: "bar",
//   };

//   expect(hasKey(obj, 1)).toBe(true);
// Argument of type 'number' is not assignable to parameter of type 'string'.
//   expect(hasKey(obj, 2)).toBe(false);
// Argument of type 'number' is not assignable to parameter of type 'string'.
// });

// it("Should work on symbol keys", () => {
//   const fooSymbol = Symbol("foo");
//   const barSymbol = Symbol("bar");

//   const obj = {
//     [fooSymbol]: "bar",
//   };

//   expect(hasKey(obj, fooSymbol)).toBe(true);
// Argument of type 'typeof fooSymbol' is not assignable to parameter of type 'string'.
//   expect(hasKey(obj, barSymbol)).toBe(false);
// Argument of type 'typeof barSymbol' is not assignable to parameter of type 'string'.
// });