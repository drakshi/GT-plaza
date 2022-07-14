import React from "react";
import AuthSidebar from "../../src/components/common/afterAuth/auth_sidebar";
import {images} from "../../constant";
import API from "../../src/api/api.service";
import Link from "next/link";
import {connect} from "react-redux";
import LoadingBar from "react-top-loading-bar";
import SeoMeta from "../../src/components/common/meta/seo_meta";
const api = new API();

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            progress:0,
            messages: [],
            inquiries: [],
            counts: null,
            profile : null
        }
    }

    componentDidMount() {
        this.getDashboardCount();
        this.getDashboardInquiries();
        this.getDashboardMessages();
        if (this.state.profile === null) {
            this.setState({profile: this.props?.getUserInfo?.logged_user_info?.data})
        }
        this.setState({progress:30}),
            setTimeout(() => {
                this.setState({ progress: 90 });
            }, 1000)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.getUserInfo !== this.props.getUserInfo) {
            this.setState({profile: this.props?.getUserInfo?.logged_user_info?.data, progress:100})
        }
    }

    getDashboardMessages() {
        api.getDashboardMessages().then((success) => {
            this.setState({messages: success.data.response,progress:100});
        });
    }

    getDashboardInquiries() {
        api.getDashboardInquiries().then((success) => {
            this.setState({inquiries: success.data.response,progress:100});
        });
    }

    getDashboardCount() {
        api.getDashboardCounts().then((success) => {
            this.setState({counts: success.data.response,progress:100});
        });
    }


    render() {

        return (
            <>
                <SeoMeta title={"Dashboard - Global Trade Plaza"}
                         description={"Best B2B Marketplace Platform and Top 10 b2b Portal in India is Global Trade Plaza. We are Business to Business Import Export Portal helping companies, Traders and Manufacturers to find Buyers"}
                />
                <LoadingBar progress={this.state.progress} color="blue" />
                <section className="dashboard">
                    <div className="container-fluid main-content">
                        <div className="row">
                            <AuthSidebar active={"dashboard"}/>
                            <div className="col-md-9 col-12 right p-gt">
                                <div className="col-12 stats px-3">
                                    <div className="row">
                                        <div className="col-3 score">
                                            <div className="ring">
                                                <h1 id="points">{this.state.counts?.points}</h1>
                                                <h5>Profile score
                                                    <a type="button" data-toggle="modal" data-target="#point_info">
                                                        <i className="fa fa-info-circle">
                                                        </i>
                                                    </a>
                                                </h5>
                                                <Link href={"/user/point-history"}>
                                                    <a>
                                                        <h6>View score details</h6>
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-9 counts">
                                            <div className="head col-12">
                                                <h4>Overview</h4>
                                            </div>
                                            <ul className="t-box">
                                                <li>
                                                    <span className="value" id="total_inquiries">{this.state.counts?.inquiries}</span>
                                                    <span>Total<br/> enquiries</span>
                                                </li>
                                                <li>
                                                    <span className="value" id="new_inquiries">{this.state.counts?.inquiries}</span>
                                                    <span>New<br/> enquiries</span>
                                                </li>
                                                <li>
                                                    <span className="value" id="total_requirements">{this.state.counts?.requirement}</span>
                                                    <span>Total<br/> requirement</span>
                                                </li>
                                                <li>
                                                    <span className="value" id="total_products">{this.state.counts?.product}</span>
                                                    <span>Total<br/> products</span>
                                                </li>
                                                <li>
                                                    <span className="value" id="purchasedLead">{this.state.counts?.purchased}<b>/{this.state.counts?.listings / 12}</b></span>
                                                    <span>Purchased leads<br/> this month</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 enquiries">
                                    <div className="row">
                                        <div className="col-md-12 col-12 messages p-gt">
                                            <div className="col-12 t-box">
                                                <div className="heading">
                                                    <h3>Catalog URL
                                                        <br/>
                                                        <span className="link-catalog" id="catalog_url">
                                                            <Link target="_blank" rel="noreferrer" href={"/member/"+this.state.profile?.slug}>
                                                                <a style={{"color": "red"}} className="d-block">
                                                                    <span className="seller_url text-lowercase">
                                                                        {"https://globaltradeplaza.com/member/"+this.state.profile?.slug}
                                                                    </span>
                                                               </a>
                                                            </Link>
                                                        </span>
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 col-12 recent p-gt">
                                            <div className="col-12 t-box">
                                                <div className="heading">
                                                    <h3>Recent enquiries
                                                        <Link href={"/user/chat-board"}>
                                                            <a style={{"float": "right"}}>view all</a>
                                                        </Link>
                                                    </h3>
                                                </div>
                                                {this.state.inquiries.length ?
                                                    <ul id="seller_inquiries">
                                                        {this.state.inquiries.length && this.state.inquiries.map((inquiry, index) => {
                                                            return (
                                                                <>
                                                                    <li className="My_inquiries" key={index}>
                                                                        <img title={inquiry?.country?.name}
                                                                             alt={inquiry?.country?.name}
                                                                             src={inquiry?.country?.flag}/>
                                                                        <span
                                                                            className="value">{inquiry?.product_name}</span>
                                                                        <span
                                                                            className="date">{inquiry?.created_at}</span>
                                                                    </li>
                                                                </>
                                                            )
                                                        })}
                                                    </ul>
                                                    :
                                                    <div className="no-data no-data" role="alert" id="no_data_1">
                                                        <div className="t-box">
                                                            <img src={images.not_found.default.src}/>
                                                            <h4>No inquiries found</h4>
                                                            <h6><span>Enquiries received on your products will be shown here.</span>
                                                            </h6>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12 col-12 messages p-gt">
                                            <div className="col-12 t-box">
                                                <div className="heading">
                                                    <h3>Recent messages <span>(messages from companies contact)</span>
                                                        <Link href={"/user/chat-board"}>
                                                            <a style={{"float": "right"}}>view all</a>
                                                        </Link>
                                                    </h3>
                                                </div>
                                                {this.state.messages.length ?
                                                    <table className="table" id="seller_messages">
                                                        {this.state.messages.length && this.state.messages.map((message, index) => {
                                                            return (
                                                                <>
                                                                    <tr className="My_messages" key={index}>
                                                                        <td>{message.name}</td>
                                                                        <td>{message.email}</td>
                                                                        <td>{message.mobile_number}</td>
                                                                        <td className="ellipsis">{message.description}</td>
                                                                        <td>{message.created_at}</td>
                                                                    </tr>
                                                                </>
                                                            )
                                                        })}
                                                    </table>
                                                    :
                                                    <div className="no-data" role="alert" id="no_data_2">
                                                        <div className="t-box">
                                                            <img src={images.not_found.default.src}/>
                                                            <h4>No messages found</h4>
                                                            <h6><span>Update your profile to get better response from buyers on portal</span>
                                                            </h6>
                                                        </div>
                                                    </div>
                                                }
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

export default connect(mapStateToProps, null)(Dashboard);



