import React from 'react';
import {validateEmail} from "../src/helper";
import {NotificationManager} from "react-notifications";
import API from "../src/api/api.service";
const api = new API();
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {images} from "../constant";
import LoadingBar from "react-top-loading-bar";
import Link from "next/link";
import SeoMeta from "../src/components/common/meta/seo_meta";


class Contact extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            progress:0,
            data: {
                first_name: null,
                last_name: null,
                email: null,
                phone: null,
                company_name: null,
                subject: null,
                message:null,
            },
            term_condition : false,
            errors: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.firstNameRef = React.createRef();
        this.lastNameRef = React.createRef();
        this.phoneRef = React.createRef();
        this.emailRef = React.createRef();
        this.companyNameRef = React.createRef();
        this.subjectRef = React.createRef();
        this.messageRef = React.createRef();
        this.alertBox = React.createRef();
    }

    handleChange(event){
        //console.log(event.target.value);
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
            errors["first_name"] = "Enter First Name";
            this.firstNameRef.current.scrollIntoView({
                behavior: "smooth",
               block: "center",
            });
            this.setState({errors: errors});
        }
        if (this.state.data.last_name === null || this.state.data.last_name === "") {
            errors["last_name"] = "Enter Last Name";
            this.lastNameRef.current.scrollIntoView({
                behavior: "smooth",
               block: "center",
            });
            this.setState({errors: errors});
        }
        if (
            this.state.data.email === null ||
            !validateEmail(this.state.data.email) || this.state.data.email === ""
        ) {
            errors["email"] = "Enter valid Email Address";
            this.emailRef.current.scrollIntoView({
                behavior: "smooth",
               block: "center",
            });
            this.setState({errors: errors});
        }

        if (this.state.data.phone === null || this.state.data.phone === "") {
            errors["phone"] = "Enter Phone Number";
            this.phoneRef.current.scrollIntoView({
                behavior: "smooth",
               block: "center",
            });
            this.setState({errors: errors});
        }
        if (this.state.data.company_name === null || this.state.data.company_name === "") {
            errors["company_name"] = "Enter Company Name";
            this.companyNameRef.current.scrollIntoView({
                behavior: "smooth",
               block: "center",
            });
            this.setState({errors: errors});
        }
        if (this.state.data.subject === null || this.state.data.subject === "") {
            errors["subject"] = "Enter Subject";
            this.subjectRef.current.scrollIntoView({
                behavior: "smooth",
               block: "center",
            });
            this.setState({errors: errors});
        }
        if (this.state.data.message === null || this.state.data.message === "") {
            errors["message"] = "Enter Message";
            this.messageRef.current.scrollIntoView({
                behavior: "smooth",
               block: "center",
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
                    block: "start",
                });
            });
            return false;
        }

        api.contactNow(
            this.state.data,
            this.setState({progress:30}),
            setTimeout(() => {
                this.setState({ progress: 90 });
            }, 1000)
        )
            .then((success) => {
                NotificationManager.success(success.data.message);

                this.setState({
                    progress:100,
                    data: {
                        first_name: "",
                        last_name: "",
                        email: "" ,
                        phone: "",
                        company_name: "",
                        subject: "",
                        message: ""
                    },
                    term_condition : false,
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
                <SeoMeta title={"Contact Us - Global Trade Plaza"}
                         description={"Best B2B Marketplace Platform and Top 10 b2b Portal in India is Global Trade Plaza. We are Business to Business Import Export Portal helping companies, Traders and Manufacturers to find Buyers"}
                />
                <LoadingBar progress={this.state.progress} color="#fe3456" />
                <section className="static">
                    <div className="col-12 banner">
                        <img src={images.banner_about.default.src} width="786" height="280" alt=""/>
                        <div className="text">
                            <h3>Contact us</h3>
                            <h1>Contact Us – Global Trade Plaza</h1>
                        </div>
                    </div>
                    <div className="container contact head-view">
                        <div className="col-12 form">
                            <div className="row justify-content-center">
                                <div className="col-md-8 col-12 t-box left ">
                                    <div className="heading">
                                        <h1>Contact Us – Global Trade Plaza</h1>
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
                                    <form className="col-12" id="contactUsForm">
                                        <div className="row">
                                            <input type="hidden" className="form-control" id="country_iso"/>
                                            <div className="col-md-6 col-12 form-group">
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
                                                <input type="test"
                                                       ref={this.lastNameRef}
                                                       name="last_name"
                                                       value={this.state.data.last_name}
                                                       className={
                                                           "form-control valid-control " +
                                                           (this.state.errors.last_name ? " is-invalid" : "")
                                                       }
                                                       onChange={(e) => {this.handleChange(e)}}
                                                       placeholder="Last name" />
                                                {/*<small className="error-text mt-1">*/}
                                                {/*    {this.state.errors.last_name}*/}
                                                {/*</small>*/}
                                            </div>
                                            <div className="col-md-6 col-12 form-group">
                                                <input type="email"
                                                       name="email"
                                                       ref={this.emailRef}
                                                       value={this.state.data.email}
                                                       className={
                                                           "form-control valid-control " +
                                                           (this.state.errors.email ? " is-invalid" : "")
                                                       }
                                                       onChange={(e) => {this.handleChange(e)}}
                                                       placeholder="Email address" />
                                                {/*<small className="error-text mt-1">*/}
                                                {/*    {this.state.errors.email}*/}
                                                {/*</small>*/}
                                            </div>
                                            <div className="col-md-6 col-12 form-group" ref={this.phoneRef}>
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
                                                        delete this.state.errors["phone"];
                                                    })}
                                                />
                                                {/*<small className="error-text mt-1">*/}
                                                {/*    {this.state.errors.phone}*/}
                                                {/*</small>*/}

                                                <span id="valid-msg" className="text-hide">valid</span>
                                                <span id="error-msg" className="hide"></span>
                                            </div>
                                            <div className="col-md-6 col-12 form-group">
                                                <input type="text"
                                                       name="company_name"
                                                       value={this.state.data.company_name}
                                                       ref={this.companyNameRef}
                                                       onChange={(e) => {this.handleChange(e)}}
                                                       className={
                                                           "form-control valid-control " +
                                                           (this.state.errors.company_name ? " is-invalid" : "")
                                                       }
                                                       placeholder="Company name" />
                                                {/*<small className="error-text mt-1">*/}
                                                {/*    {this.state.errors.company_name}*/}
                                                {/*</small>*/}
                                            </div>
                                            <div className="col-md-6 col-12 form-group">
                                                <input type="text"
                                                       name="subject"
                                                       value={this.state.data.subject}
                                                       ref={this.subjectRef}
                                                       className={
                                                           "form-control valid-control " +
                                                           (this.state.errors.subject ? " is-invalid" : "")
                                                       }
                                                       placeholder="Subject"
                                                       onChange = {(e) => {this.handleChange(e)}}
                                                />
                                                {/*<small className="error-text mt-1">*/}
                                                {/*    {this.state.errors.subject}*/}
                                                {/*</small>*/}
                                            </div>
                                            <div className="col-12 form-group">
                                                <textarea type="text"
                                                          name="message"
                                                          className={
                                                              "form-control valid-control " +
                                                              (this.state.errors.message ? " is-invalid" : "")
                                                          }
                                                          placeholder="Message"
                                                          value={this.state.data.message}
                                                          ref={this.messageRef}
                                                          onChange={(e) => {this.handleChange(e)}}

                                                ></textarea>
                                                {/*<small className="error-text mt-1">*/}
                                                {/*    {this.state.errors.message}*/}
                                                {/*</small>*/}

                                            </div>
                                            <div className="col-12 form-group mb-2 w-100 checkbox">
                                                <div className="style-checkbox">
                                                    <div className="col-12 item">
                                                        <input name="agree_terms"
                                                               value={this.state.term_condition}
                                                               type="checkbox"
                                                               id="agree_terms" aria-describedby="emailHelp"
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
                                            <p className="m-0" style={{color: "red"}}>*All fields are mandatory to
                                                fill</p>

                                            <div className="col-12 form-group text-center">
                                                <button type="submit" className="btn" onClick={(e)=>{this.handleSubmit(e)}}>Contact now</button>
                                            </div>

                                        </div>
                                    </form>
                                </div>
                                <div className="col-md-4 col-12 right t-box">
                                    <div className="col-12 box">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                            <path fill="currentColor"
                                                  d="M128 148v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12zm140 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-128 96h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm128 0h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-76 84v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm76 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm180 124v36H0v-36c0-6.6 5.4-12 12-12h19.5V24c0-13.3 10.7-24 24-24h337c13.3 0 24 10.7 24 24v440H436c6.6 0 12 5.4 12 12zM79.5 463H192v-67c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v67h112.5V49L80 48l-.5 415z"></path>
                                        </svg>
                                        <h5>USA</h5>
                                        <h6>3 Germay Dr, Unit 4 #2174 Wilmington, USA 19804</h6>
                                    </div>
                                    <div className="col-12 box">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                            <path fill="currentColor"
                                                  d="M128 148v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12zm140 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-128 96h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm128 0h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-76 84v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm76 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm180 124v36H0v-36c0-6.6 5.4-12 12-12h19.5V24c0-13.3 10.7-24 24-24h337c13.3 0 24 10.7 24 24v440H436c6.6 0 12 5.4 12 12zM79.5 463H192v-67c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v67h112.5V49L80 48l-.5 415z"></path>
                                        </svg>
                                        <h5>Kanpur</h5>
                                        <h6>Second Floor, 13/391, Green Park, Civil Lines, Kanpur, Uttar Pradesh, India
                                            208001</h6>
                                    </div>
                                    <div className="col-12 box">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                            <path fill="currentColor"
                                                  d="M128 148v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12zm140 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-128 96h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm128 0h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-76 84v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm76 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm180 124v36H0v-36c0-6.6 5.4-12 12-12h19.5V24c0-13.3 10.7-24 24-24h337c13.3 0 24 10.7 24 24v440H436c6.6 0 12 5.4 12 12zM79.5 463H192v-67c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v67h112.5V49L80 48l-.5 415z"></path>
                                        </svg>
                                        <h5>Delhi</h5>
                                        <h6> 55, 2nd floor , lane 2 ,Westend Marg , Saidullajab ,New Delhi, Delhi , 110030, India</h6>
                                    </div>
                                    <div className="col-12 box">
                                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="phone-alt"
                                             role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                             className="svg-inline--fa fa-phone-alt fa-w-16 fa-3x">
                                            <path fill="currentColor"
                                                  d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"
                                                  className=""></path>
                                        </svg>
                                        <h6>Phone</h6>
                                        <h5>+91-8429088885</h5>
                                    </div>
                                    <div className="col-12 box">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path fill="currentColor"
                                                  d="M494.586 164.516c-4.697-3.883-111.723-89.95-135.251-108.657C337.231 38.191 299.437 0 256 0c-43.205 0-80.636 37.717-103.335 55.859-24.463 19.45-131.07 105.195-135.15 108.549A48.004 48.004 0 0 0 0 201.485V464c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V201.509a48 48 0 0 0-17.414-36.993zM464 458a6 6 0 0 1-6 6H54a6 6 0 0 1-6-6V204.347c0-1.813.816-3.526 2.226-4.665 15.87-12.814 108.793-87.554 132.364-106.293C200.755 78.88 232.398 48 256 48c23.693 0 55.857 31.369 73.41 45.389 23.573 18.741 116.503 93.493 132.366 106.316a5.99 5.99 0 0 1 2.224 4.663V458zm-31.991-187.704c4.249 5.159 3.465 12.795-1.745 16.981-28.975 23.283-59.274 47.597-70.929 56.863C336.636 362.283 299.205 400 256 400c-43.452 0-81.287-38.237-103.335-55.86-11.279-8.967-41.744-33.413-70.927-56.865-5.21-4.187-5.993-11.822-1.745-16.981l15.258-18.528c4.178-5.073 11.657-5.843 16.779-1.726 28.618 23.001 58.566 47.035 70.56 56.571C200.143 320.631 232.307 352 256 352c23.602 0 55.246-30.88 73.41-45.389 11.994-9.535 41.944-33.57 70.563-56.568 5.122-4.116 12.601-3.346 16.778 1.727l15.258 18.526z"></path>
                                        </svg>
                                        <h6>Email</h6>
                                        <h5><a href="mailto:support@globaltradeplaza.com" style={{textDecoration:"none" , color:"#fff"}}>support@globaltradeplaza.com</a></h5>
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
export default Contact;
