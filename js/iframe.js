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
})