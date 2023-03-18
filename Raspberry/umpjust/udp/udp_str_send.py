# https://www.mochinoki-labo.com/python-udp
import socket
# 送信先のIPアドレス
HOST_NAME = '127.0.0.1' #ループバックアドレス
PORT = 9998
#ipv4を使うので、AF_INET
#udp通信を使いたいので、SOCK_DGRAM
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
#ブロードキャストを行うので、設定
sock.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)
#データ送信
sock.sendto(b"Hello, UDP BroadCast", (HOST_NAME, PORT))
sock.close()