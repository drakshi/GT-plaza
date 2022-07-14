import React from "react";
import AuthSidebar from "../../src/components/common/afterAuth/auth_sidebar";
import ChatProviderInfo from "../../src/components/auth/chat/chat-provider-info";
import SellerInquiry from "../../src/components/auth/chat/seller-inquiry";
import {limitToLast, onChildAdded, query, ref,} from "@firebase/database";
import API from "../../src/api/api.service";
import db from "../../src/service/Firebase";
import {connect} from "react-redux";
import LoadingBar from "react-top-loading-bar";
import SeoMeta from "../../src/components/common/meta/seo_meta";
const api = new API();

class ChatBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            progress:0,
            chat_id: null,
            message: null,
            profile: null,
            email: null,
            inquiry_id: null,
            active: "received",
            messages: []
        };
        this.threadHandler = this.threadHandler.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }

    scrollToBottom = () => {
        const element = document.getElementById("msg_history");
        element.scrollTop = element.scrollHeight;
    };

    componentDidMount() {
        if (this.state.profile === null) {
            this.setState({profile: this.props?.getUserInfo?.logged_user_info?.data})
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.state.chat_id){
            this.scrollToBottom();
        }

        if (prevProps.getUserInfo !== this.props.getUserInfo) {
            this.setState({profile: this.props?.getUserInfo?.logged_user_info?.data})
        }
    }

    handleMessage() {
        if (this.state.message === null || this.state.message === "") {
            return false;
        }
        api.sendMessage({chat_id: this.state.chat_id, message: this.state.message},
            this.setState({progress:30}),

            setTimeout(() => {
                this.setState({ progress: 90 });
            }, 1000)
        ).then((success) => {
            this.setState({message: "",progress:100}, () => {
                this.firebaseLastSnap(this.state.chat_id);
            });
        });
    }

    createChatThread(inquiry_id, email) {
        if (email && inquiry_id) {
            api.createChatThread({email: email, inquiry_id: inquiry_id},
                this.setState({progress: 30}),

                setTimeout(() => {
                    this.setState({progress: 90});
                }, 1000)
            ).then((success) => {
                this.setState({
                    progress: 100,
                    chat_id: success.data.response?.chat_id
                }, () => {
                    this.getThreadMessages(success.data.response?.chat_id)
                })
            });
        }
    }

    threadHandler(value) {

        if (this.state.active === "sent" && value.type === 2) {
            if (value.email !== null && value.email !== "" && value.inquiry_id !== null &&  value.inquiry_id !== "" &&
                this.state.inquiry_id !== value.inquiry_id) {
                this.setState({inquiry_id: value.inquiry_id, email: value.email ,messages : []}, () => {
                    this.createChatThread(value.inquiry_id, value.email)
                })
            }
        }

        if (this.state.active === "received" && value.type === 1) {
            if (value.email !== null && value.email !== "" && value.inquiry_id !== null &&  value.inquiry_id !== "" &&
                this.state.inquiry_id !== value.inquiry_id) {
                this.setState({inquiry_id: value.inquiry_id, email: value.email , messages : []}, () => {
                    this.createChatThread(value.inquiry_id, value.email)
                })
            }
        }
    }

    getThreadMessages(thread_id) {
        api.getThreadMessages(thread_id,
            this.setState({progress:30}),

            setTimeout(() => {
                this.setState({ progress: 90 });
            }, 1000)
        ).then((success) => {
            this.setState({
                progress:100,
                messages: success.data.response
            })
        });
    }

    firebaseLastSnap(threadId) {
        const newMessageRef = query(ref(db, `chat_line/${threadId}`),
            limitToLast(1)
        );
        onChildAdded(newMessageRef, (snapshot) => {
            const data = snapshot.val();
            this.setState({
                messages: [...this.state.messages, data]
            })
        });
    }

    render() {

        return (
            <>
                <SeoMeta title={"Inquiries - Global Trade Plaza"}
                         description={"Best B2B Marketplace Platform and Top 10 b2b Portal in India is Global Trade Plaza. We are Business to Business Import Export Portal helping companies, Traders and Manufacturers to find Buyers"}
                />
                <LoadingBar progress={this.state.progress} color="blue" />
                <section className="dashboard">
                    <div className="container-fluid main-content">
                        <div className="row">
                            <AuthSidebar active={"chat-board"}/>
                            <div className="col-md-9 col-12 right chartBoard p-gt">
                                <div className="heading main mt-1">
                                    <h3>Enquiries</h3>
                                </div>
                                <div className="col-12 chat-board">
                                    <div className="messaging">
                                        <div className="inbox_msg">
                                            <div className="inbox_people t-box">
                                                <h5 className="">My Enquiries</h5>
                                                <ul className="nav nav-tabs">
                                                    <li className="nav-item">
                                                        <a onClick={() => {
                                                            this.setState({active: "received" , chat_id : null})
                                                        }}
                                                           className={this.state.active === "received" ? "nav-link active" : "nav-link"}>Received</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a onClick={() => {
                                                            this.setState({active: "sent", chat_id : null})
                                                        }}
                                                           className={this.state.active === "sent" ? "nav-link active" : "nav-link"}>Sent</a>
                                                    </li>
                                                </ul>
                                                <div className="tab-content">
                                                    <SellerInquiry threadHandler={this.threadHandler} type={this.state.active === "received" ? 1 : 2}/>
                                                </div>
                                            </div>


                                           { this.state.chat_id &&
                                            <div id="chat-tab-open" className="mesgs t-box">
                                                <div className="message_notify">

                                                    {/*Chat provider info*/}
                                                    <ChatProviderInfo inquiry_id={this.state?.inquiry_id}/>

                                                    {/*Chat inquiry messages*/}
                                                    <div className="msg_history" id="msg_history">

                                                        {this.state.messages.length ? this.state.messages.map((message, index) => {
                                                            return (
                                                                <>
                                                                    {message?.company_profile?.seller_id === this.state.profile.id ?
                                                                        <div className="outgoing_msg" key={index}>
                                                                            <div className="sent_msg">
                                                                                <p>{message.message}
                                                                                    <span
                                                                                        className="time_date">{message.send_timestamp}</span>
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                        :
                                                                        <div className="incoming_msg" key={index}>
                                                                            <div className="received_msg">
                                                                                <div className="received_withd_msg">
                                                                                    <p>{message.message}
                                                                                        <span
                                                                                            className="time_date">{message.send_timestamp}</span>
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                </>
                                                            )
                                                        }) : ""}

                                                    </div>

                                                    {/*Send message*/}
                                                    <div className="type_msg">
                                                        <div
                                                            className={this.state.chat_id ? "input_msg_write" : "input_msg_write disable-div"}>
                                                            <input type="text"
                                                                   value={this.state.message}
                                                                   onChange={(e) => {
                                                                       this.setState({message: e.target.value})
                                                                   }}
                                                                   onKeyUp={
                                                                       (event) => {
                                                                           if (event.keyCode === 13) {
                                                                               this.handleMessage();
                                                                           }
                                                                       }
                                                                   }
                                                                   placeholder="Type a message"/>
                                                            <button className="btn msg_send_btn" type="button"
                                                                    onClick={() => {
                                                                        this.handleMessage()
                                                                    }}>Send
                                                            </button>
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
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    getUserInfo: state.UserReducer,
});

export default connect(mapStateToProps, null)(ChatBoard);



