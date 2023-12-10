import React, { useEffect } from "react";
import s from "./vacancies.module.scss";
import VacancyCard from "../../components/vacanciesPage/vacancyCard/VacancyCard";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import vacanciesService from "../../services/vacanciesService";
import Loading from "../../components/loading/Loading";

const Vacancies = () => {
  const { t } = useTranslation();
  const { data = [], isLoading } = useQuery({
    queryKey: ["vacancies"],
    queryFn: () => vacanciesService.getAll(),
    select: ({ data }) => data.results,
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className={s.main}>
      <h2>{t("vacancies.title")}</h2>
      <div className={`container ${s.container}`}>
        {isLoading ? (
          <Loading />
        ) : data.length ? (
          data.map((vacancy) => <VacancyCard key={vacancy.id} {...vacancy} />)
        ) : (
          <span className={s.empty}>{t("vacancies.empty")}</span>
        )}
      </div>
    </div>
  );
};

export default Vacancies;
