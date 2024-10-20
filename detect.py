import cv2
import cv2.legacy

def detectPushup() -> bool:
    state = "up"
    nums = 0
    isFirst = True
    initialYPos = 0

    # create the input stream from the webcam, 0 refers to default video capture device
    webcamIn = cv2.VideoCapture(0)
    webcamIn.set(cv2.CAP_PROP_FPS, 24)

    if not webcamIn.isOpened():
        print("Could not open webcam")
        return 10

    ret, frame = webcamIn.read()

    # create a bounding box and intialize a KCF tracker object
    bbox = (180, 250, 450, 200)
    boxCenter = (int(bbox[0] + 0.5*bbox[2]), int(bbox[1] + 0.5*bbox[3]))    # center of the bounding box

    trackPerson = cv2.legacy.TrackerKCF.create()
    
    trackPerson.init(frame, bbox)
    
    # give the user 10 seconds to get into position
    for i in range(10): 
        frame[:] = 0
        cv2.putText(frame, str(10 - i), (320, 240), cv2.FONT_HERSHEY_DUPLEX, 0.75, (0, 0, 255), 2)
        cv2.imshow("Tracking", frame)
        cv2.waitKey(1000)

    while True:

        ret, frame = webcamIn.read()

        # update the tracker with new frame
        success, bbox = trackPerson.update(frame)


        if nums == 10:
            return True


        if success:
            # draw the bounding box
            x, y, w, h = [int(v) for v in bbox]
            boxCenter = (int(x + 0.5*w), int(y + 0.5*h))

            # if its the very first frame, take the initial center position of that and store it
            if isFirst:
                initialYPos = boxCenter[1]
                isFirst = False

            # use initial center position to count pushups
            else:                                                                   
                if state == "up" and boxCenter[1] > initialYPos + 25:
                    state = "down"
                elif state == "down" and boxCenter[1] < initialYPos + 7:
                    state = "up"
                    nums += 1

            cv2.putText(frame, "pushups count: " + str(nums), (20, 100), cv2.FONT_HERSHEY_DUPLEX, 0.75, (0, 0, 255), 2) # number of pushups done
            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)  # rectangle around object being tracked
            cv2.circle(frame, boxCenter, 2, (0, 0, 255), 2)  # point at center

            boxCenter = (x + 0.5*w, y + 0.5*h)

        # display the frame
        cv2.imshow("Tracking", frame)

            
        #escape from program with E
        if cv2.waitKey(1) & 0xFF == ord('e'):
            break

    webcamIn.release()
    cv2.destroyAllWindows()
    
    return False


