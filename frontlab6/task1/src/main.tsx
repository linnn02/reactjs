import React from "react";
import ReactDOM from "react-dom/client";

import {
createBrowserRouter,
RouterProvider
} from "react-router-dom";

import Layout from "./Layout";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
{
path: "/",
element: <Layout />,
children: [
{
index: true,
element: <Home />
},
{
path: "courses",
element: <Courses />
},
{
path: "about",
element: <About />
},
{
path: "*",
element: <NotFound />
}
]
}
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
<React.StrictMode>
<RouterProvider router={router} />
</React.StrictMode>
);