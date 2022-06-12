import React from "react";
import { Layout } from "../Components/Others/Layout";
import { useSearchParams } from 'react-router-dom';

export default function FullLoader() {
    const [ searchParams ] = useSearchParams();
    return (
        <Layout>
            <div>
                MyArticles page  Sold: { searchParams.get("sold") }
            </div>
        </Layout>
    );
}