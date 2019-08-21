// // A $( document ).ready() block.
// $(document).ready(function() {
//     function datacollection() {
//         chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//             chrome.tabs.sendMessage(tabs[0].id, { message: "collect-data-from-extensionbg" }, function(response) {
//                 console.log(response.reply);
//             });
//         });
//     }
// });
// function datacollection() {
//     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//         chrome.tabs.sendMessage(tabs[0].id, { message: "collect-data-from-extensionbg" }, function(response) {});
//     });
// }

// setTimeout(function() {
//     datacollection();
// }, 3000)
// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//         console.log(sender.tab ?
//             "from a content script:" + sender.tab.url :
//             "from the extension");
//         if (request.message == "collect-data-from-extension") {
//             datacollection()
//         }
//     }
// );