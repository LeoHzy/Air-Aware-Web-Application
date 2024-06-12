import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import config from '../config';
import * as echarts from 'echarts';
import { Typography } from '@material-ui/core';

const ActiveUser = () => {
  const chartRef = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (chartRef.current && !chart) {
      setChart(echarts.init(chartRef.current));
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${config.SERVER_URL}/users`);
        updateChartData(response.data);
      } catch (error) {
        console.error("Error retrieving users", error);
      }
    };

    fetchUsers();
  }, [chart]);

  const updateChartData = (users) => {
    const activeLevelCounts = users.reduce((acc, user) => {
      acc[user.activeLevel] = (acc[user.activeLevel] || 0) + 1;
      return acc;
    }, {});

    const chartData = Object.keys(activeLevelCounts).map(key => ({
      value: activeLevelCounts[key],
      name: `Active Level ${key}`
    }));

    chart.setOption({
      title: {
        text: 'Active Users',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Active Level',
          type: 'pie',
          radius: '50%',
          data: chartData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    });
  };

  useEffect(() => {
    return () => {
      chart && chart.dispose();
    };
  }, [chart]);

  return (
    <div>
      <div ref={chartRef} style={{ width: '400px', height: '400px' }}></div>
    </div>
  );
};

export default ActiveUser;
