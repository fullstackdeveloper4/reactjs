import React from 'react'
import { Route } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import HeroBanner from '../components/HeroBanner'
function CommonRoute({ component: Component, ...args }) {
    return (
        <Route
            {...args}
            render={(props) => 
                <>
                    <Header />
                    {window.location.pathname !== "/dashboard" && <HeroBanner />}
                    <Component {...props} />
                    <Footer />
                </>
            }
        />
    )
}

export default CommonRoute;
