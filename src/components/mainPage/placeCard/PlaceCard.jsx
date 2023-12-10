import { useTranslation } from "react-i18next";
import { getServerLanguage } from "../../../common/helpers";
import s from "./placeCard.module.scss";

const PlaceCard = ({
  id,
  image,
  privilege,
  isActiveModal,
  setPlaceId,
  ...place
}) => {
  const { t, i18n } = useTranslation();

  const onPlaceClick = () => {
    isActiveModal(true);
    setPlaceId(id);
  };

  return (
    <div className={s.item}>
      <div className={s.item_inner}>
        <img src={image} alt="place" />
        <span className={s.title}>
          {place[`street_${getServerLanguage(i18n.resolvedLanguage)}`]}
        </span>
      </div>
      <button className={s.btn} onClick={onPlaceClick}>
        {t("prices.button")}
      </button>
    </div>
  );
};

export default PlaceCard;
