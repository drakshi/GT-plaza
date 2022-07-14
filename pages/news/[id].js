import React from 'react';
import Comment from "../comment";
import Blog from "../blog";
import API from "../../src/api/api.service";
import LoadingBar from "react-top-loading-bar";
import SeoMeta from "../../src/components/common/meta/seo_meta";
const api = new API();

class SingleNewsEvent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            progress: 0
        };
    }

    static async getInitialProps(ctx) {
        var news_event = [];
        var related_news = [];
        await api.getSingleNewsEvents(ctx.query.id).then(async (success) => {
            news_event = success.data.response;
            await api.getRelatedNews(ctx.query.id, news_event.category_id).then(async (success) => {
                related_news = success.data.response;
            })
        });
        return {
            news_event: news_event,
            related_news: related_news
        }
    }

    componentDidMount() {
        this.setState({progress: 30}, () => {
            setTimeout(() => {
                this.setState({progress: 90});
                if (this.props.news_event?.length > 0 || this.props.related_news?.length > 0) {
                    this.setState({progress: 100})
                } else {
                    this.setState({progress: 0})
                }
            }, 1000)
        })
    }

    render() {

        const news_event = this.props.news_event;
        const related_news = this.props.related_news;

        return <>
            <LoadingBar progress={this.state.progress} color="blue"/>
            <SeoMeta title={news_event.title + " - Global Trade Plaza"}
                     description={"Read Top B2B Blogs, B2B Lead Generation Blog, B2B Marketing Blog, Best B2B Sales Blog on Global Trade Plaza"}
                     image={news_event.image}
            />

            <section className="static pt-4">
                <div className="container blog-list">
                    <div className="col-12 single">
                        <div className="row">
                            <div className="col-12 p-0">
                                <div className="row">
                                    <div className="col-md-9 col-12 box left">
                                        <div className="card mb-3 col-12">
                                            <div className="card-body">
                                                <h1 id="title">{news_event.title}</h1>
                                                <ul>
                                                    <li>Date posted : {news_event.created_at} <span id="date"></span>
                                                    </li>
                                                </ul>
                                                <img id="image_src" src={news_event.image}/>
                                                <button className="mb-2 mr-2 btn btn-primary" id="blog_category">{news_event.category.name}</button>
                                                <div dangerouslySetInnerHTML={{__html: news_event.description}}></div>
                                            </div>
                                        </div>
                                    </div>
                                    <Blog blogs={related_news}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Comment comment={this.props.news_event.comments}/>
            </section>
        </>
    }
}

export default SingleNewsEvent;
