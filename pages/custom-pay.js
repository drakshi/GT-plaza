import React from "react";
import API from "../src/api/api.service";
import Router from "next/router";
import {images} from "../constant";
import {validateEmail} from "../src/helper";
import {NotificationManager} from "react-notifications";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Script from 'next/script'
import SeoMeta from "../src/components/common/meta/seo_meta";
import Link from "next/link";
const api = new API();

class CustomPay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                amount: null,
                pay_for: null,
                contact_email: null,
                contact_name: null,
                contact_number: null,
                currency: null,
                membership_id: 0,
                country : "",
            },
            country_iso : null,
            term_condition : false,
            errors :[],
            errorAlert : null
        };
        this.payForRef = React.createRef();
        this.amountRef = React.createRef();
        this.emailRef = React.createRef();
        this.contactPersonRef = React.createRef();
        this.phoneRef = React.createRef();
        this.alertBox = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckChange = this.handleCheckChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            data: {
                ...this.state.data,
                membership_id: Router?.query && Router?.query?.ref ? Router?.query?.ref : 0,
                amount: Router?.query && Router?.query?.amount ? Router?.query?.amount : null,
                pay_for: Router?.query && Router?.query?.name ? Router?.query?.name : null
            }
        });
        this.getIpCountry();
    }

    handleCheckChange(event) {
        this.setState({
            term_condition: event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        })
    }

    handleChange(event) {
        let inputData = this.state.data;
        inputData[event.target.name] = event.target.value;
        this.setState({data: inputData});
        delete this.state.errors[event.target.name];
    }

    handleSubmit(event) {

        event.preventDefault();

        this.setState({
            errorAlert: null,
            errors: [],
        });


        //VALIDATIONS
        let errors = {};

        if (this.state.data.country === "Russia"){
            this.setState({errorAlert: "Please raise an inquiry to purchase membership , visit our contact page."}, () => {
                this.alertBox.current.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            });
            return false ;
        }

        if (this.state.data.pay_for === null || this.state.data.pay_for === "") {
            errors["pay_for"] = "Enter notes";
            this.payForRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
        }

        if (this.state.data.amount === null || this.state.data.amount === "") {
            errors["amount"] = "Enter amount";
            this.amountRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
        }

        if (this.state.data.contact_email === null || this.state.data.contact_email === "" ||
            !validateEmail(this.state.data.contact_email)
        ) {
            errors["contact_email"] = "Enter valid email address";
            this.emailRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
        }

        if (this.state.data.contact_name === null || this.state.data.contact_name === "") {
            errors["contact_name"] = "Enter contact name";
            this.contactPersonRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
        }

        if (this.state.data.contact_number === null || this.state.data.contact_number === "") {
            errors["contact_number"] = "Enter amount";
            this.phoneRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
        }

        if (Object.entries(errors).length > 0){
            return false ;
        }

        if (this.state.term_condition === false) {
            this.setState({errorAlert: "Accept Terms and condition"}, () => {
                this.alertBox.current.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            });
        }

        api.createRazorpayCustomOrder(this.state.data).then(success => {
            var options = {
                key: 'rzp_live_dkWkUCGkYxhZyD',
                amount: success.data.response.amount,
                currency: success.data.response.currency,
                name: "Global Trade Plaza",
                description: "Global Trade Plaza custom payment",
                image: "https://globaltradeplaza.com/assets/images/logo-default.png",
                order_id: success.data.response.order_id,
                handler: function (response) {
                    api.updateRazorpayOrder(response).then(success => {
                        this.setState({
                            data: {
                                amount: null,
                                pay_for: null,
                                contact_email: null,
                                contact_name: null,
                                contact_number: null,
                                currency: null,
                                membership_id: null
                            },
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
        this.setState({data : {...this.state.data ,
                currency : country.country_name === "India" ? "INR" :"USD",
                country : country.country_name
            },
            country_iso : country.country_code,
        });
    }

    render() {

        return (
            <>
                <SeoMeta title={"Custom pay – Global Trade Plaza"}
                         description={"Global Trade Plaza is the Top Leading B2B Advertising Company in India, We Advertise to Boost your reach and Connectivity with the Authentic Leads, Top B2B Lead Generation Company in India"}/>

                <section className="static">
                    <div className="col-12 banner">
                        <img src={images.banner_about.default.src} width="786" height="280" alt=""/>
                        <div className="text">
                            <h3>Custom pay</h3>
                            <h1>Pay to Enjoy our Services</h1>
                        </div>
                    </div>
                    <div className="container contact head-view">
                        <div className="col-12 form">
                            <div className="row justify-content-center">
                                <div className="col-md-7 col-12 t-box left ">
                                    <div className="col-12 head pl-2 pb-0">
                                        <h4>Pay online</h4>
                                    </div>
                                    {this.state.errorAlert ? (
                                        <div ref={this.alertBox}
                                             role="alert"
                                             className="sc-1wz9i2x-0 fooVeK mt-2"
                                        >
                                            <svg width="1792"
                                                 height="1792"
                                                 viewBox="0 0 1792 1792"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 aria-hidden="true"
                                                 className="sc-1t1e23j-0 bbiirI"
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M1024 1375v-190q0-14-9.5-23.5T992 1152H800q-13 0-22.5 9.5T768 1185v190q0 14 9.5 23.5t22.5 9.5h192q13 0 22.5-9.5t9.5-23.5zm-2-374l18-459q0-12-10-19-13-11-24-11H786q-11 0-24 11-10 7-10 21l17 457q0 10 10 16.5t24 6.5h185q14 0 23.5-6.5t10.5-16.5zm-14-934l768 1408q35 63-2 126-17 29-46.5 46t-63.5 17H128q-34 0-63.5-17T18 1601q-37-63-2-126L784 67q17-31 47-49t65-18 65 18 47 49z"
                                                ></path>
                                            </svg>
                                            <span>{this.state.errorAlert}</span>
                                        </div>
                                    ) : null}
                                    <form id="payForm">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-md-6 col-12 form-group">
                                                    <select value={this.state.data?.pay_for}
                                                            ref={this.payForRef}
                                                            className={
                                                                "form-control" +
                                                                (this.state.errors.pay_for ? " is-invalid" : "")
                                                            }
                                                            name="pay_for" id="pay_for"
                                                    onChange={(e)=>{this.handleChange(e)}}>

                                                        <option  value="" disabled selected>Please select</option>

                                                        {this.state.data?.pay_for && this.state.data?.pay_for === "Elite Seller Package" &&
                                                             <option value="Elite Seller Package" selected={true}>Elite Seller Package</option>
                                                        }

                                                        {this.state.data?.pay_for && this.state.data?.pay_for === "Pro Seller Package" &&
                                                             <option value="Pro Seller Package" selected={true}>Pro Seller Package</option>
                                                        }

                                                        {this.state.data?.pay_for && this.state.data?.pay_for === "Standard Seller Package" &&
                                                            <option value="Standard Seller Package">Standard Seller Package</option>
                                                        }

                                                        { !this.state.data?.pay_for &&
                                                            <>
                                                                <option value="Elite Seller Package">Elite Seller Package</option>
                                                                <option value="Pro Seller Package">Pro Seller Package</option>
                                                                <option value="Standard Seller Package">Standard Seller Package</option>
                                                                <option value="Add-on service">Add-on service</option>
                                                            </>
                                                        }
                                                    </select>
                                                </div>
                                                <div className="col-md-6 col-12 form-group">
                                                    <input type="text" name="amount" id="amount"
                                                           ref={this.amountRef}
                                                           onChange={(e)=>{this.handleChange(e)}}
                                                           value={this.state.data?.amount}
                                                           className={
                                                               "form-control" +
                                                               (this.state.errors.amount ? " is-invalid" : "")
                                                           }
                                                           placeholder="Amount (required)"/>
                                                    <label style={{"font-size": "9px", "color": "gray", "margin": "0"}}>Prices
                                                        shown are excluding 18% GST (applicable for India only).</label>
                                                </div>
                                                <div className="col-md-12 col-12 form-group">
                                                    <input type="text" name="contact_email" id="contact_email"
                                                           ref={this.emailRef}
                                                           value={this.state.data?.contact_email}
                                                           onChange={(e)=>{this.handleChange(e)}}
                                                           className={
                                                               "form-control" +
                                                               (this.state.errors.contact_email ? " is-invalid" : "")
                                                           }
                                                           placeholder="Contact Email(required)"/>
                                                </div>
                                                <div className="col-md-6 col-12 form-group">
                                                    <input type="text" name="contact_name" id="contact_name"
                                                           ref={this.contactPersonRef}
                                                           value={this.state.data?.contact_name}
                                                           onChange={(e)=>{this.handleChange(e)}}
                                                           className={
                                                               "form-control" +
                                                               (this.state.errors.contact_name ? " is-invalid" : "")
                                                           }
                                                           placeholder="Contact person(required)"/>
                                                </div>

                                                <div className="col-md-6 col-12 form-group" ref={this.phoneRef}>
                                                    <PhoneInput
                                                        inputProps={{
                                                            name: 'contact_number',
                                                            required: true,
                                                        }}
                                                        inputClass={  "form-control" +
                                                            (this.state.errors.contact_number ? " is-invalid" : "")
                                                        }
                                                        disableCountryCode={false}
                                                        disableCountryGuess={true}
                                                        countryCodeEditable={false}
                                                        country={this.state.country_iso ? this.state.country_iso.slice(0, -1).toLowerCase() : "in" }
                                                        value={this.state.data.contact_number}
                                                        onChange={contact_number => this.setState({
                                                            data: {
                                                                ...this.state.data,
                                                                contact_number: contact_number
                                                            }
                                                        })}
                                                    />
                                                </div>
                                                <div className="col-md-12 form-group text-left">
                                                    <div className="col-12 form-group mb-2 w-100 checkbox p-0">
                                                        <div className="style-checkbox">
                                                            <div className="col-12 item">
                                                                <input type="checkbox" id="agree_terms_request" aria-describedby="emailHelp" onChange={(e)=>{
                                                                    this.handleCheckChange(e)
                                                                }} />
                                                                <label htmlFor='agree_terms_request' className="mt-0">
                                                                    <span></span>
                                                                    I agree with&nbsp;
                                                                    <Link href={"/terms"}>
                                                                        <a className="link" target="_blank" rel="noreferrer">terms and conditions</a>
                                                                    </Link>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 form-group text-center">
                                                    <button onClick={(e)=>{
                                                        this.handleSubmit(e)
                                                    }} type="button" className="btn" id="paymentBtn">Proceed to
                                                        Pay
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

export default CustomPay;
