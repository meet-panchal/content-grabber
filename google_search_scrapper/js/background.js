var version = "2.0";
var uiSettings = {
    isActivepage:false,
    scrappedData:[]
};

var myApp = {
    search_change: false,
    onExtMessage: function (message, sender, sendResponse) {
        myApp.message = message;
        switch (message.command) {
            case "saveUISettings":
                uiSettings = message.data;
                myApp.saveUISettings(message.data, sender, sendResponse);
                break;
            case "console_logs_myApp":
                console_logs_myApp(message.title, message.msg);
                break;
            case "getSettings":
                if (message.callback == "yes") {
                    sendResponse({
                        "uiSettings": uiSettings
                    });
                } else {
                    sendMessage(sender, {
                        "command": "rec_getSettings",
                        "data": {
                            "uiSettings": uiSettings
                        }
                    });
                }
                break;
        }
        return true;
    },
    load: function () {
        myApp.initStorage();
    },
    initStorage: function (_sender) {
        var storedVersion = localStorage["version"];
        if (storedVersion != version) {
            localStorage["version"] = version;
            localStorage['uiSettings'] = JSON.stringify(uiSettings);
        }
        uiSettings = JSON.parse(localStorage["uiSettings"]);
    },
    saveUISettings: function (data, _sender, sendResponse) {
        localStorage["uiSettings"] = JSON.stringify(uiSettings);
        if (typeof (sendResponse) == "function") {
            sendResponse({ uiSettings: uiSettings });
        }
    }
};

chrome.runtime.onMessage.addListener(myApp.onExtMessage);
myApp.load();

function sendMessage(tabId, msg) {
    if (tabId) chrome.tabs.sendMessage(tabId, msg);
    else chrome.runtime.sendMessage(sender.id, msg);
}

var console_logs_myApp = function (title, msg) {
    console.log("%c " + title, "font-weight: bold");
    if (typeof (msg) == "object") {
        console.log("%c " + JSON.stringify(msg), 'color:#ce3e3e');
    } else {
        console.log("%c " + msg, 'color:#ce3e3e');
    }
};
