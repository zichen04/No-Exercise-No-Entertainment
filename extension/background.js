let timeWatched = 0;
let minutes = 0;

// listens for message from content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "triggerOpenCV") {
        // start python code 
    }
});
