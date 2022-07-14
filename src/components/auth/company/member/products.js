import React from 'react';
import {imageOptimization} from "../../../../helper";
import {images} from "../../../../../constant";
import Link from "next/link";

class SupplierProducts extends React.Component {

    render() {
        return (
            <>
                <div className="col-12 showcase">
                    <div className="col-12 t-box cards">
                        <div className="head col-12">
                            <h4>Product showcase</h4>
                        </div>
                        <div className="shuffle-grid">
                            <div className="main-gallery">
                                <div className="col-md-12">
                                    <div className="row">
                                        {this.props?.products.length ? this.props?.products.map((item, index) => {
                                            return (
                                                <>
                                                    <div className="col-md-4">
                                                        <div className="col-md-12">
                                                            <div className="image">
                                                                <img className="w-100" src={imageOptimization(item?.images?.[0]?.path, 100)}
                                                                    alt=""/>
                                                            </div>
                                                            <Link href={"/product/"+item?.slug}>
                                                                <a>
                                                                    {item?.name}
                                                                </a>
                                                            </Link>
                                                            <h6> { item?.product_trades?.[0]?.price?.replace(/[^+]/g, '') ? "$"+item?.product_trades?.[0]?.price : ""}</h6>
                                                        </div>
                                                    </div>
                                               </>
                                            )
                                        }) :
                                            <div className="no-data d-block" role="alert">
                                                <div className="t-box mb-0 ml-3">
                                                    <img src={images.not_found.default.src}/>
                                                    <h5>No Product Found</h5>
                                                </div>
                                        </div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default SupplierProducts;
