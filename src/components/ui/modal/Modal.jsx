import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import cross from "../../../assets/images/icons/cross.svg";
import arrow from "../../../assets/images/icons/arrow-black.svg";
import { EffectFade } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { getServerLanguage } from "../../../common/helpers";
import s from "./modal.module.scss";
import "swiper/css";
import "swiper/css/effect-fade";

const Modal = ({ isActiveModal, preivelegies }) => {
  const sliderRef = useRef(null);
  const { i18n } = useTranslation();

  const handlePrev = () => {
    return sliderRef.current ? sliderRef.current.swiper.slidePrev() : "";
  };
  const handleNext = () => {
    return sliderRef.current ? sliderRef.current.swiper.slideNext() : "";
  };

  return (
    <div className={s.modal}>
      <div className={s.modal__block}>
        <button
          className={s.cross}
          type="button"
          onClick={() => isActiveModal(false)}
        >
          <img src={cross} alt="crose" />
        </button>
        <Swiper
          spaceBetween={0}
          effect={"fade"}
          className={s.modal__swiper}
          ref={sliderRef}
          modules={[EffectFade]}
        >
          {preivelegies &&
            preivelegies.map((privlege, index) => (
              <SwiperSlide className={s.modal__slide} key={privlege.id}>
                {!!index && (
                  <button
                    className={s.modal__btnPrev}
                    type="button"
                    onClick={handlePrev}
                  >
                    <img src={arrow} alt="prev" />
                  </button>
                )}

                <div
                  className={s.modal__Hall}
                  style={{ backgroundImage: `url(${privlege.image})` }}
                >
                  <div className={s.modal__title}>
                    {
                      privlege[
                        `name_${getServerLanguage(i18n.resolvedLanguage)}`
                      ]
                    }
                  </div>
                </div>
                <img
                  className={s.modal__prices}
                  src={
                    privlege[
                      `price_image_${getServerLanguage(i18n.resolvedLanguage)}`
                    ]
                  }
                  alt="price_img"
                />

                {index + 1 < preivelegies.length && (
                  <button
                    className={s.modal__btnNex}
                    type="button"
                    onClick={handleNext}
                  >
                    <img src={arrow} alt="next" />
                  </button>
                )}
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Modal;
