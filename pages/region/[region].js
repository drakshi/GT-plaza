import React from "react";
import API from "../../src/api/api.service";
import {images} from "../../constant";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SeoMeta from "../../src/components/common/meta/seo_meta";
const api = new API();

class SingleRegion extends React.Component {

    static async getInitialProps(ctx) {
        var region_info = null

        await api.getSingleRegionDetail(ctx.query.region).then(async (success) => {
            region_info = success.data.response;
        })
        return {
            region_info: region_info,
        }
    }

    render() {

        const region = this.props.region_info;

        const responsive = {
            desktop: {
                breakpoint: {max: 3000, min: 1024},
                items: 5,
                slidesToSlide: 1 // optional, default to 1.
            },
            tablet: {
                breakpoint: {max: 1024, min: 464},
                items: 2,
                slidesToSlide: 1 // optional, default to 1.
            },
            mobile: {
                breakpoint: {max: 464, min: 0},
                items: 1,
                slidesToSlide: 1 // optional, default to 1.
            }
        };

        return (<>

            <SeoMeta title={region?.country?.name +" – Global Trade Plaza"}
                     description={"Global Trade Plaza is the Best B2B Lead Generation Company, We have the Leads of Top Wholesale companies and Manufacturers in the World"}
                     image={region?.country?.flag}
            />

            <section className="static region">
                <div className="col-12 banner">
                    <img src={images.region.default.src} alt=""/>
                    <div className="text" id="countryMain">
                        <img className="flag"
                             src={region?.country?.flag}
                             alt=""/>
                        <h3 className="mb-0">{region?.country?.name}</h3>
                        <h5>Top buyer and seller</h5>
                    </div>
                </div>
                <div className="container career">
                    <div className="col-12 mt-4">
                        <div className="row">
                            <div className="col-md-9 left">
                                <div className="col-12 t-box card">
                                    <div className="head pb-1">
                                        <h4>Featured products</h4>
                                    </div>
                                    <div className="col-12 grid-item">
                                        <div className="row" id="featureProducts">
                                            {region?.featured?.length ? region?.featured.map((product, index) => {

                                                    return (
                                                        <>
                                                            <div className=" col-md-3 tile" key={index}>
                                                                <Link href={'/product/' + product?.slug}>
                                                                    <a>
                                                                        <img src={product?.images?.[0]?.path}/>
                                                                        <p className="singleProduct">{product?.name}</p>
                                                                    </a>
                                                                </Link>
                                                            </div>
                                                        </>
                                                    )
                                                })
                                                : ""
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 right">
                                <div className="col-12 t-box card leads-list">
                                    <div className="head pb-1">
                                        <h4>Latest buy leads</h4>
                                    </div>
                                    <ul className="data-list" id="countryLeads">
                                        {region?.leads?.length ? region?.leads.map((lead, index) => {
                                                return (
                                                    <>
                                                        <li key={index}>
                                                            <Link  href={'/lead/'+lead?.slug}>
                                                                <a>
                                                                    <img title={lead?.country?.name}
                                                                         width="30"
                                                                         height="30"
                                                                         src={lead?.country?.flag}
                                                                         alt={lead?.country?.name} />
                                                                    <span>{lead?.product_name}
                                                                         <br/> Qty -{lead?.quantity}
                                                                         <br/>{lead?.created_at}
                                                                    </span>
                                                                </a>
                                                            </Link>
                                                        </li>
                                                    </>
                                                )
                                            })
                                            : ""
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className="col-12 product-slider supplier-slider">
                                <div className="col-12 t-box cards">
                                    <div className="head col-12">
                                        <h4>Our trusted companies</h4>
                                    </div>
                                    <div className="row owl-related relatedProducts">

                                        <Carousel
                                            ssr
                                            responsive={responsive}
                                            deviceType={"desktop"}
                                            autoPlay={true}
                                            autoPlaySpeed={2000}
                                            infinite={true}
                                            partialVisbile
                                            arrows={false}
                                            itemClass="image-item px-md-2 px-1"

                                        >
                                            { region?.supplier?.length ? region?.supplier.map((supplier, index) => {

                                                    return (
                                                        <>
                                                            <div className="col-12 block" key={index}>
                                                                <Link href={'/member/'+supplier.slug}>
                                                                    <a>
                                                                        <div className="col-12 t-box">
                                                                            <div className="col-12 img">
                                                                                <img height="90"
                                                                                     width="90"
                                                                                     src={supplier.company_logo ? supplier.company_logo : images.logo_default.default.src}
                                                                                     alt={supplier?.company_name} />
                                                                            </div>
                                                                            <p>{supplier?.company_name}</p>
                                                                        </div>
                                                                    </a>
                                                                </Link>
                                                            </div>
                                                        </>
                                                    )
                                                })
                                                : ""
                                            }
                                        </Carousel>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 new">
                                <div className="col-12 t-box card">
                                    <div className="head pb-1">
                                        <h4>New on Global Trade Plaza</h4>
                                        <div className="col-12 grid-item">
                                            <div className="row" id="allProducts">
                                                {region?.products?.length ? region?.products.map((product, index) => {

                                                        return (
                                                            <>
                                                                <div className=" col-md-3 tile" key={index}>
                                                                    <Link href={'/product/' + product?.slug}>
                                                                        <a>
                                                                            <img src={product?.images?.[0]?.path}/>
                                                                            <p className="singleProduct">{product.name}</p>
                                                                        </a>
                                                                    </Link>
                                                                </div>
                                                            </>
                                                        )
                                                    })
                                                    : ""
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>)
    }
}

export default SingleRegion;



