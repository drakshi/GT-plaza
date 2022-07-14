import React from "react";
import {staticData} from "../../../static";
import Link from "next/link";
import {CapitalizeFirstLetter, EventEmitter} from "../../helper";
import Product from "./product";
import {connect} from "react-redux";
import API from "../../api/api.service";
import Lead from "./lead";
import ReactPaginate from "react-paginate";
import Supplier from "./supplier";
const api = new API();

class FilterLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            initial_ssr : 1,
            scope : 1,
            page : 1,
            country : null,
            main_category : null,
            sub_category : null,
            sub_all_category : null,
            child_category : null,
            main_prop_category : null,
            subCategories: [],
            childCategories: []
        };
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleSubCategoryChange = this.handleSubCategoryChange.bind(this);
        this.handleChildCategoryChange = this.handleChildCategoryChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleChildAllCategory = this.handleChildAllCategory.bind(this);
    }

    componentDidMount() {
        if(this.props?.main_category && this.props?.main_category !== this.state.main_prop_category){
           this.setState({
                main_prop_category : this.props?.main_category ,scope : 2
           },()=>{
               api.getSingleSubCategoryById(this.props?.main_category).then((success) => {
                   this.setState({
                       subCategories: success.data.response?.sub_category,
                   })
               });
               api.getSubChildCategories(this.props?.sub_category).then((success) => {
                   this.setState({
                       childCategories: success.data.response,
                   })
               })
           })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props?.main_category && this.props?.main_category !== prevProps.main_category){
            this.setState({
                main_prop_category : this.props?.main_category ,scope : 2
            },()=>{
                api.getSingleSubCategoryById(this.props?.main_category).then((success) => {
                    this.setState({
                        subCategories: success.data.response?.sub_category,
                    })
                });
                api.getSubChildCategories(this.props?.sub_category).then((success) => {
                    this.setState({
                        childCategories: success.data.response,
                    })
                })
            })
        }
        if (this.props.initial_ssr !== prevProps.initial_ssr){
            this.setState({
                initial_ssr : this.props.initial_ssr
            })
        }
    }

    handlePageChange(pageNumber) {
        window.scrollTo(0, 0);
        this.setState({page: pageNumber.selected + 1});
    }

    handleCategoryChange(e) {
        api.getSingleSubCategoryById(e.target.value).then((success) => {
            this.setState({
                subCategories: success.data.response?.sub_category,
                main_category : e.target.value,
                child_category : null,
                sub_category : null
            });
        }).catch((error) => {
            this.setState({
                errorAlert: error.response?.data?.message,
            });
        });
    }

    handleSubCategoryChange(value) {
        api.getSubChildCategories(value).then((success) => {
            this.setState({
                childCategories: success.data.response,
                sub_category : value,
                sub_all_category : value,
                child_category : null,
                main_category :null,
                page : 1
            })
        }).catch((error) => {
            this.setState({
                errorAlert: error.response?.data?.message,
            });
        });
    }

    handleChildAllCategory(value) {
        api.getSubChildCategories(value).then((success) => {
            this.setState({
                sub_category : value,
                child_category : null,
                main_category :null,
                page : 1
            })
        }).catch((error) => {
            this.setState({
                errorAlert: error.response?.data?.message,
            });
        });
    }

    handleChildCategoryChange(value)
    {
      this.setState({child_category : value,main_category :null,sub_category : null,page : 1})
    }

    handleCountryChange(event)
    {
        this.setState({country : event.target.value,page : 0})
    }

    render() {

        { this.props.readCategories({
            'scope' : this.state.scope,
            'page':this.state.page,
            'country': this.state.country,
            'main_category': this.state.main_category,
            'sub_category': this.state.sub_category,
            'child_category': this.state.child_category,
        })}

        return (<>
            <section className="search mt-4">
                <div className="container search-contain">
                    <div className="col-12 head-bc">
                        <div className="col-12 breadcrumb">
                            <div className="col-md-3 col-12 navigation">
                                <p><Link href="/"><a>Home</a></Link> | {this.props.type}</p>
                            </div>
                            <div className="col-md-9 col-12 tag p-0 mt-1">
                                <h1>{this.props.title}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 px-3">
                        <div className="row">
                        <div className="col-md-3 col-12 left" id="filter-main">
                            <div className="col-12 t-box">
                                <div className="mob-head">
                                    <h5>Filters <a className="filter-icon" onClick={()=>{
                                        document.getElementById("filter-main").classList.remove('filterMenu');
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                                            <path fill="currentColor"
                                                  d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                                                  className="">
                                            </path>
                                        </svg>
                                    </a></h5>
                                </div>
                                <div className="col-12 box">
                                    <h5>Location</h5>
                                    <div style={{"position": "relative"}}>
                                        <div className="row">
                                            <div className="col-12 form-group">
                                                <select className="productCountry form-control"
                                                        id="country"
                                                        name="country_id"
                                                        onChange={(e) => {
                                                            this.handleCountryChange(e)
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
                                            <div className="col-12 form-group text-right reset-mark">
                                                <a href="javascript:void(0)" id="resetLocation"
                                                onClick={()=>{
                                                    this.setState({
                                                        country : null,
                                                        main_category : null,
                                                        sub_category : null,
                                                        child_category : null,
                                                        subCategories: [],
                                                        childCategories: []
                                                    })
                                                }}
                                                >Reset</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 box">
                                    <h5>Category</h5>
                                    <form>
                                        <div className="row">
                                            <div className="col-12 form-group">
                                                <select  id="category-post" className="form-control" onChange={(e) => {
                                                    this.handleCategoryChange(e);
                                                }}>
                                                    <option selected disabled>Category(s)</option>
                                                    {
                                                        this.props?.getSupplierCategories?.get_categories?.data?.length ? this.props?.getSupplierCategories?.get_categories?.data.map((category, index) => {
                                                            return (
                                                                <>
                                                                    <option key={index} value={category.id}  selected={this.props?.main_category === category.id} >{CapitalizeFirstLetter(category.name)}</option>
                                                                </>
                                                            )
                                                        }) : ""
                                                    }
                                                </select>
                                            </div>
                                            <div className="col-12 form-group">
                                                <select value={this.props?.sub_category} id="sub-category-post" className="form-control"
                                                        onChange={(e) => {
                                                            this.handleSubCategoryChange(e.target.value);
                                                        }}>
                                                    <option selected disabled>Sub-Category(s)</option>
                                                    {
                                                        this.state.subCategories.length ? this.state.subCategories.map((category, index) => {
                                                            return (
                                                                <>
                                                                    <option key={index} data-iso={category.id}
                                                                            value={category.id}>{CapitalizeFirstLetter(category.name)}</option>
                                                                </>
                                                            )
                                                        }) : ""}
                                                </select>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-12 t-box">
                                <div className="col-12 box">
                                    <h5>Related categories</h5>
                                    <ul className="related">
                                        {this.state.childCategories.length ?
                                            <li className={( (this.state.child_category ? this.state.child_category : this.props?.child_category === undefined ? null :  this.props?.child_category) === null) ? "child_category_li active" : "child_category_li"}>
                                                <a className="child_cate"  onClick={(e) => {
                                                    this.handleChildAllCategory(this.state.sub_all_category ? this.state.sub_all_category : this.props?.sub_category);
                                                }} >All</a>
                                            </li>
                                            : ""}
                                        {
                                            this.state.childCategories.length ? this.state.childCategories.map((category, index) => {
                                                return (
                                                    <>
                                                        <li className={( (this.state.child_category ? this.state.child_category : this.props?.child_category ) === category.id) ? "child_category_li active" : "child_category_li"} value={category.id}>
                                                            <a onClick={()=>{
                                                                this.handleChildCategoryChange(category.id);
                                                            }} className="child_cate" data-id={category.id}>{category.name}</a>
                                                        </li>
                                                    </>
                                                )
                                            }) : ""}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9 col-12 right">
                            <div className="col-12 t-box top-bar">
                                <ul className="">
                                    <li className={this.props.active === 1 ? "active" : ""} onClick={()=>{
                                        EventEmitter.dispatch('initialProducts');
                                        EventEmitter.dispatch('initialSearchSuppliers');
                                    }}>
                                        <Link href={"/search-products"}>
                                            <a id="product-link">Products</a>
                                        </Link>
                                    </li>
                                    <li className={this.props.active === 2 ? "active" : ""} onClick={()=>{
                                        EventEmitter.dispatch('initialLeads');
                                        EventEmitter.dispatch('initialSearchLeads');
                                    }}>
                                        <Link href={"/search-leads"}>
                                            <a id="leads-link">Buy leads</a>
                                        </Link>
                                    </li>
                                    <li className={this.props.active === 3 ? "active" : ""} onClick={()=>{
                                        EventEmitter.dispatch('initialSuppliers');
                                        EventEmitter.dispatch('initialSearchSuppliers');
                                    }}>
                                        <Link href={"/search-suppliers"}>
                                            <a id="supplier-link">Companies</a>
                                        </Link>
                                    </li>
                                </ul>
                                <a className="filter-mob">
                                    <i className="fas fa-filter"></i>
                                    <span>Filters</span>
                                </a>
                            </div>

                            {this.props.active === 1 ?
                                <div className="col-12 products">
                                    <div className="col-12 list" id="showProducts">
                                        {this.props.active === 1 ? <Product list={this.props.list}/> : ""}
                                    </div>
                                </div>
                                : "" }

                            {this.props.active === 2 ?
                                <div className="col-12 leads">
                                        <div className="col-12 list" id="showLeads">
                                            {this.props.active === 2 ? <Lead list={this.props.list}/> : ""}
                                        </div>
                                </div>
                                :"" }

                            {this.props.active === 3 ?
                                <div className="col-12 suppliers">
                                    <div className="col-12 list" id="showSupplier">
                                        {this.props.active === 3 ? <Supplier list={this.props.list}/> : ""}
                                    </div>
                                </div>
                                :"" }

                            {this.props.count > 0 ?
                                <div id="react-paginate" className="float-right" >
                                    <ReactPaginate
                                        forcePage={ this.state.initial_ssr === 1 ? 0 : this.state.page - 1}
                                        previousLabel={<i className="fas fa-chevron-left"></i>}
                                        nextLabel={<i className="fas fa-chevron-right"></i>}
                                        pageCount={this.props.count/10 }
                                        onPageChange={this.handlePageChange.bind(this)}
                                        marginPagesDisplayed={0}
                                        pageRangeDisplayed={9}
                                        breakClassName={'page-item'}
                                        breakLinkClassName={'page-link'}
                                        containerClassName={'pagination'}
                                        pageClassName={'page-item'}
                                        pageLinkClassName={'page-link'}
                                        previousClassName={'page-item'}
                                        previousLinkClassName={'page-link'}
                                        nextClassName={'page-item'}
                                        nextLinkClassName={'page-link'}
                                        activeClassName={'active'}
                                    />
                                </div>
                                : ""}

                        </div>
                    </div>
                    </div>
                </div>
                <a className="filter-button" id="open-filter"  onClick={()=>{
                    document.getElementById("filter-main").classList.add('filterMenu');
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="currentColor"
                              d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"
                              className=""></path>
                    </svg>
                </a>
            </section>
        </>)
    }
};

const mapStateToProps = (state) => ({
    getSupplierCategories: state.CategoryReducer,
});

export default connect(mapStateToProps, null)(FilterLayout);



