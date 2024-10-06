import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Compoments/Layout/Layout";
// import NotFound from "./Compoments/NotFound/NotFound";
import { Provider } from "react-redux";
import store from "./RTK/store";
import AllJobsScreen from "./Compoments/Alljobs/AllJobsScreen";
import SingleJob from "./Compoments/SingleJob/SingleJob";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <AllJobsScreen /> },
      { path: "jobs", element: <AllJobsScreen /> },
      { path: "about", element: <h1>About Page</h1> },
      { path: "contact", element: <h1>Contact Page</h1> },
      { path: "job/:id", element: <SingleJob /> },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
