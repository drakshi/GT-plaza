import React from 'react';
import API from "../../src/api/api.service";
import {images} from "../../constant";
import SeoMeta from "../../src/components/common/meta/seo_meta";
const api = new API;

class Certificate extends React.Component {

    static async getInitialProps(ctx) {
        var supplier_info = null;

        await api.getSingleCertificate(ctx.query.certificate).then(async (success) => {
            supplier_info = success.data.response;
        });
        return {
            supplier_info: supplier_info,
        }
    }

    render() {
        return (
            <>
                <SeoMeta title={ "Certificate - Global Trade Plaza"}
                         description={"Best B2B Marketplace Platform and Top 10 b2b Portal in India is Global Trade Plaza. We are Business to Business Import Export Portal helping companies, Traders and Manufacturers to find Buyers"}
                />
                <section className="certificate-user">
                    <div className="card">
                        <img className="border-img tl" src={images.certificate.default.src}/>
                        <img className="border-img tr" src={images.certificate.default.src}/>
                        <img className="border-img bl" src={images.certificate.default.src}/>
                        <img className="border-img br" src={images.certificate.default.src}/>
                        <div className="row justify-content-center">
                            <div className="col-12 view">
                                <div className="col-12 content">
                                    <div className="header">
                                        <img className="icon" src={images.guarantee.default.src}/>
                                        <h2>Global trade assurance certificate</h2>
                                    </div>
                                    <div className="company_info">
                                        <h4 id="company">{this.props.supplier_info?.company}</h4>
                                        <h6 className="address">{this.props.supplier_info?.address}</h6>
                                    </div>
                                    <div className="company_disc">
                                        <ul>
                                            <li>
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 512 512">
                                                    <path fill="currentColor"
                                                          d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
                                                          className=""></path>
                                                </svg>
                                                <span>Contact person</span>:
                                                <b id="contact-person">
                                                    {this.props.supplier_info?.contact_person}
                                                </b>
                                            </li>
                                            <li>
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 512 512">
                                                    <path fill="currentColor"
                                                          d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
                                                          className=""></path>
                                                </svg>
                                                <span>Address</span>: <b className="address">
                                                 {this.props.supplier_info?.address}
                                            </b></li>
                                            <li>
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 512 512">
                                                    <path fill="currentColor"
                                                          d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
                                                          className=""></path>
                                                </svg>
                                                <span>Registration number</span>:
                                                <b id="reg-number">
                                                    {this.props.supplier_info?.registration_number}
                                                </b>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="issued-on">
                                        <p>*The process of verification has been carried out by Global
                                            Trade Plaza.</p>
                                        <ul>
                                            <li><span id="certNo"> {this.props.supplier_info?.id}</span>Certificate no.</li>
                                            <li><span id="date">  {this.props.supplier_info?.dateIssued}</span>Issue date</li>
                                        </ul>
                                        <img className="logo" src={images.logo_color.default.src}/>
                                        <h6>
                                            <span className="name">Global Trade Plaza</span>
                                            <span>4B 4th Floor, Bigjos Tower, A-8 Netaji Subhash Place, India-110034</span>
                                            <span>+91-8429088885  |  support@globaltradeplaza.com</span>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default Certificate;
