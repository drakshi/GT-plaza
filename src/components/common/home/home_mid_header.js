import React from "react";
import {instanceOf} from "prop-types";
import {Cookies, withCookies} from "react-cookie";
import Link from "next/link";

class HomeMidHeader extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            token: this.props.cookies.get('auth_token'),
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.cookies.get('auth_token') !== this.props.cookies.get('auth_token')){
            this.setState({token : this.props.cookies.get('auth_token')})
        }
    }

    render() {
        return (
            <>
                <div className="container-fluid banner-info">
                    <div className="row">
                        <div className="feature col-12">
                            <h1>Indias Largest B2B Portal & Most Trusted B2B Marketplace</h1>
                            <ul>
                                <li>
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="box"
                                         role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                         className="svg-inline--fa fa-box fa-w-16 fa-3x">
                                        <path fill="currentColor"
                                              d="M509.5 184.6L458.9 32.8C452.4 13.2 434.1 0 413.4 0H272v192h238.7c-.4-2.5-.4-5-1.2-7.4zM240 0H98.6c-20.7 0-39 13.2-45.5 32.8L2.5 184.6c-.8 2.4-.8 4.9-1.2 7.4H240V0zM0 224v240c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V224H0z"
                                              className=""></path>
                                    </svg>
                                    Trade with confidence
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path fill="currentColor"
                                              d="M466.5 83.7l-192-80a48.15 48.15 0 0 0-36.9 0l-192 80C27.7 91.1 16 108.6 16 128c0 198.5 114.5 335.7 221.5 380.3 11.8 4.9 25.1 4.9 36.9 0C360.1 472.6 496 349.3 496 128c0-19.4-11.7-36.9-29.5-44.3zM256.1 446.3l-.1-381 175.9 73.3c-3.3 151.4-82.1 261.1-175.8 307.7z"
                                              className=""></path>
                                    </svg>
                                    Verified buyers
                                </li>
                                <li>
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="globe"
                                         role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"
                                         className="svg-inline--fa fa-globe fa-w-16 fa-3x">
                                        <path fill="currentColor"
                                              d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"
                                              className=""></path>
                                    </svg>
                                    Global network
                                </li>
                                <li>
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="headphones"
                                         role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                         className="svg-inline--fa fa-headphones fa-w-16 fa-3x">
                                        <path fill="currentColor"
                                              d="M256 32C114.52 32 0 146.496 0 288v48a32 32 0 0 0 17.689 28.622l14.383 7.191C34.083 431.903 83.421 480 144 480h24c13.255 0 24-10.745 24-24V280c0-13.255-10.745-24-24-24h-24c-31.342 0-59.671 12.879-80 33.627V288c0-105.869 86.131-192 192-192s192 86.131 192 192v1.627C427.671 268.879 399.342 256 368 256h-24c-13.255 0-24 10.745-24 24v176c0 13.255 10.745 24 24 24h24c60.579 0 109.917-48.098 111.928-108.187l14.382-7.191A32 32 0 0 0 512 336v-48c0-141.479-114.496-256-256-256z"
                                              className=""></path>
                                    </svg>
                                    24 / 7 help center
                                </li>

                                {!this.state.token ?
                                    <li className="create_account create_account1">
                                        <Link href="/signup">
                                            <a>
                                                <button type="button" className="btn-border">Create account now</button>
                                            </a>
                                        </Link>
                                    </li>
                                    :
                                    <li className="mem_btn">
                                        <Link href="/advertise">
                                            <a>
                                                <button type="button" className="btn-border">Upgrade Membership</button>
                                            </a>
                                        </Link>
                                    </li>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        )
    }
};
export default withCookies(HomeMidHeader);



