import React from "react";
import AuthSidebar from "../../src/components/common/afterAuth/auth_sidebar";
import API from "../../src/api/api.service";
import Link from "next/link";
import {NotificationManager} from "react-notifications";
import Router,{withRouter} from "next/router";
import LoadingBar from "react-top-loading-bar";
import SeoMeta from "../../src/components/common/meta/seo_meta";
const api = new API();

class MembershipDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            progress:0,
            show: false,
            membership_plans: [],
            membership_request_id: null,
            seller_membership_id: null,
            purchase_date: null,
            end_date: null
        },
            this.purchaseMembership = this.purchaseMembership.bind(this);
    }

    componentDidMount() {
        this.getAllMembershipPlans();
    }

    purchaseMembership(id,slug) {
        if(this.state.seller_membership_id === undefined || this.state.seller_membership_id === 0){
            const router = this.props.router ;
            router.push("/advertise-details?membership=" + slug)
        }

        if(id === this.state.seller_membership_id){
            NotificationManager.error('You already have this membership plan.');
            return false;
        }
        if(id > this.state.seller_membership_id){
            NotificationManager.error('You already have another top most membership.');
            return false;
        }
        if(this.state.seller_membership_id > id){
            NotificationManager.error('To upgrade please contact Global Trade Plaza support.');
            return false;
        }
    }

    getAllMembershipPlans() {

        api.getSellerMembershipPlans(
            this.setState({progress:30}),

            setTimeout(() => {
                this.setState({ progress: 90 });
            }, 1000)

        ).then((success) => {
            this.setState({membership_plans: success.data.response, progress:100});
        }).catch((error) => {
            this.setState({progress:0})
        });

        api.getSellerMembership(
            this.setState({progress:30}),
            setTimeout(() => {
                this.setState({ progress: 90 });
            }, 1000)
        ).then((success) => {
            this.setState({
                progress:100,
                seller_membership_id: success.data.response?.membership?.membership_plan_id,
                membership_request_id: success.data.response?.membership?.request_id,
                purchase_date: success.data.response?.membership?.formatted_start_date,
                end_date: success.data.response?.membership?.end_date
            });
        }).catch((error) =>{
            this.setState({progress:0})
        });
    }

    render() {

        return (
            <>
                <SeoMeta title={"Membership - Global Trade Plaza"}
                         description={"Best B2B Marketplace Platform and Top 10 b2b Portal in India is Global Trade Plaza. We are Business to Business Import Export Portal helping companies, Traders and Manufacturers to find Buyers"}
                />
                 <LoadingBar progress={this.state.progress} color="blue"/>
                <section className="dashboard">
                    <div className="container-fluid main-content">
                        <div className="row">
                            <AuthSidebar active={"membership-details"}/>
                            <div className="col-md-9 col-12 right membership p-gt">
                                <div className="heading main mt-2">
                                    <h3>Membership details</h3>
                                    <h1>We suggest you to select a membership plan based on your business
                                        requirements </h1>
                                </div>
                                <div className="col-10 cards">
                                    <div className="row" id="membership_plans">
                                        {this.state.membership_plans.length ? this.state.membership_plans.map((plan, index) => {
                                            return (
                                                <>
                                                    <div key={index} className="col-md-4 col-12 block">
                                                        <div className="col-12 t-box">
                                                            <div className="area">
                                                                <img src={plan.banner} alt={plan.title}/>
                                                                <Link
                                                                    href={"/advertise-details?membership=" + plan.slug}>
                                                                    <a>
                                                                        <h5 className="fw-bold">{plan.title}</h5>
                                                                    </a>
                                                                </Link>
                                                                {plan.id === this.state.seller_membership_id &&
                                                                    <>
                                                                        <p className="mb-0"> Purchase Date - {this.state.purchase_date}</p>
                                                                        <p className="mb-0"> Valid Till - {this.state.end_date}</p>
                                                                        <button className="btn mt-2">ACTIVE</button>
                                                                    </>
                                                                }
                                                                {plan.id === this.state.membership_request_id &&
                                                                    <>
                                                                        <button className="btn mt-2">REQUESTED</button>
                                                                    </>
                                                                }
                                                                {plan.id !== this.state.membership_request_id && plan.id !== this.state.seller_membership_id &&
                                                                    <>
                                                                        <button className="btn mt-2" onClick={() => {
                                                                            this.purchaseMembership(plan.id,plan.slug)
                                                                        }}>PURCHASE
                                                                        </button>
                                                                    </>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }) : ""}
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
export default withRouter(MembershipDetails);



