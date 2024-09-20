const apiUrl = "http://localhost:5000/events";

const priceFilter = document.getElementById("price-filter");
const locationFilter = document.getElementById("location-filter");

let events = [];
let favorites = {}

async function fetchEvents() {
  try {
    const response = await fetch(apiUrl);
    const eventsData = await response.json();
    return eventsData;
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

function renderEvents(events) {
  const eventList = document.getElementById("event-list");
  eventList.innerHTML = "";


  events.forEach((event) => {
    const eventCard = document.createElement("div");
    eventCard.classList.add("event-card");

    const isFavorite = favorites[event.id] ? "Remove from favorite" : "Buy now";

    eventCard.innerHTML = `
            <img src="${event.imageUrl}" alt="${event.title}">
            <h3>${event.title}</h3>
            <p>Price: $${event.price}</p>
            <p>Date: ${event.date}</p>
            <p>${event.location}</p>
            <button class="favorite-btn" data-id="${event.id}">${isFavorite}</button>
        `;

    eventList.appendChild(eventCard);
  });
  document.querySelectorAll(".favorite-btn").forEach((button) => {
    button.addEventListener('click', (event) => {
      const id = event.target.getAttribute('data-id')

      if(button.textContent == "Buy now"){
        button.textContent="Remove from favorite"
        handleAddtoFavorite(id)
      } else {
        button.textContent="Buy now"
        removeFromFavorite(id)
      }
      
    })   
  })
}

function handleAddtoFavorite(id){
  const eventObj = events.find(event => event.id === id)

  if(!eventObj){
    console.log("event not found")
    return
  }
   
  if(!favorites[id]){
    favorites[id] = {...eventObj, favorite: true}
  }
  renderfavorites()

}

function removeFromFavorite(id){
  if(favorites[id]){
    delete favorites[id]
    renderfavorites()
  }  
}

function renderfavorites(){
  const favoritesList = document.getElementById('favorites-list')
  favoritesList.innerHTML =''

  for(const itemId in favorites){
    const favorite = favorites[itemId]

    const favoriteCard = document.createElement('div')
    favoriteCard.classList.add('favorite-card')

    favoriteCard.innerHTML = `
      <p>${favorite.title} </p>
    `
    favoritesList.append(favoriteCard)
  }
}

priceFilter.addEventListener("change", filterEvents);
locationFilter.addEventListener("input", filterEvents);

function filterEvents() {
  let filteredEvents = [...events];

  const priceValue = priceFilter.value;
  if (priceValue === "low") {
    filteredEvents = filteredEvents.filter((event) => event.price < 30);
  } else if (priceValue === "medium") {
    filteredEvents = filteredEvents.filter(
      (event) => event.price >= 30 && event.price <= 50
    );
  } else if (priceValue === "high") {
    filteredEvents = filteredEvents.filter((event) => event.price > 50);
  }

  const locationValue = locationFilter.value.toLowerCase();
  if (locationValue) {
    filteredEvents = filteredEvents.filter((event) =>
      event.location.toLowerCase().includes(locationValue)
    );
  }

  renderEvents(filteredEvents);
}

async function init() {
  events = await fetchEvents();
  renderEvents(events);
}
init();
