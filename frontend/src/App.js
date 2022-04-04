import './App.css';
import React, { useEffect } from 'react';
import { useState } from "react";
import Map, {Marker, Popup} from 'react-map-gl';
import { Room, Star} from '@material-ui/icons';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from "axios";
import {format} from "timeago.js";


const App = () => {
  const [pins,setPins] = useState([]);
  const [viewport,setViewport] = useState({
    longitude: 78.8718, 
    latitude: 21.7679,
    zoom:4
  })

  const [showPopup,setShowPopup] = useState(true);
  const [currentPlaceId,setCurrentPlaceId] = useState(null);

  const handleMarkerCLick = (id,lat,long) => {
      setCurrentPlaceId(id);
      setViewport({...viewport,latitude:lat,longitude:long});
  }

  useEffect( () => {
    const getPins = async () => {
      try{
        const res = await axios.get("http://localhost:8800/api/pin");
        setPins(res.data)
      }
      catch (err) {
        console.log(err);
      }
    }
    getPins();
  },[]);
  
  return (
    <Map
      onMove={ evt => setViewport(evt.viewState)}
      {...viewport}
      style={{width: "100%", height: "100vh"}}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_KEY}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {pins.map(pin => {
        return (
          <>
            <Marker longitude={pin.long} latitude={pin.lat} anchor="bottom" >
              <Room style={{fontSize : viewport.zoom * 8 ,color:"slateblue",cursor:"pointer"}} onClick={() => handleMarkerCLick(pin._id,pin.lat,pin.long)} />
            </Marker> 

            {currentPlaceId === pin._id &&
              <Popup longitude={pin.long} latitude={pin.lat}
              anchor="right"
              closeButton={true}
              closeOnClick={false}
              onClose={() => setCurrentPlaceId(null)}
              >
              <div className='card'>
                <label>Place</label>
                <h4 className='place'>{pin.title}</h4>
                <label>Experience</label>
                <p className='exp'>{pin.desc}</p>
                <label>Mood</label>
                <div className="mood">
                    {Array(pin.rating).fill(<Star className="star" />)}
                </div>
                <label>Created At</label>
                <h4 className='time'>{format(pin.createdAt)}</h4>
              </div>
              </Popup>
            }
          </>
        )
      })}


    </Map>
  );
}

export default App;