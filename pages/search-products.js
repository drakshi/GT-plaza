import React from "react";
import Layout from "../src/components/filters/layout";
import API from "../src/api/api.service";
import Router from 'next/router'
import SeoMeta from "../src/components/common/meta/seo_meta";
import LoadingBar from "react-top-loading-bar";
import {EventEmitter} from "../src/helper";
const api = new API();

class SearchProducts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            progress:0,
            initial_ssr : 1,
            country: null,
            main_category: null,
            child_category: null,
            category: null,
            products: [],
            product_count: 0,
            keyword : null,
            page: 1
        };
        this.handler = this.handler.bind(this);
    }

    componentDidMount() {
        EventEmitter.subscribe('initialProducts', () => {
            this.initialProducts();
        });
    }

    initialProducts(){
        this.setState({
            initial_ssr : 1,
            products : []
        })
    }

    /* static async  getInitialProps(ctx) {
         var products = [];
         var product_count = [];
         await api.getAllProducts({page: 1}).then((success) => {
             products = success.data.response?.products ;
             product_count = success.data.response?.total ;
         });
         return {
             products :products,
             product_count: product_count,
         }
     }*/

    getFilterProducts() {
        api.getAllProducts({
            page: this.state.page,
            keyword : this.state.keyword,
            country : parseInt(this.state.country),
            main_cate: parseInt(this.state.main_category),
            child_cate: parseInt(this.state.child_category),
            category : parseInt(this.state.category)
        },
            this.setState({progress:30 , initial_ssr : 0 }),
            setTimeout(() => {
                this.setState({ progress: 90 });
            }, 500)

        ).then((success) => {
            this.setState({
                progress:100,
                products: success.data.response?.products,
                product_count: success.data.response?.total
            })
        }).catch((error) => {
                this.setState({
                    progress:100,
                    errorAlert: error.response.data.message,
                });
            });
    }

    handler(val) {
        if (val.scope === 1) {
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
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (Router?.query && Router?.query?.keyword && Router?.query?.keyword !== this.state.keyword ){
             this.setState({keyword :  Router?.query?.keyword },()=>{
                 this.getFilterProducts();
             })
        }
        if (prevState.country !== this.state.country && this.state.country !== null){
            this.getFilterProducts();
        }
        if (prevState.main_category !== this.state.main_category && this.state.main_category !== null){
            this.getFilterProducts();
        }
        if (prevState.child_category !== this.state.child_category && this.state.child_category !== null){
            this.getFilterProducts();
        }
        if (prevState.category !== this.state.category && this.state.category !== null){
            this.getFilterProducts();
        }
        if (prevState.page !== this.state.page && this.state.page !== null){
            this.getFilterProducts();
        }
    }

    render() {

        return (<>
            <React.Fragment>
                 <LoadingBar progress={this.state.progress} color="blue" />
                 <SeoMeta title={"Global Trade Plaza | Search Products"}
                    description={"Search for your Products on India's Largest B2B Marketplace, Best B2B Marketplace in India, Top B2B Lead Generating Company in India"}/>
                <Layout active={1}
                        scope={1} //search-products
                        type="Products"
                        title="Best B2B product directory"
                        initial_ssr={this.state.initial_ssr}
                        readCategories={this.handler}
                        list={this.state.products.length > 0 ? this.state.products : this.state.initial_ssr === 1 ? this.props.products : this.state.products}
                        count={this.state.product_count > 0 ? this.state.product_count : this.state.initial_ssr === 1 ? this.props.product_count : this.state.product_count }
                />
            </React.Fragment>
        </>)
    }
}

export async function getStaticProps(ctx) {
    var products = [];
    var product_count = 0;
    await api.getAllProducts({page: 1}).then((success) => {
        products = success.data.response?.products ;
        product_count = success.data.response?.total ;
    }).catch(err => {console.log(err)});
    return {
        props:{products , product_count,fallback:false}
    }
}

export default SearchProducts;



