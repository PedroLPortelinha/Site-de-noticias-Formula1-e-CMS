import React from "react";
import { createRoot } from "react-dom/client"; 
import "./index.css";
import Root from "./routes/root.jsx";
import Dashboard from "./routes/dashboard.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./routes/login.jsx";
import SignUpPage from "./routes/criaconta.jsx";
import Profile from "./routes/profile.jsx";
import EditProfile from "./routes/editprofile.jsx";
import ResetPassword from "./routes/ResetPassword.jsx";
import PostsCRUD from "./routes/postCRUD.jsx";
import RacesCRUD from "./routes/racesCRUD.jsx";
import EditEntityForm from "./EditEntityForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/posts",
        element: <PostsCRUD />,
      },
      {
        path: "/races",
        element: <RacesCRUD />,
      },
      {
        path: "/edit/:entityType/:id", 
        element: <EditEntityForm />,      
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/criaconta",
    element: <SignUpPage />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/editprofile",
    element: <EditProfile />,
  },
  {
    path: "/ResetPassword",
    element: <ResetPassword />,
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);