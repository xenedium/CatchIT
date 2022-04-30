import React from 'react';
// import { useLocalStorage } from '@mantine/hooks';
import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';


export default function HomePage() {

  // const [skipHomePage, setSkipHomePage] = useLocalStorage<boolean>({key: 'SkipHomePage', defaultValue: false});

  return (
    <Link to={"/404"}>
      <Button variant="subtle" size="md">
        GOTO 404 ex
      </Button>
    </Link>

  );
}

