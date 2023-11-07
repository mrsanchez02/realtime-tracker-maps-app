import mapboxgl from "mapbox-gl"
import { useEffect, useRef, useState } from "react";

mapboxgl.accessToken = 'pk.eyJ1IjoibXJzYW5jaGV6MDIiLCJhIjoiY2xvbmp3aWk1MTBpcjJpb2F3eXIwNnc1MiJ9.R7h-XI_1PIWO2sL9jmcnXg';

const initialState = {
  lng: -122.4725,
  lat: 37.8010,
  zoom: 13.5
}

const MapsPage = () => {

  const mapDiv = useRef();
  const map = useRef(null);
  // const [ map, setMap ] = useState();
  const [coords, setCoords] = useState(initialState);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapDiv.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [coords.lng, coords.lat],
      zoom: coords.zoom
    })

    map.current = map;
  }, []);

  // when the map move.
  useEffect(() => {
    map.current?.on('move', () => {
      const { lng, lat } = map.current.getCenter();
      setCoords({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.current.getZoom().toFixed(2),
      })
    });
  }, []);

  return (
    <>
      <div className="info">
        Lng: {coords.lng} | Lat: {coords.lat} | Zoom: {coords.zoom}
      </div>
      <div
        className="map-container"
        ref={mapDiv}
      />
    </>
  )
}

export default MapsPage