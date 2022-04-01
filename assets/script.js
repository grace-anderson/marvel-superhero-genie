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
  //call youTube search API here using foundHero
  console.log("foundHero", foundHero);
  getYouTubeVideo(foundHero);
};

//search for youTube videos with hero search term, return one video
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

  // calling the youTube API to search for 1 video with search word "videoHero"
  fetch(videoRequestUrl).then(function (response) {
    response.json().then(function (data) {
      var videoHeroSearch = data;
      console.log("videoHeroSearch - data", videoHeroSearch);

      // if (heroSearch) {
      //   var foundHero = heroSearch.name;
      //   console.log(
      //     "the variable for the hero name " + foundHero + " is foundHero"
      //   );
      //   displayHero(foundHero);
      // } else if (heroSearch === undefined) {
      //   marvelHeroEl.textContent = "Sorry no heroes found";
      // }
    });
  });
};

searchFormEl.addEventListener("submit", formSubmitHandler);
