// Define the functions returning Promises

function loginUser(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Logged into Netflix");
      resolve({ userEmail: email });
    }, 3000);
  });
}

function recentlyWatchedVideo({ userEmail }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Retrieved recently watched videos");
      resolve({
        userEmail,
        videos: ["Star Wars", "The Mando", "The Lord of The Rings"]
      });
    }, 3000);
  });
}

function getDetailsOfOneVideo(video) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Getting details of the video");
      resolve({ video, name: "The Mando" });
    }, 3000);
  });
}

function getTimeStamp(video) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Getting timestamp of the video");
      resolve({ video, stoppingTime: "00:24:45" });
    }, 3000);
  });
}

function renderVideo(video, timestamp) {
  console.log(`Rendering ${video} from timestamp ${timestamp}`);
}

// Chain Promises

loginUser("job@gmail.com", "kjvhjsdvhj")
  .then(user => recentlyWatchedVideo(user))
  .then(videos => {
    const searchElement = "The Mando";
    const videoIndex = videos.videos.indexOf(searchElement);

    if (videoIndex !== -1) {
      return getDetailsOfOneVideo(videos.videos[videoIndex]);
    } else {
      throw new Error("Video was not found");
    }
  })
  .then(video => getTimeStamp(video))
  .then(({ video, stoppingTime }) => renderVideo(video, stoppingTime))
  .catch(err => {
    console.log("Error:", err);
  });