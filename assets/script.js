const youtubeApiKey = "AIzaSyAfUF4iIR3SGaR4Zp32vLIHhtUBJH2nPR0";

//youtube API fetch

//create API query params
//triggered by page loading
function getParams() {
  // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
  var searchParamsArr = document.location.search.split("&");

  // Get the query and format values
  //this is words used in the search
  var query = searchParamsArr[0].split("=").pop();
  //this is the format chosen by the user
  var format = searchParamsArr[1].split("=").pop();

  //trigger searchAPI, pass in variables query and format
  searchApi(query, format);
}

//Search API

function searchApi(query, format) {
  //declare the first part of the api url
  var locQueryUrl = "https://apis.google.com/js/client.js";

  //if a format was selected by the user, then add the format to the url
  if (format) {
    locQueryUrl = "https://www.loc.gov/" + format + "/?fo=json";
  }
  // add the query term to the concatenated url
  locQueryUrl = locQueryUrl + "&q=" + query;

  //fetch the concatenated url
  fetch(locQueryUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      //if response ok, return json data
      return response.json();
    })
    // the returned data?
    .then(function (locRes) {
      // write query to page so user knows what they are viewing
      //add retrieved data to the resultTextEl element h2 heading
      resultTextEl.textContent = locRes.search.query;
      //then log it
      console.log(locRes);
      // if there are no results, log no results found heading in the resultContentEl div
      if (!locRes.results.length) {
        console.log("No results found!");
        resultContentEl.innerHTML = "<h3>No results found, search again!</h3>";
      } else {
        //otherwise add loop through retrieved records, printing out each retrieved record into the resultContentEl div using
        // 3.third function PrintResults
        resultContentEl.textContent = "";
        for (var i = 0; i < locRes.results.length; i++) {
          printResults(locRes.results[i]);
        }
      }
    })
    //show error if something earlier in function goes wrong
    .catch(function (error) {
      console.error(error);
    });
}

getParams();

//////////////////////////////

function searchByKeyword() {
  var results = YouTube.Search.list("id.snippet", {
    //q is the query string
    q: "spider-man",
    //5 results per page
    maxResults: 5,
  });
  results.items.forEach(function (item) {
    console.log("[%s] Title: %s", item.id.videoId, item.snippet.title);
  });
}


https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=spider-man&type=video&key=AIzaSyAfUF4iIR3SGaR4Zp32vLIHhtUBJH2nPR0