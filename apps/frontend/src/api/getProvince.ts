

export default async function getProvince(q: string): Promise<string> {
    return await fetch(`https://provinces.open-api.vn/api/p/search/?q=${q}`).then(res => res.json())
}