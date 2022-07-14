import React from "react";
import API from "../src/api/api.service";
import {NotificationManager} from "react-notifications";
import Script from 'next/script'
import {images} from "../constant";
import SeoMeta from "../src/components/common/meta/seo_meta";

const api = new API();

class RenewPay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            membership_details : null,
            ip_country : null,
            country : null,
            currency : null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        api.getSingleMembershipPlan(1).then((success) => {
            this.setState({membership_details : success.data.response})
        })
            .catch((error) => {
                this.setState({
                    errorAlert: error.response.data.message,
                });
            });
        this.getIpCountry()
    }

    handleSubmit(event) {

        event.preventDefault();

        let dollarUSLocale = Intl.NumberFormat('en-US');
        var final_pay_amount = dollarUSLocale.format(Math.ceil(this.state.membership_details?.price) - Math.ceil(this.state.membership_details?.price * 20 /100)) ;
        if (this.state.ip_country && this.state.ip_country !== 'India') {
             final_pay_amount =  dollarUSLocale.format(Math.ceil(this.state.membership_details?.price_usd) - Math.ceil(this.state.membership_details?.price_usd * 20 /100));
        }
        const data = {
            country : this.state.country,
            currency: this.state.currency,
            amount :final_pay_amount
        };

        api.createRazorpayRenewOrder(data).then(success => {
            var options = {
                key: 'rzp_live_dkWkUCGkYxhZyD',
                amount: success.data.response.amount,
                currency: success.data.response.currency,
                name: "Global Trade Plaza",
                description: "Global Trade Plaza custom payment",
                image: "https://globaltradeplaza.com/assets/images/logo-default.png",
                order_id: success.data.response.order_id,
                handler: function (response) {
                    api.updateRazorpayRenewOrder(response).then(success => {
                        this.setState({
                            membership_details : null
                        });
                        NotificationManager.success('Payment successfully done. Our team will get back shortly.');
                    }).catch((error) => {
                        NotificationManager.error(error.response?.data?.message);
                    });
                },
                theme: {
                    "color": "#30475E"
                }
            };
            var rzp1 = new Razorpay(options);
            rzp1.open();
            event.preventDefault();
            rzp1.on('payment.failed', function (response) {
                console.log(response);
            });
        })
    }

    async getIpCountry() {
        const res = await fetch('https://api.ipstack.com/check?access_key=0bda8244814cecccb33e4f5178601c19')
        const country = await res.json();
        this.setState({
            currency : country.country_name === "India" ? "INR" :"USD" ,
            country_iso : country.country_code,
            country : country.country_name
        });
    }

    render() {

        let dollarUSLocale = Intl.NumberFormat('en-US');
        var price = '₹' + dollarUSLocale.format(Math.ceil(this.state.membership_details?.price));
        var discount =  '₹' + dollarUSLocale.format(Math.ceil(this.state.membership_details?.price * 20 /100));
        var final_amount = '₹' +  dollarUSLocale.format(Math.ceil(this.state.membership_details?.price) - Math.ceil(this.state.membership_details?.price * 20 /100));
        var final_pay_amount = dollarUSLocale.format(Math.ceil(this.state.membership_details?.price) - Math.ceil(this.state.membership_details?.price * 20 /100)) ;
        if (this.state.ip_country && this.state.ip_country !== 'India') {
            price = '$' + dollarUSLocale.format(Math.ceil(this.state.membership_details?.price_usd));
            var discount =  '$' + dollarUSLocale.format(Math.ceil(this.state.membership_details?.price_usd * 20 /100));
            var final_amount = '$' + (  dollarUSLocale.format(Math.ceil(this.state.membership_details?.price_usd) - Math.ceil(this.state.membership_details?.price_usd * 20 /100)));
            var final_pay_amount =  dollarUSLocale.format(Math.ceil(this.state.membership_details?.price_usd) - Math.ceil(this.state.membership_details?.price_usd * 20 /100));
        }

        return (
            <>
                <SeoMeta title={"Renew membership – Global Trade Plaza"}
                         description={"Global Trade Plaza is the Top Leading B2B Advertising Company in India, We Advertise to Boost your reach and Connectivity with the Authentic Leads, Top B2B Lead Generation Company in India"}/>

                <section className="static">
                    <div className="col-12 banner">
                        <img src={images.banner_about.default.src} width="786" height="280" alt=""/>
                        <div className="text">
                            <h3>Renew membership</h3>
                            <h1>Pay to Enjoy our Services</h1>
                        </div>
                    </div>
                    <div className="container contact head-view">
                        <div className="col-12 form">
                            <div className="row justify-content-center">
                                <div className="col-md-7 col-12 t-box left ">
                                    <div className="col-12 head pl-2 pb-0">
                                        <h2>Pay online</h2>
                                    </div>
                                    <form id="renewForm" className="mt-3">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-12 pl-2">
                                                    <h4 className="mb-3">Renew your membership now and get 20% off.</h4>
                                                    <h5 className="justify-content-between d-flex w-100">Membership
                                                        amount <span id="membership_amount">{price}</span></h5>
                                                    <h5 className="justify-content-between d-flex w-100 text-success font-weight-bold">Discount
                                                        20%<span id="membership_discount">{discount}</span></h5>
                                                    <hr />
                                                        <h4 className="d-flex w-100"><b
                                                            className="justify-content-between d-flex w-100">Amount
                                                            Payable<span id="final_amount">{final_amount}</span></b></h4>
                                                        <label style={{"font-size": "10px","color": "gray","margin": "0"}}>Prices
                                                            shown are excluding 18% GST (applicable for India
                                                            only).</label>
                                                </div>

                                                <div className="col-12 form-group text-center mt-2">
                                                    <button type="button" className="btn" id="paymentBtn" onClick={(e)=>{
                                                        this.handleSubmit(e)
                                                    }}>Renew
                                                        membership now
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-12 card">
                                    <div className="col-12 note text-left p-0">
                                        <h6>All payments for services at globaltradeplaza.com have to be made in favour
                                            of Webixy technologies Pvt Ltd only. We have not authorized any individual
                                            or organization to collect payments in any other name (i.e. any other
                                            individual or organization name) or via personal Western Union or personal
                                            Paypal Accounts for any services rendered by globaltradeplaza.com. You are
                                            informed that under no circumstances will globaltradeplaza.com be liable for
                                            any damage caused in your business transaction to such fraudulent
                                            individuals or organizations.</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <>
                    <Script src="https://checkout.razorpay.com/v1/checkout.js" />
                </>
            </>
        )
    }
}

export default RenewPay;
