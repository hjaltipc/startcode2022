import { useRef, useState } from "react";
import { useCallback, useEffect } from "react";
import Globe from "react-globe.gl";
import { useSocket } from "./useSocket";

const World = () => {
  const globeEl = useRef();
  const [points, setPoints] = useState([]);
  const socket = useSocket();

  const setPointsFrom = (point) => {
    setPoints((points) => [...points, point]);
    removePoint();
    console.log(points);
  };

  const onMessage = useCallback((event) => {
    console.log(points);
    if (event.data) {
      const newDot = event.data.toString();
      // let newDot = {
      //   lat: parseInt(split[0]),
      //   lng: parseInt(split[1]),
      //   maxR: 2,
      //   propagationSpeed: (Math.random() - 0.5) * 10 + 1,
      //   repeatPeriod: Math.random() * 200 + 200,
      // };
      // const parsedDot = parseInt(newDot);
      setPointsFrom(newDot);
      console.log("connection established");
      console.log(event.data.toString());
      console.log(event.type);
      console.log(parseInt(newDot));

      console.log("Point set");
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

    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 2;

    setTimeout(() => {
      const directionalLight = globeEl.current
        .scene()
        .children.find((obj3d) => obj3d.type === "DirectionalLight");
      directionalLight && directionalLight.position.set(0, 0, 0); // change light position to see the specularMap's effect
    });

    // return socket.removeEventListener("message", onMessage);
  }, [socket, onMessage]);

  console.log(points);

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
