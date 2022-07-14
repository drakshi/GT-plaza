import React from "react";
import {Modal} from "react-bootstrap";
import {instanceOf} from "prop-types";
import {Cookies, withCookies} from "react-cookie";
import {convertToSlug} from "../../../helper";

class PurchaseLeadInfo extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            show: null
        }
    }

    render() {

        var url_info = this.props?.reference_details;

        return (
            <>
                <Modal onHide={() => {
                    this.setState({show: false})
                }}
                       size="xl" show={this.state.show === false ? this.state.show : this.props.show}>
                    <Modal.Header className="border-0 pb-0 mt-1">
                        <h4>Lead Details</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-12">
                                <div className="col-md-12 message mt-2">
                                    <div className="d-flex align-items-center mb-2">
                                        <h6 className="sub-details mb-0">
                                            <img width="26px"
                                                 className="me-2"
                                                 src={this.props.lead?.country?.flag}
                                                 title={this.props.lead?.country?.name}/>
                                        </h6>
                                        <h6 className="mb-0">{this.props.lead?.product_name}</h6>
                                    </div>
                                    <p><b>Specification: </b>{this.props.lead?.description}</p>

                                    <div className="col-12 user-info">
                                        <div className="row">
                                            <div className="col-md-4 tile">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 448 512">
                                                    <path fill="currentColor"
                                                          d="M128 148v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12zm140 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-128 96h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm128 0h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-76 84v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm76 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm180 124v36H0v-36c0-6.6 5.4-12 12-12h19.5V24c0-13.3 10.7-24 24-24h337c13.3 0 24 10.7 24 24v440H436c6.6 0 12 5.4 12 12zM79.5 463H192v-67c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v67h112.5V49L80 48l-.5 415z">
                                                    </path>
                                                </svg>
                                                <h6>Company</h6><p
                                            >{this.props.lead?.company_name}</p>
                                            </div>
                                            <div className="col-md-4 tile">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 448 512">
                                                    <path fill="currentColor"
                                                          d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z">
                                                    </path>
                                                </svg>
                                                <h6>Contact person</h6><p>{this.props.lead?.full_name}</p></div>
                                            <div className="col-md-4 tile">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 512 512">
                                                    <path fill="currentColor"
                                                          d="M256 8C118.941 8 8 118.919 8 256c0 137.059 110.919 248 248 248 48.154 0 95.342-14.14 135.408-40.223 12.005-7.815 14.625-24.288 5.552-35.372l-10.177-12.433c-7.671-9.371-21.179-11.667-31.373-5.129C325.92 429.757 291.314 440 256 440c-101.458 0-184-82.542-184-184S154.542 72 256 72c100.139 0 184 57.619 184 160 0 38.786-21.093 79.742-58.17 83.693-17.349-.454-16.91-12.857-13.476-30.024l23.433-121.11C394.653 149.75 383.308 136 368.225 136h-44.981a13.518 13.518 0 0 0-13.432 11.993l-.01.092c-14.697-17.901-40.448-21.775-59.971-21.775-74.58 0-137.831 62.234-137.831 151.46 0 65.303 36.785 105.87 96 105.87 26.984 0 57.369-15.637 74.991-38.333 9.522 34.104 40.613 34.103 70.71 34.103C462.609 379.41 504 307.798 504 232 504 95.653 394.023 8 256 8zm-21.68 304.43c-22.249 0-36.07-15.623-36.07-40.771 0-44.993 30.779-72.729 58.63-72.729 22.292 0 35.601 15.241 35.601 40.77 0 45.061-33.875 72.73-58.161 72.73z"
                                                          className="">
                                                    </path>
                                                </svg>
                                                <h6>Quantity</h6><p>{this.props.lead?.quantity}</p></div>
                                            <div className="col-md-4 tile mt-md-3 mt-2">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 512 512">
                                                    <path fill="currentColor"
                                                          d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"
                                                          className="">
                                                    </path>
                                                </svg>
                                                <h6>Email</h6><p className="text-truncate">{this.props.lead?.email}</p>
                                            </div>
                                            <div className="col-md-4 tile mt-md-3 mt-2">
                                                <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                                     data-icon="phone-alt" role="img"
                                                     xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 512 512"
                                                     className="svg-inline--fa fa-phone-alt fa-w-16 fa-3x">
                                                    <path fill="currentColor"
                                                          d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"
                                                          className="">
                                                    </path>
                                                </svg>
                                                <h6>Mobile number</h6>
                                                <p>
                                                    {this.props.lead?.mobile_number ? this.props.lead?.mobile_number : "N/A"}
                                                    {this.props.lead?.mobile_number &&
                                                          <>
                                                              <a target="_blank" rel="noreferrer"
                                                                 href={"https://wa.me/"+this.props.lead?.mobile_number?.replace(/\s|-/g, "").trim()+"?text="+url_info}>
                                                                  <img height="20px" width="20px" src="https://www.svgrepo.com/show/176768/whatsapp-social-media.svg"/>
                                                              </a>
                                                              <a target="_blank" rel="noreferrer" href={"tel://"+this.props.lead?.mobile_number?.replace(/\s|-/g, "").trim()}>
                                                                  <img className="mr-1" height="17px" width="17px" src="https://cdn-icons-png.flaticon.com/512/724/724664.png"/>
                                                              </a>
                                                          </>
                                                    }
                                                </p>
                                            </div>
                                            <div className="col-md-4 tile mt-md-3 mt-2">
                                                <svg viewBox="0 0 512 512">
                                                    <path fill="currentColor"
                                                          d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"
                                                          className="">
                                                    </path>
                                                </svg>
                                                <h6>Phone number</h6>
                                                <p >{this.props.lead?.phone_number ? this.props.lead?.phone_number : "N/A"}
                                                    {this.props.lead?.phone_number &&
                                                        <>
                                                            <a target="_blank" rel="noreferrer" href={"https://wa.me/"+ this.props.lead?.phone_number?.replace(/\s|-/g, "").trim()+"?text="+url_info}>
                                                                <img height="20px" width="20px" src="https://www.svgrepo.com/show/176768/whatsapp-social-media.svg"/>
                                                            </a>
                                                            <a target="_blank" rel="noreferrer" href={"tel://"+this.props.lead?.phone_number?.replace(/\s|-/g, "").trim()}>
                                                                <img className="mr-1" height="17px" width="17px" src="https://cdn-icons-png.flaticon.com/512/724/724664.png"/>
                                                            </a>
                                                        </>
                                                    }
                                                </p>
                                            </div>
                                            <div className="col-md-4 tile mt-md-3 mt-2">
                                                <svg viewBox="0 0 576 512">
                                                    <path fill="currentColor"
                                                        d="M408 120C408 174.6 334.9 271.9 302.8 311.1C295.1 321.6 280.9 321.6 273.2 311.1C241.1 271.9 168 174.6 168 120C168 53.73 221.7 0 288 0C354.3 0 408 53.73 408 120zM288 152C310.1 152 328 134.1 328 112C328 89.91 310.1 72 288 72C265.9 72 248 89.91 248 112C248 134.1 265.9 152 288 152zM425.6 179.8C426.1 178.6 426.6 177.4 427.1 176.1L543.1 129.7C558.9 123.4 576 135 576 152V422.8C576 432.6 570 441.4 560.9 445.1L416 503V200.4C419.5 193.5 422.7 186.7 425.6 179.8zM150.4 179.8C153.3 186.7 156.5 193.5 160 200.4V451.8L32.91 502.7C17.15 508.1 0 497.4 0 480.4V209.6C0 199.8 5.975 190.1 15.09 187.3L137.6 138.3C140 152.5 144.9 166.6 150.4 179.8H150.4zM327.8 331.1C341.7 314.6 363.5 286.3 384 255V504.3L192 449.4V255C212.5 286.3 234.3 314.6 248.2 331.1C268.7 357.6 307.3 357.6 327.8 331.1L327.8 331.1z">
                                                        </path>
                                                </svg>
                                                <h6>Address</h6><p>{this.props.lead?.address}</p>
                                            </div>
                                            <div className="col-md-4 tile mt-md-3 mt-2">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 640 512">
                                                    <path fill="currentColor"
                                                          d="M496.616 372.639l70.012-70.012c16.899-16.9 9.942-45.771-12.836-53.092L512 236.102V96c0-17.673-14.327-32-32-32h-64V24c0-13.255-10.745-24-24-24H248c-13.255 0-24 10.745-24 24v40h-64c-17.673 0-32 14.327-32 32v140.102l-41.792 13.433c-22.753 7.313-29.754 36.173-12.836 53.092l70.012 70.012C125.828 416.287 85.587 448 24 448c-13.255 0-24 10.745-24 24v16c0 13.255 10.745 24 24 24 61.023 0 107.499-20.61 143.258-59.396C181.677 487.432 216.021 512 256 512h128c39.979 0 74.323-24.568 88.742-59.396C508.495 491.384 554.968 512 616 512c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24-60.817 0-101.542-31.001-119.384-75.361zM192 128h256v87.531l-118.208-37.995a31.995 31.995 0 0 0-19.584 0L192 215.531V128z"
                                                          className="">
                                                    </path>
                                                </svg>
                                                <h6>Shipping terms</h6><p
                                            >{this.props.lead?.shipping_terms}</p>
                                            </div>
                                            <div className="col-md-4 tile mt-md-3 mt-2">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 640 512">
                                                    <path fill="currentColor"
                                                          d="M352 288h-16v-88c0-4.42-3.58-8-8-8h-13.58c-4.74 0-9.37 1.4-13.31 4.03l-15.33 10.22a7.994 7.994 0 0 0-2.22 11.09l8.88 13.31a7.994 7.994 0 0 0 11.09 2.22l.47-.31V288h-16c-4.42 0-8 3.58-8 8v16c0 4.42 3.58 8 8 8h64c4.42 0 8-3.58 8-8v-16c0-4.42-3.58-8-8-8zM608 64H32C14.33 64 0 78.33 0 96v320c0 17.67 14.33 32 32 32h576c17.67 0 32-14.33 32-32V96c0-17.67-14.33-32-32-32zM48 400v-64c35.35 0 64 28.65 64 64H48zm0-224v-64h64c0 35.35-28.65 64-64 64zm272 192c-53.02 0-96-50.15-96-112 0-61.86 42.98-112 96-112s96 50.14 96 112c0 61.87-43 112-96 112zm272 32h-64c0-35.35 28.65-64 64-64v64zm0-224c-35.35 0-64-28.65-64-64h64v64z"
                                                          className="">
                                                    </path>
                                                </svg>
                                                <h6>Payment terms</h6><p
                                            >{this.props.lead?.payment_terms}</p>
                                            </div>
                                            <div className="col-md-4 tile mt-md-3 mt-2">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 640 512">
                                                    <path fill="currentColor"
                                                          d="M496.616 372.639l70.012-70.012c16.899-16.9 9.942-45.771-12.836-53.092L512 236.102V96c0-17.673-14.327-32-32-32h-64V24c0-13.255-10.745-24-24-24H248c-13.255 0-24 10.745-24 24v40h-64c-17.673 0-32 14.327-32 32v140.102l-41.792 13.433c-22.753 7.313-29.754 36.173-12.836 53.092l70.012 70.012C125.828 416.287 85.587 448 24 448c-13.255 0-24 10.745-24 24v16c0 13.255 10.745 24 24 24 61.023 0 107.499-20.61 143.258-59.396C181.677 487.432 216.021 512 256 512h128c39.979 0 74.323-24.568 88.742-59.396C508.495 491.384 554.968 512 616 512c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24-60.817 0-101.542-31.001-119.384-75.361zM192 128h256v87.531l-118.208-37.995a31.995 31.995 0 0 0-19.584 0L192 215.531V128z"
                                                          className="">
                                                    </path>
                                                </svg>
                                                <h6>Destination Port</h6>
                                                <p>{this.props.lead?.destination_port_city ? this.props.lead?.destination_port_city : "N/A"}</p>
                                            </div>
                                            <div className="col-md-4 tile mt-md-3 mt-2">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 448 512">
                                                    <path fill="currentColor"
                                                          d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z">
                                                    </path>
                                                </svg>
                                                <h6>Date</h6><p>{this.props.lead?.created_at}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </>)
    }
}
export default withCookies(PurchaseLeadInfo);



