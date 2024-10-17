import detect
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

def runAll():
    blockInputs(True)

    if (detect.detectPushup()):
        print("good job!")
        blockInputs(False)

    else:
        killChrome()


detect.detectPushup()