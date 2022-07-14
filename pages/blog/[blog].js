import React from "react";
import API from "../../src/api/api.service";
import {images} from "../../constant";
import Link from "next/link";
import {imageOptimization} from "../../src/helper";
import SeoMeta from "../../src/components/common/meta/seo_meta";
const api = new API();
import LoadingBar from "react-top-loading-bar";
class Blog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            progress:0,
            blog_info: null,
        };
    }

    static async getInitialProps(ctx) {

        var blog_info = null;
        var related_blogs = [];

        await api.getSingleBlog(ctx.query.blog).then(async (success) => {
            blog_info = success.data.response;

            await api.getRelatedBlogs(ctx.query.blog,blog_info.category_id).then(async (success) => {
                related_blogs = success.data.response;
            })
        });

        return {
            blog_info: blog_info,
            related_blogs : related_blogs
        }
    }
    componentDidMount() {
        this.setState({progress:30},()=>{
            setTimeout(() => {
                this.setState({ progress: 90 });
                if(this.props.blog_info.length > 0 || this.props.related_blogs.length >0){
                    this.setState({progress:100})
                }
                else{
                    this.setState({progress:0})
                }
            }, 1000)
        })
    }

    render() {

        const blog_info = this.props.blog_info;
        const related_blogs = this.props.related_blogs ;

        return (<>
            <LoadingBar progress={this.state.progress} color="blue" />
            <SeoMeta title={blog_info.title + " - Global Trade Plaza"}
                     description={"Read Top B2B Blogs, B2B Lead Generation Blog, B2B Marketing Blog, Best B2B Sales Blog on Global Trade Plaza"}
                     image={blog_info.image}
            />

            <section className="static">
                <div className="container blog-list">
                    <div className="col-12 single">
                        <div className="row">
                            <div className="col-12 header">
                                <div className="row">
                                    <div className="col-10 breadcrumb">
                                        <p>
                                            <Link href="/">
                                                <a>Home</a>
                                            </Link> |
                                            <Link href={"/blog-list"}>
                                                <a> Blogs</a>
                                            </Link> |
                                            <span className="name"> {blog_info.title}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 p-0">
                                <div className="row">
                                    <div className="col-md-9 col-12 box left">
                                        <div className="card mb-3 col-12">
                                            <div className="card-body">
                                                <h1 id="title">{blog_info.title}</h1>
                                                <ul>
                                                    <li>Date posted : <span id="date">{blog_info.created_at}</span></li>
                                                    <g> | {" "}</g>
                                                    <li>Comments : <span
                                                        className="comment_counts">{blog_info.comments.length}</span>
                                                    </li>
                                                </ul>
                                                <img id="image_src" src={blog_info.image}/>
                                                <div className="tag-blog"
                                                     id="blog_category">{blog_info.category?.name}</div>
                                                <div className="editor-details" id="description">
                                                    <p className="m-0px truncateBlogDesc"
                                                       dangerouslySetInnerHTML={{__html: blog_info.description}}></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 pl-0 col-12 right">
                                        <div className="t-box col-12">
                                            <div className="col-12 similar">
                                                <div className="head col-12">
                                                    <h2>Related blogs</h2>
                                                </div>
                                                <div className="col-12 list" id="similarBlogs">

                                                    {
                                                        related_blogs.length ? related_blogs.map((blog, index) => {

                                                            return (
                                                                <>
                                                                    <div className="col-12 cards">
                                                                        <Link href={"/blog/"+blog.slug}>
                                                                            <a>
                                                                                <div className="row">
                                                                                    <div className="col-2 image">
                                                                                        <img src={imageOptimization(blog.image,"150x100")}/>
                                                                                    </div>
                                                                                    <div className="col-8 info">
                                                                                        <p>{blog.title}</p>
                                                                                        <h6>{blog.created_at}</h6>
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        </Link>
                                                                    </div>
                                                                </>
                                                            )
                                                        }) : ""
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 pl-0 col-12 comment">
                                <div className="t-box col-12">
                                    <div className="heading">
                                        <h4>Leave a comment</h4>
                                    </div>
                                    <form id="commentForm">
                                        <div className="row">
                                            <div className="col-md-6 col-12 form-group">
                                                <input type="test"
                                                       className="form-control"
                                                       name="full_name"
                                                       placeholder="Full name"/>
                                            </div>
                                            <div className="col-md-6 col-12 form-group">
                                                <input type="test"
                                                       className="form-control"
                                                       name="email"
                                                       placeholder="Email address"/>
                                            </div>
                                            <div className="col-12 form-group">
                                                <textarea
                                                    className="form-control"
                                                    name="comment"
                                                    placeholder="Your comment(600 character max)">
                                                </textarea>
                                            </div>
                                            <div className="col-12 form-group text-center">
                                                <button type="submit" className="btn">Post your comment</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-12 comments-box">
                                <div className="col-12 t-box">
                                    <div className="head">
                                        <h4>Previous Comments</h4>
                                        <span> comments </span><span className="comment_counts"></span>
                                    </div>
                                    <div className="col-12 user-comment">
                                        {blog_info.comments.length ? blog_info.comments.map((comment,index)=>{
                                            return (
                                                <>
                                                    <div className="col-12 message">
                                                        <img src={images.profile.default.src} />
                                                            <h5>{comment.full_name}<span>{comment.created_at}</span></h5>
                                                            <p>{comment.comment}</p>
                                                     </div>
                                                </>
                                            )
                                        }) : ""}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>)
    }
}

export default Blog;



