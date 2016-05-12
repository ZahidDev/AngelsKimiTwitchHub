var isNotified = false;

var offset;
var currentDate = new Date();
var junOffset = new Date(currentDate.getFullYear(), 6, 1).getTimezoneOffset();

if (currentDate.getTimezoneOffset() == junOffset)
    offset = -7;
else
    offset = -8;

var LADate = new Date(new Date().getTime() + offset * 3600 * 1000).toUTCString().replace(/ GMT$/, "");
var LADateArray = LADate.split(" ");
var LATime = LADateArray[4];

if ((LATime >= "16:00:00") && (LATime <= "20:30:00")) {
    setInterval(statusChecker, 25000);
    statusChecker();
} else {
    setInterval(statusChecker, 60000);
    statusChecker();
}

function statusChecker() {
    var request = new XMLHttpRequest();
    request.open("GET", "https://api.twitch.tv/kraken/streams/angelskimi", true);

    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            var twitchAPI = JSON.parse(request.responseText);
            var online = twitchAPI.stream !== null ? true : false;

            if (online) {
                if (!isNotified) {
                    isNotified = true;
                    notification();
                }
                chrome.browserAction.setIcon({
                    path: "../img/icons/kimi_on_19.png"
                });
                chrome.browserAction.setTitle({
                    title: "AngelsKimi is Live!"
                });
            } else {
                isNotified = false;
                chrome.browserAction.setIcon({
                    path: "../img/icons/kimi_off_19.png"
                });
                chrome.browserAction.setTitle({
                    title: "Angelskimi is Offline!"
                });
            }
        }
    };
    request.send();
}

function notification() {
    var options = {
        "type": "basic",
        "iconUrl": "../img/icons/icon_128.png",
        "title": "AngelsKimi Stream Status",
        "message": "AngelsKimi is now ONLINE!",
        "buttons": [{
            "title": "Go to AngelsKimi's stream!",
            "iconUrl": "../img/social/twitch.png"
        }],
        "isClickable": false,
        "requireInteraction": true,
    };

    chrome.notifications.create("kimiStream", options, function(notificationId) {});
}

chrome.notifications.onButtonClicked.addListener(function(notificationId) {
    chrome.tabs.create({
        url: "https://www.twitch.tv/angelskimi"
    });
    chrome.notifications.clear(notificationId);
});
