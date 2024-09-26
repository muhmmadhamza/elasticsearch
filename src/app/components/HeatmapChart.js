"use client";

import dynamic from 'next/dynamic';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import { Box, CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
const HeatMapChart = () => {
  const [mapData, setmapData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeatmapData = async () => {
      try {
        const response = await axios.get("/api/elasticsearch");
        const result = response.data.earthquakeLocations; 
        console.log(result);

        // const formattedData = result.map((item) => ({
        //   city: item.city,
        //   lat: item.lat,
        //   lon: item.lon,
        // }));
        const formattedData = result
        .map((item) => ({
          city: item.city,
          lat: item.lat,
          lon: item.lon,
        }))
        .sort((a, b) => a.lat - b.lat);
        setmapData(formattedData); 
      } catch (error) {
        console.error("Error fetching heatmap data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeatmapData();
  }, []);

 
  const heatmapData = [
    {
      name: "Latitude",
      data: mapData.map((city) => ({ x: city.city, y: city.lat })), 
    },
    {
      name: "Longitude",
      data: mapData.map((city) => ({ x: city.city, y: city.lon })), 
    },
  ];

  const chartOptions = {
    chart: {
      type: "heatmap",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 30,
              color: "#00A100",
              name: "Low",
            },
            {
              from: 31,
              to: 50,
              color: "#128FD9",
              name: "Medium",
            },
            {
              from: 51,
              to: 100,
              color: "#FFB200",
              name: "High",
            },
          ],
        },
      },
    },
    dataLabels: {
      enabled: false, 
    },
    xaxis: {
      categories: mapData.map((city) => city.city), 
      title: {
        text: "Cities",
      },
    },
    yaxis: {
      title: {
        text: "Coordinates", 
      },
      // labels: {
      //   formatter: (value, index) => (index === 0 ? "Latitude" : "Longitude"), 
      // },
    },
    title: {
      text: "Heatmap of Cities (Latitude & Longitude)",
      align: "center",
      style: {
        fontSize: "16px",
      },
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return value;
        },
      },
    },
  };

  return (
    <CenteredContainer>
      {loading ? (
        <Loader>
          <CircularProgress sx={{ color: "yellow" }} />
          <Typography variant="h6" marginTop={2}>
            Loading...
          </Typography>
        </Loader>
      ) : (
        <ChartWrapper>
          <Chart
            options={chartOptions}
            series={heatmapData}
            type="heatmap"
            height="350"
          />
        </ChartWrapper>
      )}
    </CenteredContainer>
  );
};

export default HeatMapChart;

const CenteredContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "80vh",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  width: "100%",
}));

const ChartWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "800px",
  overflow: "hidden",
  margin: "0 auto",
}));

const Loader = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));
