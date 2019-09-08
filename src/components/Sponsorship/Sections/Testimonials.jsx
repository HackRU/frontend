import React, { Component } from "react";


class Testimonials extends Component {
    render() {
        return(
            <div class="content">
            <div>
                <h1 className="display-4 theme-font">Testimonials</h1><hr />
            </div>

            <div class="row">
                <div class="col-lg-3">
                    <div class="hpanel testimo-panel text-center">
                        <div> 
                            <img alt="logo" class="img-fluid img-circle m-b"src="./assets/testimonials/t1.png"></img>
                            <h3>Suzanne Link</h3>
                            <div class="font-bold m-b-xs">Human Resource Management, Senior</div><hr />
                            <p>
                                "Hi everyone! Last year I attended HackRU, and it was an awesome experience. Even as someone with no background in ITI/ Computer Science, I was welcomed and included. I had a great time meeting new people and learning new skills. 10/10 would recommend!"
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="hpanel testimo-panel text-center">
                        <div>
                            <img alt="logo" class="img-fluid img-circle m-b" src="./assets/testimonials/t2.png"></img>
                            <h3>Rishab Chawla</h3>
                            <div class="font-bold m-b-xs">Computer Science, Junior</div><hr />
                            <p>
                                "Built from the ground up, HackRU was the first hackathon to express the true essence of flavor. Capturing the natural characteristics of only the finest ingredients, HackRU is exceptional in taste - thanks to the personal commitment of the sponsors and organizers."
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="hpanel testimo-panel text-center">
                        <div >
                            <img alt="logo" class="img-fluid img-circle m-b" src="./assets/testimonials/t3.png"></img>
                            <h3>Elaine Huang</h3>
                            <div class="font-bold m-b-xs">Neuroscience and Philosophy, Senior</div><hr />
                            <p>
                                "HackRU is where my programming journey began-- I actually downloaded Python at my first HackRU. The focused and collaborative environment, coupled with the presence of patient mentors, was incredibly conducive to learning. I felt welcome even as a complete novice to computer science!"
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="hpanel testimo-panel text-center">
                        <div>
                            <img alt="logo" class="img-fluid img-circle m-b" src="./assets/testimonials/t4.png"></img>
                            <h3>Ben Yang</h3>
                            <div class="font-bold m-b-xs">Rutgers School of Arts and Science</div><hr />
                            <p>
                                "HackRU Spring 2018 was a really fun and exciting experience - from food to workshops to speakers, the venue really had everything! But aside from all that, it was also a really great experience to just sit down and learn with other people, regardless of whether they were my friends or not. While I wasn't able to finish my project, I was really happy that I learned something valuable at the end of the day."
                            </p>
                        </div>
                    </div>
                </div>
                
            </div>
            </div>
        )
    }
}

export default Testimonials;