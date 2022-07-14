import React from 'react';
import {images} from "../constant";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import SeoMeta from "../src/components/common/meta/seo_meta";


class About extends  React.Component{
    render(){
        return(
            <>
                <SeoMeta title={"About - Global Trade Plaza"}
                         description={"Best B2B Marketplace Platform and Top 10 b2b Portal in India is Global Trade Plaza. We are Business to Business Import Export Portal helping companies, Traders and Manufacturers to find Buyers"}
                />
                <section className="static about">
                    <div className="col-12 banner">
                        <img src={images.banner_about.default.src} alt=""/>
                        <div className="text">
                            <h3>Global Trade Plaza</h3>
                            <p>The Future of International Trade and Worldwide Network</p>
                            <h1 className="mt-1">Top B2B Companies in India & B2B Marketplace</h1>
                        </div>
                    </div>
                    <div className="container info">
                        <div className="col-12 card">
                            <h3 className="head-before">What We Are?</h3>
                            <p className="fst-italic">“We are a global B2B Marketplace specializing in international
                                trade as well as solving the difficulties faced by Indian companies involved in import and export.”</p>
                            <hr />
                                <h3 className="head-before">Understanding Our Work As A B2B Portal</h3>
                                <p>Global Trade Plaza connects manufacturers, exporters, suppliers, or any business-to-
                                    business seller with an enormous base of national and international buyers. We
                                    provide an interactive B2B marketplace platform for sellers to exhibit their
                                    products and reach potential buyers.</p>
                                <p>Our journey as a B2B marketplace in India commenced with the aim of addressing the
                                    problems in the B2B sector, especially the ones concerning small scale and medium
                                    scale businesses and Indian exporters. In B2B, the export sector is highly
                                    competitive and small scale exporters have been struggling for a long time to overcome the same.
                                    But various obstacles such as the language barrier and understanding of the supply
                                    chain make it difficult for them (especially Indian exporters) to thrive.</p>

                                <p className="text-dark fw-bolder">We at Global Trade Plaza understand this and
                                    offer a one-stop solution that will help such companies make a profitable business.</p>
                                <p>We offer a feature-rich B2B marketplace in India and numerous other countries for
                                    sellers to attract and reach a diverse customer base while also avoiding the
                                    competitive nature of a traditional online B2B portal. Simultaneously, we assure the
                                    buyers on our platform have access to a comprehensive and reliable seller base.</p>
                                <p>In our journey from being a B2B marketplace in India to becoming a global name in
                                    the B2B ecosystem, we have assisted several companies in achieving their business
                                    objectives and establishing themselves in the overseas market.</p>
                        </div>
                    </div>
                    <div className="container">
                        <div className="col-12 card">
                            <div className="row">
                                <div className="col-md-12 text-left">
                                    <h4>Our Vision</h4>
                                    <p className="text-dark fw-bolder pt-2 pb-1">&quot;Our vision is to be the ultimate solution to every complication faced by
                                        exporters and
                                        importers and make international trading simple, safe and quick.&quot;</p>
                                </div>
                                <div className="col-md-12 text-left">
                                    <p>Indian exporters are an integral part of the entire supply chain and through our
                                        online
                                        B2B portal, we want to make sure that their problems are addressed and solved in
                                        the
                                        best possible manner. We want to open the doors to safe international trade and
                                        make
                                        it as transparent, timely and easy as possible.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container we-offer">
                        <div className="row justify-content-center">
                            <div className="col-md-9 col-12 view">
                                <div className="row">
                                    <div className="col-md-5 left">
                                        <h4>What we offer <br />At Global Trade Plaza</h4>
                                        <p>We believe our growth is in the accomplishments of our customers. Therefore,
                                            we go
                                            above and beyond to offer services that are unique and effective. As one of
                                            the fastest-
                                            growing B2B companies in India, we also have a dedicated team of
                                            professionals who
                                            have years of expertise in digital marketing, advertising, SEO, and
                                            more.</p>
                                    </div>
                                    <div className="col-md-7 right">
                                        <ul>
                                            <li>
                                                <img src={images.world_svg.default.src} width="80" height="80" alt=""/>
                                                <h5 className="fw-bolder">Global Exposure</h5>
                                                <p>We concentrate on providing global exposure by getting you
                                                    multiple business opportunities through our international B2B
                                                    marketplace. Our team
                                                    performs strong research and analysis before making any decision and
                                                    the same
                                                    reflects in the trust that our clients place in us.</p>
                                            </li>
                                            <li>
                                                <img src={images.expand_svg.default.src} width="80" height="80" alt=""/>
                                                <h5 className="fw-bolder">Expand Your Business</h5>
                                                <p>We will help you get your small or medium scale business,
                                                    clients from across the globe. We specialise in international trade
                                                    and leverage the
                                                    same to provide you with digital solutions that will widen your
                                                    business and its reach
                                                    in your country and other places as well.</p>
                                            </li>
                                            <li>
                                                <img src={images.customer_support_svg.default.src} width="80" height="80"
                                                     alt=""/>
                                                <h5 className="fw-bolder">Customized Packages</h5>
                                                <p>We offer economical subscription packages and our services
                                                    can be modified to meet your unique business requirements. At Global
                                                    Trade Plaza,
                                                    every business is empowered with ample space to expand and prosper
                                                    based on their
                                                    budget and needs.</p>
                                            </li>
                                            <li>
                                                <img src={images.crown_svg.default.src} width="80" height="80" alt=""/>
                                                <h5 className="fw-bolder">Only the Best for You</h5>
                                                <p>We know that one shoe can not fit all. With years of
                                                    experience in the industry, our experts analyse and understand what
                                                    your business
                                                    needs to grow and develop. We provide solutions that are best suited
                                                    to your
                                                    requirements.</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 vision">
                        <div className="container area">
                            <h4>GOALS WE WORK WITH</h4>
                            <div className="row">
                                <div className="col-md-3 contain">
                                    <div className="col-12 card">
                                        <img src={images.secureTrade.default.src} width="80" height="80" alt=""/>
                                        <h6>To solve the difficulties faced by Indian exporters and importers and help
                                            them conduct secure and profitable business transactions</h6>
                                    </div>
                                </div>
                                <div className="col-md-3 contain">
                                    <div className="col-12 card">
                                        <img src={images.transaprent.default.src} width="80" height="80" alt=""/>
                                        <h6>To help exporters and importers leave behind the trouble of outworn B2B
                                            sales techniques and provide them with resourceful, scalable, and cost-effective
                                            solutions.</h6>
                                    </div>
                                </div>
                                <div className="col-md-3 contain">
                                    <div className="col-12 card">
                                        <img src={images.planet?.default?.src} width="80" height="80" alt=""/>
                                        <h6>To assist small and medium-scale businesses in ascertaining a strong
                                            presence in the industry and digital world and uphold their footings.</h6>
                                    </div>
                                </div>
                                <div className="col-md-3 contain">
                                    <div className="col-12 card">
                                        <img src={images.freeTrade.default.src} width="80" height="80" alt=""/>
                                        <h6>Reinvent the global supply chain by facilitating a reliable and transparent
                                            B2B marketplace platform for international trade.</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container offer-acco top-0">
                        <div className="row justify-content-center">
                            <div className="col-md-9 col-12 view">
                                <h4 className="offer-head mb-1 fw-bolder">WHAT MAKES US ONE OF A KIND</h4>
                                <h6 className="text-center mx-auto mb-4">Although we started as a B2B marketplace in
                                    India, our unique services aided us in
                                    becoming an international platform. Here&#39;s a glance at some of those exceptional
                                    services-</h6>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<AddIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                            <Typography><b>Verified Buy Leads</b></Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            <div className="card-body">
                                                We provide B2B lead generation services using innovative
                                                sales and advertising methods. We ensure genuine leads and potential
                                                customers
                                                to our clients.
                                            </div>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<AddIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography><b>Advertising and Marketing Services</b></Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            <div className="card-body">
                                                We offer a number of advertising and marketing services like banner advertisement, interactive digital catalogue, and social media advertisement.
                                            </div>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<AddIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography><b>End to end business solutions</b></Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            <div className="card-body">
                                                We develop engaging business websites and applications for our clients with the aim of boosting their reach and enticing more prospects.
                                            </div>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<AddIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography><b>Effective digital marketing strategies</b></Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            <div className="card-body">
                                                We provide our clients with exceptional digital and social media marketing strategies. We have a dedicated team of experts who help our clients achieve a strong digital presence and grow organically.
                                            </div>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<AddIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography><b>Significant SEO services</b></Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            <div className="card-body">
                                                We have a team of highly qualified professionals who are experts in Search Engine Optimization. They ensure that the projects of our clients perform to their full potential.
                                            </div>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}
export default About
