function statusChecker() {
    var request = new XMLHttpRequest();
    request.open("GET", "https://api.twitch.tv/kraken/streams/angelskimi", true);

    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            var twitchAPI = JSON.parse(request.responseText);
            var online = twitchAPI.stream !== null ? true : false;
            var portrait = document.getElementById("kimi_angel");

            if (online) {
                document.getElementById("kimi-status").innerHTML = "AngelsKimi is Live!";
                portrait.src = "../img/kimi_angel.png";
                document.getElementById('preview').style.backgroundImage = "url('https://static-cdn.jtvnw.net/previews-ttv/live_user_angelskimi-640x360.jpg')";

            } else {
                document.getElementById("kimi-status").innerHTML = "AngelsKimi is Offline!";
                portrait.src = "../img/Kimi_angel_sad.png";
                document.getElementById("preview").style.backgroundImage = "url('../img/background/offline_preview.jpg')";
            }
        }
    };
    request.send();
}

document.addEventListener('DOMContentLoaded', function() {
  var offset;
  var currentDate = new Date();
  var junOffset = new Date(currentDate.getFullYear(), 6, 1).getTimezoneOffset();

  if (currentDate.getTimezoneOffset() == junOffset)
      offset = -7;
  else
      offset = -8;

  var LADate = new Date( new Date().getTime() + offset * 3600 * 1000).toUTCString().replace( / GMT$/, "" );
  var LADateArray = LADate.split(" ");
  var LATime = LADateArray[4];

  if((LATime >= "16:00:00") && (LATime <= "20:30:00")){
    setInterval(statusChecker,25000);
    statusChecker();
  } else{
    setInterval(statusChecker,60000);
    statusChecker();
  }
});
