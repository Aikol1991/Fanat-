import style from './footer.module.scss'
import logo from '../../assets/images/icons/logo.svg'
import address_icon from '../../assets/images/footer/address-icon.svg'
import phone_icon from '../../assets/images/footer/phone-icon.svg'
import csgo_model from '../../assets/images/footer/csgo-model-footer.png'
import corner from '../../assets/images/footer/corner-grey.svg'
import whatsapp from '../../assets/images/footer/whatsapp_icon.png'
import tiktok from '../../assets/images/footer/tiktok_icon.png'
import telegram from '../../assets/images/footer/telegram_icon.png'
import instagram from '../../assets/images/footer/instagram_icon.png'
import mail from '../../assets/images/footer/mail_icon.svg'
import { Element } from 'react-scroll'
import { useTranslation } from 'react-i18next'
import contactsService from '../../services/contactsService'
import { useQuery } from '@tanstack/react-query'
import { getServerLanguage } from '../../common/helpers'
import { Link } from 'react-router-dom'
import Loading from '../loading/Loading'

const getLinkIcon = (linkType) => {
  switch (linkType) {
    case 'Instagram':
      return instagram
    case 'Telegram':
      return telegram
    case 'TikTok':
      return tiktok
    case 'WhatsApp':
      return whatsapp
    default:
      return
  }
}

export default function Footer() {
  const { t, i18n } = useTranslation()
  const {
    data = { addresses: [], links: [] },
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['contacts'],
    queryFn: () => contactsService.getAll(),
    select: ({ data }) => data.results[0],
    retry: 0,
  })

  return (
    <footer className={style.footer}>
      <Element name="contacts">
        {/*bg things*/}
        <div className={`container ${style.container}`}>
          <div>
            <span className={style.fanat}>Fanat.kg</span>
          </div>
          <div>
            <img
              src={csgo_model}
              alt="footer-background"
              className={style.background_model}
            />
          </div>
          <div>
            <img
              src={corner}
              alt="right-corner"
              className={style.right_corner}
            />
          </div>
          <div>
            <img src={corner} alt="left-corner" className={style.left_corner} />
          </div>

          {/*contact*/}
          <div className={style.contacts}>
            <h2 className={style.header}>{t('contacts.title')}</h2>
            {isLoading ? (
              <Loading />
            ) : (
              <div className={style.contact_box}>
                <div>
                  <Link to="/" className={style.logo}>
                    <img src={logo} alt="logo" />
                    <span>since 2014</span>
                  </Link>

                  <div className={style.social_icons_mob}>
                    {data.links.map((link) => (
                      <a
                        key={link.id}
                        href={link.link}
                        target={"_blank"}
                        rel={"noreferrer"}
                      >
                        <img src={getLinkIcon(link.social_media)} alt="whatsapp" />
                      </a>
                    ))}
                  </div>
                </div>
                <div className={style.contacts_wrapper}>
                  {data.addresses.map((item) => (
                    <div key={item.id} className={style.contact}>
                      <div className={style.line}>
                        <img src={address_icon} alt="address" />
                        <a
                          href={item.geolocation_address}
                          target="_blank"
                          className={style.address_span}
                        >
                          {
                            item[
                              `address_${getServerLanguage(
                                i18n.resolvedLanguage
                              )}`
                            ]
                          }
                        </a>
                      </div>
                      {item.phones.map((phone, index) => (
                        <div key={phone.id} className={style.line}>
                          {index === 0 && <img src={phone_icon} alt="phone" />}
                          <a
                            href={`tel:${phone.phone}`}
                            className={
                              index === 0 ? style.phone_span : style.secondPhone
                            }
                          >
                            {phone.phone}
                          </a>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className={style.social_networks}>
            <div className={style.social_icons}>
              {data.links.map((link) => (
                <a
                  key={link.id}
                  href={link.link}
                  target={'_blank'}
                  rel={'noreferrer'}
                >
                  <img src={getLinkIcon(link.social_media)} alt="whatsapp" />
                </a>
              ))}
            </div>
            {data.email && (
              <div className={style.mail}>
                <img src={mail} alt="email" />
                <a href={`mailto:${data.email}`}>{data.email}</a>
              </div>
            )}
          </div>
        </div>
      </Element>
    </footer>
  )
}
