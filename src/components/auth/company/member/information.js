import React from 'react';
import {images} from "../../../../../constant";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import Accordion from 'react-bootstrap/Accordion';
import {Chart, Tooltip as Tool} from 'chart.js';
Chart.register([Tool]);
import * as ChartGeo from "chartjs-chart-geo";
import {graph_countries} from '../../../../../src/api/graph-countries';
import {staticData} from '../../../../../static';
import {imageOptimization} from "../../../../helper";
import Link from "next/link";

class Information extends React.Component {

    WorldGraph(staticCountries) {

        const dataCountries = [];
        const dataValues = [];
        let chartStatus = Chart.getChart("canvas"); // <canvas> id
        if (chartStatus !== undefined) {
            chartStatus.destroy();
        }

        graph_countries.length ? graph_countries.map(function (d, index) {
            if (index !== 0) {
                const deliveryCountry = staticCountries.some(el => staticCountries.includes(d.properties.name));
                dataValues.push({
                    feature: d,
                    value: deliveryCountry ? 1 : 0
                });
                dataCountries.push(d.properties.name);
            }
        }) : [];


        fetch('https://unpkg.com/world-atlas/countries-50m.json').then((r) => r.json()).then((data) => {
            const countries = ChartGeo.topojson.feature(data, data.objects.countries).features;
            const chart = new Chart(document.getElementById("canvas").getContext("2d"), {
                type: 'choropleth',
                data: {
                    labels: dataCountries,
                    datasets: [{
                        label: 'Countries',
                        borderWidth: 0,
                        data: dataValues,
                    }]
                },
                options: {
                    showOutline: false,
                    showGraticule: false,
                    showTooltips: false,
                    plugins: {
                        color: {
                            display: false,
                            legend: {
                                display: false
                            }
                        }
                    },
                    scales: {
                        xy: {
                            projection: 'equalEarth'
                        }
                    }
                }
            });
            chart.update();
        })
    }

    componentDidMount() {
        var staticCountries = [];
        var markets = this.props.member?.business_profile?.business_major_market;
        if (markets) {
            markets.map((market) => {

                if (market.name === "Asia") {
                    staticCountries = [...staticCountries, ...staticData.asia]
                }
                else if (market.name === "Europe") {
                    staticCountries = [...staticCountries, ...staticData.europe]
                }
                else if (market.name === "North America") {
                    staticCountries = [...staticCountries, ...staticData.north_america]
                }
                else if (market.name === "WorldWide") {
                    staticCountries = [...staticData.asia, ...staticData.europe, ...staticData.north_america]
                }
            })
        }
        this.WorldGraph(staticCountries);
    }

    render() {

        var terms = this.props.member?.business_profile?.business_delivery_terms ?
            this.props.member?.business_profile?.business_delivery_terms.map((term) => {
                return term.delivery_term_id ;
            }) : [] ;

        var categories =  this.props?.categories_array?.length > 0 ?
           this.props.categories_array.map((term) => {
               return term?.name ;
           }) : [] ;


        return (
            <>
                <div className="col-12 overview mt-4">
                    <div className="col-12 t-box cards">
                        <p className="description mb-0">
                            {this.props.member?.company_profile?.company_description}
                        </p>
                    </div>
                </div>

                {<div className="col-12 product-slider">
                    <div className="col-12 t-box cards">
                        <div className="head col-12">
                            <h4>Featured Products</h4>
                        </div>
                        <div className="col-12 featureProducts">
                            <div className="row" id="featured_product">
                                {this.props.features?.length ?
                                    <Carousel
                                        ssr
                                        responsive={this.props.responsive}
                                        deviceType={"desktop"}
                                        autoPlay={true}
                                        autoPlaySpeed={2000}
                                        infinite={true}
                                        partialVisbile
                                        arrows={false}
                                        itemClass="image-item px-md-2 px-1">
                                        {this.props.features?.length ? this.props.features.map((item, index) => {
                                            return (
                                                <>
                                                    {<div className="col-12 block" key={index}>
                                                        <div className="col-12 t-box">
                                                            <div className="col-12 image">
                                                                <img
                                                                    src={imageOptimization(item?.images[0].path, 100)}
                                                                    alt=""/>
                                                            </div>
                                                                <Link href={"/product/"+item?.slug}>
                                                                    <a>{item?.name}</a>
                                                                </Link>
                                                            <h6>{item?.product_trades[0].price}</h6>
                                                        </div>
                                                    </div>}
                                                </>
                                            )
                                        }) : ""}
                                    </Carousel>
                                    :
                                    <div className="no-data d-block" role="alert">
                                        <div className="t-box mb-0 ml-3">
                                            <img src={images.not_found.default.src}/>
                                            <h5>No Product Found</h5>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>}


                <div className="col-12 info-business">
                    <div className="col-12 t-box cards">
                        <div className="head col-12">
                            <h4>Company details</h4>
                        </div>
                        <div className="col-12 bottom">
                            <div className="col-12 user-info">
                                <div className="row">
                                    <div className="col-md-6 mb-3 tile">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                            <path fill="currentColor"
                                                  d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"></path>
                                        </svg>
                                        <h6>Business type</h6>
                                        <p className="">
                                                                <span className="value businessType2">
                                                                    {this.props.member?.company_profile?.primary_business_types.length ?
                                                                        this.props.member?.company_profile?.primary_business_types?.map((item) => {
                                                                            return item.name;
                                                                        }).join(" | ") : "Not-available"}
                                                                </span>
                                        </p>
                                    </div>
                                    <div className="col-md-6 mb-3 tile">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path fill="currentColor"
                                                  d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path>
                                        </svg>
                                        <h6>Established year</h6>
                                        <p className="">
                                                                <span className="value established">
                                                                    {this.props.member?.business_profile?.established_year ?
                                                                        this.props.member?.business_profile?.established_year :
                                                                        "Not-available"
                                                                    }
                                                                </span>
                                        </p></div>
                                    <div className="col-md-6 tile">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                            <path fill="currentColor"
                                                  d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"></path>
                                        </svg>
                                        <h6>Main market</h6>
                                        <p>
                                                                <span className="value market">
                                                                     {this.props.member?.business_profile?.business_major_market?.length ?
                                                                         this.props.member?.business_profile?.business_major_market?.map((item) => {
                                                                             return item.name;
                                                                         }).join(" | ") : "Not-available"}
                                                                </span>
                                        </p>
                                    </div>
                                    <div className="col-md-6 tile">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                            <path fill="currentColor"
                                                  d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"></path>
                                        </svg>
                                        <h6>Employee count</h6>
                                        <p><span className="value employees">
                                            {this.props.member?.business_profile?.number_of_employees ? this.props.member?.business_profile?.number_of_employees : "Not-available"}
                                        </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <ul className="table-ul d-none">
                                <li><span>Country</span>
                                    <span className="value country2">
                                        {this.props.member?.company_profile?.country ? this.props.member?.company_profile?.country?.name : ""}
                                    </span>
                                </li>
                                <li>
                                    <span>Trust score</span>
                                        <span className="value points">
                                            <img src={images.points.default.src} alt=""/>{''}{this.props.member?.points}
                                        </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-12 trade-info">
                    <div className="col-12 t-box cards">
                        <div className="head col-12">
                            <h4>Trading Details</h4>
                        </div>
                        <div className="col-12 user-info">
                            <div className="row">
                                <div className="col-md-6 mb-3 tile">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path fill="currentColor"
                                              d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"></path>
                                    </svg>
                                    <h6>GST No.</h6>
                                    <p className="">
                                                            <span className="value gst">
                                                                {this.props.member?.business_profile?.gst_number ? this.props.member?.business_profile?.gst_number : "Not-available"}
                                                            </span>
                                    </p>
                                </div>
                                <div className="col-md-6 mb-3 tile">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path fill="currentColor"
                                              d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path>
                                    </svg>
                                    <h6>TAN No.</h6>
                                    <p className="">
                                                            <span className="value tan">
                                                                {this.props.member?.business_profile?.tan_number ? this.props.member?.business_profile?.tan_number : "Not-available"}
                                                            </span>
                                    </p>
                                </div>
                                <div className="col-md-6 mb-3 tile">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path fill="currentColor"
                                              d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"></path>
                                    </svg>
                                    <h6>Total revenue</h6>
                                    <p>
                                                            <span className="value revenue">
                                                                {this.props.member?.business_profile?.revenue_range?.revenue_range ? this.props.member?.business_profile?.revenue_range?.revenue_range : " Not-available"}
                                                            </span>
                                    </p>
                                </div>
                                <div className="col-md-6 mb-3 tile">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path fill="currentColor"
                                              d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"></path>
                                    </svg>
                                    <h6>Export percentage</h6>
                                    <p>
                                                            <span className="value export">
                                                                {this.props.member?.business_profile?.export_percentage ? this.props.member?.business_profile?.export_percentage + "%" : "Not-available"}
                                                            </span>
                                    </p>
                                </div>
                                <div className="col-md-12 tile">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path fill="currentColor"
                                              d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"></path>
                                    </svg>
                                    <h6>Nearest port</h6>
                                    <p>
                                                            <span className="value port">
                                                                {this.props.member?.business_profile?.port?.name ? this.props.member?.business_profile?.port?.name : "Not-available"}
                                                            </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 delivery-area">
                    <div className="col-12 t-box cards">
                        <div className="head col-12">
                            <h4>Delivery areas</h4>
                            <canvas id="canvas"></canvas>
                        </div>
                    </div>
                </div>
                <div className="col-12 delivery-terms">
                    <div className="col-12 t-box cards">
                        <div className="head col-12">
                            <h4>Terms of delivery (incoterms)</h4>
                        </div>
                        <div className="body col-12">
                            <div className="col-12">
                                <div className="row">
                                    <div className="row">

                                        {
                                            terms.length === 0 && <span>Not-available</span>
                                        }

                                                <Accordion className="tod-main" defaultActiveKey="1">
                                                    { terms.includes(4) &&
                                                        <Accordion.Item>
                                                            <Accordion.Header>
                                                                <div className="col-12">
                                                                    <div
                                                                        className="row align-items-center justify-content-between">
                                                                        <div className="col-auto">
                                                                            <b className="tag">FOB</b> Free Onboard
                                                                        </div>
                                                                        <div className="col-auto">
                                                                            <ul className="list-unstyled d-flex align-items-center">
                                                                                <li className="buyer"></li>
                                                                                <li className="buyer"></li>
                                                                                <li className="buyer"></li>
                                                                                <li className="buyer"></li>
                                                                                <li className="buyer"></li>
                                                                                <li className="buyer"></li>
                                                                                <li className="buyer"></li>
                                                                                <li className="buyer"></li>
                                                                                <li className="buyer"></li>
                                                                                <li className="buyer"></li>
                                                                                <li className="buyer"></li>
                                                                                <li className="buyer"></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <div className="col-12 terms-main">
                                                                    <div className="row">
                                                                        <div className="col-md-auto title">
                                                                            <h6 className="buyer">buyer</h6>
                                                                            <h6 className="buyer">buyer</h6>
                                                                            <h6 className="buyer">buyer</h6>
                                                                            <h6 className="buyer">buyer</h6>
                                                                            <h6 className="buyer">buyer</h6>
                                                                            <h6 className="buyer">buyer</h6>
                                                                            <h6 className="buyer">buyer</h6>
                                                                            <h6 className="buyer">buyer</h6>
                                                                            <h6 className="buyer">buyer</h6>
                                                                            <h6 className="buyer">buyer</h6>
                                                                            <h6 className="buyer">buyer</h6>
                                                                            <h6 className="buyer">buyer</h6>
                                                                            <h6 className="buyer">buyer</h6>
                                                                        </div>
                                                                        <div className="col-md desc">
                                                                            <h6 className="">Loading on departure</h6>
                                                                            <h6 className="">Export declaration at
                                                                                customs</h6>
                                                                            <h6 className="">Transport to the port of
                                                                                export</h6>
                                                                            <h6 className="">Truck unloading at the port of
                                                                                export</h6>
                                                                            <h6 className="">Loading onto ship/aircraft in
                                                                                port of export</h6>
                                                                            <h6 className="">Transport (water/air) to port
                                                                                of entry</h6>
                                                                            <h6 className="">insurance</h6>
                                                                            <h6 className="">Unloading at the port of
                                                                                entry</h6>
                                                                            <h6 className="">Truck unloading at the port of
                                                                                export</h6>
                                                                            <h6 className="">Transport to destination</h6>
                                                                            <h6 className="">Customs clearance upon
                                                                                import</h6>
                                                                            <h6 className="">Import Duties and Taxes</h6>
                                                                            <h6 className="">Unloading at destination</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    }

                                                    {terms.includes(1) &&
                                                        <Accordion.Item>
                                                            <Accordion.Header>
                                                                <div className="col-12">
                                                                    <div
                                                                        className="row align-items-center justify-content-between">
                                                                        <div className="col-auto">
                                                                            <b className="tag">DAP</b> Delivery at Place
                                                                        </div>
                                                                        <div className="col-auto">
                                                                            <ul className="list-unstyled d-flex align-items-center">
                                                                                <li className=""></li>
                                                                                <li className=""></li>
                                                                                <li className=""></li>
                                                                                <li className=""></li>
                                                                                <li className=""></li>
                                                                                <li className="buyer"></li>
                                                                                <li className="buyer"></li>
                                                                                <li className="buyer"></li>
                                                                                <li className="buyer"></li>
                                                                                <li className="buyer"></li>
                                                                                <li className="buyer"></li>
                                                                                <li className="buyer"></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <div className="col-12 terms-main">
                                                                    <div className="row">
                                                                        <div className="col-md-auto title">
                                                                            <h6 className="">salesperson</h6>
                                                                            <h6 className="">salesperson</h6>
                                                                            <h6 className="">salesperson</h6>
                                                                            <h6 className="">salesperson</h6>
                                                                            <h6 className="">salesperson</h6>
                                                                            <h6 className="buyer">buyer</h6>
                                                                            <h6 className="buyer">buyer</h6>
                                                                            <h6 className="buyer">buyer</h6>
                                                                            <h6 className="buyer">buyer</h6>
                                                                            <h6 className="buyer">buyer</h6>
                                                                            <h6 className="buyer">buyer</h6>
                                                                            <h6 className="buyer">buyer</h6>
                                                                            <h6 className="buyer">buyer</h6>
                                                                        </div>
                                                                        <div className="col-md desc">
                                                                            <h6 className="">Loading on departure</h6>
                                                                            <h6 className="">Export declaration at
                                                                                customs</h6>
                                                                            <h6 className="">Transport to the port of
                                                                                export</h6>
                                                                            <h6 className="">Truck unloading at the port of
                                                                                export</h6>
                                                                            <h6 className="">Loading onto ship/aircraft in
                                                                                port of export</h6>
                                                                            <h6 className="">Transport (water/air) to port
                                                                                of entry</h6>
                                                                            <h6 className="">insurance</h6>
                                                                            <h6 className="">Unloading at the port of
                                                                                entry</h6>
                                                                            <h6 className="">Truck unloading at the port of
                                                                                export</h6>
                                                                            <h6 className="">Transport to destination</h6>
                                                                            <h6 className="">Customs clearance upon
                                                                                import</h6>
                                                                            <h6 className="">Import Duties and Taxes</h6>
                                                                            <h6 className="">Unloading at destination</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    }

                                                    {terms.includes(2) &&
                                                        <Accordion.Item>
                                                            <Accordion.Header>
                                                                <div className="col-12">
                                                                    <div
                                                                        className="row align-items-center justify-content-between">
                                                                        <div className="col-auto">
                                                                            <b className="tag">DDP</b> Delivered Duty Paid
                                                                        </div>
                                                                        <div className="col-auto">
                                                                            <ul className="list-unstyled d-flex align-items-center">
                                                                                <li className=""></li>
                                                                                <li className=""></li>
                                                                                <li className=""></li>
                                                                                <li className=""></li>
                                                                                <li className=""></li>
                                                                                <li className=""></li>
                                                                                <li className="buyer"></li>
                                                                                <li className="buyer"></li>
                                                                                <li className="buyer"></li>
                                                                                <li className="buyer"></li>
                                                                                <li className="buyer"></li>
                                                                                <li className="buyer"></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <div className="col-12 terms-main">
                                                                    <div className="row">
                                                                        <div className="col-md-auto title">
                                                                            <h6 className="">salesperson</h6>
                                                                            <h6 className="">salesperson</h6>
                                                                            <h6 className="">salesperson</h6>
                                                                            <h6 className="">salesperson</h6>
                                                                            <h6 className="">salesperson</h6>
                                                                            <h6 className="">buyer</h6>
                                                                            <h6 className="buyer">buyer</h6>
                                                                            <h6 className="buyer">buyer</h6>
                                                                            <h6 className="buyer">buyer</h6>
                                                                            <h6 className="buyer">buyer</h6>
                                                                            <h6 className="buyer">buyer</h6>
                                                                            <h6 className="buyer">buyer</h6>
                                                                            <h6 className="buyer">buyer</h6>
                                                                        </div>
                                                                        <div className="col-md desc">
                                                                            <h6 className="">Loading on departure</h6>
                                                                            <h6 className="">Export declaration at
                                                                                customs</h6>
                                                                            <h6 className="">Transport to the port of
                                                                                export</h6>
                                                                            <h6 className="">Truck unloading at the port of
                                                                                export</h6>
                                                                            <h6 className="">Loading onto ship/aircraft in
                                                                                port of export</h6>
                                                                            <h6 className="">Transport (water/air) to port
                                                                                of entry</h6>
                                                                            <h6 className="">insurance</h6>
                                                                            <h6 className="">Unloading at the port of
                                                                                entry</h6>
                                                                            <h6 className="">Truck unloading at the port of
                                                                                export</h6>
                                                                            <h6 className="">Transport to destination</h6>
                                                                            <h6 className="">Customs clearance upon
                                                                                import</h6>
                                                                            <h6 className="">Import Duties and Taxes</h6>
                                                                            <h6 className="">Unloading at destination</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    }

                                                    {terms.includes(5) &&
                                                        <Accordion.Item>
                                                            <Accordion.Header>
                                                                <div className="col-12">
                                                                    <div
                                                                        className="row align-items-center justify-content-between">
                                                                        <div className="col-auto">
                                                                            <b className="tag">CIF</b> Cost, Insurance,
                                                                            Freight
                                                                        </div>
                                                                        <div className="col-auto">
                                                                            <ul className="list-unstyled d-flex align-items-center">
                                                                                <li className=""></li>
                                                                                <li className=""></li>
                                                                                <li className=""></li>
                                                                                <li className=""></li>
                                                                                <li className=""></li>
                                                                                <li className=""></li>
                                                                                <li className=""></li>
                                                                                <li className="buyer"></li>
                                                                                <li className="buyer"></li>
                                                                                <li className="buyer"></li>
                                                                                <li className="buyer"></li>
                                                                                <li className="buyer"></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <div className="col-12 terms-main">
                                                                    <div className="row">
                                                                        <div className="col-md-auto title">
                                                                            <h6 className="">salesperson</h6>
                                                                            <h6 className="">salesperson</h6>
                                                                            <h6 className="">salesperson</h6>
                                                                            <h6 className="">salesperson</h6>
                                                                            <h6 className="">salesperson</h6>
                                                                            <h6 className="">buyer</h6>
                                                                            <h6 className="buyer">buyer</h6>
                                                                            <h6 className="buyer">buyer</h6>
                                                                            <h6 className="buyer">buyer</h6>
                                                                            <h6 className="buyer">buyer</h6>
                                                                            <h6 className="buyer">buyer</h6>
                                                                            <h6 className="buyer">buyer</h6>
                                                                            <h6 className="buyer">buyer</h6>
                                                                        </div>
                                                                        <div className="col-md desc">
                                                                            <h6 className="">Loading on departure</h6>
                                                                            <h6 className="">Export declaration at
                                                                                customs</h6>
                                                                            <h6 className="">Transport to the port of
                                                                                export</h6>
                                                                            <h6 className="">Truck unloading at the port of
                                                                                export</h6>
                                                                            <h6 className="">Loading onto ship/aircraft in
                                                                                port of export</h6>
                                                                            <h6 className="">Transport (water/air) to port
                                                                                of entry</h6>
                                                                            <h6 className="">insurance</h6>
                                                                            <h6 className="">Unloading at the port of
                                                                                entry</h6>
                                                                            <h6 className="">Truck unloading at the port of
                                                                                export</h6>
                                                                            <h6 className="">Transport to destination</h6>
                                                                            <h6 className="">Customs clearance upon
                                                                                import</h6>
                                                                            <h6 className="">Import Duties and Taxes</h6>
                                                                            <h6 className="">Unloading at destination</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    }

                                                    {terms.includes(3) &&
                                                        <Accordion.Item>
                                                            <Accordion.Header>
                                                                <div className="col-12">
                                                                    <div
                                                                        className="row align-items-center justify-content-between">
                                                                        <div className="col-auto">
                                                                            <b className="tag">FAS</b> Free Alongside Ship
                                                                        </div>
                                                                        <div className="col-auto">
                                                                            <ul className="list-unstyled d-flex align-items-center">
                                                                                <li className=""></li>
                                                                                <li className=""></li>
                                                                                <li className=""></li>
                                                                                <li className=""></li>
                                                                                <li className=""></li>
                                                                                <li className="buyer"></li>
                                                                                <li className="divided"></li>
                                                                                <li className="divided"></li>
                                                                                <li className=""></li>
                                                                                <li className="buyer"></li>
                                                                                <li className="buyer"></li>
                                                                                <li className="buyer"></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <div className="col-12 terms-main">
                                                                    <div className="row">
                                                                        <div className="col-md-auto title">
                                                                            <h6 className="">salesperson</h6>
                                                                            <h6 className="">salesperson</h6>
                                                                            <h6 className="">salesperson</h6>
                                                                            <h6 className="">salesperson</h6>
                                                                            <h6 className="">salesperson</h6>
                                                                            <h6 className="">salesperson</h6>
                                                                            <h6 className="buyer">buyer</h6>
                                                                            <h6 className="divided">Divided</h6>
                                                                            <h6 className="divided">divided</h6>
                                                                            <h6 className="">salesperson</h6>
                                                                            <h6 className="buyer">buyer</h6>
                                                                            <h6 className="buyer">buyer</h6>
                                                                            <h6 className="buyer">buyer</h6>
                                                                        </div>
                                                                        <div className="col-md desc">
                                                                            <h6 className="">Loading on departure</h6>
                                                                            <h6 className="">Export declaration at
                                                                                customs</h6>
                                                                            <h6 className="">Transport to the port of
                                                                                export</h6>
                                                                            <h6 className="">Truck unloading at the port of
                                                                                export</h6>
                                                                            <h6 className="">Loading onto ship/aircraft in
                                                                                port of export</h6>
                                                                            <h6 className="">Transport (water/air) to port
                                                                                of entry</h6>
                                                                            <h6 className="">insurance</h6>
                                                                            <h6 className="">Unloading at the port of
                                                                                entry</h6>
                                                                            <h6 className="">Truck unloading at the port of
                                                                                export</h6>
                                                                            <h6 className="">Transport to destination</h6>
                                                                            <h6 className="">Customs clearance upon
                                                                                import</h6>
                                                                            <h6 className="">Import Duties and Taxes</h6>
                                                                            <h6 className="">Unloading at destination</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    }
                                                </Accordion>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 deals-in">
                    <div className="col-12 t-box cards">
                        <div className="head col-12">
                            <h4>Key terms associated with this company</h4>
                        </div>
                        <ul id="businessCategories">
                            {
                                categories.length ? [...new Set(categories)]?.map((item) => {
                                    return <>
                                        <li>{item}</li>
                                    </>
                                }) : <span className="font-weight-bold">Not-Available</span>
                            }
                        </ul>
                    </div>
                </div>
                <div className="col-12 details">
                    <div className="row">
                        <div className="col-6 basic d-none">
                            <div className="col-12 t-box cards">
                                <div className="head col-12">
                                    <h4>Company Details</h4>
                                </div>
                                <ul className="table-ul">
                                    <li><span>Business type</span>
                                        <span className="value businessType2">
                                                      {this.props.member?.company_profile?.primary_business_types.length ?
                                                          this.props.member?.company_profile?.primary_business_types?.map((item) => {
                                                              return item.name;
                                                          }).join(" | ") : "Not-available"}
                                                </span>
                                    </li>
                                    <li><span>Main market</span>
                                        <span className="value market">
                                                    {this.props.member?.business_profile?.business_major_market?.length ?
                                                        this.props.member?.business_profile?.business_major_market?.map((item) => {
                                                            return item.name;
                                                        }).join(" | ") : "Not-available"}
                                                </span>
                                    </li>
                                    <li><span>Established year</span>
                                        <span className="value established">
                                                      {this.props.member?.business_profile?.established_year ?
                                                          this.props.member?.business_profile?.established_year :
                                                          "Not-available"
                                                      }
                                                </span>
                                    </li>
                                    <li><span>City / State</span>
                                        <span className="value city">
                                                    {this.props.member?.company_profile.city ? this.props.member?.company_profile.city : "Not-available"}
                                                </span>
                                    </li>
                                    <li><span>Country</span>
                                        <span className="value country2">
                                                    {this.props.member?.company_profile?.country?.name}
                                                </span>
                                    </li>
                                    <li><span>Address</span>
                                        <span className="value address">
                                                     {this.props.member?.company_profile?.address}
                                                </span>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-12 ">
                    <div className="col-12 certificate">
                        <div className="col-12 t-box cards">
                            <div className="head col-12">
                                <h4>Certifications</h4>
                            </div>
                            <ul id="certificate">
                                <li>
                                    <span>Not-Available</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Information;
