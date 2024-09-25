"use client";
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });



const HeatmapChart = () => {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    const fetchHeatmapData = async () => {
      try {
        const response = await axios.get('/api/elasticsearch');
        if (!response.data.heatmapData || !Array.isArray(response.data.heatmapData)) {
          throw new Error('Invalid data structure');
        }

        const filteredData = response.data.heatmapData.filter(item => item.Keywords === "Yes");

        const groupedData = {};
        filteredData.forEach(item => {
          const cleanedDate = new Date(Date.parse(item.created_at.replace('th', ''))); 
          
          if (isNaN(cleanedDate.getTime())) {
            console.error("Invalid date value:", item.created_at);
            return;
          }

          const dateString = cleanedDate.toISOString().split('T')[0];
          if (!groupedData[dateString]) {
            groupedData[dateString] = 0;
          }
          groupedData[dateString] += 1;
        });

        const chartData = Object.entries(groupedData).map(([date, count]) => ({
          x: date,
          y: count
        }));

        setHeatmapData([{ name: 'Keywords', data: chartData }]);
      } catch (error) {
        console.error('Error fetching heatmap data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeatmapData();
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const options = {
    chart: {
      type: 'heatmap',
      toolbar: {
        show: false,
      },
    },
    title: {
      text: 'Heatmap Chart',
      align: 'center',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#000',
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      formatter: () => {
        return "Yes";
      },
    },
    xaxis: {
      type: 'category',
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 50,
              color: '#128FD9',
              name: 'low',
            },
            {
              from: 51,
              to: 100,
              color: '#00A100',
              name: 'medium',
            },
            {
              from: 101,
              to: 150,
              color: '#FFB200',
              name: 'high',
            },
          ],
        },
      },
    },
  };

  return (
    <CenteredContainer>
      {loading ? (
        <Loader>
          <CircularProgress sx={{ color: 'yellow' }} />
          <Typography variant="h6" marginTop={2}>Loading...</Typography>
        </Loader>
      ) : (
        <ChartWrapper>
          <Chart options={options} series={heatmapData} type="heatmap" height="350" />
        </ChartWrapper>
      )}
    </CenteredContainer>
  );
};

export default HeatmapChart;




const CenteredContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '50vh',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden', 
  width: '100%', 
}));

const ChartWrapper = styled(Box)(({ theme }) => ({
  width: '100%', 
  maxWidth: '800px', 
  overflow: 'hidden', 
  margin: '0 auto', 
}));

const Loader = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));