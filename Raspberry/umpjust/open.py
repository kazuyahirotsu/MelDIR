
import time
import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BCM)

channel_1 = 27
channel_2 = 23

channels = [channel_1, channel_2]

# GPIO.setup(channel, GPIO.OUT)
GPIO.setup(channels, GPIO.OUT)

#print("channel22 ON")
GPIO.output(channel_2, GPIO.HIGH) # True , 1 も同義
time.sleep(0.1)
GPIO.output(channel_2, GPIO.LOW) # False, 0 も同義
#print("channel22 OFF")


GPIO.cleanup()
print("open")
# GPIO.cleanup(channel)
