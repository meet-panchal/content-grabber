chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.message == "collect-data-from-extension") {
            datacollection()
            sendResponse({ reply: "Data Collected" });
        }
    });
var ifrmae_url = chrome.runtime.getURL("html/iframe.html");
var html = `
<iframe src="${ifrmae_url}" class="float1">
</iframe>
`
var isEmpty = 1;
var website_details_arr = []
var uiSettings = {
    json_data: { "website_details": website_details_arr },
    isEmpty: false
};
var images_arr = []
var meta_arr = []
var anchor_arr = []


var overlay = $("body")
    // overlay.prepend(html)
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function datacollection() {
    let images = document.getElementsByTagName("img");
    for (imgList of images) {
        images_arr.push(imgList.src)
    }
    let metaTag = document.getElementsByTagName("meta");
    for (tagList of metaTag) {
        meta_arr.push(tagList.content)
    }

    let title = window.location.host
    console.log(images_arr);
    console.log(meta_arr);
    website_details_arr.push({
        [title]: {
            "image": images_arr,
            "meta": meta_arr
        }
    })
}