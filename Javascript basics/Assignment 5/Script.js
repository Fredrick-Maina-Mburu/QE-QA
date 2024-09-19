// using the data structure below , print a message  my total bill for items above 450 is 1700
const availableFoods = [
  { id: "qwe234dfh", name: "Burger", image: "🍔🍔", price: 234 },
  { id: "qwe2356dxh", name: "pizza", image: "🍕🍕", price: 400 },
  { id: "qwe2456yh", name: "meat", image: "🍖🍖", price: 500 },
  { id: "qwe2785yh", name: "chicken", image: "🍗🍗", price: 1200 },
];

const bill = availableFoods
  .map((foodObj) => foodObj.price)
  .filter((price) => price > 450)
  .reduce((prev, next) => prev + next);

console.log(`my total bill for items above 450 is ${bill}`);


// Array map-reduce-filter-some etc question
// You're building a data analysis dashboard for a social media platform. The API provides an array of user objects, each containing properties like id, name, location, friends (an array of friend IDs), and posts (an array of post objects with content, timestamp, and likes count).
// Challenge:
// Develop a single function using map, reduce, and filter to achieve the following:
// Filter Active Users: Identify users who have posted at least once in the past week (based on timestamp).
// Extract Popular Posts: From the active users' posts, filter out those with less than 10 likes.
// Calculate Average Likes per User: Reduce the remaining popular posts to a single value representing the average number of likes per active user across all their popular posts.
// Constraints:
// Use only map, reduce, and filter (no explicit loops).
// Handle potential edge cases (e.g., empty arrays, invalid dates).
// Aim for code clarity, efficiency, and readability.
// Bonus:
// Extend the function to return an object containing:
// The number of active users.
// The total number of popular posts.
// The average likes per user.
const users = [
  {
    id: 1,
    name: "John",
    location: "New York",
    friends: [2, 3, 4],
    posts: [
      {
        content: "Great day at Central Park!",
        timestamp: "2024-09-10T12:00:00",
        likes: 15,
      },
      {
        content: "Loving the vibes in NYC!",
        timestamp: "2024-09-15T08:30:00",
        likes: 8,
      },
      {
        content: "Visited the Statue of Liberty today!",
        timestamp: "2024-09-05T17:45:00",
        likes: 20,
      },
    ],
  },
  {
    id: 2,
    name: "Alice",
    location: "San Francisco",
    friends: [1, 3],
    posts: [
      {
        content: "Hiking in the Bay Area!",
        timestamp: "2024-09-12T14:20:00",
        likes: 12,
      },
      {
        content: "Enjoying the sunny weather!",
        timestamp: "2024-09-14T11:10:00",
        likes: 6,
      },
    ],
  },
  {
    id: 3,
    name: "Emily",
    location: "Los Angeles",
    friends: [1, 2, 4],
    posts: [
      {
        content: "Beach day in LA!",
        timestamp: "2024-09-08T09:45:00",
        likes: 25,
      },
      {
        content: "Exploring Hollywood!",
        timestamp: "2024-09-16T16:55:00",
        likes: 5,
      },
    ],
  },
  {
    id: 4,
    name: "David",
    location: "Chicago",
    friends: [2],
    posts: [
      {
        content: "Deep dish pizza is the best!",
        timestamp: "2024-09-11T10:30:00",
        likes: 18,
      },
      {
        content: "Trying out a new jazz club tonight!",
        timestamp: "2024-09-13T20:00:00",
        likes: 3,
      },
    ],
  },
  {
    id: 5,
    name: "Sarah",
    location: "Seattle",
    friends: [3, 1],
    posts: [
      {
        content: "Coffee time in the Pacific Northwest!",
        timestamp: "2024-09-09T15:15:00",
        likes: 9,
      },
      {
        content: "Exploring the Olympic National Park!",
        timestamp: "2024-09-14T07:00:00",
        likes: 11,
      },
    ],
  },
];

function analysisDasboard(arr){

   const weekAgo = new Date();
   weekAgo.setDate(weekAgo.getDate() - 7);

   const activeUsers = arr.filter((user) => user.posts.some((post) => new Date(post.timestamp) > weekAgo))

   const popularPosts = activeUsers.flatMap((user) => user.posts.filter((post) => post.likes >= 10))

   const averageLikes = popularPosts.length
    ? popularPosts.reduce((sum, post) => sum + post.likes, 0) / activeUsers.length
    : 0;

  return {
    activeUsersCount: activeUsers.length,
    popularPostsCount: popularPosts.length,
    averageLikesPerUser: averageLikes,
  };
}

console.log(analysisDasboard(users))
