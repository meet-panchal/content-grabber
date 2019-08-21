/* Listening for popup.js*/
var scrappedData = []
var callback = [];
var myGoogleContent = {
    uiSettings: {},
    load: function () {
        sendMessage({ "command": "getSettings" }, function (dataResponse) {
            myGoogleContent.uiSettings = dataResponse.uiSettings;
            myGoogleContent.addEvents();
            myGoogleContent.extract_first_page_details();
            
        });
    },
    onExtMessage: function (message, sender, sendResponse) {
    myGoogleContent.message = message;
        switch (message.command) {
            case "grab_page_details":
                myGoogleContent.extract_first_page_details()
                break;
        }
    },
    addEvents: function (message, sender, sendResponse) {
        /* $(document).on('click', "", function (e) {
            e.preventDefault();
        }); */

    },
    fireCustomHtmlEvent: function (node, eventName) {
        if (!node) {
            return;
        }
        // Make sure we use the ownerDocument from the provided node to avoid cross-window problems
        var doc;
        if (node.ownerDocument) {
            doc = node.ownerDocument;
        } else if (node.nodeType == 9) {
            // the node may be the document itself, nodeType 9 = DOCUMENT_NODE
            doc = node;
        } else {
            throw new Error("Invalid node passed to fireEvent: " + node.id);
        }

        if (node.dispatchEvent) {
            // Gecko-style approach (now the standard) takes more work
            var eventClass = "";

            // Different events have different event classes.
            // If this switch statement can't map an eventName to an eventClass,
            // the event firing is going to fail.
            switch (eventName) {
                case "click": // Dispatching of 'click' appears to not work correctly in Safari. Use 'mousedown' or 'mouseup' instead.
                case "mousedown":
                case "mouseup":
                    eventClass = "MouseEvents";
                    break;

                case "focus":
                case "change":
                case "blur":
                case "select":
                    eventClass = "HTMLEvents";
                    break;

                default:
                    throw "fireEvent: Couldn't find an event class for event '" + eventName + "'.";
                    break;
            }
            var event = doc.createEvent(eventClass);
            event.initEvent(eventName, true, true); // All events created as bubbling and cancelable.

            event.synthetic = true; // allow detection of synthetic events
            // The second parameter says go ahead with the default action
            node.dispatchEvent(event, true);
        } else if (node.fireEvent) {
            // IE-old school style, you can drop this if you don't need to support IE8 and lower
            var event = doc.createEventObject();
            event.synthetic = true; // allow detection of synthetic events
            node.fireEvent("on" + eventName, event);
        }

    },
    extract_first_page_details: function () {
        sendMessage({ "command": "getSettings" }, function (dataResponse) {
            my.uiSettings = dataResponse.uiSettings;
            var isActivepage = my.uiSettings.isActivepage;
            var scrappedDataGoogle = [];
            if (isActivepage != undefined && isActivepage == true) {
                $(".srg .g").each(function (index) {
                    var searchHeading = $(this).find(".LC20lb").text()
                    var searchURL = $(this).find("cite").text()
                    var searchDescription = $(this).find(".st").text()
                    scrappedDataGoogle.push({
                        Heading: searchHeading,
                        URL: searchURL,
                        Description: searchDescription
                    })
                })
                my.uiSettings.scrappedData.push(scrappedDataGoogle);
                sendMessage({ "command": "saveUISettings", "data": my.uiSettings }, function (dataResponse) {
                    console.log(scrappedData)
                    setTimeout(() => {
                        myGoogleContent.clickToNextPage();
                    }, 6000);
                });

            }
        });

    },
    clickToNextPage: function (params) {
        myGoogleContent.fireCustomHtmlEvent($('tbody td.cur').next().find('a')[0], "click");
    }
};

chrome.runtime.onMessage.addListener(myGoogleContent.onExtMessage);
myGoogleContent.load();
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