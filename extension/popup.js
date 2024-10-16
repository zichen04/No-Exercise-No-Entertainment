
setInterval(() => {
    chrome.storage.local.get(['minutes'], (result) => {
        let minutes = result.minutes || 0;
        document.getElementById('minutesWatched').textContent = `minutes watched: ${minutes}`;
    });
}, 1000);