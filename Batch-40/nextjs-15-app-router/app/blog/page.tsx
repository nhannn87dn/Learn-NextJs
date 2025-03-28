'use client'

import { useEffect, useState } from "react";

interface Category {
    id: number;
    name: string;
    slug: string;
    
}
export default function Page() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /** Có thể thay thế bằng swr hoặc react query */

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('https://api.escuelajs.co/api/v1/categories');
                const data = await res.json();
                setCategories(data);
                setLoading(false);
            } catch  {
                setError('error');
            }
        }
        fetchData();
    },[]);
  return (
    <div>
        <h1>Categories</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {categories.length > 0 && categories.map((category) => (
            <div key={category.id}>
                <h2>{category.name}</h2>
                <p>{category.slug}</p>
            </div>
        ))}
    </div>
  )
}
