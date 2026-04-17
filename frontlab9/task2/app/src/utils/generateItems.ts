export interface Item {
    id: number;
    title: string;
    description: string;
    timestamp: Date;
    category: string;
}

export function generateItems(count: number): Item[] {
    const categories = ["Tech", "Science", "Business", "Sports", "Entertainment"];

    const items: Item[] = [];

    for (let i = 0; i < count; i++) {
        items.push({
            id: i,
            title: `Item ${i + 1}`,
            description: `This is the description for item ${i + 1}.`,
            timestamp: new Date(Date.now() - Math.random() * 10000000000),
            category: categories[Math.floor(Math.random() * categories.length)],
        });
    }

    return items;
}