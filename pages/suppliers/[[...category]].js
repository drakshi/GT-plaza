import React from "react";
import API from "../../src/api/api.service";
import Router, {withRouter} from "next/router";
import AllCategories from "../../src/components/common/categories/all_categories";
import MainCategory from "../../src/components/common/categories/main_category";
import SubCategory from "../../src/components/common/categories/sub_category";
import Layout from "../../src/components/filters/layout";
import SeoMeta from "../../src/components/common/meta/seo_meta";
import {EventEmitter} from "../../src/helper";
const api = new API();


class CategoryInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            category: null,
            category_slug: null,
            sub_category_slug: null,
            category_type: null,
            products: [],
            product_count: null,
            main_category: null,
            sub_category: null,
            child_category: null,
            country: null,
            page: 1,
        };
        this.handler = this.handler.bind(this);
    }

    static async getInitialProps(ctx) {

        var category_type = null;
        var category = null;
        var category_slug = null;
        var sub_category_slug = null;
        var child_category = null;
        var sub_category = null;
        var main_category = null;
        var products = [];
        var product_count = 0;

        if (ctx?.query?.category?.length === 1) {
            await api.getSingleCategory(
                ctx?.query && ctx?.query.category && ctx.query.category.length ?
                    ctx.query && ctx?.query.category[ctx?.query.category.length - 1] :
                    "").then((success) => {
                category_type = 1;
                category = success.data.response;
                category_slug = ctx?.query.category[ctx.query.category.length - 1];
            }).catch((error) => {
                console.log(error.response?.data?.message);
            });
        }

        if (ctx?.query?.category?.length === 2) {

            await api.getSingleSubCategory(
                ctx?.query && ctx?.query.category &&
                ctx?.query.category.length ?
                    ctx?.query && ctx?.query.category[ctx?.query.category.length - 1] :
                    "").then((success) => {
                category_type = 2;
                category = success.data.response;
                sub_category_slug = ctx.query.category[ctx.query.category.length - 1];
                category_slug = ctx.query.category[ctx.query.category.length - 2];
            }).catch((error) => {
                console.log(error.response?.data?.message);
            });
        }


        if (ctx?.query?.category?.length === 3) {

            await api.getSingleCategory(
                ctx?.query && ctx?.query?.category &&
                ctx?.query?.category.length ? ctx?.query && ctx?.query?.category[ctx?.query?.category.length - 1] : "").then(async (success) => {
                category_type = 4;
                category_slug = ctx?.query?.category[2];
                child_category = success.data.response.id;
                sub_category = success.data.response?.parent?.[0]?.id;
                main_category = success.data.response?.parent?.[0]?.parent?.[0]?.id;
                await api.getAllProducts({
                    page: 0,
                    category: parseInt(success.data.response.id)
                }).then((success) => {
                    products = success.data.response?.products;
                    product_count = success.data.response?.total;
                    EventEmitter.dispatch(['changeProgressCategory']) ;
                }).catch((error) => {
                    console.log(error.response.data.message)
                });
            }).catch((error) => {
                console.log(error.response?.data?.message)
            });
        }

        if ((ctx?.query?.category === undefined || ctx?.query?.category === null) && category_type !== 3) {
            category_type = 3
        }

        return {
            category_type: category_type,
            category: category,
            category_slug: category_slug,
            sub_category_slug: sub_category_slug,
            child_category: child_category,
            sub_category: sub_category,
            main_category: main_category,
            products: products,
            product_count: product_count
        }
    }

    handler(val) {

        if (val.scope === 2) {
            if (this.state.main_category !== val.main_category && val.main_category !== null) {
                this.setState({main_category: val.main_category, sub_category: null, child_category: null}, () => {
                    this.getFilterProducts();
                })
            }
            if (this.state.sub_category !== val.sub_category && val.sub_category !== null) {
                this.setState({sub_category: val.sub_category, main_category: null, child_category: null}, () => {
                    this.getFilterProducts();
                })
            }
            if (this.state.child_category !== val.child_category && val.child_category !== null) {
                this.setState({child_category: val.child_category, sub_category: null, main_category: null}, () => {
                    this.getFilterProducts();
                })
            }
            if (this.state.country !== val.country && val.country !== null) {
                this.setState({country: val.country}, () => {
                    this.getFilterProducts();
                })
            }
            if (this.state.page !== val.page && val.page !== 1) {
                this.setState({page: val.page}, () => {
                    this.getFilterProducts();
                })
            }
        }
    }

    getFilterProducts() {
        api.getAllProducts({
            page: this.state.page,
            country: parseInt(this.state.country),
            main_cate: parseInt(this.state.main_category),
            child_cate: parseInt(this.state.sub_category),
            category: parseInt(this.state.child_category)
        }).then((success) => {
            this.setState({
                products: success.data.response?.products,
                product_count: success.data.response?.total
            })
        }).catch((error) => {
            this.setState({
                errorAlert: error.response.data.message,
            });
        });
    }

    render() {

        return (
            <>
                {/*Category Products*/}
                {this.state.category_type === 4 || this.props.category_type === 4 ?
                    <>
                        <SeoMeta title={"Global Trade Plaza | Search Products"}
                                 description={"Search for your Products on India's Largest B2B Marketplace, Best B2B Marketplace in India, Top B2B Lead Generating Company in India"}/>

                        <Layout active={1}
                                scope={2} //supplier-category-products
                                type="Products"
                                title="Best B2B product directory"
                                readCategories={this.handler}
                                main_category={this.state.main_category ? this.state.main_category : this.props.main_category}
                                sub_category={this.state.sub_category ? this.state.sub_category : this.props.sub_category}
                                child_category={this.state.child_category ? this.state.child_category : this.props.child_category}
                                list={this.state.products.length ? this.state.products : this.props.products}
                                count={this.state.product_count ? this.state.product_count : this.props.product_count}/>
                    </>
                    : ""}

                {/*Single Category*/}
                {this.state.category_type === 1 || this.props.category_type === 1 ?
                    <>
                        <SeoMeta
                            title={this.state.category?.name ? this.state.category?.name : this.props.category?.name + " - Global Trade Plaza"}
                            description={"Find your Business related Category at Global Trade Plaza, India's Top B2B Marketplace with all Business related Categories"}
                            image={this.state.category?.image ? this.state.category?.image : this.props.category?.image}
                        />

                        <MainCategory list={this.state.category ? this.state.category : this.props.category}
                                      name={this.state.category?.name ? this.state.category?.name : this.props.category?.name}
                                      description={this.state.category?.description ? this.state.category?.description : this.props.category?.description}/>
                    </>
                    : ""}


                {/*Single Sub-Category*/}
                {this.state.category_type === 2 || this.props.category_type === 2 ?
                    <>
                        <SeoMeta
                            title={this.state.category?.category?.name ? this.state.category?.category?.name : this.props.category?.category?.name + " - Global Trade Plaza"}
                            description={"Find your Business related Category at Global Trade Plaza, India's Top B2B Marketplace with all Business related Categories"}
                            image={this.state.category?.category?.image ? this.state.category?.category?.image : this.props.category?.category?.image}
                        />

                        <SubCategory list={this.state.category ? this.state.category : this.props.category}
                                     sub_name={this.state.category?.category?.parent?.[0]?.name ? this.state.category?.category?.parent?.[0]?.name : this.props.category?.category?.parent?.[0]?.name}
                                     name={this.state.category?.category?.name ? this.state.category?.category?.name : this.props.category?.category?.name}
                                     description={this.state.category?.description ? this.state.category?.description : this.props.category?.description}/>
                    </>
                    : ""}


                {/*All-Categories*/}
                {this.state.category_type === 3 || this.props.category_type === 3 ?
                    <>
                        <SeoMeta title={"Categories - Global Trade Plaza"}
                                 description={"Find your Business related Category at Global Trade Plaza, India's Top B2B Marketplace with all Business related Categories."}
                        />

                        <AllCategories/>
                    </>
                    : ""}

            </>
        )
    }
}


export default withRouter(CategoryInfo);



