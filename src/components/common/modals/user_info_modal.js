import React from "react";
import {Modal} from "react-bootstrap";
import {NotificationManager} from "react-notifications";
import {instanceOf} from "prop-types";
import {Cookies, withCookies} from "react-cookie";
import API from "../../../api/api.service";
import {staticData} from "../../../../static";
import {CapitalizeFirstLetter} from "../../../helper";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import VerifyOtpModal from "./verify_otp_modal";
import Link from "next/link";
import LoadingBar from "react-top-loading-bar";
import {connect} from "react-redux";

const api = new API();

class UserInfoModal extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            data: {
                full_name: null,
                company_name: null,
                email: null,
                country_id: null,
                mobile_number: null
            },
            disable:false,
            progress:0,
            errors : [],
            errorAlert: false,
            term_condition: false,
            country_iso: null,
            verification: false,
            verification_type: 1,
            verification_value: null,
            show: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleRequest = this.handleRequest.bind(this);
        this.handleCheckChange = this.handleCheckChange.bind(this);
        this.fullnameRef = React.createRef();
        this.companyRef = React.createRef();
        this.emailRef = React.createRef();
        this.countryRef = React.createRef();
        this.phoneRef = React.createRef();
        this.alertBox = React.createRef();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props?.getUserInfo !== prevProps?.getUserInfo && this.props?.getUserInfo?.logged_user_info?.data) {
            this.setState({
                data: {
                    full_name: this.props?.getUserInfo?.logged_user_info?.data.full_name,
                    company_name: this.props?.getUserInfo?.logged_user_info?.data.company_name,
                    country_id: this.props?.getUserInfo?.logged_user_info?.data.preference.country_id,
                    mobile_number: this.props?.getUserInfo?.logged_user_info?.data.phone,
                    email: this.props?.getUserInfo?.logged_user_info?.data.email
                }
            })
        }

        if (this.props?.getUserInfo?.logged_user_info?.data && this.state.data.full_name === null && this.state.data !== this.props?.getUserInfo?.logged_user_info?.data) {
            this.setState({
                data: {
                    full_name: this.props?.getUserInfo?.logged_user_info?.data.full_name,
                    company_name: this.props?.getUserInfo?.logged_user_info?.data.company_name,
                    country_id: this.props?.getUserInfo?.logged_user_info?.data.preference.country_id,
                    mobile_number: this.props?.getUserInfo?.logged_user_info?.data.phone,
                    email: this.props?.getUserInfo?.logged_user_info?.data.email
                }
            })
        }

        if (prevProps.show !== this.props.show) {
            this.setState({show: this.props.show })
        }
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
        if (event.target.name === "country_id") {
            var index1 = event.target.selectedIndex;
            var optionElement1 = event.target.childNodes[index1]
            var option1 = optionElement1.getAttribute('data-iso');
            if (option1) {
                this.setState({country_iso: option1})
            }
        }
        this.setState({data: inputData});
    }

    handleRequest(event) {
        this.setState({
            disable:true,
            errorAlert: null,
            errors: [],
        });
        event.preventDefault();

        let errors = {};
        if (this.state.data.full_name === null && this.state.data.full_name === "") {
            errors["full_name"] = "Enter full_name";
            this.fullnameRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            this.setState({errors: errors,disable:false});
            return false;
        }
        if (this.state.data.company_name === null && this.state.data.company_name === "") {
            errors["company_name"] = "Enter company name";
            this.companyRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            this.setState({errors: errors,disable:false});
            return false;
        }
        if (this.state.data.email === null && this.state.data.company_name === "") {
            errors["email"] = "Enter email";
            this.emailRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            this.setState({errors: errors,disable:false});
            return false;
        }
        if (this.state.data.country_id === null) {
            errors["country_id"] = "Please select country";
            this.countryRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            this.setState({errors: errors,disable:false});
            return false;
        }
        if (this.state.data.mobile_number === null) {
            errors["mobile_number"] = "Enter mobile number";
            this.phoneRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            this.setState({errors: errors,disable:false});
            return false;
        }
        if (this.state.term_condition === false) {
            this.setState({errorAlert: "Accept Terms and condition",disable:false}, () => {
                this.alertBox.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            });
            return false;
        }

        var requestAPI = "";
        var requirementData = Object.assign(this.state.data, this.props.info);

        //post requirement
        if (this.props.type === 1) {
            requestAPI = "buyer-requirement"
        }

        if (this.props.type === 4) {
            requestAPI = "buyer-requirement"
        }

        //post inquiry for product
        if (this.props.type === 2) {
            requestAPI = "seller-inquiries";
            requirementData['type'] = 1;
        }

        //post inquiry for business
        if (this.props.type === 3) {
            requestAPI = "seller-inquiries";
            requirementData['type'] = 2
        }

        api.postRequirement(requirementData ,requestAPI,
            this.setState({progress:30}),

            setTimeout(() => {
                this.setState({ progress: 90 });
            }, 1000)
        ).then((success) => {
                NotificationManager.success(success.data.message);
                if (Object.keys(success.data.response).length !== 0) {
                    if (this.state.data.country_id === "103") {
                        this.setState({
                            verification: true,
                            verification_type: 2,
                            verification_value: this.state.data.phone ? this.state.data.phone : this.state.data.mobile_number
                        })
                    } else {
                        this.setState({
                            disable:false,
                            progress:100,
                            verification: true,
                            verification_type: 1,
                            verification_value: this.state.data.email
                        })
                    }
                }
                this.setState({
                    show: false,
                    disable:false,
                    data: {
                        full_name: "",
                        company_name: "",
                        email: "",
                        country_id: "",
                        mobile_number: ""
                    }
                }, () => {
                    this.props.post({submitted: true})
                })
            })
            .catch((error) => {
                this.setState({
                    progress:100,
                    disable:false,
                });
                NotificationManager.error(error.response.data.message);
            });
    }


    render() {

        return (
            <>
                <LoadingBar progress={this.state.progress} color="blue" />
                <Modal size="sm" show={this.state.show} className="mt-5">
                    <div className="modal-header border-0 pb-0">
                        <h4 className="modal-title">Let us know about you</h4>
                    </div>
                    <div className="modal-body">
                        {this.state.errorAlert ? (
                            <div
                                ref={this.alertBox}
                                role="alert"
                                className="sc-1wz9i2x-0 fooVeK"
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
                        <div className="row">
                            <div className="col-md-12 col-12 form-group">
                                <input type="text"
                                       value={this.state.data.full_name}
                                       onChange={(e) => {
                                           this.handleChange(e)
                                       }}
                                       className={"form-control" + (this.state.errors.full_name ? " is-invalid" : "")}
                                       ref={this.fullnameRef}
                                       id="user_name" name="full_name" placeholder="Full name"/>
                            </div>
                            <div className="col-md-12 col-12 form-group">
                                <input type="text"
                                       value={this.state.data.company_name}
                                       onChange={(e) => {
                                           this.handleChange(e)
                                       }}
                                       className={"form-control" + (this.state.errors.company_name ? " is-invalid" : "")}
                                       ref={this.companyRef}
                                       id="user_company"
                                       name="company_name" placeholder="Your company name"/>
                            </div>
                            <div className="col-md-12 col-12 form-group">
                                <input
                                    type="email"
                                    value={this.state.data.email}
                                    onChange={(e) => {
                                        this.handleChange(e)
                                    }}
                                    ref={this.emailRef}
                                    className={"form-control" + (this.state.errors.email ? " is-invalid" : "")}
                                    id="user_email" name="email" placeholder="Email address"/>
                            </div>
                            <div className="col-md-12 col-12 form-group">
                                <select ref={this.countryRef}
                                        value={this.state.data.country_id}
                                        className={
                                            "form-control " +
                                            (this.state.errors.country_id ? " is-invalid" : "")
                                        }
                                        name="country_id" onChange={(e) => {
                                    this.handleChange(e)
                                }}>
                                    <option disabled selected>Select country</option>
                                    {
                                        staticData.countries.map((country, index) => {
                                            return (
                                                <>
                                                    <option key={index} data-iso={country.iso2_code}
                                                            value={country.id}>{CapitalizeFirstLetter(country.name)}</option>
                                                </>
                                            )
                                        })}
                                </select>
                            </div>
                            <div className="col-md-12 col-12 form-group mb-0" ref={this.phoneRef}>

                                <PhoneInput
                                    inputProps={{
                                        name: 'mobile_number',
                                        required: true,
                                    }}
                                    inputClass={
                                        (this.state.errors.mobile_number ? " is-invalid" : "")
                                    }
                                    disableDropdown={false}
                                    disableCountryCode={false}
                                    disableCountryGuess={true}
                                    countryCodeEditable={false}
                                    country={this.state.country_iso ? this.state.country_iso.toLowerCase() : this.props.ipCountry ? this.props.ipCountry?.country_code.toLowerCase() : "in"}
                                    value={this.state.data.mobile_number}
                                    onChange={phone => this.setState({
                                        data: {
                                            ...this.state.data,
                                            mobile_number: "+" + phone
                                        }
                                    })}
                                />
                            </div>
                            <div className="col-12 form-group mb-0 mt-3 w-100 checkbox">
                                <div className="style-checkbox">
                                    <div className="col-12 item">
                                        <input value={this.state.term_condition} onChange={(e) => {
                                            this.handleCheckChange(e)
                                        }} type="checkbox" id="agree_terms_request" aria-describedby="emailHelp"/>
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
                    </div>
                    <div className="modal-footer text-center mb-0">
                        <div className="col-12 text-center mb-0">
                            <button type="button" className="btn w-80 user_info_btn" disabled={this.state.disable?true:false} onClick={(e)=>this.handleRequest(e)}>Confirm your details</button>
                            <div className="col-12 text-center mt-2">
                                <a className="close-modal" id="not_submit" type="button" data-dismiss="modal"
                                   aria-label="Close" onClick={() => {
                                    this.setState({
                                        show: false
                                    },()=>{
                                        this.props.post({show: false})
                                    })
                                }}>Not now</a>
                            </div>
                        </div>
                    </div>
                </Modal>
                <VerifyOtpModal for={2} show={this.state.verification} type={this.state.verification_type}
                                value={this.state.verification_value}/>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    getUserInfo: state.UserReducer,
});
export default withCookies(connect(mapStateToProps, null)(UserInfoModal));
