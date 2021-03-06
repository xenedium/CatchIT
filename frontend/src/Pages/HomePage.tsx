import React, { useEffect } from 'react'
import PublicUrl from '../Config'
import { Layout } from '../Components/Others/Layout';

import {
    createStyles,
    Image,
    Container,
    Title,
    Button,
    Group,
    Text,
    List,
    ThemeIcon,
    Space,
    Anchor,
} from '@mantine/core';
import { Check } from 'tabler-icons-react';
import { Link } from 'react-router-dom';


const useStyles = createStyles((theme) => ({
    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: theme.spacing.xl * 4,
        paddingBottom: theme.spacing.xl * 4,
    },

    content: {
        maxWidth: 480,
        marginRight: theme.spacing.xl * 3,

        [theme.fn.smallerThan('md')]: {
            maxWidth: '100%',
            marginRight: 0,
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: 44,
        lineHeight: 1.2,
        fontWeight: 900,

        [theme.fn.smallerThan('xs')]: {
            fontSize: 28,
        },
    },

    control: {
        [theme.fn.smallerThan('xs')]: {
            flex: 1,
        },
    },

    image: {
        flex: 1,

        [theme.fn.smallerThan('md')]: {
            display: 'none',
        },
    },

    highlight: {
        position: 'relative',
        backgroundColor:
            theme.colorScheme === 'dark'
                ? theme.fn.rgba(theme.colors[theme.primaryColor][6], 0.55)
                : theme.colors[theme.primaryColor][0],
        borderRadius: theme.radius.sm,
        padding: '4px 12px',
    },
}));


export default function HomePage() {
    useEffect(() => {
        const visitor = {
            date: new Date().toString(),
            page: window.location.pathname,
            referrer: document.referrer,
            history: window.history.length,
            navigator: {
                cookieEnabled: navigator.cookieEnabled,
                userAgent: navigator.userAgent,
                vendor: navigator.vendor,
            },
            screen: {
                width: window.screen.width,
                height: window.screen.height,
                innerHeight: window.innerHeight,
                innerWidth: window.innerWidth,
                availWidth: window.screen.availWidth,
                availHeight: window.screen.availHeight,
                colorDepth: window.screen.colorDepth,
                pixelDepth: window.screen.pixelDepth,
            }
        }
        const ClientLog = async () => {
            fetch(`${PublicUrl}/api/log`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(visitor),
            })
        }
        ClientLog()
    }, []);
    return (
        <>
            <Layout>
                <HeroBullets />
            </Layout>
        </>

    );
}



export function HeroBullets() {
    const { classes } = useStyles();
    return (
        <div>
            <Container>
                <div className={classes.inner}>
                    <div className={classes.content}>
                        <Title className={classes.title}>
                            A <span className={classes.highlight}>Django</span> & React <br /> School Project
                        </Title>
                        <Text color="dimmed" mt="md">
                            An open source Django React school project that uses JWT authentication and a REST API.
                            The topic is an e-commerce website that lets users create, edit and delete their own articles
                            and also discover other users products.
                        </Text>

                        <List
                            mt={30}
                            spacing="sm"
                            size="sm"
                            icon={
                                <ThemeIcon size={20} radius="xl">
                                    <Check size={12} />
                                </ThemeIcon>
                            }
                        >
                            <List.Item>
                                <b>TypeScript based</b> - frontend built with type safety in mind
                            </List.Item>
                            <List.Item>
                                <b>Fully responsive </b> - All pages are fully responsive and work on any device
                            </List.Item>
                            <List.Item>
                                <b>Supports image upload</b> - all uploaded images are stored in S3
                            </List.Item>
                            <List.Item>
                                <b>Rest API </b> - All api calls are made through a REST API at /api/
                            </List.Item>
                            <List.Item>
                                <b>Supports SignIn and SignUp </b> - Fully supports user login and registration,
                                <Anchor style={{ fontSize: 14 }} href="https://jwt.io/"> using Json Web Tokens</Anchor>
                            </List.Item>
                            <List.Item>
                                <b>MySQL database </b> - All user data are stored in a MySQL database <Space />( User passwords are hashed )
                            </List.Item>
                            <List.Item>
                                <b>CRUD </b> - All CRUD operations are implemented in the backend
                            </List.Item>
                        </List>

                        <Group mt={30}>
                            <Button radius="xl" size="md" className={classes.control}
                                component={Link}
                                to="/register"
                            >
                                Get started
                            </Button>
                            <Button radius="xl" size="md" className={classes.control}
                                component={Link}
                                to="/articles"
                            >
                                View Articles
                            </Button>

                            <Button<'a'> component="a" href="https://github.com/xenedium/CatchIT" variant="default" radius="xl" size="md" className={classes.control}>
                                Source code
                            </Button>

                        </Group>
                    </div>
                    <Image src={"https://ui.mantine.dev/_next/static/media/image.9a65bd94.svg"} className={classes.image} />
                </div>
            </Container>
        </div>
    );
}