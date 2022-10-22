import Globe from "react-globe.gl";

const World = () => {
  return (
    <div className="globe">
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        width={1000}
        height={500}
      ></Globe>
    </div>
  );
};

export default World;
