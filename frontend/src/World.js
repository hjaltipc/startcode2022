import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import data from "./matchlist-21-05-2022.txt";

import map from "./stock-vector-world-map-vector-1299977560.jpg";

const World = () => {
  const globeEl = useRef();
  let url =
    "https://dev.fn.sportradar.com/common/en/Europe:Berlin/gismo/match_coordinates/";

  const urlFeed =
    "https://dev.fn.sportradar.com/common/en/Europe:Oslo/gismo/event_get";

  const [matches, setMatches] = useState([]);
  const [points, setPoints] = useState([]);

  const fetchdata = (match) => {
    fetch(url + match, { "Access-Control-Allow-Origin": "*" })
      .then((res) => res.json())
      .then((rows) => {
        if (rows.doc[0].data.coordinates != null) {
          let split = rows.doc[0].data.coordinates.split(",");
          // console.log(split[0]);
          let newDot = {
            lat: parseInt(split[0]),
            lng: parseInt(split[1]),
            maxR: 2,
            propagationSpeed: (Math.random() - 0.5) * 10 + 1,
            repeatPeriod: Math.random() * 200 + 200,
          };

          setPoints((points) => [...points, newDot]);
          console.log("Point set");
          removePoint();
        }
      });
  };

  //   useEffect(() => {
  //     setInterval(() => {
  //       fetch(urlFeed)
  //         .then((r) => r.json())
  //         .then((text) => {
  //           setMatches(text["doc"][0].data);
  //           console.log("MATCHES SET");
  //         });
  //     }, 10000);
  //   }, []);
  //   useEffect(() => {
  //     // setInterval(() => {
  //     fetch(data)
  //       .then((r) => r.text())
  //       .then((text) => {
  //         let location = text.split("\n");
  //         setMatches(location);
  //       });
  //     // }, 3000);
  //   }, []);

  const removePoint = () => {
    setTimeout(() => {
      console.log(points);
      const newPointsArray = points.slice(0, 1);
      setPoints(newPointsArray);
      console.log("Point removed");
    }, 8000);
  };

  useEffect(() => {
    setTimeout(() => {
      // wait for scene to be populated (asynchronously)
      const directionalLight = globeEl.current
        .scene()
        .children.find((obj3d) => obj3d.type === "DirectionalLight");
      directionalLight && directionalLight.position.set(0, 0, 0); // change light position to see the specularMap's effect
    });
  }, []);

  useEffect(() => {
    const plotPoints = async () => {
        let i = 100;
        interval = 
      console.log("number of matches: " + matches.length);
      console.log("number of points: " + points.length);
      if (matches.length > 0) {
        for (const match of matches) {
          i += 80;
          setTimeout(function () {
            let id = match.match._id;
            console.log(i);
            fetchdata(id);
          }, i);
          //   console.log("DOING THINGS");
        }
      }
    };
    plotPoints();
    console.log(points.length);
  }, [matches]);

  const colorInterpolator = (t) => `rgba(220,20,60,${Math.sqrt(1 - t)})`;

  return (
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
  );
};

export default World;
