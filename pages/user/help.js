import React from "react";
import AuthSidebar from "../../src/components/common/afterAuth/auth_sidebar";
import SeoMeta from "../../src/components/common/meta/seo_meta";

class Help extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: "english",
        }
    }

    render() {
        return (
            <>
                <SeoMeta title={"Help - Global Trade Plaza"}
                         description={"Best B2B Marketplace Platform and Top 10 b2b Portal in India is Global Trade Plaza. We are Business to Business Import Export Portal helping companies, Traders and Manufacturers to find Buyers"}
                />
                <section className="dashboard">
                    <div className="container-fluid main-content">
                        <div className="row">
                            <AuthSidebar active={"help"}/>
                            <div className="col-md-9 col-12 right p-gt">
                                <div className="col-12 t-box p-4">
                                    <div className="row align-items-center">
                                        <div className="col-md-5">
                                            <h4 className="mb-2 mt-2">Need help?</h4>
                                            <h5 className="fw-bold my-4">Get a tour of how it works at GlobalTradePlaza</h5>
                                            <button onClick={() => {this.setState({active: "english"})}}
                                                    className={this.state.active === "english" ? "lang-video lang-eng btn btn-border selected" : "lang-video lang-eng btn btn-border"}>
                                                <span className="act">Watch in English</span>
                                            </button>
                                            {" "}
                                            <button onClick={() => {this.setState({active: "hindi"})}}
                                                    className={this.state.active === "hindi" ? "lang-video lang-hin btn btn-border selected" : "lang-video lang-hin btn btn-border"}>
                                                <span className="">Watch in Hindi</span>
                                            </button>
                                        </div>
                                        <div className="col-md-7 col-11 mx-auto mt-4 pl-md-4 video-holder">
                                            <div
                                                className={this.state.active === "english" ? "vid-hin video-area vid-hide" : "vid-hin video-area vid-show"}
                                                id="video-hi">
                                                <iframe width="100%" height="400"
                                                        src="https://www.youtube-nocookie.com/embed/r7-yBtgP1kk"
                                                        title="YouTube video player" frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen></iframe>
                                            </div>
                                            <div
                                                className={this.state.active === "hindi" ? "vid-eng video-area vid-hide" : "vid-eng video-area vid-show"}
                                                id="video-en">
                                                <iframe width="100%" height="400"
                                                        src="https://www.youtube-nocookie.com/embed/Tfizj4480AE"
                                                        title="YouTube video player" frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen></iframe>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default Help;



