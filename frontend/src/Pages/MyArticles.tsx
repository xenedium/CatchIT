import React, { useEffect, useState } from "react";
import { Layout } from "../Components/Others/Layout";
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Button, Container, createStyles, Grid, Group, Title } from "@mantine/core";
import { ArticleCard } from '../Components/Others/Card'
import { FullLoader } from '../Components/Others/FullLoader';

interface Article {
    id: number;
    title: string;
    description: string;
    category: number;
    seller: number;
    condition: string;
    price: string;
    quantity: number;
    is_sold: boolean;
    city: string;
    image: string;
}


export default function MyArticles() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token: string | undefined = localStorage.getItem("token")?.split(" ")[1];

        if (!token) navigate("/login");

        fetch('/api/validate-jwt', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.status !== 200) {
                    navigate(-1);
                }
                else {
                    setName(res.payload.firstname);
                    setEmail(res.payload.email);
                    setImage(`https://catchit.fra1.digitaloceanspaces.com${res.payload.image}`);
                    fetch(`/api/articles/?seller=${res.payload.id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                        .then(res => res.json())
                        .then(res => {
                            if (res.status === 404)
                            {
                                setIsLoading(false);
                                setArticles([])
                                return;
                            }
                            setArticles(res.data.filter((article: Article) => (searchParams.get("sold") === "true" ? article.is_sold : !article.is_sold)))
                            setIsLoading(false);
                        })
                }
            })
    }, [navigate, searchParams])

    return (
        <Layout>
            <Container style={{ marginTop: 40 }}>
                <Grid>
                    {!isLoading ?
                        articles.length > 0 ? articles.map(article =>
                        (
                            <Grid.Col xs={4}>
                                <ArticleCard {...{
                                    image: `https://catchit.fra1.digitaloceanspaces.com/${article.image.split('/')[3]}/${article.image.split('/')[4]}`,
                                    title: article.title,
                                    link: "/article/?id=" + article.id,
                                    author: {
                                        name: name,
                                        description: email,
                                        image: image
                                    }

                                }} />
                            </Grid.Col>
                        ))
                            : <NothingFound />          //No articles found
                        : <FullLoader />                //Loading
                    }
                </Grid>
            </Container>
        </Layout>
    );
}

const useStyles = createStyles((theme) => ({
    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        textAlign: 'center',
        fontWeight: 900,
        fontSize: 38,
        color: theme.black,

        [theme.fn.smallerThan('sm')]: {
            fontSize: 32,
        },
    }
}));

export function NothingFound() {
    const { classes } = useStyles();

    return (
            <Container>
                <Title className={classes.title}>Looks like you don't have any article...</Title>
                <Group position="center">
                    <Button size="md" component={Link} to="/" style={{marginTop: 50, marginBottom: 50}}>
                        Go back
                    </Button>
                </Group>
            </Container>
    );
}
