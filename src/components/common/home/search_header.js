import React from "react";
import Link from "next/link";
import HoverCategories from "./hover_categories";
import API from "../../../api/api.service";
import Router, {withRouter} from "next/router";
import {EventEmitter} from "../../../helper";
const api = new API();
let timerId;

class SearchHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            initial : 0,
            search_type: 1,
            search_by :"name",
            keyword: null,
            search_text: null,
            suggest: [],
        };
        this.updateSearch = this.updateSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {

        EventEmitter.subscribe('initialSearchProducts', () => {
            this.initialSearchReset(1);
        });

        EventEmitter.subscribe('initialSearchLeads', () => {
            this.initialSearchReset(3);
        });

        EventEmitter.subscribe('initialSearchSuppliers', () => {
            this.initialSearchReset(2);
        });

        if (this.props.router.asPath === "/search-products" && parseInt(this.state.search_type) !== 1){
            this.setState({
                search_type : 1
            })
        }

        if (this.props.router.asPath === "/search-suppliers" && parseInt(this.state.search_type) !== 2){
            this.setState({
                search_type : 2
            })
        }

        if (this.props.router.asPath === "/search-leads" && parseInt(this.state.search_type) !== 3){
            this.setState({
                search_type : 3
            })
        }
    }

    initialSearchReset(value){
      this.setState({
          search_text : "",
          search_type : value
      })
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //
    //     if (this.props.router.asPath === "/search-products" && parseInt(this.state.search_type) !== 1){
    //             this.setState({
    //                 search_type : 1
    //             })
    //     }
    //
    //     if (this.props.router.asPath === "/search-suppliers" && parseInt(this.state.search_type) !== 2){
    //         this.setState({
    //             search_type : 2
    //         })
    //     }
    //
    //     if (this.props.router.asPath === "/search-leads" && parseInt(this.state.search_type) !== 3){
    //         this.setState({
    //             search_type : 3
    //         })
    //     }
    // }

    selected(value) {
        this.setState({
            suggest: [],
            search_text: value
        },()=>{

            if (parseInt(this.state.search_type) === 1){
                Router.push("/search-products?keyword="+ value);
            }
            if (parseInt(this.state.search_type) === 3){
                Router.push("/search-leads?keyword="+ value);
            }
            if (parseInt(this.state.search_type) === 2){
                Router.push("/search-suppliers?keyword="+ value);
            }
        })
    }

    handleSearch() {
      this.setState({suggest : [] },()=>{

          if (parseInt(this.state.search_type) === 1){
              Router.push("/search-products?keyword="+ this.state.search_text);
          }
          if (parseInt(this.state.search_type) === 3){
              Router.push("/search-leads?keyword="+ this.state.search_text);
          }
          if (parseInt(this.state.search_type) === 2){
              Router.push("/search-suppliers?keyword="+ this.state.search_text);
          }

      })
    }

    handleChange(e) {
        this.setState({search_type: e.target.value})
    }

    updateSearch = (e) => {

        this.setState({
            initial : 1,
            search_text: e.target.value
        },()=>{
            if(parseInt(this.state.initial) === 1 && this.state.search_text.length === 0){

                if (parseInt(this.state.search_type) === 1){
                    Router.push("/search-products");
                }

                if (parseInt(this.state.search_type) === 2){
                    Router.push("/search-suppliers");
                }

                if (parseInt(this.state.search_type) === 3){
                    Router.push("/search-leads");
                }
            }
        });

        //cancel multiple request
        clearTimeout(timerId);

        //api calling with 100ms delay
        if (e.target.value.length > 3) {
            timerId = setTimeout(
                function () {

                    if (parseInt(this.state.search_type) === 1) {
                        api.homeProductAutoCompleteSearch({keyword: e.target.value}).then(suggestions => {
                            this.setState({
                                suggest: suggestions.data.response ? suggestions.data.response : [],
                                search_by : "name"
                            })
                        })
                    }

                    if (parseInt(this.state.search_type) === 2) {
                        api.homeSupplierAutoCompleteSearch({keyword: e.target.value}).then(suggestions => {
                            this.setState({
                                suggest: suggestions.data.response ? suggestions.data.response : [],
                                search_by : "company_name"
                            })
                        })
                    }

                    if (parseInt(this.state.search_type) === 3) {
                        api.homeLeadAutoCompleteSearch({keyword: e.target.value}).then(suggestions => {
                            this.setState({
                                suggest: suggestions.data.response ? suggestions.data.response : [],
                                search_by : "product_name"
                            })
                        })
                    }

                }.bind(this),
                500
            );
        } else {
            this.setState({
                suggest: []
            })
        }
    };

    render() {

        return (
            <>
                <div className="container-fluid bottom-nav ">
                    <div className="row">
                        <div className="category d-md-none d-lg-block d-xl-block col-md-2 col-lg-2 col-xl-2">
                            {this.props.router.asPath !== "/" ?
                                <>
                                    <h5>All Categories</h5>
                                    <div className="category-list col-md-2 header-dropmenu">
                                        <div className="cd-dropdown-wrapper">
                                            <a className="cd-dropdown-trigger" href="#0">Dropdown</a>
                                            <nav className="cd-dropdown dropdown-is-active">
                                                <h2>Title</h2>
                                                <a href="#0" className="cd-close">Close</a>
                                                <ul className="cd-dropdown-content">
                                                    <HoverCategories/>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                    <div className="menu-backdrop"></div>
                                </> :
                                <Link href={"/suppliers"}>
                                    <h5 style={{"cursor" : "pointer"}}>All Categories</h5>
                                </Link>
                            }
                        </div>
                        <div className="search col-md-12 col-lg-8 col-xl-8">
                            <div className="input-group">
                                <input type="text"
                                       name="search-keyword"
                                       id="search-keyword"
                                       onChange={(e) => {
                                           this.updateSearch(e)
                                       }}
                                       onKeyUp={(e)=>{
                                           if (e.keyCode === 13){
                                               this.handleSearch();
                                           }
                                       }}
                                       value={this.state.search_text}
                                       className="form-control"
                                       placeholder="Type a keyword to search"/>
                                <ul className="search-result search-list" id="searchResult">
                                    {this.state.search_text?.length > 0 && this.state.suggest.length > 0
                                        ? this.state.suggest.map(
                                            (item, index) => {
                                                return (
                                                    <>
                                                        <a href="javascript:void(0)"   onClick={() => {
                                                            this.selected(item[this.state.search_by]);
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
                                                                    item[this.state.search_by]
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
                                <select value={this.state.search_type}  className="form-select form-control dropdown-toggle"
                                        name="type"
                                        id="search_for"
                                        onChange={(e)=>{
                                            this.handleChange(e)
                                        }}
                                        aria-label="Disabled select example">
                                    <option value="1">Products</option>
                                    <option value="2">Companies</option>
                                    <option value="3">Buy leads</option>
                                </select>
                                <button className="btn keyword_btn"
                                        onClick={()=>this.handleSearch()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path fill="currentColor"
                                              d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z">
                                        </path>
                                    </svg>
                                    <span>Search</span>
                                </button>
                            </div>
                            <Link href={"/post-requirement"}>
                                <button className="btn btn-post">Post buy requirement</button>
                            </Link>
                        </div>
                        <div className="contact col-md-2 col-lg-2 col-xl-2 d-md-none d-lg-block d-xl-block">
                            <p>Call: +91 842 908 8885</p>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(SearchHeader);



