import React, { Component } from "react";


class Testimonials extends Component {
    render() {
        return(
            <div className="content">
                <div>
                    <h1 className="display-4 theme-font">Testimonials</h1><hr />
                </div>

                <div className="row">
                    <div className="col-lg-3">
                        <div className="hpanel testimo-panel text-center">
                            <div> 
                                <img alt="logo"
                                    className="img-fluid img-circle m-b"
                                    src="./assets/testimonials/t1.png"></img>
                                <h3>Sunny Feng</h3>
                                <div className="font-bold m-b-xs">Electrical and Computer Engineering, Computer Science, 2020</div><hr />
                                <p>
                               Not only was I able to work on personal projects at HackRU, I also got to interact with its sponsoring companies. At my first HackRU, I won s challenge with a healthy shopping app and got to present my hack to the s Vice President of Technology. This led me to an internship with Wakefern the summer after my freshman year. At my second HackRU, I won s challenge with a music/movie data science project and was connected to the recruiter there. HackRU has allowed me to establish close relationships with companies in a way I couldn't have otherwise.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="hpanel testimo-panel text-center">
                            <div>
                                <img alt="logo"
                                    className="img-fluid img-circle m-b"
                                    src="./assets/testimonials/t2.png"></img>
                                <h3>Naeem Hossain</h3>
                                <div className="font-bold m-b-xs">Computer Science, Information Technology and Informatics, 2018</div><hr />
                                <p>
                                "Hackathons are a really organic way to make friends and find a niche in the tech community. At HackRU, I was able to build hacks with incredibly talented people, travel to lots of new places, and drink irresponsible amounts of coffee! I obtained a summer internship with Prudential for my junior year thanks to HackRU. I also loved attending for some superficial (but still valid) reasons - like playing four games of Jenga in a row to get pajamas!"
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="hpanel testimo-panel text-center">
                            <div >
                                <img alt="logo"
                                    className="img-fluid img-circle m-b"
                                    src="./assets/testimonials/t3.png"></img>
                                <h3>Mihai Andrei</h3>
                                <div className="font-bold m-b-xs"> Mathematics & Computer Science, 2019</div><hr />
                                <p>
                            "I was given the opportunity to speak with company representatives and recruiters sponsoring the event and some of the conversations I had eventually turned into internship offers for the summer. In fact, my sophomore summer internship at Prudential and my junior summer internship at MongoDB arose from the connections I made and the network I built at Rutgers. In addition, my involvement with HackRU as the 2018-19 Executive Director allowed me to build a stronger Computer Science community and make many friends. I was also able to sharpen my leadership skills. Without a doubt, my involvement with HackRU has been one of the most important experiences during my time at Rutgers."                               
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="hpanel testimo-panel text-center">
                            <div>
                                <img alt="logo"
                                    className="img-fluid img-circle m-b"
                                    src="./assets/testimonials/t4.png"></img>
                                <h3>Joyce Van Drost</h3>
                                <div className="font-bold m-b-xs"> Psychology & Computer Science, 2018</div><hr />
                                <p>
                                "My two years as Marketing Director for HackRU has really shaped my college experience. I was able to better my marketing skills with social media marketing while learning more about graphic design. I was also able to improve upon my public speaking skills by taking the lead on public announcements. Overall, it was great to get to know and interact with the community and build relationships throughout each new hackathon I attended. In fact, HackRU helped me land the job I have today! Interacting with all the Sponsors at the event was always a good time and it was great to learn about their respective companies in a smaller and more intimate exchange just by walking up to their table."
                                </p>
                            </div>
                        </div>
                    </div>
                
                </div>
            </div>
        );
    }
}

export default Testimonials;