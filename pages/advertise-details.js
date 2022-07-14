import React from "react";
import API from "../src/api/api.service";
import Router, {withRouter} from "next/router";
import {imageOptimization} from "../src/helper";
import SeoMeta from "../src/components/common/meta/seo_meta";
import axios from "axios";
const api = new API();

class AdvertisementDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            progress:0,
            ip_country : null,
            is_russia_country : null
        };
        this.payRedirection = this.payRedirection.bind(this);
    }

    static async getInitialProps(ctx) {
        var membership_details = null ;
        await api.getSingleMembershipPlan(ctx?.query.membership).then((success) => {
            membership_details = success.data.response
        });
        return {
            membership_details: membership_details,
        }
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
                ip_country :  res.data?.country_name ,
                is_russia_country : ( res.data?.country_name === "Russia" ? true : false)
            });
        }).catch(er => {
            console.log("something goes wrong", er);
        });
    }

    payRedirection(){

        if (this.state.is_russia_country === true){
            Router.push('/contact');
            return false ;
        }
        var priceValue = this.props.membership_details.price;
        if (this.state.ip_country  && this.state.ip_country !== "India") {
            priceValue = this.props.membership_details?.price_usd;
        }
        var decodedStringBtoA = 'HelloWorld!HelloWorld!HelloWorld!HelloWorld!HelloWorld!HelloWorld!HelloWorld!HelloWorld!HelloWorld!HelloWorld!HelloWorld!HelloWorld!HelloWorld!HelloWorld!HelloWorld!HelloWorld!HelloWorld!HelloWorld!HelloWorld!HelloWorld!HelloWorld!HelloWorld!HelloWorld!HelloWorld!';
        var encodedStringBtoA = btoa(decodedStringBtoA);
        Router.push('custom-pay?token='+ encodedStringBtoA +'&name=' + this.props.membership_details?.title +" Seller Package"+ '&amount=' + priceValue + '&ref=' + this.props.membership_details?.id);
    }

    render() {

        let dollarUSLocale = Intl.NumberFormat('en-US');
        var amount_with_currency = "ENQUIRE NOW";
        if (this.state.ip_country) {
            this.state.ip_country && this.state.ip_country === "India" ?
                amount_with_currency = "PAY NOW ₹" + dollarUSLocale.format(this.props.membership_details?.price)
                : this.state.ip_country === "Russia" ?
                amount_with_currency = "ENQUIRE NOW"
                : amount_with_currency = "PAY NOW $" + dollarUSLocale.format(this.props.membership_details?.price_usd);
        }

        return (
            <>
                {this.props.membership_details?.id === 1 &&
                     <SeoMeta title={"Become Elite Member & Grow your business"}
                         description={"Pricing, Features and other package details for Elite Members. Get verified buy Leads and product listing features and sell your products and services to global buyers"}/>
                }

                {this.props.membership_details?.id === 2 &&
                     <SeoMeta title={"Become Pro Member & Grow your business"}
                         description={"Features, Pricing and other package details for Pro Members. Get product listing features & verified buy Leads, and sell your services and products to global buyers"}/>
                }

                {this.props.membership_details?.id === 3 &&
                    <SeoMeta title={"Become Standard Member & Grow your business"}
                         description={"Pricing, Features and other package details for Elite Members. Get verified buy Leads and product listing features and sell your products and services to global buyers"}/>
                }

                <section className="static">
                    <div className="col-12 banner">
                        <img src={imageOptimization("https://globaltradeplaza.com/assets/images/banner-about.png",786)}
                            width="786" height="280" alt=""/>
                        <div className="text">
                            <img id="membership_icon" src={this.props.membership_details?.banner} alt=""/>
                            <h3 id="membership_title">
                                {this.props.membership_details?.title}
                            </h3>
                        </div>
                    </div>
                    <div className="container single-membership">
                        <div className="col-12 t-box">
                            <div className="col-12 desc">
                                <div className="row">
                                    <div className="head pb-1">
                                        <h4>What we offer</h4>
                                    </div>
                                    <div className="col-12 text">
                                        <p id="membership_description">
                                            {this.props.membership_details?.description}
                                        </p>
                                        <button className="btn-border mt-2 " id="paymentBtn" onClick={(e)=>{
                                            this.payRedirection(e)
                                        }}>
                                            <span id="membership_price" className="btn">{amount_with_currency}</span>
                                        </button>
                                        <label style={{"font-size": "9px","color": "gray","margin": "0"}}>
                                            Prices shown are excluding 18% GST (applicable for India only).
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 t-box">
                            <div className="col-12 features">
                                <div className="row">
                                    <div className="head">
                                        <h4>Key Features</h4>
                                    </div>
                                    <div className="col-12 points" id="membership_key_features_wrapper">
                                        <ul className="key_features_list">
                                            {this.props.membership_details?.membershipfeatures?.length > 0 ? this.props.membership_details?.membershipfeatures.map((feature)=>{
                                                if (feature && feature?.title !== " " && feature?.comment !== " ") {
                                                    return (
                                                        <>
                                                            <li>
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                     viewBox="0 0 192 512">
                                                                    <path fill="currentColor"
                                                                          d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
                                                                </svg>
                                                                <span>
                                                                    <h5>{feature?.title}</h5>
                                                                    <p>{feature?.comment}</p>
                                                                </span>
                                                            </li>
                                                        </>
                                                    )
                                                }
                                            }) : "" }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 t-box">
                            <div className="col-12 product-slider unique">
                                <div className="col-12 t-box cards">
                                    <div className="row justify-content-center" id="unique_feature_wrapper">
                                        <div className="head col-12">
                                            <h4>Unique features</h4>
                                        </div>

                                        {this.props.membership_details?.membership_unique_features?.length > 0 ? this.props.membership_details?.membership_unique_features.map((feature)=>{

                                            return (
                                                <>
                                                    <div className="col-md-3 col-12 block">
                                                        <div className="col-12 t-box">
                                                            <div className="col-12 image">
                                                                <img width="235" height="235"
                                                                     src={feature.image}
                                                                     alt="" />
                                                            </div>
                                                            <p>{feature?.feature_title}</p></div>
                                                    </div>
                                                </>
                                            )

                                            }) : "" }

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


export default withRouter(AdvertisementDetails);
