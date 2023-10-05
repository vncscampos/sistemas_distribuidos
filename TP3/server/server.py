import asyncio

import websockets


async def server(websocket, path):
    try:
        await websocket.send("Olá, tudo bem?")

        while True:
            message = await websocket.recv()
            print(f"Cliente: {message}")
            msg = input("Server: ")
            await websocket.send(msg)
    except websockets.exceptions.ConnectionClosed:
        print("Conexão fechada")

start_server = websockets.serve(server, "localhost", 3333)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
