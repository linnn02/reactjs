import { Link, useSearchParams } from "react-router-dom";
import { courses } from "../data";

export default function Courses() {

    const [searchParams, setSearchParams] = useSearchParams();

    const sortOrder = searchParams.get("sort") || "asc";

    const sortedCourses = [...courses].sort((a, b) => {
        return sortOrder === "desc"
        ? b.title.localeCompare(a.title)
        : a.title.localeCompare(b.title);
    });

    const toggleSort = () => {
        setSearchParams({
            sort: sortOrder === "asc" ? "desc" : "asc"
        });
    };

    return (
        <div>
            <h1>Курсы</h1>
            <button onClick={toggleSort}>
                Сортировка: {sortOrder.toUpperCase()}
                </button>
                <ul>
                    {sortedCourses.map((c) => (
                        <li key={c.id}>
                            <Link to={`/courses/${c.id}`}>
                            {c.title}
                            </Link></li>))}
                </ul>
        </div>);

}