
// "use client";
// import { MapContainer, TileLayer, Popup, LayersControl, CircleMarker, useMap } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { styled } from '@mui/material/styles';
// import { Box, CircularProgress, Typography } from '@mui/material';
// import L from 'leaflet';

// const earthquakeData = [
//     { lat: 38.9637, lng: 35.2433, magnitude: 6.5, depth: 10, location: "Central Turkey" },
//     { lat: 39.9334, lng: 32.8597, magnitude: 5.2, depth: 15, location: "Ankara" },
//     { lat: 40.1828, lng: 29.0669, magnitude: 6.0, depth: 12, location: "Bursa" },
//     { lat: 41.0082, lng: 28.9784, magnitude: 7.0, depth: 20, location: "Istanbul" },
//     { lat: 37.0662, lng: 37.3833, magnitude: 5.6, depth: 18, location: "Gaziantep" },
//     { lat: 38.4237, lng: 27.1428, magnitude: 6.1, depth: 14, location: "Izmir" },
//     { lat: 37.0022, lng: 35.3213, magnitude: 5.4, depth: 10, location: "Adana" },
//     { lat: 36.8969, lng: 30.7133, magnitude: 4.8, depth: 20, location: "Antalya" },
//     { lat: 37.8739, lng: 32.4846, magnitude: 5.0, depth: 15, location: "Konya" },
//     { lat: 41.0085, lng: 39.7206, magnitude: 5.5, depth: 10, location: "Trabzon" },
//     { lat: 37.9101, lng: 40.7388, magnitude: 5.3, depth: 11, location: "Diyarbakır" },
// ];

// const getColorByMagnitude = (magnitude) => {
//     if (magnitude > 6.9) return 'red';    // Magnitude > 6.5 -> red
//     if (magnitude > 5.9) return 'orange'; // Magnitude between 5.5 and 6.5 -> orange
//     if (magnitude > 4.9) return 'blue';   // Magnitude between 4.5 and 5.5 -> blue
//     return 'green';                       // Magnitude <= 5.5 -> green
// };

// const getRadiusByMagnitude = (magnitude) => {
//     if (magnitude < 5.0) return 5;
//     if (magnitude < 6.0) return 10;
//     return 15;
// };

// // const Legend = ( ) => {
// //     const map = useMap();

// //     useEffect(() => {
// //         const legend = L.control({ position: 'bottomleft' });

// //         legend.onAdd = function () {
// //             const div = L.DomUtil.create('div', 'info legend');
// //             div.style.backgroundColor = 'white';   
// //             div.style.padding = '10px';
// //             div.style.borderRadius = '5px';

// //             // Add magnitude ranges to the legend
// //             const magnitudeRanges = [
// //                 { color: 'red', range: '7+', description: 'High Magnitude' },
// //                 { color: 'orange', range: '5.0 to 6.9', description: 'Medium Magnitude' },
// //                 { color: 'blue', range: '4.0 to 5.0', description: 'Low Magnitude' },
// //                 { color: 'green', range: 'less then4.0', description: 'Minor Earthquake' },
// //             ];

// //             const labels = magnitudeRanges.map((item) => 
// //                 `<i style="background:${item.color}; border-radius: 50%; width: 12px; height: 12px; display: inline-block; margin-right: 5px;"></i> 
// //                 ${item.range}`
// //             ).join('<br>');

// //             // Identify the maximum magnitude earthquake
// //             const maxMagnitudeEarthquake = earthquakeData.reduce((max, quake) => quake.magnitude > max.magnitude ? quake : max, earthquakeData[0]);

// //             // Add max magnitude circle to the legend
// //             const maxMagnitudeCircle = `<div style="width: 25px; height: 25px; background: red; border-radius: 50%; display: inline-block; margin-right: 5px;"></div> 7.0`;

// //             // Set the legend's HTML to show the magnitude ranges and max magnitude circle
// //             div.innerHTML = `<h4>Magnitude Legend</h4>${labels}<br>${maxMagnitudeCircle}`;
// //             return div;
// //         };

// //         legend.addTo(map);

// //         return () => {
// //             map.removeControl(legend);
// //         };
// //     }, [map]);

// //     return null;
// // };



// const Legend = () => {
//     const map = useMap();

//     useEffect(() => {
//         const legend = L.control({ position: 'bottomleft' });

//         legend.onAdd = function () {
//             const div = L.DomUtil.create('div', 'info legend');
//             div.style.backgroundColor = 'white';
//             div.style.padding = '10px';
//             div.style.borderRadius = '5px';

//             // Add magnitude ranges to the legend
//             const magnitudeRanges = [
//                 { color: 'red', range: '7+', description: 'High magnitude' },
//                 { color: 'orange', range: '5.0-6.9', description: 'High Magnitude' },
//                 { color: 'blue', range: '4.0-5.0', description: 'Low Magnitude' },
//                 { color: 'green', range: 'less than 4.0', description: 'Minor Earthquake' },
//             ];

//             const labels = magnitudeRanges.map((item) =>
//                 `<i style="background:${item.color}; border-radius: 50%; width: 12px; height: 12px; display: inline-block; margin-right: 5px;"></i> 
//                 ${item.range}`
//             ).join('<br>');

//             // Identify the maximum magnitude earthquake
//             const maxMagnitudeEarthquake = earthquakeData.reduce((max, quake) => quake.magnitude > max.magnitude ? quake : max, earthquakeData[0]);

//             // Red circle for max magnitude (7+)
//             const maxMagnitudeCircle = `<div style="width: 25px; height: 25px; background: red; border-radius: 50%; display: inline-block; margin-right: 5px;"></div> 7 Highest magnitude`;

//             // Three orange circles (small, medium, large) for 5.0 - 6.9 magnitudes
//             const orangeCircles = `
//                 <div style="display: flex; align-items: center;">
//                 <div style="width: 20px; height: 20px; background: orange; border-radius: 50%; margin-left: 10px; margin-right: 5px;"></div> 6.5
//                 <div style="width: 15px; height: 15px; background: orange; border-radius: 50%; margin-left: 10px; margin-right: 5px;"></div>6.1
//                 <div style="width: 10px; height: 10px; background: orange; border-radius: 50%; margin-right: 5px;"></div> 6

//                 </div>`;

//             // Set the legend's HTML to show the magnitude ranges and red/orange circles
//             div.innerHTML = `<h4>Magnitude Legend</h4>${labels}<br>${maxMagnitudeCircle}<br>${orangeCircles}`;
//             return div;
//         };

//         legend.addTo(map);

//         return () => {
//             map.removeControl(legend);
//         };
//     }, [map]);

//     return null;
// };


// const MapComponent = () => {



//     const [mounted, setMounted] = useState(false);
//     const [mapData, setmapData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     console.log(mapData, "mapdatass")

//     useEffect(() => {
//         const fetchHeatmapData = async () => {
//             try {
//                 const response = await axios.get("/api/elasticsearch");
//                 console.log(response.data.earthquakeLocations, "hello")
//                 const result = response.data.earthquakeLocations;
//                 // console.log(result,"hh");

//                 const formattedData = result
//                     .map((item) => ({
//                         city: item.city,
//                         lat: item.lat,
//                         lon: item.lon,
//                         magnitude: parseFloat(item.magnitude) || 0,
//                         depth: item.depth ? parseFloat(item.depth) : 0
//                     })).filter(item => item.lat !== undefined && item.lon !== undefined &&
//                         item.lat >= -90 && item.lat <= 90 &&
//                         item.lon >= -180 && item.lon <= 180);


//                 setmapData(formattedData);
//             } catch (error) {
//                 console.error("Error fetching heatmap data:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchHeatmapData();
//     }, []);


//     return (
//         <>
//             {loading ? (
//                 <Loader>
//                     <CircularProgress sx={{ color: 'red' }} />
//                     <Typography variant="h6" marginTop={2}>Loading...</Typography>
//                 </Loader>
//             ) : (
//                 <MapContainer
//                     center={[38.9637, 35.2433]}
//                     zoom={6}
//                     scrollWheelZoom={true}
//                     style={{ height: '100vh', width: '100%' }}
//                 >
//                     {/* Layer Control */}
//                     <LayersControl position="topright">
//                         <LayersControl.BaseLayer checked name="OpenStreetMap">
//                             <TileLayer
//                                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                                 attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//                             />
//                         </LayersControl.BaseLayer>

//                         <LayersControl.BaseLayer name="Satellite">
//                             <TileLayer
//                                 url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
//                                 attribution='&copy; <a href="http://opentopomap.org">OpenTopoMap</a> contributors'
//                             />
//                         </LayersControl.BaseLayer>

//                         <LayersControl.BaseLayer name="Stamen Terrain">
//                             <TileLayer
//                                 url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg"
//                                 attribution='&copy; <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>'
//                             />
//                         </LayersControl.BaseLayer>

//                         {/* Show earthquake circles */}
//                         {earthquakeData?.map((quake) => (
//                             <CircleMarker
//                                 key={quake.location}
//                                 center={[quake.lat, quake.lng]}
//                                 radius={getRadiusByMagnitude(quake.magnitude)}
//                                 fillColor={getColorByMagnitude(quake.magnitude)}
//                                 color={getColorByMagnitude(quake.magnitude)}
//                                 fillOpacity={0.6}
//                             >
//                                 <Popup>
//                                     <strong>{quake.city}</strong><br />
//                                     Magnitude: {quake.magnitude}<br />
//                                     Depth: {quake.depth} km<br />
//                                     Latitude: {quake.lat}<br />
//                                     Longitude: {quake.lng}
//                                 </Popup>
//                             </CircleMarker>
//                         ))}
//                     </LayersControl>

//                     {/* Legend Component */}
//                     <Legend mapData={mapData} />
//                 </MapContainer>
//             )}
//         </>
//     );
// };

// export default MapComponent;




// const Loader = styled(Box)(({ theme }) => ({
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     marginTop: "8rem",
//     alignItems: 'center',
// }));



"use client";
import { MapContainer, TileLayer, Popup, LayersControl, CircleMarker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from '@mui/material/styles';
import { Box, CircularProgress, Typography, TextField, Button } from '@mui/material';
import L from 'leaflet';

// Earthquake Data (You may fetch this from an API as well)
const earthquakeData = [
    { lat: 38.9637, lng: 35.2433, magnitude: 6.5, depth: 10, location: "Central Turkey" },
    { lat: 39.9334, lng: 32.8597, magnitude: 5.2, depth: 15, location: "Ankara" },
    { lat: 40.1828, lng: 29.0669, magnitude: 6.0, depth: 12, location: "Bursa" },
    { lat: 41.0082, lng: 28.9784, magnitude: 7.0, depth: 20, location: "Istanbul" },
    { lat: 37.0662, lng: 37.3833, magnitude: 5.6, depth: 18, location: "Gaziantep" },
    { lat: 38.4237, lng: 27.1428, magnitude: 6.1, depth: 14, location: "Izmir" },
    { lat: 37.0022, lng: 35.3213, magnitude: 5.4, depth: 10, location: "Adana" },
    { lat: 36.8969, lng: 30.7133, magnitude: 4.8, depth: 20, location: "Antalya" },
    { lat: 37.8739, lng: 32.4846, magnitude: 5.0, depth: 15, location: "Konya" },
    { lat: 41.0085, lng: 39.7206, magnitude: 5.5, depth: 10, location: "Trabzon" },
    { lat: 37.9101, lng: 40.7388, magnitude: 5.3, depth: 11, location: "Diyarbakır" },
];

// Functions for getting color and radius based on magnitude
const getColorByMagnitude = (magnitude) => {
    if (magnitude > 6.9) return 'red';    
    if (magnitude > 5.9) return 'orange'; 
    if (magnitude > 4.9) return 'blue';   
    return 'green';                       
};

const getRadiusByMagnitude = (magnitude) => {
    if (magnitude < 5.0) return 5;
    if (magnitude < 6.0) return 10;
    return 15;
};

// Legend Component
const Legend = () => {
    const map = useMap();

    useEffect(() => {
        const legend = L.control({ position: 'bottomleft' });

        legend.onAdd = function () {
            const div = L.DomUtil.create('div', 'info legend');
            div.style.backgroundColor = 'white';
            div.style.padding = '10px';
            div.style.borderRadius = '5px';

            // Add magnitude ranges to the legend
            const magnitudeRanges = [
                { color: 'red', range: '7+', description: 'High magnitude' },
                { color: 'orange', range: '5.0-6.9', description: 'High Magnitude' },
                { color: 'blue', range: '4.0-5.0', description: 'Low Magnitude' },
                { color: 'green', range: 'less than 4.0', description: 'Minor Earthquake' },
            ];

            const labels = magnitudeRanges.map((item) =>
                `<i style="background:${item.color}; border-radius: 50%; width: 12px; height: 12px; display: inline-block; margin-right: 5px;"></i> 
                ${item.range}`
            ).join('<br>');

            // Identify the maximum magnitude earthquake
            const maxMagnitudeEarthquake = earthquakeData.reduce((max, quake) => quake.magnitude > max.magnitude ? quake : max, earthquakeData[0]);

            // Red circle for max magnitude (7+)
            const maxMagnitudeCircle = `<div style="width: 25px; height: 25px; background: red; border-radius: 50%; display: inline-block; margin-right: 5px;"></div> 7 Highest magnitude`;

            // Three orange circles (small, medium, large) for 5.0 - 6.9 magnitudes
            const orangeCircles = `
                <div style="display: flex; align-items: center;">
                <div style="width: 20px; height: 20px; background: orange; border-radius: 50%; margin-left: 10px; margin-right: 5px;"></div> 6.5
                <div style="width: 15px; height: 15px; background: orange; border-radius: 50%; margin-left: 10px; margin-right: 5px;"></div>6.1
                <div style="width: 10px; height: 10px; background: orange; border-radius: 50%; margin-right: 5px;"></div> 6

                </div>`;

            // Set the legend's HTML to show the magnitude ranges and red/orange circles
            div.innerHTML = `<h4>Magnitude Legend</h4>${labels}<br>${maxMagnitudeCircle}<br>${orangeCircles}`;
            return div;
        };

        legend.addTo(map);

        return () => {
            map.removeControl(legend);
        };
    }, [map]);

    return null;
};


// Main Map Component
const MapComponent = () => {
    const [keyword, setKeyword] = useState('');      // Keyword state for filtering
    const [filteredData, setFilteredData] = useState(earthquakeData);  // Filtered data state

    // Handle keyword input change
    const handleInputChange = (e) => {
        setKeyword(e.target.value);
    };

    const handleFilter = () => {
        const lowerKeyword = keyword.toLowerCase();
    
        // If the input is empty, reset to full earthquake data
        if (lowerKeyword === '') {
            setFilteredData(earthquakeData);
            return;
        }
    
        const filtered = earthquakeData.filter(quake => 
            quake.location.toLowerCase().includes(lowerKeyword) ||  // Match location (city)
            quake.magnitude.toString().includes(lowerKeyword)       // Match magnitude
        );
    
        setFilteredData(filtered);
    };
    const handleReset = () => {
        setKeyword(''); // Clear the input field
        setFilteredData(earthquakeData); // Reset map to show all earthquakes
    };
    return (
        <>
            {/* Keyword Input and Filter Button */}
            <Box display="flex" justifyContent="center" marginBottom={2}>
                <TextField
                placeholder='Enter keyword'
                     sx={{ padding: '5px', marginRight: '5px', fontSize: '14px' }}
                    variant="outlined"
                    value={keyword}
                    onChange={handleInputChange}
                />
                <Button variant="contained" color="primary"
                 style={{ padding: '30px 24px', marginRight: '5px', fontSize: '14px', height:"13px" }}
                 onClick={handleFilter} sx={{ marginLeft: 2 }}>
                    Filter
                </Button>
                <Button variant="contained" color="secondary"
                 style={{padding: '30px 24px', marginRight: '5px', fontSize: '14px', height:"13px"  }}
                onClick={handleReset} sx={{ marginLeft: 2 }}>
                    clear Filter
                </Button>
            </Box>

            {/* Map Component */}
            <MapContainer
                center={[38.9637, 35.2433]}
                zoom={6}
                scrollWheelZoom={true}
                style={{ height: '80vh', width: '100%' }}
            >
                <LayersControl position="topright">
                    <LayersControl.BaseLayer checked name="OpenStreetMap">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                    </LayersControl.BaseLayer>

                    {filteredData.map((quake) => (
                        <CircleMarker
                            key={quake.location}
                            center={[quake.lat, quake.lng]}
                            radius={getRadiusByMagnitude(quake.magnitude)}
                            fillColor={getColorByMagnitude(quake.magnitude)}
                            color={getColorByMagnitude(quake.magnitude)}
                            fillOpacity={0.6}
                        >
                            <Popup>
                                <strong>{quake.location}</strong><br />
                                Magnitude: {quake.magnitude}<br />
                                Depth: {quake.depth} km<br />
                                Latitude: {quake.lat}<br />
                                Longitude: {quake.lng}
                            </Popup>
                        </CircleMarker>
                    ))}
                </LayersControl>

                {/* Legend Component */}
                <Legend />
            </MapContainer>
        </>
    );
};

export default MapComponent;

// Loader for async data (if needed)
const Loader = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: "8rem",
    alignItems: 'center',
}));
