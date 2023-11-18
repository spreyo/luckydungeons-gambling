import React, { useContext, useEffect } from 'react'
import cookie from "react-cookies"
export const LoggedIn = () => {
    useEffect(() => {
        if (window.location.pathname == "/login") {
            if (cookie.load("loggedin")) {
                window.location.pathname = "/"
            }
        }
        else if (!cookie.load("loggedin")) {
            window.location.pathname = "/login";
        }
    }, [])
    return (
        <></>
    )
}
