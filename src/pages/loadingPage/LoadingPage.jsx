import React from "react";
import s from "./loadingPage.module.scss";
import Loading from "../../components/loading/Loading";

const LoadingPage = () => {
  return (
    <main className={s.main}>
      <Loading />
    </main>
  );
};

export default LoadingPage;
