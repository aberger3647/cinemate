var apiKeyTmdb = "3c52eb6185be360b0965e24023804a4d";
var apiKeyYt = "AIzaSyCxcfePxYwFPi4vIK2xuiRgLTDvmgYCDrY";
var currentDay = (moment().format("DD-MM-YYYY"));
var globalVideoId 
//console.log(currentDay)


function handleDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

window.onclick = function (event) {
  if (event.target.matches(".genre-type0"))
    var genreSelect = $(".genre-type0").attr("id");
  else if (event.target.matches(".genre-type1"))
    var genreSelect = $(".genre-type1").attr("id");
  else if (event.target.matches(".genre-type2"))
    var genreSelect = $(".genre-type2").attr("id");
  else if (event.target.matches(".genre-type3"))
    var genreSelect = $(".genre-type3").attr("id");
  else if (event.target.matches(".genre-type4"))
    var genreSelect = $(".genre-type4").attr("id");
  else if (event.target.matches(".genre-type5"))
    var genreSelect = $(".genre-type5").attr("id");
  else if (event.target.matches(".genre-type6"))
    var genreSelect = $(".genre-type6").attr("id");
  else if (event.target.matches(".genre-type7"))
    var genreSelect = $(".genre-type7").attr("id");
  else if (event.target.matches(".genre-type8"))
    var genreSelect = $(".genre-type8").attr("id");
  else if (event.target.matches(".genre-type9"))
    var genreSelect = $(".genre-type9").attr("id");
  else {
    return
  }


  fetch (
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKeyTmdb}&language=en-US&include_adult=false&with_genres=${genreSelect}`
  )
    .then((response) => response.json())
    .then(function (data) {
      //console.log(data);

      var movieTitle = $("#movieTitle");
      var releaseDate = $("#releaseDate");
      var movieRating = $("#movieRating");
      var movieOverview = $("#movieOverview");

      movieTitle.text(data.results[0].title);
      releaseDate.text(data.results[0].release_date);
      movieRating.text(data.results[0].vote_average / 2);
      movieOverview.text(data.results[0].overview);

      var youtubeSearch = (data.results[0].title);

      //youtube stuff
      fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${youtubeSearch}trailer&key=${apiKeyYt}`)
        .then(response => response.json())
        .then(function (data) {
          localVideoId = (data.items[0].id.videoId)

          globalVideoId = localVideoId

          // console.log(localVideoId)
        }) 
     });
};

console.log(globalVideoId)
//IFrame YouTube video player

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  
  player = new YT.Player('player', {
    height: '300',
    width: '560',
    videoId: 'M7lc1UVf-VE',
    playerVars: {
      'playsinline': 1
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    } 
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}

// My List modal

var modal = document.getElementById("my-list");
var myListBtn = document.getElementById("my-list-btn");
var returnToResults = document.getElementById("return-to-results");

var openModal = function () {
  modal.classList.remove("hidden");
};

myListBtn.addEventListener("click", openModal);

var closeModal = function () {
  modal.classList.add("hidden");
}

returnToResults.addEventListener("click", closeModal)