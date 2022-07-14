import React from "react";
import {images} from "../../../../constant";
import API from "../../../api/api.service";
import ProductForm from "./product_form";
import Products from "../../../../pages/user/products";
import {confirmAlert} from "react-confirm-alert";
import {NotificationManager} from "react-notifications";
import {EventEmitter, imageOptimization} from "../../../helper";
import LoadingBar from "react-top-loading-bar";
const api = new API();

class UserProductList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            progress:0,
            data: {
                keyword: null,
                status: null
            },
            product_id: null,
            show: false,
            products: [],
            refresh : false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleFeatured = this.handleFeatured.bind(this);
        // this.handleRefresh = this.handleRefresh.bind(this);
    }

    componentDidMount() {
        this.getUserProducts();
        EventEmitter.subscribe('showProducts', () => {
            this.toggleHandle();
        });
    }

    toggleHandle(){
        this.setState({
           show : false
        },()=>{
            document.getElementById("product-tab-editable").classList.remove('d-none');
            window.scrollTo(0, 0)
        });
        setTimeout(() => {
            this.setState({ progress: 100 });
        }, 1000);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.state.products.length !== prevState.products.length){
            this.getUserProducts();
        }
        if (prevProps.active !== this.props.active){
            if (this.props.active === "all_products") {
                this.getUserProducts();
            }
        }
    }

    handleSearch() {
        this.getUserProducts();
    }

    deleteProduct(id){
        api.deleteProduct(
            id
        ).then((success) => {
            this.getUserProducts();
            NotificationManager.success(success.data.message);
        }).catch((error) => {
            NotificationManager.error(error.response.data.message);
        });
    }

    handleFeatured(id){
        api.markAsFeatured(
            id
        ).then((success) => {
            this.getUserProducts();
            NotificationManager.success(success.data.message);
        }).catch((error) => {
            NotificationManager.error(error.response.data.message);
        });
    }

    handleDelete(id) {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p>Want to delete this product.</p>
                        <button onClick={onClose}>Cancel</button>
                        <button
                            onClick={() => {
                                this.deleteProduct(id);
                                onClose();
                            }}
                        >
                            Confirm
                        </button>
                    </div>
                );
            }
        });
    }

    getUserProducts() {

        api.userProducts(
            this.state.data,
            this.setState({progress:30}),
        setTimeout(() => {
            this.setState({ progress: 90 });
        }, 1000)
        ).then((success) => {
            this.setState({products: success.data.response, progress:100});
        }).catch((error)=>{
            this.setState({progress:100})
        });
    }

    handleChange(event) {
        let inputData = this.state.data;
        inputData[event.target.name] = event.target.value;
        this.setState({data: inputData});
    }

    // handleRefresh(value) {
    //     if (value.refresh !== this.state.refresh) {
    //         this.setState({
    //             refresh: value.refresh,
    //             show : false
    //         })
    //     }
    // }

    render() {

        // this.props.handleListRefreshProducts({
        //     refresh: this.state.refresh
        // });

        return (
            <>
                <LoadingBar progress={this.state.progress} color="blue" />
                {this.state.show === false ?
                    <div className={this.props.active === "all_products" ? "tab-pane active" : "tab-pane"} id="all">
                        <div className="col-12 t-box search-box blank">
                            <div className="input-group mb-0">
                                <input name="keyword"
                                       id="key_search"
                                       className="form-control"
                                       placeholder="search"
                                       value={this.state.data.keyword}
                                       type="text"
                                       onChange={(e) => {
                                           this.handleChange(e)
                                       }}
                                />
                                <button id="search_btn" className="btn ms-1" onClick={() => {
                                    this.handleSearch()
                                }}>
                                    <span>Search</span>
                                    <svg viewBox="0 0 512 512">
                                        <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"/>
                                    </svg>
                                </button>
                                <button id="search_btn" className="btn ms-1" onClick={() => {
                                    this.setState({
                                        data: {
                                            keyword: "",
                                            status: ""
                                        }
                                    }, () => {
                                        this.handleSearch()
                                    })
                                }}>
                                    <span>Reset</span>
                                    <svg viewBox="0 0 512 512">
                                        <path d="M449.9 39.96l-48.5 48.53C362.5 53.19 311.4 32 256 32C161.5 32 78.59 92.34 49.58 182.2c-5.438 16.81 3.797 34.88 20.61 40.28c16.97 5.5 34.86-3.812 40.3-20.59C130.9 138.5 189.4 96 256 96c37.96 0 73 14.18 100.2 37.8L311.1 178C295.1 194.8 306.8 223.4 330.4 224h146.9C487.7 223.7 496 215.3 496 204.9V59.04C496 34.99 466.9 22.95 449.9 39.96zM441.8 289.6c-16.94-5.438-34.88 3.812-40.3 20.59C381.1 373.5 322.6 416 256 416c-37.96 0-73-14.18-100.2-37.8L200 334C216.9 317.2 205.2 288.6 181.6 288H34.66C24.32 288.3 16 296.7 16 307.1v145.9c0 24.04 29.07 36.08 46.07 19.07l48.5-48.53C149.5 458.8 200.6 480 255.1 480c94.45 0 177.4-60.34 206.4-150.2C467.9 313 458.6 294.1 441.8 289.6z"/>
                                    </svg>
                                </button>
                                <select value={this.state.data.status} name="status" onChange={(e) => {
                                    this.handleChange(e)
                                }} id="search_status" className="form-control ms-3">
                                    <option value="">Status</option>
                                    <option value="1">Approved</option>
                                    <option value="0">Pending for approval</option>
                                    <option value="2">Rejected</option>
                                </select>
                            </div>
                        </div>
                        <div className="no-data d-none " role="alert" id="note_available">
                            <div className="t-box">
                                <img src={images.not_found.default.src}/>
                                <h4>No Product added</h4>
                                <h6><span>Product added from you will be shown here.</span>
                                </h6>
                                <h6>
                                    <span>Want to add a new product now.</span>
                                    <button
                                        className="btn hide_product add_products"
                                        data-toggle="tab">Add new product
                                    </button>
                                </h6>
                            </div>
                        </div>
                        <div id="paginate">
                            <div className="col-12 t-box">
                                { this.state.products.length > 0 ?
                                <div className="table">
                                    <table id="showProducts">
                                        {
                                            this.state.products.length ? this.state.products.map((product, index) => {
                                                return (
                                                    <>
                                                        <tr>
                                                            <td>
                                                                <img src={imageOptimization( product?.images?.[0]?.path , 300)} alt=""/>
                                                            </td>
                                                            <td className="pl-0"><span>{product.name}</span></td>
                                                            <td><span>{product.created_at}</span></td>
                                                            <td>
                                                                <span>{product.status === 0 && "Pending"}{product.status === 1 && "Approved"}{product.status === 2 && "Rejected"}</span>
                                                            </td>
                                                            <td>
                                                                <a id="feature_product"
                                                                   onClick={()=>{this.handleFeatured(product?.id)}}
                                                                   title={product?.is_featured === 1 ? "un-mark this product as featured" : "mark this product as featured"}
                                                                   className={product?.is_featured === 1 ? "btn feature featured" : "btn feature"}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                                         viewBox="0 0 576 512">
                                                                        <path fill="currentColor"
                                                                              d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                                                                              className="">
                                                                        </path>
                                                                    </svg>
                                                                </a>
                                                                <a className="btn edit" title="edit this product"
                                                                   onClick={() => {
                                                                       this.setState({product_id: product.id}, () => {
                                                                           this.setState({show: true},()=>{
                                                                               document.getElementById("product-tab-editable").classList.add('d-none');
                                                                           })
                                                                       })
                                                                   }}
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                                         viewBox="0 0 576 512">
                                                                        <path fill="currentColor"
                                                                              d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"
                                                                              className="">
                                                                        </path>
                                                                    </svg>
                                                                </a>
                                                                <a id="delete_product"
                                                                   title="delete this product"
                                                                   className="btn delete"
                                                                   onClick={() => {
                                                                       this.handleDelete(product.id)
                                                                   }}
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                                         viewBox="0 0 448 512">
                                                                        <path fill="currentColor"
                                                                              d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"
                                                                              className="">
                                                                        </path>
                                                                    </svg>
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </>
                                                )

                                            }) : ""
                                        }
                                    </table>
                                </div>
                                    :
                                    <div className="no-data d-block" role="alert">
                                        <div className="t-box mb-0 ml-3">
                                            <img src={images.not_found.default.src}/>
                                            <h5>No Product Found</h5>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    : ""}

                {this.state.show === true &&
                        <>
                            <Products show={false}/>
                            <ProductForm type={2} product_id={this.state.product_id}/>
                        </>
                }

            </>
        )
    }
}
export default UserProductList;



