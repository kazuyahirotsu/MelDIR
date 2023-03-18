from meldir_servo_hackathon import meldir
import cv2
import time
from threading import Thread
import matplotlib.pyplot as plt
import numpy as np
import threading
import datetime
# import ipdb; ipdb.set_trace()

class InputThread(threading.Thread):
    def __init__(self):
        super(InputThread, self).__init__()
        self.daemon = True
        self.last_user_input = None

    def run(self):
        while True:
            self.last_user_input = input('input something: ')

it = InputThread()
it.start()

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

# calc crop_area
crop_area = [1, 2, 3, 4]

# hmap window
mean1 = []
mean2 = []
mean3 = []
mean4 = []
existence = [None, None, None, None]
start_datetime = [None, None, None, None]
start_time = [None, None, None, None]
priority = [None, None, None, None]
wait_time = [None, None, None, None]
while(True):
    # input format is 1p, ・・・4p, or 1s, ・・・4s
    # p mean put and s mean serve
    inp = it.last_user_input
    if inp:
        id = int(inp[0]) - 1
        if inp[1] == 'p':
            existence[id] = 1
            start_datetime[id] = datetime.datetime.now()
            start_time[id] = time.time()
            priority[id] = 4 - existence.count(None)
        if inp[1] == 's':
            existence[id] = None
            start_datetime[id] = None
            start_time[id] = None
            wait_time[id] = None
            priority[id] = None
    # calc mean temp
    area1 = []
    area2 = []
    area3 = []
    area4 = []

    mask = np.zeros((60, 80, 3))
    centers = [(15, 20), (45, 20), (15, 60), (45, 60)]
    for c in centers:
        cv2.circle(mask,
            center=c,
            radius=15,
            color=(255, 255, 255),
            thickness=-1,
            lineType=cv2.LINE_4,
            shift=0)

    for i in range(60):
        for j in range(80):
            if np.all(mask[i][j] == 255):
                if 0 <= i < 30 and 0 <= j < 40:
                    area1.append(mld.imshowmat[i][j])
                if 0 <= i < 30 and 40 <= j < 80:
                    area2.append(mld.imshowmat[i][j])
                if 30 <= i < 60 and 0 <= j < 40:
                    area3.append(mld.imshowmat[i][j])
                if 30 <= i < 60 and 40 <= j < 80:
                    area4.append(mld.imshowmat[i][j])
    if len(mean1) == 0:
        init1 = sum(area1) / len(area1)
        mean1.append(sum(area1) / len(area1))
    if len(mean2) == 0:
        init2 = sum(area2) / len(area2)
        mean2.append(sum(area2) / len(area2))
    if len(mean3) == 0:
        init3 = sum(area3) / len(area3)
        mean3.append(sum(area3) / len(area3))
    if len(mean4) == 0:
        init4 = sum(area4) / len(area4)
        mean4.append(sum(area4) / len(area4))
    mean1.append(sum(area1) / len(area1))
    mean2.append(sum(area2) / len(area2))
    mean3.append(sum(area3) / len(area3))
    mean4.append(sum(area4) / len(area4))
    
    if len(mean1) == 2:
        d1 = (mean1[1] - mean1[0]) / init1 * 100
    else:
        d1 = None
    if len(mean2) == 2:
        d2 = (mean2[1] - mean2[0]) / init2 * 100
    else:
        d2 = None
    if len(mean3) == 2:
        d3 = (mean3[1] - mean3[0]) / init3 * 100
    else:
        d3 = None
    if len(mean4) == 2:
        d4 = (mean4[1] - mean4[0]) / init4 * 100
    else:
        d4 = None
    delta = [d1, d2, d3, d4]
    mean1.pop(0)
    mean2.pop(0)
    mean3.pop(0)
    mean4.pop(0)
    
    for i in range(len(existence)):
        if not existence[i]:
            delta[i] = None
            if i == 0:
                mean1 = []
            if i == 1:
                mean2 = []
            if i == 2:
                mean3 = []
            if i == 3:
                mean4 = []

    for i in range(len(start_time)):
        if start_time[i]:
           wait_time[i] = time.time() - start_time[i]
    
    nums = []
    idx = []
    for i in range(len(delta)):
        if delta[i] != None:
            nums.append(delta[i])
            idx.append(i)
    n_num=np.array(nums)
    sort_idx = n_num.argsort()[::-1]
    for i in range(len(idx)):
        priority[idx[i]] = sort_idx[i] + 1
    print('---------------------------')
    print('crop_area:', crop_area)
    print('priority:', priority)
    print('start_datetime:', start_datetime)
    print('existence:', existence)
    print('wait_time:', wait_time)
    print('delta:', delta)

    if cv2.waitKey(1) == 27 or mld.FIN_FLAG == True:
        break

thread1.join()
thread2.join()

cv2.destroyAllWindows()
mld.SPI_CLOSE()
mld.terminate_module()
