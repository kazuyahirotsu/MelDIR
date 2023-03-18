# https://www.aipacommander.com/entry/2017/12/27/155711
import socket
import numpy as np
import cv2

# 送信先のＩＰアドレス
to_send_addr = ('127.0.0.1', 9999)  #ループバックアドレス

udp = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
# img = np.zeros([60, 80], np.uint8)  # テスト画像作成
img = cv2.imread("readtest.png")
quality =100
encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), quality]

jpg_str = cv2.imencode('.jpeg', img, encode_param)

# 画像を分割する
for i in np.array_split(jpg_str[1], 10):
    # 画像の送信
    udp.sendto(i.tostring(), to_send_addr)

# １つのデータが終了したよを伝えるために判断できる文字列を送信する
udp.sendto(b'__end__', to_send_addr)
udp.close()
