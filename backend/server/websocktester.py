import asyncio
import websockets
import ssl

async def test():
    async with websockets.connect('wss://127.0.0.1:6921',ssl=ssl.CERT_NONE) as websocket:
        await websocket.send("hello")
        response = await websocket.recv()
        print(response)
        while True:
            rsp = await websocket.recv()
            print(rsp)
 
asyncio.get_event_loop().run_until_complete(test())
