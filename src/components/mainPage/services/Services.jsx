import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import servicesService from "../../../services/servicesService";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { getServerLanguage } from "../../../common/helpers";
import { useTranslation } from "react-i18next";
import { Element } from "react-scroll";
import arrowBlack from "../../../assets/images/icons/arrow-black.svg";
import Loading from "../../loading/Loading";
import s from "./services.module.scss";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css";

export default function Services() {
  const { t, i18n } = useTranslation();
  const sliderRef = useRef(null);
  const { data = [], isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: () => servicesService.getAll(),
    select: ({ data }) => data.results,
  });

  const handlePrev = () => {
    if (!sliderRef.current) return;
    const swiper = sliderRef.current.swiper;
    swiper.slidePrev();
  };

  const handleNext = () => {
    if (!sliderRef.current) return;
    const swiper = sliderRef.current.swiper;
    swiper.slideNext();
  };

  return (
    <section className={`${s.main}`}>
      <Element name="services">
        <h2>{t("services.title")}</h2>
        <div className={` ${s.container}`}>
          {isLoading ? (
            <Loading />
          ) : (
            <Swiper
              ref={sliderRef}
              speed={500}
              grabCursor
              centeredSlides
              slidesPerView={"auto"}
              pagination
              modules={[EffectCoverflow, Navigation, Pagination]}
              effect="coverflow"
              // autoHeight
              coverflowEffect={{
                rotate: 0,
                stretch: -300,
                depth: 500,
                slideShadows: true,
              }}
            >
              {data.map((service, i) => (
                <SwiperSlide
                  key={service.id}
                  className={`${s.slide}`}
                >
                  <div className={`${s.card}`}>
                    {!!i && (
                      <button
                        onClick={handlePrev}
                        className={`${s.swiper__btn} ${s.left}`}
                      >
                        <img src={arrowBlack} alt="arrow-left" />
                      </button>
                    )}
                    <h3>
                      {
                        service[
                          `title_${getServerLanguage(i18n.resolvedLanguage)}`
                        ]
                      }
                    </h3>
                    <div className={`${s.card__inner}`}>
                      <p>
                        {
                          service[
                            `description_${getServerLanguage(
                              i18n.resolvedLanguage
                            )}`
                          ]
                        }
                      </p>
                      <img src={service.image} alt="" />
                    </div>
                    {i + 1 < data.length && (
                      <button
                        onClick={handleNext}
                        className={`${s.swiper__btn} ${s.right}`}
                      >
                        <img src={arrowBlack} alt="arrow-left" />
                      </button>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </Element>
    </section>
  );
}
