import React, { Component } from "react";
import {Doughnut, HorizontalBar} from 'react-chartjs-2';



class Recap extends Component {
    render() {
        const data1 = {
            labels: ['Men','Women','Others'],
            datasets: [{
                data: [70, 23, 7],
                backgroundColor: ['#95e7ff','#91afff','#91ffe1'],
                hoverBackgroundColor: ['#62dbff','#628dff','#62ffd5'],
                borderWidth: 0.5,
            }],
        };
        const data2 = {
            labels: ['Asian/Pacific Islander','White/Caucasian','Hispanic', 'Black/African American', 'Others'],
            datasets: [{
                data: [53, 27, 6, 4, 10],
                backgroundColor: ['#ff7349','#ffd562','#ff6d94','#e397ff','#97e07c'],
                hoverBackgroundColor: ['#ff5f2f','#ffce49','#ff5885','#dd82ff','#74d650'],
                borderWidth: 0.3,
            }]
        };
        const data3 = {
            labels: ['Computer Science','Computer Engineering','Others'],
            datasets: [{
                data: [70, 14, 16],
                backgroundColor: ['#db6685','#e07cc9','#8166db'],
                hoverBackgroundColor: ['#d65074','#db66c0','#6f50d6'],
                borderWidth: 0,
            }]
        }
        const data4 = {
            labels: ['2019','2020','2021','2022'],
            datasets: [{
                data: [25, 26, 21, 21],
                backgroundColor: ['#db6685','#e07cc9','#8166db', '#ef8368'],
                hoverBackgroundColor: ['#d65074','#db66c0','#6f50d6','#ed7455'],
                borderWidth: 0,
            }]
        }
        const legendOpts1 = {display: true,position: 'bottom',fullWidth: true,reverse: false,labels: {fontColor: '#FFFFFF', fontSize: 16, padding: 14}};
        const legendOpts2 = {display: true,position: 'bottom',fullWidth: true,reverse: false,labels: {fontColor: '#FFFFFF', fontSize: 16, padding: 14}};
        const legendOpts3 = {display: true,position: 'bottom',fullWidth: true,reverse: false,labels: {fontColor: '#FFFFFF', fontSize: 16, padding: 14}};
        const legendOpts4 = {display: false}
 
        return(
     
        <div class="content">
        <div>
            <h1 className="display-4 theme-font">Recap Fall 2018</h1><hr />
        </div>

        <div class="row">
            <div class="col-lg-3">
                <div class="hpanel testimo-panel text-center pd">
                        <h4 class="zoom">83%</h4><div><h3>Hackers From Rutgers University</h3></div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="hpanel testimo-panel text-center pd">
                    <h4 class="zoom">88%</h4><div><h3>Undergraduates Hackers</h3></div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="hpanel testimo-panel text-center pd">
                    <h4 class="zoom">575 <i class="fa fa-caret-up gold fa-sm"></i></h4><div><h3>Total Hackers</h3></div>
                </div>
            </div>
            <div class="col-lg-3 pd">
                <div class="hpanel pd">
                    <h4>Graduation Year</h4>
                    <div><HorizontalBar data={data4} options={{maintainAspectRatio: false, scales: { xAxes: [{ ticks: {beginAtZero:true, fontColor:'white'}, gridLines: {offsetGridLines: true} }], yAxes:[{ticks:{fontColor:'white'}}] }}} width={250} height={200} legend={legendOpts4}/></div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-4">
                <div class="hpanel pd">
                    <div><Doughnut data={data1} options={{maintainAspectRatio: false}} width={250} height={250} legend={legendOpts1}/></div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="hpanel pd">
                    <div><Doughnut data={data2} options={{maintainAspectRatio: false}} width={300} height={300} legend={legendOpts2}/></div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="hpanel pd">
                    <div><Doughnut data={data3} options={{maintainAspectRatio: false}} width={250} height={250} legend={legendOpts3}/></div>
                </div>
            </div>
        </div>

        <br></br><div class="pd"></div>

        </div>
        )
    }
}

export default Recap;