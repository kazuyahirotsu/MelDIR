import pigpio
import time

gpio_pin0 = 12
gpio_pin1 = 13

# updown
# self.min1 upmax self.max1 downmax
min1 = 45000
max1 = 70000
# left right
# self.min2 right self.max2 left
min2 = 30000
max2 = 120000

pi = pigpio.pi()
pi.set_mode(gpio_pin0, pigpio.OUTPUT)
pi.set_mode(gpio_pin1, pigpio.OUTPUT)

# SP92 min 25000, mid 72500 max 120000

# GPIO12: Hz、duty比
pi.hardware_PWM(gpio_pin0, 50, 50000)
time.sleep(1)
pi.hardware_PWM(gpio_pin0, 50, 55000)
time.sleep(1)
pi.hardware_PWM(gpio_pin0, 50, 60000)
time.sleep(1)
pi.hardware_PWM(gpio_pin0, 50, 65000)
time.sleep(1)
pi.hardware_PWM(gpio_pin0, 50, 57500)
time.sleep(1)

# GPIO13: Hz、duty比
pi.hardware_PWM(gpio_pin1, 50, 77500)
time.sleep(1)
pi.hardware_PWM(gpio_pin1, 50, 35000)
time.sleep(1)
pi.hardware_PWM(gpio_pin1, 50, 77500)
time.sleep(1)
pi.hardware_PWM(gpio_pin1, 50, 115000)
time.sleep(1)
pi.hardware_PWM(gpio_pin1, 50, 77500)
time.sleep(1)

pi.set_mode(gpio_pin0, pigpio.INPUT)
pi.set_mode(gpio_pin1, pigpio.INPUT)
pi.stop()