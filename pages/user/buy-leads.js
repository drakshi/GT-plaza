import React from "react";
import AuthSidebar from "../../src/components/common/afterAuth/auth_sidebar";
import CommonLeads from "../../src/components/auth/lead/common_lead";
import SeoMeta from "../../src/components/common/meta/seo_meta";

class BuyLeads extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: 1,
        };
    }

    render() {
        return (
            <>
                <SeoMeta title={"Buy Leads - Global Trade Plaza"}
                         description={"Best B2B Marketplace Platform and Top 10 b2b Portal in India is Global Trade Plaza. We are Business to Business Import Export Portal helping companies, Traders and Manufacturers to find Buyers"}
                />
                <section className="dashboard">
                    <div className="container-fluid main-content">
                        <div className="row">
                            <AuthSidebar active={"buy-leads"}/>
                            <div className="col-md-9 col-12 right p-gt">
                                <div className="heading main">
                                    <h3>Verified buy leads</h3>
                                </div>
                                <div className="tabbable-panel">
                                    <div className="tabbable-line">
                                        <ul className="nav nav-tabs ">
                                            <li>
                                                <a onClick={()=>{
                                                    this.setState({active : 1})
                                                }} className={this.state.active === 1 ? "p-more active" : "p-more"} id="all_leads" data-toggle="tab">
                                                    All buy leads
                                                </a>
                                            </li>
                                            <li>
                                                <a onClick={()=>{
                                                    this.setState({active : 2})
                                                }} className={this.state.active === 2 ? "active" : ""} id="required_leads" data-toggle="tab">
                                                    Latest buy leads
                                                </a>
                                            </li>
                                            <li>
                                                <a onClick={()=>{
                                                    this.setState({active : 3})
                                                }} className={this.state.active === 3 ? "active" : ""} id="lead_purchase" data-toggle="tab">
                                                    Purchased buy leads
                                                </a>
                                            </li>
                                        </ul>
                                        <div className="tab-content enquiry">
                                            <CommonLeads active={this.state.active}/>
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

export default BuyLeads;



