import React from 'react';
import {images} from "../constant";
import API from "../src/api/api.service";
import LoadingBar from "react-top-loading-bar";
import ReactPaginate from "react-paginate";
import SeoMeta from "../src/components/common/meta/seo_meta";

const api = new API();

class SuccessStories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initial : 1,
            page : 1 ,
            progress: 0
        }
    };

    handlePageChange(pageNumber) {
        window.scrollTo(0, 0);
        this.setState({page: pageNumber.selected + 1 });
    }

    static async getInitialProps(ctx) {
        var successStories = [];
        await api.getAllSuccessStories(ctx.query.id).then(async (success) => {
            successStories = success.data.response;
        });
        return {
            successStories: successStories
        }
    }

    componentDidMount() {
        this.setState({progress: 30}, () => {
            setTimeout(() => {
                this.setState({progress: 90});
                if (this.props.successStories?.length > 0) {
                    this.setState({progress: 100})
                } else {
                    this.setState({progress: 0})
                }
            }, 1000)
        })
    }

    render() {

        const successStories = this.props.successStories;

        return (
            <>
                <SeoMeta title={"Success stories - Global Trade Plaza"}
                         description={"Best B2B Marketplace Platform and Top 10 b2b Portal in India is Global Trade Plaza. We are Business to Business Import Export Portal helping companies, Traders and Manufacturers to find Buyers"}
                />
                <LoadingBar progress={this.state.progress} color="blue "/>
                <section className="static">
                    <div className="col-12 banner">
                        <img src={images.success.default.src} alt=""/>
                        <div className="text">
                            <h3>Success stories</h3>
                            <h1>Our Stories, Grow with Global Trade Plaza</h1>
                        </div>
                    </div>
                    <div className="container stories pt-0">
                        <div className="row justify-content-center">
                            <div className="col-12 view">
                                <div className="col-12 head half text-center">
                                    <h4 className="mt-4">We are defined by the success of our clients. Their goals,
                                        our mission!</h4>
                                </div>
                                <div className="col-12 p-0">
                                    <div className="col-12 suppliers">
                                        <div className="col-12 p-0" id="paginate">
                                            <div className="col-12 list" id="story-list">
                                                <div className="row">

                                                    {successStories.length ? successStories.map((successStory,index) => {

                                                        if(index >= (this.state.page * 12) - 12 && index <= (this.state.page * 12)-1) {
                                                            return (
                                                                <>
                                                                    <div className="col-sm-4 col-12 video-card">
                                                                        <div className="col-md-12 video-holder">
                                                                            <iframe type="text/html" width="100%"
                                                                                    height="200px"
                                                                                    src={"https://www.youtube.com/embed/" + successStory.youtube_url}
                                                                                    frameBorder="0"
                                                                                    allowFullScreen=""></iframe>
                                                                            <h6 className="text-center mt-1 mb-0">
                                                                                <a className="text-black"
                                                                                   href={successStory.business_link}
                                                                                   rel="noreferrer"
                                                                                   target="_blank"> {successStory.business_name}
                                                                                </a>
                                                                            </h6>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )
                                                        }

                                                    }) : ""}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {this.props.successStories.length > 1 ?
                            <div id="react-paginate" className="float-right" >
                                <ReactPaginate
                                    forcePage={this.state.page - 1}
                                    previousLabel={<i className="fas fa-chevron-left"></i>}
                                    nextLabel={<i className="fas fa-chevron-right"></i>}
                                    pageCount={this.props.successStories.length/12 }
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
                </section>
            </>
        )
    }
}

export default SuccessStories
