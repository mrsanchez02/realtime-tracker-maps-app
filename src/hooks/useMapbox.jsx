import { useRef, useState, useEffect, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import { v4 } from "uuid";

mapboxgl.accessToken = 'pk.eyJ1IjoibXJzYW5jaGV6MDIiLCJhIjoiY2xvbmp3aWk1MTBpcjJpb2F3eXIwNnc1MiJ9.R7h-XI_1PIWO2sL9jmcnXg';

export const useMapbox = (startingPoint) => {


  const mapDiv = useRef();
  const setRef = useCallback((node) => {
    mapDiv.current = node;
  }, [])
  const map = useRef();
  const [coords, setCoords] = useState(startingPoint);

  // Reference to markers
  const markers = useRef({});

  // function to add markers
  const addMarkers = useCallback((evt) => {
      const { lng, lat } = evt.lngLat;
      const marker = new mapboxgl.Marker();
      marker.id = v4(); // TODO if marker id exists, don't add
      marker
        .setLngLat([lng, lat])
        .addTo(map.current)
        .setDraggable(true);
      markers.current[marker.id] = marker;

  }, []);

  // Initialize map
  useEffect(() => {
    const map_initialized = new mapboxgl.Map({
      container: mapDiv.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [startingPoint.lng, startingPoint.lat],
      zoom: startingPoint.zoom
    })

    map.current = map_initialized;

  }, [startingPoint]);

  useEffect(() => {
    map.current?.on('move', () => {
      const { lng, lat } = map.current.getCenter();
      setCoords({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.current.getZoom().toFixed(2)
      })
    })

  }, []);

  // Add markers when click on map
  useEffect(() => {
    map.current?.on('click', addMarkers)

  }, [addMarkers])

  return {
    coords,
    setRef,
    markers,
    addMarkers
  }
}
