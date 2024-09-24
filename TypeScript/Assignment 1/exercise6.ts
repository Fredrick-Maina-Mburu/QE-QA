// https://www.totaltypescript.com/books/total-typescript-essentials/essential-types-and-annotations#typing-functions


// Exercise 1: Optional Function Parameters
const concatName2 = (first: string, last?: string) => {
  if (!last) {
    return first;
  }

  return `${first} ${last}`;
};

const result = concatName2("John", "Doe");

// Exercise 2: Default Function Parameters

const concatName3 = (first: string, last: string = "Pockok") => {
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

export function concatenate(...strings: Array<string>) {

  return strings.join("");
}

// Exercise 4: Function Types

type User = {
  id: string;
  name: string;
};

type MakeChange = (user: User) => User

const modifyUser = (user: User[], id: string, makeChange:MakeChange) => {
  return user.map((u) => {
    if (u.id === id) {
      return makeChange(u);
    }

    return u;
  });
};

// Exercise 5: Functions Returning void
const addClickEventListener = (listener: () => void) => {
  document.addEventListener("click", listener);
};

// Solution 6: void vs undefined
const acceptsCallback = (callback: () => void) => {
  callback();
};

const returnString = () => {
  return "Hello!";
};

acceptsCallback(returnString);

// Exercise 7: Typing Async Functions
async function fetchData(): Promise<number> {
  const response = await fetch("https://api.example.com/data");

  const data = await response.json();

  return data;
}
