import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import {
    HeaderTabsColored,
    FooterLinks,
}
    from '../Home';

interface HeaderTabsProps {
    user: { name: string; image: string };
}

interface FooterLinksProps {
    data: {
        title: string;
        links: { label: string; link: string }[];
    }[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Category {
    id: number;
    name: string;
    image: string | null;
}

type Props = {
    children: React.ReactNode;
};


const footerLinks: FooterLinksProps = {
    data: [
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
}




export const Layout = ({ children }: Props) => {


    const [headerData, setHeaderData] = useState<HeaderTabsProps>({
        user: {
            name: "Sign In",
            image: "https://catchit.fra1.digitaloceanspaces.com/assets/not_signed_in.png"
        }
    });

    useEffect(() => {
        if (localStorage.getItem('token'))
        {
            //@ts-ignore
            const user = jwtDecode(localStorage.getItem('token').split(' ')[1]);
            setHeaderData({
            user: {
                //@ts-ignore
                name: user.firstname,
                image: "https://catchit.fra1.digitaloceanspaces.com/assets/not_signed_in.png"
            }
        });
        }
        
    }, [])

    return (
        <>
            <HeaderTabsColored user={headerData.user} />
            <main>
                {children}
            </main>
            <FooterLinks data={footerLinks.data} />
        </>
    );
};