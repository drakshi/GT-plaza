import React from "react";
import {instanceOf} from "prop-types";
import {Cookies} from "react-cookie";
import UserInfoModal from "../modals/user_info_modal";
import API from "../../../api/api.service";
let timerId;
const api = new API();

class RequirementForm extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            data: {
                product_id: this.props.product_info?.product_id !== undefined ? this.props.product_info?.product_id : null ,
                product_name: this.props.product_info?.product_name !== undefined ? this.props.product_info?.product_name : null,
                quantity: null,
                unit_id: null,
                shipping_terms: null,
                payment_modes: [],
                description: null,
            },
            search_text: null,
            suggest: [],
            errorAlert: false,
            term_condition: false,
            verification: false,
            verification_type: 1,
            verification_value: "",
            country_iso: "",
            errors: [],
            show: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckChange = this.handleCheckChange.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
        this.productRef = React.createRef();
        this.quantityRef = React.createRef();
        this.unitRef = React.createRef();
        this.shippingTermRef = React.createRef();
        this.paymentModeRef = React.createRef();
        this.descriptionRef = React.createRef();
    }

    selected(value){
        this.setState({
            data : {...this.state.data, product_name : value },
            suggest : [],
            search_text : null
        })
    }

    updateSearch = (e) => {

        //cancel multiple request
        clearTimeout(timerId);

        //api calling with 100ms delay
        timerId = setTimeout(
            function () {
                this.setState({
                    search_text : e.target.value
                },()=>{
                    api.autoCompProductSearch(e.target.value).then(suggestions => {
                        this.setState({
                            suggest: suggestions.data ? suggestions.data : []
                        })
                    })
                })
            }.bind(this),
            300
        );
    };

    handleChange(event) {
        let inputData = this.state.data;

        if (event.target.name === "payment_modes") {

            const payment_modes = this.state.data.payment_modes;
            const remote_payment_modes = payment_modes.filter((test) => test !== event.target.value);
            payment_modes.filter((val) => val.includes(event.target.value)).length > 0 ?
                this.setState({
                    data: {
                        ...this.state.data,
                        payment_modes: remote_payment_modes
                    }
                })
                :
                this.setState({
                    data: {
                        ...this.state.data,
                        payment_modes: this.state.data.payment_modes.concat(event.target.value)
                    }
                })
        } else {
            inputData[event.target.name] = event.target.value;
            this.setState({data: inputData})
        }
        delete this.state.errors[event.target.name]
    }

    handleCheckChange(event) {
        this.setState({
            term_condition: event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        });
        delete  this.state.errors[event.target.name]
    }

    handleSubmit(event) {
        this.setState({
            errorAlert: null,
            errors: [],
        });
        event.preventDefault();

        let errors = {};

        if (this.state.data.product_name === null || this.state.data.product_name === "") {
            errors["product_name"] = "Enter product_name";
            this.productRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
        }
        if (this.state.data.quantity === null) {
            errors["quantity"] = "Enter quantity";
            this.quantityRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
        }
        if (this.state.data.unit_id === null) {
            errors["unit_id"] = "Please select unit";
            this.unitRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
        }
        if (this.state.data.shipping_terms === null) {
            errors["shipping_terms"] = "Please select shipping terms";
            this.shippingTermRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
        }
        if (this.state.data.payment_modes.length < 1) {
            errors["payment_modes"] = "Please select payment modes";
            this.paymentModeRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
        }
        if (this.state.data.description === null) {
            errors["description"] = "Enter description";
            this.descriptionRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
        }

        if (Object.entries(errors).length > 0){
            return false ;
        }

        this.setState({show: true});
    }

    changeHandler(event) {
        if (event?.submitted === true) {
            this.setState({
                data: {
                    product_name: "",
                    quantity: "",
                    unit_id: "",
                    shipping_terms: "",
                    payment_modes: [],
                    description: "",
                }
            })
        }
        if (event?.show === false) {
            this.setState({
                show : false
            })
        }
    }

    render() {

        {this.props?.checkModalStatus ? this.props?.checkModalStatus({
            status: this.state.show,
            data : this.state.data
        }) : "" }

        return (
            <>
                <form>
                    <div className="row">
                        <div className="col-12 form-group position-relative">
                            <input type="text"
                                   ref={this.productRef}
                                   autoComplete="off"
                                   value={ (this.props.product_info?.product_name !== undefined && this.props.product_info?.product_name !== null) ? this.props.product_info?.product_name : this.state.data.product_name}
                                   className={"form-control valid-control " + (this.state.errors.product_name ? "is-invalid" : "")}
                                   onChange={(e) => {
                                       this.handleChange(e)
                                   }}
                                   onKeyUp={(e) => {
                                       this.updateSearch(e)
                                   }}
                                   disabled={(this.props.product_info?.product_name !== undefined && this.props.product_info?.product_name !== null) ? true : false}
                                   name="product_name"
                                   id="product_name"
                                   aria-describedby="emailHelp"
                                   placeholder="Product name *" required/>

                            <ul className="search-list search-drop">
                                {this.state.search_text?.length > 0 && this.state.suggest.length > 0
                                    ? this.state.suggest.map(
                                        (item, index) => {
                                            return (
                                                <>
                                                    <a href="javascript:void(0)"   onClick={()=>{
                                                        this.selected(item.product_name);
                                                    }}>
                                                        <li
                                                            key={
                                                                index
                                                            }
                                                            style={{
                                                                listStyle:
                                                                    'none',
                                                                display:
                                                                    'inline-block',
                                                                cursor: 'pointer',
                                                            }}
                                                        >
                                                            {
                                                                item.product_name
                                                            }
                                                        </li>
                                                    </a>
                                                    <br/>
                                                </>
                                            )
                                        }
                                    )
                                    : null}
                            </ul>
                        </div>
                        <div className="col-md-6 col-12 form-group append">
                            <input ref={this.quantityRef}
                                   onChange={(e) => {
                                       this.handleChange(e)
                                   }}
                                   value={this.state.data.quantity}
                                   className={"mr-2 form-control valid-control " + (this.state.errors.quantity ? "is-invalid" : "")}
                                   type="number" name="quantity"
                                   id="quantity"
                                   placeholder="Quantity *" required/>
                            <div className="input-group-append ms-2">
                                <select ref={this.unitRef}
                                        value={this.state.data.unit_id}
                                        onChange={(e) => {
                                            this.handleChange(e)
                                        }}
                                        className={"form-control " + (this.state.errors.unit_id ? "is-invalid" : "")}
                                        id="unit-post" name="unit_id"
                                        required>
                                    <option value="" disabled selected>Select</option>
                                    <option value="Bags">Bags</option>
                                    <option value="Carton">Carton</option>
                                    <option value="Dozen">Dozen</option>
                                    <option value="Feet">Feet</option>
                                    <option value="Kilogram">Kilogram</option>
                                    <option value="Meter">Meter</option>
                                    <option value="Metric Ton">Metric Ton</option>
                                    <option value="Pieces">Pieces</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6 col-12 form-group">
                            <select ref={this.shippingTermRef}
                                    value={this.state.data.shipping_terms}
                                    onChange={(e) => {
                                        this.handleChange(e)
                                    }}
                                    className={"payment-terms form-control valid-control " + (this.state.errors.shipping_terms ? "is-invalid" : "")}
                                    name="shipping_terms"
                                    id="shipping_term"
                                    required>
                                <option value="">Select shipping terms</option>
                                <option value="Delivered At Place">Delivered At Place</option>
                                <option value="Delivered Duty Paid">Delivered Duty Paid</option>
                                <option value="Free Alongside Ship">Free Alongside Ship</option>
                                <option value="Free on Board">Free on Board</option>
                                <option value="Cost, Insurance & Freight">Cost, Insurance &
                                    Freight
                                </option>
                            </select>
                        </div>
                        <div ref={this.paymentModeRef} className="col-md-12 col-12 form-group payment_terms">
                            <h6 className="fw-bold mb-0">Select Payment terms</h6>
                            <div
                                className={"col-12 style-checkbox px-3" + (this.state.errors.payment_modes ? " valid-control is-invalid" : "")}>
                                <div className="row">
                                    <div className="col-auto item">
                                        <input id='TT' value="TT" className="terms"
                                               onChange={(e) => {
                                                   this.handleChange(e)
                                               }}
                                               checked={(this.state.data.payment_modes.includes('TT'))}
                                               name="payment_modes"
                                               type='checkbox'/>
                                        <label htmlFor='TT'>
                                            <span></span>
                                            T/T
                                        </label>
                                    </div>
                                    <div className="col-auto item">
                                        <input id='DA' value="DA" className="terms"
                                               onChange={(e) => {
                                                   this.handleChange(e)
                                               }}
                                               checked={(this.state.data.payment_modes.includes('DA'))}
                                               name="payment_modes"
                                               type='checkbox'/>
                                        <label htmlFor='DA'>
                                            <span></span>
                                            D/A
                                        </label>
                                    </div>
                                    <div className="col-auto item">
                                        <input id='LC' value="LC" className="terms"
                                               onChange={(e) => {
                                                   this.handleChange(e)
                                               }}
                                               checked={(this.state.data.payment_modes.includes('LC'))}
                                               name="payment_modes"
                                               type='checkbox'/>
                                        <label htmlFor='LC'>
                                            <span></span>
                                            L/C
                                        </label>
                                    </div>
                                    <div className="col-auto item">
                                        <input id='DP' value="DP" className="terms"
                                               onChange={(e) => {
                                                   this.handleChange(e)
                                               }}
                                               checked={(this.state.data.payment_modes.includes('DP'))}
                                               name="payment_modes"
                                               type='checkbox'/>
                                        <label htmlFor='DP'>
                                            <span></span>
                                            D/P
                                        </label>
                                    </div>
                                    <div className="col-auto item">
                                        <input id='PayPal' value="PayPal" className="terms"
                                               onChange={(e) => {
                                                   this.handleChange(e)
                                               }}
                                               checked={(this.state.data.payment_modes.includes('PayPal'))}
                                               name="payment_modes"
                                               type='checkbox'/>
                                        <label htmlFor='PayPal'>
                                            <span></span>
                                            PayPal
                                        </label>
                                    </div>
                                    <div className="col-auto item">
                                        <input id='WesternUnion' value="WesternUnion" className="terms"
                                               onChange={(e) => {
                                                   this.handleChange(e)
                                               }}
                                               checked={(this.state.data.payment_modes.includes('WesternUnion'))}
                                               name="payment_modes" type='checkbox'/>
                                        <label htmlFor='WesternUnion'>
                                            <span></span>
                                            Western Union
                                        </label>
                                    </div>
                                    <div className="col-auto item">
                                        <input id='Moneygram' value="Moneygram" className="terms"
                                               onChange={(e) => {
                                                   this.handleChange(e)
                                               }}
                                               checked={(this.state.data.payment_modes.includes('Moneygram'))}
                                               name="payment_modes"
                                               type='checkbox'/>
                                        <label htmlFor='Moneygram'>
                                            <span></span>
                                            Money Gram
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 form-group">
                                <textarea ref={this.descriptionRef}
                                          onChange={(e) => {
                                              this.handleChange(e)
                                          }}
                                          value={this.state.data.description}
                                          className={"form-control valid-control " + (this.state.errors.description ? "is-invalid" : "")}
                                          name="description"
                                          id="description" placeholder="Describe your requirement *"
                                          required>
                                </textarea>
                            <div className="col-12 text-center">
                                <button onClick={(e) => {
                                    this.handleSubmit(e)
                                }} type="button" id="requirementButton" className="btn mt-3">
                                    {this.props.type !== 1 ? "Post inquiry" : "Submit my requirements" }
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

                {/*User info modal triggered from Requirement form for post-requirement only*/}
                {this.props.type === 1 &&
                        <UserInfoModal post={this.changeHandler} info={this.state.data} type={this.props.type} show={this.state.show}/>
                }
            </>
        )
    }
}
export default RequirementForm;



