import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";
import {imageOptimization} from "../../../helper";

class TradeShows extends React.Component {

    render() {

        const responsive = {
            desktop: {
                breakpoint: {max: 3000, min: 1024},
                items: 4,

                slidesToSlide: 3 // optional, default to 1.
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

                    {this.props.trade_shows && this.props.trade_shows.length ? this.props.trade_shows.map((trade_show, index) => {
                        return (
                            <>
                                <div className="col-12 t-box" key={index}>
                                    <Link href={"/trade-show/"+trade_show.slug+"?id="+trade_show.id}>
                                        <a>
                                            <div className="col-12 block px-0">
                                                <img className="lazy" alt="India Solar and E- Vehicle Expo 2022"
                                                     title="India Solar and E- Vehicle Expo 2022"
                                                     src={ imageOptimization(trade_show?.featured_image,300)}
                                                />
                                                <p className="mb-0">{trade_show.start_date ? trade_show.start_date : "Not-Available"}</p>
                                                <h6>{trade_show.title}</h6>
                                                <p className="mb-0">{trade_show.city},{trade_show?.country?.name}</p>
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
export default TradeShows;



