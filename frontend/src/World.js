import Globe from "react-globe.gl";

const World = () => {
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
