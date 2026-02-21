import { useLoaderData, useParams } from "react-router-dom";
import type { Course } from "../data";

export default function CourseDetail() {

    const { id } = useParams();

    const { course } = useLoaderData() as { course: Course };

    return (
        <div>
            <h1>{course.title}</h1>
            <p><b>Преподаватель:</b> {course.instructor}</p>
            <p>{course.description}</p>
            <p>
                <i>Route ID parameter:</i> {id}
                </p></div>);

    }