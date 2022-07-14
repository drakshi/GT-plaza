import React from "react";
import API from "../../src/api/api.service";
import {images} from "../../constant";
import Link from "next/link";
import SeoMeta from "../../src/components/common/meta/seo_meta";
import LoadingBar from "react-top-loading-bar";
const api = new API();

class SingleTradeShow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            progress:0,
            trad_show_info: null,
        };
    }

    static async getInitialProps(ctx) {

        var trad_show_info = null

        await api.getSingleTradeShow(ctx.query.tradeshow).then(async ( success) => {
            trad_show_info = success.data.response;
            console.log(success.data.response);
        });
        return {
            trad_show_info: trad_show_info,
        }
    }
    componentDidMount() {
        this.setState({progress:30},()=>{
            setTimeout(() => {
                this.setState({ progress: 90 });
                if(this.props.trad_show_info?.length > 0){
                    this.setState({progress:100})
                }
                else{
                    this.setState({progress:0})
                     console.log(this.state.progress)
                }
            }, 1000)
        })
    }
    render() {

        const trad_show_info = this.props.trad_show_info;

        return (<>
            <LoadingBar progress={this.state.progress} color="blue" />
            <SeoMeta title={ trad_show_info?.title + " – Global Trade Plaza" }
                     description={"Watch Upcoming Trade show on India’s Top B2B Marketplace – Global Trade Plaza"}
                     image={trad_show_info?.content_image}
            />

            <section className="static trade-single pt-4">
                <div className="container blog-list">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-10 breadcrumb">
                                <p>
                                    <Link href="/">
                                        <a> Home</a>
                                    </Link> |
                                    <Link href="/tradeshows">
                                        <a> Tradeshows</a>
                                    </Link> |
                                    {' '}{ trad_show_info?.title}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 single">
                        <div className="row">
                            <div className="col-12">
                                <div className="row justify-content-center">
                                    <div className=" col-12 box p-0 mb-3">
                                        <div className="trade-over">
                                            <div className="col-12 banner mb-0"></div>
                                            <h2 className="trade-title" id="title">{trad_show_info?.title}</h2>
                                            <h5><span id="city">{trad_show_info?.city}</span>,<span id="country-html">{trad_show_info?.country.name}</span></h5>
                                            <ul>
                                                <li>Date posted : <span id="date">{trad_show_info?.created_at}</span></li>
                                            </ul>
                                        </div>
                                        <img className="banner-img w-100" src={images.banner_trade.default.src} alt=""/>
                                    </div>
                                    <div className="card mb-3 col-md-7 col-12">
                                        <div className="card-body">
                                            <img className="d-none" id="editor_image" src={trad_show_info?.content_image} alt=""/>
                                            <div className="editor-details" id="content">
                                                <p className="m-0px truncateBlogDesc"
                                                   dangerouslySetInnerHTML={{__html: trad_show_info?.description}}></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-5 trade-gallery pr-0" >
                                        <div className="card">
                                            <div className="col-12 head">
                                                <h4>Tradeshow gallery</h4>
                                            </div>
                                            <div className="no-gallery">
                                                <img className="" src={images.gallery_image.default.src} alt=""/>
                                                <h5 className="fw-bold mt-3">No images found</h5>
                                                <p>No images uploaded for this tradeshow.</p>
                                            </div>
                                            <div className="col-12 p-0" id="galleryWrap">

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
};

export default SingleTradeShow;



