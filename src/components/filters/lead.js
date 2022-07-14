import React from "react";
import {truncateString} from "../../helper";
import Link from "next/link";
import {NotificationManager} from "react-notifications";
import {confirmAlert} from "react-confirm-alert";
import API from "../../api/api.service";
import withRouter from "next/dist/client/with-router";
import {instanceOf} from "prop-types";
import {Cookies, withCookies} from "react-cookie";
import Router from "next/router";
import PurchaseLeadInfo from "../common/modals/purchase_lead_info";
import {images} from "../../../constant";
const api = new API();

class Lead extends React.Component {

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
        this.handlePurchaseLead = this.handlePurchaseLead.bind(this);
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
            :  Router.push("/login?ref=search-leads");
    }

    render() {

        return (<>
            {this.props.list?.length ? this.props.list.map((lead,index)=>{
                return(
                    <>
                        <div className="col-12 t-box cards">
                            <div className="row">
                                <div className="col-8 info">
                                    <ul className="bottom-info">
                                        <li>
                                            <img title={lead?.country?.name}
                                                 alt={lead?.country?.name}
                                                 src={lead?.country?.flag} />
                                        </li>
                                    </ul>
                                    <h5>
                                        <Link href={"/lead/"+lead?.slug}>
                                            <a>{lead?.product_name}</a>
                                        </Link>
                                    </h5>
                                    <h6>{truncateString(lead?.description,150)}
                                        {lead?.description && lead?.description.length > 150 ?
                                            <Link href={"/lead/"+lead?.slug}>
                                                <a>..show more</a>
                                            </Link>
                                            : "" }
                                    </h6>
                                    <div className="col-12 user-info">
                                        <div className="row">
                                            <div className="col-md-4 tile">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                    <path fill="currentColor"
                                                          d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"></path>
                                                </svg>
                                                <h6>Company</h6>
                                                <p className="hide-info">XXXXXXXXXXX</p></div>
                                            <div className="col-md-4 tile">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path fill="currentColor"
                                                          d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path>
                                                </svg>
                                                <h6>Buyer contact</h6>
                                                <p className="hide-info">XXXXXXXXXXX</p></div>
                                            <div className="col-md-4 tile">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                    <path fill="currentColor"
                                                          d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"></path>
                                                </svg>
                                                <h6>Requested on</h6>
                                                <p>{lead?.created_at}</p></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4 quote log-user">
                                    <button className="btn home_quote" onClick={()=>{
                                        this.handlePurchaseLead(lead?.id)
                                    }}>Quote now</button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }) :
                <div className="no-data d-block" role="alert">
                    <div className="t-box mb-0 ml-3">
                        <img src={images.not_found.default.src}/>
                        <h5>No Lead Found</h5>
                    </div>
                </div>
            }
            <PurchaseLeadInfo show={this.state.show} lead={this.state.lead_info} reference_details={this.state.reference_details} />
        </>)
    }
}

export default withRouter(withCookies(Lead));



