import React from "react";
import Link from "next/link";
import {imageOptimization} from "../../../helper";

class HomeFeatureProducts extends React.Component {

    render() {

        return (
            <>
                <div className="container-fluid featured-home">
                    <div className="row">
                        <div className="products equal-col col-md-9 col-12">
                            <div className="col-12 grid t-box">
                                <div className="head col-12">
                                    <h4>Featured products</h4>
                                    <span>
                                        <Link href={"/search-products"} >
                                             <a>View all <tag className="hide">products</tag></a>
                                        </Link>
                                    </span>
                                </div>
                                <div className="col-12 grid-item">
                                    <div className="row" id="featured_product">

                                        {this.props.featureProducts && this.props.featureProducts.length ? this.props.featureProducts.map((product,index)=>{

                                            return (
                                                <>
                                                    <div className=" col-md-3 tile" key={index}>
                                                        <img className="lazy"
                                                             alt={product.name}
                                                             title={product.name}
                                                             src={ product && product.images.length ? imageOptimization(product.images[0].path,300) : imageOptimization("https://admin.globaltradeplaza.com/public/images/logo-default.png",300)}
                                                        />
                                                        <p>
                                                            <Link href={"/product/"+product.slug}>
                                                                <a>{product.name}</a>
                                                            </Link>
                                                        </p>
                                                    </div>
                                                </>
                                            )
                                        }) : "" }

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ads equal-col col-md-3 col-12">
                            <div className="col-12 t-box list">
                                <ul id="home-vertical">

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
};
export default HomeFeatureProducts;



