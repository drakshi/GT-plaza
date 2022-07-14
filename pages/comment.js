import React from 'react';
import {validateEmail} from "../src/helper";
import {NotificationManager} from "react-notifications";
import API from "../src/api/api.service";
import {images} from "../constant";
import LoadingBar from "react-top-loading-bar";

const api = new API();

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progress:0,
            data: {
                full_name: null,
                email: null,
                comment: null,
            },
            errors: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fullNameRef = React.createRef();
        this.emailRef = React.createRef();
        this.commentRef = React.createRef();
    }

    handleChange(event) {
        //console.log(event.target.value);
        let inputData = this.state.data;
        inputData[event.target.name] = event.target.value;
        this.setState({data: inputData});
    }

    handleSubmit(event) {
        this.setState({
            errorAlert: null,
            errors: [],
        });
        event.preventDefault();

        let errors = {};
        if (this.state.data.full_name === null || this.state.data.full_name === "") {
            errors["full_name"] = "Enter full name";
            /*this.fullNameRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });*/
            this.setState({errors: errors});
            return false;
        }
        if (this.state.data.email === null || !validateEmail(this.state.data.email) || this.state.data.email === "") {
            errors["email"] = "Enter valid email address";
            /*this.emailRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });*/
            this.setState({errors: errors});
            return false;
        }
        if (this.state.data.comment === null || this.state.data.comment === "") {
            errors["comment"] = "Enter comment";
            /*this.commentRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });*/
            this.setState({errors: errors});
            return false;
        }


        api.postComment(
            this.state.data,
            this.setState({progress:30}),

            setTimeout(() => {
                this.setState({ progress: 90 });
            }, 1000)
        )
            .then((success) => {
                NotificationManager.success(success.data.message);
                this.setState({
                    progress:100,
                    data: {
                        full_name: "",
                        email: "",
                        comment: ""
                    }
                })
            })
            .catch((error) => {
                this.setState({
                    errorAlert: error.response.data.message,
                    progress:0
                });
            });

    }

    render() {
        const comments = this.props.comment ? this.props.comment : [];
        return <>
                <LoadingBar progress={this.state.progress}/>
            <div className="container blog-list">
                <div className="col-12 single">
                    <div className="row">
                        <div className="col-md-12 pl-0 col-12 comment">
                            <div className="t-box col-12">
                                <div className="heading">
                                    <h4>Leave a comment</h4>
                                </div>
                                <form id="commentForm">
                                    <div className="row">
                                        <div className="col-md-6 col-12 form-group">
                                            <input type="test"
                                                   placeholder="Full name"
                                                   value={this.state.data.full_name}
                                                   onChange={(e) => {
                                                       this.handleChange(e)
                                                   }}
                                                   name="full_name"
                                                   className={
                                                       "form-control valid-control " +
                                                       (this.state.errors?.full_name ? " is-invalid" : "")
                                                   }/>
                                            <small className="error-text mt-1">
                                                {this.state.errors?.full_name}
                                            </small>
                                        </div>
                                        <div className="col-md-6 col-12 form-group">
                                            <input type="email"
                                                   name="email"
                                                   ref={this.emailRef}
                                                   value={this.state.data.email}
                                                   className={
                                                       "form-control valid-control " +
                                                       (this.state.errors.email ? " is-invalid" : "")
                                                   }
                                                   onChange={(e) => {
                                                       this.handleChange(e)
                                                   }}
                                                   placeholder="Email address"/>
                                            <small className="error-text mt-1">
                                                {this.state.errors.email}
                                            </small>
                                        </div>
                                        <div className="col-12 form-group">
                                <textarea
                                    className={
                                        "form-control valid-control " +
                                        (this.state.errors.comment ? " is-invalid" : "")
                                    }
                                    value={this.state.comment}
                                    name="comment"
                                    placeholder="Your comment"
                                    onChange={(e) => {
                                        this.handleChange(e)
                                    }}>
                                </textarea>
                                            <small className="error-text mt-1">
                                                {this.state.errors.comment}
                                            </small>
                                        </div>
                                        <div className="col-12 form-group text-center">
                                            <button type="submit" className="btn" onClick={(e) => {
                                                this.handleSubmit(e)
                                            }}>Post your comment
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-12 comments-box">
                            <div className="col-12 t-box">
                                <div className="head">
                                    <h4>Previous Comments</h4>
                                    <span> comments </span><span
                                    className="comment_counts">{" " + comments.length + " "} </span>
                                </div>
                                {comments.length > 0 && comments.map((comment, index) => {
                                    return (
                                        <>
                                            <div key={index} className="col-12 user-comment">
                                                <div className="col-12 message">
                                                    <img src={images.profile.default.src}/>
                                                    <h5>{comment.full_name}<span>{comment.created_at}</span></h5>
                                                    <p>{comment.comment}</p>
                                                </div>
                                            </div>
                                        </>)
                                })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    }
}

export default Comment;
