import React from "react";
import {images} from "../constant";
import Link from "next/link";
import {validateEmail} from "../src/helper";
import API from "../src/api/api.service";

const api = new API();
import {NotificationManager} from "react-notifications";
import {withRouter} from "next/router";
import VerifyOtpModal from "../src/components/common/modals/verify_otp_modal";
import SeoMeta from "../src/components/common/meta/seo_meta";

class ForgotPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                email: null,
                forgot: true
            },
            verification: false,
            verification_type: 1,
            verification_value: "",
            errors : []
        };
        this.emailRef = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let inputData = this.state.data;
        inputData[event.target.name] = event.target.value;
        this.setState({data: inputData});
    }

    handleSubmit(event) {

        event.preventDefault();

        this.setState({
            errorAlert: null,
            errors: [],
        });

        //VALIDATIONS
        let errors = {};

        if (this.state.data.email === null ||
            !validateEmail(this.state.data.email)
        ) {
            errors["email"] = "Enter valid email address";
            this.emailRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            this.setState({errors: errors});
            return false;
        }

        api.resend(this.state.data,)
            .then((success) => {
                this.setState({verification: true, verification_value: this.state.data.email}, () => {
                    NotificationManager.success(success.data.message);
                });
            }).catch((error) => {
            this.setState({
                errorAlert: error.response?.data?.message,
            });
        });
    }

    render() {
        return (
            <>
                <SeoMeta title={"Forgot password – Global Trade Plaza"}
                         description={"Global Trade Plaza is the Top Leading B2B Advertising Company in India, We Advertise to Boost your reach and Connectivity with the Authentic Leads, Top B2B Lead Generation Company in India"}/>

                <section className="forms-getin">
                    <div className="col-12 align-div">
                        <div className="banner">
                            <div className="area">
                                <h1>Trade Globally<span id="siteseal" className="siteseal">
                                    <script async type="text/javascript"
                                            src="https://seal.godaddy.com/getSeal?sealID=nxWeAJ7brTF9yiLo17t3Sq2PaSjLm8M08yEk6H8U22zjsZ2bJTaxUn2N4Pcv"></script></span>
                                </h1>
                                <p>All right reserved 2022 | globaltradeplaza.com<a href="contact.html">Contact us</a>
                                </p>
                            </div>
                        </div>
                        <div className="fields">
                            <div className="area">
                                <Link href="/">
                                    <a>
                                        <img className="img-responsive" src={images.logo_color.default.src} alt="logo"/>
                                    </a>
                                </Link>
                                <h3>Forgot Password</h3>
                                <h4>Please enter your registered email ID</h4>
                                <form id="forgetForm">
                                    <div className="row">
                                        <div className="col-12 form-group w-100">
                                            <input ref={this.emailRef} type="email"
                                                   className={
                                                       "form-control" +
                                                       (this.state.errors.email ? " is-invalid" : "")
                                                   }
                                                   name="email" id="email"
                                                   aria-describedby="emailHelp" autoComplete=""
                                                   onChange={(e) => {
                                                       this.handleChange(e)
                                                   }}
                                                   placeholder="Your registered email ID"/>
                                        </div>
                                        <div className="col-12 form-group w-100">
                                            <button type="button" className="btn" onClick={(e) => {
                                                this.handleSubmit(e)
                                            }}>Send OTP
                                            </button>
                                        </div>
                                        <p className="promo">
                                            <Link href="/login">
                                                <a href="">Back to login</a>
                                            </Link>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                <VerifyOtpModal for={3} show={this.state.verification}
                                type={this.state.verification_type}
                                value={this.state.verification_value}/>
            </>
        )
    }
}


export default withRouter(ForgotPassword);
