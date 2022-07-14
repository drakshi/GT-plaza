import {Cookies} from "react-cookie";
const cookies = new Cookies();

export const  token = {
    value : cookies.get("auth_token") ?  cookies.get("auth_token") : ""
};

export const images = {

    vid_frame: require('../public/assets/images/vid-frame.png'),
    certificate: require('../public/assets/images/c-border.svg'),
    guarantee: require('../public/assets/images/guarantee.svg'),
    banner_about: require('../public/assets/images/banner-about.png'),
    not_found: require('../public/assets/images/no-data.svg'),
    region: require('../public/assets/images/region.svg'),
    gallery_image: require('../public/assets/images/gallery.png'),
    profile: require('../public/assets/images/profile.png'),
    banner_trade: require('../public/assets/images/banner-trade.png'),
    banner_blog: require('../public/assets/images/blog-banner.png'),
    logo_color: require('../public/assets/images/logo_color.png'),
    logo_default: require('../public/assets/images/logo-default.png'),
    logo_mono: require('../public/assets/images/logo_mono.png'),
    secure: require('../public/assets/images/secure.svg'),
    globe: require('../public/assets/images/globe.svg'),
    ads: require('../public/assets/images/ads.svg'),
    trusted: require('../public/assets/images/trusted.png'),
    approved: require('../public/assets/images/approved.png'),
    points: require('../public/assets/images/points.png'),
    advertise : require('../public/assets/images/banner/advertise.jpg'),
    classical : require('../public/assets/images/classic-badge.svg'),
    classicRank : require('../public/assets/images/classic-rank.svg'),
    world_svg: require('../public/assets/images/world.svg'),
    expand_svg: require('../public/assets/images/expand.svg'),
    customer_support_svg: require('../public/assets/images/customer-support.svg'),
    crown_svg: require('../public/assets/images/crown.svg'),
    secureTrade : require('../public/assets/images/secureTrade.svg'),
    transaprent: require('../public/assets/images/transaprent.svg'),
    planet: require('../public/assets/images/planet.svg'),
    freeTrade: require('../public/assets/images/FreeTrade.svg'),
    terms : require('../public/assets/images/banner/terms.jpg'),
    privacy_policy : require('../public/assets/images/banner/privacy-policy.jpg'),
    feedback: require('../public/assets/images/banner/feedback.jpg'),
    career : require('../public/assets/images/banner/career.jpg'),
    news_events: require('../public/assets/images/banner/news.jpg'),
    faq: require('../public/assets/images/banner/faq.jpg'),
    success: require('../public/assets/images/banner/success.jpg'),
    country: require('../public/assets/images/india.png')
};



