// DonutChart.js
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const SectorWise = (props) => {
  console.log(props)

  let count_sector =  parseInt(props?.props?.props?.Energy_sector_startups) + parseInt(props?.props?.props?.Software_sector_startups) + parseInt(props?.props?.props?.manufacturing_sector_startups) + parseInt(props?.props?.props?.Agriculture_sector_startups) + parseInt(props?.props?.props?.Hardware_sector_startups) + parseInt(props?.props?.props?.Edtech_sector_startups) +  parseInt(props?.props?.props?.services_sector_startups) + parseInt(props?.props?.props?.Ecommerce_sector_startups) + parseInt(props?.props?.props?.Social_sector_startups)

  const data = {
    labels: ['Energy & Environment', 'Software & Data', 'Manufacturing & Industry', 'Agriculture & Food', 'Hardware & IoT', 'Edtech', 'Services', 'Ecommerce & Retail', 'Social & Leisure'],
    datasets: [
      {
        label: 'My Donut Chart',
        data: [
          parseInt(props?.props?.props?.Energy_sector_startups || 0),
          parseInt(props?.props?.props?.Software_sector_startups || 0),
          parseInt(props?.props?.props?.manufacturing_sector_startups|| 0),
          parseInt(props?.props?.props?.Agriculture_sector_startups || 0),
          parseInt(props?.props?.props?.Hardware_sector_startups || 0),
          parseInt(props?.props?.props?.Edtech_sector_startups || 0),
          parseInt(props?.props?.props?.services_sector_startups || 0),
          parseInt(props?.props?.props?.Ecommerce_sector_startups || 0),
          parseInt(props?.props?.props?.Social_sector_startups || 0),
        ],
        backgroundColor: [
          '#45C74D80',
          '#FFB866',
          '#C8DFFF',
          '#FADADA'
        ],
        borderColor: [
          'rgba(255, 255, 255)',
          'rgba(255, 255, 255)',
          'rgba(255, 255, 255)',
        ],
        borderWidth: 0.2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += `${context.parsed}`;
            }
            return label;
          },
        },
      },
    },
  };

  const textCenterr = {
    id: 'textCenter',
    beforeDatasetsDraw(chart, args, pluginOptions){
      const {ctx} = chart;
      ctx.save();
      ctx.font = 'bolder 15px sans-serif';
      ctx.fillStyle = '#464646';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`Total: ${count_sector}`, chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y);
    }
  }

  return (
    <div>
      <Doughnut data={data} options={options} plugins={[textCenterr]}/>
    </div>
  );
};

export default SectorWise;
