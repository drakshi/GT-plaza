import React from "react";
import RegistrationForm from "../src/components/auth/registration_form";
import {images} from "../constant";
import Link from "next/link";
import SeoMeta from "../src/components/common/meta/seo_meta";

class SignUp extends React.Component {

    render() {
        return (
            <>
                <SeoMeta title={"Sign-Up – Global Trade Plaza"}
                         description={"Sign up to enjoy our benefits and services"}/>

                <section className="forms-getin">
                    <div className="col-12 align-div">
                        <div className="fields">
                            <div className="area">
                                <Link href="/">
                                    <img className="img-responsive" src={images.logo_color.default.src} alt="logo"/>
                                </Link>
                                <h3>Join Now for Free</h3>
                                <h4>Create Your Free Global Trade Plaza Account Today </h4>
                                <RegistrationForm/>
                                <p className="promo">Already have an account? <Link href="/login">Login</Link></p>
                            </div>
                        </div>
                        <div className="banner">
                            <div className="area">
                                <h1>Global Trade Plaza</h1>
                                <div id="signup-banner-holder"></div>
                                <p>All right reserved 2022 | globaltradeplaza.com<Link href="/contact">Contact us</Link></p>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default SignUp;
