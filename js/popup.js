// chrome.runtime.sendMessage({ greeting: "hello" }, function(response) {
//     console.log(response.farewell);
// });

// function goToInbox() {
//     chrome.tabs.getAllInWindow(undefined, function(tabs) {
//         for (var i = 0, tab; tab = tabs[i]; i++) {
//             if (tab.url && isGmailUrl(tab.url)) {
//                 chrome.tabs.update(tab.id, { selected: true });
//                 return;
//             }
//         }
//         chrome.tabs.create({ url: getGmailUrl() });
//     });
// }
// function checkurl() {
//     chrome.tabs.query(url, function() {

//     })
// }

$("#grab-button").click(function() {
    var enteredurl = $("#enteredURL").val()
        // console.log(url)
    chrome.tabs.query({}, function(tabs) {
        for (var i = 0; tab = tabs[i]; i++) {
            if (tab.url == enteredurl) {
                chrome.tabs.highlight({ "tabs": i })

            }
        }
    });
})