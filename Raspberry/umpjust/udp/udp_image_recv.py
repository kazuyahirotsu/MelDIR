# https://www.aipacommander.com/entry/2017/12/27/155711
import socket
import numpy as np
import cv2

def recive(udp):
    buff = 1024 * 64
    while True:
        recive_data = bytes()
        while True:
            # 送られてくるデータが大きいので一度に受け取るデータ量を大きく設定
            jpg_str, addr = udp.recvfrom(buff)
            is_len = len(jpg_str) == 7
            is_end = jpg_str == b'__end__'
            if is_len and is_end: break
            recive_data += jpg_str

        if len(recive_data) == 0: continue

        # string型からnumpyを用いuint8に戻す
        narray = np.fromstring(recive_data, dtype='uint8')

        # uint8のデータを画像データに戻す
        img = cv2.imdecode(narray, 1)
        yield img


udp = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
# 受信側のＩＰアドレス
udp.bind(('127.0.0.1', 9999)) #ループバックアドレス

# 画像を受け取り続ける
for img in recive(udp):
    # 送信された画像の処理を行う
    # ...
    print("recv image.")
    cv2.imwrite("test.png",img)