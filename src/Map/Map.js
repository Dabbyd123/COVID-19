import React, { useState, useEffect } from 'react';
import { Map, Marker, TileLayer, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import './Map.css';
import styled from 'styled-components';



export default ({ latitude, longitude, cities, clicked }) => {
    const [activeCity, setActiveCity] = useState('');

    const confirmedArr = cities.map(city => city.confirmed);

    const redMarker = new Icon({
        iconUrl: '/marker-icon-red.png'
    })

    const blueIcon = new Icon({
        iconUrl: '/marker-icon-blue.png'
    })

    const goldMarker = new Icon({
        iconUrl: '/marker-icon-gold.png'
    })

    return (

        <Map center={[latitude, longitude]} zoom={5.5} setView scrollWheelZoom={false}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {cities.map(e => (
                <Marker
                    position={[
                        Number(e.lat),
                        Number(e.long)
                    ]}
                    key={e.name}
                    id={e.name}
                    onClick={() => setActiveCity(e)}
                    icon={Number(e.confirmed) === Math.max(...confirmedArr) ? redMarker : (e.name === clicked) || (activeCity && e.name === activeCity.name) ? goldMarker : blueIcon}
                />
            ))}


            {activeCity && (
                <Popup
                    position={[
                        Number(activeCity.lat),
                        Number(activeCity.long)
                    ]}
                    onClose={() => setActiveCity(null)}
                >
                    <h2>{activeCity.name}</h2>
                    <p>Confirmed Cases: {activeCity.confirmed}</p>
                    <p>Confirmed Diff: {activeCity.confirmed_diff}</p>
                    <p>Confirmed Deaths: {activeCity.deaths}</p>
                    <p>Deaths Diff: {activeCity.deaths_diff}</p>
                </Popup>
            )}


        </Map>
    )
}
