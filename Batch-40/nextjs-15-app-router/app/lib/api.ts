export const getCategories = async () => {
    const res = await fetch('https://api.escuelajs.co/api/v1/categories');
    const data = await res.json();
    return data;
}