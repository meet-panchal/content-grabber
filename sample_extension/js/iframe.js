var urlfound = false
$("#grab-button-iframe").click(function() {
    var enteredurl = $("#enteredURL-iframe").val()
    chrome.tabs.query({}, function(tabs) {
        for (var i = 0; tab = tabs[i]; i++) {
            if (tab.url == enteredurl) {
                chrome.tabs.highlight({ "tabs": i })
                urlfound = true
            }
        }
        if (!urlfound) {
            chrome.tabs.create({ "url": enteredurl, "active": true })
        }
    });
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { message: "collect-data-from-popup" }, function(response) {
            console.log(response);
            localStorage['data'] = JSON.stringify(response.data)
            localStorage['host'] = JSON.stringify(response.host)
            window.location = chrome.runtime.getURL("html/table.html");
        });
    });
})