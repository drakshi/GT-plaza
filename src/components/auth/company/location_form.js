import React from "react";
import {staticData} from "../../../../static";
import {instanceOf} from "prop-types";
import {Cookies, withCookies} from "react-cookie";
import 'react-phone-input-2/lib/style.css'
import API from "../../../api/api.service";
import {NotificationManager} from "react-notifications";
import {CapitalizeFirstLetter} from "../../../helper";

const api = new API();

class LocationForm extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            data: {
                country: null,
                state: null,
                city: null,
                zipcode: null,
                street_address: null,
                type: this.props.type
            },
            locations : [],
            cities: [],
            errors: [],
        }, this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.locationRef = React.createRef();
        this.stateRef = React.createRef();
        this.cityRef = React.createRef();
        this.zipCodeRef = React.createRef();
        this.addressRef = React.createRef();
    }

    componentDidMount() {
        this.getBusinessLocations(this.props.type);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
       if (this.props.type === 2 && this.props.update === true){
           this.getBusinessLocations(this.props.type);
       }
    }

    handleChange(event) {

        let inputData = this.state.data;
        inputData[event.target.name] = event.target.value;

        //country change data
        if (event.target.name === "country") {
            this.setState({cities: []});
            var index1 = event.target.selectedIndex;
            var optionElement1 = event.target.childNodes[index1]
            var option1 = optionElement1.getAttribute('data-iso');
            if (option1) {
                this.setState({country_iso: option1})
            }
        }

        //state change data
        if (event.target.name === "state" && this.state.data.country === "103") {
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


    handleSubmit(event, type) {

        this.setState({
            errorAlert: null,
            errors: [],
        });

        event.preventDefault();

        let errors = {};

        if (this.state.data.country === null || this.state.data.country === "") {
            errors["country"] = "Please select country";
            this.locationRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
            return false;
        }
        if (this.state.data.country === "103" && (this.state.data.state === null || this.state.data.state === "") ) {
            errors["state"] = "Please select state";
            this.stateRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
            return false;
        }
        if (this.state.data.country === "103" && (this.state.data.city === null || this.state.data.city === "" )) {
            errors["city"] = "Please select city";
            this.cityRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
            return false;
        }

        if (this.state.data.zipcode === null || this.state.data.zipcode === "" ) {
            errors["zipcode"] = "Enter zip code";
            this.zipCodeRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
            return false;
        }

        if (this.state.data.street_address === null || this.state.data.street_address === "") {
            errors["street_address"] = "Enter street address";
            this.addressRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
            return false;
        }

        api.addBusinessLocation(
            this.state.data,
        )
            .then((success) => {
                NotificationManager.success("business location updated");
                this.setState({
                    data: {
                        country: "",
                        state: "",
                        city: "",
                        zipcode: "",
                        street_address: "",
                        type: this.props.type
                    },
                });
                this.getBusinessLocations(this.props.type)
            })
            .catch((error) => {
                console.log(error.response.data.message)
            });
    }

    getBusinessLocations(type) {

        api.getBusinessLocation(type).then((success) => {

            //Head office location
                if (type === 1) {
                    this.setState({
                        data: {
                            country: success.data.response?.country_id?.toString(),
                            state: success.data.response?.state,
                            city: success.data.response?.city,
                            zipcode: success.data.response?.zip_code,
                            street_address: success.data.response?.street_address,
                            type: this.props.type
                        },
                    }, () => {
                        if (success.data.response?.country_id.toString() === "103") {
                            var state_name = success.data.response?.state ? success.data.response?.state.toUpperCase() : null;
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
                    })
                }


                //Branch locations
                if (type === 2) {
                    this.setState({
                        locations : success.data.response
                    })
                }
            }
        );
    }


    render() {


        //location handler
        { this.props.type  === 2 && this.props.locationHandler({
            'type' : this.props.type,
            'locations' : this.state.locations,
            'update' : this.props.update
        })}

        return (
            <>
                <form>
                    <div className="col-8 form-user">
                        <div className="row box">

                            <div className="col-4 label">
                                <p>Office location *</p>
                            </div>
                            <div className="col-8 form-group">
                                <select ref={this.locationRef}
                                        value={this.state.data.country}
                                        className={
                                            "form-control valid-control " +
                                            (this.state.errors.country ? " is-invalid" : "")
                                        }
                                        name="country"
                                        onChange={(e) => {
                                            this.handleChange(e)
                                        }}>
                                    <option value="" disabled selected>Select country</option>
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
                                {this.state.data.country === "103" ?
                                    <select ref={this.stateRef}
                                            value={this.state.data.state}
                                            className={
                                                "form-control valid-control " +
                                                (this.state.errors.state ? " is-invalid" : "")
                                            }
                                            name="state"
                                            onChange={(e) => { this.handleChange(e)}}
                                    >
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
                                           ref={this.headStateRef}
                                           value={this.state.data.state}
                                           className={
                                               "form-control valid-control " +
                                               (this.state.errors.state ? " is-invalid" : "")
                                           }
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
                                            name="city"
                                            onChange={(e) => {
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
                                <p>Zipcode *</p>
                            </div>
                            <div className="col-8 form-group">
                                <input type="text"
                                       ref={this.zipCodeRef}
                                       className={
                                           "form-control valid-control " +
                                           (this.state.errors.zipcode ? " is-invalid" : "")
                                       }
                                       value={this.state.data.zipcode}
                                       name="zipcode"
                                       onChange={(e) => {
                                           this.handleChange(e)
                                       }}
                                       placeholder="Enter here .."/>
                            </div>
                        </div>
                        <div className="row box">
                            <div className="col-4 label">
                                <p>Street address *</p>
                            </div>
                            <div className="col-8 form-group">
                                <textarea ref={this.addressRef}
                                          className={
                                              "form-control valid-control " +
                                              (this.state.errors.street_address ? " is-invalid" : "")
                                          }
                                          value={this.state.data.street_address}
                                          name="street_address"
                                          onChange={(e) => {
                                              this.handleChange(e)
                                          }}
                                          placeholder="Enter here ..">
                                </textarea>
                            </div>
                        </div>
                        <div className="button-div">
                            <button type="button" className="btn" onClick={(e) => {
                                this.handleSubmit(e,this.props.type)
                            }}>
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </>
        )
    }
}

export default withCookies(LocationForm)



