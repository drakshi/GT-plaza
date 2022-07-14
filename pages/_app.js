import '../styles/globals.css'
// import '../styles/css/gtplaza_home.min.css'
import '/public/assets/alert/input.css'
import '/public/assets/alert/notification.css'
import Layout from "../src/components/layout/Layout";
import {Provider} from "react-redux";
import store from "../src/redux/store";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import React, {useEffect} from "react";
import { useCookies } from 'react-cookie';
import 'react-notifications/lib/notifications.css';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Script from 'next/script'
import '../public/assets/css/menu.css'
import '../public/assets/css/style.css'
// import '../public/assets/css/certificate.css'
import Router from 'next/router';
import API from "../src/api/api.service";
const api = new API();

function MyApp({Component, pageProps}) {

    const [cookies, setCookie] = useCookies(['name']);

    useEffect(() => {
        var aScript = document.createElement('script');
        aScript.type = 'text/javascript';
        aScript.src = " https://js.stripe.com/v3/";
        document.head.appendChild(aScript);
        aScript.onload = () => {
        };
    }, []);

    React.useEffect(() => {
        const onRouteChangeHandle = (url, { shallow }) => {
            if (cookies?.auth_token !== undefined && cookies?.auth_token !== null &&  cookies?.auth_token !== ""){
                var data = { type : 1 ,url : "https://globaltradeplaza.com"+url, keyword : null ,title : document.title ? document.title : "unavailable" } ;
                api.activityLogs(data)
            }
        };
        Router.events.on('routeChangeComplete', onRouteChangeHandle); // add listener
        return () => {
            Router.events.off('routeChangeComplete', onRouteChangeHandle); // remove listener
        }
    }, []);

    return (
        <Provider store={store}>
            <Layout>{<Component {...pageProps} />}</Layout>
            <NotificationContainer/>
        </Provider>
    );
}

export default MyApp
