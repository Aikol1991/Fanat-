import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import pricesService from "../../../services/pricesService";
import PlaceCard from "../placeCard/PlaceCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import arrow from "../../../assets/images/icons/arrow-black.svg";
import Modal from "../../ui/modal/Modal";
import Loading from "../../loading/Loading";
import s from "./prices.module.scss";
import { Element } from "react-scroll";

const Prices = () => {
  const { t } = useTranslation();
  const [isModalActive, setIsModalActive] = useState(false);
  const [activeSlideId, setActiveSlideId] = useState(0);
  const [placeId, setPlaceId] = useState(0);
  const sliderRef = useRef(null);
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["prices"],
    queryFn: () => pricesService.getPrices(),
    select: ({ data }) => data.results,
    retry: 0,
  });

  const handlePrev = () => {
    return sliderRef.current ? sliderRef.current.swiper.slidePrev() : "";
  };

  const handleNext = () => {
    return sliderRef.current ? sliderRef.current.swiper.slideNext() : "";
  };

  const sliderBreakpoints = {
    0: {
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 4,
    },
  };

  const currentPrivelege = data.find(
    (place) => place.id === placeId
  )?.privilege;

  const onSlideChange = () => {
    setActiveSlideId(sliderRef.current?.swiper.activeIndex);
  };

  return (
    <section>
      <Element name="prices" className={s.main}>
        <h2>{t("prices.title")}</h2>
        {isModalActive && (
          <Modal
            isActiveModal={setIsModalActive}
            preivelegies={currentPrivelege}
          />
        )}
        {isLoading ? (
          <Loading />
        ) : (
          <Swiper
            ref={sliderRef}
            pagination
            className={s.list}
            modules={[Pagination]}
            breakpoints={sliderBreakpoints}
            onSlideChange={onSlideChange}
          >
            {!!activeSlideId && (
              <button onClick={handlePrev} className={s.btnArrow_previuos}>
                <img src={arrow} alt="<" />
              </button>
            )}
            {data &&
              data.map((place) => (
                <SwiperSlide className={s.swip} key={place.id}>
                  <PlaceCard
                    {...place}
                    isActiveModal={setIsModalActive}
                    setPlaceId={setPlaceId}
                  />
                </SwiperSlide>
              ))}
            {activeSlideId + 1 < data.length && (
              <button onClick={handleNext} className={s.btnArrow_nex}>
                <img src={arrow} alt=">" />
              </button>
            )}
          </Swiper>
        )}
      </Element>
    </section>
  );
};

export default Prices;
