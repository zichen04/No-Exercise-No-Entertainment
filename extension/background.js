let minutes = 0;

// listener for messages from content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'updateMinutes') {
        minutes = message.minutes;

        console.log(`Received minutes: ${minutes}`);

        if (minutes == 10) {
            
            callPythonScript();

            console.log("10 minutes reached");
            minutes = 0;

            // save minutes to storage
            chrome.storage.local.set({'minutes': minutes}, () => {
                console.log(`minutes: ${minutes}`);
            });
        } else {
            minutes++;
            // save minutes to storage
            chrome.storage.local.set({'minutes': minutes}, () => {
                console.log(`minutes: ${minutes}`);
            });
        }
    }
});



function callPythonScript() {
    fetch('http://localhost:5000/text', {
        method: 'GET'
    })
    .then(response => response.text())
    .then(data => {
        console.log("Response from Python script:", data);
    })
    .catch(error => {
        console.error('Error calling the Python script:', error);
    });
}