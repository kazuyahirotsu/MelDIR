import os
from re import X
import sys
import numpy as np
import spidev
import wiringpi as pi
#import matplotlib
#import matplotlib.pyplot as plt
import time
import datetime
# import csv
import math
import cv2
from numba import jit
from threading import Thread
import pigpio


class meldir:
    def __init__(self):
        spi=spidev.SpiDev()

        # camera pram
        d = 40/math.tan(math.radians(39))
        # d = 30/math.tan(math.radians(53/2))
        # cv2.namedWindow("hmap")

        # import ipdb; ipdb.set_trace()
        #updown
        #self.min1 up  self.max1 down
        self.min1 = 45000
        self.max1 = 70000
        #left right
        #self.min2 right self.max2 left
        self.min2 = 30000
        self.max2 = 120000
        self.angle1 = 50000
        self.angle2 = 77500
        self.servo_speed1 = 0
        self.servo_speed2 = 0
        self.imshowmat = np.zeros([64,80])
        self.running = True
        self.AVGON=0
        self.NRST_PIN=22
        self.tempdata=0
        self.FIN_FLAG = False
        pi.wiringPiSetupGpio()
        pi.pinMode(self.NRST_PIN,pi.OUTPUT)
        pi.digitalWrite(self.NRST_PIN,pi.HIGH)
        #Prepare SPI_IF
        self.spi=spidev.SpiDev()
        self.setting = []
        self.read_frame = []
        # no use
        self.wait_frame=[]

    def SPI_OPEN(self):
        self.spi.open(0,0)
        self.spi.max_speed_hz = 5000000
        self.spi.mode=0b01
    
    def SPI_RW(self,send_value,fclk=1000000):
        value=[]
        ncnk=1024
        num=len(send_value)//ncnk
        amari=len(send_value)%ncnk
    #    print(ncnk,len(send_value),num,amari)
        for i in range(num):
    #        print(send_value[ncnk*i:ncnk*i+4095])
            value+=self.spi.xfer2(send_value[ncnk*i:ncnk*(i+1)],fclk,1,8)
        value+=self.spi.xfer2(send_value[ncnk*num:ncnk*num+amari],fclk,1,8)
    #    value+=self.spi.xfer3(send_value,fclk,1,8)
    #    print(len(value))
        return value
        
    def SPI_CLOSE(self):
        self.spi.close
    def SET_USER(self):
        SEL_SC=1 #0:ON 1:OFF
        SEL_FPN=0 #0:ON 1:OFF
        EN_FCAL=1 #0:OFF 1:ON
        SDATA4=SEL_SC*2**6+SEL_FPN*2**5+EN_FCAL*2**3
        sdata=[0x75,0x00,0x00,0x00,SDATA4,0x30,0x25,0x80]
        for i in range(8):
            sdata+=[0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x80]
        sdata+=[0x00,0x00,0x00,0x00,0x00,0x00,0x00]
        self.setting = sdata
        
    def STUPMDL(self):
        #Setup Development Registor for
        sdata=[0x65,0x00,0x00,0x01,0x00,0x01,0x00,0x80] #0x01が通信に影響？(以前は60)
        sdata+=[0x10,0x00,0x0D,0x08,0x00,0x29,0x30,0x80]
        sdata+=[0x04,0x05,0x00,0x00,0x00,0x01,0x00,0x92] #1st word,0x04=GSW1.5
        sdata+=[0x01,0x00]
        return sdata

    def SHUTTER(self):
        sdata=[0x5A,0x41,0x00,0x00,0x00,0x00,0x00,0x80]
        return sdata

    #no use
    def FRAME_WAIT(self):
        sdata=[0x5A,0x40,0x00,0x00,0x00,0x00,0x00,0x80]
        self.wait_frame=sdata

    def SETDAC(self, DAC=512):
        SDATA2=int(DAC) // 2**6
        SDATA3=int(DAC) % 2**6
        sdata=[0x4A,0x02,SDATA2,SDATA3,0x80]
    #    sdata=[0x4A,0x02,0x0A,0x14,0x80]
        return sdata

    def SET_BS(self):
        sdata=[0x4A,0x00,0x00,0x00,0x80]
        return sdata

    def READDAC(self):
        sdata=[0x4B,0x00,0x00,0x00,0x80]
        self.setting = sdata

    def ACCRAM(self,SELRAM=0x16):
        sdata=[0x65,0x00,0x00,SELRAM,0X00,0x00,0x00,0X00]
        self.setting = sdata

    def FPNDATA(self):
        sdata=[0x4A]
        for i in range(2592):
            sdata+=[0x07,0xFF,0xFF]
        sdata+=[0x00,0x00,0x00]
        sdata+=[0x00,0x00,0x00]
        self.setting = sdata
    
    def FRAME_READ(self):
        #First 8byte data(mode=1:4fps,mode=0:8fps)
        REG_RD=1
        WUP=1
        MODE=0           
        NUM_SHT=0
        ACT_SHT=0
        SDATA1=WUP*2**6+MODE*2**4+NUM_SHT*2**1+ACT_SHT*2**0
        sdata=[0x5A,SDATA1,0x00,0x00,0x00,0x00,0x00,0x81]
        for k in range(8):
            sdata+=[0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x80]
        for i in range(64):
            for j in range(20):
                SEL_LINE=(i+j//19)%64
                SEL_CLST=(j+1)%20
                REG_RD=1-(i+j//19)//64
                sdata+=[0x00,0x00,0x00,0x00,0x00,0x00,SEL_LINE*2**1,(1*2**7+SEL_CLST*2**1+REG_RD)]
        self.read_frame = sdata
    
    def make_pixdata(self, spi_read,PIXDATA,PIXAVG):
        #PIXDATA=[[0]*64 for i in range(80)]
        #PIXAVG=[[0]*64 for i in range(80)]
        for i in range(64):
            for j in range(20):
                for k in range(4):
                    PIXDATA[4*j+k][i]=(spi_read[72+20*8*i+8*j+2*k+1] % 2**6)*2**8+spi_read[72+20*8*i+8*j+2*k]-2**13
        if self.AVGON==1:
            for i in range(64):
                for j in range(80):
                    if i==63:
                        iad=0
                    else:
                        iad=1
                    if j==79:
                        jad=0
                    else:
                        jad=1
                    PIXAVG[j][i]=(PIXDATA[j][i]+PIXDATA[j+jad][i]+PIXDATA[j][i+iad]+PIXDATA[j+jad][i+iad])/4
            PIXDATA=PIXAVG
        
        PIXDATA = np.rot90(PIXDATA,3)
        return PIXDATA
    
    def make_edgebalance(self):
        sigma=int(4)
        EDGE_BALANCE=[[0]*11 for i in range(11)]
        for i in range(11):
            for j in range(11):
                EDGE_BALANCE[j][i]=1/(2*3.1415*sigma*sigma)*math.exp((-1)*(((i-5)*2)**2+((j-5)*2)**2)/(2*sigma*sigma)) #式を記載予定(σ含んだレンズ結像性計算)
                EDGE_BALANCE[j][i]=round(EDGE_BALANCE[j][i],4)
    #    print(EDGE_BALANCE)
        return EDGE_BALANCE
    
    def set_avg(self):
        self.AVGON
        self.AVGON=1
    
    def rset_avg(self):
        self.AVGON
        self.AVGON=0
    
    def frame(self):
        # vis_min=int(-100)
        # vis_max=int(200)
        # f_scan=0
        # ntry=1
        # while f_scan==0:
        #     spi_read=(list(SPI_RW(read_frame)))
        #     if spi_read[0]==255:
        #         f_scan=1
        #     elif ntry==10:
        #         f_scan=0
        #     ntry=ntry+1
        spi_read=(list(self.SPI_RW(self.read_frame)))
        MODE=(spi_read[2] % 2**6) // 2**4
        TEMP=(spi_read[6] % 2**2)*256 + spi_read[7]
        self.tempdata=TEMP
        PIXDATA = np.zeros([80,64])
        PIXAVG = np.zeros([80,64])
        spi_read = np.asarray(spi_read)
        # print(MODE,TEMP)

        pixdata=self.make_pixdata(spi_read,PIXDATA,PIXAVG)

    #    plotdata=pixdata[23:55][0:31]
    #    plotdata=pixdata[17:60]
        plotdata=pixdata
    
        return pixdata
    
    def framefor(self):
        pixdata = self.frame()
    
    # サーボの動作制御部
    def servo_ctrl(self):

        minspeed = 0.08
        maxspeed = 1000
        gpio_pin1 = 12
        gpio_pin2 = 13
        pi = pigpio.pi()
        pi.set_mode(gpio_pin1, pigpio.OUTPUT)
        pi.set_mode(gpio_pin2, pigpio.OUTPUT)
        pi.hardware_PWM(gpio_pin1, 50, self.angle1)
        pi.hardware_PWM(gpio_pin2, 50, self.angle2)

        # print("self.servo_speed1:",self.servo_speed1,"self.servo_speed2:",self.servo_speed2)
        while(True):
            #print("self.servo_speed1:",self.servo_speed1,self.servo_speed2:",self.servo_speed2)
            next_angle1 = self.angle1 + 0.1*self.servo_speed1
            next_angle2 = self.angle2 + 0.1*self.servo_speed2
            # print("speed1", self.servo_speed1, "self.angle1", self.angle1,"speed2:", self.servo_speed2, "self.angle2:", self.angle2)
    
            if self.servo_speed1 > maxspeed:
                next_angle1 = self.angle1
            elif next_angle1 > self.max1 or next_angle1 < self.min1:
                next_angle1 = self.max1
                print("over_self.angle1")
            else:
                pi.hardware_PWM(gpio_pin1, 50, int(55000))
            
            
            if abs(self.servo_speed2) > maxspeed:
                next_angle2 = self.angle2
            elif next_angle2 > self.max2 or next_angle2 < self.min2:
                next_angle2 = self.max2
                print("over_self.angle2")
            else:
                pi.hardware_PWM(gpio_pin2, 50, int(next_angle2))
            # print(next_self.angle1,next_self.angle2)
            self.angle1 = next_angle1
            self.angle2 = next_angle2
            time.sleep(0.01)
            if self.FIN_FLAG == True:
                break
            
        pi.set_mode(gpio_pin1, pigpio.INPUT)
        pi.set_mode(gpio_pin2, pigpio.INPUT)
        pi.stop()

    def cont_frame(self):
        
        #num=int(input("Number of Frame"))
        count = 0
        while True:
            pixdata=self.frame()
            pixdata_arr = np.array(pixdata)
            pixdata_arr = pixdata_arr[:-4,:]

            mat = cv2.flip(pixdata_arr, 0)
            max = np.max(mat)
            min = np.min(mat)
            mat = (mat-min)/(max-min)*255
            mat = mat.astype(np.uint8)
            self.imshowmat = mat
            # servo ctrl
            self.servo_speed1 = 0
            self.servo_speed2 = 0
            # now = datetime.datetime.now()
            # print("time:",now)
            # with open("/home/sotsubo/Desktop/data/"+now.strftime('%m%d%H%M%S')+".csv","w") as f:
    #       with open("/home/pi/Desktop/data/"+str(count)+".csv","w") as f:
            count +=1
            if count == 100000000000:
               self.FIN_FLAG = True 
            if self.FIN_FLAG == True:
                break
        print("Finish")
    
    
    
    def shutter(self,shutter_frame):
        os.system('python3 close.py')
        spi_read=(list(self.SPI_RW(shutter_frame)))
        time.sleep(5)
        os.system('python3 open.py')
        
    def dacset(self):
        # DACVAL=input('Input Dac Value')
        DACVAL = 350
        devdac=self.SETDAC(DACVAL)
        print(devdac)
        spi_read=(list(self.SPI_RW(devdac)))
        time.sleep(0.5)
        devdac2=self.SET_BS()
        spi_read=(list(self.SPI_RW(devdac2)))
        print(spi_read)
        
    def terminate_module(self):
        os.system('python3 close.py')
        #self.dacread()
        pi.digitalWrite(self.NRST_PIN,pi.LOW)
        #sys.exit()

    def dacread(self):
        command=self.READDAC()
        spi_read=(list(self.SPI_RW(command)))
        DACVAL=(spi_read[3] % 2**4)*2**6 + spi_read[4] % 2**6
        print(spi_read)
        print(DACVAL,DACVAL*4.5/1024)
        time.sleep(1)

    def set_userreg(self):
        self.SET_USER()
        spi_read=(list(self.SPI_RW(self.setting)))
        print(spi_read)

    def set_fpndata(self):
        SELRAM=0x16
        self.ACCRAM(SELRAM)
        spi_read=(list(self.SPI_RW(self.setting)))
        time.sleep(0.1)
        print(self.setting,spi_read)
        self.FPNDATA()
        spi_read=(list(self.SPI_RW(self.setting)))
        self.ACCRAM(0x00)
        spi_read=(list(self.SPI_RW(self.setting)))
        print(self.setting,spi_read)
    
    
    
