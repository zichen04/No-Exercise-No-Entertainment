let timeWatched = 0;
let minutes = 0;
let isPlaying = false;

// Checks every second until a video player is found
let intervalId = setInterval(() => {
    const videoPlayer = document.querySelector('video');
    if (videoPlayer) {
        console.log("video player found successfuly");
        startTracking(videoPlayer);
        clearInterval(intervalId);
    }
}, 1000);

// tracks how long you've beenw atching for
function startTracking(videoPlayer) {
    let trackingInterval = setInterval(() => {
        timeWatched += 1;

        if (timeWatched === 60) {
            timeWatched = 0;
            minutes++;

            // update minutes, send message to background.js
            chrome.runtime.sendMessage({ action: 'updateMinutes', minutes: minutes });
        }

    }, 1000);

    // event listener for when video is played
    videoPlayer.addEventListener('play', () => {
        if (!isPlaying) {
            isPlaying = true;
        }
    });

    // event listener for when video is paused
    videoPlayer.addEventListener('pause', () => {
        if (isPlaying) {
            isPlaying = false;
        }
    });
}
