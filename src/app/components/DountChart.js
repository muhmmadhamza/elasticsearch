"use client";
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles'; 
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
const DonutChart = () => {
  const [chartData, setChartData] = useState([0, 0, 0]); 
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchDonutData = async () => {
      try {
        const response = await axios.get('/api/elasticsearch');
        const donutData = response.data.donutData; 
        const counts = {
          positive: 0,
          negative: 0,
          neutral: 0,
        };

        donutData.forEach(item => {
          if (item.sentiment.toLowerCase() === 'positive') {
            counts.positive = item.count;
          } else if (item.sentiment.toLowerCase() === 'negative') {
            counts.negative = item.count;
          } else if (item.sentiment.toLowerCase() === 'neutral') {
            counts.neutral = item.count;
          }
        });

        setChartData([counts.positive, counts.negative, counts.neutral]);
      } catch (error) {
        console.error('Error fetching donut data:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchDonutData();
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return null;
  }

  const options = {
    chart: {
      type: 'donut',
    },
    title: {
      text: 'Dount Chart',
      align: 'center',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#000',
      },
    },
    labels: ['Positive', 'Negative', 'Neutral'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  if (!mounted) {
    return null;
  }

  return (
    <CenteredContainer>
      {loading ? (
        <>
          <CircularProgress sx={{ color: 'red' }} /> 
          <Typography variant="h6" marginTop={2}>Loading...</Typography> 
        </>
      ) : (
        <ChartWrapper>
 <Chart options={options} series={chartData} type="donut" width="380" />
        </ChartWrapper>
       
      )}
    </CenteredContainer>
  );
};

export default DonutChart;




const CenteredContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50vh',
  flexDirection: 'column',
}));

const ChartWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '600px',
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'center', 
  alignItems: 'center',
  backgroundColor: '#fff',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3], 
}));




