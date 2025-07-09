// DonutChart.js
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
// import { l } from 'vitest/dist/index-9f5bc072';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const DonutChart = (props) => {
  console.log(props)
  let total_count = parseInt(props?.props?.props?.Funding_Distrubuted_data?.Total_teams_count_by_program?.Total_Pratham_count) + parseInt(props?.props?.props?.Funding_Distrubuted_data?.Total_teams_count_by_program?.Total_Akshar_count) + parseInt(props?.props?.props?.graduated_startups) + parseInt(props?.props?.props?.dropped_startups) ;
  const data = {
    labels: ['Pratham', 'Akshar', 'Active', 'Graduated'],
    datasets: [
      {
        label: 'My Donut Chart',
        data: [
          parseInt(props?.props?.props?.Funding_Distrubuted_data?.Total_teams_count_by_program?.Total_Pratham_count || 0),
          parseInt(props?.props?.props?.Funding_Distrubuted_data?.Total_teams_count_by_program?.Total_Akshar_count || 0),
          parseInt(props?.props?.props?.graduated_startups|| 0),
          parseInt(props?.props?.props?.dropped_startups || 0),
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

  const textCenter = {
    id: 'textCenter',
    beforeDatasetsDraw(chart, args, pluginOptions){
      const {ctx} = chart;
      ctx.save();
      ctx.font = 'bolder 15px sans-serif';
      ctx.fillStyle = '#464646';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`Total: ${total_count}`, chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y);
    }
  }
  return (
    <div>
      {/* <h2>Donut Chart</h2> */}
      <Doughnut data={data} options={options} plugins={[textCenter]}/>
    </div>
  );
};

export default DonutChart;
