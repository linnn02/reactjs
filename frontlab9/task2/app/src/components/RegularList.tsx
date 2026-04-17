import { useMemo } from "react";
import { generateItems } from "../utils/generateItems";

export function RegularList({ itemCount = 10000 }: { itemCount?: number }) {
    const items = useMemo(() => generateItems(itemCount), [itemCount]);

    return (
        <div>
            {items.map((item) => (
                <div key={item.id}>
                    <h4>{item.title}</h4><p>{item.description}</p></div>))}
                    </div>);
}