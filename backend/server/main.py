from fastapi import Request, FastAPI
import queue
import uvicorn
import threading
import random
import websockets
import asyncio
from loguru import logger
import time

dataQueue = queue.Queue()
websocketSendQueue = queue.Queue()
#socketQueue = queue.Queue() #Que for the info that the socker is going to send to the react websocket



app = FastAPI()
@app.get("/")
async def root():
    return {"message":"The API WORKS! WHOOOHOOO"}


async def handler(websocket,path,WebQueueObj):
    logger.info("Starting websocket handler")
    data = await websocket.recv()
    reply = f"Data recieved as: {data}"
    print(f"Data recieved from client  is {data}")
    await websocket.send(reply)
    while True:
        if WebQueueObj.not_empty():
            data = WebQueueObj.get()
            await websocket.send(data)
        else:
            time.sleep(0.1)
            #Prevent loop checking all the time

        #dat = random.randint(0,500)
        #await websocket.send(str(dat))
        #time.sleep(1)
        

@app.post("/input")
async def get_body(request: Request):
    rq = await request.body()
    print(f"recieved {rq} from server")
    dataQueue.put(rq)

def websocketThreadFunction(eventLoop,webQueueObj=websocketSendQueue):
    logger.info("Starting websocketThread")

    start_server = websockets.serve(handler,"0.0.0.0",6921,loop=eventLoop)
    eventLoop.run_until_complete(start_server)
    eventLoop.run_forever()    
    logger.info("WebsocketThread stopping")



def printer(queueob,webQueueObj):
    logger.info("Starting printingThread")
    try:
        if queueob.not_empty:
            queueMessage = queueob.get()
            webQueueObj.put(queueMessage)
            
            print(queueMessage)
    except Exception as e:
        print(e)

if __name__ == "__main__":
    printerThread = threading.Thread(target=printer, args=(dataQueue,websocketSendQueue,))
    printerThread.start()
    

    eventLoop = asyncio.new_event_loop()
    websocketThread = threading.Thread(target=websocketThreadFunction, args=(eventLoop,websocketSendQueue,))
    websocketThread.start()

    


    try:
        uvicorn.run(app,host="0.0.0.0", port=6969)
    except KeyboardInterrupt:
        logger.info("Exiting because KeyboardInterrupt")
        exit()

    logger.info("Program exiting")


