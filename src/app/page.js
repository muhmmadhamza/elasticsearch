import DonutChart from "./components/DountChart";
import HeatmapChart from "./components/HeatmapChart";

import { Box, Typography } from '@mui/material';

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
      <HeatmapChart />
    </Box>
  );
}

export default Home;