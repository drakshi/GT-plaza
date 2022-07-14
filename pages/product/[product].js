import React from "react";
import API from "../../src/api/api.service";
import {images} from "../../constant";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import InquiryModal from "../../src/components/common/modals/inquiry_modal";
import {imageOptimization, truncateString} from "../../src/helper";
import SeoMeta from "../../src/components/common/meta/seo_meta";

const api = new API();

class SingleProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            product_info: null,
            show: false
        },
            this.checkStatus = this.checkStatus.bind(this);
    }

    checkStatus(value) {
        if (value !== this.state.show) {
            this.setState({show: value})
        }
    }

    static async getInitialProps(ctx) {
        var product_info = null;
        var similar_products = [];
        var related_products = [];

        await api.getSingleProduct(ctx.query.product).then(async (success) => {
            product_info = success.data.response;
            await api.getSimilarProducts(product_info?.seller_id, product_info?.categories?.[0]?.id).then(async (success) => {
                similar_products = success.data.response;
                await api.getRelatedProducts(product_info?.categories?.[0]?.id).then(async (success) => {
                    related_products = success.data.response;
                })
            })
        });

        return {
            product_info: product_info,
            similar_products: similar_products,
            related_products: related_products,
        }
    }

    render() {

        const responsive = {
            desktop: {
                breakpoint: {max: 3000, min: 1024},
                items: 1,
                slidesToSlide: 1 // optional, default to 1.
            },
            tablet: {
                breakpoint: {max: 1024, min: 464},
                items: 1,
                slidesToSlide: 1 // optional, default to 1.
            },
            mobile: {
                breakpoint: {max: 464, min: 0},
                items: 1,
                slidesToSlide: 1 // optional, default to 1.
            }
        };

        const related_responsive = {
            desktop: {
                breakpoint: {max: 3000, min: 1024},
                items: 5,
                slidesToSlide: 1 // optional, default to 1.
            },
            tablet: {
                breakpoint: {max: 1024, min: 464},
                items: 3,
                slidesToSlide: 1 // optional, default to 1.
            },
            mobile: {
                breakpoint: {max: 464, min: 0},
                items: 1.5,
                slidesToSlide: 1 // optional, default to 1.
            }
        };

        const ButtonGroup = ({next, previous, ...rest}) => {
            const {
                carouselState: {currentSlide, totalItems, slidesToShow}
            } = rest;

            return (
                <div className="carousel-button-group">
                    <button aria-label="Go to previous slide"
                            className={currentSlide === 0 ? "disable" : "react-multiple-carousel__arrow react-multiple-carousel__arrow--left"}
                            onClick={() => previous()}></button>
                    <button aria-label="Go to next slide"
                            className={currentSlide === totalItems - slidesToShow ? "disable" : "react-multiple-carousel__arrow react-multiple-carousel__arrow--right"}
                            onClick={() => next()}></button>
                </div>
            );
        };

        return (<>

            <SeoMeta title={this.props.product_info?.name + " – Global Trade Plaza"}
                     description={truncateString(this.props.product_info?.description,250)}
                     image={this.props.product_info?.images?.[0]?.path}
                     brand={this.props.product_info?.brand}
            />

            <section className="singles mt-4">
                <div className="container product">
                    <div className="col-12 head-bc">
                        <div className="row">
                            <div className="col-12 breadcrumb">
                                <p><Link href="/"><a>Home</a></Link> | <Link
                                    href="/search-products"><a>Product</a></Link> |
                                    <span id="path_category"> </span> <span
                                        className="name">{this.props.product_info?.name}</span></p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-9 col-12 left">
                            <div className="col-12 products-info">
                                <div className="col-12 t-box cards">
                                    <div className="row">
                                        <div className="col-md-5 col-12 slider">
                                            <div className="banner-slider col-12 p-0">
                                                <Carousel
                                                    ssr
                                                    deviceType={'desktop'}
                                                    arrows={true}
                                                    itemClass="image-item"
                                                    responsive={responsive}
                                                >
                                                    {
                                                        this.props.product_info?.images?.length ? this.props.product_info?.images.map((image, index) => {
                                                            return (
                                                                <>
                                                                    <div className="item d-block">
                                                                        <img
                                                                            src={imageOptimization(image.path,300)}
                                                                            alt=""/>
                                                                    </div>
                                                                </>
                                                            )
                                                        }) : ""}
                                                </Carousel>
                                            </div>
                                        </div>
                                        <div className="col-md-7 col-12 info">
                                            <h1 className="name">{this.props.product_info?.name}</h1>
                                            <ul className="table-ul">
                                                <li>
                                                    <span>Minimum quantity</span>
                                                    <span className="value minimumQuant">
                                                        {this.props.product_info?.product_trades?.[0]?.min_quantity}
                                                        {' '}
                                                        {this.props.product_info?.product_trades?.[0]?.unit?.name}
                                                    </span>
                                                </li>
                                                <li>
                                                    <span>Port of dispatch</span>
                                                    <span className="value dispatch">
                                                        {this.props.product_info?.port?.name ? this.props.product_info?.port?.name : "Not-available"}
                                                    </span>
                                                </li>
                                                <li>
                                                    <span>Type</span>
                                                    <span
                                                        className="value businessType">{this.props.product_info?.business_types.length ? this.props.product_info?.business_types?.map((item) => {
                                                        return item.name;
                                                    }).join(" | ") : "Not-available"}</span>
                                                </li>
                                                <li>
                                                    <span>Processing time</span>
                                                    <span className="value delivery">
                                                        {this.props.product_info?.product_supply?.[0]?.['lead_time']}
                                                        {' '}
                                                        {this.props.product_info?.product_supply?.[0]?.['times']?.['name']}
                                                    </span>
                                                </li>
                                                <li>
                                                    <span>Estimate pricing</span>
                                                    <span
                                                        className="value price">{this.props.product_info?.product_trades[0].price}</span>
                                                </li>
                                                <li>
                                                    <span>Packaging</span>
                                                    <span className="value packing">
                                                        {this.props.product_info?.package?.[0]?.package
                                                            ?
                                                            this.props.product_info?.package?.[0]?.package
                                                            :
                                                            "Not-available"
                                                        }
                                                    </span>
                                                </li>
                                            </ul>
                                            <div className="action col-12">
                                                <button className="btn contact contact_product log-user" data-product=""
                                                        data-id="" type="button" onClick={() => {
                                                    this.setState({show: true})
                                                }}>
                                                    Inquire now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 product-desc">
                                <div className="col-12 t-box cards">
                                    <div className="head col-12">
                                        <h4>Products Description</h4>
                                    </div>
                                    <p className="mb-0" id="description">
                                        {this.props.product_info?.description?.substring(0, 160)}
                                    </p>
                                </div>
                            </div>
                            <div className="col-12 product-specs">
                                <div className="col-12 t-box cards">
                                    <div className="head col-12">
                                        <h4>Products Specification</h4>
                                    </div>
                                    <ul className="table-ul" id="specifications">
                                        {
                                            this.props.product_info?.variants.length ?
                                                this.props.product_info?.variants.map((variant) => {
                                                    return (<>
                                                        <li>
                                                            <span>{variant.attribute}</span>
                                                            <span className="value">{variant.value}</span>
                                                        </li>
                                                    </>)
                                                })
                                                : ""
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-12 right">
                            <div className="col-12 t-box py-0">
                                <div className="col-4 business-card">
                                    <div className="head col-12 mob-icon">
                                        <h4>Supplier information</h4>
                                    </div>
                                    <div className="label">
                                        <div className="icon">
                                            <img src={images.trusted} alt=""/>
                                        </div>
                                        <div className="icon" id="single-prod-cert">
                                            <img src={images.approved} alt=""/>
                                        </div>
                                        <div className="icon">
                                            <p>{this.props.product_info?.seller?.membership?.plan?.title ? this.props.product_info?.seller?.membership?.plan?.title + " member" : "Free member"}</p>
                                            <img id="seller_membership" src={
                                                this.props.product_info?.seller?.membership?.plan?.badges
                                                    ?
                                                    this.props.product_info?.seller?.membership?.plan?.badges
                                                    :
                                                    images.classical.default.src
                                            } alt=""/>
                                        </div>
                                    </div>
                                    <Link href={"/member/"+ this.props.product_info?.seller?.company_profile?.slug}>
                                        <a className="supplier_redirection">
                                            <p className="mb-1" id="company_name">
                                                {this.props.product_info?.seller?.company_profile?.company_name}
                                            </p>
                                        </a>
                                    </Link>
                                    <ul>
                                        <li>
                                            <img id="flag"
                                                 src={this.props.product_info?.seller?.company_profile?.country.flag}
                                                 alt={this.props.product_info?.seller?.company_profile?.country?.name}/>
                                            <span id="country_id"> {this.props.product_info?.seller?.company_profile?.country.name}</span>
                                        </li>
                                    </ul>
                                    <p>
                                        <span>Business type - </span>
                                        <span id="businessType12">
                                            {this.props.product_info?.business_types.length ? this.props.product_info?.business_types?.map((item) => {
                                                return item.name;
                                            }).join(" | ") : "Not-available"}
                                        </span>
                                    </p>
                                    <button className="btn contact contact_supplier log-user" data-product="">Contact
                                        now
                                    </button>
                                </div>
                            </div>
                            <div className="col-12 t-box py-0">
                                <div className="col-12 similar">
                                    <div className="head col-12">
                                        <h4>Similar Products</h4>
                                    </div>
                                    <div className="col-12 list ">
                                        {
                                            this.props.similar_products?.length ? this.props.similar_products.map((product, index) => {
                                                return (
                                                    <>
                                                        <div className="col-12 cards">
                                                            <div className="row">
                                                                <div className="col-2 image">
                                                                    <img
                                                                        src={imageOptimization( product.images[0].path,100)}
                                                                        alt=""/>
                                                                </div>
                                                                <div className="col-8 info">
                                                                    <Link href={"/product/" + product?.slug}>
                                                                        <a> {product?.name}</a>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )

                                            }) : ""}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 product-slider supplier-slider">
                            <div className="col-12 t-box cards">
                                <div className="head col-12">
                                    <h4>Related Products</h4>
                                </div>
                                <div className="row">
                                    <div className="col-12">

                                        <Carousel
                                            ssr
                                            responsive={related_responsive}
                                            deviceType={"desktop"}
                                            autoPlay={true}
                                            infinite={true}
                                            arrows={false}
                                            itemClass="image-item px-md-2 px-1"
                                        >
                                            {
                                                this.props.related_products?.length ? this.props.related_products.map((product, index) => {
                                                    return (
                                                        <>
                                                            <div className="col-12 block">
                                                                <div className="col-12 t-box">
                                                                    <div className="col-12 image">
                                                                        <img src={imageOptimization( product?.images[0].path,150)} alt=""/>
                                                                    </div>
                                                                    <p className="mb-0">
                                                                        <Link href={"/product/" + product?.slug}>
                                                                            <a> {product?.name}</a>
                                                                        </Link>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                }) : ""}
                                        </Carousel>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <InquiryModal type={2} checkStatus={this.checkStatus} show={this.state.show}/>
        </>)
    }
};

export default SingleProduct;



