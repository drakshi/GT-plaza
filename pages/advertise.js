import React from "react";
import {images} from "../constant";
import API from "../src/api/api.service";
import Link from "next/link";
import {imageOptimization} from "../src/helper";
import SeoMeta from "../src/components/common/meta/seo_meta";
import LoadingBar from "react-top-loading-bar";
import axios from "axios";
const api = new API();

class Advertisement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            progress:0,
            memberships : [],
            is_russia_country : false
        };
    }

    async componentDidMount() {

        await axios({
            method: 'get',
            url: 'https://api.ipstack.com/check?access_key=0bda8244814cecccb33e4f5178601c19',
            headers: {
                'Content-Type': `application/json`,
            },
        }).then(res => {
            this.setState({
                is_russia_country : ( res.data?.country_name === "Russia" ? true : false)
            });
        }).catch(er => {
            console.log("something goes wrong", er);
        });

        api.getMembershipPlans(
            this.setState({progress:30}),
            setTimeout(() => {
                this.setState({ progress: 90 });
            }, 1000)
        ).then((success) => {
            this.setState({memberships : success.data.response,progress:100})
        })
            .catch((error) => {
                this.setState({
                    progress:100,
                    errorAlert: error.response.data.message,
                });
            });
    }

    render() {

        return (
            <>
                    <LoadingBar progress={this.state.progress} color="blue" />
                <SeoMeta title={"Top B2B Advertising Company in India, Advertise with Us to Expand Your Business"}
                         description={"Global Trade Plaza is the Top Leading B2B Advertising Company in India, We Advertise to Boost your reach and Connectivity with the Authentic Leads, Top B2B Lead Generation Company in India"}/>

                <section className="static">
                    <div className="col-12 banner">
                        <img src={images.advertise.default.src} alt=""/>
                        <div className="text">
                            <h3>Advertise with us</h3>
                            <h1>Top B2B Advertising Company in India</h1>
                        </div>
                    </div>
                    <div className="container membership">
                        <div className="col-12 t-box">
                            <div className="col-12 cards">
                                <h6>We at Global Trade Plaza offer various advertising services to our clients. We help
                                    small or
                                    medium-sized enterprises expand their reach by providing detailed and effective
                                    marketing
                                    and advertising services.</h6>
                                <h6>We offer customized advertising packages; you may choose the one that suits your
                                    business
                                    requirements the most.</h6>
                                <div className="row">

                                    {this.state.memberships.length ? this.state.memberships.map((membership,index)=> {

                                        return (
                                            <>
                                                <div className="col-md-4 col-12 block" key={index}>
                                                    <div className="col-12 t-box">
                                                        <div className="area">
                                                            <Link href={"advertise-details?membership="+membership.slug} >
                                                                <a>
                                                                    <img src={membership.banner} alt=""/>
                                                                    <h5>{membership.title}</h5>
                                                                </a>
                                                            </Link>
                                                            <Link href={"advertise-details?membership="+membership.slug}>
                                                                <a>
                                                                    <button className="btn mt-2">PURCHASE</button>
                                                                </a>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }) : " " }

                                </div>
                            </div>
                            <div className="col-12 note">
                                <p>All payments for services at globaltradeplaza.com have to be made in favour of
                                    Webixy technologies Pvt Ltd only. We have not authorized any individual or
                                    organization to collect payments in any other name (i.e. any other individual or
                                    organization name) or via personal Western Union or personal Paypal Accounts for any
                                    services rendered by globaltradeplaza.com. You are informed that under no
                                    circumstances will globaltradeplaza.com be liable for any damage caused in your
                                    business transaction to such fraudulent individuals or organizations.</p>
                            </div>
                        </div>
                        <div className="col-12 px-3">
                            <div className="row justify-content-center">
                                <div className="col-md-4 t-box col-12 sides text-center">
                                    <img className="logo"
                                         src="https://globaltradeplaza.com/assets/images/logo_color.png" width="160"
                                         height="28" />
                                        <h6>Pay custom and get an exclusive experience at Global Trade Plaza</h6>
                                        {this.state.is_russia_country === true ?
                                            <Link href={"/contact"}>
                                                <a>
                                                    <button className="btn" type="button">ENQUIRY NOW</button>
                                                </a>
                                            </Link>
                                            :
                                            <Link href={"/custom-pay"}>
                                                <a>
                                                    <button className="btn" type="button">Custom pay</button>
                                                </a>
                                            </Link>
                                        }
                                        <span><b>OR</b></span>
                                        <img className="qr-code"
                                             src={imageOptimization("https://globaltradeplaza.com/assets/images/qr.jpg",140)}
                                             width="140" height="200" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}


export default Advertisement;
