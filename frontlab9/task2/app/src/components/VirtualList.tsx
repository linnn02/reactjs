import { useState, useMemo, useCallback } from "react";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import { generateItems } from "../utils/generateItems";

interface VirtualListProps {
    itemCount?: number;
    height?: number;
}

export function VirtualList({ itemCount = 10000, height = 500 }: VirtualListProps) {
    const [filter, setFilter] = useState("");

    const items = useMemo(() => generateItems(itemCount), [itemCount]);

    const filteredItems = useMemo(() => {
        if (!filter) return items;

        return items.filter(
            (item) =>
                item.title.toLowerCase().includes(filter.toLowerCase()) ||
            item.category.toLowerCase().includes(filter.toLowerCase())
);
    }, [items, filter]);

    const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    }, []);

    return (
        <div>
            <input type="text"
            placeholder="Filter items..."
            value={filter}
            onChange={handleFilterChange}
            />

            <List height={height} itemCount={filteredItems.length} itemSize={80} width="100%">
                {({ index, style }: ListChildComponentProps) => {
                    const item = filteredItems[index];
                    return (
                        <div style={style}>
                            <h4>{item.title}</h4><p>{item.description}</p><span>{item.category}</span></div>);
                }}
            </List></div>);
}