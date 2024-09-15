// Write a JavaScript program to list the properties of a JavaScript object.
// Sample object:
// var student = {
// name : "David Rayy",
// sclass : "VI",
// rollno : 12 };
// Sample Output: name,sclass,rollno
var student = {
  name: "David Rayy",
  sclass: "VI",
  rollno: 12,
};
let arr = Object.keys(student);
arr.forEach((element) => console.log(`${element}`));
console.log("\n");

// Write a JavaScript program to delete the rollno property from the following object. Also print the object before or after deleting the property.
delete student.rollno;
console.log(student);
console.log("\n");

// Write a JavaScript program to get the length of a JavaScript object.
// Sample object :
var students = {
  name: "David Rayy",
  sclass: "VI",
  rollno: 12,
};

const studentsLength = Object.keys(students);
console.log(studentsLength.length + "\n");

// Write a JavaScript program to display the reading status (i.e. display book name, author name and reading status) of the following books.var
const library = [
  {
    author: "Bill Gates",
    title: "The Road Ahead",
    readingStatus: true,
  },
  {
    author: "Steve Jobs",
    title: "Walter Isaacson",
    readingStatus: true,
  },
  {
    author: "Suzanne Collins",
    title: "Mockingjay: The Final Book of The Hunger Games",
    readingStatus: false,
  },
];

for (book of library) {
  console.log(`author: ${book.author}`);
  console.log(`title: ${book.title}`);
  console.log(`readingStatus: ${book.readingStatus ? "read" : "unread"}`);
  console.log();
}

// Write a JavaScript program that returns a subset of a string.
// Sample Data: dog
// Expected Output: ["d", "do", "dog", "o", "og", "g"]
function returnSubsetString(str) {
  const arr = [];
  for (let start = 0; start < str.length; start++) {
    for (let end = start + 1; end <= str.length; end++) {
      arr.push(str.substring(start, end));
    }
  }
  return arr;
}

console.log(returnSubsetString("dog"));
console.log("\n");

// Write a JavaScript program to sort an array of JavaScript objects.
// Sample Object :
var libraries = [
  {
    title: "The Road Ahead",
    author: "Bill Gates",
    libraryID: 1254,
  },
  {
    title: "Walter Isaacson",
    author: "Steve Jobs",
    libraryID: 4264,
  },
  {
    title: "Mockingjay: The Final Book of The Hunger Games",
    author: "Suzanne Collins",
    libraryID: 3245,
  },
];

console.log(libraries.sort((a, b) => b.libraryID - a.libraryID));
console.log("\n");

// Write a JavaScript function to print all the methods in a JavaScript object.
// Test Data :
// console.log(all_properties(Array));
// ["length", "name", "arguments", "caller", "prototype", "isArray", "observe", "unobserve"]
const obj = {
  length: function () {
    console.log("method 1");
  },
  name: function () {
    console.log("method 2");
  },
  arguments: function () {
    console.log("method 3");
  },
  caller: function () {
    console.log("method 4");
  },
  prototype: function () {
    console.log("method 5");
  },
};
const arrMethods = Object.getOwnPropertyNames(obj).filter(
  (property) => typeof obj[property] === "function"
);
console.log(arrMethods);
console.log('\n')

// Write a JavaScript function to parse an URL.
function parseURL(url) {
  const parsed = new URL(url);
  return {
    href: parsed.href,
    protocol: parsed.protocol, 
    host: parsed.host,
    hostname: parsed.hostname,
    port: parsed.port,
    pathname: parsed.pathname,
    search: parsed.search,
    searchParams: parsed.searchParams,
  };
}

const url = 'https://www.w3schools.com/jsref/jsref_object_keys.asp'
console.log(parseURL(url))
console.log('\n')

// Write a JavaScript function to retrieve all the names of an object's own and inherited properties.
function getAllPropertyNames(obj) {
  const ownProperties = Object.getOwnPropertyNames(obj);
  
  const proto = Object.getPrototypeOf(obj);
  
  const inheritedProperties = proto ? Object.getOwnPropertyNames(proto) : [];

  return [...ownProperties, ...inheritedProperties];
}

const myObject = {
  property1: "value1",
  method1: function() {}
};

const parentObject = {
  property2: "value2",
  method2: function() {}
};

Object.setPrototypeOf(myObject, parentObject)

console.log(getAllPropertyNames(myObject))
console.log('\n')

// Write a JavaScript function to retrieve all the values of an object's properties.
function getValues(myObj) {
  const properties = Object.keys(myObj)
  return properties.map(property => myObj[property])
}

const obj1 = {
  property1: "value1",
  caller: function() {},
  property2: "value2"
}

console.log(getValues(obj1))
console.log('\n')

// Write a JavaScript function to convert an object into a list of `[key, value]` pairs.
Object.entries(obj1)
console.log(Object.entries(obj1))
console.log('\n')

// Write a JavaScript function to get a copy of the object where the keys become the values and the values are the keys.
function inverseObject(myObj) {
  return Object.fromEntries(Object.entries(myObj).map(([key, value]) => [value, key]))
}

const obj2 = {
  a: 1,
  b: 2,
  name: "fred"
}
console.log(inverseObject(obj2))
console.log('\n')

// Write a JavaScript function to check whether an object contains a given property.
function checkProperty(obj, property){
  return Object.prototype.hasOwnProperty.call(obj, property)
}

const person = {
  firstName: "Fred",
  lastName: "maina",
  Age: 24
}

console.log(checkProperty(person, "Age"))