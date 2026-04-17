import { useMemo } from "react";

interface AnalyticsChartProps {
    items: string[];
}

function calculateAnalytics(items: string[]): number {
    console.log("Calculating analytics...");

    let result = 0;
    for (let i = 0; i < 10000000; i++) {
        result += Math.sqrt(i);
    }

    return result + items.length;
}

export function AnalyticsChart({ items }: AnalyticsChartProps) {
    const analytics = useMemo(() => calculateAnalytics(items), [items]);

    console.log("AnalyticsChart render");

    return (
        <div className="chart">
            <h3>Analytics</h3>
            <p>Calculated value: {analytics}</p>
            <p>Items: {items.length}</p>
        </div>);
}