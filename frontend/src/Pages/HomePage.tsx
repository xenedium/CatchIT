import React, { useEffect } from 'react'
import { HeaderResponsive, FooterLinks, LeadGrid } from '../Components/Home'
import { ReactComponent as HomeWaves } from '../Assets/Svgs/HomeWaves.svg'
import { useNavigate } from 'react-router-dom'

const headerLinks = [
    {
        "link": "/login",
        "label": "Login"
    },
    {
        "link": "/register",
        "label": "Create Account"
    },
    {
        "link": "https://github.com/xenedium/CatchIT",
        "label": "Github"
    },
    {
        "link": "/about",
        "label": "About us"
    }
]

const footerLinks = [
    {
        "title": "About",
        "links": [
            {
                "label": "Features",
                "link": "#"
            },
            {
                "label": "Pricing",
                "link": "#"
            },
            {
                "label": "Support",
                "link": "#"
            },
            {
                "label": "Forums",
                "link": "#"
            }
        ]
    },
    {
        "title": "Project",
        "links": [
            {
                "label": "Contribute",
                "link": "#"
            },
            {
                "label": "Media assets",
                "link": "#"
            },
            {
                "label": "Changelog",
                "link": "#"
            },
            {
                "label": "Releases",
                "link": "#"
            }
        ]
    },
    {
        "title": "Community",
        "links": [
            {
                "label": "Join Discord",
                "link": "#"
            },
            {
                "label": "Follow on Twitter",
                "link": "#"
            },
            {
                "label": "Email newsletter",
                "link": "#"
            },
            {
                "label": "GitHub discussions",
                "link": "#"
            }
        ]
    }
]


export default function HomePage() {

    return (
        <>
            <HeaderResponsive links={headerLinks}/>
            <LeadGrid />
            <HomeWaves />
            <FooterLinks data={ footerLinks } />
        </>

    );
}

