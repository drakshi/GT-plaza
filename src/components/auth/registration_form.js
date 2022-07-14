import React from "react";
import {staticData} from "../../../static";
import {CapitalizeFirstLetter, validateEmail} from "../../helper";
import API from "../../../src/api/api.service";
const api = new API();
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {instanceOf} from "prop-types";
import {Cookies, withCookies} from "react-cookie";
import VerifyOtpModal from "../common/modals/verify_otp_modal";
import {NotificationManager} from "react-notifications";
import Link from "next/link";
import LoadingBar from "react-top-loading-bar";

class RegistrationForm extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            progress:0,
            data: {
                full_name: null,
                email: null,
                country_id: "103",
                state: null,
                city: null,
                phone: null,
                is_seller: 1,
                company_name: null,
                password: null,
                confirm_password: null
            },
            cities: [],
            errorAlert: false,
            term_condition: false,
            verification: false,
            verification_type: 1,
            verification_value : "",
            country_iso: "",
            errors: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckChange = this.handleCheckChange.bind(this);
        this.fullNameRef = React.createRef();
        this.countryRef = React.createRef();
        this.stateRef = React.createRef();
        this.cityRef = React.createRef();
        this.phoneRef = React.createRef();
        this.emailRef = React.createRef();
        this.companyRef = React.createRef();
        this.passwordRef = React.createRef();
        this.confirmPasswordRef = React.createRef();
        this.alertBox = React.createRef();
        this.termRef = React.createRef();
    }

    async componentDidMount() {
        const res = await fetch('https://api.ipstack.com/check?access_key=0bda8244814cecccb33e4f5178601c19');
        const ipCountryNew = await res.json();
        this.setState({country_iso :  ipCountryNew?.country_code})
    }

    handleChange(event) {
        let inputData = this.state.data;
        inputData[event.target.name] = event.target.value;
        if (event.target.name === "country_id") {
            var index1 = event.target.selectedIndex;
            var optionElement1 = event.target.childNodes[index1];
            var option1 = optionElement1.getAttribute('data-iso');
            if (option1) {
                this.setState({country_iso: option1})
            }
        }
        if (event.target.name === "state" && this.state.data.country_id === "103") {
            var index = event.target.selectedIndex;
            var optionElement = event.target.childNodes[index];
            var option = optionElement.getAttribute('data-id');
            if (option) {
                var cities = staticData.cities.filter(function (e, i) {
                    return e.state_id === option
                });
                this.setState({cities: cities})
            }
        }
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

        if (this.state.data.full_name === null || this.state.data.full_name === "") {
            errors["full_name"] = "Enter full_name";
            this.fullNameRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            this.setState({errors: errors});
        }
        if (
            this.state.data.email === null || this.state.data.email === "" ||
            !validateEmail(this.state.data.email)
        ) {
            errors["email"] = "Enter valid email address";
            this.emailRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            this.setState({errors: errors});
        }
        if (this.state.data.country_id === null) {
            errors["country_id"] = "Please select country";
            this.countryRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            this.setState({errors: errors});
        }
        if (this.state.data.state === "103" && this.state.data.state === null) {
            errors["state"] = "Please select state";
            this.stateRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            this.setState({errors: errors});
        }
        if (this.state.data.state === "103" && this.state.data.city === null) {
            errors["city"] = "Please select city";
            this.cityRef.current.scrollIntoView({
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
        if (this.state.data.company_name === null || this.state.data.company_name === "") {
            errors["company_name"] = "Enter company name";
            this.fullNameRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            this.setState({errors: errors});
        }

        if (this.state.data.password === null || this.state.data.password === "") {
            errors["password"] = "Enter password";
            this.passwordRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            this.setState({errors: errors});
        }
        if (this.state.data.confirm_password === null || this.state.data.confirm_password === "") {
            errors["confirm_password"] = "Re-enter your password";
            this.setState({errors: errors});
            this.confirmPasswordRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }

        if (Object.entries(errors).length > 0){
            return false ;
        }

        if (this.state.term_condition === false) {
            this.setState({errorAlert: "Accept Terms and condition"}, () => {
                this.termRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            });
            return false;
        }

        api.signUp(
            this.state.data,
            this.setState({progress:30}),

            setTimeout(() => {
                this.setState({ progress: 90 });
            }, 1000)

        )
            .then((success) => {
                NotificationManager.success(success.data.message);
                if (this.state.data.country_id === "103") {
                    this.setState({verification: true,verification_type : 2,verification_value : this.state.data.phone})
                } else {
                    this.setState({verification: true,verification_type : 1,verification_value : this.state.data.email})
                }
                this.setState({
                    progress:100,
                    data: {
                        full_name: "",
                        email: "",
                        country_id: "103",
                        state: "",
                        city: "",
                        phone: "",
                        is_seller: 1,
                        company_name: "",
                        password: "",
                        confirm_password: ""
                    }
                })
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
                <header>
                    <LoadingBar progress={this.state.progress}/>
                </header>
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
                <form className="needs-validation create_account">
                    <div className="form-group">
                        <input ref={this.fullNameRef} type="text"
                               value={this.state.data.full_name}
                               className={
                                   "form-control" +
                                   (this.state.errors.full_name ? " is-invalid" : "")
                               }
                               name="full_name" placeholder="Full name *" onChange={(e) => {
                            this.handleChange(e)
                        }}/>
                    </div>
                    <div className="form-group">
                        <input ref={this.emailRef} type="email"
                               value={this.state.data.email}
                               className={
                                   "form-control valid-control " +
                                   (this.state.errors.email ? " is-invalid" : "")
                               }
                               name="email" placeholder="Email address *" onChange={(e) => {
                            this.handleChange(e)
                        }}/>
                    </div>
                    <div className="form-group">
                        <select ref={this.countryRef}
                                value={this.state.data.country_id}
                                className={
                                    "form-control valid-control " +
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
                    <div className="form-group" id="state_text">
                        {this.state.data.country_id === "103" ?
                            <select ref={this.stateRef}
                                    value={this.state.data.state}
                                    className={
                                        "form-control valid-control " +
                                        (this.state.errors.state ? " is-invalid" : "")
                                    }
                                    name="state" onChange={(e) => {
                                this.handleChange(e)
                            }}>
                                <option disabled selected>Select state</option>
                                {
                                    staticData.states.map((state, index) => {
                                        return (
                                            <>
                                                <option data-id={state.id} key={index}
                                                        value={state.name}>{CapitalizeFirstLetter(state.name.toLowerCase())}</option>
                                            </>
                                        )
                                    })}
                            </select>
                            :
                            <input type="text" name="state" placeholder="State( optional )"
                                   className="form-control"
                                   onChange={(e) => {
                                       this.handleChange(e)
                                   }}/>
                        }
                    </div>
                    <div className={this.state.data.country_id === "103" && this.state.cities.length ? "form-group w-100" : "form-group w-100 d-none"}>
                        <select ref={this.cityRef}
                                value={this.state.data.city}
                                className={
                                    "form-control valid-control " +
                                    (this.state.errors.city ? " is-invalid" : "")
                                }
                                name="city" onChange={(e) => {
                            this.handleChange(e)
                        }}>
                            <option disabled selected>Select city</option>
                            {
                                this.state.cities.length ? this.state.cities.map((city, index) => {
                                    return (
                                        <>
                                            <option key={index}
                                                    value={city.city}>{CapitalizeFirstLetter(city.city)}</option>
                                        </>
                                    )
                                }) : ""}
                        </select>
                    </div>
                    <div className="form-group" ref={this.phoneRef}>
                        <PhoneInput
                            inputProps={{
                                name: 'phone',
                                required: true,
                            }}
                            placeholder={"Phone number *"}
                            inputClass={ " valid-control" +
                                (this.state.errors.phone ? " is-invalid" : "")
                            }
                            disableDropdown={true}
                            disableCountryCode={false}
                            disableCountryGuess={true}
                            countryCodeEditable={false}
                            country={this.state.country_iso ? this.state.country_iso?.toLowerCase() : ""}
                            value={this.state.data.phone}
                            onChange={phone => this.setState({
                                data: {
                                    ...this.state.data,
                                    phone: "+" + phone
                                }
                            },()=>{
                                delete this.state.errors["phone"];
                            })}
                        />
                    </div>
                    <div className="form-group ">
                        <input ref={this.companyRef} type="text"
                               value={this.state.data.company_name}
                               className={
                                   "form-control valid-control " +
                                   (this.state.errors.company_name ? " is-invalid" : "")
                               }
                               name="company_name" id="company_name"
                               placeholder="Company name *" onChange={(e) => {
                            this.handleChange(e)
                        }}/>
                    </div>
                    <div className="form-group">
                        <input ref={this.passwordRef} type="password"
                               value={this.state.data.password}
                               className={
                                   "form-control valid-control " +
                                   (this.state.errors.password ? " is-invalid" : "")
                               }
                               name="password" id="password"
                               placeholder="Password *" onChange={(e) => {
                            this.handleChange(e)
                        }}/>
                    </div>
                    <div className="form-group">
                        <input ref={this.confirmPasswordRef} type="password"
                               value={this.state.data.confirm_password}
                               className={
                                   "form-control valid-control " +
                                   (this.state.errors.confirm_password ? " is-invalid" : "")
                               }
                               name="confirm_password" id="confirm_password"
                               placeholder="Confirm password *" onChange={(e) => {
                            this.handleChange(e)
                        }}/>
                    </div>
                    <div className="col-12 form-group w-100 checkbox">
                        <div className="style-checkbox">
                            <div className="col-12 item">
                                <input name="agree_terms"
                                       ref={this.termRef} type="checkbox"
                                       value={this.state.term_condition}
                                       className={
                                           (this.state.errors.term_condition ? "is-invalid" : "")
                                       }
                                       id="agree_terms" aria-describedby="emailHelp" onChange={(e) => {
                                    this.handleCheckChange(e)
                                }}/>
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
                    <div className="form-group w-100">
                        <button onClick={(e) => {
                            this.handleSubmit(e)
                        }} type="button" className="btn submit_btn_reg">Join now
                        </button>
                    </div>
                </form>
                <VerifyOtpModal for={1} show={this.state.verification} type={this.state.verification_type} value={this.state.verification_value}/>
            </>
        )
    }
}
export default withCookies(RegistrationForm);



