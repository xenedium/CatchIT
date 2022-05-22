import React, { useState } from 'react';
import { Container, Grid, SimpleGrid, Skeleton, useMantineTheme, Title, Checkbox, Space } from '@mantine/core';
import Typist from 'react-typist'

const PRIMARY_COL_HEIGHT = 300;

export function LeadGrid() {
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;
  const [checked, setChecked] = useState(true);

  return (
    <Container my="md">
      <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <Typist cursor={{ show: false }} avgTypingDelay={40}>
          <Title order={1} style={{ marginTop: 10 }} >
            Hello there !
            <Space h="md" />
            <Typist.Delay ms={1000} />
            It looks like you are new here.
            <Space h="md" />
            <Typist.Delay ms={1000} />
            Take time to visit each page.
            <Space h="md" />
          </Title>
        </Typist>
        <Grid gutter="md">
          <Grid.Col>
            <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
          </Grid.Col>
          <Checkbox
            style={{
              marginTop: 20,
              marginLeft: 20,
            }}
            label={"Skip this page next time ?"}
            checked={checked}
            onChange={(event) => {
              setChecked(event.target.checked);
            }} />
        </Grid>
      </SimpleGrid>
    </Container>
  );
}