import React from "react";
import MembershipBanner from "../home/membership_banner";
import {Dropdown, Modal} from "react-bootstrap";
import {instanceOf} from "prop-types";
import {Cookies, withCookies} from "react-cookie";
import {setUserInfo} from "../../../redux/action/userAction";
import {connect} from "react-redux";
import API from "../../../api/api.service";
import {images} from "../../../../constant";
import Link from "next/link";
import HeaderDropDown from "../home/header_dropdown";
const api = new API();

var xDown = null;
var yDown = null;

class AuthHeader extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            token: this.props.cookies.get('auth_token'),
            profile : null,
            showMenu: false,
        };
        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
        if (this.state.token && this.state.profile === null){
            api.authMe(this.state.token).then(res => {
                this.props.userInfo(res.data.response);
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        document.addEventListener('touchstart', (e)=>{this.handleTouchStart(e)}, false);
        document.addEventListener('touchmove',(e)=>{this.handleTouchMove(e)}, false);

        if (prevProps.cookies.get('auth_token') !== this.props.cookies.get('auth_token')){
            this.setState({token : this.props.cookies.get('auth_token')})
        }
        if (prevProps.getUserInfo !== this.props.getUserInfo){
            this.setState({ profile : this.props?.getUserInfo?.logged_user_info?.data })
        }
    }

    getTouches(evt) {
        return evt.touches || evt.originalEvent.touches;
    }

    handleTouchStart(evt) {
        const firstTouch = this.getTouches(evt)[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
    };

    handleTouchMove(evt) {

        if (!xDown || !yDown) {
            return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
            if (xDiff > 0) {
                this.setState({showMenu : false});
            } else {
                //$('#sidebar-modal').modal('show');
            }
        }
        /* reset values */
        xDown = null;
        yDown = null;
    };

    logOut() {
        const {cookies} = this.props;
        cookies.remove("auth_token",  { path: "/" });
        cookies.remove("company_id",  { path: "/user" });
        window.location.href = '/login';
    };

    render() {
        return (
            <>
                <header className="header">
                    <MembershipBanner/>
                    <nav className="navbar navbar-expand-lg navbar-light dash">
                        <Link href="/">
                            <a className="navbar-brand logo">
                                <img className="img-responsive"
                                     src={images.logo_color.default.src}
                                     alt=""/>
                            </a>
                        </Link>

                        <button className="navbar-toggler icon-bars" type="button" data-toggle="collapse"
                                data-target="#navbarNavAltMarkup"
                                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <div className="menu-button" id="menu-trigger" data-toggle="modal"
                                 data-target="#sidebar-modal" onClick={() => {
                                this.setState({showMenu: true})
                            }}>
                                <label className="menu-icon">
                                    <input type="checkbox" />
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                </label>
                            </div>
                        </button>

                        <div className="after-login ">
                            <ul className="nav navbar-nav">
                                <li className="dropdown mr-2">
                                    <Link href={"/user/help"}>
                                        <a className="dropdown-toggle">
                                            <svg className="pr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 400c-18 0-32-14-32-32s13.1-32 32-32c17.1 0 32 14 32 32S273.1 400 256 400zM325.1 258L280 286V288c0 13-11 24-24 24S232 301 232 288V272c0-8 4-16 12-21l57-34C308 213 312 206 312 198C312 186 301.1 176 289.1 176h-51.1C225.1 176 216 186 216 198c0 13-11 24-24 24s-24-11-24-24C168 159 199 128 237.1 128h51.1C329 128 360 159 360 198C360 222 347 245 325.1 258z"/>
                                            </svg>
                                            <b>Help</b>
                                        </a>
                                    </Link>
                                </li>
                                <li className="dropdown">
                                    <HeaderDropDown />
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <div className="">
                        <Modal show={this.state.showMenu} className="mobile-modal sidebar-modal left" id="sidebar-modal">
                            <div className="modal-content">
                                <div className="head-modal">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                                        <path fill="currentColor"
                                              d="M248 104c-53 0-96 43-96 96s43 96 96 96 96-43 96-96-43-96-96-96zm0 144c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm0-240C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-49.7 0-95.1-18.3-130.1-48.4 14.9-23 40.4-38.6 69.6-39.5 20.8 6.4 40.6 9.6 60.5 9.6s39.7-3.1 60.5-9.6c29.2 1 54.7 16.5 69.6 39.5-35 30.1-80.4 48.4-130.1 48.4zm162.7-84.1c-24.4-31.4-62.1-51.9-105.1-51.9-10.2 0-26 9.6-57.6 9.6-31.5 0-47.4-9.6-57.6-9.6-42.9 0-80.6 20.5-105.1 51.9C61.9 339.2 48 299.2 48 256c0-110.3 89.7-200 200-200s200 89.7 200 200c0 43.2-13.9 83.2-37.3 115.9z"></path>
                                    </svg>
                                    <h5 id="company_title">{this.state.profile?.company_name}</h5>
                                    <div className="close-button">
                                        <button type="button" className="close" data-dismiss="modal"
                                                aria-label="Close" onClick={() => {
                                            this.setState({showMenu: false})
                                        }}>
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <div className="mob-modal">
                                        <ul>
                                            <li className="active" onClick={() => {
                                                this.setState({showMenu: false})
                                            }}>
                                                <Link href={'/user/dashboard'} >
                                                    <a>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 544 512">
                                                            <path fill="currentColor"
                                                                  d="M527.79 288H290.5l158.03 158.03c6.04 6.04 15.98 6.53 22.19.68 38.7-36.46 65.32-85.61 73.13-140.86 1.34-9.46-6.51-17.85-16.06-17.85zm-15.83-64.8C503.72 103.74 408.26 8.28 288.8.04 279.68-.59 272 7.1 272 16.24V240h223.77c9.14 0 16.82-7.68 16.19-16.8zM224 288V50.71c0-9.55-8.39-17.4-17.84-16.06C86.99 51.49-4.1 155.6.14 280.37 4.5 408.51 114.83 513.59 243.03 511.98c50.4-.63 96.97-16.87 135.26-44.03 7.9-5.6 8.42-17.23 1.57-24.08L224 288z"
                                                                  className="">
                                                            </path>
                                                        </svg>
                                                         Dashboard
                                                    </a>
                                                </Link>
                                            </li>
                                            <li  onClick={() => {
                                                this.setState({showMenu: false})
                                            }}>
                                                <Link href={"/user/company-profile"}>
                                                    <a>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                            <path fill="currentColor"
                                                                  d="M320 336c0 8.84-7.16 16-16 16h-96c-8.84 0-16-7.16-16-16v-48H0v144c0 25.6 22.4 48 48 48h416c25.6 0 48-22.4 48-48V288H320v48zm144-208h-80V80c0-25.6-22.4-48-48-48H176c-25.6 0-48 22.4-48 48v48H48c-25.6 0-48 22.4-48 48v80h512v-80c0-25.6-22.4-48-48-48zm-144 0H192V96h128v32z"
                                                                  className="">
                                                            </path>
                                                        </svg>
                                                        Company profile
                                                    </a>
                                                </Link>
                                            </li>
                                            <li  onClick={() => {
                                                this.setState({showMenu: false})
                                            }}>
                                                <Link href={"/user/products"}>
                                                    <a>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                                            <path fill="currentColor"
                                                                  d="M554.12 83.51L318.36 4.93a95.962 95.962 0 0 0-60.71 0L21.88 83.51A32.006 32.006 0 0 0 0 113.87v49.01l265.02-79.51c15.03-4.5 30.92-4.5 45.98 0l265 79.51v-49.01c0-13.77-8.81-26-21.88-30.36zm-279.9 30.52L0 196.3v228.38c0 15 10.42 27.98 25.06 31.24l242.12 53.8a95.937 95.937 0 0 0 41.65 0l242.12-53.8c14.64-3.25 25.06-16.24 25.06-31.24V196.29l-274.2-82.26c-9.04-2.72-18.59-2.72-27.59 0zM128 230.11c0 3.61-2.41 6.77-5.89 7.72l-80 21.82C37.02 261.03 32 257.2 32 251.93v-16.58c0-3.61 2.41-6.77 5.89-7.72l80-21.82c5.09-1.39 10.11 2.44 10.11 7.72v16.58zm144-39.28c0 3.61-2.41 6.77-5.89 7.72l-96 26.18c-5.09 1.39-10.11-2.44-10.11-7.72v-16.58c0-3.61 2.41-6.77 5.89-7.72l96-26.18c5.09-1.39 10.11 2.44 10.11 7.72v16.58zm176 22.7c0-5.28 5.02-9.11 10.11-7.72l80 21.82c3.48.95 5.89 4.11 5.89 7.72v16.58c0 5.28-5.02 9.11-10.11 7.72l-80-21.82a7.997 7.997 0 0 1-5.89-7.72v-16.58zm-144-39.27c0-5.28 5.02-9.11 10.11-7.72l96 26.18c3.48.95 5.89 4.11 5.89 7.72v16.58c0 5.28-5.02 9.11-10.11 7.72l-96-26.18a7.997 7.997 0 0 1-5.89-7.72v-16.58z"
                                                                  className="">
                                                            </path>
                                                        </svg>
                                                         Products
                                                    </a>
                                                </Link>
                                            </li>
                                            <li  onClick={() => {
                                                this.setState({showMenu: false})
                                            }}>
                                                <Link href={"/user/chat-board"}>
                                                    <a>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                            <path fill="currentColor"
                                                                  d="M425.6 32H22.4C10 32 0 42 0 54.4v403.2C0 470 10 480 22.4 480h403.2c12.4 0 22.4-10 22.4-22.4V54.4C448 42 438 32 425.6 32M164.3 355.5h-39.8v-199h39.8v199zm159.3 0H204.1v-39.8h119.5v39.8zm0-79.6H204.1v-39.8h119.5v39.8zm0-79.7H204.1v-39.8h119.5v39.8z"
                                                                  className="">
                                                            </path>
                                                        </svg>
                                                        My enquiries
                                                    </a>
                                                </Link>
                                            </li>
                                            <li  onClick={() => {
                                                this.setState({showMenu: false})
                                            }}>
                                                <Link href={"/user/requirements"}>
                                                    <a>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                                            <path fill="currentColor"
                                                                  d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM96 424c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm96-192c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm128 368c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16z"
                                                                  className="">
                                                            </path>
                                                        </svg>
                                                        My requirements
                                                    </a>
                                                </Link>
                                            </li>
                                            <li  onClick={() => {
                                                this.setState({showMenu: false})
                                            }}>
                                                <Link href={"/user/buy-leads"}>
                                                    <a>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                            <path fill="currentColor"
                                                                  d="M466.5 83.7l-192-80a48.15 48.15 0 0 0-36.9 0l-192 80C27.7 91.1 16 108.6 16 128c0 198.5 114.5 335.7 221.5 380.3 11.8 4.9 25.1 4.9 36.9 0C360.1 472.6 496 349.3 496 128c0-19.4-11.7-36.9-29.5-44.3zM256.1 446.3l-.1-381 175.9 73.3c-3.3 151.4-82.1 261.1-175.8 307.7z"
                                                                  className="">
                                                            </path>
                                                        </svg>
                                                        Verified buy leads
                                                    </a>
                                                </Link>
                                            </li>
                                            <li  onClick={() => {
                                                this.setState({showMenu: false})
                                            }}>
                                                <Link href={"/user/membership-details"}>
                                                    <a>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                                            <path fill="currentColor"
                                                                  d="M528 64H384v96H192V64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM288 224c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zm93.3 224H194.7c-10.4 0-18.8-10-15.6-19.8 8.3-25.6 32.4-44.2 60.9-44.2h8.2c12.3 5.1 25.7 8 39.8 8s27.6-2.9 39.8-8h8.2c28.4 0 52.5 18.5 60.9 44.2 3.2 9.8-5.2 19.8-15.6 19.8zM352 32c0-17.7-14.3-32-32-32h-64c-17.7 0-32 14.3-32 32v96h128V32z"
                                                                  className="">
                                                            </path>
                                                        </svg>
                                                    Membership details
                                                    </a>
                                                </Link>
                                            </li>
                                            <li  onClick={() => {
                                                this.setState({showMenu: false})
                                            }}>
                                                <Link href={"/user/account-settings"}>
                                                    <a>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                                            <path fill="currentColor"
                                                                  d="M610.5 373.3c2.6-14.1 2.6-28.5 0-42.6l25.8-14.9c3-1.7 4.3-5.2 3.3-8.5-6.7-21.6-18.2-41.2-33.2-57.4-2.3-2.5-6-3.1-9-1.4l-25.8 14.9c-10.9-9.3-23.4-16.5-36.9-21.3v-29.8c0-3.4-2.4-6.4-5.7-7.1-22.3-5-45-4.8-66.2 0-3.3.7-5.7 3.7-5.7 7.1v29.8c-13.5 4.8-26 12-36.9 21.3l-25.8-14.9c-2.9-1.7-6.7-1.1-9 1.4-15 16.2-26.5 35.8-33.2 57.4-1 3.3.4 6.8 3.3 8.5l25.8 14.9c-2.6 14.1-2.6 28.5 0 42.6l-25.8 14.9c-3 1.7-4.3 5.2-3.3 8.5 6.7 21.6 18.2 41.1 33.2 57.4 2.3 2.5 6 3.1 9 1.4l25.8-14.9c10.9 9.3 23.4 16.5 36.9 21.3v29.8c0 3.4 2.4 6.4 5.7 7.1 22.3 5 45 4.8 66.2 0 3.3-.7 5.7-3.7 5.7-7.1v-29.8c13.5-4.8 26-12 36.9-21.3l25.8 14.9c2.9 1.7 6.7 1.1 9-1.4 15-16.2 26.5-35.8 33.2-57.4 1-3.3-.4-6.8-3.3-8.5l-25.8-14.9zM496 400.5c-26.8 0-48.5-21.8-48.5-48.5s21.8-48.5 48.5-48.5 48.5 21.8 48.5 48.5-21.7 48.5-48.5 48.5zM224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm201.2 226.5c-2.3-1.2-4.6-2.6-6.8-3.9l-7.9 4.6c-6 3.4-12.8 5.3-19.6 5.3-10.9 0-21.4-4.6-28.9-12.6-18.3-19.8-32.3-43.9-40.2-69.6-5.5-17.7 1.9-36.4 17.9-45.7l7.9-4.6c-.1-2.6-.1-5.2 0-7.8l-7.9-4.6c-16-9.2-23.4-28-17.9-45.7.9-2.9 2.2-5.8 3.2-8.7-3.8-.3-7.5-1.2-11.4-1.2h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c10.1 0 19.5-3.2 27.2-8.5-1.2-3.8-2-7.7-2-11.8v-9.2z"
                                                                  className="">
                                                            </path>
                                                        </svg>
                                                        Account settings
                                                      </a>
                                                </Link>
                                            </li>
                                            <li  onClick={() => {
                                                this.setState({showMenu: false})
                                            }}>
                                                <Link href={"/user/feedback"}>
                                                    <a>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                            <path fill="currentColor"
                                                                  d="M192 208c0-17.67-14.33-32-32-32h-16c-35.35 0-64 28.65-64 64v48c0 35.35 28.65 64 64 64h16c17.67 0 32-14.33 32-32V208zm176 144c35.35 0 64-28.65 64-64v-48c0-35.35-28.65-64-64-64h-16c-17.67 0-32 14.33-32 32v112c0 17.67 14.33 32 32 32h16zM256 0C113.18 0 4.58 118.83 0 256v16c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16v-16c0-114.69 93.31-208 208-208s208 93.31 208 208h-.12c.08 2.43.12 165.72.12 165.72 0 23.35-18.93 42.28-42.28 42.28H320c0-26.51-21.49-48-48-48h-32c-26.51 0-48 21.49-48 48s21.49 48 48 48h181.72c49.86 0 90.28-40.42 90.28-90.28V256C507.42 118.83 398.82 0 256 0z"
                                                                  className="">
                                                            </path>
                                                        </svg>
                                                        Feedback & complaints
                                                    </a>
                                                </Link>
                                            </li>
                                            <li  onClick={() => {
                                                this.setState({showMenu: false})
                                            }}>
                                                <Link href={"/user/testimonial"}>
                                                    <a>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                            <path fill="currentColor"
                                                                  d="M448 0H64C28.7 0 0 28.7 0 64v288c0 35.3 28.7 64 64 64h96v84c0 9.8 11.2 15.5 19.1 9.7L304 416h144c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64z"
                                                                  className="">
                                                            </path>
                                                        </svg>
                                                        Testimonial
                                                    </a>
                                                </Link>
                                            </li>
                                            <li  onClick={() => {
                                                this.setState({showMenu: false})
                                            }}>
                                                <Link href={"/user/graph"}>
                                                    <a>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                            <path fill="currentColor"
                                                                  d="M332.8 320h38.4c6.4 0 12.8-6.4 12.8-12.8V172.8c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v134.4c0 6.4 6.4 12.8 12.8 12.8zm96 0h38.4c6.4 0 12.8-6.4 12.8-12.8V76.8c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v230.4c0 6.4 6.4 12.8 12.8 12.8zm-288 0h38.4c6.4 0 12.8-6.4 12.8-12.8v-70.4c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v70.4c0 6.4 6.4 12.8 12.8 12.8zm96 0h38.4c6.4 0 12.8-6.4 12.8-12.8V108.8c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v198.4c0 6.4 6.4 12.8 12.8 12.8zM496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"/>
                                                        </svg>
                                                        Trade Intelligence(beta)
                                                    </a>
                                                </Link>
                                            </li>
                                            <li  onClick={() => {
                                                this.setState({showMenu: false})
                                            }}>
                                                <Link href={"/user/help"}>
                                                    <a>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                            <path
                                                                d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 400c-18 0-32-14-32-32s13.1-32 32-32c17.1 0 32 14 32 32S273.1 400 256 400zM325.1 258L280 286V288c0 13-11 24-24 24S232 301 232 288V272c0-8 4-16 12-21l57-34C308 213 312 206 312 198C312 186 301.1 176 289.1 176h-51.1C225.1 176 216 186 216 198c0 13-11 24-24 24s-24-11-24-24C168 159 199 128 237.1 128h51.1C329 128 360 159 360 198C360 222 347 245 325.1 258z"/>
                                                        </svg>
                                                        Help
                                                    </a>
                                                </Link>
                                            </li>
                                            <h5 className="tag">More</h5>
                                            <li  onClick={() => {
                                                this.setState({showMenu: false})
                                            }}>
                                                <Link href={"/"}>
                                                    <a>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                                            <path fill="currentColor"
                                                                  d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z">
                                                            </path>
                                                        </svg>
                                                        Home
                                                    </a>
                                                </Link>
                                            </li>
                                            <li>
                                                <a className="logout" onClick={()=>{this.logOut()}}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                        <path fill="currentColor"
                                                              d="M400 54.1c63 45 104 118.6 104 201.9 0 136.8-110.8 247.7-247.5 248C120 504.3 8.2 393 8 256.4 7.9 173.1 48.9 99.3 111.8 54.2c11.7-8.3 28-4.8 35 7.7L162.6 90c5.9 10.5 3.1 23.8-6.6 31-41.5 30.8-68 79.6-68 134.9-.1 92.3 74.5 168.1 168 168.1 91.6 0 168.6-74.2 168-169.1-.3-51.8-24.7-101.8-68.1-134-9.7-7.2-12.4-20.5-6.5-30.9l15.8-28.1c7-12.4 23.2-16.1 34.8-7.8zM296 264V24c0-13.3-10.7-24-24-24h-32c-13.3 0-24 10.7-24 24v240c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24z"
                                                              className="">
                                                        </path>
                                                    </svg>
                                                    Logout
                                                </a>
                                            </li>
                                        </ul>
                                        <div className="sidebar-footer">
                                            <p>All right reserved 2022 | <a href="#">globaltradeplaza.com</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </header>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    getUserInfo: state.UserReducer,
});

const mapDispatchToProps = (dispatch) => {
    return {
        userInfo: (data) => dispatch(setUserInfo({ type: "UPDATE_USER_INFO", data: data })),
    };
};

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(AuthHeader));



