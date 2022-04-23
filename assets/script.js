var searchFormEl = document.querySelector("#search-form");
var queryEl = document.querySelector("#query-name");
var searchBodyEl = document.querySelector("#searched-body");
var marvelHeroEl = document.querySelector("#marvel-hero-body");

var marvelBioEl = document.querySelector("#marvel-bio-body");
var marvelImageEl = document.querySelector("#marvel-image-body");
var youtubeBodyEl = document.querySelector("#youtube-body");
var descriptionEl = document.querySelector("#description");
var searchedBodyEl = document.querySelector("#searched-body");
var modalErrorEl = document.getElementById("modal-error");
var modalErrorCloseBtnEl = document.getElementById("modal-error-close-btn");

// modal initialised
function initMaterializeModals() {
  var elems = document.querySelectorAll(".modal");
  M.Modal.init(elems);
}
initMaterializeModals();

var modalErrorInstance = M.Modal.getInstance(modalErrorEl);

modalErrorCloseBtnEl.addEventListener("click", (event) =>
  modalErrorInstance.close()
);

//youTube API variables
// Youtube API1
// backup api key
// const youTubeApiKey = "AIzaSyAfUF4iIR3SGaR4Zp32vLIHhtUBJH2nPR0";
//  Youtube API2
const youTubeApiKey = "AIzaSyAcJwcGGZME6Gs--ct2mRB_KSOJ1gQmI-g";

const youTubeMaxResults = "1";
//marvel variables
var marvelKey = "01f7cfc9bdb8d6b74631203dbb7e8ccc";
var marvelOtherKey = "110fcff0e74b0a6ff3a9454850fa2118911a64b1";
var ts = new Date().getTime();
var hash = ts + marvelOtherKey + marvelKey;
var passhash = md5(hash).toString();

var heroHistory = [];
var foundHero = "";
var storedHeros = [];

//function after submit is hit
var formSubmitHandler = function (event) {
  event.preventDefault();
  marvelImageEl.innerHTML = "";

  var heroName = queryEl.value.trim();
  queryEl.value = "";

  if (heroName) {
    console.log("hero has been found");
    getHeroRepos(heroName);
    //Enter Classes for this element
    marvelHeroEl.classList = "";
  } else {
    // modal - hero not found
    modalErrorInstance.open();
    // clear the dom from the previous content
    document.getElementById("description").style.display = "none";
    document.getElementById("marvel-hero-body").textContent = "";
    document.getElementById("marvel-bio-body").textContent = "";
    document.getElementById("marvel-image-body").textContent = "";
    document.getElementById("youtube-body").textContent = "";
  }
};

//api search for hero based on query input
var getHeroRepos = function (hero) {
  console.log(passhash);
  var requestUrl =
    "https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=" +
    hero +
    "&apikey=01f7cfc9bdb8d6b74631203dbb7e8ccc" +
    "&ts=" +
    ts +
    "&hash=" +
    passhash +
    "&limit=1";

  // calling the API that searches for the hero starting with the letter entered
  fetch(requestUrl).then(function (response) {
    response.json().then(function (data) {
      var heroSearch = data.data.results[0];
      console.log(heroSearch);

      if (heroSearch) {
        foundHero = heroSearch.name;
        var heroID = heroSearch.id;
        console.log(
          "the variable for the hero name " + foundHero + " is foundHero"
        );

        displayHero(foundHero, heroID);
        storeSearch(foundHero);
      } else if (heroSearch === undefined) {
        // modal - hero not found
        modalErrorInstance.open();
        // clear the dom from the previous content
        document.getElementById("description").style.display = "none";
        document.getElementById("marvel-hero-body").textContent = "";
        document.getElementById("marvel-bio-body").textContent = "";
        document.getElementById("marvel-image-body").textContent = "";
        document.getElementById("youtube-body").textContent = "";
      }
    });
  });
};

//storing history
function storeSearch(foundHero) {
  localStorage.setItem("heroHistory", JSON.stringify(foundHero));
}

document.addEventListener("DOMContentLoaded", function () {
  const inputField = document.querySelector(".autocomplete");
  var storedHeros = JSON.parse(localStorage.getItem("heroHistory"));
  console.log("the heros in history are", storedHeros);

  var entries = new Map([[storedHeros, null]]);
  console.log("entries", entries);

  var data = Object.fromEntries(entries);

  console.log(data);

  M.Autocomplete.init(inputField, { data, limit: 5, minLength: 1 });
});

//if hero is found
var displayHero = function (foundHero, heroID) {
  console.log("passed display hero function and ID is " + heroID);
  if (foundHero.length === 0) {
    //modal - hero not found
    modalErrorInstance.open();
    // clear the dom from the previous content
    document.getElementById("description").style.display = "none";
    document.getElementById("marvel-hero-body").textContent = "";
    document.getElementById("marvel-bio-body").textContent = "";
    document.getElementById("marvel-image-body").textContent = "";
    document.getElementById("youtube-body").textContent = "";
    return;
  }

  marvelHeroEl.innerHTML = "<h2>" + foundHero + "</h2>";

  descriptionEl.style.display = "block";

  displayHeroBio(heroID, foundHero);

  //call youTube search API
  getYouTubeVideo(foundHero);
  console.log("foundHero", foundHero);
};

//if hero is found, pull the bio
var displayHeroBio = function (heroID, foundHero) {
  console.log("passed display hero bio function and ID is " + heroID);

  var requestUrl =
    "https://gateway.marvel.com:443/v1/public/characters/" +
    heroID +
    "?apikey=01f7cfc9bdb8d6b74631203dbb7e8ccc" +
    "&ts=" +
    ts +
    "&hash=" +
    passhash;

  fetch(requestUrl).then(function (response) {
    response.json().then(function (data) {
      var heroDescription = data.data.results[0];
      var heroDescriptionFull = data.data.results[0].description;
      var heroImagePath = heroDescription.thumbnail.path;

      var heroImageExtension = heroDescription.thumbnail.extension;
      var heroImageLink = heroImagePath + "." + heroImageExtension;
      console.log(heroImageLink);

      if (!heroDescriptionFull) {
        marvelBioEl.textContent = "No bio found";
      } else {
        marvelBioEl.textContent = heroDescriptionFull;
      }

      marvelImageEl.innerHTML +=
        '<img src="' +
        heroImageLink +
        '" alt=" ' +
        foundHero +
        '"style="width:100%"><br/>';
    });
  });
};

//search for youTube Marvel channel videos using hero search term, return data for one video
var getYouTubeVideo = function (foundHero) {
  var videoHero = foundHero;
  console.log("videoHero", videoHero);

  // request to Marvel api
  var videoRequestUrl =
    "https://youtube.googleapis.com/youtube/v3/search?part=snippet" +
    //marvel's channel id
    "&channelId=UCvC4D8onUfXzvjTOM-dBfEA" +
    //type video
    "&type=video&maxResults=" +
    //max results = 1
    youTubeMaxResults +
    //search for search term
    "&q=" +
    videoHero +
    "&key=" +
    youTubeApiKey;

  // calling the youTube API to search for one video with search word "videoHero"
  fetch(videoRequestUrl).then(function (response) {
    response.json().then(function (data) {
      var videoHeroSearch = data;
      console.log("videoHeroSearch - data", videoHeroSearch);

      if (videoHeroSearch.items.length !== undefined) {
        var heroVideoId = data.items[0].id.videoId;
        console.log("hero's video id", heroVideoId);
        //pass heroVideoID to video url and display video
        displayHeroVideo(heroVideoId);
      } else {
        youtubeBodyEl.innerHTML = "";
        //modal - hero not found
        modalErrorInstance.open();
        // clear the dom from the previous content
        document.getElementById("description").style.display = "none";
        document.getElementById("marvel-hero-body").textContent = "";
        document.getElementById("marvel-bio-body").textContent = "";
        document.getElementById("marvel-image-body").textContent = "";
        document.getElementById("youtube-body").textContent = "";
      }
    });
  });
};

//display the hero video
var displayHeroVideo = function (heroVideoId) {
  if (heroVideoId.length === 0) {
    // modal - hero not found
    modalErrorInstance.open();
    // clear the dom from the previous content
    document.getElementById("description").style.display = "none";
    document.getElementById("marvel-hero-body").textContent = "";
    document.getElementById("marvel-bio-body").textContent = "";
    document.getElementById("marvel-image-body").textContent = "";
    document.getElementById("youtube-body").textContent = "";
    return;
  }
  //stop video appending children when new search
  youtubeBodyEl.innerHTML = "";
  //create url for hero video
  var heroVideoUrl = "https://www.youtube.com/embed/" + heroVideoId;
  console.log("video link for hero video: ", heroVideoUrl);

  //append elements to display video
  var videoContainerEl = document.createElement("div");
  videoContainerEl.classList.add("video-container", "scale-in");

  var videoFrameEl = document.createElement("iframe");
  videoFrameEl.width = "853";
  videoFrameEl.height = "480";
  videoFrameEl.src = heroVideoUrl;
  videoFrameEl.frameborder = "0";
  videoFrameEl.allowfullscreen;

  videoContainerEl.appendChild(videoFrameEl);
  youtubeBodyEl.appendChild(videoContainerEl);
};

searchFormEl.addEventListener("submit", formSubmitHandler);
