import React from "react";
import API from "../../src/api/api.service";
import {images} from "../../constant";
import {imageOptimization, truncateString} from "../../src/helper";
import SeoMeta from "../../src/components/common/meta/seo_meta";
import Information from '../../src/components/auth/company/member/information';
import EnquiryNow from "../../src/components/auth/company/member/enquiryNow";
import SupplierProducts from "../../src/components/auth/company/member/products";
import Link from "next/link";

const api = new API();

class SingleSupplier extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            supplier_info: null,
            supplier_products: [],
            feature_products: [],
            show: false,
            active: 'information'
        },
            this.checkStatus = this.checkStatus.bind(this);
    }

    checkStatus(value) {
        if (value !== this.state.show) {
            this.setState({show: value})
        }
    }

    static async getInitialProps(ctx) {
        var supplier_info = null;
        var supplier_products = [];
        var feature_products = [];

        await api.getSingleSupplier(ctx.query.member).then(async (success) => {
            supplier_info = success.data.response;
        });
        await api.getSupplierProducts(supplier_info?.id).then(async (success) => {
            supplier_products = success.data.response;
        });
        await api.getSupplierFeatureProducts(supplier_info?.id).then(async (success) => {
            feature_products = success.data.response;
        });
        return {
            supplier_info: supplier_info,
            supplier_products: supplier_products,
            feature_products: feature_products
        }
    }

    render() {

        const member = this.props?.supplier_info;
        const products = this.props?.supplier_products;
        const features = this.props?.feature_products;

        const categories_array = products?.length ?
            products?.map((item) => {
                return item.category?.[0]
            }) : [];

        const responsive = {
            desktop: {
                breakpoint: {max: 3000, min: 1024},
                items: 5,
                slidesToSlide: 1 // optional, default to 1.
            },
            tablet: {
                breakpoint: {max: 1024, min: 464},
                items: 2,
                slidesToSlide: 1 // optional, default to 1.
            },
            mobile: {
                breakpoint: {max: 464, min: 0},
                items: 1,
                slidesToSlide: 1 // optional, default to 1.
            }
        };

        return (<>

            <SeoMeta title={member?.company_profile.company_name + " – Global Trade Plaza"}
                     description={truncateString(member?.company_profile.company_description, 250)}
                     image={member?.company_profile.company_logo}
            />

            <section className="singles mt-4">
                <div className="col-12 supplier">
                    <div className="container p-0">
                        <div className="col-12 business-banner">
                            <img className="banner-img" id="company_banner" src={
                                member?.company_profile?.company_profile_banner ?
                                    member?.company_profile?.company_profile_banner :
                                    imageOptimization("https://globaltradeplaza.com/assets/images/banner/default-supplier.jpg", 1400)
                            }/>
                            <div className="container business-info">
                                <div className="row justify-content-center">
                                    <div className="col-12 top">
                                        <div className="logo">
                                            <img id="company_logo" src={
                                                member?.company_profile?.company_logo ?
                                                    member?.company_profile?.company_logo :
                                                    images.logo_default.default.src
                                            } alt=""/>
                                        </div>

                                        <div className="label d-flex justify-content-center align-items-center">
                                                { member?.verify_certificate === 1 &&
                                                    <div id="single-prod-cert">
                                                            <a href="javascript:void(0)" onClick={()=>{
                                                                window.open("/certificate/"+member?.id, 'Certificate', 'width=650,height=600')}
                                                            }>
                                                                <img className="certificateOpen" src={images.approved.default.src} alt="" />
                                                            </a>
                                                    </div>
                                                }
                                                <img src={images.trusted.default.src} alt=""/>
                                        </div>

                                        <div className="rank">
                                            <img id="seller_membership" src={member?.membership?.plan?.banner} alt=""/>
                                        </div>
                                        <div className="name">
                                            <h1><span className="company_name"
                                                      style={{"color": "white"}}>{member?.company_profile.company_name}</span>
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="col-12 bottom d-none">
                                        <ul>
                                            <li><span>Business type</span>
                                                <span className="value businessType2">
                                                    {member?.company_profile?.primary_business_types.length > 0 ?
                                                        member?.company_profile?.primary_business_types?.map((item) => {
                                                            if (item?.name) {
                                                                return item?.name;
                                                            }
                                                        }).join(" | ") : "Not-available"}
                                                </span>
                                            </li>
                                            <li><span>Country</span>
                                                <span className="value country2">
                                                    {member?.company_profile?.country ? member?.company_profile?.country?.name : null}
                                                </span>
                                            </li>
                                            <li><span>Main market</span>
                                                <span className="value market">
                                                         {member?.business_profile?.business_major_market?.length > 0 ?
                                                             member?.business_profile?.business_major_market?.map((item) => {
                                                                 if (item?.name) {
                                                                     return item?.name;
                                                                 }
                                                             }).join(" | ") : "Not-available"}
                                                </span>
                                            </li>
                                            <li><span>Established on</span>
                                                <span className="value established">
                                                    {member?.business_profile?.established_year ?
                                                        member?.business_profile?.established_year :
                                                        "Not-available"
                                                    }
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 business-profile">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="col-12 action-bar">
                                        <ul>
                                            <li id="about">
                                                <a className={this.state.active === "information" ? "active" : ""}
                                                   onClick={() => {
                                                       this.setState({active: "information"});
                                                   }}
                                                >Information</a>
                                            </li>
                                            <li id="showcase">
                                                <a className={this.state.active === "products" ? "active" : ""}
                                                    onClick={() => {
                                                        this.setState({active: "products"});
                                                    }}
                                                >
                                                    Products
                                                </a>
                                            </li>
                                            <li className="contact_us"><a
                                                className={this.state.active === "enquiry" ? "active" : ""}
                                                onClick={() => {
                                                    this.setState({active: "enquiry"});
                                                }}
                                            >Enquire now</a>
                                            </li>
                                        </ul>
                                    </div>

                                    {this.state.active === 'information' &&
                                        <Information responsive={responsive} features={features} member={member} categories_array={categories_array}/>}
                                    {this.state.active === 'products' &&
                                         <SupplierProducts products={products} categories_array={categories_array}/>}
                                    {this.state.active === 'enquiry' && <EnquiryNow/>}

                                </div>
                                <div className="col-md-4">
                                    <div className="col-12 contact">
                                        <div className="col-12 t-box cards">
                                            <div className="head col-12">
                                                <h4>CONTACT COMPANY NOW</h4>
                                            </div>
                                            <div className="col info mb-3">
                                                <h6>
                                                    {/*<Link href={"/member/"+supplier?.company_profile?.slug}>*/}
                                                    <a>
                                                        {member?.company_profile.company_name}
                                                    </a>
                                                    {/*</Link>*/}
                                                </h6>
                                                <ul className="icons">
                                                    <li>
                                                        <img src={images.points.default.src} alt=""/>{''}{member?.points}
                                                    </li>
                                                    <li>
                                                        <img className="certificateOpen" src={member?.company_profile?.country?.flag} alt=""/>
                                                        { member?.company_profile?.country ? member?.company_profile?.country?.name : null }
                                                    </li>
                                                    <li>
                                                        { member?.verify_certificate === 1 &&
                                                            <a href="javascript:void(0)" onClick={()=>{
                                                                window.open("/certificate/"+member?.id, 'Certificate', 'width=650,height=600')}
                                                            }>
                                                                <img className="certificateOpen" src={images.approved.default.src} alt="" />
                                                            </a>
                                                        }

                                                        <a className="n-hover">
                                                            <img className="certificateOpen" src={images.trusted.default.src} alt=""/>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="col-12 user-info">
                                                <div className="row">
                                                    <div className="col-md-12 tile mb-2">
                                                        <h6>Contact number</h6>
                                                        <p className="w-100 hide-info">+xx-xxx-xxxx-xxx</p>
                                                    </div>
                                                    <div className="col-md-12 tile mb-2">
                                                        <h6>Country</h6>
                                                        <p className="w-100 country2">{member?.company_profile?.country ? member?.company_profile?.country?.name : null}</p>
                                                    </div>
                                                    <div className="col-md-12 tile mb-2">
                                                        <h6>City / State</h6>
                                                        <p className="w-100 city">{member?.company_profile.city ? member?.company_profile?.city : "Not-available"}</p>
                                                    </div>
                                                    <div className="col-12 tile mb-2">
                                                        <h6>Street address</h6>
                                                        <p className="w-100 address">{member?.company_profile.address ? member?.company_profile?.address : "Not-available"}</p>
                                                    </div>
                                                    <div className="col-12 mt-2 mb-1">
                                                        <button className="btn w-100"  onClick={() => {
                                                            this.setState({active: "enquiry"})
                                                        }}>Contact now</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>)
    }
}

export default SingleSupplier;



