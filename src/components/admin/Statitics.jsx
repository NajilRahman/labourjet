import React, { useEffect, useState } from 'react'
import { AgCharts } from 'ag-charts-react';
import { Col, Row } from 'react-bootstrap';

function Statitics({data,setRender}) {
  var userCount=data.filter(item=>item.userType=='user').length
  var employeeCount=data.filter(item=>item.userType=='employee').length
  var adminCount=data.filter(item=>item.userType=='admin').length

  useEffect(() => {
    setRender(userCount)
    }, [userCount])
  
  const [chartOptions, setChartOptions] = useState({
    // Data: Data to be displayed in the chart
    data: [
      { month: 'Jan', avgTemp: 2.3, iceCreamSales: 162000 },
      { month: 'Mar', avgTemp: 6.3, iceCreamSales: 302000 },
      { month: 'May', avgTemp: 16.2, iceCreamSales: 800000 },
      { month: 'Jul', avgTemp: 22.8, iceCreamSales: 1254000 },
      { month: 'Sep', avgTemp: 14.5, iceCreamSales: 950000 },
      { month: 'Nov', avgTemp: 8.9, iceCreamSales: 200000 },
    ],
    // Series: Defines which chart type and data to use
    series: [{ type: 'bar', xKey: 'month', yKey: 'iceCreamSales' }],
  });

  function getData() {
    return [
      { asset: "Users", amount:userCount },
      { asset: "Employees", amount: employeeCount },
      { asset: "Admin", amount: adminCount },
    ];
  }
  const [options, setOptions] = useState({
    data: getData(),
    title: {
      text: "User Data",
    },
    series: [
      {
        type: "pie",
        angleKey: "amount",
        calloutLabelKey: "asset",
        sectorLabelKey: "amount",
        sectorLabel: {
          color: "white",
          fontWeight: "bold",
          formatter: ({ value }) => `${(value).toFixed(0)}`,
        },
      },
    ],
  });
  return (
    <div>
      <Row>
        <Col>
          <div class="card-statistic-3 p-4">
            <div class="card-icon card-icon-large"></div>
            <div class="mb-4">
              <h5 class="card-title mb-0">Users</h5>
            </div>
            <div class="row align-items-center mb-2 d-flex">
              <div class="col-8">
                <h2 class="d-flex align-items-center mb-0">
                  {userCount}
                </h2>
              </div>
              <div class="col-4 text-right">
                <span>{(userCount*100/data.length).toFixed()} %<i class="fa fa-arrow-up"></i></span>
              </div>
            </div>
            <div class="progress mt-1 " data-height="8" style={{height: '8px'}}>
              <div class="progress-bar l-bg-cyan " style={{width:`${userCount*100/data.length}%`}} role="progressbar" data-width="25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" ></div>
            </div>
          </div>



          <div class="card-statistic-3 p-4">
            <div class="card-icon card-icon-large"></div>
            <div class="mb-4">
              <h5 class="card-title mb-0">Employee</h5>
            </div>
            <div class="row align-items-center mb-2 d-flex">
              <div class="col-8">
                <h2 class="d-flex align-items-center mb-0">
                  {employeeCount}
                </h2>
              </div>
              <div class="col-4 text-right">
                <span>{(employeeCount*100/data.length).toFixed()} %<i class="fa fa-arrow-up"></i></span>
              </div>
            </div>
            <div class="progress mt-1 " data-height="8" style={{height: '8px'}}>
              <div class="progress-bar l-bg-cyan " role="progressbar" style={{width:`${employeeCount*100/data.length}%`}} data-width="25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" ></div>
            </div>
          </div>



          <div class="card-statistic-3 p-4">
            <div class="card-icon card-icon-large"></div>
            <div class="mb-4">
              <h5 class="card-title mb-0">Admin</h5>
            </div>
            <div class="row align-items-center mb-2 d-flex">
              <div class="col-8">
                <h2 class="d-flex align-items-center mb-0">
                  {adminCount}
                </h2>
              </div>
              <div class="col-4 text-right">
                <span>{(adminCount*100/data.length).toFixed()}%<i class="fa fa-arrow-up"></i></span>
              </div>
            </div>
            <div class="progress mt-1 " data-height="8" style={{height: '8px'}}>
              <div class="progress-bar l-bg-cyan " style={{width:`${adminCount*100/data.length}%`}} role="progressbar" data-width="25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" ></div>
            </div>
          </div>



          
        </Col>
        <Col>
          <AgCharts options={options} />

        </Col>
      </Row>
      <AgCharts options={chartOptions} className='my-5' />


    </div>
  )
}

export default Statitics
