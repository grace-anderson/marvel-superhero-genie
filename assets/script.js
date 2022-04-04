var searchFormEl = document.querySelector("#search-form");
var queryEl = document.querySelector("#query-name");
var marvelHeroEl = document.querySelector("#marvel-hero-body");
var searchButton = document.querySelector("#search-button");
//youTube API variables
const youTubeApiKey = "AIzaSyAfUF4iIR3SGaR4Zp32vLIHhtUBJH2nPR0";
const youTubeMaxResults = "1";
//marvel variables
var marvelKey = "01f7cfc9bdb8d6b74631203dbb7e8ccc";
var marvelOtherKey = "110fcff0e74b0a6ff3a9454850fa2118911a64b1";
var ts = new Date().getTime();
var hash = ts + marvelOtherKey + marvelKey;
var passhash = md5(hash).toString();

var formSubmitHandler = function (event) {
  event.preventDefault();

  var heroName = queryEl.value.trim();
  console.log(heroName);

  if (heroName) {
    console.log("hero has been found");
    getHeroRepos(heroName);
    //Enter Classes for this element
    marvelHeroEl.classList = "";
  } else {
    marvelHeroEl.textContent = "Please enter a name or letter";
  }
};

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

  console.log(requestUrl);
  // calling the API that searches for the hero starting with the letter entered
  fetch(requestUrl).then(function (response) {
    response.json().then(function (data) {
      var heroSearch = data.data.results[0];
      console.log(heroSearch);

      if (heroSearch) {
        var foundHero = heroSearch.name;
        console.log(
          "the variable for the hero name " + foundHero + " is foundHero"
        );
        displayHero(foundHero);
      } else if (heroSearch === undefined) {
        marvelHeroEl.textContent = "Sorry no heroes found";
        noResultsModal(".modal-wrapper", ".modal-content", true);
      }
    });
  });
};

var displayHero = function (foundHero) {
  if (foundHero.length === 0) {
    marvelHeroEl.textContent = "No hero found";
    noResultsModal(".modal-wrapper", ".modal-content", true);
    return;
  }
  marvelHeroEl.textContent = "Showing results for " + foundHero;

  //call youTube search API
  getYouTubeVideo(foundHero);
  console.log("foundHero", foundHero);
};

//search for youTube Marvel channel videos using hero search term, return data for one video
var getYouTubeVideo = function (foundHero) {
  var videoHero = foundHero;
  console.log("videoHero", videoHero);

  //MARVEL - UPDATED URL TO INCLUDE MARVEL CHANNEL AND UPLOAD VIDEO PLAYLIST
  //Marvel call - updated url to include Marvel channel's upload video playlist
  //this is supposed to ensure that only marvel videos are selected by the search

  var videoRequestUrl =
    "https://www.googleapis.com/youtube/v3/search?order=title&key=" +
    youTubeApiKey +
    //marvel's channel id
    "&channelId=UCvC4D8onUfXzvjTOM-dBfEA" +
    //marvel's upload playlist
    "&playlistId=UUvC4D8onUfXzvjTOM-dBfEA&part=snippet,id&order=date&maxResults=" +
    youTubeMaxResults +
    "&q=" +
    videoHero;
  ////////////////////////////////

  // MARVEL
  // this is how to find Marvel's upload playlist ID
  // https://www.googleapis.com/youtube/v3/channels?&part=contentDetails&forUsername=MARVEL&key=AIzaSyAfUF4iIR3SGaR4Zp32vLIHhtUBJH2nPR0
  // results
  // {
  // "kind": "youtube#channelListResponse",
  // "etag": "vqnTHvEI4hsi6iyr6-KOWaUShBs",
  // "pageInfo": {
  // "totalResults": 1,
  // "resultsPerPage": 5
  // },
  // "items": [
  // {
  // "kind": "youtube#channel",
  // "etag": "14j1dvPAR2VCOzS2QX3SqDeI7nE",
  // "id": "UCvC4D8onUfXzvjTOM-dBfEA",
  // "contentDetails": {
  // "relatedPlaylists": {
  // "likes": "",
  // "uploads": "UUvC4D8onUfXzvjTOM-dBfEA"
  // UPLOADS is PLAYLIST ID
  // }
  // }
  // }
  // ]
  // }

  //   var videoRequestUrl =
  //   "https://www.googleapis.com/youtube/v3/channels?&part=contentDetails&forUserName=GoogleDevelopers&key=" + youTubeApiKey;
  //   "https://www.googleapis.com/youtube/v3/channels?&part=contentDetails&forUserName=MARVEL&key=AIzaSyAfUF4iIR3SGaR4Zp32vLIHhtUBJH2nPR0"
  //NB UserName is legacy, replaced by channel ID
  //returns playlist that corresponds to the uploads for the channel -> "uploads" ID => suggestion is to save "uploads" local variable and use in follow up call
  //follow up call is for youTube playlist items list
  //for call to playlist uses snippet
  //part=snippet
  //playlistId=["uploads" playlist ID] - got from above call to channel
  //also set max results to (e.g) 50 (max you ca )
  //from video Getting a Channel's uploads in v3 (GoogleDevelopers) - 8.15
  // "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=5&playlistId=UUvC4D8onUfXzvjTOM-dBfEA&key=AIzaSyAfUF4iIR3SGaR4Zp32vLIHhtUBJH2nPR0&q=spider-man"

  // "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=5&playlistId=UUvC4D8onUfXzvjTOM-dBfEA&q=spider-man&key=AIzaSyAfUF4iIR3SGaR4Zp32vLIHhtUBJH2nPR0"

  //www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=5&playlistId=UUvC4D8onUfXzvjTOM-dBfEA&key=AIzaSyAfUF4iIR3SGaR4Zp32vLIHhtUBJH2nPR0

  //TEST THIS BELOW
  //updated to try to use marvelplay list and search term
  //CANNOT TEST as OVER QUOTA LIMIT
  //https://www.googleapis.com/youtube/v3/search?key=AIzaSyAfUF4iIR3SGaR4Zp32vLIHhtUBJH2nPR0&playlistId=UUvC4D8onUfXzvjTOM-dBfEA&part=snippet,id&order=date&maxResults=1&q=moon

  //var videoRequestUrl =
  //     "https://www.googleapis.com/youtube/v3/search?key=" +
  //     youTubeApiKey +
  //     "&playlistId=UUvC4D8onUfXzvjTOM-dBfEA" +
  //     "&part=snippet,id&order=date&maxResults=" +
  //     youTubeMaxResults +
  //     "&q=" +
  //     videoHero;

  // playlistItems?part=snippet&maxResults=50&playlistId=UUvC4D8onUfXzvjTOM-dBfEA

  //   search?key=" +

  //   "&channelId=UCvC4D8onUfXzvjTOM-dBfEA" +
  //   "&part=snippet,id&order=date&maxResults=" +
  //   youTubeMaxResults +
  //   "&q=" +
  //   videoHero;

  ////////////////////

  // calling the youTube API to search for one video with search word "videoHero"
  https: fetch(videoRequestUrl).then(function (response) {
    response.json().then(function (data) {
      var videoHeroSearch = data;
      console.log("videoHeroSearch - data", videoHeroSearch);

      if (videoHeroSearch.items.length > 0) {
        var heroVideoId = data.items[0].id.videoId;
        console.log("hero's video id", heroVideoId);
        //pass heroVideoID to video url and display video
        displayHeroVideo(heroVideoId);
      } else {
        marvelHeroEl.textContent = "Sorry no hero video found";
        noResultsModal(".modal-wrapper", ".modal-content", true);
      } 
    });
  });
};

//display the hero video
var displayHeroVideo = function (heroVideoId) {
  if (heroVideoId.length === 0) {
    marvelHeroEl.textContent = "No video found";
    return;
  }
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
  marvelHeroEl.appendChild(videoContainerEl);
};

searchFormEl.addEventListener("submit", formSubmitHandler);

// MODAL FUNCTION
function noResultsModal(
//   openModalSelector,
  modalWrapperSelector,
  modalContentSelector,
  closeModal = false
) {
  //select the elements
//   const openModalBtn = document.querySelector(openModalSelector);
  const modalWrapperElement = document.querySelector(modalWrapperSelector);
  const modalContentElement = document.querySelector(modalContentSelector);

  // style the modal elements
//   openModalBtn.classList.add("open-modal");
  modalWrapperElement.classList.add("modal-wrapper");
  modalContentElement.classList.add("modal-content");

  //open modal onClick (event listener)
//   openModalBtn.addEventListener("click", () => {
    modalWrapperElement.style.display = "block";
//   });

  //add X button to close modal
  if (closeModal) {
    modalContentElement.innerHTML += "<span class='close-modal'>&times;</span>";

    const closeModalBtn = modalContentElement.querySelector(".close-modal");

    closeModalBtn.addEventListener("click", () => {
      modalWrapperElement.style.display = "none";
    });
  }

  //close modal if click outside of the modal
  modalWrapperElement.addEventListener("click", (event) => {
    if (event.target === modalWrapperElement) {
      modalWrapperElement.style.display = "none";
    }
  });
}

// call the modal function
// pass modal classes
// modal("#open-modal", ".modal-wrapper", ".modal-content", true);
