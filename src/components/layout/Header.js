import React from "react";
import {images} from "../../../constant";
import Link from 'next/link';
import MembershipBanner from "../common/home/membership_banner";
import SearchHeader from "../common/home/search_header";
import {Cookies, withCookies} from "react-cookie";
import {instanceOf} from "prop-types";
import HeaderDropDown from "../common/home/header_dropdown";
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {EventEmitter} from "../../helper";

var xDown = null;
var yDown = null;

class Header extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            token: this.props.cookies.get('auth_token') ? this.props.cookies.get('auth_token') : null,
            showMenu: false,
            IsMobile : false,
            profile : null
        };
    }

    componentDidMount() {
        if (window.innerWidth < 721) {
            this.setState({IsMobile : true})
        } else {
            this.setState({IsMobile : false})
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        window.addEventListener("resize", this.handleResize);
        document.addEventListener('touchstart', (e)=>{this.handleTouchStart(e)}, false);
        document.addEventListener('touchmove',(e)=>{this.handleTouchMove(e)}, false);

        if ((prevProps.cookies.get('auth_token') !== this.props.cookies.get('auth_token')) || this.state.token === null) {
            this.setState({token: this.props.cookies.get('auth_token')})
        }
        if (prevProps.getUserInfo !== this.props.getUserInfo){
            this.setState({ profile : this.props?.getUserInfo?.logged_user_info?.data })
        }
    }

     handleResize = () => {
        if (window.innerWidth < 721) {
            this.setState({IsMobile : true})
        } else {
            this.setState({IsMobile : false})
        }
    };

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

    render() {

        return (

            <>
                <div>
                    <MembershipBanner/>
                    <nav className={ this.state.token ? "navbar navbar-expand-lg navbar-light bg-light after-login d-flex" :  "navbar navbar-expand-lg navbar-light bg-light after-login d-flex" }>
                        <button className="navbar-toggler icon-bars" type="button" data-toggle="collapse"
                                data-target="#navbarNavAltMarkup"
                                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <div className="menu-button" id="menu-trigger" data-toggle="modal"
                                 data-target="#sidebar-modal" onClick={() => {
                                this.setState({showMenu: true})
                            }}>
                                <label className="menu-icon">
                                    <input type="checkbox"/>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </label>
                            </div>
                        </button>

                        <Link className="" href="/">
                            <a href="javascript:void(0)" className="navbar-brand logo">
                                <img className="img-responsive" src={images.logo_color.default.src}
                                     width="220" height="40" alt="Online B2B Marketplace in India"/>
                            </a>
                        </Link>

                        {this.state.IsMobile === true && !this.state.token &&
                            <Link href={"/login"}>
                                <button className="btn mobile-signin">Sign in</button>
                            </Link>
                        }

                        <div
                            className="collapse navbar-collapse d-none d-md-none d-lg-block justify-content-between align-items-center"
                            id="navbarNavAltMarkup">
                            <div className="navbar-nav menu">
                                <li>
                                    <Link href={"/advertise"}>
                                        <a>Advertise with us</a>
                                    </Link>
                                </li>
                                <li onClick={()=>{
                                    EventEmitter.dispatch(['initialProducts']) ;
                                    EventEmitter.dispatch(['initialSearchProducts']);
                                }}>
                                    <Link href={"/search-products"}>
                                        <a>Products</a>
                                    </Link>
                                </li>
                                <li onClick={()=>{
                                    EventEmitter.dispatch('initialLeads');
                                    EventEmitter.dispatch('initialSearchLeads');
                                }}>
                                    <Link href={"/search-leads"}>
                                        <a>Buy leads</a>
                                    </Link>
                                </li>
                                <li onClick={()=>{
                                    EventEmitter.dispatch('initialSuppliers');
                                    EventEmitter.dispatch('initialSearchSuppliers');
                                }}>
                                    <Link href={"/search-suppliers"}>
                                        <a>Companies</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/contact"}>
                                        <a>Contact</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/about"}>
                                        <a>About</a>
                                    </Link>
                                </li>
                            </div>

                            <div className="action ml-auto d-lg-none d-xl-block">
                                {this.state.token ? "" :
                                    <Link href={"/signup"} className="create_account">
                                        <button type="button" className="btn-border">Create free account</button>
                                    </Link>
                                }
                                <ul className="menu">
                                    {!this.state.token ?
                                        <>
                                            <li>
                                                <Link href={"/login"} className="create_account">Login</Link>
                                            </li>
                                            <li className="create_account ps-0">
                                                <Link href={"/faq"}> Need help? </Link>
                                            </li>
                                        </>
                                        :
                                        <HeaderDropDown/>
                                    }
                                </ul>
                            </div>
                        </div>

                        <div className="create_account-mobile mob-login">
                            <Link href={"/login"}>login</Link>/<Link href={"/signup"}>signup</Link>
                        </div>
                    </nav>

                    <div className="mobile-modal">
                        <Modal show={this.state.showMenu} className="sidebar-modal mobile-modal left" id="sidebar-modal">
                            <div className="modal-content">
                                <div className="head-modal">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                                        <path fill="currentColor"
                                              d="M248 104c-53 0-96 43-96 96s43 96 96 96 96-43 96-96-43-96-96-96zm0 144c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm0-240C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-49.7 0-95.1-18.3-130.1-48.4 14.9-23 40.4-38.6 69.6-39.5 20.8 6.4 40.6 9.6 60.5 9.6s39.7-3.1 60.5-9.6c29.2 1 54.7 16.5 69.6 39.5-35 30.1-80.4 48.4-130.1 48.4zm162.7-84.1c-24.4-31.4-62.1-51.9-105.1-51.9-10.2 0-26 9.6-57.6 9.6-31.5 0-47.4-9.6-57.6-9.6-42.9 0-80.6 20.5-105.1 51.9C61.9 339.2 48 299.2 48 256c0-110.3 89.7-200 200-200s200 89.7 200 200c0 43.2-13.9 83.2-37.3 115.9z"></path>
                                    </svg>
                                    {this.state.profile?.full_name ?
                                        <h5 className="mob_user">
                                           Hi,<Link href={"/login"}>{this.state.profile?.full_name}</Link>
                                        </h5>
                                        :
                                        <h5 className="mob_user">
                                            <Link href={"/login"}>Sing in</Link>/<Link href={"/signup"}>Join free</Link>
                                        </h5>
                                    }

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
                                            <li  onClick={() => {
                                                this.setState({showMenu: false})
                                            }}>
                                                <Link href="/">
                                                    <a>
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                             viewBox="0 0 576 512">
                                                            <path fill="currentColor"
                                                                  d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"></path>
                                                        </svg>
                                                        Home
                                                    </a>
                                                </Link>
                                            </li>
                                            <li  onClick={() => {
                                                this.setState({showMenu: false})
                                            }}>
                                                <Link href={"/suppliers"}>
                                                    <a>
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                             viewBox="0 0 512 512">
                                                            <path fill="currentColor"
                                                                  d="M296 32h192c13.255 0 24 10.745 24 24v160c0 13.255-10.745 24-24 24H296c-13.255 0-24-10.745-24-24V56c0-13.255 10.745-24 24-24zm-80 0H24C10.745 32 0 42.745 0 56v160c0 13.255 10.745 24 24 24h192c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24zM0 296v160c0 13.255 10.745 24 24 24h192c13.255 0 24-10.745 24-24V296c0-13.255-10.745-24-24-24H24c-13.255 0-24 10.745-24 24zm296 184h192c13.255 0 24-10.745 24-24V296c0-13.255-10.745-24-24-24H296c-13.255 0-24 10.745-24 24v160c0 13.255 10.745 24 24 24z"></path>
                                                        </svg>
                                                        All categories
                                                    </a>
                                                </Link>
                                            </li>
                                            <li  onClick={() => {
                                                this.setState({showMenu: false})
                                            }}>
                                                <Link href={"/search-leads"}>
                                                    <a>
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                             viewBox="0 0 640 512">
                                                            <path fill="currentColor"
                                                                  d="M497.941 225.941L286.059 14.059A48 48 0 0 0 252.118 0H48C21.49 0 0 21.49 0 48v204.118a48 48 0 0 0 14.059 33.941l211.882 211.882c18.744 18.745 49.136 18.746 67.882 0l204.118-204.118c18.745-18.745 18.745-49.137 0-67.882zM112 160c-26.51 0-48-21.49-48-48s21.49-48 48-48 48 21.49 48 48-21.49 48-48 48zm513.941 133.823L421.823 497.941c-18.745 18.745-49.137 18.745-67.882 0l-.36-.36L527.64 323.522c16.999-16.999 26.36-39.6 26.36-63.64s-9.362-46.641-26.36-63.64L331.397 0h48.721a48 48 0 0 1 33.941 14.059l211.882 211.882c18.745 18.745 18.745 49.137 0 67.882z"></path>
                                                        </svg>
                                                        Buy leads
                                                    </a>
                                                </Link>
                                            </li>
                                            <li  onClick={() => {
                                                this.setState({showMenu: false})
                                            }}>
                                                <Link href={"/search-suppliers"}>
                                                    <a>
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                             viewBox="0 0 512 512">
                                                            <path fill="currentColor"
                                                                  d="M320 336c0 8.84-7.16 16-16 16h-96c-8.84 0-16-7.16-16-16v-48H0v144c0 25.6 22.4 48 48 48h416c25.6 0 48-22.4 48-48V288H320v48zm144-208h-80V80c0-25.6-22.4-48-48-48H176c-25.6 0-48 22.4-48 48v48H48c-25.6 0-48 22.4-48 48v80h512v-80c0-25.6-22.4-48-48-48zm-144 0H192V96h128v32z"></path>
                                                        </svg>
                                                        Companies
                                                    </a>
                                                </Link>
                                            </li>
                                            <li  onClick={() => {
                                                this.setState({showMenu: false})
                                            }}>
                                                <Link href={"/post-requirement"}>
                                                    <a>
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                             viewBox="0 0 448 512">
                                                            <path fill="currentColor"
                                                                  d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z"></path>
                                                        </svg>
                                                        Post your requirement
                                                    </a>
                                                </Link>
                                            </li>
                                            <li  onClick={() => {
                                                this.setState({showMenu: false})
                                            }}>
                                                <Link href={"/advertise"}>
                                                    <a>
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                             viewBox="0 0 576 512">
                                                            <path fill="currentColor"
                                                                  d="M576 240c0-23.63-12.95-44.04-32-55.12V32.01C544 23.26 537.02 0 512 0c-7.12 0-14.19 2.38-19.98 7.02l-85.03 68.03C364.28 109.19 310.66 128 256 128H64c-35.35 0-64 28.65-64 64v96c0 35.35 28.65 64 64 64h33.7c-1.39 10.48-2.18 21.14-2.18 32 0 39.77 9.26 77.35 25.56 110.94 5.19 10.69 16.52 17.06 28.4 17.06h74.28c26.05 0 41.69-29.84 25.9-50.56-16.4-21.52-26.15-48.36-26.15-77.44 0-11.11 1.62-21.79 4.41-32H256c54.66 0 108.28 18.81 150.98 52.95l85.03 68.03a32.023 32.023 0 0 0 19.98 7.02c24.92 0 32-22.78 32-32V295.13C563.05 284.04 576 263.63 576 240zm-96 141.42l-33.05-26.44C392.95 311.78 325.12 288 256 288v-96c69.12 0 136.95-23.78 190.95-66.98L480 98.58v282.84z"></path>
                                                        </svg>
                                                        Advertise with us
                                                    </a>
                                                </Link>
                                            </li>
                                            <li  onClick={() => {
                                                this.setState({showMenu: false})
                                            }}>
                                                <Link href={"/about"}>
                                                    <a>
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                             viewBox="0 0 512 512">
                                                            <path fill="currentColor"
                                                                  d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path>
                                                        </svg>
                                                        About us
                                                    </a>
                                                </Link>
                                            </li>
                                            <li  onClick={() => {
                                                this.setState({showMenu: false})
                                            }}>
                                                <Link href={"/contact"}>
                                                    <a>
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                             viewBox="0 0 512 512">
                                                            <path fill="currentColor"
                                                                  d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path>
                                                        </svg>
                                                        Contact us
                                                    </a>
                                                </Link>
                                            </li>
                                            <div className="mob_more"><h5 className="tag">More</h5>
                                                <li  onClick={() => {
                                                    this.setState({showMenu: false})
                                                }}>
                                                    <Link href={"/user/dashboard"}>
                                                        <a>
                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                 viewBox="0 0 544 512">
                                                                <path fill="currentColor"
                                                                      d="M527.79 288H290.5l158.03 158.03c6.04 6.04 15.98 6.53 22.19.68 38.7-36.46 65.32-85.61 73.13-140.86 1.34-9.46-6.51-17.85-16.06-17.85zm-15.83-64.8C503.72 103.74 408.26 8.28 288.8.04 279.68-.59 272 7.1 272 16.24V240h223.77c9.14 0 16.82-7.68 16.19-16.8zM224 288V50.71c0-9.55-8.39-17.4-17.84-16.06C86.99 51.49-4.1 155.6.14 280.37 4.5 408.51 114.83 513.59 243.03 511.98c50.4-.63 96.97-16.87 135.26-44.03 7.9-5.6 8.42-17.23 1.57-24.08L224 288z"
                                                                      className=""></path>
                                                            </svg>
                                                            Dashboard
                                                        </a>
                                                    </Link>
                                                </li>
                                            </div>
                                        </ul>
                                        <div className="sidebar-footer">
                                            <p>All right reserved 2022 | <a href="#">globaltradeplaza.com</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
                <SearchHeader/>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    getUserInfo: state.UserReducer,
});

export default withCookies(connect(mapStateToProps, null)(Header));

