import React from "react";
import {images} from "../../../../constant";
import API from "../../../api/api.service";
const api = new API();

class SellerInquiry extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inquiry_id : null,
            email : null,
            inquiries: [],
            type : null
        };
    }

    componentDidMount() {
        if (this.props.type === 1) {
            this.getSellerInquiries();
        }
        if (this.props.type === 2) {
            this.getSelfInquiry();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.type !== prevProps.type){
            if (this.props.type === 1) {
                this.getSellerInquiries();
            }
            if (this.props.type === 2) {
                this.getSelfInquiry();
            }
        }
    }

    getSellerInquiries() {
        api.getSellerInquiry({page: 1}).then((success) => {
            this.setState({
                inquiries: success.data.response?.inquiries,
                type : 1,
                email : success.data.response?.inquiries?.[0]?.email,
                inquiry_id : success.data.response?.inquiries?.[0]?.id,
            });
        });
    }

    getSelfInquiry() {
        api.getSelfInquiry().then((success) => {
            this.setState({
                inquiries: success.data.response,
                type : 2,
                email : success.data.response?.[0]?.email,
                inquiry_id : success.data.response?.[0]?.id,
            });
        });
    }

    render() {

        //thread handler
        { this.props.threadHandler({
            'email' : this.state.email,
            'inquiry_id':this.state.inquiry_id,
            'type' : this.props.type
        })}

        return (
            <>
                <div className="tab-pane fade show active" id="home" aria-labelledby="home-tab">

                    <div className="inbox_chat">

                        {this.state.inquiries.length ? this.state.inquiries.map((inquiry, index) => {

                                return (
                                    <>
                                        <div className="chat_list" onClick={()=>{
                                            this.setState({
                                                email : inquiry.email,
                                                inquiry_id : inquiry.id
                                            },()=>{
                                                document.getElementById("chat-tab-open").classList.add('msg-open');
                                            })
                                        }}>
                                            <div className="chat_people">
                                                <div className="chat_ib p-0 w-100">
                                                    <h5 className="pt-0">
                                                        <img style={{
                                                            "width": "20px",
                                                            "margin-right": "5px",
                                                            "position": "relative",
                                                            "top": "-2.5px"
                                                        }} src={inquiry?.country?.flag} title={inquiry?.country?.name}/>
                                                        {inquiry?.product_name}
                                                        <span className="chat_date">CreatedAT</span>
                                                    </h5>
                                                    <p className="ellipsis">Enquiry
                                                        for: {inquiry?.quantity} {inquiry?.product_name}
                                                        <span className="badge badge-danger">
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )

                            }) :

                            <div className="no-data d-block" role="alert" id="no_data_1">
                                <div className="t-box">
                                    <img src={images.not_found.default.src}/>
                                    <h3 className="fw-bold">No enquiries</h3>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </>
        )
    }
}


export default SellerInquiry;



