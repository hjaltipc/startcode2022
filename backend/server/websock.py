import asyncio
import websockets
import random
import time

random.seed(time.time())


async def handler(websocket,path):
        data = await websocket.recv()
        reply = f"Data recieved as: {data}"
        print(f"Data recieved from client  is {data}")
        await websocket.send(reply)
        while True:
            dat = random.randint(0,500)
            await websocket.send(str(dat))
            time.sleep(1)
            
            


start_server = websockets.serve(handler,"0.0.0.0",6921)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
