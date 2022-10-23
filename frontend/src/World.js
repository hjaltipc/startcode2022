import { useRef, useState } from "react";
import { useCallback, useEffect } from "react";
import Globe from "react-globe.gl";
import { useSocket } from "./useSocket";

const World = () => {
  const globeEl = useRef();
  const [points, setPoints] = useState([]);
  const socket = useSocket();

  const setPointsFrom = (lat, long) => {
    let newDot = {
      lat: lat,
      lng: long,
      maxR: 2,
      propagationSpeed: (Math.random() - 0.5) * 10 + 1,
      repeatPeriod: Math.random() * 200 + 200,
    };
    setPoints((points) => [...points, newDot]);
    removePoint();
    console.log(newDot);
  };

  const onMessage = useCallback((event) => {
    console.log(event.data);

    if (event.data) {
      if (event.data != "Data recieved as: Present") {
        // const lat = JSON.parse(event.data);
        const data1 = event.data.replace("}", "").replace("{", "");
        const data2 = data1.split(",");
        const data3 = data2[0].split(":");
        console.log(data3[1]);
        const data4 = data2[1].split(":");
        console.log(data4[1]);
        console.log(data4);

        // console.log(lat);
        // console.log(lat.type);
        // const long = event.data.long;
        setPointsFrom(parseInt(data3[1]), parseInt(data4[1]));
        // console.log("connection established");
        // console.log(event.data.toString());
        // console.log(event.type);
        // // console.log(parseInt(newDot));

        // console.log("Point set");
      }

      // const parsedDot = parseInt(newDot);
    }
  }, []);

  const removePoint = () => {
    setTimeout(() => {
      console.log(points);
      const newPointsArray = points.slice(0, 1);
      setPoints(newPointsArray);
      console.log("Point removed");
    }, 8700);
  };

  useEffect(() => {
    socket.addEventListener("open", (event) => {
      console.log("sent");
      socket.send("Present");
    });

    console.log("listener made");
    socket.addEventListener("message", onMessage);

    // globeEl.current.controls().autoRotate = true;
    // globeEl.current.controls().autoRotateSpeed = 2;

    // setTimeout(() => {
    //   const directionalLight = globeEl.current
    //     .scene()
    //     .children.find((obj3d) => obj3d.type === "DirectionalLight");
    //   directionalLight && directionalLight.position.set(0, 0, 0); // change light position to see the specularMap's effect
    // });

    // return socket.removeEventListener("message", onMessage);
  }, [socket, onMessage]);

  const colorInterpolator = (t) => `rgba(220,20,60,${Math.sqrt(1 - t)})`;

  return (
    <div className="globe">
      <Globe
        ref={globeEl}
        showAtmosphere={false}
        globeImageUrl={
          "https://assets.vercel.com/image/upload/v1595320886/front/home/globe-texture.jpg"
        }
        backgroundColor="rgba(0, 0, 0, 0)"
        ringsData={points}
        ringColor={() => colorInterpolator}
        ringMaxRadius="maxR"
        ringPropagationSpeed="propagationSpeed"
        ringRepeatPeriod="repeatPeriod"
      ></Globe>
    </div>
  );
};

export default World;
