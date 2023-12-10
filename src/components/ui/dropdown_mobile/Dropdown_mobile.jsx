import React, { useRef, useState } from "react";
import s from "./dropdown_mobile.module.scss";
import arrowDown from "../../../assets/images/icons/arrow-down.svg";
import { useClickOutside } from "../../../hooks/useClickOutside";

export default function Dropdown_mobile({
  value,
  values,
  valueKey,
  onChange,
  toDispay,
}) {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const isOpenClass = isOpen ? s.open : "";
  useClickOutside(dropdownRef, () => {
    console.log("clicked");
    setIsOpen(false);
  });

  const onChangeFunc = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={s.dropdown}>
      <button
        onClick={() => setIsOpen((bool) => !bool)}
        className={`${s.dropdown__main} ${isOpenClass}`}
      >
        {value[valueKey]}
        <img
          src={arrowDown}
          alt="arrow-down"
          className={`${s.arrow} ${isOpenClass}`}
        />
      </button>
      <ul className={`${s.dropdown__box} ${isOpenClass}`}>
        {values
          .filter(
            (val) =>
              val[valueKey].toLowerCase() !== value[valueKey].toLowerCase()
          )
          .map((value) => (
            <li key={value[valueKey]}>
              <button
                className={s.dropdown__list}
                onClick={() => onChangeFunc(value)}
              >
                <div className={s.label}>
                  <span>{value[valueKey]}</span>
                </div>
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
