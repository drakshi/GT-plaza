import React from "react";
import FooterCategories from "../common/home/footer_categories";
import Link from "next/link";
import {images} from "../../../constant";
import {Cookies, withCookies} from "react-cookie";
import {instanceOf} from "prop-types";

class Footer extends React.Component{

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state={
            token: this.props.cookies.get('auth_token'),
            activeItem:-1,
            isMobile:768,
        }
        this.handleActiveState = this.handleActiveState.bind(this);
    }

    handleActiveState(index){
        this.setState({
            activeItem:index
        })
    }
    componentDidMount() {
        if(typeof window !== "undefined") {
            window.addEventListener('resize', () => {
                this.setState({
                    isMobile: window.innerWidth < 768
                });
            }, false);
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.cookies.get('auth_token') !== this.props.cookies.get('auth_token')) {
            this.setState({token: this.props.cookies.get('auth_token')})
        }
    }

    render() {
        return (
            <>
                <footer className="mt-2">
                    <div className="container-fluid footer-main">
                        <div className="row">
                            <div className="col-md-4 info">
                                <img src={images.logo_mono.default.src} width="170" alt="Global Trade Plaza"/>
                                <h5>Global Trade Plaza</h5>
                                <p>Global Trade Plaza is an ISO 9001:2015 certified online B2B marketplace. We provide
                                    various opportunities for businesses including manufacturers, exporters, and
                                    wholesalers to
                                    connect with other businesses and companies across the globe. We are the much-needed
                                    bridge between B2B sellers and buyers. We have clients from different industries
                                    such as
                                    textile and apparel, consumer electronics, medical supplies, agriculture and food,
                                    home
                                    supplies, heavy machinery, industrial tools, etc.</p>
                            </div>
                            <div className="col-md-8 links">
                                <ul>
                                    <h5>Customer support</h5>
                                    <Link href={"/contact"}>
                                        <a>
                                            <li>Contact us</li>
                                        </a>
                                    </Link>
                                    <Link href={"/privacy-policy"}>
                                        <a>
                                            <li>Privacy policy</li>
                                        </a>
                                    </Link>
                                    <Link href={"/advertise"}>
                                        <a>
                                            <li>Advertise with us</li>
                                        </a>
                                    </Link>
                                    <Link href={"/tradeshows"}>
                                        <a>
                                            <li>Tradeshows</li>
                                        </a>
                                    </Link>
                                    <Link href={"/blog-list"}>
                                        <a>
                                            <li>Our blogs</li>
                                        </a>
                                    </Link>
                                    <Link href={"/news-events"}>
                                        <a>
                                            <li>News & events</li>
                                        </a>
                                    </Link>
                                </ul>
                                <ul>
                                    <h5>About Us</h5>
                                    <Link href={"/about"}>
                                        <a>
                                            <li>About GlobalTradePlaza</li>
                                        </a>
                                    </Link>
                                    <Link href={"/success-stories"}>
                                        <a>
                                            <li>Success stories</li>
                                        </a>
                                    </Link>
                                    <Link href={"/faq"}>
                                        <a>
                                            <li>FAQ</li>
                                        </a>
                                    </Link>
                                    <Link href={"/career"}>
                                        <a>
                                            <li>Career with us</li>
                                        </a>
                                    </Link>
                                </ul>
                                <ul>
                                    <h5>For buyers</h5>
                                    <Link href={"/search-suppliers"}>
                                        <a>
                                            <li>Exporters directory</li>
                                        </a>
                                    </Link>
                                    <Link href={"/suppliers"}>
                                        <a>
                                            <li>All categories</li>
                                        </a>
                                    </Link>
                                    <Link href={"/search-leads"}>
                                        <a>
                                            <li>Buy leads</li>
                                        </a>
                                    </Link>
                                    <Link href={"/feedback"}>
                                        <a>
                                            <li>Feedback</li>
                                        </a>
                                    </Link>
                                    <Link href={"/region-list"}>
                                        <a>
                                            <li>Regions</li>
                                        </a>
                                    </Link>

                                </ul>
                                <ul>
                                    <h5>For sellers</h5>
                                    <Link href={"/search-leads"}>
                                        <a>
                                            <li>Buyers</li>
                                        </a>
                                    </Link>
                                    <Link href={"/terms"}>
                                        <a>
                                            <li>Terms & conditions</li>
                                        </a>
                                    </Link>
                                    <Link href={"/complaint"}>
                                        <a>
                                            <li>Complaint</li>
                                        </a>
                                    </Link>
                                </ul>
                            </div>
                            <div className="col-12 p-0 position-relative">
                        <span id="siteseal" className="siteseal">
                            <script async type="text/javascript"
                                    src="https://seal.godaddy.com/getSeal?sealID=nxWeAJ7brTF9yiLo17t3Sq2PaSjLm8M08yEk6H8U22zjsZ2bJTaxUn2N4Pcv"></script>
                        </span>
                                <ul className="social-link">
                                    <li>
                                        <a href="https://www.facebook.com/officialgtplaza/" target="_blank"
                                           rel="noreferrer">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                <path fill="currentColor"
                                                      d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"
                                                      className=""></path>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://twitter.com/OfficialGTPlaza" target="_blank" rel="noreferrer">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                <path fill="currentColor"
                                                      d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-48.9 158.8c.2 2.8.2 5.7.2 8.5 0 86.7-66 186.6-186.6 186.6-37.2 0-71.7-10.8-100.7-29.4 5.3.6 10.4.8 15.8.8 30.7 0 58.9-10.4 81.4-28-28.8-.6-53-19.5-61.3-45.5 10.1 1.5 19.2 1.5 29.6-1.2-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3a65.447 65.447 0 0 1-29.2-54.6c0-12.2 3.2-23.4 8.9-33.1 32.3 39.8 80.8 65.8 135.2 68.6-9.3-44.5 24-80.6 64-80.6 18.9 0 35.9 7.9 47.9 20.7 14.8-2.8 29-8.3 41.6-15.8-4.9 15.2-15.2 28-28.8 36.1 13.2-1.4 26-5.1 37.8-10.2-8.9 13.1-20.1 24.7-32.9 34z"
                                                      className=""></path>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.instagram.com/officialgtplaza/" target="_blank"
                                           rel="noreferrer">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                <path fill="currentColor"
                                                      d="M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z"
                                                      className=""></path>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.linkedin.com/company/officialgtplaza" target="_blank"
                                           rel="noreferrer">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                <path fill="currentColor"
                                                      d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
                                                      className=""></path>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.pinterest.com/globaltradeplaza/" target="_blank"
                                           rel="noreferrer">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                <path fill="currentColor"
                                                      d="M448 80v352c0 26.5-21.5 48-48 48H154.4c9.8-16.4 22.4-40 27.4-59.3 3-11.5 15.3-58.4 15.3-58.4 8 15.3 31.4 28.2 56.3 28.2 74.1 0 127.4-68.1 127.4-152.7 0-81.1-66.2-141.8-151.4-141.8-106 0-162.2 71.1-162.2 148.6 0 36 19.2 80.8 49.8 95.1 4.7 2.2 7.1 1.2 8.2-3.3.8-3.4 5-20.1 6.8-27.8.6-2.5.3-4.6-1.7-7-10.1-12.3-18.3-34.9-18.3-56 0-54.2 41-106.6 110.9-106.6 60.3 0 102.6 41.1 102.6 99.9 0 66.4-33.5 112.4-77.2 112.4-24.1 0-42.1-19.9-36.4-44.4 6.9-29.2 20.3-60.7 20.3-81.8 0-53-75.5-45.7-75.5 25 0 21.7 7.3 36.5 7.3 36.5-31.4 132.8-36.1 134.5-29.6 192.6l2.2.8H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48z"
                                                      className=""></path>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.youtube.com/channel/UCdEC8x4NB_EIxm_nYXXQpcw"
                                           target="_blank" rel="noreferrer">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                <path fill="currentColor"
                                                      d="M186.8 202.1l95.2 54.1-95.2 54.1V202.1zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-42 176.3s0-59.6-7.6-88.2c-4.2-15.8-16.5-28.2-32.2-32.4C337.9 128 224 128 224 128s-113.9 0-142.2 7.7c-15.7 4.2-28 16.6-32.2 32.4-7.6 28.5-7.6 88.2-7.6 88.2s0 59.6 7.6 88.2c4.2 15.8 16.5 27.7 32.2 31.9C110.1 384 224 384 224 384s113.9 0 142.2-7.7c15.7-4.2 28-16.1 32.2-31.9 7.6-28.5 7.6-88.1 7.6-88.1z"
                                                      className=""></path>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://g.page/global-trade-plaza?share" target="_blank"
                                           rel="noreferrer">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                                <path fill="currentColor"
                                                      d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"
                                                      className=""></path>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://wa.me/+918467906264" target="_blank" rel="noreferrer">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                <path
                                                    d="M224 122.8c-72.7 0-131.8 59.1-131.9 131.8 0 24.9 7 49.2 20.2 70.1l3.1 5-13.3 48.6 49.9-13.1 4.8 2.9c20.2 12 43.4 18.4 67.1 18.4h.1c72.6 0 133.3-59.1 133.3-131.8 0-35.2-15.2-68.3-40.1-93.2-25-25-58-38.7-93.2-38.7zm77.5 188.4c-3.3 9.3-19.1 17.7-26.7 18.8-12.6 1.9-22.4.9-47.5-9.9-39.7-17.2-65.7-57.2-67.7-59.8-2-2.6-16.2-21.5-16.2-41s10.2-29.1 13.9-33.1c3.6-4 7.9-5 10.6-5 2.6 0 5.3 0 7.6.1 2.4.1 5.7-.9 8.9 6.8 3.3 7.9 11.2 27.4 12.2 29.4s1.7 4.3.3 6.9c-7.6 15.2-15.7 14.6-11.6 21.6 15.3 26.3 30.6 35.4 53.9 47.1 4 2 6.3 1.7 8.6-1 2.3-2.6 9.9-11.6 12.5-15.5 2.6-4 5.3-3.3 8.9-2 3.6 1.3 23.1 10.9 27.1 12.9s6.6 3 7.6 4.6c.9 1.9.9 9.9-2.4 19.1zM400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM223.9 413.2c-26.6 0-52.7-6.7-75.8-19.3L64 416l22.5-82.2c-13.9-24-21.2-51.3-21.2-79.3C65.4 167.1 136.5 96 223.9 96c42.4 0 82.2 16.5 112.2 46.5 29.9 30 47.9 69.8 47.9 112.2 0 87.4-72.7 158.5-160.1 158.5z"/>
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 trending">
                                <FooterCategories/>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 footer-bottom">
                        <div className="container box">
                            <h6>All right reserved 2022 | globaltradeplaza.com</h6>
                        </div>
                    </div>
                </footer>
                {this.state.isMobile && <div className="mob-navigation">
                    <ul>
                        <li onClick={this.handleActiveState.bind(this,1)}
                            className={this.state.activeItem === 1 ? "active" : ''}
                        >
                            <Link href="/">
                                <a>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                        <path fill="currentColor"
                                              d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"
                                              className=""></path>
                                    </svg>
                                    <span>Home</span>
                                </a>
                            </Link>
                        </li>
                        <li onClick={this.handleActiveState.bind(this,2)}
                            className={this.state.activeItem === 2 ? "active" : ''}
                        >   <Link href={"/search-products"}>
                                <a>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                        <path fill="currentColor"
                                              d="M554.12 83.51L318.36 4.93a95.962 95.962 0 0 0-60.71 0L21.88 83.51A32.006 32.006 0 0 0 0 113.87v49.01l265.02-79.51c15.03-4.5 30.92-4.5 45.98 0l265 79.51v-49.01c0-13.77-8.81-26-21.88-30.36zm-279.9 30.52L0 196.3v228.38c0 15 10.42 27.98 25.06 31.24l242.12 53.8a95.937 95.937 0 0 0 41.65 0l242.12-53.8c14.64-3.25 25.06-16.24 25.06-31.24V196.29l-274.2-82.26c-9.04-2.72-18.59-2.72-27.59 0zM128 230.11c0 3.61-2.41 6.77-5.89 7.72l-80 21.82C37.02 261.03 32 257.2 32 251.93v-16.58c0-3.61 2.41-6.77 5.89-7.72l80-21.82c5.09-1.39 10.11 2.44 10.11 7.72v16.58zm144-39.28c0 3.61-2.41 6.77-5.89 7.72l-96 26.18c-5.09 1.39-10.11-2.44-10.11-7.72v-16.58c0-3.61 2.41-6.77 5.89-7.72l96-26.18c5.09-1.39 10.11 2.44 10.11 7.72v16.58zm176 22.7c0-5.28 5.02-9.11 10.11-7.72l80 21.82c3.48.95 5.89 4.11 5.89 7.72v16.58c0 5.28-5.02 9.11-10.11 7.72l-80-21.82a7.997 7.997 0 0 1-5.89-7.72v-16.58zm-144-39.27c0-5.28 5.02-9.11 10.11-7.72l96 26.18c3.48.95 5.89 4.11 5.89 7.72v16.58c0 5.28-5.02 9.11-10.11 7.72l-96-26.18a7.997 7.997 0 0 1-5.89-7.72v-16.58z"
                                              className=""></path>
                                    </svg>
                                    <span>Product</span>
                                </a>
                            </Link>
                        </li>
                        <li onClick={this.handleActiveState.bind(this,3)}
                            className={this.state.activeItem === 3 ? "active" : ''}
                        >
                            <Link href={"/search-leads"}>
                                <a>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                        <path fill="currentColor"
                                              d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm64 236c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-64c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-72v8c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm96-114.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"
                                              className=""></path>
                                    </svg>
                                    <span>Buy leads</span>
                                </a>
                            </Link>
                        </li>
                        <li onClick={this.handleActiveState.bind(this,4)}
                            className={this.state.activeItem === 4 ? "active" : ''}
                        >
                            <Link href={"/search-suppliers"}>
                                <a>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 616 512">
                                        <path fill="currentColor"
                                              d="M602 118.6L537.1 15C531.3 5.7 521 0 510 0H106C95 0 84.7 5.7 78.9 15L14 118.6c-33.5 53.5-3.8 127.9 58.8 136.4 4.5.6 9.1.9 13.7.9 29.6 0 55.8-13 73.8-33.1 18 20.1 44.3 33.1 73.8 33.1 29.6 0 55.8-13 73.8-33.1 18 20.1 44.3 33.1 73.8 33.1 29.6 0 55.8-13 73.8-33.1 18.1 20.1 44.3 33.1 73.8 33.1 4.7 0 9.2-.3 13.7-.9 62.8-8.4 92.6-82.8 59-136.4zM529.5 288c-10 0-19.9-1.5-29.5-3.8V384H116v-99.8c-9.6 2.2-19.5 3.8-29.5 3.8-6 0-12.1-.4-18-1.2-5.6-.8-11.1-2.1-16.4-3.6V480c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32V283.2c-5.4 1.6-10.8 2.9-16.4 3.6-6.1.8-12.1 1.2-18.2 1.2z"
                                              className=""></path>
                                    </svg>
                                    <span>Companies</span>
                                </a>
                            </Link>
                        </li>

                        <li onClick={this.handleActiveState.bind(this,5)}
                            className={this.state.activeItem === 5 ? "active" : ''}
                        >
                            <Link href={ !this.state.token ? "/login" : "/user/account-settings"} id="mob_nav_login">
                                <a>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path fill="currentColor"
                                              d="M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0 112 64.5 112 144s64.5 144 144 144zm128 32h-55.1c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16H128C57.3 320 0 377.3 0 448v16c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-16c0-70.7-57.3-128-128-128z"></path>
                                    </svg>
                                    <span>Account</span>
                                </a>
                            </Link>
                        </li>

                    </ul>
                </div>}

            </>
        )
    }
}

export default withCookies(Footer);
