// Discriminated Unions

// Exercise 1: Destructuring a Discriminated Union

type Circle = {
  kind: "circle";
  radius: number;
};

type Square = {
  kind: "square";
  sideLength: number;
};

type Shape = Circle | Square;

function calculateArea(shape: Shape) {
  if (shape.kind === "circle") {
    const { radius } = shape;
    return Math.PI * radius * radius;
  } else {
    const { sideLength } = shape;
    return sideLength * sideLength;
  }
}

// Exercise 2: Narrowing a Discriminated Union with a Switch Statement

function calculateArea1(shape: Shape) {

  switch (shape.kind) {
    case "circle": {
      return Math.PI * shape.radius * shape.radius;
    }
    case "square": {
      return shape.sideLength * shape.sideLength;
    }
  }
}

// Exercise 3: Discriminated Tuples

type User = {
  id: number;
  name: string;
};
type APIResponse1 = ['error',string] | ['success', User[]]

async function fetchData(): Promise<APIResponse1> {
  try {
    const response = await fetch('https://api.example.com/data')

    if (!response.ok) {
      return [
        'error',
        // Imagine some improved error handling here
        'An error occurred',
      ]
    }

    const data = await response.json()

    return ['success',data]
  } catch (error) {
    return ['error', 'An error occurred']
  }
}

async function exampleFunc() {
  const [status, value] = await fetchData()

  if (status === 'success') {
    console.log(value)

    // type test = Expect<Equal<typeof value, User[]>>

  } else {
    console.error(value)

    // type test = Expect<Equal<typeof value, string>>

  }
}

// Exercise 4: Handling Defaults with a Discriminated Union
type Circle1 = {
  kind?: "circle";
  radius: number;
};


type Shape1 = Circle1 | Square;

function calculateArea3(shape: Shape1) {
  if (shape.kind === 'square') {
    return shape.sideLength * shape.sideLength
  } else {
    return Math.PI * shape.radius * shape.radius
  }
}

