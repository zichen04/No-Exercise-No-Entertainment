# No Exercise No Entertainment

I've been lacking in the exercise department. So I came up with this project, the idea is that this program will detect when i have a youtube video playing. And every 10 minutes it will pause my video and freeze my mouse and keyboard input (so i can't unpause). My inputs will be frozen until 10 pushups are done.

The idea originally started as "homeworkout" as in, homework workout. Instead of youtube, I was going to make myself do pushups while I was doing homework. However I realized this was a bad idea, because I would end up putting off both homework and exercise.
<br />
<br />
<br />

**As for the pushup detection algorithm.** I am using OpenCV and the built in KCF tracking to track my person. Originally, I was trying to create my own tracking algorithm with mask and contours. However countours would often track things I didn't want tracked, like it would track my shadow. So I read into the tracking algorithms available in the openCV library and felt KCF tracking was the best for my use case. This was an article that helped a lot -> https://broutonlab.com/blog/opencv-object-tracking/

Here is a video demo of pushup tracking (redirect to youtube): [![Watch the video](https://img.youtube.com/vi/bSQHON3_J4s/maxresdefault.jpg)](https://www.youtube.com/watch?v=bSQHON3_J4s)


<br />
<br />
<br />

**For detecting whether or not youtube is playing a video.**  I created a chrome extension which keeps track of how long you've been watching for. Previously I tried to use easyocr library with python, however that implementation had significant drawbacks. It was taking a frames from the display, and checking if there is a youtube . com / watch, and it also checks for if a certain threshold of movement on the screen. So it didn't work if the youtube video is fullscreened, and also if it was a video with not a lot of movement on screen.

<br /> 

The Chrome extension keeps track of how long the user has watched youtube for.

![image](https://github.com/user-attachments/assets/76aae451-9952-41d5-9ae6-62a20cc1c5f0)

<br />

Every 10 minutes, the extension communicates to the python code via a Flask local server. Inputs are frozen and the pushup detection is triggered.

<br />

**To run this**

go to chrome://extensions/ and load unpacked, choose the "extensions" folder 

Make sure that you run command prompt as administrator, and run the main.py file.
