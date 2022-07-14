import React from "react";
import AuthSidebar from "../../src/components/common/afterAuth/auth_sidebar";
import {images} from "../../constant";
import API from "../../src/api/api.service";
import {NotificationManager} from "react-notifications";
import InquiryModal from "../../src/components/common/modals/inquiry_modal";
import LoadingBar from "react-top-loading-bar";
import SeoMeta from "../../src/components/common/meta/seo_meta";
const api = new API();

class Requirements extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            progress:0,
            show: false,
            requirements: []
        };
        this.handleDeleteRequirement = this.handleDeleteRequirement.bind(this);
        this.checkStatus = this.checkStatus.bind(this);
    }


    checkStatus(value) {
        if (value !== this.state.show) {
            this.setState({show: value})
        }
    }

    componentDidMount() {
        this.getAllSellerRequirements();
    }

    getAllSellerRequirements()
    {
        api.userRequirements(
            this.setState({progress:30}),

            setTimeout(() => {
                this.setState({ progress: 90 });
            }, 1000)
        ).then((success) => {
            this.setState({requirements: success.data.response, progress:100});
        });
    }

    handleDeleteRequirement(id){
        api.deleteRequirement(id).then((success) => {
            NotificationManager.success(success.data.message);
            this.getAllSellerRequirements();
        });
    }

    render() {
        return (
            <>
                <SeoMeta title={"Post requirement - Global Trade Plaza"}
                         description={"Best B2B Marketplace Platform and Top 10 b2b Portal in India is Global Trade Plaza. We are Business to Business Import Export Portal helping companies, Traders and Manufacturers to find Buyers"}
                />
                <LoadingBar progress={this.state.progress} color="blue" />
                <section className="dashboard">
                    <div className="container-fluid main-content">
                        <div className="row">
                            <AuthSidebar active={"requirements"}/>
                            <div className="col-md-9 col-12 right enquiry p-gt">
                                <div className="heading main mt-1">
                                    <h3>My Requirements
                                        <a href="javascript:void(0)" type="button" data-toggle="modal" data-target="#requirement-modal"
                                           onClick={()=>{
                                               this.setState({show: true})
                                           }}
                                        >Post new
                                            requirement</a></h3>
                                </div>
                                <div className="table" id="paginate">
                                    <div className="" id="requirements">

                                        { this.state.requirements.length > 0 ? this.state.requirements.map((requirement, index) => {

                                                    return (
                                                        <><div className="col-12 t-box p-0">
                                                            <div className="row">
                                                                <div className="col-md-12 message py-0 px-3">
                                                                    <h6 className="fw-bold">{requirement.product_name}
                                                                        <a className="delete-requirement"
                                                                           title="delete this requirement" href="javascript:void(0);"
                                                                           data-id="5119" onClick={()=>{
                                                                               this.handleDeleteRequirement(requirement.id)
                                                                        }}>
                                                                            <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                                                                 data-icon="trash" role="img"
                                                                                 xmlns="http://www.w3.org/2000/svg"
                                                                                 viewBox="0 0 448 512">
                                                                                <path fill="currentColor"
                                                                                      d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"
                                                                                      className="">
                                                                                </path>
                                                                            </svg>
                                                                        </a>
                                                                    </h6>
                                                                    <h6 className="sub-details">
                                                                        <img title={requirement.country?.name}
                                                                             src={requirement.country?.flag} />
                                                                    </h6>
                                                                    <p className="mb-0">{requirement.description}</p>
                                                                    <div className="col-12 user-info">
                                                                        <div className="row">
                                                                            <div className="col-md-3 tile">
                                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                                     viewBox="0 0 448 512">
                                                                                    <path fill="currentColor"
                                                                                          d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z">
                                                                                    </path>
                                                                                </svg>
                                                                                <h6>Payment modes</h6><p>{requirement.payment_terms}</p></div>
                                                                            <div className="col-md-3 tile">
                                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                                     viewBox="0 0 512 512">
                                                                                    <path fill="currentColor"
                                                                                          d="M256 8C118.941 8 8 118.919 8 256c0 137.059 110.919 248 248 248 48.154 0 95.342-14.14 135.408-40.223 12.005-7.815 14.625-24.288 5.552-35.372l-10.177-12.433c-7.671-9.371-21.179-11.667-31.373-5.129C325.92 429.757 291.314 440 256 440c-101.458 0-184-82.542-184-184S154.542 72 256 72c100.139 0 184 57.619 184 160 0 38.786-21.093 79.742-58.17 83.693-17.349-.454-16.91-12.857-13.476-30.024l23.433-121.11C394.653 149.75 383.308 136 368.225 136h-44.981a13.518 13.518 0 0 0-13.432 11.993l-.01.092c-14.697-17.901-40.448-21.775-59.971-21.775-74.58 0-137.831 62.234-137.831 151.46 0 65.303 36.785 105.87 96 105.87 26.984 0 57.369-15.637 74.991-38.333 9.522 34.104 40.613 34.103 70.71 34.103C462.609 379.41 504 307.798 504 232 504 95.653 394.023 8 256 8zm-21.68 304.43c-22.249 0-36.07-15.623-36.07-40.771 0-44.993 30.779-72.729 58.63-72.729 22.292 0 35.601 15.241 35.601 40.77 0 45.061-33.875 72.73-58.161 72.73z"
                                                                                          className="">
                                                                                    </path>
                                                                                </svg>
                                                                                <h6>Quantity</h6><p>{requirement.quantity}</p></div>
                                                                            <div className="col-md-3 tile">
                                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                                     viewBox="0 0 448 512">
                                                                                    <path fill="currentColor"
                                                                                          d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z">
                                                                                    </path>
                                                                                </svg>
                                                                                <h6>Date</h6><p>{requirement.created_at}</p></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        </>
                                                    )
                                                }) :

                                                <div className="no-data d-block" role="alert" id="note_available">
                                                        <div className="t-box">
                                                            <img src={images.not_found.default.src}/>
                                                            <h3 className="fw-bold">No Buying Requirements</h3>
                                                            <h6>
                                                                <span>Once created, your buying requirements will be displayed here.</span>
                                                            </h6>
                                                            <h6>
                                                                <p>Want To Post A Buying Requirement-</p>
                                                                <button type="button"
                                                                        className="btn"
                                                                        data-toggle="modal"
                                                                        data-target="#requirement-modal"
                                                                        onClick={()=>{
                                                                            this.setState({show: true})
                                                                        }}
                                                                >
                                                                    Post requirement
                                                                </button>
                                                            </h6>
                                                        </div>
                                                    </div>
                                            }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <InquiryModal product_info={{
                    product_id : null,
                    product_name : null
                }} type={4} checkStatus={this.checkStatus} show={this.state.show}/>
            </>
        )
    }
}
export default Requirements;



