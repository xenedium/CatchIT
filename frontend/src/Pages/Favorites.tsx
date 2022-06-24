import React from 'react'
// import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from '@mantine/hooks'
import { Layout } from '../Components/Others/Layout'

export default function Favorites() {
    // const navigate = useNavigate()
    const [ favorites ] = useLocalStorage<number[]>({
        key: "favorites",
        defaultValue: []
    })
    return (
        <Layout>
            {
                favorites.map(id => (
                    <div>{id}</div>
                ))
            }
        </Layout>
  )
}
