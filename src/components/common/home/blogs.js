import React from "react";
import Carousel from "react-multi-carousel";
import Link from "next/link";
import {imageOptimization} from "../../../helper";

class Blogs extends React.Component {

    render() {

        const responsive = {
            desktop: {
                breakpoint: {max: 3000, min: 1024},
                items: 4,
                slidesToSlide: 4 // optional, default to 1.
            },
            tablet: {
                breakpoint: {max: 1024, min: 464},
                items: 2,
                slidesToSlide: 2 // optional, default to 1.
            },
            mobile: {
                breakpoint: {max: 464, min: 0},
                items: 1.3,
                slidesToSlide: 1 // optional, default to 1.
            }
        };

        return (
            <>
                <Carousel
                    ssr
                    infinite={true}
                    partialVisbile
                    arrows={false}
                    itemClass="image-item px-md-2 px-1"
                    responsive={responsive}
                >
                    {this.props.blogs && this.props.blogs.length ? this.props.blogs.map((blog, index) => {
                        return (
                            <>
                                <div className="col-12 block" key={index}>
                                    <Link href={"https://globaltradeplaza.com/blog/"+blog.slug+"?id="+blog.id}>
                                        <a>
                                            <div className="col-12 t-box">
                                                <img className="lazy"
                                                     alt={blog.title}
                                                     title={blog.title}
                                                     src={imageOptimization(blog.image,300)}
                                                />
                                                <p>{blog?.category?.name}</p><h6>{blog.title}</h6>
                                                <ul>
                                                    <li><i className="far fa-clock"></i>{blog.created_at}</li>
                                                    <li><i className="far fa-comment-alt"></i>{blog.comments.length}</li>
                                                </ul>
                                            </div>
                                        </a>
                                    </Link>
                                </div>
                            </>
                        )

                    }) : ""}

                </Carousel>
            </>
        )
    }
};
export default Blogs;



