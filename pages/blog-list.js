import React from "react";
import {images} from "../constant";
import Link from "next/link";
import API from "../src/api/api.service";
import ReactPaginate from "react-paginate";
import {CapitalizeFirstLetter, imageOptimization} from "../src/helper";
import SeoMeta from "../src/components/common/meta/seo_meta";
import LoadingBar from "react-top-loading-bar";

const api = new API();

class BlogList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            initial: 1,
            blog_count: null,
            blogs: [],
            data: {
                keyword: null,
                topic_id: null,
                category_id: null,
                page: 1
            }
        };
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    static async getInitialProps(ctx) {
        var blog_count = null;
        var blogs = [];
        var categories = [];
        var topics = [];

        await api.getAllBlogs({
            keyword: null,
            topic_id: null,
            category_id: null,
            page: 1
        }).then(success => {
            blogs = success.data.response;
            blog_count = success.data.message;
        });

        await api.getBlogCategories().then(success => {
            categories = success.data.response;
        });

        await api.getBlogTopics().then(success => {
            topics = success.data.response;
        });

        return {
            blog_count : blog_count,
            blogs: blogs,
            categories: categories,
            topics: topics
        }
    }

    componentDidMount() {
        this.setState({progress: 30}, () => {
            setTimeout(() => {
                this.setState({progress: 90});
                if (this.props.blogs.length > 0 || this.props.categories.length > 0 || this.props.topics.length > 0) {
                    this.setState({progress: 100})
                } else {
                    this.setState({progress: 0})
                }
            }, 1000)
        })
    }

    handlePageChange(pageNumber) {
        window.scrollTo(0, 0);
        this.setState({data: {...this.state.data, page: pageNumber.selected + 1}}, () => {
            this.getFilterBlogs()
        });
    }

    handleChange(event) {
        let inputData = this.state.data;
        inputData[event.target.name] = event.target.value;
        this.setState({data: inputData});
    }

    getFilterBlogs() {
        this.setState({active: 1, progress: 30, initial: 0},
            () => {
                setTimeout(() => {
                    this.setState({progress: 90});
                }, 1000);
                api.getAllBlogs(this.state.data).then((success) => {
                    this.setState({
                        progress: 100,
                        blogs: success.data.response,
                        blog_count: success.data.message
                    })
                }).catch((error) => {
                    this.setState({
                        errorAlert: error.response.data.message,
                    });
                })
            });
    }

    render() {

        const blogs = this.state.blogs.length ? this.state.blogs : this.state.initial === 1 ? this.props.blogs : [];
        const blog_count = this.state.blog_count ? this.state.blog_count : this.state.initial === 1 ? this.props.blog_count : 0;
        const categories = this.props.categories;
        const topics = this.props.topics;
        return (
            <>
                <SeoMeta
                    title={"List Of Top B2B Blogs, B2B Lead Generation Blog, Best B2B Sales Blog, B2B Marketing Blog"}
                    description={"Read Top B2B Blogs, B2B Lead Generation Blog, B2B Marketing Blog, Best B2B Sales Blog on Global Trade Plaza"}/>

                <LoadingBar progress={this.state.progress} color="blue"/>
                <section className="static">
                    <div className="col-12 banner no-text">
                        <img src={images.banner_blog.default.src} alt=""/>
                        <div className="text">
                            <h3>Our Blogs</h3>
                            <h1>Read Latest B2B Blogs </h1>
                        </div>
                    </div>
                    <div className="container blog-list">
                        <div className="col-12 t-box card">
                            <div className="head half pb-1 text-center w-100">
                                <h4>Blogs List</h4>
                            </div>
                            <div className="search-box search-blog col-12">
                                <div className="row">
                                    <div className="col-md-12 col-12 form-group pl-0">
                                        <div className="row">
                                            <div className="col-md-3 col-12 form-group options">
                                                <input type="text"
                                                       value={this.state.data.keyword}
                                                       name="keyword"
                                                       className="form-control"
                                                       placeholder="Search keyword"
                                                       onChange={(e) => {
                                                           this.handleChange(e)
                                                       }}
                                                />
                                            </div>
                                            <div className="col-md-3 col-12 form-group options pl-0 mb-1">
                                                <select className="form-control"
                                                        value={this.state.data.category_id}
                                                        name="category_id"
                                                        id="category_id"
                                                        onChange={(e) => {
                                                            this.handleChange(e)
                                                        }}
                                                >
                                                    <option value="" selected disabled>Select</option>
                                                    {
                                                        categories.length ? categories.map((category, index) => {
                                                            return (
                                                                <>
                                                                    <option key={index}
                                                                            value={category.id ? category.id : ""}>{CapitalizeFirstLetter(category.name)}</option>
                                                                </>
                                                            )
                                                        }) : ""}
                                                </select>
                                            </div>
                                            <div className="col-md-3 col-12 form-group options pl-0">
                                                <select className="form-control"
                                                        name="topic_id"
                                                        value={this.state.data.topic_id}
                                                        id="topic-post"
                                                        onChange={(e) => {
                                                            this.handleChange(e)
                                                        }}
                                                >
                                                    <option value="" selected disabled>Select</option>
                                                    {
                                                        topics.length ? topics.map((topic, index) => {
                                                            return (
                                                                <>
                                                                    <option key={index}
                                                                            value={topic.id ? topic.id : ""}>{CapitalizeFirstLetter(topic.topic_name)}</option>
                                                                </>
                                                            )
                                                        }) : ""}
                                                </select>
                                            </div>
                                            <div className="col-3 form-group btn-action">
                                                <div className="row">
                                                    <button className="btn submit filter blog_key_btn"
                                                            type="button"
                                                            onClick={(e) => {
                                                                this.getFilterBlogs(e)
                                                            }}
                                                    >Search
                                                    </button>
                                                    <a id="reset"
                                                       className="btn-border"
                                                       href="javascript:void(0)"
                                                       onClick={(e) => {
                                                           this.setState({
                                                               initial : 1,
                                                               data: {
                                                                   keyword: "",
                                                                   topic_id: "",
                                                                   category_id: "",
                                                                   page: 1
                                                               }
                                                           }, () => {
                                                               this.getFilterBlogs(e);
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
                                    <div className="col-12 left">
                                        <div className="row" id="showBlogList">

                                            {blogs.length ? blogs.map((blog, index) => {

                                                return (
                                                    <>
                                                        <div className="col-md-4 col-12 box">
                                                            <Link href={"/blog/" + blog?.slug}>
                                                                <a>
                                                                    <div className="card mb-3 col-12">
                                                                        <div className="card-body">
                                                                            <img className="lazy"
                                                                                 src={imageOptimization(blog.image, "308x170")}/>
                                                                            <button
                                                                                className="mb-2 mr-2 btn btn-primary">{blog.category?.name}
                                                                            </button>
                                                                            <h5>{blog.title}</h5>
                                                                            <ul>
                                                                                <li>Date posted : {blog.created_at}</li>
                                                                                <li>Comments
                                                                                    : {blog.comments.length}</li>
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
                                                        <h5>No Blog Found</h5>
                                                    </div>
                                                 </div>
                                            }

                                        </div>
                                        <div className="pagination-box" id="pagination-links-all-leads">
                                            {blog_count > 1 ?
                                                <div id="react-paginate" className="float-right">
                                                    <ReactPaginate
                                                        forcePage={this.state.data.page - 1}
                                                        previousLabel={<i className="fas fa-chevron-left"></i>}
                                                        nextLabel={<i className="fas fa-chevron-right"></i>}
                                                        pageCount={blog_count / 10}
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
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default BlogList;
