import React, { useEffect, useRef } from "react";
import { useAAContext } from "../context/Context";
import * as echarts from "echarts";

const BarChart = () => {
  const chartRef = useRef(null);
  const { records, setRecords } = useAAContext();

    useEffect(() => {
        // Assuming records is an array of objects like the given record
        // Map the required fields from the first 10 records
        const firstTenRecords = records.slice(0, 10);
        const avgAQI_CO = firstTenRecords.map(record => parseFloat(record.avgAQI_CO));
        const avgAQI_O3 = firstTenRecords.map(record => parseFloat(record.avgAQI_O3));
        const avgAQI_SO2 = firstTenRecords.map(record => parseFloat(record.avgAQI_SO2));
        const avgAQI_NO2 = firstTenRecords.map(record => parseFloat(record.avgAQI_NO2));

    var myChart = echarts.init(chartRef.current);

        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {},
            grid: {
                left: '2%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value'
            },
            yAxis: {
                type: 'category',
                // Update category data with city names or other relevant identifiers
                data: firstTenRecords.map(record => record.city)
            },
            series: [
                {
                    name: 'CO',
                    type: 'bar',
                    stack: 'total',
                    label: { show: true },
                    emphasis: { focus: 'series' },
                    data: avgAQI_CO
                }, {
                    name: 'O3',
                    type: 'bar',
                    stack: 'total',
                    label: { show: true },
                    emphasis: { focus: 'series' },
                    data: avgAQI_O3
                }, {
                    name: 'SO2',
                    type: 'bar',
                    stack: 'total',
                    label: { show: true },
                    emphasis: { focus: 'series' },
                    data: avgAQI_SO2
                }, {
                    name: 'NO2',
                    type: 'bar',
                    stack: 'total',
                    label: { show: true },
                    emphasis: { focus: 'series' },
                    data: avgAQI_NO2
                }
            ]
        };

    myChart.setOption(option);

    window.addEventListener("resize", function () {
      myChart.resize();
    });

    return () => window.removeEventListener("resize", myChart.resize);
  }, [records]); // Add records to dependency array to re-render chart when records change

  return <div ref={chartRef} style={{ width: "100%", height: "600px" }} />;
};

export default BarChart;