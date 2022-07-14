import React from "react";
import AuthSidebar from "../../src/components/common/afterAuth/auth_sidebar";
import {NotificationManager} from "react-notifications";
import API from "../../src/api/api.service";
import LoadingBar from "react-top-loading-bar";
import SeoMeta from "../../src/components/common/meta/seo_meta";
const api = new API();

class Testimonial extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            progress:0,
            data: {
                message: null
            },
            errors: [],
        }, this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {

        this.setState({
            errors: [],
        });

        event.preventDefault();
        let errors = {};

        if (this.state.data.message === null || this.state.data.message === "") {
            errors["message"] = "Please enter your message here";
            this.setState({errors: errors});
            return false;
        }

        api.submitAuthTestimonial(
            {message: this.state.data.message},
            this.setState({progress:30}),

            setTimeout(() => {
                this.setState({ progress: 90 });
            }, 1000)

        )
            .then((success) => {
                this.setState({
                    progress:100,
                    data: {message: ""}
                });
                NotificationManager.success(success.data.message);
            })
            .catch((error) => {
                this.setState({progress:0})
                console.log(error)
            });
    }

    render() {
        return (
            <>
                <SeoMeta title={"Testimonial - Global Trade Plaza"}
                         description={"Best B2B Marketplace Platform and Top 10 b2b Portal in India is Global Trade Plaza. We are Business to Business Import Export Portal helping companies, Traders and Manufacturers to find Buyers"}
                />
                <LoadingBar color="blue" progress={this.state.progress} />
                <section className="dashboard">
                    <div className="container-fluid main-content">
                        <div className="row">
                            <AuthSidebar active={"testimonial"}/>
                            <div className="col-md-9 col-12 right p-gt">
                                <div className="heading main mt-2">
                                    <h3>Testimonial</h3>
                                </div>
                                <div className="tabbable-panel">
                                    <div className="tabbable-line">
                                        <div className="tab-content account_settings pt-0">
                                            <div className="tab-pane active" id="personal">
                                                <div className="col-12 t-box">
                                                    <div className="heading">
                                                        <h3>Your testimonial is important for us</h3>
                                                    </div>
                                                    <div className="col-12 form-user">
                                                        <form id="testimonialForm" method="post">
                                                            <div className="row box">
                                                                <div className="col-4 label">
                                                                    <p>Your testimonial</p>
                                                                </div>
                                                                <div className="col-8 form-group">
                                                                <textarea name="message"
                                                                          value={this.state.data.message}
                                                                          className={
                                                                              "form-control valid-control " +
                                                                              (this.state.errors.message ? " is-invalid" : "")
                                                                          }
                                                                          onChange={(e) => {
                                                                              this.setState({
                                                                                  data: {message: e.target.value},
                                                                                  errors: []
                                                                              })
                                                                          }}
                                                                          placeholder="Enter here ..">
                                                                    </textarea>
                                                                    <small className="error-text mt-1">
                                                                        {this.state.errors.message}
                                                                    </small>
                                                                </div>
                                                            </div>
                                                            <div className="button-div">
                                                                <button type="submit" className="btn" onClick={(e) => {
                                                                    this.handleSubmit(e)
                                                                }}>Submit
                                                                </button>
                                                            </div>
                                                        </form>
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
            </>
        )
    }
}
export default Testimonial;



