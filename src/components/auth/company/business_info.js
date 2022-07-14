import React from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {staticData} from "../../../../static";
import {instanceOf} from "prop-types";
import {Cookies} from "react-cookie";
import moment from "moment";
import {NotificationManager} from "react-notifications";
import API from "../../../api/api.service";
import LoadingBar from "react-top-loading-bar";
const api = new API();

class BusinessProfile extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            progress:0,
            data: {
                established_year: null,
                ownership_type_id: null,
                other_ownership: null,
                major_markets_id: [],
                delivery_terms: [],
                size_range_id: null,
                number_of_employees: null,
                supply_ability: {
                    production_line: null,
                    quantity: null,
                    unit_id: null,
                    lead_time: null,
                    time_availability_id: null,
                },
                gst_number: null,
                pan_number: null,
                tan_number: null,
                total_annual_revenue_id: null,
                export_percentage: null,
                nearest_port_id: null,
            },
            errorAlert: false,
            errors: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleDeliveryChange = this.handleDeliveryChange.bind(this);
        this.handleSupplyChange = this.handleSupplyChange.bind(this);
        this.establishedRef = React.createRef();
        this.ownershipRef = React.createRef();
        this.otherOwnerRef = React.createRef();
        this.majorMarketRef = React.createRef();
        this.sizeRangeRef = React.createRef();
        this.employeeRef = React.createRef();
        this.supplyProductionRef = React.createRef();
        this.supplyQuantRef = React.createRef();
        this.supplyUnitRef = React.createRef();
        this.supplyLeadRef = React.createRef();
        this.supplyTimeRef = React.createRef();
        this.gstRef = React.createRef();
        this.panRef = React.createRef();
        this.tanRef = React.createRef();
        this.annualRangRef = React.createRef();
        this.exportRef = React.createRef();
        this.portRef = React.createRef();
        this.deliveryTermRef = React.createRef();
    }

    componentDidMount() {
        this.setBusinessProfile();
    }

    major_markets = [
        {value: 1, label: 'WorldWide'},
        {value: 2, label: 'North America'},
        {value: 3, label: 'Europe'},
        {value: 4, label: 'Asia'},
    ];

    delivery_terms = [
        {value: 1, label: 'DAP - Delivery at place'},
        {value: 2, label: 'DDP - Delivered Duty Paid'},
        {value: 3, label: 'FAS - Free Alongside Ship'},
        {value: 4, label: 'FOB - Free On Board'},
        {value: 5, label: 'CIF - Cost,Insurance,Freight'},
    ];

    handleChange(event) {
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

        if (this.state.data.established_year === null || this.state.data.established_year === "") {
            errors["established_year"] = "Please enter established_year";
            this.establishedRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
            return false;
        }
        if (this.state.data.ownership_type_id === null || this.state.data.ownership_type_id === "") {
            errors["ownership_type_id"] = "Please select ownership_type_id";
            this.ownershipRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
            return false;
        }
        if (this.state.data.ownership_type_id === "5" && (this.state.data.other_ownership === null || this.state.data.other_ownership === "")) {
            errors["other_ownership"] = "Please enter other ownership";
            this.otherOwnerRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
            return false;
        }
        if (this.state.data.major_markets_id.length < 1) {
            errors["major_markets_id"] = "Please select major markets";
            this.majorMarketRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
            return false;
        }

        if (this.state.data.delivery_terms.length < 1) {
            errors["delivery_terms"] = "Please select delivery terms ";
            this.deliveryTermRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
            return false;
        }

        // if (this.state.data.size_range_id === null || this.state.data.size_range_id === "") {
        //     errors["size_range_id"] = "Please select area size";
        //     this.sizeRangeRef.current.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //     });
        //     this.setState({errors: errors});
        //     return false;
        // }
        // if (this.state.data.number_of_employees === null || this.state.data.number_of_employees === "") {
        //     errors["number_of_employees"] = "Please enter number of employee";
        //     this.employeeRef.current.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //     });
        //     this.setState({errors: errors});
        //     return false;
        // }
        //
        // if (this.state.data.supply_ability.production_line === null || this.state.data.supply_ability.production_line === "") {
        //     errors["production_line"] = "Please enter number of production lines";
        //     this.supplyProductionRef.current.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //     });
        //     this.setState({errors: errors});
        //     return false;
        // }
        // if (this.state.data.supply_ability.quantity === null || this.state.data.supply_ability.quantity === "") {
        //     errors["quantity"] = "Please enter quantity";
        //     this.supplyQuantRef.current.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //     });
        //     this.setState({errors: errors});
        //     return false;
        // }
        // if (this.state.data.supply_ability.unit_id === null || this.state.data.supply_ability.unit_id === "") {
        //     errors["unit_id"] = "Please select unit";
        //     this.supplyUnitRef.current.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //     });
        //     this.setState({errors: errors});
        //     return false;
        // }
        // if (this.state.data.supply_ability.lead_time === null || this.state.data.supply_ability.lead_time === "") {
        //     errors["lead_time"] = "Please enter lead time";
        //     this.supplyLeadRef.current.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //     });
        //     this.setState({errors: errors});
        //     return false;
        // }
        // if (this.state.data.supply_ability.time_availability_id === null || this.state.data.supply_ability.time_availability_id === "") {
        //     errors["time_availability_id"] = "Please select time availability";
        //     this.supplyTimeRef.current.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //     });
        //     this.setState({errors: errors});
        //     return false;
        // }
        // if (this.state.data.gst_number === null || this.state.data.gst_number === "") {
        //     errors["gst_number"] = "Please enter gst number " ;
        //     this.gstRef.current.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //     });
        //     this.setState({errors: errors});
        //     return false;
        // }
        //
        // if (this.state.data.pan_number === null || this.state.data.pan_number === "") {
        //     errors["pan_number"] = "Please enter pan number " ;
        //     this.panRef.current.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //     });
        //     this.setState({errors: errors});
        //     return false;
        // }
        //
        // if (this.state.data.tan_number === null || this.state.data.tan_number === "") {
        //     errors["tan_number"] = "Please enter tan number " ;
        //     this.tanRef.current.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //     });
        //     this.setState({errors: errors});
        //     return false;
        // }

        if (this.state.data.total_annual_revenue_id === null || this.state.data.total_annual_revenue_id === "") {
            errors["total_annual_revenue_id"] = "Please select revenue range " ;
            this.tanRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
            return false;
        }
        //
        // if (this.state.data.export_percentage === null || this.state.data.export_percentage === "") {
        //     errors["export_percentage"] = "Please export percentage " ;
        //     this.exportRef.current.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //     });
        //     this.setState({errors: errors});
        //     return false;
        // }
        //
        // if (this.state.data.nearest_port_id === null || this.state.data.nearest_port_id === "") {
        //     errors["nearest_port_id"] = "Please select nearest port " ;
        //     this.portRef.current.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //     });
        //     this.setState({errors: errors});
        //     return false;
        // }

        api.updateBusinessProfile(
            this.state.data,
            this.setState({progress:30}),

            setTimeout(() => {
                this.setState({ progress: 90 });
            }, 1000)

        )
            .then((success) => {
                this.setState({progress:100})
                this.setBusinessProfile();
                NotificationManager.success(success.data.message);
            })
            .catch((error) => {
                this.setState({
                    progress:0,
                    errorAlert: error.response.data.message,
                });
            });
    }

    setBusinessProfile() {
        api.authBusinessProfile(
            this.setState({progress:30}),

            setTimeout(() => {
                this.setState({ progress: 90 });
            }, 1000)
        ).then((success) => {

            this.setState({
                    progress:100,
                    data: {
                        ...this.state.data,
                        established_year: success.data.response?.established_year ? success.data.response?.established_year : null,
                        ownership_type_id:  success.data.response?.ownership_type_id ? success.data.response?.ownership_type_id.toString() : null,
                        other_ownership: success.data.response?.other_ownership,
                        major_markets_id:  success.data.response?.business_major_market?.length > 0 ? success.data.response?.business_major_market?.map((value) => {
                            return value.id
                        }) : [],
                        delivery_terms:  success.data.response?.business_delivery_terms.length ?  success.data.response?.business_delivery_terms?.map((value) => {
                            return value.delivery_term_id
                        }) : [],
                        size_range_id: success.data.response?.size_range_id,
                        number_of_employees: success.data.response?.number_of_employees,
                        supply_ability: {
                            production_line: success.data.response?.supply_ability?.production_lines,
                            quantity: success.data.response?.supply_ability?.quantity,
                            unit_id: success.data.response?.supply_ability?.unit_id,
                            lead_time: success.data.response?.supply_ability?.lead_time,
                            time_availability_id: success.data.response?.supply_ability?.time_availability_id,
                        },
                        gst_number: success.data.response?.gst_number,
                        pan_number:success.data.response?.pan_number,
                        tan_number: success.data.response?.tan_number,
                        total_annual_revenue_id: success.data.response?.total_annual_revenue_id ? success.data.response?.total_annual_revenue_id : null,
                        export_percentage: success.data.response?.export_percentage,
                        nearest_port_id: success.data.response?.nearest_port_id,
                    }
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
                ...this.state.data, major_markets_id: value.map(function (a) {
                    return a.value
                })
            }
        });
    }

    handleDeliveryChange(value, {action, removedValue}) {
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
                ...this.state.data, delivery_terms: value.map(function (a) {
                    return a.value
                })
            }
        });
    }

    handleSupplyChange(event){
        const data = this.state.data;
         data.supply_ability[event.target.name] = event.target.value ;
         this.setState({data});
    }

    render() {

        return (
            <>
                <LoadingBar progress={this.state.progress} color="blue" />
                <div className={this.props.active === "business_profile" ? "tab-pane active" : "tab-pane"}
                     id="factory_details">
                    <form id="businessForm">
                        <div className="col-12 t-box">
                            <div className="heading">
                                <h3>Company information</h3>
                            </div>
                            <div className="col-8 form-user">
                                <div className="row box">
                                    <div className="col-4 label">
                                        <p>Year of establishment *</p>
                                    </div>
                                    <div className="col-8 form-group" ref={this.establishedRef}>
                                        <DatePicker
                                            id="DatePicker"
                                            type="string"
                                            autoComplete='off'
                                            placeholderText="Please select year"
                                            className={"form-control valid-control " +
                                                (this.state.errors.established_year ? " is-invalid" : "")
                                            }
                                            showYearPicker
                                            selected={this.state.data.established_year ? moment(this.state.data.established_year).valueOf() : null}
                                            onChange={(date) => this.setState({
                                                data: {
                                                    ...this.state.data,
                                                    established_year: new Date(date)
                                                }
                                            })}
                                            dateFormat="yyyy"
                                            yearItemNumber={9}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="row box">
                                    <div className="col-4 label">
                                        <p>Ownership type *</p>
                                    </div>
                                    <div className="col-8 form-group">
                                        <select name="ownership_type_id"
                                                ref={this.ownershipRef}
                                                className={
                                                    "form-control ownership valid-control " +
                                                    (this.state.errors.ownership_type_id ? " is-invalid" : "")
                                                }
                                                value={this.state.data.ownership_type_id}
                                                onChange={(e)=>{this.handleChange(e)}}
                                                id="ownership_value">
                                            <option disabled selected>Select</option>
                                            <option value="1">Pvt Ltd</option>
                                            <option value="2">LLC</option>
                                            <option value="3">Sole Proprietorship</option>
                                            <option value="4">Inc</option>
                                            <option value="5">Others</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={this.state.data.ownership_type_id === "5" ? "row box other_ownership" : "row box other_ownership d-none"}>
                                    <div className="col-4 label"></div>
                                    <div className="col-8 form-group">
                                        <input type="text"
                                               ref={this.otherOwnerRef}
                                               value={this.state.data.other_ownership}
                                               onChange={(e)=>{this.handleChange(e)}}
                                               className={
                                                   "form-control valid-control " +
                                                   (this.state.errors.other_ownership ? " is-invalid" : "")
                                               }
                                               name="other_ownership"
                                               placeholder="Enter Ownership"
                                        />
                                    </div>
                                </div>
                                <div className="row box">
                                    <div className="col-4 label">
                                        <p>Major market *</p>
                                    </div>
                                    <div className="col-8 form-group" ref={this.majorMarketRef}>
                                        <Select
                                            onChange={this.handleTypeChange}
                                            value={this.state.data?.major_markets_id.length > 0 ? this.major_markets.filter(obj => this.state.data.major_markets_id.includes(obj.value)) : []}
                                            className={
                                                "valid-control " +
                                                (this.state.errors.major_markets ? " is-invalid" : "")
                                            }
                                            options={this.major_markets}
                                            isMulti
                                        />
                                    </div>
                                </div>
                                <div className="row box">
                                    <div className="col-4 label">
                                        <p>Terms of delivery *</p>
                                    </div>
                                    <div className="col-8 form-group" ref={this.deliveryTermRef}>
                                        <Select
                                            onChange={this.handleDeliveryChange}
                                            value={this.state.data.delivery_terms.length > 0 ? this.delivery_terms.filter(obj => this.state.data.delivery_terms.includes(obj.value)) : []}
                                            className={
                                                "valid-control " +
                                                (this.state.errors.delivery_terms ? " is-invalid" : "")
                                            }
                                            options={this.delivery_terms}
                                            isMulti
                                        />
                                    </div>
                                </div>
                                <div className="row box">
                                    <div className="col-4 label">
                                        <p>Area</p>
                                    </div>
                                    <div className="col-8 form-group">
                                        <select name="size_range_id"
                                                value={this.state.data.size_range_id}
                                                onChange={(e)=>{this.handleChange(e)}}
                                                ref={this.sizeRangeRef}
                                                className={
                                                    "form-control valid-control " +
                                                    (this.state.errors.size_range_id ? " is-invalid" : "")
                                                }
                                        >
                                            <option disabled selected>Select</option>
                                            <option value="1">1000 - 3000 square meter</option>
                                            <option value="2">3000 - 8000 square meter</option>
                                            <option value="3">below - 1000 square meter</option>
                                            <option value="4">above - 8000 square meter</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row box">
                                    <div className="col-4 label">
                                        <p>No. of employees</p>
                                    </div>
                                    <div className="col-8 form-group">
                                        <input type="number"
                                               onChange={(e)=>{this.handleChange(e)}}
                                               value={this.state.data.number_of_employees}
                                               ref={this.employeeRef}
                                               className={
                                                   "form-control valid-control " +
                                                   (this.state.errors.number_of_employees ? " is-invalid" : "")
                                               }
                                               name="number_of_employees"
                                               placeholder="Enter here .."
                                        />
                                    </div>
                                </div>
                                <div className="row box">
                                    <div className="col-4 label">
                                        <p>No. of product line</p>
                                    </div>
                                    <div className="col-8 form-group">
                                        <input type="number"
                                               value={this.state.data?.supply_ability?.production_line}
                                               onChange={(e) =>  {this.handleSupplyChange(e)}}
                                               ref={this.supplyProductionRef}
                                               className={
                                                   "form-control valid-control " +
                                                   (this.state.errors.production_line ? " is-invalid" : "")
                                               }
                                               name="production_line"
                                               placeholder="Enter here .."
                                        />
                                    </div>
                                </div>
                                <div className="row box">
                                    <div className="col-4 label">
                                        <p>Output capacity</p>
                                    </div>
                                    <div className="col-8 form-group append">
                                        <input type="number"
                                               value={this.state.data?.supply_ability?.quantity}
                                               onChange={(e) => {this.handleSupplyChange(e)}}
                                               ref={this.supplyQuantRef}
                                               className={
                                                   "form-control valid-control " +
                                                   (this.state.errors.quantity ? " is-invalid" : "")
                                               }
                                               name="quantity"
                                               placeholder="Enter here .."
                                        />
                                        <div className="input-group-append">
                                            <select name="unit_id"
                                                    value={this.state.data?.supply_ability?.unit_id}
                                                    onChange={(e) => {this.handleSupplyChange(e)}}
                                                    ref={this.supplyUnitRef}
                                                    className={
                                                        "form-control valid-control " +
                                                        (this.state.errors.unit_id ? " is-invalid" : "")
                                                    }
                                                    id="capacity_id">
                                                <option disabled selected>Select</option>
                                                <option value="1">Bags</option>
                                                <option value="2">Carton</option>
                                                <option value="3">Dozen</option>
                                                <option value="4">Feet</option>
                                                <option value="5">Kilogram</option>
                                                <option value="6">Meter</option>
                                                <option value="7">Metric Ton</option>
                                                <option value="8">Pieces</option>
                                                <option value="9">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row box">
                                    <div className="col-4 label">
                                        <p>Average lead time</p>
                                    </div>
                                    <div className="col-8 form-group append">
                                        <input type="number"
                                               value={this.state.data?.supply_ability?.lead_time}
                                               onChange={(e) => {this.handleSupplyChange(e)} }
                                               ref={this.supplyLeadRef}
                                               className={
                                                   "form-control valid-control " +
                                                   (this.state.errors.lead_time ? " is-invalid" : "")
                                               }
                                               name="lead_time"
                                               id="lead_time"
                                               placeholder="Enter here .."
                                        />
                                        <div className="input-group-append">
                                            <select
                                                value={this.state.data?.supply_ability?.time_availability_id}
                                                onChange={(e) => {this.handleSupplyChange(e)}}
                                                ref={this.supplyTimeRef}
                                                className={
                                                    "form-control valid-control " +
                                                    (this.state.errors.time_availability_id ? " is-invalid" : "")
                                                }
                                                name="time_availability_id">
                                                <option disabled selected>Select</option>
                                                <option value="1">Day</option>
                                                <option value="2">Week</option>
                                                <option value="3">Month</option>
                                                <option value="4">Quarter</option>
                                                <option value="5">Year</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 t-box">
                            <div className="heading">
                                <h3>Trade information</h3>
                            </div>
                            <div className="col-8 form-user">
                                <div className="row box">
                                    <div className="col-4 label">
                                        <p>GST number</p>
                                    </div>
                                    <div className="col-8 form-group">
                                        <input type="text"
                                               value={this.state.data?.gst_number}
                                               onChange={(e)=>{this.handleChange(e)}}
                                               ref={this.gstRef}
                                               className={
                                                   "form-control valid-control " +
                                                   (this.state.errors.gst_number ? " is-invalid" : "")
                                               }
                                               name="gst_number"
                                               id="gst_number"
                                               placeholder="Enter here .."
                                        />
                                    </div>
                                </div>
                                <div className="row box">
                                    <div className="col-4 label">
                                        <p>PAN number</p>
                                    </div>
                                    <div className="col-8 form-group">
                                        <input type="text"
                                               value={this.state.data?.pan_number}
                                               onChange={(e)=>{this.handleChange(e)}}
                                               ref={this.panRef}
                                               className={
                                                   "form-control valid-control " +
                                                   (this.state.errors.pan_number ? " is-invalid" : "")
                                               }
                                               name="pan_number"
                                               id="pan_number"
                                               placeholder="Enter here .."
                                        />
                                    </div>
                                </div>
                                <div className="row box">
                                    <div className="col-4 label">
                                        <p>TAN number</p>
                                    </div>
                                    <div className="col-8 form-group">
                                        <input type="text"
                                               value={this.state.data?.tan_number}
                                               onChange={(e)=>{this.handleChange(e)}}
                                               ref={this.tanRef}
                                               className={
                                                   "form-control valid-control " +
                                                   (this.state.errors.tan_number ? " is-invalid" : "")
                                               }
                                               name="tan_number"
                                               id="tan_number"
                                               placeholder="Enter here .."
                                        />
                                    </div>
                                </div>
                                <div className="row box">
                                    <div className="col-4 label">
                                        <p>Annual revenue *</p>
                                    </div>
                                    <div className="col-8 form-group">
                                        <select
                                            value={this.state.data?.total_annual_revenue_id}
                                            onChange={(e)=>{this.handleChange(e)}}
                                            ref={this.annualRangRef}
                                            className={
                                                "form-control valid-control " +
                                                (this.state.errors.total_annual_revenue_id ? " is-invalid" : "")
                                            }
                                            name="total_annual_revenue_id">
                                            <option disabled selected>Select</option>
                                            <option value="1">USD $2.5 Million - USD $5 Million</option>
                                            <option value="2">USD $5 Million - USD $10 Million</option>
                                            <option value="3">above - USD $10 Million</option>
                                            <option value="4">below - USD $2.5 Million</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row box">
                                    <div className="col-4 label">
                                        <p>Export percentage</p>
                                    </div>
                                    <div className="col-8 form-group">
                                        <input type="number"
                                               value={this.state.data?.export_percentage}
                                               onChange={(e)=>{this.handleChange(e)}}
                                               ref={this.exportRef}
                                               className={
                                                   "form-control valid-control " +
                                                   (this.state.errors.export_percentage ? " is-invalid" : "")
                                               }
                                               name="export_percentage"
                                               min="0" max="100"
                                               placeholder="Enter here .."
                                        />
                                    </div>
                                </div>
                                <div className="row box">
                                    <div className="col-4 label">
                                        <p>Nearest port</p>
                                    </div>
                                    <div className="col-8 form-group">
                                        <select
                                            value={this.state.data?.nearest_port_id}
                                            onChange={(e)=>{this.handleChange(e)}}
                                            ref={this.portRef}
                                            className={
                                                "form-control valid-control " +
                                                (this.state.errors.nearest_port_id ? " is-invalid" : "")
                                            }
                                            name="nearest_port_id">
                                            <option value="">Please select</option>
                                            {
                                                staticData.port.map((port) => {
                                                    return <>
                                                        <option value={port.id}>{port.name}</option>
                                                    </>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="button-div">
                            <button type="button" className="btn" onClick={(e)=>{
                                this.handleSubmit(e);
                            }}>Save</button>
                        </div>
                    </form>
                </div>
            </>
        )
    }
}

export default BusinessProfile



