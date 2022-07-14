import React from "react";
import {images} from "../constant";
import RequirementForm from "../src/components/common/home/requirement_form";
import SeoMeta from "../src/components/common/meta/seo_meta";

class Requirements extends React.Component {

    render() {
        return (
            <>
                <SeoMeta title={"Global Trade Plaza | Post requirement"}
                         description={"Global Trade Plaza is the Top Leading B2B Advertising Company in India, We Advertise to Boost your reach and Connectivity with the Authentic Leads, Top B2B Lead Generation Company in India"}/>

                <section className="static">
                    <div className="col-12 banner">
                        <img src={images.banner_about.default.src} width="780" height="280" data-cfasync="false" alt=""/>
                        <div className="text">
                            <h3>Post requirement</h3>
                            <h1>We have end-to-end solutions for all your business problems.</h1>
                        </div>
                    </div>
                    <div className="container requirement head-view">
                        <div className="col-12 form">
                            <div className="row justify-content-center">
                                <div className="col-md-8 col-12 t-box">
                                    <div className="heading half">
                                        <h1>Post your requirement – Global Trade Plaza</h1>
                                    </div>
                                    <RequirementForm type={1} />
                                </div>
                                <div className="col-md-4 col-12 right">
                                    <div className="col-12 t-box">
                                        <div className="heading text-start">
                                            <h4>for more information</h4>
                                        </div>
                                        <div className="col-12 user-info text-start">
                                            <div className="row">
                                                <div className="col-md-12 tile">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                        <path fill="currentColor"
                                                              d="M128 148v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12zm140 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-128 96h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm128 0h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-76 84v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm76 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm180 124v36H0v-36c0-6.6 5.4-12 12-12h19.5V24c0-13.3 10.7-24 24-24h337c13.3 0 24 10.7 24 24v440H436c6.6 0 12 5.4 12 12zM79.5 463H192v-67c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v67h112.5V49L80 48l-.5 415z"></path>
                                                    </svg>
                                                    <h5 className="mb-1 fw-bold">USA</h5>
                                                    <h6>3 Germay Dr, Unit 4 #2174 Wilmington, USA 19804</h6>
                                                </div>
                                                <div className="col-md-12 tile">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                        <path fill="currentColor"
                                                              d="M128 148v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12zm140 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-128 96h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm128 0h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-76 84v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm76 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm180 124v36H0v-36c0-6.6 5.4-12 12-12h19.5V24c0-13.3 10.7-24 24-24h337c13.3 0 24 10.7 24 24v440H436c6.6 0 12 5.4 12 12zM79.5 463H192v-67c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v67h112.5V49L80 48l-.5 415z"></path>
                                                    </svg>
                                                    <h5 className="mb-1 fw-bold">Kanpur</h5>
                                                    <h6>Second Floor, 13/391, Green Park, Civil Lines, Kanpur, Uttar
                                                        Pradesh, India
                                                        208001</h6>
                                                </div>
                                                <div className="col-md-12 tile">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                        <path fill="currentColor"
                                                              d="M128 148v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12zm140 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-128 96h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm128 0h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-76 84v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm76 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm180 124v36H0v-36c0-6.6 5.4-12 12-12h19.5V24c0-13.3 10.7-24 24-24h337c13.3 0 24 10.7 24 24v440H436c6.6 0 12 5.4 12 12zM79.5 463H192v-67c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v67h112.5V49L80 48l-.5 415z"></path>
                                                    </svg>
                                                    <h5 className="mb-1 fw-bold">Delhi</h5>
                                                    <h6>4B 4th Floor, Bigjos Tower, A-8 Netaji Subhash Place, New Delhi,
                                                        India
                                                        110034</h6>
                                                </div>
                                                <div className="col-md-12 tile">
                                                    <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                                         data-icon="phone-alt"
                                                         role="img" xmlns="http://www.w3.org/2000/svg"
                                                         viewBox="0 0 512 512"
                                                         className="svg-inline--fa fa-phone-alt fa-w-16 fa-3x">
                                                        <path fill="currentColor"
                                                              d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"
                                                              className=""></path>
                                                    </svg>
                                                    <h6 className="mb-1 fw-bold">Phone</h6>
                                                    <h5>+91-8429088885</h5>
                                                </div>
                                                <div className="col-md-12 tile">
                                                    <svg fill="currentColor" viewBox="0 0 512 512">
                                                        <path d="M493.6 163c-24.88-19.62-45.5-35.37-164.3-121.6C312.7 29.21 279.7 0 256.4 0H255.6C232.3 0 199.3 29.21 182.6 41.38C63.88 127.6 43.25 143.4 18.38 163C6.75 172 0 186 0 200.8v247.2C0 483.3 28.65 512 64 512h384c35.35 0 64-28.67 64-64.01V200.8C512 186 505.3 172 493.6 163zM464 448c0 8.822-7.178 16-16 16H64c-8.822 0-16-7.178-16-16V276.7l136.1 113.4C204.3 406.8 229.8 416 256 416s51.75-9.211 71.97-26.01L464 276.7V448zM464 214.2l-166.8 138.1c-23.19 19.28-59.34 19.27-82.47 .0156L48 214.2l.1055-13.48c23.24-18.33 42.25-32.97 162.9-120.6c3.082-2.254 6.674-5.027 10.63-8.094C229.4 65.99 246.7 52.59 256 48.62c9.312 3.973 26.62 17.37 34.41 23.41c3.959 3.066 7.553 5.84 10.76 8.186C421.6 167.7 440.7 182.4 464 200.8V214.2z"></path>
                                                    </svg>
                                                    <h6 className="mb-1 fw-bold">Email</h6>
                                                    <h5>support@globaltradeplaza.com</h5>
                                                </div>
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
export default Requirements;



