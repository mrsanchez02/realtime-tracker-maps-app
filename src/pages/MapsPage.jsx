import { useMapbox } from "../hooks/useMapbox";

const startingPoint = {
  lng: -122.4725,
  lat: 37.8010,
  zoom: 13.5
}

const MapsPage = () => {

  const { coords, setRef } = useMapbox(startingPoint);

  return (
    <>
      <div className="info">
        Lng: {coords.lng} | Lat: {coords.lat} | Zoom: {coords.zoom}
      </div>
      <div
        className="map-container"
        ref={setRef}
      />
    </>
  )
}

export default MapsPage
