import React, { useEffect, useRef, useState } from "react";
import s from "./vacancyCard.module.scss";
import { useTranslation } from "react-i18next";
import { getServerLanguage } from "../../../common/helpers";

const VacancyCard = (vacancy) => {
  const { t, i18n } = useTranslation();
  const textRef = useRef(null);
  const [textHeight, setTextHeight] = useState(0);
  const [isTextHidden, setIsTextHidden] = useState(true);
  const currentLang = `_${getServerLanguage(i18n.resolvedLanguage)}`;

  useEffect(() => {
    setTextHeight(textRef.current.clientHeight);
  }, [textRef]);

  return (
    <div className={s.card}>
      <h3>{vacancy[`title${currentLang}`]}</h3>
      <span className={s.address}>{vacancy[`address${currentLang}`]}</span>
      <p ref={textRef} className={`${s.descr} ${isTextHidden ? s.hidden : ""}`}>
        {vacancy[`description${currentLang}`]}
      </p>
      {textHeight >= 96 && (
        <button
          className={s.more}
          onClick={() => setIsTextHidden((prev) => !prev)}
        >
          {isTextHidden ? t("vacancies.link1") : t("vacancies.link2")}
        </button>
      )}
      <a className={s.btn} href={vacancy.google_form} target="_blank">
        {t("vacancies.button")}
      </a>
    </div>
  );
};

export default VacancyCard;
