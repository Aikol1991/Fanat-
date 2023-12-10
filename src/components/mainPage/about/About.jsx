import { useTranslation } from "react-i18next";
import { Element } from "react-scroll";
import mobileImg from "../../../assets/images/about.jpg";
import s from "./about.module.scss";

export default function About() {
  const { t } = useTranslation();

  return (
    <section className={s.main}>
      <Element name="about">
        <div className={`container ${s.container}`}>
          <div className={s.mobile__img}>
            <img src={mobileImg} alt="club" />
          </div>
          <div className={s.block__one}>
            <h3>Fanat.kg</h3>
            <p>{t("about.fanatIs")}</p>
          </div>
          <div className={s.block__two}>
            <h3>Our mission</h3>
            <p>{t("about.ourMission")}</p>
          </div>
        </div>
      </Element>
    </section>
  );
}
