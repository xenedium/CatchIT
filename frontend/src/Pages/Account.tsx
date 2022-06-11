import React, { useEffect, useState } from "react";
import { Layout } from "../Components/Others/Layout";
import { useNavigate } from "react-router-dom";
import { Container, Image } from "@mantine/core";

interface UserPayload {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phone_number: string;
    city: string;
    is_admin: boolean;
    image: string;
}

export default function MyAccount() {

    const [user, setUser] = useState<UserPayload | null>(null);
    const navigate = useNavigate();

    useEffect(() => {

        const token: string | undefined = localStorage.getItem("token")?.split(" ")[1];

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
                setUser(res.payload)
            })
    }, [navigate]);


    return (
        <Layout>
            <Container>
                <div>{user ?
                    <>
                        <p>
                            `{user.id} | {user.firstname} | {user.lastname} | {user.email} | {user.phone_number} | {user.city} | {user.image} | {user.is_admin}`
                        </p>
                        <Image
                            src={`https://catchit.fra1.digitaloceanspaces.com${user.image}`}
                            alt="User Profile"
                            width={100}
                            style={{ cursor: "pointer" }}
                        />
                    </>
                    : "Redirect to login"}
                </div>
            </Container>

        </Layout>
    )
}