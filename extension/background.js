let minutes = 0;

// listener for messages from content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'updateMinutes') {
        minutes = message.minutes;

        console.log(`Received minutes: ${minutes}`);

        if (minutes >= 10) {
            // do opencv stuff
            console.log("10 minutes reached");
            minutes = 0;

            // save minutes to storage
            chrome.storage.local.set({'minutes': minutes}, () => {
                console.log(`minutes: ${minutes}`);
            });
        } else {
            // save minutes to storage
            chrome.storage.local.set({'minutes': minutes}, () => {
                console.log(`minutes: ${minutes}`);
            });
        }
    }
})