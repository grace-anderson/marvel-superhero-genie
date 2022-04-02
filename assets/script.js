var searchFormEl = document.querySelector("#search-form");
var queryEl = document.querySelector("#query-name");
var marvelHeroEl = document.querySelector("#marvel-hero-body");
//youTube API variables
const youTubeApiKey = "AIzaSyAfUF4iIR3SGaR4Zp32vLIHhtUBJH2nPR0";
const youTubeMaxResults = "1";

var formSubmitHandler = function (event) {
  event.preventDefault();

  var heroName = queryEl.value.trim();
  console.log(heroName);

  if (heroName) {
    console.log("hi");
    getHeroRepos(heroName);
    //Enter Classes for this element
    marvelHeroEl.classList = "";
  } else {
    marvelHeroEl.textContent = "Please enter a name or letter";
  }
};

var getHeroRepos = function (hero) {
  var requestUrl =
    "https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=" +
    hero +
    "&limit=1&apikey=01f7cfc9bdb8d6b74631203dbb7e8ccc";

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
      }
    });
  });
};

var displayHero = function (foundHero) {
  if (foundHero.length === 0) {
    marvelHeroEl.textContent = "No hero found";
    return;
  }
  marvelHeroEl.textContent = "Showing results for " + foundHero;

  //call youTube search API 
  getYouTubeVideo(foundHero);
  console.log("foundHero", foundHero);
};

//search for youTube video data using hero search term, return data for one video
var getYouTubeVideo = function (foundHero) {
  var videoHero = foundHero;
  console.log("videoHero", videoHero);

  var videoRequestUrl =
    "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=" +
    youTubeMaxResults +
    "&q=" +
    videoHero +
    "&type=video&key=" +
    youTubeApiKey;

  // calling the youTube API to search for one video with search word "videoHero"
  fetch(videoRequestUrl).then(function (response) {
    response.json().then(function (data) {
      var videoHeroSearch = data;
      console.log("videoHeroSearch - data", videoHeroSearch);

      if (videoHeroSearch) {
        var heroVideoId = data.items.id.videoId;
        console.log("hero's video id", heroVideoId);
        //pass heroVideoID to video url and display video
        displayHeroVideo(heroVideoId);
      } else if (videoHeroSearch === undefined) {
        marvelHeroEl.textContent = "Sorry no hero video found";
      }
    });
  });
};

//create the hero video url
var createHeroVideoUrl = function (heroVideoID) {
  var heroVideoUrl = "https://www.youtube.com/watch?v=" + heroVideoID;
  console.log("video link for hero video: ", heroVideoUrl)
  return heroVideoUrl
};

//display the hero video
var displayHeroVideo = function (heroVideoId) {
  if (heroVideoId.length === 0) {
    marvelHeroEl.textContent = "No video found";
    return;
  }
  //create url for hero video
  var heroVideoUrl = "https://www.youtube.com/watch?v=" + heroVideoId;
  console.log("video link for hero video: ", heroVideoUrl)
  marvelHeroEl.textContent = "Showing video for " + foundHero;
};


searchFormEl.addEventListener("submit", formSubmitHandler);
