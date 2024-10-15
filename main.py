import detect
import youtube
import ctypes
import os


# Block input (True = block, False = unblock)
def blockInputs(block):
    ctypes.windll.user32.BlockInput (block)

def killChrome():
    try:
        os.system('tskill chrome')
    except:
        print("Chrome is already closed")


def main():
    minutes = 0

    while True:     
        
        if (youtube.isTimeUp()):
            blockInputs(True)

            if (detect.detectPushup()):
                print("good job!")
                blockInputs(False)

            else:
                killChrome()
