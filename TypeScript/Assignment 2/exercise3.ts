// unknown and never

const getNever = () => {
  throw new Error("This function never returns");
};

const fn = (input: never) => {};

fn(getNever());

// Exercise 1: Narrowing Errors with instanceof

const somethingDangerous = () => {
  if (Math.random() > 0.5) {
    throw new Error("Something went wrong");
  }

  return "all good";
};

try {
  somethingDangerous();
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    throw error;
  }
}

// Exercise 2: Narrowing unknown to a Value
const parseValue = (value: unknown) => {
  if (
    typeof value === "object" &&
    value !== null &&
    "data" in value &&
    typeof value.data === "object" &&
    value.data !== null &&
    "id" in value.data &&
    typeof value.data.id === "string"
  ) {
    return value.data.id;
  }

  throw new Error("Parsing error!");
};

// Exercise 3: Reusable Type Guards

type ValueWithDataId = {
  data: {
    id: string;
  };
};
const parseValue1 = (value: unknown) => {
  if (hasDataId(value)) {
    return value.data.id;
  }

  throw new Error("Parsing error!");
};

const parseValueAgain = (value: unknown) => {
  if (hasDataId(value)) {
    return value.data.id;
  }

  throw new Error("Parsing error!");
};

const hasDataId = (value: unknown): value is ValueWithDataId  => {
  return (
    typeof value === "object" &&
    value !== null &&
    "data" in value &&
    typeof (value as any).data === "object" &&
    (value as any).data !== null &&
    "id" in (value as any).data &&
    typeof (value as any).data.id === "string"
  );
};
