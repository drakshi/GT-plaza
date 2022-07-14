import React from "react";
import AuthSidebar from "../../src/components/common/afterAuth/auth_sidebar";
import CompanyInfo from "../../src/components/auth/company/company_info";
import BusinessProfile from "../../src/components/auth/company/business_info";
import Certifications from "../../src/components/auth/company/certifications";
import BusinessLocation from "../../src/components/auth/company/business_locations";
import SeoMeta from "../../src/components/common/meta/seo_meta";

class CompanyProfile extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            active: "company_profile",
        };
    }

    render() {
        return (
            <>
                <SeoMeta title={"Company profile - Global Trade Plaza"}
                         description={"Best B2B Marketplace Platform and Top 10 b2b Portal in India is Global Trade Plaza. We are Business to Business Import Export Portal helping companies, Traders and Manufacturers to find Buyers"}
                />
                <section className="dashboard">
                    <div className="container-fluid main-content">
                        <div className="row">
                            <AuthSidebar active={"company-profile"}/>

                            <div className="col-md-9 col-12 right p-gt">
                                <div className="heading main">
                                    <h3>Company profile</h3>
                                </div>

                                <div className="tabbable-panel">
                                    <div className="tabbable-line">
                                        <ul className="nav nav-tabs ">
                                            <li>
                                                <a className={this.state.active === "company_profile" ? "active" : "" }
                                                    onClick={()=>{
                                                         this.setState({active : "company_profile"})
                                                     }}
                                                >General details</a>
                                            </li>
                                            <li>
                                                <a className={this.state.active === "business_profile" ? "active" : "" }
                                                   onClick={()=>{
                                                       this.setState({active : "business_profile"})
                                                   }}>Company info</a>
                                            </li>
                                            <li>
                                                <a className={this.state.active === "certification" ? "active" : "" }
                                                   onClick={()=>{
                                                       this.setState({active : "certification"})
                                                   }}>Certification & Licensing</a>
                                            </li>
                                            <li>
                                                <a className={this.state.active === "business_location" ? "active" : "" }
                                                   onClick={()=>{
                                                       this.setState({active : "business_location"})
                                                   }}>Office location(s)</a>
                                            </li>
                                        </ul>
                                        <div className="tab-content">
                                            <CompanyInfo active={this.state.active} />
                                            <BusinessProfile active={this.state.active} />
                                            <Certifications active={this.state.active} />
                                            <BusinessLocation active={this.state.active} />
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
};
export default CompanyProfile;



