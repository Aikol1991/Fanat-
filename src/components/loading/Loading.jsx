import s from "./loading.module.scss";
import loading from "../../assets/images/loading.png";

const Loading = ({ width, height, textSize }) => {
  return (
    <div className={s.main}>
      <div
        className={s.square}
        style={{ width: width, height: height, fontSize: textSize }}
      >
        loading...
        <img src={loading} alt="loading" />
      </div>
    </div>
  );
};

export default Loading;
