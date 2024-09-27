
import DonutChart from "./components/DountChart";
import { Box, Typography } from '@mui/material';
import HeatMapChart from "./components/HeatmapChart";
import dynamic from 'next/dynamic';
const MapComponent = dynamic(() => import('./components/Map'), { ssr: false });
const Home = () => {
  // const earthquakeData = [
  //   { lat: 38.9637, lng: 35.2433, magnitude: 6.5, depth: 10, location: "Central Turkey" },
  //   { lat: 39.9208, lng: 32.8541, magnitude: 5.2, depth: 15, location: "Ankara, Turkey" },
  //   { lat: 40.1828, lng: 29.0669, magnitude: 6.0, depth: 12, location: "Bursa, Turkey" },
  //   { lat: 41.0082, lng: 28.9784, magnitude: 7.0, depth: 20, location: "Istanbul, Turkey" },
  //   { lat: 37.0662, lng: 37.3833, magnitude: 5.6, depth: 18, location: "Gaziantep, Turkey" },
  //   { lat: 38.4237, lng: 27.1428, magnitude: 6.1, depth: 14, location: "Izmir, Turkey" },
  //   { lat: 37.0022, lng: 35.3213, magnitude: 5.4, depth: 10, location: "Adana, Turkey" },
  //   { lat: 39.9334, lng: 32.8597, magnitude: 4.5, depth: 8, location: "Ankara, Turkey" },
  //   { lat: 41.0151, lng: 28.979, magnitude: 5.1, depth: 15, location: "Istanbul, Turkey" },
  //   { lat: 38.9637, lng: 35.2433, magnitude: 6.5, depth: 12, location: "Central Turkey" },
  // ];



  return (
    // <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem", marginTop: "1rem" }}>
     



   <>
    <Typography
        variant="h6"

        sx={{
          textAlign: "center",
          fontSize: "2rem"
        }}>Earthquake Map</Typography>
      {/* <Box >

        <DonutChart />
        <HeatMapChart />
      </Box> */}
      <MapComponent  />
   
   </>
  );
}

export default Home;