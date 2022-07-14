import React from "react";
import API from "../../../api/api.service";
const api = new API();
class ChatProviderInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inquiry_id: null,
            inquiry_info : null,
            show : ""
        };
    }

    componentDidMount() {
        this.getSingleInquiry(this.props?.inquiry_id)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.inquiry_id !== this.props.inquiry_id){
            this.getSingleInquiry(this.props?.inquiry_id)
        }
    }

    getSingleInquiry(id) {
        if (id !== null && this.state.inquiry_id !== id) {
            api.getSingleInquiry(id).then((success) => {
                this.setState({inquiry_info: success.data.response ,inquiry_id : id});
            });
        }
    }

    render() {

        return (
            <>
                <div className="msg_info">
                    <div className="row justify-content-between align-items-center">
                        <div className="col left">
                            <a className="chat-close" onClick={()=>{
                                document.getElementById("chat-tab-open")?.classList.remove('msg-open');
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 320 512">
                                    <path fill="currentColor"
                                          d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"
                                          className="">
                                    </path>
                                </svg>
                            </a>
                            <div className="chat-img">
                                <img id="company_logo" src="https://admin.globaltradeplaza.com/public/images/profile.png" />
                            </div>
                            <div className="chat-name">
                                <h5 id="company_name">
                                    {this.state.inquiry_info?.seller?.company_name}
                                </h5>
                            </div>
                        </div>
                        <div className="col-auto right">
                            <button className="btn btn-icon" id="eq-btn" onClick={()=>{
                                this.setState({show : this.state.show === "" ? "show" : "" })
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 512 512">
                                    <path fill="currentColor"
                                          d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm0-338c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z">
                                    </path>
                                </svg>
                            </button>
                            <div className={"info-enquiry "+this.state.show} id="eq-info">
                                <h5><b>Enquiry details</b></h5>
                                <div className="row">
                                    <div className="col-auto items">
                                        <p>Enquiry for</p>
                                        <h6 id="product_name">
                                           {"Looking for " + this.state.inquiry_info?.product_name}
                                        </h6>
                                    </div>
                                    <div className="col-auto items">
                                        <p>Date Posted</p>
                                        <h6 id="posted_date">
                                            {this.state.inquiry_info?.created_at}
                                        </h6>
                                    </div>
                                    <div className="col-auto items">
                                        <p>Quantity required</p>
                                        <h6 id="quantity">
                                            {this.state.inquiry_info?.quantity}
                                        </h6>
                                    </div>
                                    <div className="col-auto items">
                                        <p>Shipping term</p>
                                        <h6 id="shipping_term">
                                            {this.state.inquiry_info?.shipping_term_id}
                                        </h6>
                                    </div>
                                    <div className="col-auto items">
                                        <p>Payment terms</p>
                                        <h6 id="payment_terms">
                                            {this.state.inquiry_info?.payment_terms}
                                        </h6>
                                    </div>
                                    <div className="col-auto items">
                                        <p>Description</p>
                                        <h6 className="mb-0" id="description">
                                            {this.state.inquiry_info?.description}
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
};
export default ChatProviderInfo;



