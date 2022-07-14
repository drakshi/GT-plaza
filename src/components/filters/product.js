import React from "react";
import {imageOptimization, truncateString} from "../../helper";
import {images} from "../../../constant";
import Link from "next/link";
import InquiryModal from "../common/modals/inquiry_modal";

class Product extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            product_id: null,
            product_name: null
        },
            this.checkStatus = this.checkStatus.bind(this);
    }

    checkStatus(value) {
        if (value !== this.state.show) {
            this.setState({show: value})
        }
    }

    render() {

        return (<>
            {this.props.list?.length ? this.props.list.map((product, index) => {
                return (
                    <>
                        <div className="col-12 t-box cards overflow-visible" key={index}>
                            <div className="row">
                                <div className="label">
                                    <p>{product?.seller?.membership?.plan?.title ? product?.seller?.membership?.plan.title + " member" : "Classic member"}</p>
                                    <img src={product?.seller?.membership?.plan?.badges ? product?.seller?.membership?.plan?.badges : images.classical.default.src} alt=""/>
                                </div>
                                <div className="col-2 product-img">
                                    <i className="fa fa-star"
                                       data-toggle="tooltip"
                                       title="featured">
                                    </i>
                                    <img src={ product?.images?.length > 0 ? imageOptimization( product?.images?.[0]?.['path'], 500) : images.logo_default.default.src}
                                         className="product-img"
                                         alt="product-image"/>
                                </div>
                                <div className="col info">
                                    <div className="row h-100 justify-content-between flex-md-column">
                                        <div className="col-12">
                                            <h6>
                                                <Link href={"/product/" + product?.slug}>
                                                    <a>
                                                        {product?.name}
                                                    </a>
                                                </Link>
                                            </h6>
                                            <p>{truncateString(product?.description, 70)}
                                                {product?.description.length > 70 ?
                                                    <Link href={"/product/" + product?.slug}>
                                                        <a>..show more</a>
                                                    </Link>
                                                    : ""}
                                            </p>
                                            <ul className="attributes mb-0">
                                                <li>Origin
                                                    - {product?.port?.name ? product?.port?.name : "Not-available"}</li>
                                                <li>MOQ
                                                    - 1000 pieces
                                                </li>
                                                <li>Type
                                                    - {product?.business_types.length ? product?.business_types?.map((item) => {
                                                        return item.name;
                                                    }).join(" | ") : "Not-available"}
                                                </li>
                                                <li className="d-none">Payment
                                                    - {product?.payment_terms.length ? product?.payment_terms?.map((item) => {
                                                        return item.name;
                                                    }).join(" | ") : "Not-available"}</li>
                                                <li>Price - {product?.product_trades?.[0]?.price}</li>
                                            </ul>
                                        </div>
                                        <div className="col-12 company-info">
                                            <h6 className="mb-0">
                                                <Link href={"/member/" + product?.seller?.company_profile?.slug}>
                                                    <a>{product?.seller?.company_profile?.company_name}</a>
                                                </Link>
                                            </h6>
                                            <ul className="icons">
                                                <li>
                                                    <img className="certificateOpen" src={images.points.default.src}
                                                         alt=""/>{product?.points} Points
                                                </li>
                                                <li>
                                                    <img
                                                        src={imageOptimization(product?.seller?.company_profile?.country?.flag, 50)}
                                                        alt={product?.seller?.company_profile?.country?.name}/>{product?.seller?.company_profile?.country?.name}
                                                </li>
                                                <li>
                                                    {product?.seller?.verify_certificate === 1 &&
                                                        <a href="javascript:void(0)" onClick={()=>{
                                                            window.open("/certificate/"+product?.seller?.id, 'Certificate', 'width=650,height=600')}
                                                        }>
                                                            <img className="certificateOpen" src={images.approved.default.src} alt="" />
                                                        </a>
                                                    }
                                                    <a className="n-hover">
                                                        <img className="certificateOpen"
                                                             src={images.trusted.default.src} alt=""/>
                                                    </a>
                                                </li>
                                            </ul>
                                            <p className="mb-0">
                                                Business type -
                                                <span className="text-black">
                                                       {product?.business_types.length ? product?.business_types?.map((item) => {
                                                           return item.name;
                                                       }).join(" | ") : "Not-available"}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="col-12 btn-div">
                                            <button className="btn btn-xs contact log-user"
                                                    data-product=" Flexible Extendable Staineless Steal "
                                                    data-id="46389" onClick={() => {
                                                this.setState({
                                                    show: true,
                                                    product_id: product?.id,
                                                    product_name: product.name
                                                })
                                            }}>Contact now
                                            </button>
                                        </div>
                                    </div>
                                </div>
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
               </div>
            }

            { this.props.list?.length > 0 &&
                <InquiryModal product_info={{
                    product_id: this.state.product_id,
                    product_name: this.state.product_name
                }} type={2} checkStatus={this.checkStatus} show={this.state.show}/>
            }
        </>)
    }
}

export default Product;



