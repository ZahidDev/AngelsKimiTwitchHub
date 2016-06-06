chrome.storage.local.set({
    'isNotified': false
});

setInterval(statusChecker, 30000);
statusChecker();

function statusChecker() {
    var isNotified;
    chrome.storage.local.get("isNotified", function(val) {
        isNotified = val.isNotified;
    });
    var request = new XMLHttpRequest();
    request.open("GET", "https://api.twitch.tv/kraken/streams/angelskimi", true);

    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            var twitchAPI = JSON.parse(request.responseText);
            var online = twitchAPI.stream !== null ? true : false;
            if (online) {
                if (!isNotified) {
                    chrome.storage.local.set({
                        "isNotified": true
                    });
                    notification();
                }
                chrome.browserAction.setIcon({
                    path: "../img/icons/kimi_on_19.png"
                });
                chrome.browserAction.setTitle({
                    title: "AngelsKimi is Live!"
                });
            } else {
                chrome.storage.local.set({
                    "isNotified": false
                });
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
