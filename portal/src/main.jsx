import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Root from "./routes/root";

import News from "./routes/news";
import ErrorPage from "./routes/error-page";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./routes/about";
import {Formula1, Formula2, Formula3} from "./routes/formula";
import Pilotos from "./routes/drivers";
import { Races } from "./components/races";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        index: true,
        element: <Formula1 />,
      },
      {
        path: "/formula1/races/:category",
        element: <Races />,
      },
      {
        path: "/formula2/races/:category",
        element: <Races />,
      },
      {
        path: "/formula3/races/:category",
        element: <Races />,
      },
      {
        path: "/formula1/pilotos",
        element: <Pilotos/>
      },
      {
        path: "/formula2",
        element: <Formula2 />,
      },
      {
        path: "/formula2/news/:id",
        element: <News />,
      },
      {
        path: "/formula3",
        element: <Formula3 />,
      },
      {
        path: "/formula3/news/:id",
        element: <News />,
      },
      {
        path: "news/:id",
        element: <News />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/*",
        element: <ErrorPage />,
      },
      {
        path: "/pilotos",
        element: <Pilotos/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
