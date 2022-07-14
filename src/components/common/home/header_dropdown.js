import React from "react";
import {Dropdown} from "react-bootstrap";
import Link from "next/link";
import {instanceOf} from "prop-types";
import {Cookies, withCookies} from "react-cookie";
import {setUserInfo} from "../../../redux/action/userAction";
import {connect} from "react-redux";
import API from "../../../api/api.service";
const api = new API();

class HeaderDropDown extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            token: this.props.cookies.get('auth_token'),
            profile : null
        };
        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
        if (this.state.token !== null && this.state.profile === null){
            api.authMe(this.state.token).then(res => {
                this.props.userInfo(res.data.response);
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const auth_token = this.props.cookies.get('auth_token');
        if (auth_token !== undefined && auth_token !== null && auth_token !== "" && prevProps.cookies.get('auth_token') !== this.props.cookies.get('auth_token')){
            this.setState({token : this.props.cookies.get('auth_token')})
        }
        if (prevProps.getUserInfo !== this.props.getUserInfo){
            this.setState({ profile : this.props?.getUserInfo?.logged_user_info?.data })
        }
    }

    logOut(){
        const {cookies} = this.props;
        cookies.remove("auth_token",  { path: "/" });
        cookies.remove("company_id",  { path: "/user" });
        window.location.href = '/login';
    };

    render() {
        return (
            <>
                <Dropdown className="profile-drop">
                    <Dropdown.Toggle id="dropdown-basic">
                        <svg viewBox="0 0 448 512">
                            <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"/>
                        </svg>
                        <b>{this.state.profile?.full_name}</b>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item >
                            <Link href={"/user/products"}>
                                Products
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link href={"/user/buy-leads"}>
                                <a className="my-0">
                                    Leads
                                </a>
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link href={"/user/company-profile"}>
                                <a className="my-0">
                                    Companies
                                </a>
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link href={"/user/dashboard"}>
                                <a className="my-0">
                                    Dashboard
                                </a>
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link href={"/user/account-settings"}>
                                <a className="my-0">
                                    Account settings
                                </a>
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item >
                            <a onClick={()=>{
                                this.logOut()}} className="my-0"  href="javascript:void(0)">
                                Log out
                            </a>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
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

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(HeaderDropDown));




