import React from 'react'
import { Route , Redirect } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import HeroBanner from '../components/HeroBanner'
function PublicRoute({ component: Component, ...args }) {
    return (
        <Route
            {...args}
            render={(props) => !sessionStorage.getItem("token")  ?
                <>
                    <Header />
                    {window.location.pathname !== "/dashboard" && <HeroBanner />}
                    <Component {...props} />
                    <Footer />
                </>:
                <Redirect to="/dashboard" />
            }
        />
    )
}

export default PublicRoute
