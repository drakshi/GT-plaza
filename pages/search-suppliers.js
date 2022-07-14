import React from "react";
import Layout from "../src/components/filters/layout";
import API from "../src/api/api.service";
import SeoMeta from "../src/components/common/meta/seo_meta";
import LoadingBar from "react-top-loading-bar";
import Router from "next/router";
import {EventEmitter} from "../src/helper";
const api = new API();
let timerId;

class SearchSuppliers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            progress:0,
            initial_ssr: 1,
            country: null,
            main_category: null,
            child_category: null,
            category: null,
            suppliers: [],
            supplier_count: 0,
            keyword : null,
            page: 1
        };
        this.handler = this.handler.bind(this);
    }

    componentDidMount() {
        EventEmitter.subscribe('initialSuppliers', () => {
            this.initialSuppliers();
        });
    }

    initialSuppliers(){
        this.setState({
            initial_ssr : 1,
            suppliers : []
        })
    }

    /*static async getInitialProps(ctx) {
        var suppliers = [];
        var supplier_counts = [];
        await api.getAllSuppliers({page: 1, keyword: null}).then((success) => {
            suppliers = success.data.response?.suppliers;
            supplier_counts = success.data.response?.totalCount;
        });
        return {
            suppliers: suppliers,
            supplier_count: supplier_counts
        }
    }*/

    getFilterSupplier() {

        clearTimeout(timerId);

        timerId = setTimeout(
            function () {
                this.setState({progress:30 , initial_ssr: 0},()=>{
                    setTimeout(() => {
                        this.setState({ progress: 90 });
                    }, 500)
                });

                api.getAllSuppliers({
                    keyword: this.state.keyword,
                    page: this.state.page,
                    country: parseInt(this.state.country),
                    main_cate: parseInt(this.state.main_category),
                    child_cate: parseInt(this.state.child_category),
                    category: parseInt(this.state.category)
                },).then((success) => {
                    this.setState({
                        progress:100,
                        suppliers: success.data.response?.suppliers,
                        supplier_count: success.data.response?.totalCount
                    });
                }).catch((error) => {
                    this.setState({
                        progress:100,
                        errorAlert: error.response.data.message,
                    });
                });
            }
                .bind(this),
            200
        );
    }



    componentDidUpdate(prevProps, prevState, snapshot) {

        if (Router?.query &&  Router?.query?.keyword && Router?.query?.keyword !== this.state.keyword ){
            this.setState({keyword :  Router?.query?.keyword },()=>{
                this.getFilterSupplier();
            })
        }
        if (prevState.country !== this.state.country) {
            this.getFilterSupplier();
        }
        if (prevState.main_category !== this.state.main_category) {
            this.getFilterSupplier();
        }
        if (prevState.child_category !== this.state.child_category) {
            this.getFilterSupplier();
        }
        if (prevState.category !== this.state.category) {
            this.getFilterSupplier();
        }
        if (prevState.page !== this.state.page) {
            this.getFilterSupplier();
        }
    }

    handler(val) {
        this.setState(
            {
                page: val?.page,
                country: val?.country,
                main_category: val?.main_category,
                child_category: val?.sub_category,
                category: val?.child_category,
            }
        );
    }

    render() {

        return (<>

            <SeoMeta title={"Global Trade Plaza | Search companies"}
                     description={"Search worldwide companies to buy best products and services at Global Trade Plaze. We are leading the B2B Marketplace for Buyers who are looking for companies"}/>

                <LoadingBar progress={this.state.progress} color="blue" />
            <Layout active={3}
                    type="Supplier"
                    title="Genuine companies to deal with"
                    initial_ssr={this.state.initial_ssr}
                    readCategories={this.handler}
                    list={this.state.suppliers.length ? this.state.suppliers : this.state.initial_ssr === 1 ? this.props.suppliers : this.state.suppliers}
                    count={this.state.supplier_count ? this.state.supplier_count : this.state.initial_ssr === 1 ? this.props.supplier_count : this.state.supplier_count}
            />
        </>)
    }
}

 export async function getStaticProps(ctx) {
    var suppliers = [];
    var supplier_count = 0;
    await api.getAllSuppliers({page: 1, keyword: null}).then((success) => {
        suppliers = success.data.response?.suppliers;
        supplier_count = success.data.response?.totalCount;
    }).catch(err => {console.log(err)});
    return {
        props:{suppliers, supplier_count,fallback:false},
    }}

export default SearchSuppliers;



