import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// 1 -configurando router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./routes/Home";
import Contact from "./routes/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/contact",
    element: <Contact />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
