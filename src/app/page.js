"use client"
import DonutChart from "./components/DountChart";
// import HeatMapChart from "./components/HeatmapChart";
 

import { Box, Typography } from '@mui/material';
import HeatMapChart from "./components/HeatmapChart";
import HeatmapChartss from "./components/HeatmapChartss";

const Home = () => {




  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem", marginTop: "1rem" }}>
      <Typography
        variant="h6"

        sx={{
          textAlign: "center",
          fontSize:"2rem"
        }}>Earthquake Chart</Typography>
      <DonutChart />
  <HeatMapChart />
{/* 
  <HeatmapChartss /> */}
    </Box>
  );
}

export default Home;
