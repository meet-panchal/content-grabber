/* Listening for popup.js*/
var callback = [];
var myGooglePopup = {
    uiSettings: {},
    load: function () {
        sendMessage({ "command": "getSettings" }, function (dataResponse) {
            myGooglePopup.uiSettings = dataResponse.uiSettings;
            myGooglePopup.addEvents();
        });
    },
    onExtMessage: function (message, sender, sendResponse) {
    },
    addEvents: function (message, sender, sendResponse) {
        $("#search-button").click(() => {
            let inputValue = $("#keyword").val()
            chrome.tabs.create({ "url": `https://www.google.com/search?q=${inputValue}`, "active": true })
        })

        $("#grab-button").click(() => {
            sendMessage({ "command": "getSettings" }, function (dataResponse) {
                myGooglePopup.uiSettings = dataResponse.uiSettings;
                myGooglePopup.uiSettings.isActivepage=true;
                sendMessage({ "command": "saveUISettings", "data": myGooglePopup.uiSettings }, function (dataResponse) {
                    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, { command: "grab_page_details", }, function (response) {
                        });
                    });
                });
                
            });


        })

    },
    extract_first_page_details: function () {

    }
};

chrome.runtime.onMessage.addListener(myGooglePopup.onExtMessage);
myGooglePopup.load();
$(document).ready(function () {
    setTimeout(function () {

    }, 2000);
});

function sendMessage(msg, callbackfn) {
    if (callbackfn != null) {
        callback.push(callbackfn);
        msg.callback = "yes";
    }
    chrome.runtime.sendMessage(msg, callbackfn);
}

function console_logs_myApp(title, msg) {
    sendMessage({ "command": "console_logs_myApp", 'title': title, 'msg': msg }, function (Data) {
    });
}
