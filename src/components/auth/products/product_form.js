import React from "react";
import API from "../../../api/api.service";
import {staticData} from "../../../../static";
import {CapitalizeFirstLetter,EventEmitter} from "../../../helper";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {Modal} from "react-bootstrap";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {connect} from "react-redux";
import {addImages} from "../../../redux/action/userAction";
import {NotificationManager} from "react-notifications";
import axios from "axios";
let timerId;
const api = new API();

class ProductForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                category_suggestion: null,
                product_name: null,
                images: [],
                brand: null,
                product_code: null,
                material: null,
                port_of_dispatch: null,
                description: null,
                product_variants: [],
                trade: {
                    unit_id: null, min_quantity: null, max_quantity: null, price: null
                },
                payment_terms_id: [],
                business_type_id: [],
                supply_ability: {
                    lead_time: null, time_availability_id: null, nearest_port_id: null
                },
                pack: {
                    package: null, quantity: null, unit: null
                },
                delivery_time: null,
            },
            search_text: null,
            selected: false,
            show: false,
            suggest: [],
            image: null,
            cropper: null,
            attribute: null,
            value: null,
            errors: [],
            refresh : false
        },

        this.handleTradeChange = this.handleTradeChange.bind(this);
        this.handlePackageChange = this.handlePackageChange.bind(this);
        this.handleSupplierChange = this.handleSupplierChange.bind(this);
        this.handleBusinessTypeChange = this.handleBusinessTypeChange.bind(this);
        this.handleMultiSpecificationChange = this.handleMultiSpecificationChange.bind(this);
        this.handleAddSpecification = this.handleAddSpecification.bind(this);
        this.handleRemoveVariant = this.handleRemoveVariant.bind(this);
        this.setProductData = this.setProductData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.nameRef = React.createRef();
        this.imagesRef = React.createRef();
        this.brandRef = React.createRef();
        this.modelRef = React.createRef();
        this.materialRef = React.createRef();
        this.originRef = React.createRef();
        this.descriptionRef = React.createRef();
        this.tradeUnitRef = React.createRef();
        this.tradeMinRef = React.createRef();
        this.tradeMaxRef = React.createRef();
        this.tradePriceRef = React.createRef();
        this.paymentRef = React.createRef();
        this.businessRef = React.createRef();
        this.supplyLeadTimeRef = React.createRef();
        this.supplyTimeAvailableRef = React.createRef();
        this.packageRef = React.createRef();
        this.packageQuantRef = React.createRef();
        this.packageUnitRef = React.createRef();
        this.portRef = React.createRef();
        this.deliveryRef = React.createRef();
    }

    handleSubmit(event) {

        this.setState({
            errorAlert: null,
            errors: [],
        });

        event.preventDefault();

        let errors = {};

        if (this.state.data.product_name === null || this.state.data.product_name === "") {
            errors["product_name"] = "Please enter product name";
            this.nameRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
            return false;
        }
        if (this.state.data.images.length < 1) {
            errors["images"] = "Please add images";
            this.imagesRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
            return false;
        }
        // if (this.state.data.brand === null || this.state.data.brand === "") {
        //     errors["brand"] = "Enter brand name";
        //     this.brandRef.current.scrollIntoView({
        //         behavior: "smooth",
        //         block: "start",
        //     });
        //     this.setState({errors: errors});
        //     return false;
        // }
        // if (this.state.data.product_code === null || this.state.data.product_code === "") {
        //     errors["product_code"] = "Please enter product code";
        //     this.modelRef.current.scrollIntoView({
        //         behavior: "smooth",
        //         block: "start",
        //     });
        //     this.setState({errors: errors});
        //     return false;
        // }
        // if (this.state.data.material === null || this.state.data.material === "") {
        //     errors["material"] = "Please enter material";
        //     this.materialRef.current.scrollIntoView({
        //         behavior: "smooth",
        //         block: "start",
        //     });
        //     this.setState({errors: errors});
        //     return false;
        // }
        if (this.state.data.port_of_dispatch === null || this.state.data.port_of_dispatch === "") {
            errors["port_of_dispatch"] = "Please enter origin";
            this.originRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
            return false;
        }
        if (this.state.data.description === null || this.state.data.description === "") {
            errors["description"] = "Please enter description";
            this.descriptionRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
            return false;
        }
        if (this.state.data.trade.unit_id === null || this.state.data.trade.unit_id === "") {
            errors["trade_unit"] = "Please enter trade unit";
            this.tradeUnitRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
            return false;
        }
        if (this.state.data.trade.min_quantity === null || this.state.data.trade.min_quantity === "") {
            errors["trade_min"] = "Please enter trade min quantity";
            this.tradeMaxRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
            return false;
        }
        if (this.state.data.trade.max_quantity === null || this.state.data.trade.max_quantity === "") {
            errors["trade_max"] = "Please enter trade max quantity";
            this.tradeMinRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
            return false;
        }
        if (this.state.data.trade.price === null || this.state.data.trade.price === "") {
            errors["trade_price"] = "Please enter trade price";
            this.tradePriceRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
            return false;
        }

        if (this.state.data.payment_terms_id.length < 1) {
            errors["payment_terms"] = "Please select payment terms";
            this.paymentRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
            return false;
        }

        if (this.state.data.business_type_id.length < 1) {
            errors["business_type_id"] = "Please select business types";
            this.businessRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
            return false;
        }

        if (this.state.data.supply_ability.lead_time === null || this.state.data.supply_ability.lead_time === "") {
            errors["supply_ability_lead"] = "Please enter supply lead time";
            this.supplyLeadTimeRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
            return false;
        }

        if (this.state.data.supply_ability.time_availability_id === null || this.state.data.supply_ability.time_availability_id === "") {
            errors["supply_ability_availability"] = "Please enter supply time availability";
            this.supplyTimeAvailableRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
            return false;
        }

        if (this.state.data.pack.package === null || this.state.data.pack.package === "") {
            errors["package_bag"] = "please select package";
            this.packageRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
            return false;
        }
        if (this.state.data.pack.quantity === null || this.state.data.pack.quantity === "") {
            errors["package_quantity"] = "please enter quantity";
            this.packageQuantRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
            return false;
        }
        if (this.state.data.pack.unit === null || this.state.data.pack.unit === "") {
            errors["package_unit"] = "please select unit";
            this.packageUnitRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            this.setState({errors: errors});
            return false;
        }

        // if (this.state.data.delivery_time === null || this.state.data.delivery_time === "") {
        //     errors["delivery_time"] = "please select unit";
        //     this.deliveryRef.current.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //     });
        //     this.setState({errors: errors});
        //     return false;
        // }
        //
        // if (this.state.data.supply_ability.nearest_port_id === null || this.state.data.supply_ability.nearest_port_id === "") {
        //     errors["nearest_port_id"] = "Please select nearest port";
        //     this.portRef.current.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //     });
        //     this.setState({errors: errors});
        //     return false;
        // }

        if (this.props?.type === 2){
            api.updateProduct(
                this.state.data,this.props?.product_id
            )
                .then((success) => {
                        NotificationManager.success(success.data.message);
                         this.setState({refresh : true},()=>{
                             EventEmitter.dispatch('showProducts')
                         });
                    }
                )
                .catch((error) => {
                    this.setState({
                        errorAlert: error.response.data.message,
                    });
                    NotificationManager.error(error.response.data.message);
                });
        }

        if (this.props?.type === 1){
            api.addProduct(
                this.state.data,
            )
                .then((success) => {
                        NotificationManager.success(success.data.message);
                        this.setState({
                            refresh : true,
                            selected : false,
                            data: {
                                category_suggestion: "",
                                product_name: "",
                                images: [],
                                brand: "",
                                product_code: "",
                                material: "",
                                port_of_dispatch: "",
                                description: "",
                                product_variants: [],
                                trade: {
                                    unit_id: "", min_quantity: "", max_quantity: "", price: ""
                                },
                                payment_terms_id: [],
                                business_type_id: [],
                                supply_ability: {
                                    lead_time: "", time_availability_id: "", nearest_port_id: ""
                                },
                                pack: {
                                    package: "", quantity: "", unit: ""
                                },
                                delivery_time: "",
                            },
                        },()=>{
                            EventEmitter.dispatch('showProducts')
                        });
                    }
                )
                .catch((error) => {
                    this.setState({
                        errorAlert: error.response.data.message,
                    });
                    NotificationManager.error(error.response.data.message);
                });
        }
    }

    componentDidMount() {
        this.props.AddImages({
            image: "undefined",
        });
        if (this.props?.type === 2){
            this.setProductData(this.props?.product_id);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.AddedImages !== prevProps.AddedImages) {
            this.setState({data: {...this.state.data, images: this.props.AddedImages}});
        }
    }

    selected(value) {
        this.setState({
            selected: true, data: {...this.state.data, category_suggestion: value}, suggest: [], search_text: null
        })
    }

    updateSearch = (e) => {

        //cancel multiple request
        clearTimeout(timerId);

        //api calling with 100ms delay
        timerId = setTimeout(function () {
            this.setState({
                search_text: e.target.value
            }, () => {
                e.target.value ? api.autoCompProductSearch(e.target.value).then(suggestions => {
                    this.setState({
                        suggest: suggestions.data ? suggestions.data : []
                    })
                }) : this.setState({
                    suggest: []
                })
            })
        }.bind(this), 200);
    };

    handleChange(event) {

        let inputData = this.state.data;

        if (event.target.name === "payment_terms_id") {

            const payment_modes = this.state.data.payment_terms_id;

            const remote_payment_modes = payment_modes.filter((test) => test !== event.target.value);
            payment_modes.filter((val) => val.includes(event.target.value)).length > 0 ? this.setState({
                data: {
                    ...this.state.data, payment_terms_id: remote_payment_modes
                }
            }) : this.setState({
                data: {
                    ...this.state.data, payment_terms_id: this.state.data.payment_terms_id.concat(event.target.value)
                }
            })

        } else {
            inputData[event.target.name] = event.target.value;
            this.setState({data: inputData})
        }
    }

    handleTradeChange(event) {
        let inputData = this.state.data.trade;
        inputData[event.target.name] = event.target.value;
        this.setState({trade: inputData})
    }

    handleSupplierChange(event) {
        let inputData = this.state.data.supply_ability;
        inputData[event.target.name] = event.target.value;
        this.setState({supply_ability: inputData})
    }

    clickHandler = (e) => {
        this.inputElement.click();
    };

    handlePackageChange(event) {
        let inputData = this.state.data.pack;
        inputData[event.target.name] = event.target.value;
        this.setState({pack: inputData})
    }

    handleBusinessTypeChange(value) {
        var types = value.length ? value.map((type) => {
            return type.value
        }) : [];
        this.setState({data: {...this.state.data, business_type_id: types}})
    }

    handleMultiSpecificationChange(event) {
        let inputData = this.state;
        inputData[event.target.name] = event.target.value;
    }

    handleAddSpecification(e) {
        this.setState({
            data: {
                ...this.state.data,
                product_variants: this.state.data.product_variants.concat({
                    attribute: this.state.attribute,
                    value: this.state.value
                })
            }
        }, () => {
            this.setState({attribute: null, value: null})
        })
    }

    handleRemoveVariant(value) {
        var array = this.state.data?.product_variants?.filter(function (val, index) {
            return index !== value
        });
        this.setState({
            data: {
                ...this.state.data, product_variants: array
            }
        })
    }

    onChangeBrochure = (e) => {

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
            url: process.env.NEXT_PUBLIC_BACKEND_URL + 'common/upload',
            data: form,
            headers: {
                'Content-Type': `multipart/form-data`,
            },
        }).then(res => {
            this.setState({
                data: {
                    ...this.state.data,
                    brochure: res.data.response,
                }
            });
        }).catch(er => {
            console.log("something goes wrong", er);
        });
    };

    primary_business = [
        {value: 1, label: 'Manufacturer'},
        {value: 2, label: 'Companies'},
        {value: 3, label: 'Trader'},
        {value: 4, label: 'Distributor'},
        {value: 5, label: 'Reseller'},
        {value: 6, label: 'Wholesaler'},
        {value: 7, label: 'Service Provider'},
    ];

    onChangeImage = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            this.setState({image: reader?.result})
        };
        reader.readAsDataURL(files[0]);
        this.handleShow();
    };

    getCropData = (e) => {
        var cropped_image = this.state.cropper.getCroppedCanvas().toDataURL();
        if (this.state.cropper !== 'undefined' && this.state.cropper !== '') {
            api.uploadImage({logo: cropped_image}).then(res => {
                this.props.AddImages({
                    image: res.data.response,
                });
            });
        }
        this.setState({image: '', cropper: '', cropData: ''});
        this.handleClose();
    };

    removeGalleryFile(value) {

        this.props.AddImages({
            image: "undefined",
        });
        const arr = this.state.data.images.filter((item) => item !== value);
        this.setState({data: {...this.state.data, images: arr}, selectedImages: arr}, () => {
            this.state.data.images.length > 0 ? this.state.data.images.map((val, index) => {
                    this.props.AddImages({
                        image: val,
                    });
                })
                : []
        });
    }

    handleClose() {
        this.setState({show: false})
    }

    handleShow() {
        this.setState({show: true})
    }

    setProductData()
    {
        api.singleProduct(this.props?.product_id).then((success) => {

            this.state.data.images.length < 1 ? success.data.response.images.map((val, index) => {
                    this.props.AddImages({
                        image: val.path
                    });
                })
                : [];

            this.setState({
                    data: {
                        ...this.state.data,
                        product_name: success.data.response?.name,
                        brand: success.data.response?.brand,
                        product_code: success.data.response?.code,
                        material: success.data.response?.material,
                        port_of_dispatch: success.data.response?.port_of_dispatch,
                        description: success.data.response?.description,
                        product_variants: success.data.response?.variants.length > 0 ? success.data.response?.variants?.map((value) => {
                            return { attribute : value.attribute, value : value.value }
                        }) : [],
                        trade: {
                            unit_id: success.data.response?.product_trades?.[0]?.unit_id,
                            min_quantity: success.data.response?.product_trades?.[0]?.min_quantity,
                            max_quantity: success.data.response?.product_trades?.[0]?.max_quantity,
                            price: success.data.response?.product_trades?.[0]?.price
                        },
                        payment_terms_id: success.data.response?.payment_terms.length > 0 ? success.data.response?.payment_terms?.map((value) => {
                            return value.id.toString();
                        }) : [],
                        business_type_id: success.data.response?.business_types.length > 0 ? success.data.response?.business_types?.map((value) => {
                            return value.id
                        }) : [],
                        supply_ability: {
                            lead_time: success.data.response?.product_supply?.[0]?.lead_time,
                            time_availability_id:  success.data.response?.product_supply?.[0]?.time_availability_id,
                            nearest_port_id: success.data.response?.product_supply?.[0]?.nearest_port_id,
                        },
                        pack: {
                            package: success.data.response?.package?.[0]?.package,
                            quantity: success.data.response?.package?.[0]?.quantity,
                            unit: success.data.response?.package?.[0]?.unit,
                        },
                        delivery_time: success.data.response?.delivery_time,
                    }
              });
        });
    }

    render() {

        // this.props.handleRefresh({
        //    refresh : this.state.refresh
        // });

        const animatedComponents = makeAnimated();

        return (<>
            <div>
                <form id="addProductForm" encType="multipart/form-data">

                    <div className="col-12 t-box">
                        <div className="heading">
                            <h3>{this.props.type === 1 ? "ADD " : "EDIT "} PRODUCT</h3>
                            {/*<small className="text-muted font-weight-bold">*/}
                            {/*    <svg viewBox="0 0 512 512" width="16px">*/}
                            {/*        <path fill="orange"*/}
                            {/*              d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z"/>*/}
                            {/*    </svg>*/}
                            {/*    Use of phone number, email address is restricted in all the fields*/}
                            {/*</small>*/}
                        </div>

                        {this.props.type === 2 ? "" :
                            <div className="col-8 form-user">
                                <div className="row box">
                                    <div className="col-4 label">
                                        <p>Search product by name *</p>
                                    </div>
                                    <div className="col-8 form-group">
                                        <div className="col-12 p-0 position-relative" id="input-outer">
                                            <input type="text" name="category_suggestion"
                                                   id="product_name"
                                                   autoComplete="off"
                                                   className="form-control"
                                                   value={this.state.data.category_suggestion}
                                                   placeholder="Search product by name"
                                                   onChange={(e) => {
                                                       this.handleChange(e)
                                                   }}
                                                   onKeyUp={(e) => {
                                                       this.updateSearch(e)
                                                   }}
                                                   required/>

                                            <ul className="search-list">
                                                {this.state.search_text?.length > 0 && this.state.suggest.length > 0 ? this.state.suggest.map((item, index) => {
                                                    return (<>
                                                        <a href="javascript:void(0)">
                                                            <li
                                                                key={index}
                                                                style={{
                                                                    listStyle: 'none',
                                                                    display: 'inline-block',
                                                                    cursor: 'pointer',
                                                                }}
                                                                onClick={() => {
                                                                    this.selected(item.product_name);
                                                                }}
                                                            >
                                                                {item.product_name}
                                                            </li>
                                                        </a>
                                                        <br/>
                                                    </>)
                                                }) : null}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className={ (this.state.selected === true || this.props.type === 2) ? "product_basic_info" : "product_basic_info d-none"}>
                        <div className="col-12 t-box">
                            <div className="heading">
                                <h3>Basic information</h3>
                            </div>
                            <div className="col-8 form-user">
                                <div className="addProduct p-0">
                                    <div className="row box">
                                        <div className="col-4 label">
                                            <p>Name *</p>
                                        </div>
                                        <div className="col-8 form-group">
                                            <input type="text"
                                                   ref={this.nameRef}
                                                   className={
                                                       "form-control valid-control " +
                                                       (this.state.errors.product_name ? " is-invalid" : "")
                                                   }
                                                   value={this.state.data.product_name}
                                                   name="product_name"
                                                   onChange={(e) => {
                                                       this.handleChange(e)
                                                   }}
                                                   aria-describedby="emailHelp"
                                                   placeholder="Enter here .."/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 form-user pt-0">
                                <div className="row box">
                                    <div className="col-4 label">
                                        <p>Product images *</p>
                                        <br/>
                                        <span>Maximum file size - 5Mb</span>
                                        <span>Recommended size  -  1000 X 1000</span>
                                        <span>Files Supported  -  JPG, PNG, JPEG</span>
                                    </div>
                                    <div className="col-8 form-group file-upload" id="images">

                                        {this.state?.data?.images.length ? this.state.data.images.map((image, index) => {
                                            return (
                                                <>
                                                    <div className="file-select square snip0013" key={index}>
                                                        <img className="product_images" src={image} alt=""/>
                                                        <div>
                                                            <a className="remove" id={image}
                                                               onClick={() => this.removeGalleryFile(image)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                     viewBox="0 0 320 512">
                                                                    <path fill="currentColor"
                                                                          d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z">
                                                                    </path>
                                                                </svg>
                                                            </a>
                                                            <a>
                                                                <i className="fas fa-redo-alt right-icon"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }) : ""}
                                        <div onClick={this.clickHandler} ref={this.imagesRef}
                                             className={
                                                 "file-select square valid-control " +
                                                 (this.state.errors.images ? " is-invalid" : "")
                                             }>
                                            <p>Click here to add image</p>
                                            <input ref={input => this.inputElement = input} id="fileInput"
                                                   type="file" className="d-none" onChange={this.onChangeImage}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <input id="uploadedImages" type="hidden" name="product_images"/>
                        </div>
                        <div className="col-12 t-box">
                            <div className="heading">
                                <h3>Basic information</h3>
                            </div>
                            <div className="col-8 form-user">
                                <div className="row box addProduct">
                                    <div className="col-4 label">
                                        <p>Brand name</p>
                                    </div>
                                    <div className="col-8 form-group">
                                        <input type="text"
                                               ref={this.brandRef}
                                               className={
                                                   "form-control valid-control " +
                                                   (this.state.errors.brand ? " is-invalid" : "")
                                               }
                                               value={this.state.data.brand}
                                               name="brand"
                                               aria-describedby="emailHelp"
                                               onChange={(e) => {
                                                   this.handleChange(e)
                                               }}
                                               placeholder="Enter here .."/>
                                    </div>
                                </div>
                                <div className="row box">
                                    <div className="col-4 label">
                                        <p>Model number</p>
                                    </div>
                                    <div className="col-8 form-group">
                                        <input type="text"
                                               ref={this.modelRef}
                                               className={
                                                   "form-control valid-control " +
                                                   (this.state.errors.product_code ? " is-invalid" : "")
                                               }
                                               value={this.state.data.product_code}
                                               name="product_code"
                                               onChange={(e) => {
                                                   this.handleChange(e)
                                               }}
                                               aria-describedby="emailHelp"
                                               placeholder="Enter here .."/>
                                    </div>
                                </div>
                                <div className="row box">
                                    <div className="col-4 label">
                                        <p>Product material </p>
                                    </div>
                                    <div className="col-8 form-group">
                                        <input type="text"
                                               ref={this.materialRef}
                                               className={
                                                   "form-control valid-control " +
                                                   (this.state.errors.material ? " is-invalid" : "")
                                               }
                                               value={this.state.data.material}
                                               name="material"
                                               onChange={(e) => {
                                                   this.handleChange(e)
                                               }}
                                               aria-describedby="emailHelp"
                                               placeholder="Enter here .."/>
                                    </div>
                                </div>
                                <div className="row box">
                                    <div className="col-4 label">
                                        <p>Place of origin *</p>
                                    </div>
                                    <div className="col-8 form-group">
                                        <select ref={this.originRef}
                                                value={this.state.data.port_of_dispatch}
                                                className={
                                                    "form-control valid-control " +
                                                    (this.state.errors.port_of_dispatch ? " is-invalid" : "")
                                                }
                                                name="port_of_dispatch" onChange={(e) => {
                                            this.handleChange(e)
                                        }}>
                                            <option selected={true}>Select</option>
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
                                        <p>Product brochure(10MB Max)</p>
                                    </div>
                                    <div className="col-6 form-group append">
                                        <input type="text" className="form-control"
                                               placeholder="Upload product brochure"
                                               disabled/>
                                        <div className="input-group-append">
                                            <button className="btn">Upload file</button>
                                            <input className="file-select"
                                                   type="file" id="brochure"
                                                   onChange={(e) => {
                                                       this.onChangeBrochure(e)
                                                   }}
                                                   name="logo"/>
                                        </div>
                                    </div>
                                    {this.state.data?.brochure &&
                                        <div className="col-2 form-group append">
                                            <a className="fw-bold" href={this.state.data?.brochure} target="_blank" rel="noreferrer"
                                               id="ibrochure">Click here to view uploaded
                                                brochure</a>
                                        </div>
                                    }
                                    <div className="col-2 form-group append d-none">
                                        <p id="ibrochure-note">Note:
                                            You can add only one brochure at once. To
                                            upload a new brochure simply upload new
                                            file.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12  t-box">
                            <div className="heading">
                                <h3>Detailed description *</h3>
                            </div>
                            <div className="col-12 form-user">
                                <div className="row box addProduct">
                                    <div className="col-12 form-group textarea">
                                            <textarea id="description" name="description"
                                                      onChange={(e) => {
                                                          this.handleChange(e)
                                                      }}
                                                      value={this.state.data.description}
                                                      ref={this.descriptionRef}
                                                      className={
                                                          "form-control valid-control " +
                                                          (this.state.errors.description ? " is-invalid" : "")
                                                      }
                                                      placeholder="describe your product (max 1200 characters)">
                                            </textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 t-box">
                            <div className="heading">
                                <h3>Product Specification</h3>
                            </div>
                            <div className="col-12 form-user user-full">
                                <div className="row box product-specs">
                                    <div className="col-12 form-group append ">

                                        {this.state.data.product_variants.length ? this.state.data.product_variants.map((variant, index) => {
                                            return (
                                                <>
                                                    <div className="row wrapper" key={index}>
                                                        <div className="col-md-4 col-12 form-user att-user"
                                                             id="total_wrapper">
                                                            <div className="col-12 product-att">
                                                                <div className="row box">
                                                                    <div className="col-6 form-group">
                                                                        <input type="text"
                                                                               className="form-control"
                                                                               disabled={true}
                                                                               value={variant.attribute}
                                                                               placeholder="Attribute ex. - color"/>
                                                                    </div>
                                                                    <span>-</span>
                                                                    <div className="col-6 form-group">
                                                                        <input type="text"
                                                                               className="form-control"
                                                                               value={variant.value}
                                                                               disabled={true}
                                                                               placeholder="Value ex. - Red"/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <a href="javascript:void(0);" className="remove_field"
                                                               onClick={() => {
                                                                   this.handleRemoveVariant(index);
                                                               }}>X</a>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }) : ""}

                                        <div className="row wrapper">
                                            <div className="col-md-4 col-12 form-user att-user"
                                                 id="total_wrapper">
                                                <div className="col-12 product-att">
                                                    <div className="row box">
                                                        <div className="col-6 form-group">
                                                            <input type="text"
                                                                   className="form-control"
                                                                   name="attribute"
                                                                   onChange={(e) => {
                                                                       this.handleMultiSpecificationChange(e)
                                                                   }}
                                                                   value={this.state.attribute}
                                                                   placeholder="Attribute ex. - color"/>
                                                        </div>
                                                        <span>-</span>
                                                        <div className="col-6 form-group">
                                                            <input type="text"
                                                                   className="form-control"
                                                                   onChange={(e) => {
                                                                       this.handleMultiSpecificationChange(e)
                                                                   }}
                                                                   value={this.state.value}
                                                                   name="value"
                                                                   placeholder="Value ex. - Red"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="input-group-append">
                                            <button className="btn add_fields btn-primary" type="button"
                                                    onClick={(e) => {
                                                        this.handleAddSpecification(e)
                                                    }}>
                                                Add more
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 t-box">
                            <div className="heading">
                                <h3>Trade information</h3>
                            </div>
                            <div className="col-lg-11 col-12 form-user">
                                <div className={"row box trade-info"}>
                                    <div className="col-4 label">
                                        <p>Unit type *</p>
                                    </div>
                                    <div className="col-8 form-group select">
                                        <div className="col-12 p-0">
                                            <select ref={this.tradeUnitRef}
                                                    className={
                                                        "form-control valid-control" +
                                                        (this.state.errors.trade_unit ? " is-invalid" : "")
                                                    }
                                                    value={this.state.data.trade?.unit_id}
                                                    onChange={(e) => {
                                                        this.handleTradeChange(e)
                                                    }}
                                                    name="unit_id">
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
                                        <div className="input-row append">
                                            <input type="number"
                                                   ref={this.tradeMinRef}
                                                   className={
                                                       "form-control valid-control" +
                                                       (this.state.errors.trade_min ? " is-invalid" : "")
                                                   }
                                                   value={this.state.data.trade?.min_quantity}
                                                   name="min_quantity"
                                                   onChange={(e) => {
                                                       this.handleTradeChange(e)
                                                   }}
                                                   aria-describedby="emailHelp"
                                                   id="trade_min"
                                                   placeholder="Min quantity"/>
                                            <input type="number"
                                                   ref={this.tradeMaxRef}
                                                   className={
                                                       "form-control valid-control" +
                                                       (this.state.errors.trade_max ? " is-invalid" : "")
                                                   }
                                                   value={this.state.data.trade?.max_quantity}
                                                   name="max_quantity"
                                                   onChange={(e) => {
                                                       this.handleTradeChange(e)
                                                   }}
                                                   aria-describedby="emailHelp"
                                                   id="trade_max"
                                                   placeholder="Max quantity"/>
                                            <input type="text"
                                                   ref={this.tradePriceRef}
                                                   className={
                                                       "form-control valid-control" +
                                                       (this.state.errors.trade_price ? " is-invalid" : "")
                                                   }
                                                   value={this.state.data.trade?.price}
                                                   name="price"
                                                   onChange={(e) => {
                                                       this.handleTradeChange(e)
                                                   }}
                                                   aria-describedby="emailHelp"
                                                   id="trade_price"
                                                   placeholder="Price in USD"/>
                                        </div>
                                        <br/>
                                    </div>
                                </div>
                                <div className="row box">
                                    <div className="col-4 label">
                                        <p>Accepted payment *</p>
                                    </div>
                                    <div ref={this.paymentRef}
                                         className={
                                             "col-8 form-group style-checkbox" +
                                             (this.state.errors.payment_terms ? " is-invalid" : "")
                                         }
                                    >
                                        <div className="col-12 item">
                                            <input name="payment_terms_id"
                                                   onChange={(e) => {
                                                       this.handleChange(e)
                                                   }}
                                                   checked={(this.state.data.payment_terms_id.includes('1'))}
                                                   className="payment_terms_id" id='TT'
                                                   value="1"
                                                   type='checkbox'/>
                                            <label htmlFor="TT">
                                                <span></span>
                                                T/T
                                            </label>
                                        </div>
                                        <div className="col-12 item">
                                            <input name="payment_terms_id"
                                                   onChange={(e) => {
                                                       this.handleChange(e)
                                                   }}
                                                   checked={(this.state.data.payment_terms_id.includes('2'))}
                                                   className="payment_terms_id" id='DA'
                                                   value="2"
                                                   type='checkbox'/>
                                            <label htmlFor='DA'>
                                                <span></span>
                                                D/A
                                            </label>
                                        </div>
                                        <div className="col-12 item">
                                            <input name="payment_terms_id"
                                                   onChange={(e) => {
                                                       this.handleChange(e)
                                                   }}
                                                   checked={(this.state.data.payment_terms_id.includes('3'))}
                                                   className="payment_terms_id" id='LC'
                                                   value="3"
                                                   type='checkbox'/>
                                            <label htmlFor='LC'>
                                                <span></span>
                                                L/C
                                            </label>
                                        </div>
                                        <div className="col-12 item">
                                            <input name="payment_terms_id"
                                                   onChange={(e) => {
                                                       this.handleChange(e)
                                                   }}
                                                   checked={(this.state.data.payment_terms_id.includes('4'))}
                                                   className="payment_terms_id" id='DP'
                                                   value="4"
                                                   type='checkbox'/>
                                            <label htmlFor='DP'>
                                                <span></span>
                                                D/P
                                            </label>
                                        </div>
                                        <div className="col-12 item">
                                            <input name="payment_terms_id"
                                                   onChange={(e) => {
                                                       this.handleChange(e)
                                                   }}
                                                   checked={(this.state.data.payment_terms_id.includes('5'))}
                                                   className="payment_terms_id"
                                                   id='PayPal' value="5"
                                                   type='checkbox'/>
                                            <label htmlFor='PayPal'>
                                                <span></span>
                                                PayPal
                                            </label>
                                        </div>
                                        <div className="col-12 item">
                                            <input name="payment_terms_id"
                                                   onChange={(e) => {
                                                       this.handleChange(e)
                                                   }}
                                                   checked={(this.state.data.payment_terms_id.includes('6'))}
                                                   className="payment_terms_id"
                                                   id='WesternUnion' value="6"
                                                   type='checkbox'/>
                                            <label htmlFor='WesternUnion'>
                                                <span></span>
                                                Western Union
                                            </label>
                                        </div>
                                        <div className="col-12 item">
                                            <input name="payment_terms_id"
                                                   onChange={(e) => {
                                                       this.handleChange(e)
                                                   }}
                                                   checked={(this.state.data.payment_terms_id.includes('7'))}
                                                   className="payment_terms_id"
                                                   id='Moneygram'
                                                   value="7"
                                                   type='checkbox'/>
                                            <label htmlFor='Moneygram'>
                                                <span></span>
                                                Money Gram
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row box">
                                    <div className="col-4 label">
                                        <p>Business Types *</p>
                                    </div>
                                    <div ref={this.businessRef}
                                         className={
                                             "col-8 form-group select valid-control" +
                                             (this.state.errors.business_type_id ? " is-invalid" : "")
                                         }>
                                        <Select
                                            onChange={(e) => {
                                                this.handleBusinessTypeChange(e)
                                            }}
                                            value={this.state.data.business_type_id.length > 0 ? this.primary_business.filter(obj => this.state.data.business_type_id.includes(obj.value)) : []}
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            options={this.primary_business}
                                            isMulti
                                        />
                                    </div>
                                </div>
                                <div className="row box logistics">
                                    <div className="col-8 label">
                                        <p>Processing Time</p>
                                    </div>
                                    <div className="col-8 form-group select">
                                        <div className={"input-row append"}>
                                            <input type="number"
                                                   ref={this.supplyLeadTimeRef}
                                                   className={
                                                       "form-control unit-pack valid-control" +
                                                       (this.state.errors.supply_ability_lead ? " is-invalid" : "")
                                                   }
                                                   value={this.state.data?.supply_ability?.lead_time}
                                                   onChange={(e) => {
                                                       this.handleSupplierChange(e)
                                                   }}
                                                   name="lead_time"
                                                   aria-describedby="emailHelp"
                                                   placeholder="lead time"/>
                                            <select ref={this.supplyTimeAvailableRef}
                                                    className={
                                                        "s_unit form-control valid-control" +
                                                        (this.state.errors.supply_ability_availability ? " is-invalid" : "")
                                                    }
                                                    value={this.state.data?.supply_ability?.time_availability_id}
                                                    onChange={(e) => {
                                                        this.handleSupplierChange(e)
                                                    }}
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
                                <h3>Packaging information *</h3>
                            </div>
                            <div className="col-lg-11 col-12 form-user">
                                <div className="row box package-info">
                                    <div className="col-4 label">
                                        <p>Packed</p>
                                    </div>
                                    <div className={"col-8 form-group select"}>
                                        <div className="input-row append">
                                            <div>
                                                <select ref={this.packageRef}
                                                        className={
                                                            "unit-pack form-control valid-control " +
                                                            (this.state.errors.package_bag ? " is-invalid" : "")
                                                        }
                                                        value={this.state.data?.pack?.package}
                                                        onChange={(e) => {
                                                            this.handlePackageChange(e)
                                                        }} name="package">
                                                    <option disabled selected>Select</option>
                                                    <option value="bag">Bag</option>
                                                    <option value="carton">Carton box</option>
                                                    <option value="bottle">bottle</option>
                                                    <option value="Customised">Customised</option>
                                                </select>
                                            </div>
                                            <div>
                                                <input type="number"
                                                       onChange={(e) => {
                                                           this.handlePackageChange(e)
                                                       }}
                                                       ref={this.packageQuantRef}
                                                       className={
                                                           "unit-pack form-control valid-control " +
                                                           (this.state.errors.package_quantity ? " is-invalid" : "")
                                                       }
                                                       value={this.state.data?.pack?.quantity}
                                                       name="quantity"
                                                       aria-describedby="emailHelp"
                                                       placeholder="quantity"
                                                       id="unit_quantity"/>
                                            </div>
                                            <div>
                                                <select
                                                    ref={this.packageUnitRef}
                                                    className={
                                                        "unit-pack form-control valid-control " +
                                                        (this.state.errors.package_unit ? " is-invalid" : "")
                                                    }
                                                    value={this.state.data?.pack?.unit}
                                                    onChange={(e) => {
                                                        this.handlePackageChange(e)
                                                    }}
                                                    name="unit">
                                                    <option disabled selected>Select</option>
                                                    <option value="pieces">Pieces</option>
                                                    <option value="ksg">Kgs</option>
                                                    <option value="litters">Litters</option>
                                                </select>
                                            </div>
                                        </div>
                                        <br/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 t-box">
                            <div className="heading">
                                <h3>Logistics information</h3>
                            </div>
                            <div className="col-8 form-user">
                                <div className="row box logistic-info">
                                    <div className="col-4 label">
                                        <p>Delivery time</p>
                                    </div>
                                    <div className="col-8 form-group time">
                                        <div className="input-row ">
                                            <input type="number"
                                                   ref={this.deliveryRef}
                                                   className={
                                                       "form-control valid-control " +
                                                       (this.state.errors.delivery_time ? " is-invalid" : "")
                                                   }
                                                   value={this.state.data?.delivery_time}
                                                   onChange={(e) => {
                                                       this.handleChange(e)
                                                   }}
                                                   name="delivery_time"
                                                   aria-describedby="emailHelp"
                                                   placeholder="Enter here .."/>
                                            <span>In days</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row box">
                                    <div className="col-4 label">
                                        <p>Nearest Ports</p>
                                    </div>
                                    <div className="col-8 form-group">
                                        <select ref={this.portRef}
                                                className={
                                                    "form-control valid-control " +
                                                    (this.state.errors.nearest_port_id ? " is-invalid" : "")
                                                }
                                                value={this.state.data?.supply_ability?.nearest_port_id}
                                                name="nearest_port_id"
                                                onChange={(e) => {
                                                    this.handleSupplierChange(e)
                                                }}
                                        >
                                            <option selected={true}>Select</option>
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
                        <div>
                            <small className="text-muted font-weight-bold">
                                <svg viewBox="0 0 512 512" width="16px">
                                    <path fill="orange"
                                          d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z"/>
                                </svg>
                                Use of phone number, email address is restricted in all
                                the fields
                            </small>
                        </div>
                        <div className="button-div">
                            <button type="button" className="btn" onClick={(e) => {
                                this.handleSubmit(e)
                            }}>Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <Modal
                show={this.state.show}
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
                                initialAspectRatio={1}
                                preview=".img-preview"
                                guides={true}
                                src={this.state.image}
                                cropBoxResizable={false}
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
        </>)
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        AddedImages: state.ImageReducer.images,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        AddImages: (val) => dispatch(addImages({type: 'MULTI_IMAGES', data: val})),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm)



