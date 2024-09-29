// Reducing Duplication with Utility Types
// use of Partial makes properties of an object optional
type Album = {
  id: number;
  title: string;
  artist: string;
  releaseYear: number;
  genre: string;
}

type PartialAlbum = Partial<Album>;

const updateAlbum = (album: PartialAlbum) => {
  // ...
};

updateAlbum({ title: "Geogaddi", artist: "Boards of Canada" });

// use of Required makes sure that all the properties of an object are required

type Albums = {
  id: number;
  title: string;
  artist?: string;
  releaseYear?: number;
  genre?: string;
}

type RequiredAlbum = Required<Albums>;

const updateAlbums = (album: RequiredAlbum) => {}

// Exercises
// Exercise 1: Expecting Certain Properties

interface User1 {
  id: string;
  name: string;
  email: string;
  role: string;
}

type NameAndEmail = Pick<User1, 'id' | 'name'>

const fetchUser = async (): Promise<NameAndEmail> => {
  const response = await fetch("/api/user");
  const user = await response.json();
  return user;
};

const example = async () => {
  const user = await fetchUser();

//   type test = Expect<Equal<typeof user, { name: string; email: string }>>;
// Type 'false' does not satisfy the constraint 'true'.
};

// Exercise 2: Updating a Product

interface Product1 {
  id: number;
  name: string;
  price: number;
  description: string;
}

type ProductWithoutId = Partial<Omit<Product1, 'id'>>

const updateProduct = (id: number, productInfo: ProductWithoutId) => {
  // Do something with the productInfo
};