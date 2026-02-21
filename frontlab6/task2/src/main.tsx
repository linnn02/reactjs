import React from "react";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import Layout from "./Layout";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

import { getCourseById } from "./data";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      { index: true, element: <Home /> },

      { path: "courses", element: <Courses /> },

      {
        path: "courses/:id",
        element: <CourseDetail />,

        errorElement: (
          <div>
            <h2>Курс не найден</h2>
            <p>Похоже, такого курса нет (неверный ID).</p>
          </div>
        ),

        loader: async ({ params }) => {
          const courseId = Number(params.id);

          const course = getCourseById(courseId);

          if (!course) {
            throw new Error("Course not found");
          }

          return { course };
        }
      },

      { path: "about", element: <About /> },

      { path: "*", element: <NotFound /> }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);