from fastapi import Request, FastAPI
import queue
import uvicorn
import threading
from re import M
from fastapi import Request, FastAPI
import queue
from geodata import get_coordinate
import uvicorn
import threading
import json

dataQueue = queue.Queue()

app = FastAPI()
@app.get("/")
async def root():
    return {"message":"Hello World"}

#json

@app.post("/input")
async def get_body(request: Request):
    #rq = await request.json()
    rq = await request.body()
    #print(rq)
    dataQueue.put(rq)
    return rq



def printer(queueob):
    while(True): 
        try:
            if queueob.not_empty:
                queueObj = queueob.get().decode() #.decode()[8:]
                matchId = json.loads(queueObj)["matchId"]
                coordinate = get_coordinate(matchId)
                print(coordinate)

        except Exception as e:
            print(e)



    




if __name__ == "__main__":
    printerThread = threading.Thread(target=printer, args=(dataQueue,))
    printerThread.start()



    uvicorn.run(app,host="0.0.0.0", port=6969)


