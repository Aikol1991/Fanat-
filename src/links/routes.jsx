import React from "react";
import MainPage from "../pages/mainPage/MainPage.jsx";
import Vacancies from "../pages/vacancies/Vacancies.jsx";

const publicRoutes = [
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/vacancies",
    element: <Vacancies />,
  },
];

export default publicRoutes;
