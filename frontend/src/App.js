import './App.css';
import React, { useEffect } from 'react';
import { useState } from "react";
import Map, {Marker, Popup} from 'react-map-gl';
import { FlipRounded, Room, Star} from '@material-ui/icons';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from "axios";
import {format} from "timeago.js";


const App = () => {
  const [pins,setPins] = useState([]);
  const [currentUser,setCurrentUser] = useState("sarthak999")
  const [viewport,setViewport] = useState({
    longitude: 78.8718, 
    latitude: 21.7679,
    zoom:4
  })
  const [newPlace,setNewPlace] = useState(null);
  const [title,setTitle] = useState("");
  const [desc,setDesc] = useState("");
  const [rating,setRating] = useState(null);
  const [showPopup,setShowPopup] = useState(true);
  const [currentPlaceId,setCurrentPlaceId] = useState(null);

  const handleMarkerCLick = (id,lat,long) => {
      setCurrentPlaceId(id);
      setViewport({...viewport,latitude:lat,longitude:long});
  }

  const handleClickAdd = (e) => {
      const {lng : longitude, lat : latitude} = e.lngLat;
      setNewPlace({
        lat:latitude,
        long:longitude
      });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username : currentUser,
      title:title,
      desc:desc,
      rating:rating,
      lat:newPlace.lat,
      long:newPlace.long
    };

    try {
      const allPins = await axios.post("http://localhost:8800/api/pin",newPin);
      setPins([...pins,allPins.data]);
      setNewPlace(null);
    }catch(err){
      console.log(err)
    }

  }
  useEffect( () => {
    const getPins = async () => {
      try{
        const res = await axios.get("http://localho.st:8800/api/pin");
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
      onDblClick={handleClickAdd}
    >
      {pins.map(pin => {
        return (
          <>
            <Marker longitude={pin.long} latitude={pin.lat} anchor="bottom" >
              <Room style={{fontSize : viewport.zoom < 10 ? 45 : 35 ,color:currentUser === pin.username ? "orange" : "slateblue",cursor:"pointer"}} onClick={() => handleMarkerCLick(pin._id,pin.lat,pin.long)} />
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
                <label>Info</label>
                <h4 className='user'>{`${pin.username} , ${format(pin.createdAt)}`}</h4>
              </div>
              </Popup>
            }
            {newPlace &&
              <Popup 
              longitude={newPlace.long}
              latitude={newPlace.lat}
              anchor="right"
              closeButton={true}
              onClose={() => setNewPlace(null)}
              >
                <div>
                  <form onSubmit={handleSubmit}>
                    <label>Title</label>
                    <input
                      placeholder="Enter a title"
                      autoFocus
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <label>Description</label>
                    <textarea
                      placeholder="Say us something about this place."
                      onChange={(e) => setDesc(e.target.value)}
                    />
                    <label>Rating</label>
                    <select onChange={(e) => setRating(e.target.value)}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    <button type="submit" className="submitButton">
                      Add Pin
                    </button>
                  </form>
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