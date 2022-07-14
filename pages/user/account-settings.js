import React from "react";
import AuthSidebar from "../../src/components/common/afterAuth/auth_sidebar";
import Link from "next/link";
import {instanceOf} from "prop-types";
import {Cookies, withCookies} from "react-cookie";
import API from "../../src/api/api.service";
import {connect} from "react-redux";
import {staticData} from "../../static";
import {CapitalizeFirstLetter, validateEmail} from "../../src/helper";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {NotificationManager} from "react-notifications";
import {setUserInfo} from "../../src/redux/action/userAction";
import LoadingBar from "react-top-loading-bar";
import {images} from "../../constant";
import SeoMeta from "../../src/components/common/meta/seo_meta";

const api = new API();

class AccountSettings extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            progress:0,
            token: this.props.cookies.get('auth_token'),
            profile: null,
            active: "personal",
            data: {
                is_seller: null,
                full_name: null,
                country_id: null,
                state: null,
                city: null,
                zip_code: null
            },
            password_change: {
                current_password: null,
                new_password: null,
                confirm_password: null
            },
            cities: [],
            errors: [],
            errorPasswordAlert: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.resetHandler = this.resetHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.sellerRef = React.createRef();
        this.fullNameRef = React.createRef();
        this.countryRef = React.createRef();
        this.stateRef = React.createRef();
        this.cityRef = React.createRef();
        this.zipRef = React.createRef();
        this.currentPassRef = React.createRef();
        this.newPassRef = React.createRef();
        this.confirmPassRef = React.createRef();
    }

    componentDidMount() {
        if (this.state.profile === null) {
            this.setState({
                profile: this.props?.getUserInfo?.logged_user_info?.data,
                data: {
                    is_seller: this.props?.getUserInfo?.logged_user_info?.data?.is_seller?.toString(),
                    full_name: this.props?.getUserInfo?.logged_user_info?.data?.full_name,
                    country_id: this.props?.getUserInfo?.logged_user_info?.data?.preference?.country_id.toString(),
                    state: this.props?.getUserInfo?.logged_user_info?.data?.preference?.state,
                    city: this.props?.getUserInfo?.logged_user_info?.data?.preference?.city,
                    zip_code: this.props?.getUserInfo?.logged_user_info?.data?.preference?.zip_code
                }
            }, () => {
                let that = this;
                var state = staticData.states.find(function (e, i) {
                    return e.name === that.state.data?.state
                });
                if (state) {
                    var cities = staticData.cities.filter(function (e, i) {
                        return e.state_id === state.id
                    });
                    this.setState({cities: cities})
                }
            });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.getUserInfo !== this.props.getUserInfo) {
            this.setState({
                profile: this.props?.getUserInfo?.logged_user_info?.data,
                data: {
                    is_seller: this.props?.getUserInfo?.logged_user_info?.data?.is_seller?.toString(),
                    full_name: this.props?.getUserInfo?.logged_user_info?.data?.full_name,
                    country_id: this.props?.getUserInfo?.logged_user_info?.data?.preference?.country_id.toString(),
                    state: this.props?.getUserInfo?.logged_user_info?.data?.preference?.state,
                    city: this.props?.getUserInfo?.logged_user_info?.data?.preference?.city,
                    zip_code: this.props?.getUserInfo?.logged_user_info?.data?.preference?.zip_code
                }
            }, () => {
                let that = this;
                var state = staticData.states.find(function (e, i) {
                    return e.name === that.state.data?.state
                });
                if (state) {
                    var cities = staticData.cities.filter(function (e, i) {
                        return e.state_id === state.id
                    });
                    this.setState({cities: cities})
                }
            })
        }
    }

    handlePasswordChange(event) {
        let inputData = this.state.password_change;
        inputData[event.target.name] = event.target.value;
        this.setState({data: inputData});
    }

    resetHandler(event) {

        event.preventDefault();

        this.setState({
            errorPasswordAlert: null,
            errors: [],
        });

        let errors = {};

        if (this.state.password_change.current_password === null || this.state.password_change.current_password === "") {
            errors["current_password"] = "Please enter current password";
            this.currentPassRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            this.setState({errors: errors});
            return false;
        }
        if (this.state.password_change.new_password === null || this.state.password_change.new_password === "") {
            errors["new_password"] = "Please enter new password";
            this.newPassRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            this.setState({errors: errors});
            return false;
        }
        if (this.state.password_change.confirm_password === null || this.state.password_change.confirm_password === "") {
            errors["confirm_password"] = "Please enter confirm password";
            this.confirmPassRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            this.setState({errors: errors});
            return false;
        }

        api.resetPassword(
            this.state.data,
            this.setState({progress:30}),

            setTimeout(() => {
                this.setState({ progress: 90 });
            }, 1000)

        )
            .then((success) => {
                this.setState({
                    password_change: {
                        progress:100,
                        current_password: "",
                        new_password: "",
                        confirm_password: ""
                    },
                });
                NotificationManager.success(success.data.message);
            })
            .catch((error) => {
                this.setState({
                    progress:100,
                    errorPasswordAlert: error.response.data.message,
                });
            });
    }

    handleChange(event) {
        let inputData = this.state.data;
        inputData[event.target.name] = event.target.value;
        if (event.target.name === "country_id") {
            this.setState({data: {...this.state.data, state: null, city: null}, cities: []}, () => {
                var index1 = event.target.selectedIndex;
                var optionElement1 = event.target.childNodes[index1];
                var option1 = optionElement1.getAttribute('data-iso');
                if (option1) {
                    this.setState({country_iso: option1})
                }
            });
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
    }

    handleSubmit(event) {

        this.setState({
            errorAlert: null,
            errors: [],
        });

        event.preventDefault();

        let errors = {};

        if (this.state.data.is_seller === null) {
            errors["is_seller"] = "Please select is_seller";
            this.sellerRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            this.setState({errors: errors});
            return false;
        }
        if (this.state.data.full_name === null || this.state.data.full_name === "") {
            errors["full_name"] = "Enter full_name";
            this.fullNameRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            this.setState({errors: errors});
            return false;
        }
        if (this.state.data.country_id === null) {
            errors["country_id"] = "Please select country";
            this.countryRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            this.setState({errors: errors});
            return false;
        }
        if (this.state.data.state === "103" && this.state.data.state === null) {
            errors["state"] = "Please select state";
            this.stateRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            this.setState({errors: errors});
            return false;
        }
        if (this.state.data.state === "103" && this.state.data.city === null) {
            errors["city"] = "Please select city";
            this.cityRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            this.setState({errors: errors});
            return false;
        }
        if (this.state.data.zip_code === null) {
            errors["zip_code"] = "Please select zip code";
            this.zipRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            this.setState({errors: errors});
            return false;
        }

        api.authProfile(
            this.state.data,
            this.setState({progress:30}),

            setTimeout(() => {
                this.setState({ progress: 90 });
            }, 1000)

        )
            .then((success) => {
                NotificationManager.success(success.data.message);
                this.props.userInfo(success.data.response);
                this.setState({progress:100})
            })
            .catch((error) => {
                this.setState({
                    errorAlert: error.response.data.message,
                    progress:100
                });
            });
    }


    render() {

        return (
            <>
                <SeoMeta title={"Account Settings - Global Trade Plaza"}
                         description={"Best B2B Marketplace Platform and Top 10 b2b Portal in India is Global Trade Plaza. We are Business to Business Import Export Portal helping companies, Traders and Manufacturers to find Buyers"}
                />
                 <LoadingBar progress={this.state.progress} color="blue" />
                <section className="dashboard">
                    <div className="container-fluid main-content">
                        <div className="row">
                            <AuthSidebar active={"account-settings"}/>
                            <div className="col-md-9 col-12 right p-gt">
                                <div className="heading main">
                                    <h3>Account settings</h3>
                                </div>

                                <div className="tabbable-panel">
                                    <div className="tabbable-line">
                                        <ul className="nav nav-tabs ">
                                            <li>
                                                <a className={this.state.active === "personal" ? "active" : ""}
                                                   data-toggle="tab"
                                                   onClick={() => {
                                                       this.setState({active: "personal"})
                                                   }}>Personal details</a>
                                            </li>
                                            <li>
                                                <a className={this.state.active === "account" ? "active" : ""}
                                                   data-toggle="tab"
                                                   onClick={() => {
                                                       this.setState({active: "account"})
                                                   }}>Account settings</a>
                                            </li>
                                        </ul>

                                        <div className="tab-content account_settings">

                                            {/*Personal tab*/}
                                            <div
                                                className={this.state.active === "personal" ? "tab-pane active" : "tab-pane"}
                                                id="personal">
                                                <div className="col-12 t-box">
                                                    <div className="heading">
                                                        <h3>Basic information</h3>
                                                    </div>
                                                    <div className="col-8 form-user">
                                                        <div className="row box">
                                                            <div className="col-4 label">
                                                                <p>I am a</p>
                                                            </div>
                                                            <div className="col-8 form-group">
                                                                <div ref={this.sellerRef} className={
                                                                    "toggle-mode valid-control " +
                                                                    (this.state.errors.sellerRef ? " is-invalid" : "")
                                                                }>
                                                                    <input id="toggle-on"
                                                                           className="toggle toggle-left"
                                                                           name="is_seller"
                                                                           value="1"
                                                                           type="radio"
                                                                           checked={this.state.data.is_seller === "1" ? true : false}
                                                                           onChange={(e) => {
                                                                               this.handleChange(e)
                                                                           }}
                                                                    />
                                                                    <label htmlFor="toggle-on"
                                                                           className="btn-toggle">Seller</label>

                                                                    <input id="toggle-off"
                                                                           className="toggle toggle-right"
                                                                           name="is_seller" value="0"
                                                                           type="radio"
                                                                           checked={this.state.data.is_seller === "0" ? true : false}
                                                                           onChange={(e) => {
                                                                               this.handleChange(e)
                                                                           }}
                                                                    />
                                                                    <label htmlFor="toggle-off"
                                                                           className="btn-toggle">Buyer</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row box">
                                                            <div className="col-4 label">
                                                                <p>Full name</p>
                                                            </div>
                                                            <div className="col-8 form-group">
                                                                <input type="text"
                                                                       className={
                                                                           "form-control valid-control " +
                                                                           (this.state.errors.full_name ? " is-invalid" : "")
                                                                       }
                                                                       ref={this.fullNameRef}
                                                                       name="full_name"
                                                                       id="full_name"
                                                                       placeholder="Enter here .."
                                                                       value={this.state.data?.full_name}
                                                                       onChange={(e) => {
                                                                           this.handleChange(e)
                                                                       }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row box">
                                                            <div className="col-4 label">
                                                                <p>Email</p>
                                                            </div>
                                                            <div className="col-8 form-group">
                                                                <input type="email"
                                                                       className="form-control"
                                                                       id="email"
                                                                       aria-describedby="emailHelp"
                                                                       disabled
                                                                       placeholder="Enter here .."
                                                                       value={this.state.profile?.email}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row box">
                                                            <div className="col-4 label">
                                                                <p>Mobile number</p>
                                                            </div>
                                                            <div className="col-8 form-group">
                                                                <PhoneInput
                                                                    international
                                                                    inputProps={{
                                                                        name: 'phone',
                                                                        required: true,
                                                                    }}
                                                                    value={this.state.profile?.phone}
                                                                    inputClass="form-control"
                                                                    disabled={true}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row box">
                                                            <div className="col-4 label">
                                                                <p>Country</p>
                                                            </div>
                                                            <div className="col-8 form-group">
                                                                <select name="country_id"
                                                                        id="country_id"
                                                                        ref={this.countryRef}
                                                                        className={
                                                                            "form-control valid-control " +
                                                                            (this.state.errors.country_id ? " is-invalid" : "")
                                                                        }
                                                                        onChange={(e) => {
                                                                            this.handleChange(e)
                                                                        }}
                                                                >
                                                                    <option disabled selected>Select country</option>
                                                                    {
                                                                        staticData.countries.map((country, index) => {
                                                                            return (
                                                                                <>
                                                                                    <option key={index}
                                                                                            data-iso={country.iso3_code}
                                                                                            selected={country.id.toString() === this.state.data?.country_id?.toString()}
                                                                                            value={country.id}>{CapitalizeFirstLetter(country.name)}</option>
                                                                                </>
                                                                            )
                                                                        })}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="row box">
                                                            <div className="col-4 label">
                                                                <p>State</p>
                                                            </div>
                                                            <div className="col-8 form-group" id="state_text">
                                                                {this.state.data.country_id === "103" ?
                                                                    <select value={this.state.data?.state}
                                                                            className={
                                                                                "form-control valid-control " +
                                                                                (this.state.errors.state ? " is-invalid" : "")
                                                                            }
                                                                            ref={this.stateRef}
                                                                            name="state" onChange={(e) => {
                                                                        this.handleChange(e)
                                                                    }}>
                                                                        <option disabled selected>Select state</option>
                                                                        {
                                                                            staticData.states.map((state, index) => {
                                                                                return (
                                                                                    <>
                                                                                        <option data-id={state.id}
                                                                                                key={index}
                                                                                                value={state.name}>{CapitalizeFirstLetter(state.name.toLowerCase())}</option>
                                                                                    </>
                                                                                )
                                                                            })}
                                                                    </select>
                                                                    :
                                                                    <input autoComplete="off"
                                                                           ref={this.stateRef}
                                                                           type="text"
                                                                           className={
                                                                               "form-control valid-control " +
                                                                               (this.state.errors.state ? " is-invalid" : "")
                                                                           }
                                                                           name="state" id="state"
                                                                           placeholder="Enter here .."
                                                                           value={this.state.data?.state}
                                                                           onChange={(e) => {
                                                                               this.handleChange(e)
                                                                           }}
                                                                    />
                                                                }
                                                            </div>
                                                        </div>

                                                        <div
                                                            className={this.state.cities.length ? "col-12 p-0" : "col-12 p-0 d-none"}>
                                                            <div className="row box">
                                                                <div className="col-4 label">
                                                                    <p>City</p>
                                                                </div>
                                                                <div className="col-8 form-group" id="city_text_data">
                                                                    <select ref={this.cityRef}
                                                                            value={this.state.data?.city}
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
                                                            </div>
                                                        </div>
                                                        <div className="row box">
                                                            <div className="col-4 label">
                                                                <p>Zip / postal code</p>
                                                            </div>
                                                            <div className="col-8 form-group">
                                                                <input type="text"
                                                                       className={
                                                                           "form-control valid-control " +
                                                                           (this.state.errors.zip_code ? " is-invalid" : "")
                                                                       }
                                                                       name="zip_code"
                                                                       id="zip_code"
                                                                       ref={this.zipRef}
                                                                       placeholder="Enter here .."
                                                                       value={this.state.data?.zip_code}
                                                                       onChange={(e) => {
                                                                           this.handleChange(e)
                                                                       }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="button-div">
                                                            <button type="button" className="btn" onClick={(e) => {
                                                                this.handleSubmit(e)
                                                            }}>Save
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            {/*Account tab*/}
                                            <div
                                                className={this.state.active === "account" ? "tab-pane active" : "tab-pane"}
                                                id="account">
                                                <div className="row">
                                                    <div className="col-md-6 half">
                                                        <div className="col-12 t-box">
                                                            <div className="heading">
                                                                <h3>Membership details</h3>
                                                            </div>
                                                            <div className="col-12 form-user">
                                                                <div className="row box">
                                                                    <div className="col-4 label">
                                                                        <p>Member ID</p>
                                                                    </div>
                                                                    <div className="col-8 form-group">
                                                                        <input id="members_id" type="text"
                                                                               className="form-control"
                                                                               value={this.state.profile?.membership ? "GTP"+this.state.profile?.membership?.id : "GTP"}
                                                                               disabled/>
                                                                    </div>
                                                                </div>
                                                                <div className="row box">
                                                                    <div className="col-4 label">
                                                                        <p>Active membership</p>
                                                                    </div>
                                                                    <div className="col-8 form-group append">
                                                                        <div className="member-img">
                                                                            <p>{this.state.profile?.membership ? this.state.profile?.membership?.plan?.title : "Free Member"}</p>
                                                                            <img id="membership_src" src={this.state.profile?.membership?.plan?.badges ? this.state.profile?.membership?.plan?.badges : images.classical.default.src} alt=""/>
                                                                        </div>
                                                                        <input type="text" className="form-control"
                                                                               id="active_membership"
                                                                               value={this.state.profile?.membership?.plan?.title ? this.state.profile?.membership?.plan?.title : "Free"}
                                                                               disabled/>
                                                                        <div className="input-group-append">
                                                                            <Link href={"/advertise"}>
                                                                                <a className="btn">
                                                                                    <button className="btn">Upgrade
                                                                                    </button>
                                                                                </a>
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row box">
                                                                    <div className="col-4 label">
                                                                        <p>Valid till</p>
                                                                    </div>
                                                                    <div className="col-8 form-group">
                                                                        <input type="text" className="form-control"
                                                                               id="valid_till"
                                                                               value={this.state.profile?.membership?.end_date ? this.state.profile?.membership?.end_date : "Free"}
                                                                               disabled/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="button-div">
                                                            <button type="submit" className="btn">Save</button>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 half">
                                                        {this.state.errorPasswordAlert ? (
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
                                                                <span>{this.state.errorPasswordAlert}</span>
                                                            </div>
                                                        ) : null}
                                                        <div className="col-12 t-box">
                                                            <div className="heading">
                                                                <h3>Password Settings</h3>
                                                            </div>
                                                            <div className="col-12 form-user">
                                                                <form id="resetForm">
                                                                    <div className="row box">
                                                                        <div className="col-4 label">
                                                                            <p>Existing password</p>
                                                                        </div>
                                                                        <div className="col-8 form-group">
                                                                            <input type="password"
                                                                                   ref={this.currentPassRef}
                                                                                   className={
                                                                                       "form-control valid-control " +
                                                                                       (this.state.errors.current_password ? " is-invalid" : "")
                                                                                   }
                                                                                   name="current_password"
                                                                                   onChange={(e) => {
                                                                                       this.handlePasswordChange(e)
                                                                                   }}
                                                                                   id="current_password"
                                                                                   aria-describedby="emailHelp"
                                                                                   placeholder="Enter here .."/>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row box">
                                                                        <div className="col-4 label">
                                                                            <p>New password</p>
                                                                        </div>
                                                                        <div className="col-8 form-group">
                                                                            <input type="password"
                                                                                   ref={this.newPassRef}
                                                                                   onChange={(e) => {
                                                                                       this.handlePasswordChange(e)
                                                                                   }}
                                                                                   className={
                                                                                       "form-control valid-control " +
                                                                                       (this.state.errors.new_password ? " is-invalid" : "")
                                                                                   }
                                                                                   name="new_password"
                                                                                   id="new_password"
                                                                                   aria-describedby="emailHelp"
                                                                                   placeholder="Enter here .."/>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row box">
                                                                        <div className="col-4 label">
                                                                            <p>Confirm password</p>
                                                                        </div>
                                                                        <div className="col-8 form-group">
                                                                            <input type="password"
                                                                                   ref={this.confirmPassRef}
                                                                                   className={
                                                                                       "form-control valid-control " +
                                                                                       (this.state.errors.confirm_password ? " is-invalid" : "")
                                                                                   }
                                                                                   onChange={(e) => {
                                                                                       this.handlePasswordChange(e)
                                                                                   }}
                                                                                   name="confirm_password"
                                                                                   id="confirm_password"
                                                                                   aria-describedby="emailHelp"
                                                                                   placeholder="Enter here .."/>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                        <div className="button-div">
                                                            <button type="button" className="btn" onClick={(e) => {
                                                                this.resetHandler(e)
                                                            }}>Save
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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

const mapStateToProps = (state) => ({
    getUserInfo: state.UserReducer,
});

const mapDispatchToProps = (dispatch) => {
    return {
        userInfo: (data) => dispatch(setUserInfo({type: "UPDATE_USER_INFO", data: data})),
    };
};

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(AccountSettings));



