import React from "react";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import Link from 'next/link';
import {imageOptimization} from "../../../helper";

class HomeBanners extends React.Component {

    render() {

        const responsive = {
            desktop: {
                breakpoint: {max: 3000, min: 1024},
                items: 1,
                slidesToSlide: 1 // optional, default to 1.
            },
            tablet: {
                breakpoint: {max: 1024, min: 464},
                items: 1,
                slidesToSlide: 1 // optional, default to 1.
            },
            mobile: {
                breakpoint: {max: 464, min: 0},
                items: 1,
                slidesToSlide: 1 // optional, default to 1.
            }
        };

        return (
            <>
                {this.props.banners?.length ?

                    <Carousel
                        ssr
                        infinite={true}
                        partialVisbile
                        itemClass="image-item"
                        responsive={responsive}
                    >
                        {this.props.banners && this.props.banners.length ? this.props.banners.map((item, index) => {
                            return (
                                <>
                                    <div className="item" key={index}>
                                        <a target="_blank" onClick={()=>{
                                            window.location.assign(item.banner_url)
                                        }}>
                                            <img src={imageOptimization(item?.banner_path ,"2078x1040")}
                                                 alt="Wholesale Apparel and textile"/>
                                        </a>
                                    </div>
                                </>
                            )
                        }) : ""}

                    </Carousel>
                    : ""}
            </>
        )
    }
};
export default HomeBanners;



