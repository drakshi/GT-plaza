import React from "react";
import {images} from "../constant";
import API from "../src/api/api.service";
import Link from "next/link";
import {staticData} from "../static";
import {CapitalizeFirstLetter, imageOptimization} from "../src/helper";
import ReactPaginate from "react-paginate";
import SeoMeta from "../src/components/common/meta/seo_meta";
import LoadingBar from "react-top-loading-bar";
const api = new API();

class Tradeshows extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            initial : 1,
            progress:0,
            trade_shows: [],
            data : {
                keywords: null,
                city: null,
                country_id: null,
                page :1
            }
        };
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    static async getInitialProps(ctx) {
        var trade_shows = [];
        await api.getAllTradeShows({
            keywords: null,
            city: null,
            country_id: null,
            page : 1
        }).then(success => {
            trade_shows = success.data.response;
        });
        return {
            trade_shows: trade_shows
        }
    }

    componentDidMount() {
        this.setState({progress:30},()=>{
            setTimeout(() => {
                this.setState({ progress: 90 });
                if(this.props.trade_shows.length > 0){
                    this.setState({progress:100})
                }
                else{
                    this.setState({progress:0})
                }
            }, 1000)
        })
    }

    handlePageChange(pageNumber) {
        window.scrollTo(0, 0);
        this.setState({ data :{ ...this.state.data , page: pageNumber.selected + 1 }});
    }

    handleChange(event) {
        let inputData = this.state.data;
        inputData[event.target.name] = event.target.value;
        this.setState({data: inputData});
    }

    getFilterTradeShow() {
        api.getAllTradeShows(this.state.data,
            this.setState({progress:30 ,initial : 0 }),
            setTimeout(() => {
                this.setState({ progress: 90 });
            }, 1000)
        ).then((success) => {
            this.setState({
                progress:100,
                trade_shows: success.data.response
            })
        }).catch((error) => {
            this.setState({
                progress:100,
                errorAlert: error.response.data.message,
            });
        });
    }

    render() {

        const trade_shows =  this.state.trade_shows.length ?  this.state.trade_shows : this.state.initial === 1 ? this.props.trade_shows : []  ;

        return (
            <>
                <LoadingBar progress={this.state.progress} color="blue"/>
                <SeoMeta title={"Upcoming Trade Show – Global Trade Plaza"}
                         description={"Watch Upcoming Trade show on India’s Top B2B Marketplace – Global Trade Plaza"}/>

                <section className="static">
                    <div className="col-12 banner">
                        <img src={images.banner_trade.default.src} width="780" height="280" data-cfasync="false" alt=""/>
                        <div className="text">
                            <h3>Trade shows</h3>
                            <p>The best way to connect with the right people in the B2B marketplace.</p>
                        </div>
                    </div>
                    <div className="container tradeshow">
                        <div className="col-12 t-box card">
                            <div className="head half pb-1 text-center w-100">
                                <h1>Upcoming Trade Show – Global Trade Plaza</h1>
                            </div>
                            <div className="search-box search-trade col-12">
                                <div className="row">
                                    <div className="col-12 form-group px-0">
                                        <div className="row">
                                            <div className="col-md-3 col-12 form-group pr-0 mt-2">
                                                <input type="text"
                                                       name="keywords"
                                                       className="form-control"
                                                       placeholder="Enter Keywords"
                                                       value={this.state.data.keywords}
                                                       onChange={(e)=>{
                                                           this.handleChange(e)
                                                        }}
                                                />
                                            </div>
                                            <div className="col-md-3 col-12 form-group mt-2">
                                                <input type="text"
                                                       name="city"
                                                       className="form-control"
                                                       value={this.state.data.city}
                                                       placeholder="Enter City"
                                                       onChange={(e)=>{
                                                           this.handleChange(e)
                                                       }}
                                                />
                                            </div>
                                            <div className="col-md-3 col-12 form-group mt-2">
                                                <select className="form-control valid-control"
                                                        name="country_id"
                                                        value={this.state.data.country_id}
                                                        onChange={(e)=>{
                                                            this.handleChange(e)
                                                        }}
                                                >
                                                    <option value="" disabled selected>Select country</option>
                                                    {
                                                        staticData.countries.map((country, index) => {
                                                            return (
                                                                <>
                                                                    <option key={index} data-iso={country.iso3_code}
                                                                            value={country.id}>{CapitalizeFirstLetter(country.name)}</option>
                                                                </>
                                                            )
                                                        })}
                                                </select>
                                            </div>
                                            <div className="col-md-3 col-12 form-group btn-action pe-md-2 pe-0">
                                                <div className="row mt-md-2 mt-0">
                                                    <button className="btn" type="button"
                                                            onClick={(e)=>{
                                                                this.setState({ data :{ ...this.state.data , page: 1 }},()=>{
                                                                    this.getFilterTradeShow(e);
                                                                })
                                                            }}>
                                                        Search
                                                    </button>
                                                    <a id="reset"
                                                       className="btn-border"
                                                       href="javascript:void(0)"
                                                       onClick={(e)=>{
                                                          this.setState({
                                                              initial : 1,
                                                              data : {
                                                                  keywords: "",
                                                                  city: "",
                                                                  country_id: "",
                                                                  page :1
                                                              }
                                                          },()=>{
                                                              this.getFilterTradeShow(e);
                                                          })
                                                       }}
                                                    >
                                                        Reset
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 list">
                            <div className="col-md-12 trade-show" id="paginate">
                                <div className="row">
                                    { trade_shows.length ? trade_shows.map((trade_show, index) => {
                                        if(index >= (this.state.data.page * 12) - 12 && index <= (this.state.data.page * 12)-1) {
                                            return (
                                                <>
                                                    <div className="col-md-4 col-lg-3 col- box">
                                                        <div className="col-12 t-box text-center" key={index}>
                                                            <Link href={"/trade-show/" + trade_show.slug}>
                                                                <a>
                                                                    <div className="col-12 block px-0">
                                                                        <img className="lazy" alt={trade_show.title}
                                                                             title={trade_show.title}
                                                                             src={imageOptimization(trade_show.featured_image, 300)}
                                                                        />
                                                                        <p className="mb-0">{trade_show.start_date ? trade_show.start_date : "Not-Available"}</p>
                                                                        <h6 className="mb-0">{trade_show.title}</h6>
                                                                        <p className="mb-0">{trade_show.city},{trade_show?.country?.name}</p>
                                                                    </div>
                                                                </a>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }
                                    }) :
                                        <div className="no-data d-block" role="alert">
                                            <div className="t-box mb-0 ml-3">
                                                <img src={images.not_found.default.src}/>
                                                <h5>No Trade show Found</h5>
                                            </div>
                                        </div>
                                    }
                                </div>
                                {trade_shows.length > 1 ?
                                    <div id="react-paginate" className="float-right" >
                                        <ReactPaginate
                                            forcePage={this.state.data.page - 1}
                                            previousLabel={<i className="fas fa-chevron-left"></i>}
                                            nextLabel={<i className="fas fa-chevron-right"></i>}
                                            pageCount={trade_shows.length/12 }
                                            onPageChange={this.handlePageChange.bind(this)}
                                            marginPagesDisplayed={0}
                                            pageRangeDisplayed={10}
                                            breakClassName={'page-item'}
                                            breakLinkClassName={'page-link'}
                                            containerClassName={'pagination'}
                                            pageClassName={'page-item'}
                                            pageLinkClassName={'page-link'}
                                            previousClassName={'page-item'}
                                            previousLinkClassName={'page-link'}
                                            nextClassName={'page-item'}
                                            nextLinkClassName={'page-link'}
                                            activeClassName={'active'}
                                        />
                                    </div>
                                    : ""}
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default Tradeshows;
