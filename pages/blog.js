import React from 'react';
import blogs from "../src/components/common/home/blogs";
import Link from "next/link";
import {imageOptimization} from "../src/helper";

class Blog extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const blogs = this.props?.blogs ? this.props?.blogs : [];
        return <>
            <div className="col-md-3 pl-0 col-12 right">
                <div className="t-box col-12">
                    <div className="col-12 similar">
                        <div className="head col-12">
                            <h2>Related News & Events</h2>
                        </div>
                        <div className="col-12 list" id="similarBlogs">
                            {blogs.length > 0 ? blogs.map((blog) => {
                                return (
                                    <>
                                        <div className="col-12 cards">
                                            <Link href={"/news/" + blog.id}>
                                                <a>
                                                    <div className="row">
                                                        <div className="col-2 image"><img
                                                            src={imageOptimization(blog.image, "50x50")}/>
                                                        </div>
                                                        <div className="col-8 info"><p>{blog.title}</p>
                                                            <h6>{blog.created_at}</h6></div>
                                                    </div>
                                                </a>
                                            </Link>
                                        </div>
                                    </>
                                )
                            }) : ""}
                        </div>
                    </div>
                </div>
            </div>

        </>
    }
}

export default Blog;
