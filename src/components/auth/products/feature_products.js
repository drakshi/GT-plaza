import React from "react";
import {images} from "../../../../constant";
import API from "../../../api/api.service";
import {imageOptimization} from "../../../helper";
import LoadingBar from "react-top-loading-bar";

const api = new API();

class FeaturedProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            data: {},
            products: []
        };
    }

    getFeaturedProducts() {
        api.featureProducts(
            this.state.data,
            this.setState({progress: 30}),
            setTimeout(() => {
                this.setState({progress: 90});
            }, 1000)
        ).then((success) => {
            this.setState({products: success.data.response, progress: 100});
        }).catch((error) => {
            this.setState({
                progress: 100
            });
        });
    }

    componentDidMount() {
        this.getFeaturedProducts();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.active !== this.props.active) {
            if (this.props.active === "featured_products") {
                this.getFeaturedProducts();
            }
        }
    }

    render() {

        return (
            <>
                <header>
                    <LoadingBar progress={this.state.progress} color="blue"/>
                </header>
                <div className={this.props.active === "featured_products" ? "tab-pane active" : "tab-pane"}
                     id="featured">
                    <div className="no-data d-none" role="alert" id="note_available_feature">
                        <div className="t-box">
                            <img src={images.not_found.default.src}/>
                            <h4>No enquiry submitted Feature</h4>
                            <h6>
                                <span>Enquiries submitted by you on other seller product will be shown here.</span>
                            </h6>
                            <h6>
                                <span>Browse products from different sellers.</span>
                                <a href="">
                                    <button className="btn">Browse products</button>
                                </a>
                            </h6>
                        </div>
                    </div>
                    <div className="col-12 t-box">
                        <div className="col-12 featured-user">
                            <div className="row" id="featuring">

                                {
                                    this.state.products.length ? this.state.products.map((product, index) => {

                                            return (
                                                <>
                                                    <div className="col-3 block">
                                                        <div className="col-12 t-box">
                                                            <div className="col-12 image p-0">
                                                                <img
                                                                    src={imageOptimization(product?.images?.[0]?.path, 300)}
                                                                    alt=""/>
                                                            </div>
                                                            <p>{product?.name}</p>
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
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default FeaturedProduct;



