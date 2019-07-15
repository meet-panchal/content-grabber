chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.message == "collect-data"){
        datacollection()
        sendResponse({reply: "Data Collected"});
      }
    });
var urlHTML = `
<div id="main-div" class="float1">
<div class="cust_jumbotron text-center">
    <div class="container">
        <h1 class="display-4 center">Content Grabber!</h1>
        <p class="lead">This extension will grab all the content from the entered URL below.</p>
        <form>
            <div class="form-group">
                <label for="inputURL">Enter URL you wish to grab data</label>
                <input type="url" class="form-control" id="enteredURL" aria-describedby="urlHelp" placeholder="https://url.example.com">
            </div>
        </form>
    </div>
    <button type="button" class="btn btn-dark" id="grab-button">Start the Grab!!</button>
</div>
</div>
`
var overlay = $("body")
//overlay.append(urlHTML)
function datacollection() {
    let images = document.getElementsByTagName("img");
    for (imgList of images) {
        console.log(imgList.src);
    }
    let metaTag = document.getElementsByTagName("meta");
    for (imgList of metaTag) {
        console.log(imgList.name);
    }
}