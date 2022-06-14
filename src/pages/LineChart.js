import moment from 'moment'
import React from 'react'
import { Line } from 'react-chartjs-2'
function LineChart({ graphData }) {
    // console.log(graphData.cancel && graphData.cancel[0].map(e=>e.total))
    let cancel_dataset=graphData.cancel && graphData?.cancel[0].map(e => e.total)
    let status_y =graphData.cancel && graphData?.cancel[0].map(e => e?.month ? e?.month :e?.date)

    let pending_dataset=graphData.pending && graphData?.pending[0].map(e => e.total)
    // let pending_months = graphData?.pending[0].map(e => e?.month ? e?.month :e?.date)

    let success_dataset=graphData.success && graphData?.success[0].map(e => e.total)
    // let success_months = graphData?.success[0].map(e => e?.month ? e?.month :e?.date)
    return (
        <div>
            <Line
                data={{
                    labels: status_y,
                    datasets: [{
                        lineTension: 0.5,
                        label: 'Cancel Order Statistics',
                        data: cancel_dataset,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                           
                        ],
                        borderWidth: 4
                    },
                    {
                        lineTension: 0.5,
                        label: 'Pending Order Statistics',
                        data: pending_dataset,
                        // data: [0, 8, 5, 7, 4, 5],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                          
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                           
                        ],
                        borderWidth: 4
                    },
                    {
                        lineTension: 0.5,
                        label: 'Success Order Statistics',
                        data: success_dataset,
                        // data: [0, 8, 5, 7, 4, 5],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            '#07bc0c'
                           
                           
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            '#20c997'
                           
                        ],
                        borderWidth: 4
                    },
                ],
                    options: {
                        showTooltips: true,
                        scales: {
                            // scaleSteps: 2,
                            yAxes: [{
                                ticks: {
                                    max: 5,
                                    min: 0,
                                    stepSize: 2    
                                }
                              }]
                        },

                    }
                }}

            />
        </div>
    )
}

export default LineChart
