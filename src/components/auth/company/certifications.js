import React from "react";
import axios from "axios";
import {NotificationManager} from "react-notifications";
import API from "../../../api/api.service";
import {instanceOf} from "prop-types";
import {Cookies, withCookies} from "react-cookie";
import {staticData} from "../../../../static";
import DatePicker from "react-datepicker";
import moment from "moment";
import {CapitalizeFirstLetter} from "../../../helper";
import PhoneInput from "react-phone-input-2";
import LoadingBar from "react-top-loading-bar";
const api = new API();

class Certifications extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            progress:0,
            document_data: {
                document: null,
                mime: null,
                company_id: this.props.cookies.get('company_id'),
                type: null
            },
            certificate_data: {
                certificate: null,
                mime: null,
                company_id: this.props.cookies.get('company_id'),
                name: null
            },
            registration: {
                country_id: null,
                registration_date: null,
                registration_number: null,
                landline_number: null,
                mobile_number: null,
                fax_number: null
            },
            company_id: this.props.cookies.get('company_id'),
            certificates: [],
            documents: [],
            errors: [],
            errorAlert: null
        },

            this.onChangeDocument = this.onChangeDocument.bind(this);
        this.onChangeCertificate = this.onChangeCertificate.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.locationRef = React.createRef();
        this.registrationNumberRef = React.createRef();
        this.registrationDateRef = React.createRef();
        this.registrationPhoneRef = React.createRef();
        this.registrationMobileRef = React.createRef();
        this.registrationFaxRef = React.createRef();
    }

    componentDidMount() {
        this.getCertificates();
        this.getDocuments();
        this.getRegistrationInfo();
    }


    handleChange(event) {
        let inputData = this.state.registration;
        inputData[event.target.name] = event.target.value;
        this.setState({registration: inputData});
    }

    handleSubmit(event) {

        this.setState({
            errorAlert: null,
            errors: [],
        });

        event.preventDefault();

        let errors = {};

        if (this.state.registration.country_id === null || this.state.registration.country_id === "") {
            errors["country_id"] = "please select location";
            this.locationRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
            return false;
        }
        if (this.state.registration.registration_date === null || this.state.registration.registration_date === "") {
            errors["registration_date"] = "please select registration date";
            this.registrationDateRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
            return false;
        }
        if (this.state.registration.registration_number === null || this.state.registration.registration_number === "") {
            errors["registration_number"] = "please enter registration number";
            this.registrationNumberRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
            return false;
        }
        if (this.state.registration.landline_number === null || this.state.registration.landline_number === "") {
            errors["landline_number"] = "please enter registration phone";
            this.registrationPhoneRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
            return false;
        }
        if (this.state.registration.mobile_number === null || this.state.registration.mobile_number === "") {
            errors["mobile_number"] = "please enter registration mobile";
            this.registrationMobileRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
            return false;
        }
        // if (this.state.registration.fax_number === null || this.state.registration.fax_number === "") {
        //     errors["fax_number"] = "please enter registration fax";
        //     this.registrationFaxRef.current.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //     });
        //     this.setState({errors: errors});
        //     return false;
        // }

        api.updateCompanyRegistration(
            this.state.company_id, this.state.registration,
            this.setState({progress:30}),

            setTimeout(() => {
                this.setState({ progress: 90 });
            }, 1000)

        )
            .then((success) => {
                this.setState({
                    progress:100,
                    registration: {
                        country_id: null,
                        registration_date: null,
                        registration_number: null,
                        landline_number: null,
                        mobile_number: null,
                        fax_number: null
                    },
                });
                NotificationManager.success(success.data.message);
                this.getRegistrationInfo()
            })
            .catch((error) => {
                this.setState({
                    progress:0
                },()=>{
                    NotificationManager.error(error.response.data.message);
                })
            });
    }


    handleRemove(id, type) {
        if (type === 1) {
            api.removeCertificate(id,
                this.setState({progress:30}),

                setTimeout(() => {
                    this.setState({ progress: 90 });
                }, 1000)
            )
                .then((success) => {
                        this.setState({progress:100})
                        NotificationManager.success(success.data.message);
                        this.getCertificates();
                    }
                )
                .catch((error) => {
                    this.setState({progress:0})
                    console.log(error.response.data.message);
                });
        }
        if (type === 2) {
            api.removeDocument(id,
                this.setState({progress:30}),

                setTimeout(() => {
                    this.setState({ progress: 90 });
                }, 1000)
            )
                .then((success) => {
                        this.setState({
                            progress:100
                        })
                        NotificationManager.success(success.data.message);
                        this.getDocuments();
                    }
                )
                .catch((error) => {
                    this.setState({progress:0})
                    console.log(error.response.data.message);
                });
        }
    }


    getCertificates() {
        api.getCompanyCertificates(
            this.setState({progress:30}),

            setTimeout(() => {
                this.setState({ progress: 90 });
            }, 1000)
        )
            .then((success) => {
                    this.setState({
                        progress:100,
                        certificates: success.data.response?.company_profile?.certificates
                    })
                }
            )
            .catch((error) => {
                this.setState({
                    progress:0
                })
                console.log(error.response.data.message);
            });
    }


    getDocuments() {
        api.getCompanyDocuments(
            this.setState({progress:30}),

            setTimeout(() => {
                this.setState({ progress: 90 });
            }, 1000)
        )
            .then((success) => {
                    this.setState({
                        progress:100,
                        documents: success.data.response?.company_profile?.documents
                    })
                }
            )
            .catch((error) => {
                this.setState({progress:0})
                console.log(error.response.data.message);
            });
    }

    getRegistrationInfo() {
        api.authCompanyProfile(
            this.setState({progress:30}),

            setTimeout(() => {
                this.setState({ progress: 90 });
            }, 1000)
        )
            .then((success) => {
                    this.setState({
                        progress:100,
                        registration: {
                            ...this.state.registration,
                            country_id: success.data.response?.registration?.country_id,
                            registration_date: success.data.response?.registration?.registration_date,
                            registration_number: success.data.response?.registration?.registration_number,
                            landline_number: success.data.response?.registration?.landline_number,
                            mobile_number: success.data.response?.registration?.mobile_number,
                            fax_number: success.data.response?.registration?.fax_number
                        }
                    })
                }
            )
            .catch((error) => {
                this.setState({progress:0})
                console.log(error.response.data.message);
            });
    }

    onChangeDocument = (e, type) => {

        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const form = new FormData();
        form.append('logo', files[0]);
        axios({
            method: 'post',
            url: process.env.NEXT_PUBLIC_BACKEND_URL + 'common/upload-certificate',
            data: form,
            headers: {
                'Content-Type': `multipart/form-data`,
            },

        }).then(res => {

            this.setState({
                document_data: {
                    ...this.state.document_data,
                    document: res.data.response?.[0]?.base_path,
                    mime: res.data.response?.[0].mime,
                    type: type
                }
            });

            api.updateCompanyDocument(
                this.state.document_data,
            )
                .then((success) => {
                        NotificationManager.success(success.data.message);
                        this.getDocuments();
                    }
                )
                .catch((error) => {
                    NotificationManager.error(error.response.data.message);
                });

        }).catch(er => {
            console.log("something goes wrong", er);
        });
    };

    onChangeCertificate = (e) => {

        if (this.state.certificate_data?.name === null) {
            NotificationManager.error("please enter certificate name");
            return false;
        }

        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const form = new FormData();
        form.append('logo', files[0]);
        axios({
            method: 'post',
            url: process.env.NEXT_PUBLIC_BACKEND_URL + 'common/upload-certificate',
            data: form,
            headers: {
                'Content-Type': `multipart/form-data`,
            },
        }).then(res => {

            this.setState({
                certificate_data: {
                    ...this.state.certificate_data,
                    certificate: res.data.response?.[0]?.base_path,
                    mime: res.data.response?.[0].mime,
                }
            });

            api.updateCompanyCertificate(
                this.state.certificate_data,
            )
                .then((success) => {
                        this.setState({
                            certificate_data: {
                                ...this.state.certificate_data,
                                certificate: "",
                                mime: "",
                                name: ""
                            }
                        }, () => {
                            NotificationManager.success(success.data.message);
                            this.getCertificates();
                        });
                    }
                )
                .catch((error) => {
                    NotificationManager.error(error.response.data.message);
                });

        }).catch(er => {
            console.log("something goes wrong", er);
        });
    };

    render() {

        const first = this.state.documents.length ? this.state.documents.find(o => o.type === 1) : "";
        const second = this.state.documents.length ? this.state.documents.find(o => o.type === 2) : "";
        const third = this.state.documents.length ? this.state.documents.find(o => o.type === 3) : "";
        const forth = this.state.documents.length ? this.state.documents.find(o => o.type === 4) : "";
        const five = this.state.documents.length ? this.state.documents.find(o => o.type === 5) : "";

        return (
            <>
                <LoadingBar progress={this.state.progress} color="blue" />
                <div className={this.props.active === "certification" ? "tab-pane active" : "tab-pane"}
                     id="certification">
                    <div className="col-12 t-box  pb-3">
                        <div className="heading">
                            <h3>Certification</h3>
                            <p className="mb-0">Recommended format :- PDF | Recommended size :- Less than 5Mb</p>
                        </div>
                        <div className="col-8 form-user">
                            <form id="certificateForm">
                                <div className="doc-carry">
                                    <div className="row box">
                                        <div className="col-4 label">
                                            <p>Name</p>
                                        </div>
                                        <div className="col-8 form-group">
                                            <input type="text" className="form-control"
                                                   id="name"
                                                   value={this.state.certificate_data?.name}
                                                   onChange={(e) => {
                                                       this.setState({
                                                           certificate_data: {
                                                               ...this.state.certificate_data,
                                                               name: e.target.value
                                                           }
                                                       })
                                                   }}
                                                   aria-describedby="emailHelp"
                                                   placeholder="Enter here .."/>
                                        </div>
                                    </div>
                                    <div className="row box">
                                        <div className="col-4 label">
                                            <p>Upload certificate</p>
                                        </div>
                                        <div className="col-8 form-group append">
                                            <input type="text" className="form-control" placeholder="Enter here .."
                                                   disabled/>
                                            <div className="input-group-append">
                                                <button className="btn">Upload file</button>
                                                <input className="file-select" type="file" id="certificate"
                                                       name="certificate" onChange={(e) => {
                                                    this.onChangeCertificate(e)
                                                }}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-12 form-user pt-3">
                            <div className="document col-12" id="uploadedCertificates">

                                {this.state.certificates.length ? this.state.certificates.map((certificate, index) => {
                                    return (
                                        <>
                                            <div className="file-select col-md-2 square snip0013" key={index}>
                                                <a target="_blank" rel="noreferrer" href={certificate?.certificate}
                                                ><img src={certificate?.certificate}/></a>
                                                <a className="remove remove_certificate d-block" onClick={() => {
                                                    this.handleRemove(certificate?.id, 1)
                                                }}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 320 512">
                                                        <path fill="currentColor"
                                                              d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"></path>
                                                    </svg>
                                                </a>
                                            </div>
                                        </>
                                    )
                                }) : ""}

                            </div>
                        </div>
                    </div>
                    <div className="col-12 t-box">
                        <div className="heading">
                            <h3>Upload documents</h3>
                            <p className="mb-0">Recommended format :- PDF | Recommended size :- Less than 5Mb</p>
                        </div>
                        <div className="col-12 form-user">
                            <form className="document certificate" id="documentForm">
                                <div className="row">
                                    <div className="col-12 file-upload">
                                        <div className="file-select">
                                            <div className="square snip0013">
                                                <div id="icon1" className="icons-area">
                                                    <i className="fa fa-plus"></i>
                                                    <h6>Add document</h6>
                                                </div>
                                                <a href={first?.document} id="log5">
                                                    <img src={first?.document}/>
                                                </a>
                                                <input type="file" id="logo5" name="logo5" onChange={(e) => {
                                                    this.onChangeDocument(e, 1)
                                                }}/>

                                                {first?.document &&
                                                <div>
                                                    <a className="remove log5 document_upload" onClick={() => {
                                                        this.handleRemove(first?.id, 2)
                                                    }}>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 320 512">
                                                            <path fill="currentColor"
                                                                  d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"></path>
                                                        </svg>
                                                    </a>
                                                </div>
                                                }
                                            </div>
                                            <p>Company registration certificate</p>
                                        </div>
                                        <div className="file-select">
                                            <div className="square snip0013">
                                                <div id="icon1" className="icons-area">
                                                    <i className="fa fa-plus"></i>
                                                    <h6>Add document</h6>
                                                </div>
                                                <input type="file" id="logo6" name="logo6" onChange={(e) => {
                                                    this.onChangeDocument(e, 2)
                                                }}/>
                                                <a href={second?.document} id="log6">
                                                    <img src={second?.document}/>
                                                </a>
                                                {second?.document &&
                                                <div>
                                                    <a className="remove log6 document_upload" onClick={() => {
                                                        this.handleRemove(second?.id, 2)
                                                    }}>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 320 512">
                                                            <path fill="currentColor"
                                                                  d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"></path>
                                                        </svg>
                                                    </a>
                                                </div>
                                                }
                                            </div>
                                            <p>Tax certificate</p>
                                        </div>
                                        <div className="file-select">
                                            <div className="square snip0013">
                                                <div id="icon1" className="icons-area">
                                                    <i className="fa fa-plus"></i>
                                                    <h6>Add document</h6>
                                                </div>
                                                <input type="file" id="logo7" name="logo7" onChange={(e) => {
                                                    this.onChangeDocument(e, 3)
                                                }}/>
                                                <a href={third?.document} id="log7">
                                                    <img src={third?.document}/>
                                                </a>
                                                {third?.document &&
                                                <div>
                                                    <a className="remove log7 document_upload" onClick={() => {
                                                        this.handleRemove(third?.id, 2)
                                                    }}>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 320 512">
                                                            <path fill="currentColor"
                                                                  d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"></path>
                                                        </svg>
                                                    </a>
                                                </div>
                                                }
                                            </div>
                                            <p>Utility bill</p>
                                        </div>
                                        <div className="file-select">
                                            <div className="square snip0013">
                                                <div id="icon1" className="icons-area">
                                                    <i className="fa fa-plus"></i>
                                                    <h6>Add document</h6>
                                                </div>
                                                <input type="file" id="logo8" name="logo8" onChange={(e) => {
                                                    this.onChangeDocument(e, 4)
                                                }}/>
                                                <a href={forth?.document} id="log8">
                                                    <img src={forth?.document}/>
                                                </a>
                                                {forth?.document &&
                                                <div>
                                                    <a className="remove log8 document_upload" onClick={() => {
                                                        this.handleRemove(forth?.id, 2)
                                                    }}>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 320 512">
                                                            <path fill="currentColor"
                                                                  d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"></path>
                                                        </svg>
                                                    </a>
                                                </div>
                                                }
                                            </div>
                                            <p>Passport/driving license</p>
                                        </div>
                                        <div className="file-select">
                                            <div className="square snip0013">
                                                <div id="icon1" className="icons-area">
                                                    <i className="fa fa-plus"></i>
                                                    <h6>Add document</h6>
                                                </div>
                                                <input type="file" id="logo9" name="logo9" onChange={(e) => {
                                                    this.onChangeDocument(e, 5)
                                                }}/>
                                                <a href={five?.document} id="log9">
                                                    <img src={five?.document}/>
                                                </a>
                                                {forth?.document &&
                                                <div>
                                                    <a className="remove log9 document_upload" onClick={() => {
                                                        this.handleRemove(five?.id, 2)
                                                    }}>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 320 512">
                                                            <path fill="currentColor"
                                                                  d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"></path>
                                                        </svg>
                                                    </a>
                                                </div>
                                                }
                                            </div>
                                            <p>Business license</p>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-12 t-box">
                        <div className="heading">
                            <h3>Registration Information</h3>
                        </div>
                        <div className="col-8 form-user">
                            <form id="registrationForm">
                                <div className="doc-carry">
                                    <div className="row box">
                                        <div className="col-4 label">
                                            <p>Location of registration *</p>
                                        </div>
                                        <div className="col-8 form-group">
                                            <span hmtlFor="registration_location"></span>
                                            <select value={this.state.registration.country_id}
                                                    ref={this.locationRef}
                                                    className={
                                                        "form-control valid-control " +
                                                        (this.state.errors.country_id ? " is-invalid" : "")
                                                    }
                                                    name="country_id"
                                                    onChange={(e) => {
                                                        this.handleChange(e)
                                                    }}>
                                                <option disabled selected>Select country</option>
                                                {
                                                    staticData.countries.map((country, index) => {
                                                        return (
                                                            <>
                                                                <option key={index}
                                                                        value={country.id}>{CapitalizeFirstLetter(country.name)}</option>
                                                            </>
                                                        )
                                                    })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row box">
                                        <div className="col-4 label">
                                            <p>Registration date *</p>
                                        </div>
                                        <div className="col-8 form-group">
                                            <span hmtlFor="registration_date"></span>
                                            <DatePicker
                                                id="DatePicker"
                                                type="string"
                                                autoComplete='off'
                                                placeholderText="Please enter registration date"
                                                ref={this.registrationDateRef}
                                                className={
                                                    "form-control valid-control " +
                                                    (this.state.errors.registration_date ? " is-invalid" : "")
                                                }
                                                selected={this.state.registration.registration_date ? moment(this.state.registration.registration_date).valueOf() : null}
                                                onChange={(date) => this.setState({
                                                    registration: {
                                                        ...this.state.registration,
                                                        registration_date: moment(date).format("YYYY-MM-DD")
                                                    }
                                                })}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="row box">
                                        <div className="col-4 label">
                                            <p>Registration number *</p>
                                        </div>
                                        <div className="col-8 form-group">
                                            <span hmtlFor="registration_number"></span>
                                            <input type="number"
                                                   ref={this.registrationNumberRef}
                                                   className={
                                                       "form-control valid-control " +
                                                       (this.state.errors.registration_number ? " is-invalid" : "")
                                                   }
                                                   name="registration_number"
                                                   id="registration_number"
                                                   value={this.state.registration?.registration_number}
                                                   aria-describedby="emailHelp"
                                                   placeholder="Enter here .."
                                                   onChange={(e) => {
                                                       this.handleChange(e)
                                                   }}
                                            />
                                        </div>
                                    </div>
                                    <div className="row box">
                                        <div className="col-4 label">
                                            <p>Registered phone *</p>
                                        </div>
                                        <div className="col-8 form-group">
                                            <span hmtlFor="registered_phone"></span>
                                            <PhoneInput
                                                international
                                                inputProps={{
                                                    name: 'landline_number',
                                                    required: true,
                                                }}
                                                disableCountryGuess={false}
                                                countryCodeEditable={false}
                                                value={this.state.registration?.landline_number}
                                                ref={this.registrationPhoneRef}
                                                inputClass={
                                                    "form-control valid-control " +
                                                    (this.state.errors.landline_number ? " is-invalid" : "")
                                                }
                                                onChange={(value,data) => this.setState({
                                                    registration: {
                                                        ...this.state.registration,
                                                        landline_number: value.length <= 10 ? data.dialCode+value : value
                                                    }
                                                })}
                                            />
                                        </div>
                                    </div>
                                    <div className="row box">
                                        <div className="col-4 label">
                                            <p>Registered mobile *</p>
                                        </div>
                                        <div className="col-8 form-group">
                                            <span hmtlFor="registered_mobile"></span>
                                            <PhoneInput
                                                international
                                                inputProps={{
                                                    name: 'mobile_number',
                                                    required: true,
                                                }}
                                                disableCountryGuess={false}
                                                countryCodeEditable={false}
                                                value={this.state.registration?.mobile_number}
                                                ref={this.registrationMobileRef}
                                                inputClass={
                                                    "form-control valid-control " +
                                                    (this.state.errors.mobile_number ? " is-invalid" : "")
                                                }
                                                onChange={(value,data) => this.setState({
                                                    registration: {
                                                        ...this.state.registration,
                                                        mobile_number: this.state.registration?.mobile_number === 10 ? data.dialCode+value : value
                                                    }
                                                })}
                                            />
                                        </div>
                                    </div>
                                    <div className="row box">
                                        <div className="col-4 label">
                                            <p>FAX number</p>
                                        </div>
                                        <div className="col-8 form-group">
                                            <input type="text"
                                                   ref={this.registrationFaxRef}
                                                   className={
                                                       "form-control valid-control " +
                                                       (this.state.errors.fax_number ? " is-invalid" : "")
                                                   }
                                                   aria-describedby="emailHelp"
                                                   name="fax_number"
                                                   value={this.state.registration?.fax_number}
                                                   placeholder="Enter here .."
                                                   onChange={(e) => {
                                                       this.handleChange(e)
                                                   }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="button-div">
                        <button type="submit" className="btn register_save_btn" onClick={(e) => {
                            this.handleSubmit(e)
                        }}>Save
                        </button>
                    </div>
                </div>
            </>
        )
    }
};

export default withCookies(Certifications)



