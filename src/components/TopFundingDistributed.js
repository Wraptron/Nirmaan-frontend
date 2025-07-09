import React, {useState, useEffect, useCallback} from 'react';
import { Pie } from 'react-chartjs-2';
//import { useContext } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);
const TopFundingDistributed = (props) => {
    //let dataProps = props.selectedTopSectors;

  // const [dataa, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
  const ApiCall = useCallback(async() => {
        //let data = props.selectedTopSectors
        try 
        {
            const response = await axios.get(`http://localhost:3003/api/v1/st?id=${props.selectedTopSectors}`)
            const rows = response.data.rows;
            // setData(rows); // removed unused state
            setLabels(rows.map((dataObj) => dataObj.sector));
            setValues(rows.map((dataObj) => parseFloat(dataObj.sum)));
            //console.log(response);
        }
        catch(err)
        {   
            console.log(err.message)
        }
  }, [props.selectedTopSectors])
  useEffect(() => {
    ApiCall()
  }, [ApiCall])

  useEffect(() => {
    console.log("Labels:", labels);
    console.log("Values:", values);
  }, [labels, values]);
   //console.log(dataa.map((dataObj) => dataObj.sector));
   //console.log(labels);
  const data = {
    //labels: labels,
    datasets: [
      {
        labels: ' of Votes',
        data: values, 
        backgroundColor: [
          'rgba(141, 182, 196)',
          'rgb(96, 164, 189)',
          'rgba(102, 131, 140)',
          'rgba(123, 160, 181)',
          'rgba(141, 196, 201)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 255, 255)',
          'rgba(255, 255, 255)',
          'rgba(255, 255, 255)',
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
      labels: {
        usePointStyle: true,
        pointStyle: 'roundRect', 
      },
    },
  };

  return <div style={{width : '100%', maxWidth: '400px;',  height: 'auto', margin: '0 auto', padding: '10px'}}>
    {labels.length && values.length ? (
        <Pie data={data} options={options} />
      ) : (
        <p>Loading...</p>
    )}
  </div>;
};

export default TopFundingDistributed;
