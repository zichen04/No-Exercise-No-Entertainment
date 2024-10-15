let timeWatched = 0;
let minutes = 0;
let isPlaying = false;
let intervalId = null;

const videoPlayer = document.querySelector('video');
document.requestStorageAccess();

// starts the tracking
function startTracking() {
    if (!intervalId) {
        intervalId = setInterval(() => {
            timeWatched += 1; 
            
            // increment minutes if needed
            if (timeWatched == 60) {
                timeWatched = 0;
                minutes++;
                console.log("seconds watched");
                console.log(timeWatched);
            }
            
            // checks if watchtime exceeds 10 minutes
            if (minutes == 10) {
                minutes = 0;
                // do stuff for starting the python opencv code
            }

            chrome.storage.local.set({'minutes': minutes});

        }, 1000); // check if youtube is playing every second, and adds 1 seconds to counter
    }
}

// stops tracking
function stopTracking() {
    clearInterval(intervalId);
    intervalId = null;
}


if (videoPlayer && !videoPlayer.paused) {
    isPlaying = true;
    startTracking();
}


// listens for video playing
videoPlayer.addEventListener('play', () => {
    if (!isPlaying) {
        isPlaying = true;
        startTracking();
    }
});
  

// listens for pausing of video
videoPlayer.addEventListener('pause', () => {
    if (isPlaying) {
        isPlaying = false;
        stopTracking();
    }
});
  