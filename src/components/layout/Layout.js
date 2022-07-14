import {useRouter} from "next/router";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import AuthHeader from "../common/afterAuth/auth_header";

export default function Layout({children}) {
    const router = useRouter();
    const condition =
        router.pathname.startsWith("/signup") ||
        router.pathname.startsWith("/certificate") ||
        router.pathname.startsWith("/login") ||
        router.pathname.startsWith("/reset-password") ||
        router.pathname.startsWith("/forgot-password");

    const auth_condition = router.pathname.startsWith("/user");

    if (condition) {
        return <>{children}</>;
    } else {
        if (auth_condition) {
            return (
                <>
                    <AuthHeader/>
                    {children}
                    <Footer/>
                </>
            );
        } else {
            return (
                <>
                    <Header/>
                    {children}
                    <Footer/>
                </>
            );
        }
    }
}
