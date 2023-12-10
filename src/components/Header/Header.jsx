import React, { useEffect, useRef, useState } from "react";
import s from "./header.module.scss";
import logo from "../../assets/images/icons/logo.svg";
import burger from "../../assets/images/icons/burger-icon.svg";
import Dropdown from "../ui/dropdown/Dropdown";
import { languagesData, menuData } from "../../data/data";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { scroller } from "react-scroll";
import Dropdown_mobile from "../ui/dropdown_mobile/Dropdown_mobile.jsx";
import { useClickOutside } from "../../hooks/useClickOutside.js";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.resolvedLanguage;
  const burgerMenuRef = useRef(null);
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const toggleBurgerMenu = () => {
    setBurgerMenuOpen(!burgerMenuOpen);
  };

  useClickOutside(burgerMenuRef, () => {
    setBurgerMenuOpen(false);
  });

  const scrollFunc = async (link) => {
    if (location.pathname !== "/" && link !== "contacts") {
      await navigate("/");
      scroller.scrollTo(link, { offset: -200 });
    } else {
      scroller.scrollTo(link, {
        duration: 800,
        delay: 100,
        smooth: true,
        offset: -150,
      });
    }
  };

  const onChangeDropdown = (language) => {
    i18n.changeLanguage(language.value.toLowerCase());
  };

  return (
    <header className={s.header}>
      <div className={`container ${s.container}`}>
        <Link to="/">
          <img src={logo} alt="logo" className={s.logo} />
        </Link>
        <nav className={s.nav}>
          <ul className={s.links}>
            {menuData.map((link) => (
              <li key={link.label}>
                {link.scroll ? (
                  <button
                    className={s.link}
                    onClick={() => scrollFunc(link.scroll)}
                  >
                    {t(link.label)}
                  </button>
                ) : (
                  <Link className={s.link} to={link.link}>
                    {t(link.label)}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <Dropdown
          value={{ value: currentLang }}
          values={languagesData}
          valueKey="value"
          onChange={onChangeDropdown}
        />

        <div ref={burgerMenuRef} className={s.burgerMenu}>
          <input
            id="menu__toggle"
            type="checkbox"
            checked={burgerMenuOpen}
            onChange={toggleBurgerMenu}
          />
          <label className={s.menu__toggle} htmlFor="menu__toggle">
            <img src={burger} alt="burger" />
          </label>

          {burgerMenuOpen && (
            <div className={s.mobileMenu}>
              <nav>
                <ul>
                  {menuData.map((link) => (
                    <li key={link.label}>
                      {link.scroll ? (
                        <button
                          className={s.link}
                          onClick={() => {
                            scrollFunc(link.scroll);
                            toggleBurgerMenu();
                          }}
                        >
                          {t(link.label)}
                        </button>
                      ) : (
                        <Link
                          className={s.link}
                          to={link.link}
                          onClick={toggleBurgerMenu}
                        >
                          {t(link.label)}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
              <Dropdown_mobile
                value={{ value: currentLang }}
                values={languagesData}
                valueKey="value"
                onChange={onChangeDropdown}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
