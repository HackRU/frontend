import React, { Component } from "react";
import {Doughnut, HorizontalBar} from "react-chartjs-2";

class Recap extends Component {
    render() {
        const data1 = {
            labels: ["Men","Women","Others"],
            datasets: [{
                data: [70, 23, 7],
                backgroundColor: ["#62dbff","#91afff","#91ffe1"],
                hoverBackgroundColor: ["#58c5e5","#628dff","#74ccb4"],
                borderWidth: 0.5,
            }],
        };
        const data2 = {
            labels: ["Asian/Pacific Islander","White/Caucasian","Hispanic", "Black/African American", "Others"],
            datasets: [{
                data: [60, 20, 6, 4, 10],
                backgroundColor: ["#ff8f6d","#ffd562","#ff6d94","#e397ff","#97e07c"],
                hoverBackgroundColor: ["#ff6f43","#ffce49","#ff5885","#dd82ff","#74d650"],
                borderWidth: 0.3,
            }]
        };
        const data3 = {
            labels: ["Computer Science","Electrical and Computer Engineering","Informaiton Technology", "Electrical Engineering"],
            datasets: [{
                data: [50, 13, 4.5, 4.5],
                backgroundColor: ["#FFF5e8","#ccc4b9","#7f7a74","#4c4945"],
                hoverBackgroundColor: ["#e5dcd0","#b2aba2","#66625c","#33312e"],
                borderWidth: 0,
            }]
        };
        const data4 = {
            labels: ["2019","2020","2021","2022"],
            datasets: [{
                data: [24, 27, 26, 22],
                backgroundColor: ["#FFDF00","#39d688","#8166db", "#ef8368"],
                hoverBackgroundColor: ["#e5c800","#26b66e","#6f50d6","#ed7051"],
                borderWidth: 0,
            }]
        };
        const legendOpts1 = {display: true,position: "bottom",fullWidth: true,reverse: false,labels: {fontColor: "#FFFFFF", fontSize: 16, padding: 14}};
        const legendOpts2 = {display: true,position: "bottom",fullWidth: true,reverse: false,labels: {fontColor: "#FFFFFF", fontSize: 16, padding: 14}};
        const legendOpts3 = {display: true,position: "bottom",fullWidth: true,reverse: false,labels: {fontColor: "#FFFFFF", fontSize: 16, padding: 14}};
        const legendOpts4 = {display: false};
 
        return(
     
            <div className="content">
                <div>
                    <h1 className="display-4 theme-font">Recap Spring 2019</h1><hr />
                </div>

                <div className="row">
                    <div className="col-lg-3">
                        <div className="hpanel testimo-panel text-center pd">
                            <h4 className="zoom">80%</h4><div><h3>Hackers From Rutgers University</h3></div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="hpanel testimo-panel text-center pd">
                            <h4 className="zoom">87%</h4><div><h3>Undergraduates Hackers</h3></div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="hpanel testimo-panel text-center pd">
                            <h4 className="zoom">607 <i className="fa fa-caret-up gold fa-sm"></i></h4><div><h3>Total Hackers</h3></div>
                        </div>
                    </div>
                    <div className="col-lg-3 pd">
                        <div className="hpanel pd">
                            <h4>Graduation Year</h4>
                            <div><HorizontalBar data={data4}
                                options={{maintainAspectRatio: false, scales: { xAxes: [{ ticks: {beginAtZero:true, fontColor:"white"}, gridLines: {offsetGridLines: true} }], yAxes:[{ticks:{fontColor:"white"}}] }}}
                                width={250}
                                height={200}
                                legend={legendOpts4}/></div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-4">
                        <div className="hpanel pd">
                            <div><Doughnut data={data1}
                                options={{maintainAspectRatio: false}}
                                width={250}
                                height={250}
                                legend={legendOpts1}/></div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="hpanel pd">
                            <div><Doughnut data={data2}
                                options={{maintainAspectRatio: false}}
                                width={300}
                                height={300}
                                legend={legendOpts2}/></div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="hpanel pd">
                            <div><Doughnut data={data3}
                                options={{maintainAspectRatio: false}}
                                width={250}
                                height={250}
                                legend={legendOpts3}/></div>
                        </div>
                    </div>
                </div>

                <br></br><div className="pd"></div>

            </div>
        );
    }
}

export default Recap;