import React from "react";
import Link from "next/link";
import {instanceOf} from "prop-types";
import {Cookies, withCookies} from "react-cookie";
import {connect} from "react-redux";

class MembershipBanner extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            token: this.props.cookies.get('auth_token'),
            membership_id : null
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.cookies.get('auth_token') !== this.props.cookies.get('auth_token')){
            this.setState({token : this.props.cookies.get('auth_token')})
        }
        if (prevProps.getUserInfo !== this.props.getUserInfo){
            this.setState({membership_id :this.props.getUserInfo?.membership_id })
        }
    }

    render() {

        return (
            <>
                <div className="col-12 promotion_header" >

                    {!this.state.token ?
                        <p>Sign up today and be a part of the fastest growing B2B platform
                            <Link href={"/signup"}>
                                <button className="btn">Join now</button>
                            </Link>
                        </p>
                        :

                        <>
                            { this.state.membership_id === 3 ?
                                <p>You are a Standard Member. To enjoy more benefits, please upgrade to our Pro membership
                                    <Link href={"/membership-details"}>
                                        <button className="btn">Upgrade to pro membership</button>
                                    </Link>
                                </p>
                            : "" }

                            { this.state.membership_id === 2 ?
                                <p>You are a Pro Member. To enjoy further benefits, please upgrade to our Elite membership
                                <Link href={"/membership-details"}>
                                    <button className="btn">Upgrade to elite membership</button>
                                </Link>
                            </p>
                                : "" }

                            { this.state.membership_id === 1 ?
                                <p>You are our Elite Member. Please make sure to renew your membership in time
                                    <Link href={"/membership-details"}>
                                         <button className="btn">Renew Membership</button>
                                    </Link>
                                </p>
                                : "" }

                            { (this.state.membership_id === null || this.state.membership_id === undefined) ?
                                <p>Please subscribe to our membership plan for better connections.
                                    <Link href={"/membership-details"}>
                                        <button className="btn">Upgrade membership</button>
                                    </Link>
                                </p>
                                : "" }
                        </>
                    }

                </div>
            </>
        )
    }
};

const mapStateToProps = (state) => ({
    getUserInfo: state.UserReducer,
});

export default withCookies(connect(mapStateToProps, null)(MembershipBanner));



