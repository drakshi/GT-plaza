import React from 'react';
import {images} from "../constant";
import {validateEmail} from "../src/helper";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import API from "../src/api/api.service";
const api = new API();
import {NotificationManager} from "react-notifications";
import LoadingBar from "react-top-loading-bar";
import Link from "next/link";
import SeoMeta from "../src/components/common/meta/seo_meta";

class Complaint extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            progress:0,
            data: {
                first_name: null,
                last_name: null,
                email: null,
                phone: null,
                message: null,
            },
            errorAlert : null,
            term_condition : false,
            errors: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.firstNameRef = React.createRef();
        this.lastNameRef = React.createRef();
        this.phoneRef = React.createRef();
        this.emailRef = React.createRef();
        this.messageRef = React.createRef();
        this.alertBox = React.createRef();
    }

    handleChange(event){
        let inputData = this.state.data;
        inputData[event.target.name] = event.target.value;
        this.setState({data: inputData});
        delete this.state.errors[event.target.name];
    }

    handleCheckChange(event) {
        this.setState({
            term_condition: event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        })
    }

    handleSubmit(event) {

        this.setState({
            errorAlert: null,
            errors: [],
        });
        event.preventDefault();
        let errors = {};

        if (this.state.data.first_name === null || this.state.data.first_name === "") {
            errors["first_name"] = "Enter first name";
            this.firstNameRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            this.setState({errors: errors});
        }

        if (this.state.data.last_name === null || this.state.data.last_name === "") {
            errors["last_name"] = "Enter last name";
            this.lastNameRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            this.setState({errors: errors});
        }

        if (
            this.state.data.email === null ||
            !validateEmail(this.state.data.email) || this.state.data.email === ""
        ) {
            errors["email"] = "Enter valid email address";
            this.emailRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            this.setState({errors: errors});
        }

        if (this.state.data.phone === null || this.state.data.phone === "") {
            errors["phone"] = "Enter phone number";
            this.phoneRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            this.setState({errors: errors});
        }

        if (this.state.data.message === null || this.state.data.message === "") {
            errors["message"] = "Enter Message";
            this.messageRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            this.setState({errors: errors});
        }

        if (Object.entries(errors).length > 0) {
            return false;
        }

        if (this.state.term_condition === false) {
            this.setState({errorAlert: "Accept Terms and condition"}, () => {
                this.alertBox.current.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            });
            return false;
        }

        api.complaint(
            this.state.data,
            this.setState({
                progress: 30
            }),
            setTimeout(() => {
                this.setState({ progress: 90 });
            }, 1000)
        )
            .then((success) => {
                NotificationManager.success("Thankyou for your feedback");

                this.setState({
                    progress:100,
                    data: {
                        first_name: "",
                        last_name: "",
                        email: "" ,
                        phone: "",
                        message: ""
                    }
                })
            })
            .catch((error) => {
                this.setState({
                    errorAlert: error.response.data.message,
                    progress:0
                });
            });
    }


        render(){
        return(
            <>
                <SeoMeta title={"Complaint - Global Trade Plaza"}
                         description={"Best B2B Marketplace Platform and Top 10 b2b Portal in India is Global Trade Plaza. We are Business to Business Import Export Portal helping companies, Traders and Manufacturers to find Buyers"}
                />
                <LoadingBar progress={this.state.progress} color="#fe3456" />
                <section className="static">
                    <div className="col-12 banner">
                        <img src={images.banner_about.default.src} width="780" height="280" data-cfasync="false"  alt=""/>
                        <div className="text">
                            <h3>Any Complaint?</h3>
                            <h1>Facing a problem, we have a solution! </h1>
                        </div>
                    </div>
                    <div className="container feedback head-view">
                        <div className="col-12 form">
                            <div className="row justify-content-center">
                                <div className="col-md-8 col-12 t-box left ">
                                    <div className="heading">
                                        <h2>We Apologize for the Inconvenience Caused</h2>
                                    </div>
                                    {this.state.errorAlert ? (
                                        <div
                                            ref={this.alertBox}
                                            role="alert"
                                            className="sc-1wz9i2x-0 fooVeK mt-2"
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
                                    <form id="complaintForm">
                                        <div className="col-12">
                                            <div className="row">
                                                <input type="hidden" className="form-control" id="country_iso" />
                                                <div className="col-md-6 col-12 form-group">
                                                    <input type="hidden" name="type" value="2" />
                                                    <input type="test"
                                                           ref={this.firstNameRef}
                                                           value={this.state.data.first_name}
                                                           onChange={(e) => {this.handleChange(e)}}
                                                           name="first_name"
                                                           className={
                                                               "form-control valid-control " +
                                                               (this.state.errors.first_name ? " is-invalid" : "")
                                                           }
                                                           placeholder="First name" />
                                                    {/*<small className="error-text mt-1">*/}
                                                    {/*    {this.state.errors.first_name}*/}
                                                    {/*</small>*/}
                                                </div>
                                                <div className="col-md-6 col-12 form-group">
                                                    <input
                                                        type="test"
                                                        name="last_name"
                                                        ref={this.lastNameRef}
                                                        value={this.state.data.last_name}
                                                        onChange={(e) => {this.handleChange(e)}}
                                                        className={
                                                            "form-control valid-control "+
                                                            (this.state.errors.last_name ? " is-invalid": "")
                                                        }
                                                        placeholder="Last name" />
                                                    {/*<small className= "error-text mt-1">*/}
                                                    {/*    {this.state.errors.last_name}*/}
                                                    {/*</small>*/}
                                                </div>
                                                <div className="col-md-6 col-12 form-group">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        ref={this.emailRef}
                                                        value={this.state.data.email}
                                                        onChange={(e) => {this.handleChange(e)}}
                                                        className={
                                                            "form-control valid-control "+
                                                            (this.state.errors.email ? " is-invalid": "")
                                                        }
                                                        placeholder="Email address" />
                                                    {/*<small className= "error-text mt-1">*/}
                                                    {/*    {this.state.errors.email}*/}
                                                    {/*</small>*/}

                                                </div>
                                                <div className="col-md-6 col-12 form-group " ref={this.phoneRef}>
                                                    <PhoneInput
                                                        inputProps={{
                                                            name: 'phone',
                                                            required: true,
                                                        }}
                                                        inputClass={
                                                            (this.state.errors.phone ? " is-invalid" : "")
                                                        }
                                                        disableCountryCode={false}
                                                        disableCountryGuess={true}
                                                        countryCodeEditable={false}
                                                        country={this.state.country_iso ? this.state.country_iso.slice(0, -1)?.toLowerCase() : this.props.ipCountry ? this.props.ipCountry?.country_code?.toLowerCase() : "in"}
                                                        value={this.state.data.phone}
                                                        onChange={phone => this.setState({
                                                            data: {
                                                                ...this.state.data,
                                                                phone: phone
                                                            }
                                                        },()=>{
                                                            delete this.state.errors['phone'];
                                                        })}
                                                    />
                                                    {/*<small className="error-text mt-1">*/}
                                                    {/*    {this.state.errors.phone}*/}
                                                    {/*</small>*/}
                                                </div>
                                                <div className="col-12 form-group">
                                                <textarea
                                                    name="message"
                                                    ref={this.messageRef}
                                                    value={this.state.data.message}
                                                    onChange={(e) => {this.handleChange(e)}}
                                                    className={
                                                        "form-control valid-control "+
                                                        (this.state.errors.message ? " is-invalid": "")
                                                    }
                                                    placeholder="Message" >
                                            </textarea>

                                                    {/*<small className= "error-text mt-1">*/}
                                                    {/*    {this.state.errors.message}*/}
                                                    {/*</small>*/}
                                                </div>
                                                <div className="col-12 form-group mb-2 w-100 checkbox">
                                                    <div className="style-checkbox">
                                                        <div className="col-12 item">
                                                            <input name="agree_terms"
                                                                   type="checkbox"
                                                                   id="agree_terms" aria-describedby="emailHelp"
                                                                   value={this.state.term_condition}
                                                                   onChange={(e) => {
                                                                       this.handleCheckChange(e)
                                                                   }}
                                                            />
                                                            <label htmlFor='agree_terms' className="mt-0">
                                                                <span></span>
                                                                I agree with&nbsp;
                                                                <Link href={"/terms"}>
                                                                    <a className="link" target="_blank" rel="noreferrer">terms and conditions</a>
                                                                </Link>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="m-0 text-start" style={{color: "red"}}>*All fields are mandatory to
                                                    fill</p>
                                                <div className="col-12 form-group text-center">
                                                    <button type="submit" className="btn" onClick={(e)=>{this.handleSubmit(e)}}>Submit your complaint</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-md-3 col-12 right ads">
                                    <div className="col-12 t-box" id="complaint-banner-holder">

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
export default Complaint;
