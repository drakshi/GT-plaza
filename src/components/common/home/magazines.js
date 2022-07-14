import React from "react";
import Link from "next/link";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

class Magazines extends React.Component {

    render() {

        const responsive = {
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 8,
                slidesToSlide: 1 // optional, default to 1.
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 6,
                slidesToSlide: 1 // optional, default to 1.
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 3,
                slidesToSlide: 1 // optional, default to 1.
            }
        };
        const ButtonGroup = ({ next, previous, ...rest }) => {
            const {
                carouselState: { currentSlide, totalItems, slidesToShow }
            } = rest;

            return (
                <div className="carousel-button-group">
                    <button aria-label="Go to previous slide"
                            className={currentSlide === 0 ? "disable" : "react-multiple-carousel__arrow react-multiple-carousel__arrow--left"}
                            onClick={() => previous()}></button>
                    <button aria-label="Go to next slide"
                            className={currentSlide === totalItems - slidesToShow ? "disable" : "react-multiple-carousel__arrow react-multiple-carousel__arrow--right"}
                            onClick={() => next()}></button>
                </div>
            );
        };
        return (
            <>
                <Carousel
                    customButtonGroup={<ButtonGroup
                        next={this.props.next}
                        previous={this.props.previous}
                        rest={this.props.rest}
                    />}
                    renderButtonGroupOutside={true}
                    ssr
                    infinite={true}
                    shouldResetAutoplay={false}
                    autoPlay={false}
                    partialVisbile
                    arrows={false}
                    itemClass="image-item"
                    arro
                    responsive={responsive}
                >

                    {this.props.magazines && this.props.magazines.length ? this.props.magazines.map((magazine,index)=>{
                        return (
                            <>
                                <div className='item' key={index}>
                                    <Link href={magazine.logo_url}>
                                        <a>
                                            <img src={magazine.logo_path} alt={magazine.alt_text} />
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
export default Magazines;



