import React from 'react';
import {images} from "../constant";
import API from "../src/api/api.service";
import {staticData} from "../static";
import {CapitalizeFirstLetter, imageOptimization} from "../src/helper";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import SeoMeta from "../src/components/common/meta/seo_meta";
import LoadingBar from "react-top-loading-bar";

const api = new API();

class newsEvents extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            news_events: [],
            news_event_count : null,
            data: {
                keywords: null,
                category_id: null,
                page: 1
            },
            initial: 1
        };
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    static async getInitialProps(ctx) {
        var news_events = [];
        var news_event_count = null ;
        await api.getAllNewsEvents({
            keywords: null,
            category_id: null,
            page: 1
        }).then(success => {
            news_events = success.data.response;
            news_event_count = success.data.message
        });
        return {
            news_events: news_events,
            news_event_count : news_event_count
        }
    }

    componentDidMount() {
        this.setState({progress: 30}, () => {
            setTimeout(() => {
                this.setState({progress: 90});
                if (this.props.news_events?.length > 0) {
                    this.setState({progress: 100})
                } else {
                    this.setState({progress: 0})
                    console.log(this.state.progress)
                }
            }, 1000)
        })
    }

    handlePageChange(pageNumber) {
        window.scrollTo(0, 0);
        this.setState({data: {...this.state.data, page: pageNumber.selected + 1}}, () => {
            this.getFilterNewsEvents()
        });
    }

    handleChange(event) {
        let inputData = this.state.data;
        inputData[event.target.name] = event.target.value;
        this.setState({data: inputData}
        );
    }

    getFilterNewsEvents() {
        this.setState({initial: 0, progress: 30,data: {...this.state.data, page: 1}},
            () => {
                setTimeout(() => {
                    this.setState({progress: 90});
                }, 500);
                api.getAllNewsEvents(this.state.data).then((success) => {
                    this.setState({
                        progress: 100,
                        news_events: success.data.response,
                        news_event_count : success.data.message
                    })
                }).catch((error) => {
                    this.setState({
                        progress: 0,
                        errorAlert: error.response.data.message,
                    });
                });
            });
    }

    render() {

        const news_events = this.state.news_events.length ? this.state.news_events : this.state.initial === 1 ? this.props.news_events : [];
        const news_events_count = this.state.news_event_count ? this.state.news_event_count : this.state.initial === 1 ? this.props.news_event_count : [];

        return (
            <>
                <SeoMeta title={"News & events - Global Trade Plaza"}
                         description={"Best B2B Marketplace Platform and Top 10 b2b Portal in India is Global Trade Plaza. We are Business to Business Import Export Portal helping companies, Traders and Manufacturers to find Buyers"}
                />
                <LoadingBar progress={this.state.progress} color="blue"/>
                <section className="static">
                    <div className="col-12 banner">
                        <img src={images.news_events.default.src} width="780" height="280" data-cfasync="false" alt=""/>
                        <div className="text">
                            <h3>News & Events</h3>
                            <h1>Read the Latest News & Events Update.</h1>
                        </div>
                    </div>
                    <div className="container blog-list event-search">
                        <div className="col-12 t-box card">
                            <div className="head half pb-1 text-center w-100">
                                <h4>Search News & Events</h4>
                            </div>
                            <div className="search-box col-12 pl-0">
                                <div className="row">
                                    <div className="col-md-6 col-12 form-group fields">
                                        <input
                                            type="text"
                                            id="blog_keyword"
                                            value={this.state.data.keywords}
                                            name="keyword"
                                            className="form-control"
                                            placeholder="Search keyword"
                                            onChange={(e) => {
                                                this.handleChange(e)
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-3 col-12 form-group option pl-0">
                                        <select className="form-control" name="category_id" id="category"
                                                value={this.state.data.category_id}
                                                onChange={(e) => {
                                                    this.handleChange(e)
                                                }}>
                                            <option value="" disabled selected>Select</option>
                                            {
                                                staticData.categories.map((category, index) => {
                                                    return (
                                                        <>
                                                            <option key={index} data-iso={category.iso3_code}
                                                                    value={category.id}>{CapitalizeFirstLetter(category.name)}
                                                            </option>
                                                        </>
                                                    )
                                                })}
                                        </select>
                                    </div>
                                    <div className="col-3 form-group btn-action">
                                        <div className="row">
                                            <button className="btn submit filter blog_sub_btn" type="button"
                                                    onClick={(e) => {
                                                        this.getFilterNewsEvents(e)
                                                    }}>Search
                                            </button>
                                            <a id="reset"
                                               className="btn-border"
                                               href="javascript:void(0)"
                                               onClick={(e)=>{
                                                   this.setState({
                                                       initial : 1,
                                                       news_event_count : null,
                                                       data : {
                                                           keywords: "",
                                                           category_id: "",
                                                           page: 1
                                                       }
                                                   },()=>{
                                                       this.getFilterNewsEvents(e);
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
                        <div className="col-12 list">
                            <div className="row">
                                <div className="col-12 left">
                                    <div className="row" id="showBlogList">
                                        {news_events.length ? news_events.map((news_events, index) => {
                                            return (
                                                <>
                                                    <div className="col-md-4 col-12 box">
                                                        <Link href={"/news/" + news_events.slug}>
                                                            <a>
                                                                <div className="card mb-3 col-12">
                                                                    <div className="card-body">
                                                                        <img className="lazy" alt={news_events.title}
                                                                             title={news_events.title}
                                                                             src={imageOptimization(news_events.image, 308)}
                                                                        />
                                                                        <button className="mb-2 mr-2 btn btn-primary">{news_events.category?.name}</button>
                                                                        <h5>{news_events.title}</h5>
                                                                        <ul>
                                                                            <li>Date posted : {news_events.created_at}</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </a>

                                                        </Link>
                                                    </div>
                                                </>
                                            )

                                        }) :

                                            <div className="no-data d-block" role="alert">
                                                <div className="t-box mb-0 ml-3">
                                                    <img src={images.not_found.default.src}/>
                                                    <h5>No Records Found</h5>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    {news_events_count > 1 ?
                                        <div id="react-paginate" className="float-right">
                                            <ReactPaginate
                                                forcePage={this.state.data.page - 1}
                                                previousLabel={<i className="fas fa-chevron-left"></i>}
                                                nextLabel={<i className="fas fa-chevron-right"></i>}
                                                pageCount={news_events_count / 12}
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
                    </div>
                </section>

            </>
        )
    }
}

export default newsEvents;
