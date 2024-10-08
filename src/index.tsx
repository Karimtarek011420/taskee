import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Compoments/Layout/Layout";
import { Provider } from "react-redux";
import store from "./RTK/store";
import AllJobsScreen from "./Compoments/Alljobs/AllJobsScreen";
import SingleJob from "./Compoments/SingleJob/SingleJob";
import SearchComponent from "./Compoments/SearchComponent/SearchComponent";
import NotFound from "./Compoments/NotFound/NotFound";
import History from "./Compoments/History/History";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <AllJobsScreen /> },
      { path: "jobs", element: <AllJobsScreen /> },
      { path: "search", element: <SearchComponent /> },
      { path: "history", element: <History/> },
      { path: "job/:id", element: <SingleJob /> },
      { path: "*", element: <NotFound/> },
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
