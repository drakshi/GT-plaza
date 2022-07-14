import React from "react";
import API from "../../src/api/api.service";
import {imageOptimization, truncateString} from "../../src/helper";
import SeoMeta from "../../src/components/common/meta/seo_meta";
import {images} from "../../constant";
import Link from "next/link";
import {confirmAlert} from "react-confirm-alert";
import Router from "next/router";
import {NotificationManager} from "react-notifications";
import PurchaseLeadInfo from "../../src/components/common/modals/purchase_lead_info";
import {Cookies, withCookies} from "react-cookie";
import {instanceOf} from "prop-types";
const api = new API();

class SingleLead extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            token: this.props.cookies.get('auth_token'),
            show : false,
            lead_info : null,
            reference_details : null
        };
    }

    purchaseLead(id){
        api.assignedLead(
            id
        ).then((success) => {
            this.setState({
                lead_info : success.data.response.leads?.[0],
                reference_details : success.data.response.reference_details,
                show : true
            });
            NotificationManager.success(success.data.message);
        }).catch((error) => {
            NotificationManager.error(error.response.data.message);
        });
    }

    handlePurchaseLead(id)
    {
        this.state.token ?
            this.setState({show : false},()=>{
                confirmAlert({
                    customUI: ({ onClose }) => {
                        return (
                            <div className='custom-ui'>
                                <h1>Are you sure?</h1>
                                <p>You&apos;re about to purchase this lead by spending 1 lead credit.</p>
                                <button onClick={onClose}>Cancel</button>
                                <button
                                    onClick={() => {
                                        this.purchaseLead(id);
                                        onClose();
                                    }}
                                >
                                    Confirm
                                </button>
                            </div>
                        );
                    }
                });
            })
            :  Router.push("/login");
    }

    static async getInitialProps(ctx) {
        var lead_info = null;
        var category_leads = null;
        await api.getSingleLead(ctx.query.lead).then(async (success) => {
            lead_info = success.data.response;
        });
        await api.getCategoryLeads(lead_info?.id).then(async (result) => {
            category_leads = result.data.response;
        });

        return {
            lead_info: lead_info,
            category_leads: category_leads
        }
    }

    render() {

        return (
            <>
                <SeoMeta title={this.props.lead_info?.product_name + " – Global Trade Plaza"}
                         description={truncateString(this.props.lead_info?.description,250)}
                         image={this.props.lead_info?.country?.flag}
                />

                <section className="singles mt-4">
                    <div className="container lead">
                        <div className="col-12 header p-0">
                            <div className="row">
                                <div className="col-10 breadcrumb">
                                    <p><Link href={"/"}><a>Home</a></Link> | <Link href={"/search-leads"}><a>Lead</a></Link> | <span className="req_category">{this.props.lead_info?.product_name}</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row">
                                <div className="col-md-12 col-12 left">
                                    <div className="col-12 leads">
                                        <div className="col-12 list">
                                            <div className="col-12 t-box cards">
                                                <div className="col-12 info" id="single-main">
                                                    <ul className="bottom-info">
                                                        <li className="p-0 mr-1">
                                                            <img className="ml-0" id="flag"
                                                                 title={this.props.lead_info?.country?.name}
                                                                 alt={this.props.lead_info?.country?.name}
                                                                 src={imageOptimization(this.props.lead_info?.country?.flag, 50)}/>
                                                        </li>
                                                    </ul>
                                                    <h1 className="requirement">
                                                        {this.props.lead_info?.product_name}
                                                    </h1>
                                                    <div className="col-12 user-info">
                                                        <div className="row">
                                                            <div className="col-md-3 tile">
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                     viewBox="0 0 448 512">
                                                                    <path fill="currentColor"
                                                                          d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"></path>
                                                                </svg>
                                                                <h6>Company</h6>
                                                                <p className="hide-info">xxxxxxxxxxxxxxx</p>
                                                            </div>
                                                            <div className="col-md-2 tile">
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                     viewBox="0 0 512 512">
                                                                    <path fill="currentColor"
                                                                          d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path>
                                                                </svg>
                                                                <h6>Buyer contact</h6>
                                                                <p className="hide-info">xxxxxxxxxxxxx</p>
                                                            </div>
                                                            <div className="col-md-2 tile">
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                     viewBox="0 0 448 512">
                                                                    <path fill="currentColor"
                                                                          d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"></path>
                                                                </svg>
                                                                <h6>Requested on</h6>
                                                                <p id="requested_on">
                                                                    {this.props.lead_info?.created_at ? this.props.lead_info?.created_at : "Not-Available"}
                                                                </p>
                                                            </div>
                                                            <div className="col-md-5 tile">
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                     viewBox="0 0 640 512"
                                                                     className="svg-inline--fa fa-balance-scale fa-w-20 fa-3x">
                                                                    <path fill="currentColor"
                                                                          d="M256 336h-.02c0-16.18 1.34-8.73-85.05-181.51-17.65-35.29-68.19-35.36-85.87 0C-2.06 328.75.02 320.33.02 336H0c0 44.18 57.31 80 128 80s128-35.82 128-80zM128 176l72 144H56l72-144zm511.98 160c0-16.18 1.34-8.73-85.05-181.51-17.65-35.29-68.19-35.36-85.87 0-87.12 174.26-85.04 165.84-85.04 181.51H384c0 44.18 57.31 80 128 80s128-35.82 128-80h-.02zM440 320l72-144 72 144H440zm88 128H352V153.25c23.51-10.29 41.16-31.48 46.39-57.25H528c8.84 0 16-7.16 16-16V48c0-8.84-7.16-16-16-16H383.64C369.04 12.68 346.09 0 320 0s-49.04 12.68-63.64 32H112c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h129.61c5.23 25.76 22.87 46.96 46.39 57.25V448H112c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h416c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"
                                                                          className=""></path>
                                                                </svg>
                                                                <h6>Quantity</h6>
                                                                <p id="quantity">
                                                                    {this.props.lead_info?.quantity ? this.props.lead_info?.quantity : "Not-available"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="btn-div">
                                                        <button className="btn home_quote" data-id=""
                                                                onClick={()=>{
                                                                    this.handlePurchaseLead(this.props.lead_info?.id)
                                                                }}
                                                        >Quote now</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 t-box cards category-leads">
                                                <div className="col-12 info pr-0">
                                                    <ul className="table-ul">
                                                        <li>
                                                            <span>Description</span>
                                                            <span className="value" id="description">
                                                                    {this.props.lead_info?.description ? this.props.lead_info?.description : "Not-available"}
                                                                </span>
                                                        </li>
                                                        <li>
                                                            <span>Shipping terms</span>
                                                            <span className="value hide-info">xxxxxx,xxxxx,xxxxx</span>
                                                        </li>
                                                        <li><span>Payment terms</span>
                                                            <span className="value" id="paymentTerm">
                                                                     {this.props.lead_info?.payment_terms ? this.props.lead_info?.payment_terms : "Not-available"}
                                                                </span>
                                                        </li>
                                                        <li id="packTerm-wrap">
                                                            <span>Packaging terms</span>
                                                            <span className="value" id="packTerm">
                                                                    {this.props.lead_info?.packaging_terms ? this.props.lead_info?.packaging_terms : "Not-available"}
                                                                </span>
                                                        </li>
                                                        <li id="destCountry-wrap"><span>Destination port</span>
                                                            <span className="value">
                                                                    {this.props.lead_info?.destination_port_city &&
                                                                    <p id="destCity" className="mb-0">
                                                                        {this.props.lead_info?.destination_port_city}
                                                                    </p>
                                                                    }
                                                                {this.props.lead_info?.dest_country?.name &&
                                                                <p id="destCountry" className="mb-0">
                                                                    {this.props.lead_info?.dest_country?.name}
                                                                </p>
                                                                }
                                                                {!this.props.lead_info?.destination_port_city && !this.props.lead_info?.dest_country?.name &&
                                                                "Not-available"
                                                                }
                                                                </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="col-12 home-leads leads-single">
                                        <div className="row">
                                           {this.props.category_leads && this.props.category_leads.length &&
                                                <div className="list-main col-md-6 col-12">
                                                    <div className="col-12 list t-box">
                                                        <div className="head col-12">
                                                            <h4>Related buy Leads</h4>
                                                        </div>
                                                        <div className="scroll-container">
                                                            <div className="data-list">
                                                                <ul className="scroll-text relatedLeads1">
                                                                    {this.props.category_leads && this.props.category_leads.length ? this.props.category_leads.map((lead, index) => {
                                                                            var url = "/lead/" + lead.slug;
                                                                            var flag = imageOptimization(lead.country?.flag, 50);
                                                                            if (index < (this.props.category_leads.length / 2)) {
                                                                                return (
                                                                                    <>
                                                                                        <li key={index}>
                                                                                            <Link href={url}>
                                                                                                <a>
                                                                                                    <img width="30" height="auto"
                                                                                                         className="lazy"
                                                                                                         title={lead?.country?.name}
                                                                                                         alt={lead?.country?.name}
                                                                                                         src={flag}
                                                                                                    />
                                                                                                    <span> {lead.product_name} | {lead.quantity}
                                                                                                        <br/>{lead.created_at}
                                                                                            </span>
                                                                                                </a>
                                                                                            </Link>
                                                                                        </li>
                                                                                    </>
                                                                                )
                                                                            }
                                                                        }) :
                                                                        <div className="no-data no_data_2" role="alert">
                                                                            <div className="t-box">
                                                                                <img src={images.not_found.default.src}/>
                                                                                <h4>No Lead found</h4>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }


                                            {this.props.category_leads && !!this.props.category_leads.length &&
                                                <div className="list-main col-md-6 col-12">
                                                    <div className="col-12 list t-box">
                                                        <div className="head col-12">
                                                            <h4>Latest buy Leads</h4>
                                                        </div>
                                                        <div className="scroll-container">
                                                            <div className="data-list">
                                                                <ul className="scroll-text relatedLeads1">
                                                                    {this.props.category_leads && this.props.category_leads.length ? this.props.category_leads.map((lead, index) => {
                                                                            var url = "/lead/" + lead.slug;
                                                                            var flag = imageOptimization(lead.country?.flag, 50);
                                                                            if (index > (this.props.category_leads.length / 2) && index < this.props.category_leads.length) {
                                                                                return (
                                                                                    <>
                                                                                        <li key={index}>
                                                                                            <Link href={url}>
                                                                                                <a>
                                                                                                    <img width="30"
                                                                                                         height="auto"
                                                                                                         className="lazy"
                                                                                                         title={lead?.country?.name}
                                                                                                         alt={lead?.country?.name}
                                                                                                         src={flag}
                                                                                                    />
                                                                                                    <span> {lead.product_name} | {lead.quantity}
                                                                                                        <br/>{lead.created_at}</span>
                                                                                                </a>
                                                                                            </Link>
                                                                                        </li>
                                                                                    </>
                                                                                )
                                                                            }
                                                                        }) :
                                                                        <div className="no-data no_data_2" role="alert">
                                                                            <div className="t-box">
                                                                                <img src={images.not_found.default.src}/>
                                                                                <h4>No Lead found</h4>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <PurchaseLeadInfo show={this.state.show} lead={this.state.lead_info} reference_details={this.state.reference_details} />
            </>
        )
    }
}

export default withCookies(SingleLead) ;



