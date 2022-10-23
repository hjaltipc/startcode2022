import { useEffect, useState } from "react";
import Globe from "react-globe.gl";


const World = () => {
  const ws = new WebSocket('ws://localhost:6921')
  ws.addEventListener('open', (event) => {
    ws.send('Present');
  });

  ws.addEventListener('message', (event) => {
      if(event){
        console.log("connection established")
        console.log(event);
      }
      console.log("MORE")
      let msg = (event.data);
      //let msgContent = msg.lat +","+msg.long;
      console.log(event.data.toString());
    
   });

  return (
    <div className="globe">
      <Globe
        globeImageUrl="https://assets.vercel.com/image/upload/v1595320886/front/home/globe-texture.jpg"
        backgroundColor="rgba(0,0,0,0)"
        width={1000}
        height={500}
      ></Globe>
    </div>
  );
};

export default World;
