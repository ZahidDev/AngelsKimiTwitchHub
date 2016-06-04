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
    setInterval(statusChecker,30000);
    statusChecker();
});
