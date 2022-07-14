import React from 'react';
import API from "../src/api/api.service";
import {CapitalizeFirstLetter, validateEmail} from "../src/helper";
import {staticData} from "../static";
import {NotificationManager} from "react-notifications";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import {images} from "../constant";
import LoadingBar from "react-top-loading-bar";
import Link from "next/link";
import SeoMeta from "../src/components/common/meta/seo_meta";
const api = new API();

class Career extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progress:0,
            data: {
                first_name: null,
                last_name: null,
                email: null,
                country: 103,
                phone_number: null,
                address: null,
                designation: null,
                file: null,
                comment: null,
            },
            term_condition: false,
            errorAlert: false,
            uploadedFile: false,
            selectedFile: null,
            errors: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.firstNameRef = React.createRef();
        this.lastNameRef = React.createRef();
        this.emailRef = React.createRef();
        this.countryRef = React.createRef();
        this.phoneRef = React.createRef();
        this.addressRef = React.createRef();
        this.designationRef = React.createRef();
        this.fileRef = React.createRef();
        this.commentRef = React.createRef();
        this.termRef = React.createRef();
        this.alertBox = React.createRef();
    }

    onChangeImage = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        // const reader = new FileReader();
        this.setState({
            data: {...this.state.data, file: files[0] },
            selectedFile: files[0].name,
            uploadedFile: true
        })
    };


    handleChange(event) {

        let inputData = this.state.data;
        inputData[event.target.name] = event.target.value;

        if (event.target.name === "term_condition"){
            this.setState({
                term_condition: event.target.type === "checkbox"
                    ? event.target.checked
                    : event.target.value
            })
        }
        if (event.target.name === "country") {
            var index1 = event.target.selectedIndex;
            var optionElement1 = event.target.childNodes[index1];
            var option1 = optionElement1.getAttribute('data-iso');
            if (option1) {
                this.setState({country_iso: option1})
            }
        }
        this.setState({data: inputData});
        delete this.state.errors[event.target.name];
    }


    handleSubmit(event) {
        this.setState({
            errorAlert: null,
            errors: [],
        });

        event.preventDefault();

        let errors = {};

        if (this.state.data.first_name === null || this.state.data.first_name === "") {
            errors["first_name"] = "Enter First Name";
            this.firstNameRef.current.scrollIntoView({
                behavior: "smooth",
                 block: "center",
            });
            this.setState({errors: errors});
        }
        if (this.state.data.last_name === null || this.state.data.last_name === "") {
            errors["last_name"] = "Enter Last Name";
            this.lastNameRef.current.scrollIntoView({
                behavior: "smooth",
                 block: "center",
            });
            this.setState({errors: errors});
        }
        if (this.state.data.email === null ||
            !validateEmail(this.state.data.email) || this.state.data.email === ""
        ) {
            errors["email"] = "Enter valid Email Address";
            this.emailRef.current.scrollIntoView({
                behavior: "smooth",
                 block: "center",
            });
            this.setState({errors: errors});
        }
        if (this.state.data.country === null || this.state.data.country === "") {
            errors["country"] = "Please select country";
            this.countryRef.current.scrollIntoView({
                 behavior: "smooth",
                  block: "center",
             });
            this.setState({errors: errors});
        }
        if (this.state.data.phone_number === null || this.state.data.phone_number === "") {
            errors["phone_number"] = "Enter Phone Number";
            this.phoneRef.current.scrollIntoView({
                behavior: "smooth",
                 block: "center",
            });
            this.setState({errors: errors});
        }
        if (this.state.data.address === null || this.state.data.address === "") {
            errors["address"] = "Enter House no. / street / city ";
            this.addressRef.current.scrollIntoView({
                behavior: "smooth",
                 block: "center",
            });
            this.setState({errors: errors});
        }
        if (this.state.data.designation === null) {
            errors["designation"] = "Please select designation";
            this.countryRef.current.scrollIntoView({
                 behavior: "smooth",
                  block: "center",
             });
            this.setState({errors: errors});
        }
        if (this.state.data.file === null || this.state.data.file === "") {
            errors["file"] = "Upload your resume";
            this.fileRef.current.scrollIntoView({
                behavior: "smooth",
                 block: "center",
            });
            this.setState({errors: errors});
        }
        if (this.state.data.comment === null || this.state.data.comment === "") {
            errors["comment"] = "Describe yourself";
            this.commentRef.current.scrollIntoView({
                behavior: "smooth",
                 block: "center",
            });
            this.setState({errors: errors});
        }

        if (Object.entries(errors).length > 0){
            return false ;
        }

        if (this.state.term_condition === false) {
            this.setState({errorAlert: "Accept Terms and condition"}, () => {
                this.alertBox.current.scrollIntoView({
                    behavior: "smooth",
                     block: "center",
                });
            });
            return false ;
        }

        const formData = new FormData();
        formData.append("first_name"  ,this.state.data.first_name);
        formData.append("last_name"  ,this.state.data.last_name);
        formData.append("email"  ,this.state.data.email);
        formData.append("country"  ,this.state.data.country);
        formData.append("phone_number"  ,this.state.data.phone_number);
        formData.append("address"  ,this.state.data.address);
        formData.append("designation"  ,this.state.data.designation);
        formData.append("file"  ,this.state.data.file);
        formData.append("comment"  ,this.state.data.comment);

        api.submitApplication(
            formData,
            this.setState({
                progress:30
            }),
            setTimeout(() => {
                this.setState({ progress: 90 });
            }, 1000)
        )
            .then((success) => {
                NotificationManager.success(success.data.message);
                this.setState({
                    progress:100,
                    data: {
                        first_name: "",
                        last_name: "",
                        email: "",
                        country: 103,
                        phone_number: "",
                        address: "",
                        designation: "",
                        file: "",
                        comment: "",
                    },
                    uploadedFile: false,
                    selectedFile: null,
                    term_condition: false,
                    errorAlert: ""
                })
            })
            .catch((error) => {
                this.setState({
                    errorAlert: error.response.data.message,
                    progress:0
                });
            });
    }

    static async getInitialProps(ctx) {
        var jobs = [];
        await api.getAllJobs(ctx.query.id).then(async (success) => {
            jobs = success.data.response;
        });
        return {
            jobs: jobs
        }
    }

    componentDidMount() {
        this.setState({progress:30},()=>{
            setTimeout(() => {
                this.setState({ progress: 90 });
                if(this.props.jobs?.length > 0){
                    this.setState({progress:100})
                }
                else{
                    this.setState({progress:0});
                }
            }, 1000)
        })
    }
    render() {

        const jobs = this.props.jobs;

        return (<>
            <SeoMeta title={"Career - Global Trade Plaza"}
                     description={"Best B2B Marketplace Platform and Top 10 b2b Portal in India is Global Trade Plaza. We are Business to Business Import Export Portal helping companies, Traders and Manufacturers to find Buyers"}
            />
            <LoadingBar progress={this.state.progress} color="blue"/>
            <section className="static">
                <div className="col-12 banner">
                    <img src={images.career.default.src} alt=""/>
                    <div className="text">
                        <h3>Jobs and career</h3>
                        <h1>Make Career With Us - Global Trade Plaza</h1>
                    </div>
                </div>
                <div className="container career mt-4">
                    <div className="col-12 t-box card">
                        <div className="head pb-1">
                            <h4>Latest jobs</h4>
                        </div>
                        <div className="col-12 vacancy">
                            <div className="row">
                                <ul>
                                    {jobs.length ? jobs.map((job) => {
                                        return (
                                            <>
                                                <li>
                                                    <h5 className="fw-bolder"><i className="fa fa-square-full"></i> {job.position_title}</h5>
                                                    <h6>
                                                        <div dangerouslySetInnerHTML={{__html: job.description}}></div>
                                                    </h6>
                                                    <button className="btn btn_scroll_to_div applied"
                                                            data-id={job.id} onClick={() =>
                                                        this.setState({
                                                            data: {
                                                                ...this.state.data,
                                                                designation : job?.position_title
                                                            }
                                                        },()=>{
                                                            this.firstNameRef.current.scrollIntoView({
                                                                behavior: "smooth",
                                                                block: "center",
                                                            })
                                                        })}
                                                        > Apply now
                                                    </button>
                                                </li>
                                            </>
                                        )
                                    }) : ""}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 form" id="career_form_wrapper">
                        <div className="row justify-content-center">
                            <div className="col-md-9 col-12 t-box card px-4">
                                <div className="heading half">
                                    <h4>Job Application</h4>
                                </div>
                                {this.state.errorAlert ? (
                                    <div
                                        ref={this.alertBox}
                                        role="alert"
                                        className="sc-1wz9i2x-0 fooVeK mb-2"
                                    >
                                        <svg
                                            width="1792"
                                            height="1792"
                                            viewBox="0 0 1792 1792"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                            className="sc-1t1e23j-0 bbiirI"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M1024 1375v-190q0-14-9.5-23.5T992 1152H800q-13 0-22.5 9.5T768 1185v190q0 14 9.5 23.5t22.5 9.5h192q13 0 22.5-9.5t9.5-23.5zm-2-374l18-459q0-12-10-19-13-11-24-11H786q-11 0-24 11-10 7-10 21l17 457q0 10 10 16.5t24 6.5h185q14 0 23.5-6.5t10.5-16.5zm-14-934l768 1408q35 63-2 126-17 29-46.5 46t-63.5 17H128q-34 0-63.5-17T18 1601q-37-63-2-126L784 67q17-31 47-49t65-18 65 18 47 49z"
                                            ></path>
                                        </svg>
                                        <span>{this.state.errorAlert}</span>
                                    </div>
                                ) : null}
                                <form id="career_inquiry">
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-md-6 col-12 form-group">
                                                <input name="first_name" type="test" ref={this.firstNameRef}
                                                       value={this.state.data.first_name}
                                                       onChange={(e) => {
                                                           this.handleChange(e)
                                                       }}
                                                       className={
                                                           "form-control valid-control " +
                                                           (this.state.errors.first_name ? " is-invalid" : "")
                                                       }
                                                       placeholder="First name"/>
                                                {/*<small className="error-text mt-1">*/}
                                                {/*    {this.state.errors.first_name}*/}
                                                {/*</small>*/}
                                            </div>
                                            <div className="col-md-6 col-12 form-group">
                                                <input name="last_name" type="test" ref={this.lastNameRef}
                                                       value={this.state.data.last_name}
                                                       className={
                                                           "form-control valid-control " +
                                                           (this.state.errors.last_name ? " is-invalid" : "")
                                                       }
                                                       onChange={(e) => {
                                                           this.handleChange(e)
                                                       }}
                                                       placeholder="Last name"/>
                                                {/*<small className="error-text mt-1">*/}
                                                {/*    {this.state.errors.last_name}*/}
                                                {/*</small>*/}
                                            </div>
                                            <div className="col-md-6 col-12 form-group">
                                                <input name="email" type="email" ref={this.emailRef}
                                                       value={this.state.data.email}
                                                       className={
                                                           "form-control valid-control " +
                                                           (this.state.errors.email ? " is-invalid" : "")
                                                       }
                                                       onChange={(e) => {
                                                           this.handleChange(e)
                                                       }}
                                                       placeholder="Email address"/>
                                                    {/*<small className="error-text mt-1">*/}
                                                    {/*    {this.state.errors.email}*/}
                                                    {/*</small>*/}
                                            </div>
                                            <input type="hidden" className="form-control" id="country_iso"/>
                                            <div className="col-md-6 col-12 form-group">
                                                <select ref={this.countryRef}
                                                        value={this.state.data.country}
                                                        className={
                                                            "form-control valid-control " +
                                                            (this.state.errors.country ? " is-invalid" : "")
                                                        }
                                                        name="country" onChange={(e) => {
                                                    this.handleChange(e)
                                                }}>
                                                    <option disabled selected>Select</option>
                                                    {
                                                        staticData.countries.map((country, index) => {
                                                            return (
                                                                <>
                                                                    <option key={index} data-iso={country.iso3_code}
                                                                            value={country.id}>{CapitalizeFirstLetter(country.name)}
                                                                    </option>
                                                                </>
                                                            )
                                                        })} </select>
                                            </div>
                                            <div className="col-md-6 col-12 form-group" ref={this.phoneRef}>
                                                <PhoneInput
                                                    inputProps={{
                                                        name: 'phone_number',
                                                        required: true,
                                                    }}
                                                    inputClass={
                                                        (this.state.errors.phone_number ? " is-invalid" : "")
                                                    }
                                                    disableCountryCode={false}
                                                    disableCountryGuess={true}
                                                    countryCodeEditable={false}
                                                    country={this.state.country_iso ? this.state.country_iso.slice(0, -1)?.toLowerCase() : this.props.ipCountry ? this.props.ipCountry?.country_code?.toLowerCase() : "in"}
                                                    value={this.state.data.phone_number}
                                                    onChange={phone_number => this.setState({
                                                        data: {
                                                            ...this.state.data,
                                                            phone_number: phone_number
                                                        }
                                                    },()=>{
                                                        delete this.state.errors["phone_number"];
                                                    })}
                                                />
                                                {/*<small className="error-text mt-1">*/}
                                                {/*    {this.state.errors.phone_number}*/}
                                                {/*</small>*/}
                                            </div>
                                            <div className="col-md-6 col-12 form-group">
                                                <input name="address" type="test"
                                                       ref={this.addressRef}
                                                       value={this.state.data.address}
                                                       onChange={(e) => {
                                                           this.handleChange(e)
                                                       }}
                                                       className={
                                                           "form-control valid-control " +
                                                           (this.state.errors.address ? " is-invalid" : "")
                                                       }
                                                       placeholder="House no. / street / city*"/>
                                                {/*<small className="error-text mt-1">*/}
                                                {/*    {this.state.errors.address}*/}
                                                {/*</small>*/}
                                            </div>
                                            <div className="col-md-6 col-12 form-group">
                                                <select ref={this.designationRef}
                                                        value={this.state.data.designation}
                                                        className={
                                                            "form-control valid-control " +
                                                            (this.state.errors.designation ? " is-invalid" : "")
                                                        }
                                                        name="designation" onChange={(e) => {
                                                    this.handleChange(e)
                                                }}>
                                                    <option disabled selected>Select</option>
                                                    {jobs.length ? jobs.map((job, index) => {
                                                        return (
                                                            <option key={index}
                                                                    value={job?.position_title}>{job?.position_title}</option>
                                                        )
                                                    }) : " "}
                                                </select>
                                            </div>


                                            {this.state.uploadedFile === true ?
                                                <>
                                                    <div className="col-md-6 col-12 form-group">
                                                        <div className="input-group-append">
                                                            <p className="image_name">{this.state.selectedFile}</p>
                                                            <div className="col-xl-12"><a href="javascript:void(0)"
                                                                                          onClick={(e) => {
                                                                                              this.setState({uploadedFile: false})
                                                                                          }}
                                                                                          className="delete">remove</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                                : <>
                                                    <div id="file_show" className="col-md-6 col-12 form-group append">
                                                        <input placeholder="Upload your resume"
                                                               ref={this.fileRef}
                                                               disabled={true}
                                                               className={
                                                                   "form-control valid-control " +
                                                                   (this.state.errors.file ? " is-invalid" : "")
                                                               }
                                                        />
                                                        <small className="error-text mt-1">
                                                            {this.state.errors.file}
                                                        </small>
                                                        <div className="input-group-append">
                                                            <button className="btn">Upload CV</button>
                                                            <input style={{width: "100%"}} className="file-select"
                                                                   type="file" id="file" name="file"
                                                                   onChange={(e) => this.onChangeImage(e)}/>
                                                        </div>
                                                    </div>

                                                </>}

                                            <div className="col-12 form-group">
                                                <textarea name="comment"
                                                          className={
                                                              "form-control valid-control " +
                                                              (this.state.errors.comment ? " is-invalid" : "")
                                                          }
                                                          placeholder="Describe yourself*"
                                                          value={this.state.data.comment}
                                                          ref={this.commentRef}
                                                          onChange={(e) => {
                                                              this.handleChange(e)
                                                          }}
                                                >
                                                </textarea>
                                                {/*<small className="error-text mt-1">*/}
                                                {/*    {this.state.errors.comment}*/}
                                                {/*</small>*/}

                                            </div>
                                            <div className="col-12 form-group mb-2 w-100 checkbox">
                                                <div className="style-checkbox">
                                                    <div className="col-12 item">
                                                        <input ref={this.termRef} type="checkbox"
                                                               value={this.state.term_condition}
                                                               name="term_condition"
                                                               id="agree_terms" aria-describedby="emailHelp" onChange={(e) => {
                                                            this.handleChange(e)
                                                        }}/>
                                                        <label htmlFor='agree_terms' className="mt-0">
                                                            <span></span>
                                                            I agree with&nbsp;
                                                            <Link href={"/terms"}>
                                                                <a className="link" target="_blank" rel="noreferrer">terms and conditions</a>
                                                            </Link>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 form-group text-center">
                                                <button type="submit" className="btn career_submit" onClick={(e) => {
                                                    this.handleSubmit(e)
                                                }}> Submit your
                                                    application
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>)
    }
}

export default Career;
