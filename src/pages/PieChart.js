import React from 'react'
import {Doughnut} from 'react-chartjs-2'
function PieChart({graphData}) {

  // let cancel_dataset=graphData.cancel && graphData?.cancel[0].map(e => e.total)
  let status_y =graphData.cancel && graphData?.cancel[0].map(e => e?.month ? e?.month :e?.date)

  let pending_dataset=graphData.pending && graphData?.pending[0].map(e => e.total)

  let success_dataset=graphData.success && graphData?.success[0].map(e => e.total)
    return (
        <div>
            <Doughnut
                data={{
                    labels: status_y,
                    datasets: [
                         {
                          data: success_dataset,
                         // data: [0, 10, 5, 4, 8, 3],
                          backgroundColor: [
                            "red", "green" ,  'rgba(54, 162, 235, 1)', 
                           ], 
                           label: 'Success'
                         }
                      ],
                        borderWidth: 10 ,
                        options: {
                          legend: {
                              display: false
                          },
                      }
                }}
            />
        </div>
    )} 

  export default PieChart  