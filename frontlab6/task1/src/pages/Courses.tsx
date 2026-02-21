export default function Courses() {

    const courses = [
        "React",
        "JavaScript",
        "TypeScript",
        "Node.js"
    ];

    return (
        <>
        <h1>Courses</h1>
        <ul>
            {courses.map((course, index) => (
                <li key={index}>{course}</li>))}
                </ul>
                </>
    );
}