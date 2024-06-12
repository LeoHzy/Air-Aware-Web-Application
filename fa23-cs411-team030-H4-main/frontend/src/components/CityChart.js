import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const CityChart = ({ record }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (!record) return;

        const myChart = echarts.init(chartRef.current);

        const totalValue = parseFloat(record.avgAQI_CO) + parseFloat(record.avgAQI_O3) + parseFloat(record.avgAQI_NO2) + parseFloat(record.avgAQI_SO2);

        const option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'center',
                selectedMode: false
            },
            series: [
                {
                    name: 'Pollution Types',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    center: ['50%', '70%'],
                    startAngle: 180,
                    label: {
                        show: true,
                        formatter: function(param) {
                            return `${param.name} (${Math.round(param.value / totalValue * 200)}%)`;
                        }
                    },
                    data: [
                        { value: parseFloat(record.avgAQI_CO), name: 'CO' },
                        { value: parseFloat(record.avgAQI_O3), name: 'O3' },
                        { value: parseFloat(record.avgAQI_NO2), name: 'NO2' },
                        { value: parseFloat(record.avgAQI_SO2), name: 'SO2' },
                        { 
                            value: totalValue,
                            itemStyle: { color: 'none', decal: { symbol: 'none' } },
                            label: { show: false }
                        }
                    ]
                }
            ]
        };

        myChart.setOption(option);

        window.addEventListener('resize', () => myChart.resize());
        return () => window.removeEventListener('resize', myChart.resize);
    }, [record]);

    return <div ref={chartRef} style={{ width: '100%', height: '580px' }} />;
};

export default CityChart;