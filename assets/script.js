var searchFormEl = document.querySelector("#search-form");
var queryEl = document.querySelector("#query-name");
var marvelHeroEl = document.querySelector("#marvel-hero-body");

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
  //call youTube API here using foundHero
  console.log("foundHero", foundHero);
};

searchFormEl.addEventListener("submit", formSubmitHandler);
