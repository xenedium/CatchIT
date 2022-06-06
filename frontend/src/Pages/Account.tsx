import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { Layout } from "../Components/Others/Layout";
import { useNavigate } from "react-router-dom";

interface JWTPayload {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phone_number: string;
    city: string;
    is_admin: boolean;
    exp: number;
}

export default function MyAccount() {

    const [user, setUser] = useState<JWTPayload | null>(null);
    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem("token")?.split(" ")[1];

        if (!token) navigate("/login");

        fetch('/api/validate-jwt',{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.status !== 200)
                {
                    localStorage.removeItem("token");
                    navigate("/login");
                }
                // @ts-ignore
                setUser(jwtDecode(token) as JWTPayload);
            })
    }, [navigate]);


    return (
        <Layout>
            <h1>{ user ?
            `${user.id} | ${user.firstname} | ${user.lastname} | ${user.email} | ${user.phone_number} | ${user.city} | ${user.is_admin}` 
            : "Redirect to login" }</h1>
        </Layout>
    )
}