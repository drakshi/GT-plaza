import React from "react";
import AuthSidebar from "../../src/components/common/afterAuth/auth_sidebar";
import UserProductList from "../../src/components/auth/products/product_list";
import FeaturedProduct from "../../src/components/auth/products/feature_products";
import AddProduct from "../../src/components/auth/products/add_product";
import LoadingBar from "react-top-loading-bar";
import {EventEmitter} from "../../src/helper";
import SeoMeta from "../../src/components/common/meta/seo_meta";

class Products extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            progress:0,
            active: "all_products",
            refresh : false,
            refresh_list : false,
            scope : 1,
            scope_list : 0
        };
        // this.handleRefreshProducts = this.handleRefreshProducts.bind(this);
        // this.handleListRefreshProducts = this.handleListRefreshProducts.bind(this);
    }

    componentDidMount() {
        EventEmitter.subscribe('showProducts', () => {
            this.toggleHandle();
        });
    }

    toggleHandle(){
        this.setState({
            progress:30,
            active : "all_products",
        },()=>{
            document.getElementById("product-tab-editable").classList.remove('d-none');
            window.scrollTo(0, 0)
        });
        setTimeout(() => {
            this.setState({ progress: 100 });
        }, 1000);
    }

    // handleRefreshProducts(value){
    //     if ( value.refresh === true && this.state.refresh === false && this.state.scope === value.scope){
    //         this.setState({
    //             progress:30,
    //             refresh : value.refresh,
    //             active : "all_products",
    //             scope : 0
    //         },()=>{
    //             window.scrollTo(0, 0)
    //         });
    //         setTimeout(() => {
    //             this.setState({ progress: 100 });
    //         }, 1000)
    //     }
    // }
    //
    // handleListRefreshProducts(value){
    //     if (value.refresh === true && this.state.refresh_list === false && this.state.scope_list === 0){
    //         this.setState({
    //             progress:30,
    //             refresh_list : value.refresh,
    //             active : "all_products"
    //         },()=>{
    //             document.getElementById("product-tab-editable").classList.remove('d-none');
    //             window.scrollTo(0, 0)
    //         });
    //         setTimeout(() => {
    //             this.setState({ progress: 90 });
    //         }, 1000)
    //     }
    // }

    render() {

        return (<>
            <SeoMeta title={"Add Product - Global Trade Plaza"}
                     description={"Best B2B Marketplace Platform and Top 10 b2b Portal in India is Global Trade Plaza. We are Business to Business Import Export Portal helping companies, Traders and Manufacturers to find Buyers"}
            />
             <LoadingBar progress={this.state.progress} color="blue" />
            {this.props?.show === false ? "" :
                <section className="dashboard">
                    <div className="container-fluid main-content">
                        <div className="row">
                            <AuthSidebar active={"products"}/>
                            <div className="col-md-9 col-12 right p-gt">
                                <div className="heading main">
                                    <h3>Products</h3>
                                </div>
                                <div className="tabbable-panel">
                                    <div className="tabbable-line">
                                        <ul id="product-tab-editable" className={this.props?.show === false ? "nav nav-tabs d-none" : "nav nav-tabs"}>
                                            <li>
                                                <a className={this.state.active === "all_products" ? "active" : ""}
                                                   onClick={() => {
                                                       this.setState({active: "all_products" })
                                                   }}
                                                >All products</a>
                                            </li>
                                            <li>
                                                <a className={this.state.active === "featured_products" ? "active" : ""}
                                                   onClick={() => {
                                                       this.setState({active: "featured_products"})
                                                   }}
                                                >Featured products</a>
                                            </li>
                                            <li>
                                                <a className={this.state.active === "add_product" ? "active" : ""}
                                                   onClick={() => {
                                                       this.setState({active: "add_product"})
                                                   }}
                                                >Add new product</a>
                                            </li>
                                        </ul>
                                        <div className="tab-content product-list">
                                            <UserProductList active={this.state.active} />
                                            <FeaturedProduct active={this.state.active} />
                                            <AddProduct active={this.state.active} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }

        </>)
    }
}
export default Products;



