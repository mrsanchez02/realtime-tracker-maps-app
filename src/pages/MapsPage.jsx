import { useContext, useEffect } from "react";
import { useMapbox } from "../hooks/useMapbox";
import { SocketContext } from "../context/SocketContext";

const startingPoint = {
  lng: -122.4725,
  lat: 37.8010,
  zoom: 13.5
}

const MapsPage = () => {
  
  const { coords, setRef, newMarker$, markerMovement$, addMarkers } = useMapbox(startingPoint);
  const {socket} = useContext(SocketContext)

  // Listen existing markers
  useEffect(() => {
    socket.on('markers-active', (markers) => {
      for (const key of Object.keys(markers)) {
        addMarkers(markers[key], key);
      }
    })
  },[addMarkers, socket])

  // Listen markers changes
  useEffect(() => {
    newMarker$.subscribe(marker => {
      socket.emit('new-marker', marker);
    })
  }, [newMarker$, socket])

  useEffect(() => {
    markerMovement$.subscribe(marker => {
      socket.emit('markers-update', marker)
    })
  },[markerMovement$, socket])

  // Listen new markers
  useEffect(() => {
    socket.on('new-marker', (marker) => {
      addMarkers(marker, marker.id)
    })
  },[socket, addMarkers])

  // Listen markers movements
  // useEffect(() => {
  //   socket.on('markers-update', (marker) => {
  //     // markers.current[marker.id].setLngLat([marker.lng, marker.lat])
  //   }
  // },[])


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
