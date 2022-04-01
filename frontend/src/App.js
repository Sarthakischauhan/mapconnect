import './App.css';
import React from 'react';
import { useState } from "react";
import Map, {Marker} from 'react-map-gl';
import { Room } from '@material-ui/icons';
import 'mapbox-gl/dist/mapbox-gl.css';

const App = () => {
  const [viewport,setViewport] = useState({
    longitude: -121.78349704449576, 
    latitude: 37.31512016548463,
    zoom:4
  })
  return (
    <Map
      onMove={ evt => setViewport(evt.viewState)}
      {...viewport}
      style={{width: "100%", height: "100vh"}}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_KEY}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker longitude={-121.78349704449576} latitude={37.31512016548463} anchor="bottom" >
          <Room style={{fontSize : viewport.zoom * 8 ,color:"slateblue"}} />
      </Marker> 
    </Map>
  );
}

export default App;