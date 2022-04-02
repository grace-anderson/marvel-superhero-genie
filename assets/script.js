
var searchFormEl = document.querySelector("#search-form");
var queryEl = document.querySelector("#query-name");
var marvelHeroEl = document.querySelector("#marvel-hero-body");
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
        hero + "&apikey=01f7cfc9bdb8d6b74631203dbb7e8ccc" + "&ts=" + ts + "&hash=" + passhash +
        "&limit=1";


    console.log(requestUrl)
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
                var heroVideoId = data.items[0].id.videoId;
                console.log("hero's video id", heroVideoId);
                //pass heroVideoID to video url and display video
                displayHeroVideo(heroVideoId);
            } else if (videoHeroSearch === undefined) {
                marvelHeroEl.textContent = "Sorry no hero video found";
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
    //   var heroVideoUrl = "https://www.youtube.com/watch?v=" + heroVideoId;
    var heroVideoUrl = "https://www.youtube.com/embed/" + heroVideoId;
    console.log("video link for hero video: ", heroVideoUrl);
  
    //append elements to display video
    var videoContainerEl = document.createElement("div");
    videoContainerEl.classList.add("video-container");
  
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

