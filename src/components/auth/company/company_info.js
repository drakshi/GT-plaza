import React from "react";
import {staticData} from "../../../../static";
import {CapitalizeFirstLetter} from "../../../helper";
import {instanceOf} from "prop-types";
import {Cookies, withCookies} from "react-cookie";
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css';
import API from "../../../api/api.service";
import {NotificationManager} from "react-notifications";
import {Modal} from "react-bootstrap";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import LoadingBar from "react-top-loading-bar";
const api = new API();

class CompanyInfo extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            progress:0,
            data: {
                company_name: null,
                company_description: null,
                company_logo: null,
                profile_banner: null,
                country_id: null,
                state: null,
                city: null,
                zip_code: null,
                address: null,
                primary_business_type_id: [],
                business_categories: [],
                working_days: [],
                contact_person: null,
                mobile_number: null,
                alternate_mobile_number: null,
                primary_email: null,
                secondary_email: null,
                landline: null,
                fax: null,
            },
            upload_type : null,
            image: null,
            cropper: null,
            cropData: null,
            cities: [],
            errorAlert: false,
            country_iso: "",
            errors: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleWeekdayChange = this.handleWeekdayChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.getCropData = this.getCropData.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.companyNameRef = React.createRef();
        this.descriptionRef = React.createRef();
        this.logoRef = React.createRef();
        this.bannerRef = React.createRef();
        this.countryRef = React.createRef();
        this.stateRef = React.createRef();
        this.cityRef = React.createRef();
        this.zipRef = React.createRef();
        this.addressRef = React.createRef();
        this.primaryBusinessRef = React.createRef();
        this.businessCategoryRef = React.createRef();
        this.workingDayRef = React.createRef();
        this.contactPersonRef = React.createRef();
        this.mobileRef = React.createRef();
        this.alterMobileRef = React.createRef();
        this.primaryEmailRef = React.createRef();
        this.secondaryEmailRef = React.createRef();
        this.landlineRef = React.createRef();
        this.faxRef = React.createRef();
    }

    componentDidMount() {
        this.setProfileData();
    }

    onChangeImage = (e,type) => {
        this.setState({upload_type : type});
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            this.setState({image: reader?.result,upload_type : type})
        };
        reader.readAsDataURL(files[0]);
        this.handleShow();
    };

    getCropData = (e) => {
        var cropped_image = this.state.cropper.getCroppedCanvas().toDataURL();
        if (this.state.cropper !== 'undefined' && this.state.cropper !== '') {
            api.uploadImage({logo: cropped_image},
                this.setState({progress:30}),

                setTimeout(() => {
                    this.setState({ progress: 90 });
                }, 1000)
            ).then(res => {
                this.setState({progress:100})
                if (this.state.upload_type === 1){
                    this.setState({data : {...this.state.data,company_logo :  res.data.response} })
                }
                if (this.state.upload_type === 2){
                    this.setState({data : {...this.state.data,profile_banner :  res.data.response} })
                }
            });
        }
        this.setState({image: '', cropper: '', cropData: ''});
        this.handleClose();
    };

    handleClose() {
        this.setState({show: false})
    }

    handleShow() {
        this.setState({show: true})
    }

    handleSubmit(event) {

        this.setState({
            errorAlert: null,
            errors: [],
        });

        event.preventDefault();

        let errors = {};

        if (this.state.data.company_name === null) {
            errors["company_name"] = "Please enter company name";
            this.companyNameRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
            return false;
        }
        if (this.state.data.company_description === null || this.state.data.company_description === "") {
            errors["company_description"] = "Enter company_description";
            this.descriptionRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
            return false;
        }
        if (this.state.data.country_id === null) {
            errors["country_id"] = "Please select country";
            this.countryRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
            return false;
        }
        if (this.state.data.country_id === "103" && this.state.data.state === null) {
            errors["state"] = "Please select state";
            this.stateRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
            return false;
        }
        if (this.state.data.country_id === "103" && this.state.data.city === null) {
            errors["city"] = "Please select city";
            this.cityRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
            return false;
        }
        // if (this.state.data.zip_code === null || this.state.data.zip_code === "") {
        //     errors["zip_code"] = "Please select zip code";
        //     this.zipRef.current.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //     });
        //     this.setState({errors: errors});
        //     return false;
        // }
        // if (this.state.data.address === null || this.state.data.address === "") {
        //     errors["address"] = "Enter address details";
        //     this.addressRef.current.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //     });
        //     this.setState({errors: errors});
        //     return false;
        // }
        // if (this.state.data.primary_business_type_id.length < 1) {
        //     errors["primary_business_type_id"] = "Please select primary business types";
        //     this.primaryBusinessRef.current.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //     });
        //     this.setState({errors: errors});
        //     return false;
        // }

        if (this.state.data.business_categories.length < 1) {
            errors["business_categories"] = "Please select business categories";
            this.businessCategoryRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
            return false;
        }
        // if (this.state.data.working_days.length < 1) {
        //     errors["working_days"] = "Please select working days";
        //     this.workingDayRef.current.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //     });
        //     this.setState({errors: errors});
        //     return false;
        // }
        // if (this.state.data.contact_person === null || this.state.data.contact_person === "" ) {
        //     errors["contact_person"] = "Enter contact person name";
        //     this.contactPersonRef.current.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //     });
        //     this.setState({errors: errors});
        //     return false;
        // }
        // if (this.state.data.mobile_number === null || this.state.data.mobile_number === "" ) {
        //     errors["mobile_number"] = "Enter mobile number";
        //     this.businessCategoryRef.current.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //     });
        //     this.setState({errors: errors});
        //     return false;
        // }
        // if (this.state.data.alternate_mobile_number === null || this.state.data.alternate_mobile_number === "" ) {
        //     errors["alternate_mobile_number"] = "Enter alternate mobile number";
        //     this.alterMobileRef.current.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //     });
        //     this.setState({errors: errors});
        //     return false;
        // }
        // if (this.state.data.primary_email === null || this.state.data.primary_email === "" ) {
        //     errors["primary_email"] = "Enter primary email";
        //     this.alterMobileRef.current.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //     });
        //     this.setState({errors: errors});
        //     return false;
        // }
        // if (this.state.data.secondary_email === null || this.state.data.secondary_email === "" ) {
        //     errors["secondary_email"] = "Enter secondary email";
        //     this.secondaryEmailRef.current.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //     });
        //     this.setState({errors: errors});
        //     return false;
        // }
        // if (this.state.data.landline === null || this.state.data.landline === "" ) {
        //     errors["landline"] = "Enter landline number";
        //     this.landlineRef.current.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //     });
        //     this.setState({errors: errors});
        //     return false;
        // }
        // if (this.state.data.fax === null || this.state.data.fax === "" ) {
        //     errors["fax"] = "Enter fax number";
        //     this.faxRef.current.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //     });
        //     this.setState({errors: errors});
        //     return false;
        // }

        api.updateCompanyProfile(
            this.state.data,
            this.setState({progress:30}),
            setTimeout(() => {
                this.setState({ progress: 90 });
            }, 1000)

        )
            .then((success) => {
                NotificationManager.success(success.data.message);
               this.setProfileData()
                this.setState({progress:100})
            })
            .catch((error) => {
                this.setState({
                    progress:0,
                    errorAlert: error.response.data.message,
                },()=>{
                    NotificationManager.error(error.response.data.message);
                });
            });
    }

    filterOption = values => {
        return values.filter(v => v.isFixed).concat(values.filter(v => !v.isFixed));
    };

    handleTypeChange(value, {action, removedValue}) {
        switch (action) {
            case 'remove-value':
            case 'pop-value':
                if (removedValue.isFixed) {
                    return;
                }
                break;
            case 'clear':
                break;
        }
        value = this.filterOption(value);
        this.setState({
            data: {
                ...this.state.data, primary_business_type_id: value.map(function (a) {
                    return a.value
                })
            }
        });
    }

    handleWeekdayChange(value, {action, removedValue}) {
        switch (action) {
            case 'remove-value':
            case 'pop-value':
                if (removedValue.isFixed) {
                    return;
                }
                break;
            case 'clear':
                break;
        }
        value = this.filterOption(value);
        this.setState({
            data: {
                ...this.state.data, working_days: value.map(function (a) {
                    return a.value
                })
            }
        });
    }

    handleCategoryChange(value, {action, removedValue}) {
        switch (action) {
            case 'remove-value':
            case 'pop-value':
                if (removedValue.isFixed) {
                    return;
                }
                break;
            case 'clear':
                break;
        }
        value = this.filterOption(value);
        this.setState({
            data: {
                ...this.state.data, business_categories: value.map(function (a) {
                    return parseInt(a.value)
                })
            }
        });
    }

    handlePhoneChange(key, value) {
        let inputData = this.state.data;
        inputData[key] = value;
        this.setState({data: inputData});
    }

    handleChange(event) {

        let inputData = this.state.data;
        inputData[event.target.name] = event.target.value;

        //country change data
        if (event.target.name === "country_id") {
            this.setState( { cities : [] });
            var index1 = event.target.selectedIndex;
            var optionElement1 = event.target.childNodes[index1]
            var option1 = optionElement1.getAttribute('data-iso');
            if (option1) {
                this.setState({country_iso: option1})
            }
        }

        //state change data
        if (event.target.name === "state" && this.state.data.country_id === "103") {
            var index = event.target.selectedIndex;
            var optionElement = event.target.childNodes[index];
            var option = optionElement.getAttribute('data-id');
            if (option) {
                var cities = staticData.cities.filter(function (e, i) {
                    return e.state_id === option
                });
                this.setState({cities: cities})
            }
        }
        this.setState({data: inputData});
    }

    setProfileData() {
        api.authCompanyProfile(
            this.setState({progress:30}),

            setTimeout(() => {
                this.setState({ progress: 90 });
            }, 1000)
        ).then((success) => {

            this.setState({
                    progress:100,
                    data: {
                        ...this.state.data,
                        company_name: success.data.response?.company_name,
                        company_description: success.data.response?.company_description,
                        company_logo: success.data.response?.company_logo,
                        profile_banner: success.data.response?.company_profile_banner,
                        country_id: success.data.response?.country_id?.toString(),
                        state: success.data.response?.state,
                        city: success.data.response?.city,
                        zip_code: success.data.response?.postal_code,
                        address: success.data.response?.address,
                        primary_business_type_id: success.data.response?.primary_business_types?.map((value) => {
                            return value.id
                        }),
                        business_categories: success.data.response?.category?.map((value) => {
                            return value.category_id
                        }),
                        working_days: success.data.response?.working_day?.map((value) => {
                            return value.day_id
                        }),
                        contact_person: success.data.response?.contact_person,
                        mobile_number: success.data.response?.mobile_number,
                        alternate_mobile_number: success.data.response?.alternate_mobile_number,
                        primary_email: success.data.response?.primary_email,
                        secondary_email: success.data.response?.secondary_email,
                        landline: success.data.response?.landline,
                        fax: success.data.response?.fax,
                    }
                }
                , () => {
                    if (success.data.response?.country_id.toString() === "103") {
                        console.log(success.data.response?.state);
                        var state_name = success.data.response?.state ? success.data.response?.state?.toUpperCase() : null
                        var state = staticData.states.find(function (e) {
                            return e.name === state_name
                        });
                        if (state) {
                            var cities = staticData.cities.filter(function (e, i) {
                                return e.state_id === state.id
                            });
                            this.setState({cities: cities})
                        }
                    }
                });
            const { cookies } = this.props;
            cookies.set("company_id", success.data.response?.id);
        });
    }

    business_categories = () =>
        [
            staticData.categories.length > 0 ? staticData.categories.map((val, index) => {
                    return (
                        {value: val.id, label: val.name}
                    )
                })
                : []
        ];

    primary_business = [
        {value: 1, label: 'Manufacturer'},
        {value: 2, label: 'Companies'},
        {value: 3, label: 'Trader'},
        {value: 4, label: 'Distributor'},
        {value: 5, label: 'Reseller'},
        {value: 6, label: 'Wholesaler'},
        {value: 7, label: 'Service Provider'},
    ];

    working_days = [
        {value: 1, label: 'Sun'},
        {value: 2, label: 'Mon'},
        {value: 3, label: 'Tue'},
        {value: 4, label: 'Wed'},
        {value: 5, label: 'Thu'},
        {value: 6, label: 'Fri'},
        {value: 7, label: 'Sat'},
    ];


    render() {

        const animatedComponents = makeAnimated();

        return (
            <>
                <header>
                    <LoadingBar progress={this.state.progress} color="blue"/>
                </header>
                <div className={this.props.active === "company_profile" ? "tab-pane active" : "tab-pane"}
                     id="general_details">
                    <div className="col-12 t-box">
                        <div className="heading">
                            <h3>Basic information</h3>
                        </div>
                        <div className="col-8 form-user">
                            <input type="hidden" id="company_business_id"/>

                            <div className="row box">
                                <div className="col-4 label">
                                    <p>Company name *</p>
                                </div>
                                <div className="col-8 form-group">
                                    <input type="text"
                                           ref={this.companyNameRef}
                                           className={
                                               "form-control valid-control " +
                                               (this.state.errors.company_name ? " is-invalid" : "")
                                           }
                                           name="company_name"
                                           id="company_name"
                                           placeholder="Enter here .."
                                           value={this.state.data.company_name}
                                           onChange={(e) => {
                                               this.handleChange(e)
                                           }}
                                    />
                                </div>
                            </div>
                            <div className="row box">
                                <div className="col-4 label">
                                    <p>Company description *</p>
                                </div>
                                <div className="col-8 form-group">
                                    <textarea name="company_description"
                                              id="company_description"
                                              ref={this.descriptionRef}
                                              className={
                                                  "form-control valid-control " +
                                                  (this.state.errors.company_description ? " is-invalid" : "")
                                              }
                                              onChange={(e) => {
                                                  this.handleChange(e)
                                              }}
                                              value={this.state.data.company_description}
                                              placeholder="Enter here .."/>
                                </div>
                            </div>
                            <div className="row box">
                                <div className="col-4 label">
                                    <p>Upload images</p>
                                    <span>Maximum file size - 1Mb</span>
                                    <span>Logo Recommended size -  400 X 400</span>
                                    <span>Banner Recommended size - 900 X 300</span>
                                </div>
                                <div className="col-8 form-group file-upload">
                                    <div ref={this.logoRef} className={
                                        "file-select logo square valid-control " +
                                        (this.state.errors.company_logo ? " is-invalid" : "")
                                    }>
                                        <div id="icon1" className={"icons-area"}>
                                            <i className="fa fa-plus"></i>
                                            <h6>Add company logo</h6>
                                        </div>
                                        <img id="logo_image" src={this.state.data.company_logo}/>
                                        <input type="file" id="logo" name="logo" onChange={(e)=>this.onChangeImage(e,1)}/>
                                    </div>
                                    <div ref={this.bannerRef} className={
                                        "file-select banner valid-control " +
                                        (this.state.errors.profile_banner ? " is-invalid" : "")
                                    }>
                                        <div id="icon2" className="icons-area">
                                            <i className="fa fa-plus"></i>
                                            <h6>Add profile banner</h6>
                                        </div>
                                        <img id="banner_image" src={this.state.data.profile_banner} />
                                        <input type="file" id="logo1" name="logo1" onChange={(e)=>this.onChangeImage(e,2)}/>
                                    </div>
                                </div>
                            </div>

                            <div className="row box">
                                <div className="col-4 label">
                                    <p>Country</p>
                                </div>
                                <div className="col-8 form-group">
                                    <select ref={this.countryRef}
                                            value={this.state.data.country_id}
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
                                                        <option key={index} data-iso={country.iso3_code}
                                                                value={country.id}>{CapitalizeFirstLetter(country.name)}</option>
                                                    </>
                                                )
                                            })}
                                    </select>
                                </div>
                            </div>

                            <div className="row box">
                                <div className="col-4 label">
                                    <p>State</p>
                                </div>
                                <div className="col-8 form-group">
                                    {this.state.data.country_id === "103" ?
                                        <select ref={this.stateRef}
                                                value={this.state.data.state}
                                                className={
                                                    "form-control valid-control " +
                                                    (this.state.errors.state ? " is-invalid" : "")
                                                }
                                                name="state" onChange={(e) => {
                                            this.handleChange(e)
                                        }}>
                                            <option disabled selected>Select state</option>
                                            {
                                                staticData.states.map((state, index) => {
                                                    return (
                                                        <>
                                                            <option data-id={state.id} key={index}
                                                                    value={state.name}>{CapitalizeFirstLetter(state.name.toLowerCase())}</option>
                                                        </>
                                                    )
                                                })}
                                        </select>
                                        :
                                        <input type="text" name="state" placeholder="State( optional )"
                                               className="form-control"
                                               onChange={(e) => {
                                                   this.handleChange(e)
                                               }}/>
                                    }
                                </div>
                            </div>

                            <div className={this.state.cities.length > 0 ? "col-12 p-0" : "col-12 p-0 d-none"}>
                                <div className="row box">
                                    <div className="col-4 label">
                                        <p>City</p>
                                    </div>
                                    <div className="col-8 form-group">
                                        <select ref={this.cityRef}
                                                value={this.state.data.city}
                                                className={
                                                    "form-control valid-control " +
                                                    (this.state.errors.city ? " is-invalid" : "")
                                                }
                                                name="city" onChange={(e) => {
                                            this.handleChange(e)
                                        }}>
                                            <option disabled selected>Select city</option>
                                            {
                                                this.state.cities.length ? this.state.cities.map((city, index) => {
                                                    return (
                                                        <>
                                                            <option key={index}
                                                                    value={city.city}>{CapitalizeFirstLetter(city.city)}</option>
                                                        </>
                                                    )
                                                }) : ""}
                                        </select>
                                    </div>
                                </div>
                            </div>


                            <div className="row box">
                                <div className="col-4 label">
                                    <p>Zip / postal code</p>
                                </div>
                                <div className="col-8 form-group">
                                    <input type="text" ref={this.zipRef}
                                           className={
                                               "form-control valid-control " +
                                               (this.state.errors.zip_code ? " is-invalid" : "")
                                           }
                                           onChange={(e) => {
                                               this.handleChange(e)
                                           }}
                                           value={this.state.data.zip_code}
                                           name="zip_code"
                                           placeholder="Enter here .."
                                    />
                                </div>
                            </div>
                            <div className="row box">
                                <div className="col-4 label">
                                    <p>Street address</p>
                                </div>
                                <div className="col-8 form-group">
                                    <textarea name="address" ref={this.addressRef}
                                              onChange={(e) => {
                                                  this.handleChange(e)
                                              }}
                                              className={
                                                  "form-control valid-control " +
                                                  (this.state.errors.address ? " is-invalid" : "")
                                              }
                                              value={this.state.data.address}
                                              placeholder="Enter here .."/>
                                </div>
                            </div>
                            <div className="row box">
                                <div className="col-4 label">
                                    <p>Primary Business type</p>
                                </div>
                                <div className="col-8 form-group" >
                                    <Select
                                        ref={this.primaryBusinessRef}
                                        onChange={this.handleTypeChange}
                                        className={
                                            "valid-control " +
                                            (this.state.errors.primary_business ? " is-invalid" : "")
                                        }
                                        value={this.state.data.primary_business_type_id.length > 0 ? this.primary_business.filter(obj => this.state.data.primary_business_type_id.includes(obj.value)) : []}
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        options={this.primary_business}
                                        isMulti
                                    />
                                </div>
                            </div>
                            <div className="row box">
                                <div className="col-4 label">
                                    <p>Business categories *</p>
                                </div>
                                <div className="col-8 form-group" ref={this.businessCategoryRef}>
                                    <Select
                                        className={"valid-control " +
                                            (this.state.errors.business_categories ? " is-invalid" : "")
                                        }
                                        onChange={this.handleCategoryChange}
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        value={this.state.data.business_categories.length > 0 ? this.business_categories()[0].filter(obj => this.state.data.business_categories.includes(parseInt(obj.value))) : []}
                                        options={this.business_categories()[0]}
                                        isMulti
                                    />
                                </div>
                            </div>
                            <div className="row box">
                                <div className="col-4 label">
                                    <p>Working days</p>
                                </div>
                                <div className="col-8 form-group">
                                    <Select
                                        ref={this.workingDayRef}
                                        className={
                                            "valid-control " +
                                            (this.state.errors.working_days ? " is-invalid" : "")
                                        }
                                        onChange={this.handleWeekdayChange}
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        options={this.working_days}
                                        value={this.state.data.working_days.length > 0 ? this.working_days.filter(obj => this.state.data.working_days.includes(obj.value)) : []}
                                        isMulti
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 t-box">
                        <div className="heading">
                            <h3>Contact information</h3>
                        </div>
                        <div className="col-8 form-user">
                            <div className="row box">
                                <div className="col-4 label">
                                    <p>Contact person</p>
                                </div>
                                <div className="col-8 form-group">
                                    <input type="text"
                                           ref={this.contactPersonRef}
                                           className={
                                               "form-control valid-control " +
                                               (this.state.errors.working_days ? " is-invalid" : "")
                                           }
                                           value={this.state.data.contact_person}
                                           onChange={(e) => {
                                               this.handleChange(e)
                                           }}
                                           name="contact_person"
                                           placeholder="Enter here .."
                                    />
                                </div>
                            </div>
                            <div className="row box">
                                <div className="col-4 label">
                                    <p>Mobile number</p>
                                </div>
                                <div className="col-8 form-group number-first">
                                    <PhoneInput
                                        international
                                        inputProps={{
                                            name: 'mobile_number',
                                            required: true
                                        }}
                                        disableCountryGuess={false}
                                        countryCodeEditable={false}
                                        value={this.state.data.mobile_number}
                                        ref={this.mobileRef}
                                        inputClass={
                                            "form-control valid-control " +
                                            (this.state.errors.mobile_number ? " is-invalid" : "")
                                        }
                                        onChange={(value, data) => {
                                                this.handlePhoneChange("mobile_number", this.state.data.mobile_number === 10 ? data.dialCode+value : value);
                                            }
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row box">
                                <div className="col-4 label">
                                    <p>Alternate Mobile number</p>
                                </div>
                                <div className="col-8 form-group number-second">
                                    <PhoneInput
                                        international
                                        inputProps={{
                                            name: 'alternate_mobile_number',
                                            required: true,
                                        }}
                                        disableCountryGuess={false}
                                        countryCodeEditable={false}
                                        value={this.state.data.alternate_mobile_number}
                                        ref={this.alterMobileRef}
                                        inputClass={
                                            "form-control valid-control " +
                                            (this.state.errors.alternate_mobile_number ? " is-invalid" : "")
                                        }
                                        onChange={(value,data) => this.handlePhoneChange("alternate_mobile_number",
                                            this.state.data.alternate_mobile_number === 10 ? data.dialCode+value : value)}
                                    />
                                </div>
                            </div>
                            <div className="row box">
                                <div className="col-4 label">
                                    <p>Primary email address</p>
                                </div>
                                <div className="col-8 form-group">
                                    <input type="email"
                                           ref={this.primaryEmailRef}
                                           className={
                                               "form-control valid-control " +
                                               (this.state.errors.primary_email ? " is-invalid" : "")
                                           }
                                           onChange={(e) => {
                                               this.handleChange(e)
                                           }}
                                           name="primary_email"
                                           value={this.state.data.primary_email}
                                           placeholder="Enter here .."
                                    />
                                </div>
                            </div>
                            <div className="row box">
                                <div className="col-4 label">
                                    <p>Alternate email address</p>
                                </div>
                                <div className="col-8 form-group">
                                    <input type="email"
                                           ref={this.secondaryEmailRef}
                                           className={
                                               "form-control valid-control " +
                                               (this.state.errors.secondary_email ? " is-invalid" : "")
                                           }
                                           onChange={(e) => {
                                               this.handleChange(e)
                                           }}
                                           value={this.state.data.secondary_email}
                                           name="secondary_email"
                                           placeholder="Enter here .."
                                    />
                                </div>
                            </div>
                            <div className="row box">
                                <div className="col-4 label">
                                    <p>Landline number</p>
                                </div>
                                <div className="col-8 form-group">
                                    <input name="landline"
                                           type="number"
                                           onChange={(e) => {
                                               this.handleChange(e)
                                           }}
                                           value={this.state.data.landline}
                                           ref={this.landlineRef}
                                           className={
                                               "form-control valid-control " +
                                               (this.state.errors.landline ? " is-invalid" : "")
                                           }
                                           id="landline"
                                           placeholder="Enter here .."
                                    />
                                </div>
                            </div>
                            <div className="row box">
                                <div className="col-4 label">
                                    <p>FAX number</p>
                                </div>
                                <div className="col-8 form-group">
                                    <input type="number"
                                           value={this.state.data.fax}
                                           onChange={(e) => {
                                               this.handleChange(e)
                                           }}
                                           name="fax"
                                           ref={this.faxRef}
                                           className={
                                               "form-control valid-control " +
                                               (this.state.errors.fax ? " is-invalid" : "")
                                           }
                                           placeholder="Enter here .."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="button-div">
                        <button type="button" className="btn company_basic_form_btn" onClick={(e)=>{
                            this.handleSubmit(e);
                        }}>Save</button>
                    </div>
                </div>

                <Modal show={this.state.show}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Body>
                        <div className="drop-modal">
                            <div className="order-prefrence">
                                <h4>Cropper</h4>
                            </div>
                            <div className="col-12 form-details">
                                <Cropper
                                    initialAspectRatio={this.state.upload_type === 1 ? 1 : 3}
                                    preview=".img-preview"
                                    guides={true}
                                    src={this.state.image}
                                    cropBoxResizable={true}
                                    dragMode={'move'}
                                    checkOrientation={true} // https://github.com/fengyuanchen/cropperjs/issues/671
                                    onInitialized={(instance) => {
                                        this.setState({cropper: instance});
                                    }}
                                />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary" onClick={this.getCropData}>
                            Crop
                        </button>
                        <button className="btn btn-danger" onClick={this.handleClose}>
                            Close
                        </button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
};

export default withCookies(CompanyInfo)



