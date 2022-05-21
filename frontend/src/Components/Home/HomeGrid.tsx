import React, { useState } from 'react';
import { Container, Grid, SimpleGrid, Skeleton, useMantineTheme, Title, Checkbox } from '@mantine/core';

const PRIMARY_COL_HEIGHT = 300;

export function LeadGrid() {
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;
  const [checked, setChecked] = useState(true);

  return (
    <Container my="md">
      <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <Title order={1} style={{marginTop: 10}}>Hello there !
          <Title order={2} style={{marginTop: 20, marginLeft: 20}}>
            It looks like you're new here.
            <Title order={3} style={{marginTop: 20, marginLeft: 30}}>
              Take time to explore everything arround here.
            </Title>
          </Title>
        </Title>
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