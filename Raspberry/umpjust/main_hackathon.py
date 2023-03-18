from meldir_servo_hackathon import meldir
import cv2
import time
from threading import Thread
# import ipdb; ipdb.set_trace()

#init_setting
cv2.namedWindow("hmap")
mld = meldir()

mld.SPI_OPEN()
#Prepare Write Data
startup = mld.STUPMDL()
mld.SET_USER()
shutter_frame=mld.SHUTTER()
mld.FRAME_WAIT()
mld.FRAME_READ()
#Startup befrore OTP write
STUP=list(mld.SPI_RW(startup))
time.sleep(1)

# sample capture
mld.dacset()
for i in range(10):
    pixdata = mld.frame()
mld.shutter(shutter_frame)
for i in range(10):
    pixdata = mld.frame()

# servo control
thread1 = Thread( target=mld.servo_ctrl)
# capture hmap
thread2 = Thread( target=mld.cont_frame)
thread1.start()
thread2.start()

# hmap window
while(True):
    cv2.imshow("hmap", mld.imshowmat)
    if cv2.waitKey(1) == 27 or mld.FIN_FLAG == True:
        break

thread1.join()
thread2.join()

cv2.destroyAllWindows()
mld.SPI_CLOSE()
mld.terminate_module()
