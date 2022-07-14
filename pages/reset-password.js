import React from "react";
import {images} from "../constant";
import Link from "next/link";
import API from "../src/api/api.service";
const api = new API();
import {NotificationManager} from "react-notifications";
import Router, {withRouter} from "next/router";
import SeoMeta from "../src/components/common/meta/seo_meta";

class ResetPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                new_password: null,
                confirm_password: null
            },
            errors: []
        };
        this.passwordRef = React.createRef();
        this.confirmRef = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static async getInitialProps(ctx) {
        return {
            email: new Buffer(JSON.stringify(ctx?.query?.email), 'base64').toString('ascii'),
        }
    }

    handleChange(event) {
        let inputData = this.state.data;
        inputData[event.target.name] = event.target.value;
        this.setState({data: inputData});
        delete this.state.errors[event.target.name];
        this.setState({errorAlert : null})
    }

    handleSubmit(event) {

        event.preventDefault();

        this.setState({
            errorAlert: null,
            errors: [],
        });

        //VALIDATIONS
        let errors = {};

        if (this.state.data.new_password === null || this.state.data.new_password === "")   {
            errors["new_password"] = "Enter new password";
            this.passwordRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            this.setState({errors: errors});
        }

        if (this.state.data.confirm_password === null || this.state.data.confirm_password === "") {
            errors["confirm_password"] = "Enter confirm password";
            this.confirmRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            this.setState({errors: errors});
        }

        if (Object.entries(errors).length > 0){
            return false ;
        }

        const data = this.state.data ;
        data['email'] = this.props.email;
        api.forgot()
            .then((success) => {
                NotificationManager.success(success.data.message);
                const router = this.props.router;
                router.push('/login');
            }).catch((error) => {
            this.setState({
                errorAlert: error.response?.data?.message,
            });
        });
    }

    render() {

        return (
            <>
                <SeoMeta title={"Reset password – Global Trade Plaza"}
                         description={"Global Trade Plaza is the Top Leading B2B Advertising Company in India, We Advertise to Boost your reach and Connectivity with the Authentic Leads, Top B2B Lead Generation Company in India"}/>

                <section className="forms-getin">
                    <div className="col-12 align-div">
                        <div className="banner">
                            <div className="area">
                                <h1>Trade Globally<span id="siteseal" className="siteseal">
                                    <script async type="text/javascript"
                                            src="https://seal.godaddy.com/getSeal?sealID=nxWeAJ7brTF9yiLo17t3Sq2PaSjLm8M08yEk6H8U22zjsZ2bJTaxUn2N4Pcv"></script></span>
                                </h1>
                                      <p>All right reserved 2022 | globaltradeplaza.com<a href={"/contact"}>Contact us</a></p>
                            </div>
                        </div>
                        <div className="fields">
                            <div className="area">
                                <Link href="/">
                                    <a>
                                        <img className="img-responsive" src={images.logo_color.default.src} alt="logo"/>
                                    </a>
                                </Link>
                                <h3>Create Password</h3>
                                <h5 className="mb-2">Enter new password for your account.</h5>
                                {this.state.errorAlert ? (
                                    <div
                                        ref={this.alertBox}
                                        role="alert"
                                        className="sc-1wz9i2x-0 fooVeK mb-2"
                                    >
                                        <svg
                                            width="1792"
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
                                <form id="changePassForm">
                                    <div className="row">
                                        <div className="col-12 form-group">
                                            <input type="password"
                                                   ref={this.passwordRef}
                                                   className={
                                                       "form-control  valid-control" +
                                                       (this.state.errors.new_password ? " is-invalid" : "")
                                                   }
                                                   name="new_password"
                                                   id="password" aria-describedby="emailHelp"
                                                   onChange={(e) => {
                                                       this.handleChange(e)
                                                   }}
                                                   placeholder="Enter new password"/>
                                        </div>
                                        <div className="col-12 form-group">
                                            <input type="password"
                                                   ref={this.confirmRef}
                                                   className={
                                                       "form-control  valid-control" +
                                                       (this.state.errors.confirm_password ? " is-invalid" : "")
                                                   }
                                                   name="confirm_password"
                                                   id="confirm_password" aria-describedby="emailHelp"
                                                   onChange={(e) => {
                                                       this.handleChange(e)
                                                   }}
                                                   placeholder="Confirm password"/>
                                        </div>
                                        <div className="col-12 form-group text-center w-100">
                                            <button type="button" className="btn" onClick={(e) => {
                                                this.handleSubmit(e)
                                            }}>Reset
                                            </button>
                                        </div>
                                        <p className="promo">
                                            <Link href={"/login"}>
                                                <a> Back to login</a>
                                            </Link>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}


export default withRouter(ResetPassword);
