import detect
import ctypes
import os
from flask import Flask

app = Flask(__name__)
 
# block inputs (True = block, False = unblock)
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




@app.route('/text', methods=['GET'])
def test():
    runAll()
    return(" done!")

if __name__ == '__main__':
    app.run(port=5000)

