import './App.css';
import React from 'react';
import { useState } from "react";
import Map, {Marker, Popup} from 'react-map-gl';
import { Room, Star} from '@material-ui/icons';
import 'mapbox-gl/dist/mapbox-gl.css';

const App = () => {
  const [viewport,setViewport] = useState({
    longitude: -121.78349704449576, 
    latitude: 37.31512016548463,
    zoom:4
  })
  const [showPopup,setShowPopup] = useState(true);
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
      <Popup longitude={-121.78349704449576} latitude={37.31512016548463}
        anchor="right"
        onClose={() => setShowPopup(false)}>
        <div className='card'>
          <label>Place</label>
          <h4 className='place'>Home</h4>
          <label>Experience</label>
          <p className='exp'>It feels like home.</p>
          <label>Mood</label>
          <div className="mood">
            <Star className='star'/>
            <Star className='star'/> 
            <Star className='star'/>
            <Star className='star'/>
            <Star className='star'/>
          </div>
          <label>Created At</label>
          <h4 className='time'>1 hour ago</h4>
        </div>
      </Popup>
    </Map>
  );
}

export default App;