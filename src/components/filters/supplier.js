import React from "react";
import {truncateString} from "../../helper";
import Link from "next/link";
import {images} from "../../../constant";
import InquiryModal from "../common/modals/inquiry_modal";
class Supplier extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false
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
            {this.props.list?.length ? this.props.list.map((supplier,index)=>{
                return(
                    <>
                        <div className="col-12 t-box cards" key={index}>
                            <div className="row">
                                <div className="col-md">
                                    <div className="row align-items-center">
                                        <div className="col-md-2 img pe-0">
                                            <img src={
                                                supplier?.company_profile?.company_logo ?
                                                    supplier?.company_profile?.company_logo :
                                                    images.logo_default.default.src

                                            } alt="business-image" />
                                        </div>
                                        <div className="col info">
                                            <h6>
                                                <Link href={"/member/"+supplier?.slug}>
                                                    <a>
                                                        {supplier?.company_profile?.company_name}
                                                    </a>
                                                </Link>
                                            </h6>
                                            <ul className="icons">
                                                <li>
                                                    <img className="certificateOpen" src={images.points.default.src} alt="" />{Math.round(supplier?.score)} Points
                                                </li>
                                                <li>
                                                    <img className="certificateOpen" src={supplier?.company_profile?.country?.flag} alt="" />{supplier?.company_profile?.country?.name}
                                                </li>
                                                <li>
                                                    { supplier?.verify_certificate === 1 &&
                                                        <a href="javascript:void(0)" onClick={()=>{
                                                            window.open("/certificate/"+supplier?.id, 'Certificate', 'width=650,height=600')}
                                                        }>
                                                            <img className="certificateOpen" src={images.approved.default.src} alt="" />
                                                        </a>
                                                    }
                                                    <a className="n-hover">
                                                        <img className="certificateOpen" src={images.trusted.default.src} alt="" />
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-12 info mt-1">
                                            <p className="mb-0 text-grey">{truncateString(supplier?.company_profile?.company_description, 150)}
                                                {supplier?.company_profile?.company_description?.length > 150 ?
                                                    <Link href={"/member/" + supplier?.slug}>
                                                        <a className="more">..show more</a>
                                                    </Link>
                                                    : ""}
                                            </p>
                                            <ul className="details">
                                                <li className="mb-0">Business type -
                                                    <span className="text-black">{supplier?.company_profile?.business_types.length ?
                                                        supplier?.company_profile?.business_types?.map((item) => {
                                                            return item.name;
                                                        }).join(" | ") : "Not-available"}
                                                    </span>
                                                </li>
                                                <li className="mt-0">Major markets -
                                                    <span className="text-black">{supplier?.business_profile?.business_major_market.length ?
                                                        supplier?.business_profile?.business_major_market?.map((item) => {
                                                            return item.name;
                                                        }).join(" | ") : "Not-available"}
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 company-info">
                                    <img src={supplier?.membership?.plan?.banner ?
                                        supplier?.membership?.plan?.banner :
                                        images.classicRank.default.src} alt="" />
                                    <button className="btn contact log-user" data-id="2" onClick={()=>{
                                        this.setState({show: true , product_id : supplier?.id , product_name : null})
                                    }}
                                    >Contact now</button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }) :

                <div className="no-data d-block" role="alert">
                    <div className="t-box mb-0 ml-3">
                        <img src={images.not_found.default.src}/>
                        <h5>No Supplier Found</h5>
                    </div>
                </div>
            }
            <InquiryModal  product_info={{
                product_id : this.state.product_id,
                product_name : this.state.product_name
            }} type={3} checkStatus={this.checkStatus} show={this.state.show}/>
        </>)
    }
}

export default Supplier;



