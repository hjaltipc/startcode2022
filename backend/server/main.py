from fastapi import Request, FastAPI
import queue
import uvicorn
import threading

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
    print(rq)
    dataQueue.put(rq)
    return rq



def printer(queueob):
    try:
        if queueob.not_empty:
            print(queueob.get())
    except Exception as e:
        print(e)

if __name__ == "__main__":
    printerThread = threading.Thread(target=printer, args=(dataQueue,))
    printerThread.start()



    uvicorn.run(app,host="0.0.0.0", port=6969)


