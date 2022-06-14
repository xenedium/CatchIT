import React from 'react';
import { createStyles, Card, Image, ActionIcon, Group, Text, Avatar, Button } from '@mantine/core';
import { Heart, Clipboard } from 'tabler-icons-react';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    footer: {
        padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
        marginTop: theme.spacing.md,
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
            }`,
    },
}));

interface ArticleCardFooterProps {
    image: string;
    title: string;
    link: string;
    author: {
        name: string;
        description: string;
        image: string;
    };
}

export function ArticleCard({
    image,
    title,
    link,
    author,
}: ArticleCardFooterProps) {
    const { classes, theme } = useStyles();
    const navigate = useNavigate();

    return (
        <Card withBorder p="lg" radius="md" className={classes.card}>
            <Card.Section mb="sm">
                <Image src={image} alt={title} height={180} />
            </Card.Section>

            <Text weight={700} className={classes.title} mt="xs">
                {title}
            </Text>

            <Group mt="lg">
                <Avatar src={author.image} radius="sm" />
                <div>
                    <Text weight={500}>{author.name}</Text>
                    <Text size="xs" color="dimmed">
                        {author.description}
                    </Text>
                </div>
            </Group>

            <Card.Section className={classes.footer}>
                <Group position="apart">
                    <Button size="xs" onClick={() => { navigate(link) }}>
                        View
                    </Button>
                    <Group spacing={0}>
                        <ActionIcon onClick={() => { alert('add to favs') }}>
                            <Heart size={18} color={theme.colors.red[6]} />
                        </ActionIcon>
                        <ActionIcon onClick={() => { navigator.clipboard.writeText(`https://catchit.herokuapp.com${link}`) }}>
                            <Clipboard size={16} color={theme.colors.blue[6]} />
                        </ActionIcon>
                    </Group>
                </Group>
            </Card.Section>
        </Card>
    );
}