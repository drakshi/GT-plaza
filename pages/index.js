import RequirementForm from "../src/components/common/home/requirement_form";
import RegistrationForm from "../src/components/auth/registration_form";
import AfterSidebar from "../src/components/common/home/after_sidebar";
import Categories from "../src/components/common/home/categories";
import HomeMidHeader from "../src/components/common/home/home_mid_header";
import HomeLeads from "../src/components/common/home/home_leads";
import HomeFeatureProducts from "../src/components/common/home/home_feature_products";
import TradeShows from "../src/components/common/home/tradeshow";
import Blogs from "../src/components/common/home/blogs";
import Magazines from "../src/components/common/home/magazines";
import HomeBanners from "../src/components/common/home/home_banners";
import Stories from "../src/components/common/home/stories";
import CategoryProducts from "../src/components/common/home/category_products";
import {images} from "../constant";
import React from "react";
import API from "../src/api/api.service"
import Link from "next/link";
import {setCategories} from "../src/redux/action/categoryAction";
import {connect} from "react-redux";
import {instanceOf} from "prop-types";
import {Cookies, withCookies} from "react-cookie";
import {withRouter} from "next/router";
import {imageOptimization, validateEmail} from "../src/helper";
import SeoMeta from "../src/components/common/meta/seo_meta";
import {NotificationManager} from "react-notifications";
import LoadingBar from "react-top-loading-bar";
import {Modal} from "react-bootstrap";
import {setUserInfo} from "../src/redux/action/userAction";
const api = new API();

class Home extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            email :"",
            token: this.props.cookies.get('auth_token'),
            play :false,
            progress : 30,
            errors : []
        };
        this.handleSubscribe = this.handleSubscribe.bind(this);
    }

    /*static async  getInitialProps(ctx) {
      var seller_leads = [];
      var buyer_leads = [];
      var categories = [];
      var banners = [];
      var featureProducts = [];
      var magazines = [];
      var blogs = [];
      var trade_shows = [];
      var stories = [];
      var category_products = [];

      await api.getHomeMainBanners()
          .then((res) => {
              banners = res.data.response;
          })
          .catch((error) => {
              console.log(error);
          });

      await api.getHomeCategories()
          .then((res) => {
              categories = res.data.response;
          })
          .catch((error) => {
              console.log(error);
          });

      await api.getHomeSellerLeads()
          .then((res) => {
              seller_leads = res.data.response;
          })
          .catch((error) => {
              console.log(error);
          });

      await api.getHomeBuyerLeads()
          .then((res) => {
              buyer_leads = res.data.response;
          })
          .catch((error) => {
              console.log(error);
          });


      await api.getHomeFeaturedProducts()
          .then((res) => {
              featureProducts = res.data.response;
          })
          .catch((error) => {
              console.log(error);
          });

      await api.getHomeMagazines()
          .then((res) => {
              magazines = res.data.response;
          })
          .catch((error) => {
              console.log(error);
          });

      await api.getHomeTradeShow()
          .then((res) => {
              trade_shows = res.data.response;
          })
          .catch((error) => {
              console.log(error);
          });

      await api.getHomeBlogs()
          .then((res) => {
              blogs = res.data.response;
          })
          .catch((error) => {
              console.log(error);
          });

      await api.getHomeStories()
          .then((res) => {
              stories = res.data.response;
          })
          .catch((error) => {
              console.log(error);
          });

      await api.getHomeCategoryProducts()
          .then((res) => {
              category_products = res.data.response;
          })
          .catch((error) => {
              console.log(error);
          });

      const res = await fetch('https://api.ipstack.com/check?access_key=0bda8244814cecccb33e4f5178601c19')
      const ipCountry = await res.json();

      return {
          seller_leads:seller_leads ,
          buyer_leads: buyer_leads,
          categories:categories,
          banners:banners,
          featureProducts:featureProducts,
          magazines:magazines,
          blogs:blogs,
          trade_shows:trade_shows,
          stories:stories,
          category_products:category_products,
          ipCountry:ipCountry
      }
  }*/
    handleSubscribe(event){

        this.setState({
            errors: [],
        });
        event.preventDefault();
        let errors = {};

        if (this.state.email === null || !validateEmail(this.state.email) || this.state.email === "") {
            errors["email"] = "Enter valid email address";
            this.setState({errors: errors});
            return false;
        }

        api.subscription(
            {email : this.state.email},
        )
            .then((success) => {
                NotificationManager.success(success.data.message);
                this.setState({email : ""})
            })
            .catch((error) => {
               console.log(error.response.data.message);
            });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.cookies.get('auth_token') !== this.props.cookies.get('auth_token')){
            this.setState({token : this.props.cookies.get('auth_token')})
        }
    }

    componentDidMount() {
        const router = this.props.router ;
        const token =  router.asPath.startsWith("/?token=") ? router.asPath?.replace("/?token=","") : null;
        if ( token !== null && token !== "" && token !== undefined){
            const {cookies} = this.props;
            cookies.set("auth_token",token);
            api.authMe().then((success) => {
                this.setState({token :  token},()=>{
                    this.props.userInfo(success.data.response);
                })
            });
        }
        if (this.props.category_products.length > 0){
            this.setState({
                progress : 100
            })
        }
    }

    render() {

        return (<>

            {/*Meta*/}
            <SeoMeta title={"Global B2B Marketplace, B2B Websites India, Import Export Portal & Wholesale b2b Marketplace"}
                     description={"Best B2B Marketplace Platform and Top 10 b2b Portal in India is Global Trade Plaza. We are Business to Business Import Export Portal helping companies, Traders and Manufacturers to find Buyers"}/>

            <LoadingBar progress={this.state.progress} color="blue"/>

            {/*Top section*/}
            <div className="container-fluid banner-section">
                <div className="row">

                    {/*Left Bar*/}
                    <Categories categories={this.props.categories}/>

                    {/*Banners*/}
                    <div className="banner-slider col-md-8" id="head-banner">
                        <HomeBanners banners={this.props.banners}/>
                    </div>

                    {/*Right Bar*/}
                    <div className="form col-md-2">

                        {!this.state.token ?
                            <>
                                {/*Non-Logged in user*/}
                                <h5><b>Join for free now</b></h5>
                                <RegistrationForm ipCountry={this.props.ipCountry}/>
                            </>
                            :
                            <>
                                {/*Logged in user*/}
                                <AfterSidebar/>
                            </>
                        }
                    </div>
                </div>
            </div>


            {/*Mid Header*/}
            <HomeMidHeader/>

            {/*Home Leads*/}
            <div className="container-fluid home-leads">
                <div className="row">
                    <HomeLeads type="2" leads={this.props.buyer_leads} title={"LATEST BUY LEADS"}/>
                    <HomeLeads type="1" leads={this.props.seller_leads} title={"LATEST SELLER LEADS"}/>
                </div>
            </div>


            {/*Home feature products*/}
            <HomeFeatureProducts featureProducts={this.props.featureProducts}/>


            {/*Category Products*/}
            <div className="container-fluid popular">
                <div className="row">
                    <CategoryProducts category_products={this.props.category_products}/>
                </div>
            </div>


            {/* middle header section*/}
            <div className="container-fluid how-it-works">
                <div className="container p-0">
                    <div className="col-12 area">
                        <div className="row">
                            <h3>Its easy to find deals at Global Trade Plaza</h3>
                            <div className="col-md-4 col-12 contain">
                                <div className="col-12 box">
                                    <img className="lazy" src={images.globe.default.src} width="80" height="80"
                                         alt="B2B Marketplace in India"/>
                                    <h3>Global Exposure</h3>
                                    <p>We connect exporters, manufacturers, customers, and companies from India and
                                        outside,
                                        providing them with worldwide exposure and new business opportunities.</p>
                                </div>
                            </div>
                            <div className="col-md-4 col-12 contain">
                                <div className="col-12 box">
                                    <img className="lazy" src={images.secure.default.src} width="80" height="80"
                                         alt="Wholesale B2B Marketplace"/>
                                    <h3>Genuine Leads</h3>
                                    <p>We generate genuine and sales qualified leads for our clients from different
                                        domains.
                                        We are
                                        one of the top B2B lead generation companies in India.
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-4 col-12 contain">
                                <div className="col-12 box">
                                    <img className="lazy" src={images.ads.default.src} width="80" height="80"
                                         alt="B2B Marketing"/>
                                    <h3>Advertising Services</h3>
                                    <p>We help small or medium-scale companies expand their reach by providing effective
                                        and
                                        affordable marketing and advertising services.</p>
                                </div>
                            </div>
                            <ul>
                                <a onClick={()=>{this.setState({play:true})}}>
                                    <li className="play" type="" data-toggle="modal" data-target="#videoModal" id="playVideo">
                                        Play the video
                                    </li>
                                </a>
                                <Modal
                                    dialogClassName={"modal-dialog-centered"}
                                    size="xl"
                                    onHide={()=>{
                                    this.setState({
                                        play : false
                                    })
                                }} show={this.state.play}>
                                    <div className="modal-body video-wrapper">
                                        <iframe src={"https://www.youtube.com/embed/_VxatQm8AfA"}
                                                title="YouTube video player" frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen="" loading="lazy">
                                        </iframe>
                                    </div>
                                </Modal>
                                <Link href={"/about"}>
                                    <a>
                                        <li className="know">Know more about us</li>
                                    </a>
                                </Link>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/*Customer stories*/}
            <div className="container reviews video-container">
                <div className="col-12 list px-3">
                    <div className="col-12 vid-testimonial">
                        <div className="row align-items-center">
                            <div className="col-xl-4 col-lg-12 col-md-12">
                                <h3>WHAT OUR CUSTOMERS SAY</h3>
                                <Link href={"/success-stories"}>
                                    <a>
                                        <button className="btn btn-primary d-lg-block d-none">View all reviews</button>
                                    </a>
                                </Link>
                            </div>
                            <div className="col-xl-8 col-lg-12 col-md-12">
                                <div className="row">
                                    <Stories stories={this.props.stories}/>
                                </div>
                            </div>
                        </div>
                        <Link href={"/success-stories"}>
                            <a>
                                <button className="btn btn-primary d-lg-none d-block mx-auto mt-4" >View all reviews</button>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>

            {/*Magazines*/}
            <div className="container-fluid magazine">
                <h3>Global Trade Plaza FEATURED IN</h3>
                <div className="col-md-10 mx-auto">
                    <Magazines magazines={this.props.magazines}/>
                </div>
            </div>

            {/*Trade Shows*/}
            <div className="container-fluid trade-show">
                <h3>Trade shows</h3>
                <div className="container list">
                    <TradeShows trade_shows={this.props.trade_shows}/>
                </div>
                <Link href={"/tradeshows"}>
                    <a className="btn" >Explore More</a>
                </Link>
            </div>

            {/*Blogs*/}
            <div className="container-fluid blog">
                <div className="col-12 head">
                    <h4>Our Latest Blogs</h4>
                </div>
                <div className="container list">
                    <div className="latest_blogs">
                        <Blogs blogs={this.props.blogs}/>
                    </div>
                </div>
                <Link href={"/blog-list"}>
                    <a className="btn mt-3" >Explore More</a>
                </Link>
            </div>


            {/*Email subscription*/}
            <div className="container-fluid newsletter">
                <h3>Subscribe for newsletter</h3>
                <h5>Subscribe for latest news and updates related to the B2B marketplace and our company. </h5>
                <div className="col-12 form-group">
                    <input onChange={(e)=>{
                        this.setState({email : e.target.value })
                    }} type="email"
                           name="email" id="subscribe_email"
                           value={this.state.email}
                           className={
                               "form-control valid-control "+
                               (this.state.errors.email ? " is-invalid": "")
                           }
                           aria-describedby="emailHelp"
                           placeholder="Enter your email"/>
                    <a id="subscribe" className="submit_letter" onClick={(e)=>{
                        this.handleSubscribe(e)
                    }}>&#9993;</a>
                </div>
            </div>


            {/*Post Requirement*/}
            <div className="container-fluid post-enquiry" id="myDiv">
                <div className="col-12 enqiry-form">
                    <div className="row">
                        <div className="text col-lg-5 col-md-12 col-12">
                            <h4>Post your <br/>buying Requirement</h4>
                            <h6>We will connect you with a supplier best suited to your buying requirements. We have
                                with us the
                                trust of hundreds of manufacturers, exporters and buyers. We make sure you receive
                                high-quality
                                products at a reasonable price range.</h6>
                        </div>
                        <div className="form col-lg-7 col-md-12 col-12">
                            <h5>What are you looking for?</h5>
                            <div className="mt-2 col-12">
                                <div className="row">
                                    <RequirementForm type={1} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/*Companies by country*/}
            <div className="container-fluid regions">
                <h3>Companies by country</h3>
                <div className="col-12 list">
                    <ul id="countries">

                        <li>
                            <Link href={"/region/australia"}>
                                <a><img
                                    width="30" height="auto"
                                    className="lazy"
                                    src={imageOptimization("https://restcountries.eu/data/aus.svg",50)}
                                    alt=""/><span>Australia</span></a>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/region/brazil"}>
                                <a><img
                                    width="30" height="auto"
                                    className="lazy"
                                    src={imageOptimization("https://purecatamphetamine.github.io/country-flag-icons/3x2/BR.svg",50)}
                                    alt=""/><span>Brazil</span></a>
                            </Link>

                        </li>
                        <li>

                            <Link href={"/region/canada"}>
                                <a><img
                                    width="30" height="auto"
                                    className="lazy"
                                    src={imageOptimization("https://restcountries.eu/data/can.svg",50)}
                                    alt=""/><span>Canada</span></a>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/region/india"}>
                                <a><img
                                    width="30" height="auto"
                                    className="lazy"
                                    src={imageOptimization("https://restcountries.eu/data/ind.svg",50)}
                                    alt=""/><span>India</span></a>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/region/malaysia"}>
                                <a><img
                                    width="30" height="auto"
                                    className="lazy"
                                    src={imageOptimization("https://restcountries.eu/data/mys.svg",50)}
                                    alt=""/><span>Malaysia</span></a>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/region/saudi-arabia"}>
                                <a><img
                                    width="30" height="auto"
                                    className="lazy"
                                    src={imageOptimization("https://restcountries.eu/data/sau.svg",50)}
                                    alt=""/><span>Saudi Arabia</span></a>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/region/singapore"}>
                                <a><img
                                    width="30" height="auto"
                                    className="lazy"
                                    src={imageOptimization("https://restcountries.eu/data/can.svg",50)}
                                    alt=""/><span>Singapore</span></a>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/region/united-arab-emirates"}>
                                <a><img
                                    width="30" height="auto"
                                    className="lazy"
                                    src={imageOptimization("https://restcountries.eu/data/are.svg",50)}
                                    alt=""/><span>United Arab Emirates</span></a>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/region/united-states"}>
                                <a><img
                                    width="30" height="auto"
                                    className="lazy"
                                    src={imageOptimization("https://restcountries.eu/data/are.usa.svg",50)}
                                    alt=""/><span>United States</span></a>
                            </Link>
                        </li>
                    </ul>
                </div>
                <Link href={"/region-list"}>
                        <a className="btn">View all</a>
                </Link>
            </div>

            <section className="sec-info">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <div className="col-12 tile">
                                <div className="col-12 cards">
                                    <h5>What&apos;s More Than a B2B eCommerce Marketplace? Global Trade Plaza</h5>
                                    <p>We are a pioneering global B2B marketplace in India. Our purpose as a leading B2B
                                        eCommerce marketplace is to assist our clients in making a profitable business
                                        and
                                        enhance the quality of supply chain management. Our aim includes making online
                                        B2B
                                        trade and export business effortless and streamlined for exporters and importers
                                        in
                                        India and across the globe. We provide a robust platform that encompasses an
                                        international B2B marketplace that has numerous active sellers and buyers from
                                        all
                                        over the world.</p>
                                    <p> We as a B2B trade portal are augmented with a feature-rich and interactive B2B
                                        marketplace platform. Wholesale purchases have always been extended and
                                        intricate
                                        transactions. To make this system manageable, Global Trade Plaza has advanced as
                                        an
                                        innovative global B2B marketplace platform for B2B businesses and buyers to
                                        order
                                        and pay for wholesale products in a refined, quick and safe manner. We are
                                        constantly yearning to connect and solve difficulties experienced by SMEs,
                                        exporters, especially Indian exporters and Indian companies, and provide them
                                        with a
                                        unified and dependable B2B marketplace platform. </p>
                                    <p> We have helped numerous small and medium scale businesses in not only acquiring
                                        new
                                        customers but also retaining them. Along with assisting sellers in reaching
                                        potential buyers, we have also introduced them to an infallible way of turning
                                        prospects into customers. So, we do not just show you a glimpse of success, we
                                        make
                                        sure you very much attain the same. </p>
                                </div>
                            </div>
                            <div className="col-12 tile">
                                <div className="col-12 cards">
                                    <h5>Why Choose Global Trade Plaza?</h5>
                                    <p>We have elevated the game and are only going forward. To begin with, we not only
                                        offer a B2B marketplace specialising in international trade but also crucial
                                        services such as business website development, SEO promotion, social media
                                        marketing
                                        and more. And we don&#39;t just stop here, we have solutions that help
                                        businesses in
                                        converting leads into customers.</p>
                                    <p>Moreover, be it the Indian market or overseas market, both sellers and buyers in
                                        the
                                        B2B industry are innumerable. This demands credibility and assurance for a
                                        seamless
                                        business transaction. The companies including Indian wholesalers registered on
                                        our
                                        B2B trade portal are dependable names in their regions and have years of
                                        expertise.
                                        In a nutshell, we are the One-Stop Solution to your every B2B Dilemma.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-12">
                            <div className="col-12 tile">
                                <div className="col-12 cards">
                                    <h5>A B2B Marketplace Platform with Ample Business Opportunities</h5>
                                    <p>So, what makes us the best online B2B marketplace in India? It&#39;s the promise
                                        of
                                        excellence that we deliver every time. And we intend on providing much more. As
                                        a
                                        leading B2B marketplace platform, we have an expansive spectrum of categories
                                        and
                                        their products listed on our B2B trade portal. Let&#39;s have a glance at some
                                        of
                                        them-</p>
                                    <p className="mt-2"><b>B2B Fashion Marketplace-</b> We have reliable suppliers of
                                        quality, fashionable, and variety apparel. The clothing industry has an enormous
                                        market and our B2B fashion marketplace will enable you in finding and reaching
                                        the
                                        perfect supplier for your business. Our marketplace is no less than a boon for
                                        buyers and sellers of the clothing industry.</p>
                                    <p className="mt-2"><b>B2B Furniture Marketplace-</b>We have furniture and home
                                        decor
                                        sellers from across the globe listed with us. On our B2B furniture marketplace,
                                        our
                                        broad buyer base has access to exporters and manufacturers who have years of
                                        expertise in this industry. Not only is this sector vast but it has great
                                        potential
                                        and our platform is ideal for people looking forward to expanding their business
                                        in
                                        this industry.</p>
                                    <p className="mt-2"><b>B2B Equipment Marketplace-</b> We have trusted sellers of
                                        safety
                                        equipment including protective gears, helmets, gloves, and protective clothing
                                        to
                                        satisfy the demands of this rapidly growing market. The requirement of Personal
                                        Protective Equipment (PPE) is burgeoning. PPE provided by the suppliers on our
                                        platform are at par with industry standards and have decent prices.</p>
                                    <p className="mt-2"><b>B2B Agriculture Marketplace-</b> Agriculture industry has a
                                        never-ending potential and is considered one of the most profitable sectors.
                                        What
                                        makes our B2B agriculture marketplace the most advantageous in the field is the
                                        presence of thousands and thousands of competent suppliers and an active buyer
                                        base.
                                        Our sellers have to offer a tremendous range of agricultural commodities
                                        including
                                        rice, coconut, wheat, vegetables, fruits, byproducts, and more.</p>
                                    <p className="mt-2">Along with these products, we offer numerous other products for
                                        wholesale business in India. We offer tools and machinery. We also provide a
                                        variety
                                        of high-quality appliances and electronic devices for your business. For
                                        ultimate
                                        employee performance, GTP offers a variety of office supplies and gadgets.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="col-12 tile">
                                <div className="col-12 cards">
                                    <h5>A Streamlined and Unique Buying Experience is Not a Dream Anymore</h5>
                                    <p>We offer a customised buying experience that will make your buying cycle
                                        hassle-free
                                        and remarkable. Our global B2B marketplace connects genuine buyers with the
                                        finest
                                        wholesale dealers in India. From product selection and packaging to payment
                                        methods
                                        and shipment details, everything is accessible and buying decisions can be made
                                        on
                                        the very basis. Being one of the top B2B marketplace platforms in India, we
                                        understand the significance of secure and swift payment gateways in the online
                                        wholesale business. B2B buyers can pay for products via prudent and reliable
                                        payment
                                        methods including card Payments, Net Banking and Electronic Wallets. We have
                                        also
                                        established partnerships with distinguished logistics companies which in the
                                        near
                                        future will allow us to enhance the delivery and shipping procedure.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>)
    }
}



export async function getStaticProps(ctx) {
    var seller_leads = [];
    var buyer_leads = [];
    var categories = [];
    var banners = [];
    var featureProducts = [];
    var magazines = [];
    var blogs = [];
    var trade_shows = [];
    var stories = [];
    var category_products = [];

    await api.getHomeMainBanners()
        .then((res) => {
            banners = res.data.response;
        })
        .catch((error) => {
            console.log(error);
        });

    await api.getHomeCategories()
        .then((res) => {
            categories = res.data.response;
        })
        .catch((error) => {
            console.log(error);
        });

    await api.getHomeSellerLeads()
        .then((res) => {
            seller_leads = res.data.response;
        })
        .catch((error) => {
            console.log(error);
        });

    await api.getHomeBuyerLeads()
        .then((res) => {
            buyer_leads = res.data.response;
        })
        .catch((error) => {
            console.log(error);
        });


    await api.getHomeFeaturedProducts()
        .then((res) => {
            featureProducts = res.data.response;
        })
        .catch((error) => {
            console.log(error);
        });

    await api.getHomeMagazines()
        .then((res) => {
            magazines = res.data.response;
        })
        .catch((error) => {
            console.log(error);
        });

    await api.getHomeTradeShow()
        .then((res) => {
            trade_shows = res.data.response;
        })
        .catch((error) => {
            console.log(error);
        });

    await api.getHomeBlogs()
        .then((res) => {
            blogs = res.data.response;
        })
        .catch((error) => {
            console.log(error);
        });

    await api.getHomeStories()
        .then((res) => {
            stories = res.data.response;
        })
        .catch((error) => {
            console.log(error);
        });

    await api.getHomeCategoryProducts()
        .then((res) => {
            category_products = res.data.response;
        })
        .catch((error) => {
            console.log(error);
        });

    const res = await fetch('https://api.ipstack.com/check?access_key=0bda8244814cecccb33e4f5178601c19')
    const ipCountry = await res.json();

    return {
        props:{seller_leads , buyer_leads,categories,banners,featureProducts,magazines,blogs,trade_shows,stories,category_products,ipCountry,fallback:false}
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCategory: (data) => dispatch(setCategories({ type: "UPDATE_CATEGORIES", data: data })),
        userInfo: (data) => dispatch(setUserInfo({type: "UPDATE_USER_INFO", data: data})),
    };
};

export default withRouter(withCookies(connect(null, mapDispatchToProps)(Home)));
