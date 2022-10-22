import React, { useState, useEffect } from "react";

const apiCall = {
    event: "",
    data: {}
};

function ApiCaller() {
    const [location, setLocation] = useState([]);

    useEffect(() => {
    const ws = new WebSocket('wss://');    
    ws.onopen = (event) => {
        ws.send(JSON.stringify(apiCall));
    };

    ws.onmessage = function (event) {
        const json = JSON.parse(event.data);
        try {
          if ((json.event === 'data')) {
            setLocation(json.data.location.slice(0, 5));
          }
        } catch (err) {
          console.log(err);
        }
      };

      return () => ws.close();
    }, []);
      

      const firstLocation = location.map((item) => {
        return (
          <div>
            <p> {item}</p>
          </div>
        );
      });

      return <div>{firstLocation}</div>
}
export default ApiCaller;