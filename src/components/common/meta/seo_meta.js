import React from "react";
import Head from "next/head";
import {withRouter} from 'next/router';

class SeoMeta extends React.Component {

    render() {

       const route_condition = this.props.router.pathname.startsWith("/product/");

        return (
            <>
                <Head>
                    <meta charSet="utf-8"/>
                    <meta name="theme-color" content="#f05454"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=yes"/>
                    <meta name="yandex-verification" content="349a3733f065e3f0"/>
                    <title>{this.props?.title}</title>
                    <meta name="description" content={this.props?.description} />
                    <meta name="keywords" content={this.props?.description} />
                    <meta property="og:type" content="article"/>
                    <meta property="og:title" content={this.props?.title}/>
                    <meta property="og:description" content={this.props?.description} />
                    <meta property="og:image" content={this.props?.image ? this.props.image : "https://globaltradeplaza.com/assets/images/logo_color.png"}/>
                    <meta property="og:image:height" content="50"/>
                    <meta property="og:image:width" content="200"/>
                    <link rel="canonical" href={this.props.router.asPath} />
                    {route_condition &&
                        <script type="application/ld+json">{`{"@context": "https://schema.org/","@type": "Product","name": ${this.props?.title},"image": [ ${this.props?.image} ],"description": ${this.props?.description},"brand": {"@type": "Brand","name": ${this.props?.brand ? this.props?.brand : "" }}} `}</script>
                    }
                    <script
                        async
                        src="https://www.googletagmanager.com/gtag/js?id=UA-184782888-2"
                    />

                    <script
                        dangerouslySetInnerHTML={{
                            __html: `window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'UA-184782888-2', {
                    page_path: window.location.pathname,
                    });`,
                        }}
                    />

                    <script
                        dangerouslySetInnerHTML={{
                            __html: `!function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?p
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window,document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '536331427920283');
        fbq('track', 'PageView');`,
                        }}
                    />
                    <noscript><img height="1" width="1" style={{display: 'none'}}
                                   src="https://www.facebook.com/tr?id=536331427920283&ev=PageView&noscript=1"
                    /></noscript>
                    <script type="application/ld+json">
                        {`{
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            "name": "Global Trade Plaza",
                            "alternateName": "Global Trade Plaza",
                            "url": "https://globaltradeplaza.com/",
                            "logo": "https://globaltradeplaza.com/assets/images/logo_color.png",
                            "contactPoint": {
                            "@type": "ContactPoint",
                            "telephone": "+91-8429088885",
                            "contactType": "Website",
                            "areaServed": "IN",
                            "availableLanguage": "en"
                        },
                            "sameAs": [
                            "https://www.facebook.com/officialgtplaza/",
                            "https://twitter.com/OfficialGTPlaza",
                            "https://www.linkedin.com/company/officialgtplaza"
                            ]
                        }`}
                    </script>
                </Head>
            </>
        )
    }
}
export default withRouter(SeoMeta);



