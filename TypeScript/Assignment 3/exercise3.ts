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

