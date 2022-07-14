import React from "react";
import {images} from "../constant";
import Link from "next/link";
import {validateEmail} from "../src/helper";
import API from "../src/api/api.service";

const api = new API();
import {instanceOf} from "prop-types";
import {Cookies, withCookies} from "react-cookie";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {NotificationManager} from "react-notifications";
import {connect} from "react-redux";
import {UPDATE_USER_INFO} from "../src/redux/types";
import {withRouter} from "next/router";
import {setUserInfo} from "../src/redux/action/userAction";
import Router, {useRouter} from "next/router";
import SeoMeta from "../src/components/common/meta/seo_meta";
import LoadingBar from "react-top-loading-bar";
import VerifyOtpModal from "../src/components/common/modals/verify_otp_modal";

class Login extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            emailData: {
                email: this.props.cookies.get("email") ? this.props.cookies.get("email") : null,
                password: this.props.cookies.get("email_password") ? this.props.cookies.get("email_password") : null,
            },
            phoneData: {
                phone: this.props.cookies.get("phone") ? this.props.cookies.get("phone") : null,
                password: this.props.cookies.get("phone_password") ? this.props.cookies.get("phone_password") : null,
            },
            tab_change: 1,
            verification: false,
            verification_type: "",
            verification_value : "",
            errorAlert: null,
            errors: [],
        };
        this.emailRef = React.createRef();
        this.phoneRef = React.createRef();
        this.emailPassRef = React.createRef();
        this.phonePassRef = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRememberMe = this.handleRememberMe.bind(this);
    }

    handleChange(event) {

        //CHANGE FOR EMAIL
        if (this.state.tab_change === 1) {
            let inputData = this.state.emailData;
            inputData[event.target.name] = event.target.value;
            this.setState({data: inputData});
        }

        //CHANGE FOR PHONE
        if (this.state.tab_change === 2) {
            let inputData = this.state.phoneData;
            inputData[event.target.name] = event.target.value;
            this.setState({data: inputData});
        }
    }

    handleRememberMe(event) {

        const {cookies} = this.props;

        //EMAIL
        if (this.state.tab_change === 1) {
            var email = event.target.type === "checkbox" ? event.target.checked : event.target.value;
            if (email === true) {
                cookies.set("email", this.state.emailData?.email);
                cookies.set("email_password", this.state.emailData?.password);
            } else {
                this.setState({
                    emailData: {
                        email: "",
                        password: "",
                    },
                },()=>{
                    cookies.set("email", "");
                    cookies.set("email_password", "");
                });
            }
        }

        //PHONE
        if (this.state.tab_change === 2) {
            var phone = event.target.type === "checkbox" ? event.target.checked : event.target.value;
            if (phone === true) {
                cookies.set("phone", this.state.phoneData?.phone);
                cookies.set("phone_password", this.state.emailData?.password);
            } else {
                this.setState({
                    phoneData: {
                        phone: "",
                        password: "",
                    },
                },()=>{
                    cookies.set("phone", "");
                    cookies.set("phone_password", "");
                });

            }
        }
    }

    handleSubmit(event) {

        event.preventDefault();

        this.setState({
            errorAlert: null,
            errors: [],
        });


        //VALIDATIONS
        let errors = {};

        if (this.state.tab_change === 1 && (this.state.emailData.email === null ||
            !validateEmail(this.state.emailData.email))
        ) {
            errors["email"] = "Enter valid email address";
            this.emailRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            this.setState({errors: errors});
        }
        if (this.state.tab_change === 2 && (this.state.phoneData.phone === null || this.state.phoneData.phone === "")) {
            errors["phone"] = "Enter phone number";
            this.phoneRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            this.setState({errors: errors});
        }

        if (this.state.tab_change === 1 && (this.state.emailData.password === null || this.state.emailData.password === "")) {
            errors["password"] = "Enter password";
            this.emailPassRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            this.setState({errors: errors});
        }

        if (this.state.tab_change === 2 && (this.state.phoneData.password === null || this.state.phoneData.password === "")) {
            errors["password"] = "Enter password";
            this.phonePassRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            this.setState({errors: errors});
        }

        if (Object.entries(errors).length > 0) {
            return false;
        }

        api.login(
            this.state.data,
            this.setState({progress: 30}),

            setTimeout(() => {
                this.setState({progress: 90});
            }, 1000)
        )
            .then((success) => {
                this.setState({
                    progress: 100
                });
                NotificationManager.success('Logged In successfully');
                const {cookies} = this.props;
                success.data.response?.token ?
                    cookies.set("auth_token", success.data.response?.token) : "";
                api.authMe(
                    success.data.response?.token
                ).then((success) => {
                    this.props.userInfo(success.data.response);
                    if (this.props?.router?.query?.ref === "search-leads"){
                        Router.push("/search-leads");
                    }else{
                        Router.push("/user/dashboard");
                    }
                });
            }).catch((error) => {

            this.setState({
                progress: 100,
                errorAlert: error.response?.data?.message,
            });

            if (error.response?.data?.response?.email){
                this.setState({verification: true,verification_type : 1,verification_value : error.response?.data?.response?.email })
            }
            if (error.response?.data?.response?.phone){
                this.setState({verification: true,verification_type : 2,verification_value : error.response?.data?.response?.phone })
            }
        });
    }

    render() {

        return (
            <>

                <SeoMeta title={"Login – Global Trade Plaza"}
                         description={"Login to Global Trade Plaza, India's Best B2B Marketplace Portal"}/>
                <LoadingBar progress={this.state.progress}/>
                <section className="forms-getin">
                    <div className="col-12 align-div">
                        <div className="banner">
                            <div className="area">
                                <h1>Best B2B Marketplace in India</h1>
                                <div id="login-banner-holder"></div>
                                <p>All right reserved 2022 | globaltradeplaza.com <Link href={"/contact"}><a>Contact
                                    us</a></Link></p>
                            </div>
                        </div>
                        <div className="fields">
                            <div className="area">
                                <Link href="/">
                                    <img className="img-responsive" src={images.logo_color.default.src} alt="logo"/>
                                </Link>
                                <h3>Welcome again</h3>
                                <h4>Please enter your email and password to login.</h4>
                                <div className="tabbable-panel">
                                    {this.state.errorAlert ? (
                                        <div ref={this.alertBox}
                                             role="alert"
                                             className="sc-1wz9i2x-0 fooVeK mb-3"
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
                                    <div className="tabbable-line">
                                        <ul className="nav nav-tabs ">
                                            <li>
                                                <a onClick={() => {
                                                    this.setState({tab_change: 1})
                                                }} href="javascript:void(0)"
                                                   className={this.state.tab_change === 1 ? "active" : ""}
                                                   data-toggle="tab">Login With Email</a>
                                            </li>
                                            <li className="">
                                                <a onClick={() => {
                                                    this.setState({tab_change: 2})
                                                }} href="javascript:void(0)"
                                                   className={this.state.tab_change === 2 ? "active" : ""}
                                                   data-toggle="tab">Login With Phone</a>
                                            </li>
                                        </ul>

                                        <div className="tab-content product-list">

                                            <div
                                                className={this.state.tab_change === 1 ? "tab-pane active" : "tab-pane"}>
                                                <form>
                                                    <div className="row">
                                                        <div className="col-12 form-group w-100">
                                                            <input type="email"
                                                                   ref={this.emailRef}
                                                                   className={
                                                                       "form-control valid-control " +
                                                                       (this.state.errors.email ? " is-invalid" : "")
                                                                   }
                                                                   value={this.state.emailData.email}
                                                                   name="email"
                                                                   id="email"
                                                                   onChange={(e) => {
                                                                       this.handleChange(e)
                                                                   }}
                                                                   aria-describedby="emailHelp" autoComplete=""
                                                                   placeholder="Your registered email ID"/>
                                                        </div>
                                                        <div className="col-12 form-group w-100 mb-0">
                                                            <input type="password"
                                                                   ref={this.emailPassRef}
                                                                   className={
                                                                       "form-control valid-control " +
                                                                       (this.state.errors.password ? " is-invalid" : "")
                                                                   }
                                                                   value={this.state.emailData.password}
                                                                   name="password"
                                                                   onChange={(e) => {
                                                                       this.handleChange(e)
                                                                   }}
                                                                   id="password"
                                                                   aria-describedby="emailHelp"
                                                                   placeholder="Enter password"/>
                                                        </div>
                                                        <div className="col-12 form-group w-100 checkbox">
                                                            <div className="style-checkbox">
                                                                <div className="col-12 item">
                                                                    <input name="email_remember_me"
                                                                           id="email_remember_me" type='checkbox'
                                                                           checked={this.props.cookies.get("email") && this.props.cookies.get("email") !== null ? true : false}
                                                                           onChange={(event) => {
                                                                               this.handleRememberMe(event)
                                                                           }}/>
                                                                    <label htmlFor='email_remember_me'>
                                                                        <span></span>
                                                                        Remember me
                                                                    </label>
                                                                </div>
                                                                <Link href={"/forgot-password"}>
                                                                    <a className="forgot">Forgot password?</a>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 form-group w-100">
                                                            <button onClick={(e) => {
                                                                this.handleSubmit(e)
                                                            }} type="button" className="btn login_btn">Login
                                                            </button>
                                                        </div>
                                                        <p className="promo">Dont have an account?
                                                            <Link href={"/signup"}><a>Join for free now</a></Link>
                                                        </p>
                                                    </div>
                                                </form>
                                            </div>

                                            <div
                                                className={this.state.tab_change === 2 ? "tab-pane active" : "tab-pane"}>
                                                <form>
                                                    <div className="row">
                                                        <div className="col-12 form-group w-100" ref={this.phoneRef}>
                                                            <PhoneInput
                                                                inputProps={{
                                                                    name: 'phone',
                                                                    required: true,
                                                                }}
                                                                placeholder={"Phone number *"}
                                                                inputClass={this.state.errors.phone ? "valid-control is-invalid" : ""}
                                                                disableCountryCode={false}
                                                                disableCountryGuess={true}
                                                                countryCodeEditable={false}
                                                                country={this.props.ipCountry ? this.props.ipCountry?.country_code.toLowerCase() : "in"}
                                                                value={this.state.phoneData.phone}
                                                                onChange={phone => this.setState({
                                                                    phoneData: {
                                                                        ...this.state.phoneData,
                                                                        phone: "+" + phone
                                                                    }
                                                                })}
                                                            />
                                                        </div>
                                                        <div className="col-12 form-group w-100 mb-0">
                                                            <input type="password"
                                                                   ref={this.phonePassRef}
                                                                   onChange={(e) => {
                                                                       this.handleChange(e)
                                                                   }}
                                                                   className={
                                                                       "form-control valid-control " +
                                                                       (this.state.errors.password ? " is-invalid" : "")
                                                                   }
                                                                   value={this.state.phoneData.password}
                                                                   name="password"
                                                                   aria-describedby="emailHelp"
                                                                   placeholder="Enter password *"/>
                                                        </div>
                                                        <div className="col-12 form-group w-100 checkbox">
                                                            <div className="style-checkbox">
                                                                <div className="col-12 item">
                                                                    <input name="phone_remember_me"
                                                                           id="phone_remember_me" type='checkbox'
                                                                           checked={this.props.cookies.get("phone") && this.props.cookies.get("phone") !== null ? true : false}
                                                                           onChange={(event) => {
                                                                               this.handleRememberMe(event)
                                                                           }}
                                                                    />
                                                                    <label htmlFor='phone_remember_me'>
                                                                        <span></span>
                                                                        Remember me
                                                                    </label>
                                                                </div>
                                                                <Link href={"/forgot-password"}>
                                                                    <a href="" className="forgot">Forgot password?</a>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 form-group w-100">
                                                            <button onClick={(e) => {
                                                                this.handleSubmit(e)
                                                            }} type="button" className="btn login_btn">Login
                                                            </button>
                                                        </div>
                                                        <p className="promo">Dont have an account? <Link
                                                            href={"/signup"}><a>Join for free now</a></Link></p>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <VerifyOtpModal for={1} show={this.state.verification} type={this.state.verification_type} value={this.state.verification_value}/>
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userInfo: (data) => dispatch(setUserInfo({type: "UPDATE_USER_INFO", data: data})),
    };
};

export default withRouter(withCookies(connect(null, mapDispatchToProps)(Login)));
