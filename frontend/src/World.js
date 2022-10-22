import { useEffect, useState } from "react";
import Globe from "react-globe.gl";
import data from "./matchlist-21-05-2022.txt";

import map from "./stock-vector-world-map-vector-1299977560.jpg";

const World = () => {
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
            size: Math.random() / 3,
            color: "red",
          };

          setPoints((points) => [...points, newDot]);
        }
      });
  };

  useEffect(() => {
    setInterval(() => {
      fetch(urlFeed)
        .then((r) => r.json())
        .then((text) => {
          setMatches(text["doc"][0].data);
        });
    }, 1000);
  }, []);

  const removePoint = () => {
    setTimeout(() => {
      const newPointsArray = points.slice(0, points.length - 1);
      setPoints(newPointsArray);
      console.log("hello");
    }, 1000);
  };

  useEffect(() => {
    const delay = async (ms = 1000) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    const plotPoints = () => {
      if (matches.length > 0) {
        for (const match of matches) {
          let id = match.match._id;
          let dataLen = matches.length;
          //   dataLength = len(responseJson["doc"][0]["data"]) - 1;
          //   let waitingtime = 1000000 / dataLen;
          //   console.log(waitingtime);
          fetchdata(id);
          removePoint();
          //   await delay(1000);
        }
      }
    };
    plotPoints();
  }, [matches]);

  return (
    <Globe
      globeImageUrl={"//unpkg.com/three-globe/example/img/earth-day.jpg"}
      pointsData={points}
      pointAltitude="size"
      pointColor="color"
    ></Globe>
  );
};

export default World;
