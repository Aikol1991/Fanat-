import { useTranslation } from "react-i18next";
import man from "../../../assets/images/main_man.png";
import s from "./main.module.scss";

const Main = () => {
  const { t } = useTranslation();

  return (
    <div className={s.main}>
      <div className={s.background}>
        <div className={s.logo}>
          <div className={s.logo__block1}>
            <div className={s.logo__block1_title}>{t("main.title")}</div>
          </div>
          <div className={s.logo__block2}>
            <div className={s.logo__block2_text}>
              <h1>Fanat.kg</h1>
              <p className={s.descr}>{t("main.description")}</p>
            </div>
            <img src={man} alt="avatar_man" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
