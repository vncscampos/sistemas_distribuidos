import socket

HOST = 'localhost'
PORT = 3333
socks = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
socks.bind((HOST, PORT))
socks.listen()

print(f"Servidor escutando em {HOST}:{PORT}")

conn, addr = socks.accept()
print(f"Conexão recebida de {addr}")
conn.send("Olá, tudo bem?".encode('utf-8'))

while True:
    data = conn.recv(1024)
    if not data:
        break
    print(f"Cliente: {data.decode('utf-8')}")
    msg = input("Server: ")
    conn.send(msg.encode('utf-8'))

conn.close()