let x = 1;
//jess test

let y = 2;

//call init function on submit
$(function () {
  $("form").on("submit", function (e) {
    e.preventDefault();
    //prepare for youtube API
    var request = gapi.client.youtube.search.list({
      //parameters
      part: "snippet",
      type: "video",
      q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
      maxResults: 3,
      order: "viewCount",
      publishedAfter: "2020-01-01T00:00:00Z"
    });
    //execute the request
    request.execute(function(response){
        console.log("response: ", response);
    });
  });
});

//testing youtube
function init() {
  gapi.client.setApiKey("AIzaSyAfUF4iIR3SGaR4Zp32vLIHhtUBJH2nPR0");
  gapi.client.load("youtube", "v3", function () {
    //youTube api is ready
  });
}
