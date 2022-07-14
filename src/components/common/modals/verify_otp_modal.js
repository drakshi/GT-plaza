import React from "react";
import {Modal} from "react-bootstrap";
import {NotificationManager} from "react-notifications";
import API from "../../../api/api.service";
import {instanceOf} from "prop-types";
import {Cookies, withCookies} from "react-cookie";
import Router from "next/router";
import LoadingBar from "react-top-loading-bar";
import {setUserInfo} from "../../../redux/action/userAction";
import {connect} from "react-redux";

const api = new API();

class VerifyOtpModal extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            data: {
                first: null,
                second: null,
                third: null,
                forth: null,
                fifth: null
            },
            progress:0,
            disable:false,
            errorAlert: null,
            show: null,
            errors: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.otpResend = this.otpResend.bind(this);
        this.autoTab = this.autoTab.bind(this);
        this.firstRef = React.createRef();
        this.secondRef = React.createRef();
        this.thirdRef = React.createRef();
        this.forthRef = React.createRef();
        this.fifthRef = React.createRef();
    }

    otpResend(data) {
        api.resend(data,
            this.setState({progress:30}),

            setTimeout(() => {
                this.setState({ progress: 90 });
            }, 1000)
        )
            .then((success) => {
                this.setState({
                    data: {
                        first: "",
                        second: "",
                        third: "",
                        forth: "",
                        fifth: ""
                    },
                    progress:100,
                    disable:false,
                }, () => {
                    NotificationManager.success(success.data.message);
                    this.setState({
                        errorAlert: null,
                        errors: [],
                    });
                })
            })
            .catch((error) => {
                this.setState({
                    progress:100,
                    disable:false,
                    errorAlert: error.response.data.message,
                });
            });
    }

    handleChange(event) {
        let inputData = this.state.data;
        inputData[event.target.name] = event.target.value;
        this.setState({data: inputData});
        delete this.state.errors[event.target.name]
    }

    handleSubmit(event) {

        this.setState({
            disable:true,
            errorAlert: null,
            errors: [],
        });

        event.preventDefault();

        let errors = {};

        if (this.state.data.first === null || this.state.data.first === "" ) {
            errors["first"] = "Enter first";
            this.firstRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            this.setState({errors: errors,disable:false});
            return false;
        }

        if (this.state.data.second === null || this.state.data.second === "") {
            errors["second"] = "Enter second";
            this.secondRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            this.setState({errors: errors,disable:false});
            return false;
        }

        if (this.state.data.third === null || this.state.data.third === "") {
            errors["third"] = "Enter third";
            this.thirdRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            this.setState({errors: errors,disable:false});
            return false;
        }

        if (this.state.data.forth === null || this.state.data.forth === "") {
            errors["forth"] = "Enter forth";
            this.forthRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            this.setState({errors: errors,disable:false});
            return false;
        }

        if (this.state.data.fifth === null || this.state.data.fifth === "") {
            errors["fifth"] = "Enter fifth";
            this.fifthRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            this.setState({errors: errors,disable:false});
            return false;
        }

        //EMAIL (1)
        var emailObjet = {
            otp: (this.state.data.first + this.state.data.second + this.state.data.third + this.state.data.forth + this.state.data.fifth),
            email: this.props.value
        };

        //PHONE (2)
        var phoneObject = {
            otp: (this.state.data.first + this.state.data.second + this.state.data.third + this.state.data.forth + this.state.data.fifth),
            phone: this.props.value
        };

        api.otpVerification(this.props.type === 1 ? emailObjet : phoneObject,
            this.setState({progress:30}),

            setTimeout(() => {
                this.setState({ progress: 90 });
            }, 1000)
        ).then((success) => {
                NotificationManager.success(success.data.message);
                this.setState({
                    progress:100,
                    disable:false,
                    show: false
                }, () => {
                    //If request for forgot password verification
                    if (this.props?.for === 3){
                        Router.push({
                            pathname: '/reset-password',
                            query: { email: btoa(this.props.value) }
                        })
                    }else{
                        const {cookies} = this.props;
                        cookies.set("auth_token", success.data.response.token);
                        api.authMe(
                            success.data.response?.token
                        ).then((success) => {
                            this.props.userInfo(success.data.response);
                            Router.push("/user/dashboard");
                        });
                    }
                })
            }).catch((error) => {
            this.setState({
                data: {
                    first: "",
                    second: "",
                    third:"",
                    forth: "",
                    fifth: ""
                },
                progress:100,
                disable:false,
                errorAlert: error.response.data.message,
            });
        });
    }

    autoTab = (e) => {
        const BACKSPACE_KEY = 8;
        const DELETE_KEY = 46;
        let tabindex = e.target.tabIndex || 0;
        tabindex = Number(tabindex);
        if (e.keyCode === BACKSPACE_KEY) {
            tabindex -= 1;
        } else if (e.keyCode !== DELETE_KEY) {
            tabindex += 1;
        }
        if(tabindex <= 4 && tabindex > -1){
            console.log(tabindex);
            document.getElementById("number"+tabindex).focus();
        }
    };

    render() {

        return (<>
            <LoadingBar progress={this.state.progress} color="blue" />
            <Modal size="sm" show={this.state.show === false ? this.state.show : this.props.show}
                   className="verification-modal">
                <Modal.Body>
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
                    <form>
                        <div className="d-flex data-list justify-content-center align-items-center">
                            <div className="card">
                                <h5 className="m-0">Account created successfully</h5>
                                <span
                                    className="mobile-text"> {this.props.type === 2 ? "Please verify your Mobile Number" : "Please verify your Email Address"}
                                    <br/>
                                    <b id="verificationMobile" className="text-danger">{this.props.value}</b></span>
                                <div className="d-flex otp-list flex-row mt-3">
                                    <input type="text" maxLength="1" id="number0"
                                           ref={this.firstRef}
                                           className={
                                               "form-control" +
                                               (this.state.errors.first ? " is-invalid" : "")
                                           }
                                           value={this.state.data.first}
                                           name="first"
                                           min="0" max="9"
                                           onKeyPress={(event) => {
                                               if (!/[0-9]/g.test(event.key)) {
                                                   event.preventDefault();
                                               }
                                           }}
                                           onKeyUp={this.autoTab}
                                           onChange={(e) => {
                                               this.handleChange(e)
                                           }}
                                           tabIndex={0}
                                           autoFocus
                                    />
                                    <input name="second" type="text" maxLength="1" id="number1"
                                           ref={this.secondRef}
                                           className={
                                               "form-control" +
                                               (this.state.errors.second ? " is-invalid" : "")
                                           }
                                           value={this.state.data.second}
                                           min="0" max="9"
                                           onKeyPress={(event) => {
                                               if (!/[0-9]/g.test(event.key)) {
                                                   event.preventDefault();
                                               }
                                           }}
                                           tabIndex={1}
                                           onKeyUp={this.autoTab}
                                           onChange={(e) => {
                                               this.handleChange(e)
                                           }}
                                    />
                                    <input name="third" type="text" maxLength="1" id="number2"
                                           ref={this.thirdRef}
                                           className={
                                               "form-control" +
                                               (this.state.errors.third ? " is-invalid" : "")
                                           }
                                           value={this.state.data.third}
                                           min="0" max="9"
                                           onKeyPress={(event) => {
                                               if (!/[0-9]/g.test(event.key)) {
                                                   event.preventDefault();
                                               }
                                           }}
                                           tabIndex={2}
                                           onKeyUp={this.autoTab}
                                           onChange={(e) => {
                                               this.handleChange(e)
                                           }}
                                    />
                                    <input name="forth" type="text" maxLength="1" id="number3"
                                           ref={this.forthRef}
                                           className={
                                               "form-control" +
                                               (this.state.errors.forth ? " is-invalid" : "")
                                           }
                                           value={this.state.data.forth}
                                           min="0" max="9"
                                           onKeyPress={(event) => {
                                               if (!/[0-9]/g.test(event.key)) {
                                                   event.preventDefault();
                                               }
                                           }}
                                           tabIndex={3}
                                           onKeyUp={this.autoTab}
                                           onChange={(e) => {
                                               this.handleChange(e)
                                           }}
                                    />
                                    <input name="fifth" type="text" maxLength="1" id="number4"
                                           ref={this.fifthRef}
                                           className={
                                               "form-control" +
                                               (this.state.errors.fifth ? " is-invalid" : "")
                                           }
                                           value={this.state.data.fifth}
                                           min="0" max="9"
                                           onKeyPress={(event) => {
                                               if (!/[0-9]/g.test(event.key)) {
                                                   event.preventDefault();
                                               }
                                           }}
                                           onKeyUp={this.autoTab}
                                           tabIndex={4}
                                           onChange={(e) => {
                                               this.handleChange(e)
                                           }}
                                    />
                                </div>
                                <div className="text-center mt-3">
                                    <button disabled={ this.state.disable ? true : false} onClick={(e) => {
                                        this.handleSubmit(e)
                                    }} type="button" className="btn btn-block btn-lg btn-primary">Verify
                                    </button>
                                </div>
                                <div className="text-center mt-3"><span
                                    className="d-block mobile-text">Dont receive the code?</span>
                                    <a id="resendMobileOTP" type="button"
                                       onClick={() => {
                                           this.otpResend(
                                               this.props.type === 1 ? {email: this.props.value} : {phone: this.props.value}
                                           )
                                       }}
                                       className="font-weight-bold text-danger cursor">Resend</a>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userInfo: (data) => dispatch(setUserInfo({ type: "UPDATE_USER_INFO", data: data })),
    };
};
export default withCookies(connect(null, mapDispatchToProps)(VerifyOtpModal));




