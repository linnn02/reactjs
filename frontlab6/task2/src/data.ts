
export interface Course {
    id: number;
    title: string;
    instructor: string;
    description: string;
}

export const courses: Course[] = [
    {
        id: 1,
        title: "React Basics",
        instructor: "A. Teacher",
        description: "Основы React: компоненты, props, state."
    },
    {
        id: 2,
        title: "TypeScript Essentials",
        instructor: "B. Teacher",
        description: "Типизация в TS: интерфейсы, типы, generics."
    },
    {
        id: 3,
        title: "React Router v6",
        instructor: "C. Teacher",
        description: "Маршруты, Outlet, params, query параметры."
    },
    {
        id: 4,
        title: "Node.js Intro",
        instructor: "D. Teacher",
        description: "Основы Node.js: модули, npm, простое API."
    }
];

export function getCourseById(id: number): Course | undefined {
    return courses.find((c) => c.id === id);
}