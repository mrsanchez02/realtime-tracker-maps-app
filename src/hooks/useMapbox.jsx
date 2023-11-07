import mapboxgl from "mapbox-gl";
import { useCallback, useEffect, useRef, useState } from "react";
import { Subject } from "rxjs";
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

  // Rxjs Observables
  const markerMovement = useRef( new Subject());
  const newMarker = useRef( new Subject());

  // function to add markers
  const addMarkers = useCallback((evt, id) => {
    const { lng, lat } = evt.lngLat || evt;
    const marker = new mapboxgl.Marker();
    marker.id = id ?? v4();
    marker
      .setLngLat([lng, lat])
      .addTo(map.current)
      .setDraggable(true);
    markers.current[marker.id] = marker;
    
    if (!id ) {
      newMarker.current.next({
        id: marker.id,
        lng,
        lat
      });
    }

    // Listen marker movements
    marker.on('drag', ({target}) => {
      const { id } = target;
      const { lng, lat } = target.getLngLat();
      markerMovement.current.next({
        id,
        lng,
        lat
      });
    })
  }, []);

  const updateMarker = useCallback(() => {
    
  },[])

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
    addMarkers,
    coords,
    markers,
    markerMovement$: markerMovement.current,
    newMarker$: newMarker.current,
    updateMarker,
    setRef,
  }
}
